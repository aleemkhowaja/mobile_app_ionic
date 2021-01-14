import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsFieldEntity, IsysParamObj } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsBaseFieldComponent } from '../ps-base-field.component';


/**
 * @author Aftab.Ali
 * @since 27/10/2020
 *
 * <p> PsFieldEntityComponent is a techincal base component for complex components those have one fcname for combined value</p>
 */
@Component({
  selector: 'ps-field-entity',
  templateUrl: './ps-field-entity.component.html',
  styleUrls: ['./ps-field-entity.component.scss'],
})
export class PsFieldEntityComponent extends PsBaseFieldComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() options: IOptionsPsFieldEntity;
  protected entityFormGroup = new FormGroup({});
  private customizationMap: Map<string, any>;
  protected entityVO: any = {};
  public isValid = false;
  private entityCustSubscription;
  public entityScreenDispElt: IsysParamObj;

  constructor(
    commonService: PsCommonService,
    logger: LoggerService) {
    super(commonService, logger);
  }

  get childComponents() {
    return this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_CHILD_COMPONENTS];
  }

  set childComponents(fcNamesList: string[]) {
    if (fcNamesList && fcNamesList.length > 0) {
      this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_CHILD_COMPONENTS] = fcNamesList;
    }
  }

  ngAfterViewInit(): void {
    const fcNamesList = [];
    Object.keys(this.entityFormGroup.controls).forEach(fcName => {
      fcNamesList.push(fcName);
    });

    const index: number = fcNamesList.indexOf('formData');
    if (index !== -1) {
      fcNamesList.splice(index, 1);
    }
    this.childComponents = fcNamesList;
    if (this.childComponents && this.childComponents.length > 0) {
      this.entityCustSubscription = this.commonProv.returnEntityOperCustomizationObserv().subscribe(entityOperCust => {
        this.customizationMap = entityOperCust.get(PsCommonSettings.oper_ID);
        if (this.customizationMap) {
          const custElt = this.customizationMap.get(this.options.fcName);
          if (custElt) {
            this.entityScreenDispElt = custElt;
            this.applyChildCustomization();
          }
        }
      });
    }
  }

  ngOnInit() {
    super.init();
    this.custIconOptions.component = this.options.childComponent;
    this.custIconOptions.componentOptions = this.options;
    this.custIconOptions.availableCustomization.IS_MANDATORY = true;
    this.entityScreenDispElt = this.commonProv.getInitialState(this.options.fcName);
    if (typeof this.entityScreenDispElt === 'undefined' || this.entityScreenDispElt == null) {
      this.entityScreenDispElt = {
        IS_MANDATORY: ConstantCommon.DEFAULT_MANDATORY,
        IS_READONLY: ConstantCommon.DEFAULT_READONLY,
        IS_VISIBLE: ConstantCommon.DEFAULT_VISIBLE
      };
    }
    let entityScreenDisp = this.commonProv.returnEntityOperCustomization().get(PsCommonSettings.oper_ID);
    if (typeof entityScreenDisp === 'undefined' || entityScreenDisp === null) {
      entityScreenDisp = new Map<string, any>();
    }
    entityScreenDisp.set(this.options.fcName, this.entityScreenDispElt);
    this.commonProv.setEntityScreenOperCustomization(entityScreenDisp, false);
  }

  protected setEntityValue(entityValue: any) {
    this.options.group.controls[this.options.fcName].setValue(entityValue, { emitEvent: false });
    this.options.group.controls[this.options.fcName].markAsTouched();
    this.options.group.controls[this.options.fcName].markAsDirty();
    super.writeValue(entityValue);
  }

  protected setEntityErrorMessage(errorMessage: string) {
    this.options.group.controls[this.options.fcName].setValue(null);
    this.options.group.controls[this.options.fcName].setErrors({ customErrorKey: errorMessage });
    this.errorMsgs = [];
    super.checkValidationErrors();
    this.isValid = false;
  }

  private async applyChildCustomization() {
    // for disabling the whole internal form
    if (this.entityFormGroup && this.options.group && this.customizationMap) {
      const formDisObj: IsysParamObj = this.customizationMap.get(ConstantCommon.FORM_READONLY);
      if (formDisObj && formDisObj.IS_READONLY === 1) {
        this.entityFormGroup.disable();
      }

      if (PsCommonSettings.custMode === false && this.entityFormGroup.controls && this.entityScreenDispElt && this.childComponents) {

        const fcNamesList = this.childComponents;
        const isVisible = this.isChildPropertySet(ConstantCommon.ACTION_TYPE_VISIBLE);

        // if (isVisible) {
        //   if (this.entityScreenDispElt.IS_VISIBLE === 0) {
        //     this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, fcNamesList, this.entityScreenDispElt.IS_VISIBLE);
        //   }
        //   if (this.entityScreenDispElt.IS_READONLY === 1) {
        //     this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, fcNamesList, this.entityScreenDispElt.IS_READONLY);
        //   }
        // } else {
        //   this.entityScreenDispElt.IS_VISIBLE = 0;
        // }

        if (this.entityScreenDispElt.IS_READONLY === 1) {
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, fcNamesList, this.entityScreenDispElt.IS_READONLY);
        } else {
          fcNamesList.forEach(fcName => {
            const initialCust = this.commonProv.getInitialState(fcName);
            this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [fcName], initialCust.IS_READONLY);
          });
        }

        // const isMandatory = this.isChildPropertySet(ConstantCommon.ACTION_TYPE_MANDATORY);
        // if (isMandatory) {
        //   this.entityScreenDispElt.IS_VISIBLE = 1;
        //   this.entityScreenDispElt.IS_READONLY = 0;
        //   this.entityScreenDispElt.IS_MANDATORY = 1;
        //   // this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.options.fcName], 1);
        // }
      }
    }
  }

  private isChildPropertySet(childProperty: string) {
    const fcNameList = this.childComponents;
    let isChildProperty = false;

    for (const childFcName of fcNameList) {
      const childValidation = this.commonProv.getElementValidations(childFcName);
      if (childProperty === ConstantCommon.ACTION_TYPE_VISIBLE && childValidation.IS_VISIBLE === 1) {
        isChildProperty = true;
        return isChildProperty;
      } else if (childProperty === ConstantCommon.ACTION_TYPE_MANDATORY && childValidation.IS_MANDATORY === 1) {
        isChildProperty = true;
        return isChildProperty;
      }
    }// END of for loop

    return isChildProperty;
  }

  protected setEntityFormGroup() {
    this.commonProv.setFormData(this.entityFormGroup, this.entityVO);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.entityCustSubscription) {
      this.entityCustSubscription.unsubscribe();
    }
  }

}
