import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoggerService } from '../../psServices/logger/logger.service';
import { ConstantCommon } from '../../psServices/models/common-constant';
import { IdefaultValidators, IOptionsPsActionButton, IOptionsPsActionIcon, IOptionsPsBase, IOptionsPsContainerItem, IOptionsPsIconCustomization, IsysParamObj } from '../../psServices/models/ps-common-interface';
import { PsCommonSettings } from '../../psServices/models/ps-common.settings';
import { PsCommonService } from '../../psServices/ps-common/ps-common.service';


/**
 * Generated class for the PsBaseComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'ps-base',
  templateUrl: './ps-base.component.html',
  styleUrls: ['./ps-base.component.scss'],
})
export class PsBaseComponent implements OnInit, OnDestroy {
  @Input() options: IOptionsPsBase;
  @Input() id: string;
  @Input() class: string;

  @Input() public psIcon: string;
  @Input() public ionicIcon: string;
  @Input() public iconPosition: 'end' | 'start' = 'end';
  @Input() decPoints = 0;


  @Output() public onPsInit: EventEmitter<any> = new EventEmitter<any>();

  /* Richie: to be done
  @Input() public set autoValidation(autoValidate: boolean) {
    if (autoValidate && !this._autoValidation) {
      this.checkValidationErrors();
    }
    this._autoValidation = autoValidate;
  } */
  protected _iconOptions: IOptionsPsActionIcon = null;
  public itemOptions: IOptionsPsContainerItem = {};
  constructor(protected common: PsCommonService, protected logger: LoggerService, protected elRef?: ElementRef) { }

  // end Richie

  get custMode() {
    return PsCommonSettings.custMode && this.options && this.options.allowCust;
  }

  public custIconOptions: IOptionsPsIconCustomization = {
    availableCustomization: {
      IS_VISIBLE: true,
      IS_READONLY: true,
      KEY_LABEL_ID: true
    }
  };
  custLabelButtonOptions: IOptionsPsActionButton = {
    type: 'button',
    iconName: 'create',
    allowCust: false,
    group: null
  };


  public delimiter = ConstantCommon.PREVIEW_COMPONENT_DELIMITER;
  public componentPreview;
  public componentOpID;
  public formReset;
  public operCustomization;
  public previewMode: boolean;
  public operationID: number;
  public screenDispElt: IsysParamObj;
  public required = false;
  public readonly = false;
  public disabled = false;
  public visible = true;
  public visibleOldValue;

  // Added by Richie in order to hide the labeling button until the labeling screen is available.
  public enableLabeling = false;

  public helpType: 'hint' | 'tooltip' = 'tooltip';
  public isHelpEnabled = true;
  public helpMessage = '1231232';
  public finalValidator: IdefaultValidators = { overrideCust: true };

  ngOnInit() {
    this.init();
    this.applyCustomization(this.id);
  }

  public init() {
    if (this.custIconOptions.fieldNameId === undefined) {
      this.custIconOptions.fieldNameId = this.id;
    }
    if (this.options) {
      if (this.options.allowCust === undefined) {
        this.options.allowCust = true;
      }
      if (!this.options.psClass) {
        this.options.psClass = ConstantCommon.psComponentsDefaultClass;
      }
      if (this.options.labelKey) {
        this.custIconOptions.fieldNameDesc = this.options.labelKey;
      }
    }
    this.componentOpID = this.common.getOperationID().subscribe((operID) => {
      if (operID) {
        this.operationID = operID;
      }
    }
    );
  }

  ngOnDestroy() {
    this.destroy();
  }
  public destroy() {
    if (this.componentPreview) {
      this.componentPreview.unsubscribe();
    }
    if (this.componentOpID) {
      this.componentOpID.unsubscribe();
    }
    if (this.operCustomization) {
      this.operCustomization.unsubscribe();
    }
    if (this.formReset) {
      this.formReset.unsubscribe();
    }
  }

  applyCustValidators(notOverrideCust: boolean) {
    if (this.options && this.options.allowCust && this.screenDispElt) {
      if (notOverrideCust) {
        if (this.screenDispElt.IS_READONLY != null && typeof this.screenDispElt.IS_READONLY != 'undefined') {
          this.disabled = this.finalValidator.disabled = this.screenDispElt.IS_READONLY == 1;
        }
        if (this.screenDispElt.IS_VISIBLE != null && typeof this.screenDispElt.IS_VISIBLE != 'undefined') {
          this.visible = this.finalValidator.visible = this.screenDispElt.IS_VISIBLE == 1;
          if (this.elRef && (this.visible != this.visibleOldValue)) {
            this.visibleOldValue = this.visible;
            this.showHideElement(this.elRef.nativeElement);
            this.showHideElement(this.elRef.nativeElement ? this.elRef.nativeElement.parentElement : null);
          }
        }
      }
      if (this.screenDispElt.KEY_LABEL_CODE != null && typeof this.screenDispElt.KEY_LABEL_CODE != 'undefined') {
        this.options.labelKey = this.screenDispElt.KEY_LABEL_CODE;
      }
    }
  }

  applyCustomization(fieldIdName: string) {
    this.operCustomization = this.common.returnOperCustomizationObserv().subscribe(operCust => {
      const myScreenOperCust = operCust.get(PsCommonSettings.oper_ID);
      if (myScreenOperCust) {
        if (myScreenOperCust.get(fieldIdName)) {
          this.screenDispElt = myScreenOperCust.get(fieldIdName);
        }
        this.applyCustValidators(true);
      }
    });
  }

  openCustLabel(event) {
    // // console.log("labeling button is pressed");
  }

  async openSpecialCustomization(myEvent, type) {
    /*// Richie: to be done
     let fieldNameID = '';
    if (!(this.fcName || this.id)) {
      const msgTitle = this.common.translate('cannot_proceed_key');
      const msgText = this.common.translate('elemIdAndNameChecking_key');
      const okBtn = this.common.translate('ok_key');
      return;
    } else {
      fieldNameID = this.fcName ? this.fcName : this.id;
    }

    const popover = await this.common.popoverCtrl.create({
      component: CustPopoverPage,
      componentProps: {
        operId: this.operationID,
        fieldName: fieldNameID,
        fieldType: type
      }
    });
    // {
    //   ev: myEvent
    // }
    await popover.present();//.catch((err) => { this.logger.error(err); }); */
  }

  initPreview(group: FormGroup) {
    this.componentPreview = this.common.getMode().subscribe((subject) => {
      if (subject && group && group === subject.formGroup) {
        this.previewMode = subject.preview;
      }
    });

  }

  /**
   * function used in wrapper components to trigger the init event of the child component.
   *
   * @author RichardZourob
   * TP# 1082495
   */
  onInit(event) {
    this.onPsInit.emit(event);
  }

  /**
   * function to hide/show element
   *
   * @author GilbertAndary
   * TP# 1039642
   */
  showHideElement(element) {
    if (element) {
      if (this.visible) {
        element.style.display = '';
      } else {
        element.style.display = 'none';
      }
    }
  }

}
