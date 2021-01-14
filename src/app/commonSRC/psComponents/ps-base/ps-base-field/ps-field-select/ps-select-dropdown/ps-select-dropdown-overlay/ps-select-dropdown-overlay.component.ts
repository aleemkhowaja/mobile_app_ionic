import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsSelect } from 'src/app/commonSRC/psServices/models/common-type';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsPsActionIcon, IOptionsPsContainerItem, IOptionsPsSelectDropdownOverlay, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsFieldSelectComponent } from '../../ps-field-select.component';


@Component({
  selector: 'ps-select-dropdown-overlay',
  templateUrl: './ps-select-dropdown-overlay.component.html'
})
export class PsSelectDropdownOverlayComponent extends PsFieldSelectComponent implements OnInit, OnDestroy {

  @Input() options: IOptionsPsSelectDropdownOverlay;
  public searchCriteriaField = '';
  public searchCriteriaValue = '';

  public filteredArray: PsSelect = [];
  public filteredAndPaginatedArray: PsSelect = [];

  public showDropdown = false;
  public positionWasChecked = false;
  public currentPosition = {};

  public dropDownOptions: IOptionsPsContainerItem = {
    hideImageAndIconIfNotPresent: true
  };
  public loadingOptions: IOptionsPsActionIcon = {
    iconName: 'loading'
  };

  public loadMoreData = false;
  public loadMoreAsyncData = false;
  public totalNumberOfRows;
  // public numberOfRowsToShow = 5;
  public numberOfItrations = 0;
  public defaultDebounceTime = 500;
  private searchInputSubject: Subject<string> = new Subject<string>();
  public clickSubscription: Subscription;
  public totalNbRec: number = 0;
  public serviceRequestObj: any = {};
  @ViewChild('psItemList', { static: false }) psItemList: Element;
  @ViewChild('psItemListWrapper', { static: false }) psItemListWrapper: Element;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onServiceDataChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(commonProv: PsCommonService, loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    if (!(this.options.searchOptions && this.options.searchOptions.fcName)) {
      this.options.searchOptions = this.options.searchOptions ? this.options.searchOptions : {};
      this.options.searchOptions.fcName = this.options.fcName + '_search';
      this.options.searchOptions.group = this.options.group;
    }
    if (this.options.asyncURL) {
      this.loadMoreAsyncData = true;
      this.serviceRequestObj = {
        nbRec: this.numberOfRowsToShow,
        recToskip: 0,
        ...this.options.serviceRequestObj
      };
      this.searchInputSubject.pipe(
        debounceTime(this.options.debounceTime ? this.options.debounceTime : this.defaultDebounceTime), // wait debounceTime (in ms) after the last event before emitting last event
        distinctUntilChanged()) // only emit if value is different from previous value
        .subscribe((searchtext) => {
          this.searchCriteriaValue = searchtext;
          this.serviceRequestObj.desc = searchtext;
          this.loadServiceData(null, this.serviceRequestObj);
        });
      this.filteredArray = this.options.listOfOptions ? this.options.listOfOptions : [];
      this.totalNbRec = this.options.totalNbRec;
    } else {
      this.filteredArray = [...this.options.listOfOptions ? this.options.listOfOptions : []];
    }

    this.applyPagination();
  }


  /*
     this method will calculate the height of the drop down box, in order to decide whether
     it will open upwards or downwards
   */
  getDropDownBoxPosition() {
    const bodyRect = document.body.getBoundingClientRect(), elemRect = this.options.parentElementRef.nativeElement.getBoundingClientRect(),
      offset = elemRect.top - bodyRect.top;
    const deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    const ddlMinWidth = parseFloat(CommonUtils.getCssVariableValue('--ps-select-dropdown-min-width'));
    const calculatedWidth = ddlMinWidth > elemRect.width ? ddlMinWidth : elemRect.width;
    if (this.psItemListWrapper) {
      const fixedPosition = {
        left: (elemRect.left) + 'px',
        width: (elemRect.width) + 'px'
      };
      this.currentPosition = {
        bottom: (elemRect.bottom) + 'px',
        top: (elemRect.top + elemRect.height) + 'px',
      };
      if (elemRect.top >= (bodyRect.height / 2)) {
        this.currentPosition = {
          bottom: ((bodyRect.height - elemRect.bottom) + elemRect.height) + 'px',
        };
      }
      if ((deviceWidth - elemRect.left) < calculatedWidth) {
        fixedPosition.left = (elemRect.left - (calculatedWidth - (deviceWidth - elemRect.left))) + 'px';
      }
      this.currentPosition = { ...this.currentPosition, ...fixedPosition };
      this.positionWasChecked = true;
    }
    return this.currentPosition;
  }



  /*
    trigered on search input change
  */
  filterSearchCriteria(event) {
    this.numberOfItrations = 0;
    const value = event ? event.target.value : this.searchCriteriaValue ? this.searchCriteriaValue : '';
    this.searchCriteriaValue = value;
    if (this.options.asyncURL) {
      this.searchInputSubject.next(value);
    } else {
      this.applyFilterCriteria();
    }
  }

  /*
  this method will check if the user has scrolled to the last of the drop down box
*/
  onScroll(event) {
    this.loadMoreAsyncData = true;
    const element = event.target;
    if ((element.scrollHeight - element.scrollTop === element.clientHeight) && (this.filteredAndPaginatedArray.length != this.filteredArray.length
      || (this.options.asyncURL && this.filteredAndPaginatedArray.length < this.totalNbRec))) {
      this.numberOfItrations++;
      if (this.options.asyncURL) {
        this.loadServiceData(true, this.serviceRequestObj);
      } else {
        this.applyFilterCriteria(false);
      }
    }
  }



  /*
      this method will load data which are already present on client side (no service will be called)
  */
  loadData(refreshArray?: boolean) {
    if (!this.loadMoreData) {
      this.loadMoreData = true;
      this.applyPagination(refreshArray);
    }
  }

  /*
       this method will load data retrieved from a service call
  */
  loadServiceData(triggeredByScroll?: boolean, serivceRequestObj?: string) {
    this.loadMoreAsyncData = true;
    this.loadAsyncUrl(serivceRequestObj, triggeredByScroll).then((data) => {
      if (triggeredByScroll) {
        const newList = data.gridModel;
        const oldList = this.options.listOfOptions;
        const updatedListOfOptions = oldList.concat(newList);
        this.options.listOfOptions = updatedListOfOptions;
        this.applyFilterCriteria(false);
      } else {
        this.options.listOfOptions = data.gridModel;
        this.applyFilterCriteria(null);
      }
      this.filteredArray = this.options.listOfOptions;
      data.triggeredByScroll = triggeredByScroll;
      this.onServiceDataChange.emit(data);

    });
  }

  /*
    this method will apply pagination as infinite scroll/retrieve as needed behavior
  */
  applyPagination(refreshArray?: boolean) {
    if (refreshArray) {
      this.filteredAndPaginatedArray = [];
    }
    const array: PsSelect = this.filteredArray.slice(this.numberOfItrations * this.numberOfRowsToShow, (this.numberOfItrations * this.numberOfRowsToShow) + this.numberOfRowsToShow);
    this.filteredAndPaginatedArray.push(...array);
    this.loadMoreData = false;
    this.loadMoreAsyncData = false;
  }



  /*
  apply filter criteria
  */
  applyFilterCriteria(refreshArray?: boolean) {
    if (refreshArray == null || refreshArray === undefined) {
      refreshArray = true;
    }
    const value = this.searchCriteriaValue ? this.searchCriteriaValue : '';
    this.filteredArray = this.options.listOfOptions.filter((opts) => {
      if (opts.description) {
        return opts.description.toLowerCase().indexOf(value.toLowerCase()) >= 0;
      }
    });
    this.loadData(refreshArray);
  }

  /*
    trigerred when selecting a dropdown value
  */
  onSelectionChange(value?: IPsSelect) {
    if (!value) {
      value = null;
    } else {
      // this.searchCriteriaField = value.description;
    }
    this.onPsChange.emit(value);
    this.value = value;
  }

  loadAsyncUrl(parameterRequest: any, triggeredByScroll: boolean) {
    if (triggeredByScroll) {
      parameterRequest.recToskip = this.options.listOfOptions.length;
      parameterRequest.totalNbRec = this.options.totalNbRec;
    } else {
      parameterRequest.recToskip = 0;
      parameterRequest.totalNbRec = 0;
    }
    return this.commonProv.commonSelectDropdownRequest(this.options.asyncURL, parameterRequest);
  }

  ngOnDestroy() {
    if (this.searchInputSubject) {
      this.searchInputSubject.unsubscribe();
    }
  }

  dismissModal() {
    this.onPsEmpty.emit(true);
  }
}
