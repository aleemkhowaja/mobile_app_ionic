import { AfterContentInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import Inputmask from 'inputmask';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { ConstantCommon } from '../../../psServices/models/common-constant';
import { IchangeValues, IdefaultValidators, IFloatingObject, IOptionsPsBaseField, IPsMaskOptions } from '../../../psServices/models/ps-common-interface';
import { PsCommonSettings } from '../../../psServices/models/ps-common.settings';
import { PsBaseComponent } from '../ps-base.component';


const validatorKeys = {
  maxlength: {
    errType: 'maxlength', msg: {
      msgKey: 'max_allowed_chars_key', // maximum allowed number of characters is <param>
      param: ['requiredLength']
    }
  },
  minlength: {
    errType: 'minlength', msg: {
      msgKey: 'min_allowed_chars_key', // minimum allowed number of characters is <param>
      param: ['requiredLength']
    }
  },
  max: {
    errType: 'max', msg: {
      msgKey: 'max_allowed_value_key', // maximum allowed value is <param>
      param: ['max']
    }
  },
  min: {
    errType: 'min', msg: {
      msgKey: 'min_allowed_value_key', // minimum allowed value is <param>
      param: ['min']
    }
  },
  pattern: {
    errType: 'pattern', msg: {
      msgKey: 'allowed_pattern_key', // the allowed pattern is <param>
      param: ['requiredPattern']
    }
  },
  required: {
    errType: 'required', msg: {
      msgKey: 'value_is_missing_key',
    }
  },
  validators: { errType: 'validators' },
  disabled: { errType: 'disabled' },
  zeroNotAllowed: {
    errType: 'zeroNotAllowed', msg: {
      msgKey: 'zero_not_allowed_key' // zero is not an allowed value
    }
  },
  // Added by Richie for #BUG 811937
  email: {
    errType: 'email', msg: {
      msgKey: 'email_not_valid_key' // Email is Not Valid
    }
  },
  advancedOptions: // Added by Gilbert for #BUG 883769
  {
    allowSpecialCharacter: 'allowSpecialCharacter',
    isAlphaNumeric: 'isAlphaNumeric',
    shouldStartWithLetter: 'shouldStartWithLetter',
    requireSpecialCharacters: 'requireSpecialCharacters',
    requireNumericCharacters: 'requireNumericCharacters',
    requireUpperCase: 'requireUpperCase',
    requireLowerCase: 'requireLowerCase',
    requireAlphabeticCharacters: 'requireAlphabeticCharacters',
    requireOnlyNumeric: 'requireOnlyNumeric',
    requireNoneConsecutive: 'requireNoneConsecutive',
  }
};

@Component({
  selector: 'ps-base-field',
  templateUrl: './ps-base-field.component.html',
  styleUrls: ['./ps-base-field.component.scss'],
})
export class PsBaseFieldComponent extends PsBaseComponent implements OnInit, AfterContentInit {
  patternErrorMsg: string;
  get fcValue(): string {
    return this.commonProv.valFromNestedObj(this.options.fcName, this.data);
  }
  public get showError() {
    // Richie: for testing purposes only!
    // if (this.options.fcName == 'omniUserCO.omniUserVO.MOBILE_NUMBER') {
    //   const x = this.errorMsgs && this.options.group.get(this.options.fcName) && this.options.group.get(this.options.fcName).touched;
    // }
    const errorMsgs = this.options.group.controls[this.options.fcName] ? this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_ERROR_MSGS] : undefined;
    return (errorMsgs && this.options.group.get(this.options.fcName) && this.options.group.get(this.options.fcName).touched) || (errorMsgs && this.options.group.controls[this.options.fcName] && this.options.group.controls[this.options.fcName].touched);
  }

  public get errorMsgs() {
    return this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_ERROR_MSGS];
  }

  public set errorMsgs(msg) {
    this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_ERROR_MSGS] = msg;
  }

  // Added by Richie for #BUG 818311
  get placeHolderTrans(): string {
    if (this.options && this.options.placeHolder) {
      return this.commonProv.translate(this.options.placeHolder);
    }
    return '';
  }
  // end Richie





  get value(): any {
    if (Object.keys(this.data).length === 0 && this.options.group && this.options.group.controls.formData) {
      this.data = this.options.group.controls.formData.value;
    }
    const val = this.commonProv.valFromNestedObj(this.options.fcName, this.data);
    // Added by Richie for #TP 1082495
    if (this.options.forceTriggerChange && !this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_PREVENT_CHANGE_EVENT]) {
      if (val != null && val !== '' && ((val !== this.oldValue && typeof val !== 'string' && typeof this.oldValue !== 'string') || ((typeof val === 'string' || typeof this.oldValue === 'string') && String(val) !== String(this.oldValue)))) {
        this.options.group.controls[this.options.fcName].setValue(val);
        this.options.group.controls[this.options.fcName].markAsTouched();
      }
    }
    // End Richie
    return val;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  set value(_value: any) {
    // used to prevent the set value be executed before the change event is called (case of keyin-input it calls the set value on every key pressed)
    if (this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_CALLED_AFTER_CHANGE]) {

      if (_value && typeof _value === 'string') {
        const trimValue = _value.trim();
        if (_value !== trimValue) {
          _value = trimValue;
          this.options.group.controls[this.options.fcName].setValue(_value);
        }
      }
      // End Richie
      if (this.innerValue !== _value) {
        this.innerValue = _value;
        // for the case we are setting default data from initialization then this.data is undefined.
        // and thus the function setValInsideNestedObj() will return a new object and we are setting it inside formData and thus loosing the bind to the object in the screen.
        if (Object.keys(this.data).length === 0 && this.options.group.controls.formData) {
          this.data = this.options.group.controls.formData.value;
        }
        this.data = this.commonProv.setValInsideNestedObj(this.options.fcName, _value, this.data);
        if (this.options.group.controls.formData) {
          this.options.group.controls.formData.setValue(this.data);
        }

        if (this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_CALL_VALIDATE_SERVICE] && this.screenDispElt && this.screenDispElt.SERVICE_MAPPING_ID) {
          this.callValidateService(_value);
        }
      }
      // reset it after each call
      this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_CALLED_AFTER_CHANGE] = false;
    }
  }

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService, private myElement?: ElementRef) {
    super(commonProv, loggerP);
  }
  @Input() options: IOptionsPsBaseField;

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onPsChange: EventEmitter<any> = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onPsEmpty: EventEmitter<any> = new EventEmitter<any>();

  // gilbertAndary in order to trigger focus for complex components
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onPsFocus: EventEmitter<any> = new EventEmitter<any>();

  public data: any = {};
  // bug 800979
  protected maxLength = null;
  protected get innerValue(): any {
    return this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_INNER_VALUE];
  }
  protected set innerValue(val: any) {
    this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_INNER_VALUE] = val;
  }
  protected get oldValue(): any {
    return this.options.group.controls[this.options.fcName][ConstantCommon.OLD_VALUE];
  }
  protected set oldValue(val: any) {
    this.options.group.controls[this.options.fcName][ConstantCommon.OLD_VALUE] = val;
  }
  // Added by Richie for #BUG 808160
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  protected _autoValidation = true;

  private defaultValidators: Map<string, IdefaultValidators>;
  private componentValidators: Map<string, IdefaultValidators>;
  private fieldDefaultValidators: IdefaultValidators;
  private fieldValidatorsMap: Map<string, ValidatorFn> = new Map<string, ValidatorFn>();
  private fieldValidators: ValidatorFn[] = [];
  // 825981
  protected fObject: IFloatingObject = {} as IFloatingObject;

  protected componentName: string; // Added by Richie for TP# 1082495

  /**
   * function used to check if the component is a selectDropDown or selectRadio 
   * then the value should always be the full selected object and not only the itemvalue.
   * or it returns the value as it is for all other components.
   * 
   * @author RichardZourob
   * TP# 1082495
   */
  public returnSelOptIfAny(val) {
    let curVal = val;
    const isDropDownOrRadio = (this.componentName === 'PsSelectDropdownComponent' || this.componentName === 'PsSelectRadioComponent') && this.options['listOfOptions'];
    if (isDropDownOrRadio && !(curVal instanceof Object)) {
      const selectItem = this.options['listOfOptions'].filter((item) => item.itemValue === curVal || String(item.itemValue) === String(curVal));
      if (selectItem && selectItem.length > 0) {
        curVal = selectItem[0];
      }
    }
    return curVal;
  }

  /**
   * function created temporarily until all dropdown components have been fixed with change event recieving IchangeValues object instead of newValue only
   * @param newVal
   * @param oldVal
   */
  public returnChangeObj_temp(newVal, oldVal) {
    const isDropDownOrRadio = (this.componentName === 'PsSelectDropdownComponent' || this.componentName === 'PsSelectRadioComponent') && this.options['listOfOptions'];
    if (isDropDownOrRadio) {
      return this.returnSelOptIfAny(newVal);
    } else {
      const values: IchangeValues = {
        newValue: newVal,
        oldValue: oldVal
      };
      return values;
    }
  }

  // gilbertAndary in order to trigger focus for complex components

  returnFcValue(): string {
    return this.fcValue;
  }

  returnValue(preventChangeEvent?: boolean): any {
    // preventChangeEvent Added by Richie for #TP 1082495 in order to prevent calling the change event on certain cases where it shouldn't be called like getter of select-dropdown
    if (preventChangeEvent) {
      this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_PREVENT_CHANGE_EVENT] = preventChangeEvent;
    }
    return this.value;
  }

  writeValue(v: any, callValidateService?: boolean) {
    this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_CALLED_AFTER_CHANGE] = true;
    if (callValidateService) {
      this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_CALL_VALIDATE_SERVICE] = true;
    } else {
      this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_CALL_VALIDATE_SERVICE] = false;
    }
    this.value = v;
  }

  ngOnInit() {
    this.init();
  }

  public init(updateDirectly?: boolean) {
    super.init();
    this.patternErrorMsg = validatorKeys.pattern.msg.msgKey;
    this.setCustIconOptions();
    // let disabledForm = this.options.group.disabled;
    if (this.options.group && this.options.fcName) {
      if (!this.options.group.contains('formData')) {
        this.commonProv.setFormData(this.options.group, {});
      }
      let formControl: FormControl;
      if (updateDirectly) {
        formControl = new FormControl('');
      } else {
        formControl = new FormControl('', { updateOn: 'blur' });
      }
      this.options.group.addControl(this.options.fcName, formControl);
      // set the validators default & through customization
      // this.putCustomizedValidators();
      this.applyCustomization(this.options.fcName);

      // subscribe the change event and emit the function defined from the html on the field
      this.options.group.controls[this.options.fcName].valueChanges.subscribe(newValue => {

        // let oldValue = this.options.group.value[this.options.fcName];
        // Added by Richie for #BUG 755638


        /*  //Richie: to check if we need it anymore
        if (this.type == 'amount' && this.oldValue && this.oldValue.toString().indexOf(ConstantCommon.THOUSANDS_SEPARATOR) > -1) {
           this.oldValue = parseFloat(this.oldValue.toString().replace(new RegExp(ConstantCommon.THOUSANDS_SEPARATOR, 'g'), ''));
         } */


        // End Richie
        // Added by Richie for #BUG 800626
        if (newValue && typeof newValue === 'string') {
          newValue = newValue.trim();
        }
        // end Richie
        if (this.oldValue && newValue === '' && newValue !== this.oldValue) {
          this.writeValue(newValue);
          this.oldValue = null;
          this.onPsEmpty.emit(newValue);
        }
        if (this._autoValidation && this.options.group.controls[this.options.fcName].invalid) {
          this.errorMsgs = [];
          this.checkValidationErrors();
          // this.options.group.controls[this.options.fcName].setValue(oldValue);
        } else {

          if (this.errorMsgs) {
            this.errorMsgs = null;
            // refresh the status of the form in case we entered a wrong value and then a correct one after it! then the form status remains invalid however it should be valid.
            this.options.group.controls[this.options.fcName].updateValueAndValidity({ emitEvent: false }); // emitEvent:false added by Richie for #BUG 824175
          }

          // mark that the field is changed
          this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_CALLED_AFTER_CHANGE] = true;
          const maskOptions: IPsMaskOptions = this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_MASK_OPTIONS];
          const maskApplicable: boolean = this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_MASK_APPLICABLE];
          // if the field has the mask applied on it then we need to set the value in order to set it in the VO even if there's no mask applied on it.
          if (maskApplicable) {
            if (newValue && maskOptions) {
              const unFormattedVal = Inputmask.unmask(newValue, maskOptions);
              if (maskOptions.alias === 'amount' && maskOptions.digits && maskOptions.digits > 0) {
                const decimalPos = unFormattedVal.length - maskOptions.digits;
                newValue = unFormattedVal.substring(0, decimalPos) + '.' + unFormattedVal.substring(decimalPos);
              } else {
                newValue = unFormattedVal;
              }
              if (maskOptions.numericInput) {
                newValue = parseFloat(newValue);
              }
            }
            // mark the field that it is being changed so that the value is formated correctly when bluring from the field (after the change event is triggered)
            this.writeValue(newValue, true);
          }

          let callChangeEvent = true;
          if (this.screenDispElt && this.screenDispElt.SERVICE_MAPPING_ID) {
            this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_CALL_VALIDATE_SERVICE] = true;
            callChangeEvent = false;
          }
          if (callChangeEvent) {
            this.callChangeEvent(newValue);
          }
        }
      });
    }

    this.initPreview(this.options.group);

    this.componentOpID = this.commonProv.getOperationID().subscribe((operID) => {
      if (operID) {
        this.operationID = operID;
      }
    }
    );

    this.formReset = this.commonProv.getResetForms().subscribe((form) => {
      if (form && this.options.group && this.options.group === form && this.options.fcName) {
        this.options.group.controls[this.options.fcName].setValue(null);
      }
    }
    );
    // moved to ngAfterContentInit() by Richie for #BUG 755638
    // setTimeout(() => {
    //   this.data = this.options.group.get('formData') ? this.options.group.get('formData').value : {};
    // }, 0);
    // end Richie

    this.onPsInit.emit(this.options.fcName ? { fcName: this.options.fcName } : null);

  }

  callChangeEvent(newValue) {
    // in order not to trigger the change function everytime we enter the field and leave it without changing the value
    if (newValue != null && newValue !== '' && ((newValue !== this.oldValue && typeof newValue !== 'string' && typeof this.oldValue !== 'string') || ((typeof newValue === 'string' || typeof this.oldValue === 'string') && String(newValue) !== String(this.oldValue)))) {

      // Commented/Added by Richie temporarily until the fix of all dropdowns change event object has been fixed then we uncomment and remove the call of the temp function
      // const values: IchangeValues = {
      //   newValue: this.returnSelOptIfAny(newValue),
      //   oldValue: this.returnSelOptIfAny(this.oldValue)
      // };
      const values = this.returnChangeObj_temp(newValue, this.oldValue);
      // End Richie temporarily

      // this.oldValue = this.innerValue;
      this.oldValue = newValue;
      this.onPsChange.emit(values);
    }
  }

  async callValidateService(newValue) {
    if (newValue != null && newValue !== '' && ((newValue !== this.oldValue && typeof newValue !== 'string' && typeof this.oldValue !== 'string') || ((typeof newValue === 'string' || typeof this.oldValue === 'string') && String(newValue) !== String(this.oldValue)))) {
      let callChangeEvent = true;
      this._iconOptions = null;
      this._iconOptions = { iconName: 'loading' };
      this.resetIconOptions();
      const sessionVars = this.common.session.getFilteredSessionObject();
      const customizationRequest: any = {
        mappingId: this.screenDispElt.SERVICE_MAPPING_ID,
        commonParametersList: { executePWSServiceFlag: '1', ...this.options.group.controls.formData.value }
      };

      Object.assign(customizationRequest.commonParametersList, sessionVars);

      if (this.options['listOfOptions']) {
        const item = this.options['listOfOptions'].filter((item) => item.itemValue === newValue);
        if (item && item.length > 0) {
          customizationRequest.commonParametersList[this.options.fcName] = item[0];
        }
      }

      const result: any = await this.commonProv.commonServiceCallForCustomization(customizationRequest).catch(error => {
        if (error.data.outputType === 'U') {
          const resError = { msgKey: error.data.commonResponseList.outputNotification };
          this.errorMsgs = [];
          this.errorMsgs.push(resError);
          this._iconOptions = { iconName: 'cross', psClass: 'red-cross' };
          this.options.group.controls[this.options.fcName].setErrors({ serverError: error.data.commonResponseList.outputNotification }, { emitEvent: false });
          callChangeEvent = false;
          this.resetIconOptions();
        }
        this.logger.error('Error ! while calling common service for customization ', error);
      });

      if (result && result.data && result.data.outputType === 'SC') {
        if (result.data.commonResponseList) {
          CommonUtils.copyOnlyExistingPropOfObject(result.data.commonResponseList, this.data, Object.keys(this.options.group.controls));
        }
        this._iconOptions = { iconName: 'checkmark', psClass: 'green-tick' };
        this.resetIconOptions();
      } else {
        callChangeEvent = false;
      }
      this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_CALL_VALIDATE_SERVICE] = false;

      if (callChangeEvent) {
        this.callChangeEvent(newValue);
      }
    }
  }

  applyCustomization(fieldIdName: string) {
    this.operCustomization = this.commonProv.returnOperCustomizationObserv().subscribe(operCust => {
      const myScreenOperCust = operCust.get(PsCommonSettings.oper_ID);
      if (myScreenOperCust) {
        if (myScreenOperCust.get(fieldIdName)) {
          this.screenDispElt = myScreenOperCust.get(fieldIdName);
          if (this.options.group && this.options.group.get(fieldIdName)) {
            this.options.group.controls[fieldIdName][ConstantCommon.CONTROLLER_SCREEN_DISPLAY_VO] = this.screenDispElt;
          }
        }
        if (this.isHelpEnabled) {
          this.createHelpMessage();
        }
      }
      this.putCustomizedValidators();
    });

  }
  putCustomizedValidators() {
    // Richie: to be done
    this.fieldValidators = [];
    this.defaultValidators = this.commonProv.getDefaultValidators(this.options.group);
    this.componentValidators = this.commonProv.getComponentValidators(this.options.group);
    if (this.componentValidators) {
      this.fieldDefaultValidators = this.componentValidators.get(this.options.fcName);
      if (this.defaultValidators) {
        this.fieldDefaultValidators = this.fieldDefaultValidators ? this.fieldDefaultValidators : {};
        const defaultVal = this.defaultValidators.get(this.options.fcName);
        this.commonProv.copyObject(this.fieldDefaultValidators, defaultVal, false, true);
      }
    } else {
      this.fieldDefaultValidators = this.defaultValidators ? this.defaultValidators.get(this.options.fcName) : null;
    }
    this.finalValidator = this.fieldDefaultValidators ? this.fieldDefaultValidators : { overrideCust: true }; // we don't care if overrideCust is set or not
    if (this.fieldDefaultValidators) {
      // conditions modified by Richie for #BUG 1100091 in order to be able to set 0 as a value since the condition was returned as false in case of zero.
      if (this.fieldDefaultValidators.maxLength != null && typeof this.fieldDefaultValidators.maxLength !== 'undefined') {
        this.fieldValidatorsMap.set(validatorKeys.maxlength.errType, Validators.maxLength(this.fieldDefaultValidators.maxLength));
        this.maxLength = this.fieldDefaultValidators.maxLength;
      }
      if (this.fieldDefaultValidators.minLength != null && typeof this.fieldDefaultValidators.pattern !== 'undefined') {
        this.fieldValidatorsMap.set(validatorKeys.minlength.errType, Validators.minLength(this.fieldDefaultValidators.minLength));
        this.finalValidator.minLength = this.fieldDefaultValidators.minLength;
      }
      if (this.fieldDefaultValidators.maxValue != null && typeof this.fieldDefaultValidators.maxValue !== 'undefined') {
        // using customized maxValidator instead of Validators.max by Richie for #BUG 755638
        this.fieldValidatorsMap.set(validatorKeys.max.errType, this.commonProv.custMaxValidator(this.fieldDefaultValidators.maxValue));
        // #BUG 825981 to solve floating problems
        this.fObject = this.returnNbPartsLen(this.fieldDefaultValidators.maxValue.toString());
      } else {
        this.fObject = this.returnNbPartsLen(ConstantCommon.DEFAULT_MAX_VALUE.toString());
        this.decPoints = ConstantCommon.DEFAULT_MAX_DECIMAL_LENGTH;
      }
      // End #BUG 825981
      if (this.fieldDefaultValidators.minValue != null && typeof this.fieldDefaultValidators.minValue !== 'undefined') {
        // using customized minValidator instead of Validators.min by Richie for #BUG 755638
        this.fieldValidatorsMap.set(validatorKeys.min.errType, this.commonProv.custMinValidator(this.fieldDefaultValidators.minValue));
      }
      if (this.fieldDefaultValidators.pattern != null && typeof this.fieldDefaultValidators.pattern !== 'undefined') {
        this.fieldValidatorsMap.set(validatorKeys.pattern.errType, Validators.pattern(this.fieldDefaultValidators.pattern.expression));
      }
      if (this.fieldDefaultValidators.visible != null) {
        this.visible = this.fieldDefaultValidators.visible;
      }
      if (this.fieldDefaultValidators.disabled != null) {
        this.disabled = this.fieldDefaultValidators.disabled;
      }
      if (this.fieldDefaultValidators.required !== null) {
        this.required = this.fieldDefaultValidators.required;
        // mandatory is priority on readonly.
        if (this.required) {
          this.disabled = false;
        }
      }
      // add the custom validators as is
      if (this.fieldDefaultValidators.validators) {
        this.fieldDefaultValidators.validators.forEach((value) => {
          this.fieldValidators.push(value);
        });
      }
    } else {
      this.fieldDefaultValidators = {
        overrideCust: false
      };
    }

    this.applyCustValidators();
  }

  applyCustValidators() {
    super.applyCustValidators(!this.fieldDefaultValidators.overrideCust);
    if (this.options.allowCust && this.screenDispElt) {
      if (!this.fieldDefaultValidators.overrideCust) {
        if (this.screenDispElt.MAX_LENGTH != null && typeof this.screenDispElt.MAX_LENGTH !== 'undefined') {
          this.fieldValidatorsMap.set(validatorKeys.maxlength.errType, Validators.maxLength(this.screenDispElt.MAX_LENGTH));
          this.maxLength = this.finalValidator.maxLength = this.screenDispElt.MAX_LENGTH;
        }
        if (this.screenDispElt.MIN_LENGTH != null && typeof this.screenDispElt.MIN_LENGTH !== 'undefined') {
          this.fieldValidatorsMap.set(validatorKeys.minlength.errType, Validators.minLength(this.screenDispElt.MIN_LENGTH));
          this.finalValidator.minLength = this.screenDispElt.MIN_LENGTH;
        }
        if (this.screenDispElt.IS_READONLY != null && typeof this.screenDispElt.IS_READONLY !== 'undefined') {
          this.disabled = this.finalValidator.disabled = this.screenDispElt.IS_READONLY === 1;
        }
        if (this.screenDispElt.IS_MANDATORY != null && typeof this.screenDispElt.IS_MANDATORY !== 'undefined') {
          this.required = this.finalValidator.required = this.screenDispElt.IS_MANDATORY === 1;
        }
      }
      if (this.screenDispElt.KEY_LABEL_CODE != null && typeof this.screenDispElt.KEY_LABEL_CODE !== 'undefined') {
        this.options.labelKey = this.screenDispElt.KEY_LABEL_CODE;
      }

      if (this.screenDispElt.IS_VISIBLE != null && typeof this.screenDispElt.IS_VISIBLE !== 'undefined') {
        this.visible = this.finalValidator.visible = this.screenDispElt.IS_VISIBLE === 1;
      }
      if (this.screenDispElt.ZERO_NOT_ALLOWED === 1) {
        this.fieldValidatorsMap.set(validatorKeys.zeroNotAllowed.errType, this.zeroNotAllowedValidatorFn);
      }
      if (this.screenDispElt.MAX_VALUE != null && typeof this.screenDispElt.MAX_VALUE !== 'undefined') {
        this.fieldValidatorsMap.set(validatorKeys.max.errType, this.commonProv.custMaxValidator(this.screenDispElt.MAX_VALUE));
        this.fObject = this.returnNbPartsLen(this.screenDispElt.MAX_VALUE.toString());
      }
      if (this.screenDispElt.MIN_VALUE != null && typeof this.screenDispElt.MIN_VALUE !== 'undefined') {
        this.fieldValidatorsMap.set(validatorKeys.min.errType, this.commonProv.custMinValidator(this.screenDispElt.MIN_VALUE));
      }
      if (this.screenDispElt.PATTERN != null && typeof this.screenDispElt.PATTERN !== 'undefined') {
        if (this.screenDispElt.PATTERN_ERROR_CODE != null && typeof this.screenDispElt.PATTERN_ERROR_CODE !== 'undefined') {
          this.patternErrorMsg = this.screenDispElt.PATTERN_ERROR_CODE;
        }
        this.fieldValidatorsMap.set(validatorKeys.pattern.errType, this.commonProv.custRegExpValidator(this.screenDispElt.PATTERN));
      }
      /* if (this.screenDispElt.SERVICE_MAPPING_ID !== null && typeof this.screenDispElt.SERVICE_MAPPING_ID !== 'undefined') {
        const customizationRequest: any = {
          mappingId: this.screenDispElt.SERVICE_MAPPING_ID,
          commonParametersList: { ...this.options.group.controls.formData.value }
        };
        this.fieldValidatorsMap.set('serverError', this.commonProv.custServiceMappingValidator(customizationRequest, this.options.group));
      } */
      if (this.screenDispElt.PLACEHOLDER_LABEL_CODE != null && typeof this.screenDispElt.PLACEHOLDER_LABEL_CODE !== 'undefined') {
        this.options.placeHolder = this.screenDispElt.PLACEHOLDER_LABEL_CODE;
      }
      if (this.screenDispElt.DEFAULT_VALUE != null && typeof this.screenDispElt.DEFAULT_VALUE !== 'undefined' && typeof this.value === 'undefined') {
        // use the function returnSelOptIfAny in order to set the default_value as the selected obj not the itemValue only. by Richie for TP# 1082495
        this.writeValue(this.returnSelOptIfAny(this.screenDispElt.DEFAULT_VALUE));
      }
      if (this.screenDispElt && this.screenDispElt.SERVICE_MAPPING_ID) {
        this._iconOptions = {
          iconName: 'info',
        };
        this.resetIconOptions();
      }
    }

    // set all the validators on the component
    if (this.required) {
      this.fieldValidatorsMap.set(validatorKeys.required.errType, Validators.required);
      // since mandatory have priority over visibility and readonly then set the field to visible and enabled
      this.visible = this.finalValidator.visible = true;
      this.disabled = this.finalValidator.disabled = false;
    } else {
      this.fieldValidatorsMap.delete(validatorKeys.required.errType);
    }

    // check if the group is initialized
    if (this.options.group && this.options.group.controls[this.options.fcName]) {
      if (this.disabled) {
        this.options.group.controls[this.options.fcName].disable();
      } else if (this.options.group.controls[this.options.fcName].disabled) {
        this.options.group.controls[this.options.fcName].enable();
      }

      // add the default & customized validators
      this.fieldValidatorsMap.forEach((value, key) => {
        this.fieldValidators.push(value);
      });
      this.options.group.controls[this.options.fcName].setValidators(this.fieldValidators);
      this.options.group.controls[this.options.fcName].updateValueAndValidity({ emitEvent: false });
    }
  }

  // 825981 Mohamad Shour
  // this function take a string value and count the characters before and after the dot.
  protected returnNbPartsLen(value: string): IFloatingObject {
    const nbPartsLen: IFloatingObject = {} as IFloatingObject;
    const decPos = value.indexOf(ConstantCommon.DECIMAL_SEPARATOR);
    if (decPos > -1) {
      nbPartsLen.naturalMaxLength = decPos;
      nbPartsLen.decimalMaxLength = value.length - decPos - 1;
    } else {
      nbPartsLen.naturalMaxLength = value.length;
      nbPartsLen.decimalMaxLength = 0; // ConstantCommon.INTEGER_ZERO;

    }

    return nbPartsLen;

  }

  // Added by Richie for #BUG 755638
  ngAfterContentInit() {
    if (this.options) {
      if (this.options.group) {
        this.data = this.options.group.get('formData') ? this.options.group.get('formData').value : {};
      } else {
        this.data = {};
      }
    }
  }
  // End Richie

  checkValidationErrors(): any {
    const errors = this.options.group.controls[this.options.fcName].errors;
    if (errors) {
      let validationMsg: {
        msgKey: string,
        param?: any
      };
      if (!this.errorMsgs) {
        this.errorMsgs = [];
      }

      // eslint-disable-next-line guard-for-in
      for (const err in errors) {
        // const errAtributeName = Object.keys(err).keys[0];
        const hasProp = validatorKeys.hasOwnProperty(err);
        // for predefined error handling of validators with fixed errors
        if (hasProp) {

          // special handling for the pattern error msgs(implemented to match the old implementation in ionic3 project for #BUG 794943)
          if (validatorKeys.pattern.errType === err && this.fieldDefaultValidators && this.fieldDefaultValidators.pattern && this.fieldDefaultValidators.pattern.errorMsgs) {
            this.errorMsgs.push(...this.fieldDefaultValidators.pattern.errorMsgs);
          } else {
            const defaultError = validatorKeys[err].msg;
            if (validatorKeys.pattern.errType === err) {
              defaultError.msgKey = this.patternErrorMsg;
            }
            validationMsg = {
              msgKey: defaultError.msgKey,
            };
            if (defaultError.param && defaultError.param.length > 0) {
              defaultError.param.forEach((element, index) => {
                if (defaultError.param.length > 1) {
                  const paramName = 'param' + index;
                  validationMsg.param[paramName] = errors[err][element];
                } else {
                  validationMsg.param = errors[err][element];
                }
              });
            }
            this.errorMsgs.push(validationMsg);
          }
        } else {
          validationMsg = {
            msgKey: errors[err]
          };
          this.errorMsgs.push(validationMsg);

        }
      }

      // this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_ERROR_MSGS] = errorMsgs;

    }
  }

  public addNewError(value: { msgKey: string, param?: any }) {
    this.errorMsgs ? this.errorMsgs.push(value) : this.errorMsgs = [value];
  }

  zeroNotAllowedValidatorFn(control: FormControl): any {
    if (control.value === 0) {
      return {
        zeroNotAllowed: true
      };
    }
    return null;
  }

  /**
   * function used to check if the key pressed is allowed
   * and satisfies the conditions of being only alphanumeric or white character
   * and not a special character.
   * it returns true if the key is allowed and false if it is not.
   *
   * @author RichardZourob
   * @param e
   */
  public isAlphaNumericKey(e: KeyboardEvent): boolean {
    const key = e.key;
    const keyCode = e.keyCode;
    const regExp = new RegExp(ConstantCommon.ALPHA_NUMERIC_WITH_WHITE_CHAR_REGEX);
    if (ConstantCommon.ALLOWED_KEY_CODES.indexOf(keyCode) === -1 && regExp.test(key)) {
      return false;
    }
    return true;
  }

  createHelpMessage() {
    if (this.finalValidator) {
      const advancedOptions = this.finalValidator.advancedOptions;
      let helpMessages = [];
      if (this.finalValidator.minLength) {
        helpMessages.push(this.commonProv.translate('min_length_key') + ' ' + this.finalValidator.minLength);
      }
      if (this.finalValidator.maxLength) {
        helpMessages.push(this.commonProv.translate('max_length_key') + ' ' + this.finalValidator.maxLength);
      }
      if (this.finalValidator.maxLength && this.finalValidator.minLength && this.finalValidator.maxLength === this.finalValidator.minLength) {
        helpMessages = [];
        helpMessages.push(this.commonProv.translate('length_should_be_key') + ' ' + this.finalValidator.minLength);
      }
      if (this.finalValidator.minValue) {
        helpMessages.push(this.commonProv.translate('min_value_key') + ' ' + this.finalValidator.minValue);
      }
      if (this.finalValidator.maxValue) {
        helpMessages.push(this.commonProv.translate('max_value_key') + ' ' + this.finalValidator.maxValue);
      }

      if (this.finalValidator.maxValue && this.finalValidator.minValue && this.finalValidator.maxValue === this.finalValidator.minValue) {
        helpMessages.pop();
        helpMessages.pop();
        helpMessages.push(this.commonProv.translate('value_should_be_key') + ' ' + this.finalValidator.maxValue);
      }
      if (advancedOptions) {
        if (advancedOptions.allowSpecialCharacter) {
          // helpMessages.push(this.commonProv.translate("max_length_key") + this.finalValidator.maxLength);
        }
        if (advancedOptions.isAlphaNumeric) {
          // helpMessages.push(this.commonProv.translate("max_length_key") + this.finalValidator.maxLength);
        }
        if (advancedOptions.shouldStartWithLetter) {
          helpMessages.push(this.commonProv.translate('shouldStartWithLetter_key'));
        }
        if (advancedOptions.requireSpecialCharacters) {
          helpMessages.push(this.commonProv.translate('requireSpecialCharacters_key'));
        }
        if (advancedOptions.requireNumericCharacters) {
          helpMessages.push(this.commonProv.translate('requireNumericCharacters_key'));
        }
        if (advancedOptions.requireUpperCase) {
          helpMessages.push(this.commonProv.translate('requireUpperCase_key'));
        }
        if (advancedOptions.requireLowerCase) {
          helpMessages.push(this.commonProv.translate('requireLowerCase_key'));
        }
        if (advancedOptions.requireAlphabeticCharacters) {
          helpMessages.push(this.commonProv.translate('requireAlphabeticCharacters_key'));
        }
        if (advancedOptions.requireOnlyNumeric) {
          helpMessages.push(this.commonProv.translate('requireOnlyNumeric_key'));
        }
        if (advancedOptions.requireNoneConsecutive) {
          helpMessages.push(this.commonProv.translate('requireNoneConsecutive_key'));
        }
      }
      if (helpMessages.length > 0) {
        // this.helpMessage = helpMessages.join(", ");
      }
    }
  }

  public resetIconOptions() {
    if (this._iconOptions) {
      this.itemOptions.serviceMappingIconOptions = this._iconOptions;
    }
  }

  /**
   * function used in wrapper components to trigger the change event of the child component.
   *
   * @author RichardZourob
   * TP# 1082495
   */
  onChange(event) {
    this.onPsChange.emit(event);
  }

  /**
   * function used in wrapper components to trigger the empty event of the child component.
   *
   * @author RichardZourob
   * TP# 1082495
   */
  onEmpty(event) {
    this.onPsEmpty.emit(event);
  }

  /**
   * function used in wrapper components to trigger the focus event of the child component.
   *
   * @author RichardZourob
   * TP# 1082495
   */
  onFocus(event) {
    this.onPsFocus.emit(event);
  }

  protected setCustIconOptions() {
    this.required = ConstantCommon.DEFAULT_MANDATORY === 1 ? true : false;
    this.custIconOptions.fieldNameId = this.options.fcName ? this.options.fcName : this.id;
    this.custIconOptions.fieldNameDesc = this.options.labelKey ? this.options.labelKey : null;
    this.custIconOptions.availableCustomization.DEFAULT_VALUE = true;
    this.custIconOptions.availableCustomization.SERVICE_MAPPING = true;
    this.custIconOptions.formGroup = this.options.group;
  }

}
