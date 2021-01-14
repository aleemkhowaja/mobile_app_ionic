import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsLabel } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsSelectLookupOptionListComponentExposed } from '../../ps-select-dropdown/ps-select-lookup-option-list/ps-select-lookup-option-list.component.interfaces';
import { IOptionsPsKeyinInput } from './../../../../commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsComplexLookUpComponentExposed } from './ps-complex-lookup.component.interfaces';



/**
 * @author Aftab.Ali
 * @since 04/12/2019
 *
 * <p> PsContainerLookupOptionDetailsComponent -- </p>
 */
@Component({
  selector: 'ps-complex-lookup',
  templateUrl: './ps-complex-lookup.component.html',
  styleUrls: ['./ps-complex-lookup.component.scss'],
})
export class PsComplexLookupComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsComplexLookUpComponentExposed = {
    requestObject: null,
    notFoundMessage: '',
  };
  public selectLookUpOptions: IOptionsPsSelectLookupOptionListComponentExposed = {};
  @Output() public changeItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickElsewhere = new EventEmitter<MouseEvent>();
  @ViewChild('selectLookUpRef') selectLookUpRef;
  public bAccountsFound = true;
  public lookupOptions: IOptionsPsKeyinInput = {};
  public lookupDropDownOptions: IOptionsPsKeyinInput = {};
  public toggleCardList = false;
  public querySelect: any;
  noValidAccountsLabelOptions: IOptionsPsLabel = {};
  showWarning: boolean;
  get disableLookup() {
    this.lookupOptions.labelKey = this.options.labelKey;
    this.lookupOptions.placeHolder = this.options.placeHolder;
    const complexLookupOptions = this.commonProv.getElementValidations(this.lookupOptions.fcName);
    // val & condition on val added by Richie for #TP 1128252 since it was generating error when we are trying to get the keys of null value and thus it will stop selecting an account on the screen
    const val = this.lookupOptions.group.controls[this.options.fcName].value;
    if (val && Object.keys(val).length > 0) {
      this.setInputValueOpacity('0');
    }
    if (complexLookupOptions && complexLookupOptions.IS_READONLY === 1) {
      return true;
    } else {
      return false;
    }
  }

  get showDropdownIcon() {
    const complexLookupOptions = this.commonProv.getElementValidations(this.lookupOptions.fcName);
    if (complexLookupOptions && complexLookupOptions.IS_VISIBLE === 0) {
      return false;
    } else {
      return PsCommonSettings.showDropdownIcon;
    }
  }

  constructor(
    commonService: PsCommonService,
    logger: LoggerService,
    private elementRef: ElementRef,
    public navigationServices: PsNavigatorService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    super.init();
    this.lookupOptions = {
      labelKey: this.options.labelKey,
      placeHolder: this.options.placeHolder,
      fcName: this.options.fcName,
      group: this.options.group,
      disablePreview: true
    };
    this.lookupDropDownOptions = {
      labelKey: this.options.labelKey,
      placeHolder: this.options.placeHolder,
      fcName: this.options.fcName + '_lookupKey',
      group: this.options.group,
      disablePreview: true,
      type: 'text',
      forceTriggerChange: true
    };
    this.custIconOptions.availableCustomization.IS_MANDATORY = true;
    this.custIconOptions.availableCustomization.PLACEHOLDER_LABEL_ID = true;
    if (this.custMode) {
      this.lookupOptions.allowCust = false;
    } else {
      this.lookupOptions.allowCust = true;
    }
    this.noValidAccountsLabelOptions = {
      labelKey: this.options.notFoundMessage !== '' ? this.options.notFoundMessage : 'no_data_found_key',
      translate: true
    };
    this.loadOptions();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.lookupDropDownOptions.fcName], 0);
  }


  /**
   * 
   * @param object 
   */
  public popListUp(event) {
    this.presentLoader(0);
    if (!this.disableLookup) {
      this.querySelect = event.target.querySelectorAll('.ps-complex-lookup .select-card-dropDown ion-input');
      if (this.options && this.options.listOfOptions && this.options.listOfOptions.length > 0 && this.toggleCardList) {
        if (this.querySelect[0]) {
          this.querySelect[0].style.opacity = 1;
        }
        this.commonProv.setValInsideNestedObj(this.lookupOptions.fcName, null, this.options.requestObject);
        this.bAccountsFound = true;
        this.selectLookUpOptions = {};
        this.options.showDefaultTemplate = false;
        this.selectLookUpOptions = this.options;
        this.selectLookUpOptions.itemList = this.options.listOfOptions;
        this.selectLookUpOptions.showSelectedCard = true;
      } else if (this.options && this.options.itemList !== undefined && this.options.itemList.length === 1) {
        this.commonProv.setValInsideNestedObj(this.lookupOptions.fcName, null, this.options.requestObject);
        this.toggleCardList = !this.toggleCardList;
        this.selectLookUpOptions.itemList = this.options.listOfOptions;
        if (this.querySelect[0]) {
          this.querySelect[0].style.opacity = 1;
        }
      } else if (this.toggleCardList && this.options.listOfOptions && this.options.listOfOptions.length === 0) {
        this.bAccountsFound = false;
        if (this.querySelect[0]) {
          this.querySelect[0].style.opacity = 1;
        }
      }
      this.toggleCardList = !this.toggleCardList;
    }
  }

  private presentLoader(load) {
    if (this.options && this.options.listOfOptions === undefined) {
      if (load === 0) {
        this.commonProv.presentLoading();
      }
      setTimeout(() => {
        if (load === 3) {
          this.commonProv.dismissLoading();
        } else if (this.options && this.options.listOfOptions !== undefined) {
          this.toggleCardList = true;
          this.commonProv.dismissLoading();
        } else {
          load++;
          this.presentLoader(load);
        }
      }, 1000);
    } else {
      this.toggleCardList = true;
      this.commonProv.dismissLoading();
    }
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    // Check if the click was outside the element
    if (targetElement && !this.elementRef.nativeElement.contains(targetElement) && targetElement.id !== 'showMore' && targetElement.id !== 'showLess') {
      if (this.options && this.selectLookUpOptions && this.selectLookUpOptions.itemList && this.selectLookUpOptions.itemList.length === 1) {
        this.selectLookUpOptions.showSelectedCard = true;
        this.selectLookUpOptions.showDefaultTemplate = PsCommonSettings.showDefaultTemplateOption;
      } else {
        this.selectLookUpOptions.showSelectedCard = false;
        this.selectLookUpOptions.showDefaultTemplate = PsCommonSettings.showDefaultTemplateOption;
      }
    }
  }

  /**
   * 
   * @param event
   */
  public emitItemDetails(event) {
    if (this.querySelect !== null && this.querySelect !== undefined && this.querySelect[0]) {
      this.querySelect[0].style.opacity = 0;
    }
    if (event && event.item !== undefined) {
      this.commonProv.setValInsideNestedObj(this.lookupDropDownOptions.fcName, event.item.lookupKey, this.options.requestObject);
      const changedItem = this.options.listOfOptions.filter(item => item.lookupKey === event.item.lookupKey).shift();
      this.changeItem.emit(changedItem);
    }
  }

  private loadOptions() {
    // this.showDropdownIcon = PsCommonSettings.showDropdownIcon;
    this.options.showDefaultTemplate = PsCommonSettings.showDefaultTemplateOption;
    this.selectLookUpOptions = this.options;
  }


  public onChangeItem(event) {
    this.toggleCardList = false;
    if (event !== undefined && this.options.listOfOptions !== undefined) {
      const changedItem = this.options.listOfOptions.filter(item => item.lookupKey === event.newValue).shift();
      this.commonProv.setValInsideNestedObj(this.lookupOptions.fcName, changedItem, this.options.requestObject);
      this.options.itemList = [];
      this.selectLookUpOptions.itemList[0] = changedItem;
      this.selectLookUpRef.onClickCard(this.selectLookUpOptions);
      this.changeItem.emit(changedItem);
      //show warning if value not exist any more
      if (changedItem) {
        this.showWarning = false;
      } else {
        this.options.itemList = [];
        this.showWarning = true;
      }
    }
  }

  private setInputValueOpacity(opacity) {
    if (document.getElementsByClassName('ps-complex-lookup') && this.options.requestObject.checkboxConfirm) {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      this.setOpacity(opacity);
    }else if(document.getElementsByClassName('ps-complex-lookup') && this.options.requestObject){
      this.setOpacity(opacity);
    }
  }

  private setOpacity(opacity){
    for (let index = 0; index < document.getElementsByClassName('ps-complex-lookup').length; index++) {
      if (document.getElementsByClassName('ps-complex-lookup')[index].getElementsByClassName('select-card-dropDown')[0].getElementsByTagName('ion-input')[0] !== undefined) {
        const complexDropdownInput = document.getElementsByClassName('ps-complex-lookup')[index].getElementsByClassName('select-card-dropDown')[0].getElementsByTagName('ion-input')[0];
        if (complexDropdownInput.style.opacity != '0' && complexDropdownInput.style.opacity == '' || complexDropdownInput.style.opacity != '1') {
          complexDropdownInput.style.opacity = opacity;
        }
      }
    }
  }
  
}
