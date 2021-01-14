import { ApplicationRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, EmbeddedViewRef, EventEmitter, Injector, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsSelectDropdown } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsSelectDropdownBaseComponent } from '../ps-select-dropdown-base/ps-select-dropdown-base.component';
import { PsSelectDropdownOverlayComponent } from './ps-select-dropdown-overlay/ps-select-dropdown-overlay.component';

@Component({
  selector: 'ps-select-dropdown',
  templateUrl: './ps-select-dropdown.component.html',
})

/**
 * @author gilbertandary
 */
export class PsSelectDropdownComponent extends PsSelectDropdownBaseComponent implements OnInit, OnDestroy {

  @Input() options: IOptionsPsSelectDropdown;
  public showDropdown = false;
  dropDownOverlayRef: ComponentRef<PsSelectDropdownOverlayComponent>;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onServiceDataChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    commonProv: PsCommonService, loggerP: LoggerService, private eRef?: ElementRef, private componentFactoryResolver?: ComponentFactoryResolver,
    private appRef?: ApplicationRef, private injector?: Injector) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.options.panelClass = 'ps-select-dropdown-select-base';
    this.options.forcePanelClose = true;
    this.custIconOptions.component = PsSelectDropdownComponent;
    super.setCustIconOptions();
    if (this.options.asyncURL) {
      const serviceRequestObj: any = {
        nbRec: this.numberOfRowsToShow,
        recToskip: 0,
        ...this.options.serviceRequestObj
      };
      this.loadAsyncUrl(serviceRequestObj, false).then((data) => {
        this.options.listOfOptions = data.gridModel;
        this.options.totalNbRec = data.totalNbRec;
      });
    }
  }

  loadAsyncUrl(parameterRequest: any, triggeredByScroll: boolean) {
    if (triggeredByScroll) {
      parameterRequest.recToskip = this.options.listOfOptions.length;
    }
    return this.commonProv.commonSelectDropdownRequest(this.options.asyncURL, parameterRequest);
  }

  /*
    this method will check if we should hide or display the dropdown based on user click activity
  */
  showDropdownCheck(event: Event) {
    if (this.disabled) {
      return;
    }
    if (this.showDropdown) {
      this.hideDropDown();
    } else {
      this.showDropdown = true;
      this.createDropDownOverlay();
    }
  }

  /*
    this method will hide the dropdown
  */
  hideDropDown() {
    this.common.hideElementWhenAnimationEnds(this.dropDownOverlayRef && this.dropDownOverlayRef.instance && this.dropDownOverlayRef.instance.psItemListWrapper ? this.dropDownOverlayRef.instance.psItemListWrapper : null, 'hide-list').then(() => {
      this.appRef.detachView(this.dropDownOverlayRef.hostView);
      this.dropDownOverlayRef.destroy();
    });
    this.showDropdown = false;
  }


  createDropDownOverlay() {
    if (this.options.group.controls[this.options.fcName].disabled) {
      return;
    }

    // 1. Create a component reference from the component
    this.dropDownOverlayRef = this.componentFactoryResolver
      .resolveComponentFactory(PsSelectDropdownOverlayComponent)
      .create(this.injector);


    this.dropDownOverlayRef.instance.options = {};
    this.commonProv.copyObject(this.dropDownOverlayRef.instance.options, this.options, false, false);
    this.dropDownOverlayRef.instance.options.parentElementRef = this.eRef;


    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(this.dropDownOverlayRef.hostView);

    // 3. Get DOM element from component
    const domElem = (this.dropDownOverlayRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    document.body.appendChild(domElem);

    this.dropDownOverlayRef.instance.onPsChange.subscribe((value) => {
      this.hideDropDown();
      super.writeValue(value, true);
    });
    this.dropDownOverlayRef.instance.onPsEmpty.subscribe((value) => {
      this.hideDropDown();
    });

    this.dropDownOverlayRef.instance.onServiceDataChange = this.onServiceDataChange;

    this.dropDownOverlayRef.changeDetectorRef.detectChanges();
  }

}
