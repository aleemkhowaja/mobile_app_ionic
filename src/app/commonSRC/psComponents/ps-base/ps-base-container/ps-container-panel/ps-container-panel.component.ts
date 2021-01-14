import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { LoggerService } from '../../../../psServices/logger/logger.service';
import { IOptionsPsActionImage, IOptionsPsContainerItem, IOptionsPsContainerPanel, IOptionsReturnStepControlsAsAbstractControl } from '../../../../psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../psServices/ps-common/ps-common.service';
import { PsBaseContainerComponent } from '../ps-base-container.component';
import { ConstantCommon } from './../../../../psServices/models/common-constant';
import { IOptionsPsActionIcon, IOptionsPsLabelNav } from './../../../../psServices/models/ps-common-interface';



@Component({
  selector: 'ps-container-panel',
  templateUrl: './ps-container-panel.component.html',
  styleUrls: ['./ps-container-panel.component.scss'],
})
export class PsContainerPanelComponent extends PsBaseContainerComponent implements OnInit, OnDestroy {

  @Input() options: IOptionsPsContainerPanel = {};
  iconOptions: IOptionsPsActionIcon = {};
  get labelOptions(): IOptionsPsLabelNav {
    return {
      labelKey: this.options.labelKey
    };
  }
  openOptions: IOptionsPsActionIcon = {};
  imageOptions: IOptionsPsActionImage = {};
  itemOptions: IOptionsPsContainerItem = { hideImageAndIconIfNotPresent: true };
  @ViewChild('containerPanel', { read: ElementRef, static: false }) containerPanel: ElementRef<HTMLElement>;

  constructor(commonProv: PsCommonService, loggerP: LoggerService) {
    super(commonProv, loggerP);
  }
  private eventSub: Subscription; // Added by Richie #TP 1105083 due to migration to ionic 5 since Event service was removed and replaced with observable

  validationResponse: IOptionsReturnStepControlsAsAbstractControl;
  nextWasClicked = false;
  currentGroup: FormGroup;
  numberOfInvalidControls = 0;
  ngOnInit() {
    super.ngOnInit();
    if (CommonUtils.isEmptyObject(this.options)) {
      this.options = {
        isExpandable: false,
        expanded: true
      };
    }
    this.options.isExpandable = this.options.isExpandable != null && this.options.isExpandable !== undefined ? this.options.isExpandable : true;
    if (!this.options.isExpandable) {
      this.options.expanded = true;
    } else {
      this.options.expanded = this.options.expanded != null && this.options.expanded !== undefined ? this.options.expanded : false;
    }
    this.iconOptions.iconName = this.options.iconName;
    this.imageOptions.imageName = this.options.iconUrl;
    this.options.isExpandable && this.options.expanded ? this.openOptions.iconName = 'collapse-panel-icon' : this.openOptions.iconName = 'expand-panel-icon';
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.id], 0);
    this.custIconOptions.fieldNameDesc = this.options.labelKey ? this.options.labelKey : null;
    this.subscribeOnValidation();
    this.dynScreenDisplayEmitEventSubscription = this.commonProv.dynScreenDisplayEmitEvent.subscribe(result => {
      if (result && result.id === this.id) {
        const listOfChildrenNames = CommonUtils.extractContainerFcNames(this.containerPanel.nativeElement);
        this.updateChildrenValidity(listOfChildrenNames,
          {
            isVisible: result.screenDispVO.IS_VISIBLE === 1 ? true : false,
            isReadOnly: result.screenDispVO.IS_READONLY === 1 ? true : false,
            parentNode: this
          }
        );

      }
    });
  }

  ngAfterViewInit() {
    if (!this.custMode) {
      const listOfChildrenNames = CommonUtils.extractContainerFcNames(this.containerPanel.nativeElement);
      this.updateChildrenValidity(listOfChildrenNames, { isReadOnly: this.readonly, isVisible: this.visible, parentNode: this });
    }
  }

  handleExpandicon() {
    this.options.expanded = !this.options.expanded;
    if (this.options.isExpandable) {
      if (this.options.expanded) {
        this.openOptions.iconName = 'collapse-panel-icon';
      } else {
        this.openOptions.iconName = 'expand-panel-icon';
      }
    }
  }

  subscribeOnValidation() {
    // this.unSubscribeEvents();
    // modified by Richie #TP 1105083 due to migration to ionic 5 since Event service was removed and replaced with observable with one argument
    this.eventSub = this.common.events.subscribe('triggerValidation', (params) => {
      const response: IOptionsReturnStepControlsAsAbstractControl = params.response;
      this.numberOfInvalidControls = 0;
      if (params && params.fromNext) {
        this.nextWasClicked = true;
        this.currentGroup = params.group;
      }
      if (params && params.fromSubmit && params.numberOfInvalidControls > 0 && params.listOfDOMReferences) {
        this.markAsInvalid(params.listOfDOMReferences, params.listOfControls);
      }
      if (/* this.nextWasClicked && */ response) {
        this.validationResponse = response;
        if (response.listOfInvalidControls != null && response.listOfInvalidControls.length > 0) {
          if (!response.isValid) {
            this.markAsInvalid(response.listOfInvalidControlsWithDOMReferences, response.listOfInvalidControls);
          }
        }
      }
    });
  }

  markAsInvalid(listOfDOMReferences: Element[], listOfControls?: Array<AbstractControl>) {
    listOfDOMReferences.forEach((element, index) => {
      if (listOfControls) {
        if (listOfControls[index].invalid && this.containerPanel.nativeElement.contains(element)) {
          this.numberOfInvalidControls++;
        }
      }
    });
    if (this.options.isExpandable && this.numberOfInvalidControls > 0) {
      this.options.expanded = true;
      this.containerPanel.nativeElement.classList.add('invalid-panel');
    }
  }

  ngOnDestroy() {
    this.unSubscribeEvents();
  }

  unSubscribeEvents() {
    // modified by Richie #TP 1105083
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
  }

}
