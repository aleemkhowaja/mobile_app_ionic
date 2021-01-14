import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AuthMatrixViewer } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-authentication-matrix/ps-authentication-matrix.component.interface';
import { AuthenticationMatrixService } from 'src/app/commonBussinessSRC/psServices/authentication-matrix/authentication-matrix.service';
import { PsFieldEntityComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-entity/ps-field-entity.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsPsBaseField, IOptionsPsKeyinInput, IOptionsPsActionIcon, IPsSelect, IOptionsPsActionIconExposed, IOptionsPsContainerItem, IOptionsPsFieldLabel, IsysParamObj } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsDropdownCountryCodeExposed } from '../../ps-select-dropdown/ps-dropdown-country-code/ps-dropdown-country-code.component.interfaces';
import { IOptionsPsEntityPhoneNumberExposed } from './ps-entity-phone-number.component.interfaces';

@Component({
  selector: 'ps-entity-phone-number',
  templateUrl: './ps-entity-phone-number.component.html',
  styleUrls: ['./ps-entity-phone-number.component.scss'],
})
export class PsEntityPhoneNumberComponent extends PsFieldEntityComponent implements OnInit, AfterViewInit, OnChanges {
  entityOptions: any = {};
  @Input() options: IOptionsPsEntityPhoneNumberExposed;
  subscriberSize = 13;
  countriesOptions: IOptionsPsBaseField = {}; // ps-dropdown-country-code options
  public subscriberNumberOptions: IOptionsPsKeyinInput = {}; // ps key in input options
  actionIconOptions: IOptionsPsActionIcon = {
    // iconName: 'call'
  }; // ps action icon options
  labelKey: string;
  selectedCountry: IPsSelect;
  ayt: any;
  private bFcPhoneNumber = false;
  // initialize the used library;
  phoneNumber = require('awesome-phonenumber');

  iconOptions: IOptionsPsActionIconExposed = {
    iconName: 'call'
  };

  itemOptions: IOptionsPsContainerItem = {
    psClass: 'complex-phone-number'
  };
  previewLblOptions: IOptionsPsFieldLabel;

  get previewValOptions(): IOptionsPsFieldLabel {
    return {
      labelKey: this.fcValue,
      psClass: 'ps-value-preview',
      previewMode: true
    };
  }
  oldNumberValue: string;


  public hasFocus = false;
  public touched = false;
  // private customizationMap: Map<number, Map<string, any>>;
  lock: boolean = false;
  constructor(
    public commonProv: PsCommonService,
    public loggerP: LoggerService,
    private omniAuthService: AuthenticationMatrixService
  ) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.options.childComponent = PsEntityPhoneNumberComponent;
    this.countriesOptions.group = this.entityFormGroup;
    this.countriesOptions.fcName = (this.options.fcName != undefined ? this.options.fcName : '') + 'countriesFcName';
    this.countriesOptions.labelKey = 'country_key';
    this.countriesOptions.forceTriggerChange = true;
    this.subscriberNumberOptions.fcName = (this.options.fcName != undefined ? this.options.fcName : '') + 'numberFcName';
    this.subscriberNumberOptions.group = this.entityFormGroup;
    this.subscriberNumberOptions.placeHolder = this.options.placeHolder ? this.options.placeHolder : 'enter_phone_number_key';
    this.subscriberNumberOptions.labelKey = this.options.labelKey ? this.options.labelKey : 'phone_number_key';

    this.subscriberNumberOptions.iconOptions = this.actionIconOptions;
    this.subscriberNumberOptions.type = 'tel';
    // this.commonProv.addDefaultValidator(this.phoneNumberGroup, this.subscriberNumberOptions.fcName, { disabled: true });
    this.setEntityFormGroup();
    /* ~~~ awesome-phonenumber Library ~~~ */
    // https://www.npmjs.com/package/awesome-phonenumber
    // var PhoneNumber = require('awesome-phonenumber');
    // var pn = new PhoneNumber('0707123456', 'SE');
    // pn.isValid();   ----> true
    // pn.isMobile();  ----> true
    // pn.canBeInternationallyDialled(); ----> true
    // pn.getNumber();                   ----> '+46707123456'
    // pn.getNumber('e164');             ----> '+46707123456' (default)
    // pn.getNumber('international');    ----> '+46 70 712 34 56'
    // pn.getNumber('national');         ----> '070-712 34 56'
    // pn.getNumber('rfc3966');          ----> 'tel:+46-70-712-34-56'
    // pn.getNumber('significant');      ----> '707123456'
    // pn.getRegionCode();               ----> 'SE'
    // pn.getCountryCode();              ----> 46

    this.itemOptions.iconOptions = this.iconOptions;
    this.previewLblOptions = {
      labelKey: this.subscriberNumberOptions.labelKey,
      psClass: 'ps-lbl-preview',
      previewMode: true
    };

    // if (this.options.validate) {
    //   this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.options.fcName], true);
    // }

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options.previousValue !== undefined) {
      this.subscriberNumberOptions.labelKey = changes.options.currentValue.labelKey;
    }
  }

  // ngAfterViewInit(){
  //   //keep empty
  // }

  onCountryCodeChange(selectedCountry) {
    let inputReadOnly;
    if (selectedCountry && selectedCountry.itemValue) {
      this.ayt = this.phoneNumber.getAsYouType(selectedCountry.additionalDescr);
      this.selectedCountry = selectedCountry;
      const phoneExample = this.phoneNumber.getExample(selectedCountry.additionalDescr).getNumber('national');
      this.subscriberNumberOptions.placeHolder = 'Ex ' + phoneExample;
      this.entityVO.countryCode = selectedCountry.itemValue;
      inputReadOnly = 0;
    } else if (selectedCountry && (selectedCountry.newValue === null || selectedCountry.newValue === undefined)) {
      inputReadOnly = 1;
      this.subscriberNumberOptions.placeHolder = this.options.placeHolder ? this.options.placeHolder : 'enter_your_number_key';
    }
    this.entityVO[this.subscriberNumberOptions.fcName] = null;
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.subscriberNumberOptions.fcName], inputReadOnly);
    this.options.group.controls[this.options.fcName].markAsTouched();
    if ((this.entityVO[this.countriesOptions.fcName] && this.entityVO[this.countriesOptions.fcName])
      || (this.entityVO[this.subscriberNumberOptions.fcName]) && this.entityVO.subscriberNumber) {
      this.isValid = true;
    }
  }

  returnAllDigits() {
    if (
      this.entityVO.countryCode != null &&
      this.entityVO.countryCode != 'undefined' &&
      this.entityVO.countryCode != '' &&
      this.entityVO.subscriberNumber != null &&
      this.entityVO.subscriberNumber != 'undefined' &&
      this.entityVO.subscriberNumber != ''
    ) {
      if (!this.options.validate) {
        const pn = new this.phoneNumber(this.entityVO.subscriberNumber, this.selectedCountry.additionalDescr);
        const fullNumber: string = pn.getNumber('e164').substring(1); // to remove the + from the phone number
        this.options.group.controls[this.options.fcName]['calledAfterChange'] = true;
        // set the value in the form controller of the page group in order when checking for validation it wont give value is missing error upon submit or next
        this.setEntityValue(fullNumber);
        return { newValue: fullNumber, oldValue: this.oldValue };
      } else {
        this.setEntityErrorMessage('please_verify_otp_key');
      }
    } else {
      return '';
    }
  }

  subscriberNumberChange(event) {
    this.entityVO.subscriberNumber = event.newValue;
    if (this.selectedCountry) {
      const pn = new this.phoneNumber(this.entityVO.subscriberNumber, this.selectedCountry.additionalDescr);
      if (!pn.isValid()) {
        this.setEntityErrorMessage('invalid_phone_number_key');
        return;
      } else {
        this.isValid = true;
        if (this.errorMsgs) {
          this.errorMsgs = null;
        }
        const nb = this.returnAllDigits();
        if (nb !== '') {
          this.onPsChange.emit(nb);
        }
        const formatedNb = pn.getNumber('national');
        this.entityVO[this.subscriberNumberOptions.fcName] = formatedNb;
        this.entityFormGroup.controls[this.subscriberNumberOptions.fcName].setValue(formatedNb);
      }
    }
    if (this.entityVO[this.countriesOptions.fcName] && this.entityVO.subscriberNumber) {
      this.isValid = true;
      // this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.options.fcName], 1);
      const pn2 = new this.phoneNumber(this.entityVO.subscriberNumber, this.selectedCountry.additionalDescr);
      // if phone numnber valid and we pass in options to validate the mobile number => popup verify otp
      if (this.oldNumberValue != pn2.getNumber('e164') && event.newValue != event.oldValue && this.options.validate) {
        this.sendOtpRequest(this.entityVO.subscriberNumber, this.selectedCountry.additionalDescr);
      }
    }

  }

  numberKeydown(e) {
    if (e.keyCode === 9 || e.keyCode === 13) {
      // tab or enter button is pressed
      return;
    }
    const curValue: string = e.target.value;
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
      // 0-9 only
      if (curValue) {
        const pn = new this.phoneNumber(curValue, this.selectedCountry.additionalDescr);
        const y = pn.isValid();
        const z = pn.isPossible();
        const pnJson = pn.toJSON();
        if (y || (!z && pnJson.possibility === 'too-long')) {
          e.preventDefault();
          return;
        }
      }
      let x = this.ayt.addChar(e.key);
      e.target.value = x;
    } else if (e.keyCode === 8 || e.keyCode === 46) {
      // delete or backspace key is pressed
      const firstPart = curValue.substring(0, e.target.selectionStart - 1);
      const secondPart = curValue.substring(e.target.selectionEnd);
      const newVal = firstPart + secondPart;
      this.ayt.reset(newVal);
    } else {
      // all other buttons are pressed
      e.preventDefault();
    }
  }

  onFocus() {
    this.touched = true;
    this.isValid = false;
    this.hasFocus = true;
  }
  onBlur() {
    this.hasFocus = false;
    if (this.options.validate && this.options.group.controls[this.options.fcName].valid == false
      && this.entityVO[this.subscriberNumberOptions.fcName] && this.isValid == false) {
      this.sendOtpRequest(this.entityVO.subscriberNumber, this.selectedCountry.additionalDescr);
    }
  }

  sendOtpRequest(number, country) {
    const pn2 = new this.phoneNumber(number, country);
    if (pn2.isValid()) {
      this.oldNumberValue = pn2.getNumber('e164');
      this.omniAuthService.requestOTPValidation(AuthMatrixViewer.MODAL, pn2.getNumber('e164'), this.options, this).then(result => {
      }).catch((error) => {
      });
    }
  }

  itemWasClicked(item, event) {
    event.currentTarget.querySelectorAll('ion-label').forEach((node) => {
      node.style.color = CommonUtils.getCssVariableValue('--ps-focused-field-color');
    });
  }

  get defaultCountriesOptions(): IOptionsPsDropdownCountryCodeExposed {
    let phoneNumberVal = this.returnValue();
  
    if (phoneNumberVal !== null && phoneNumberVal !== undefined) {
      this.bFcPhoneNumber = true;
      if(phoneNumberVal.slice(0, 2) == '00') {
        phoneNumberVal = phoneNumberVal.slice(2,phoneNumberVal.length);
      }
      const pn = new this.phoneNumber(ConstantCommon.PLUS_SIGN + phoneNumberVal);
      if (this.entityVO !== undefined
        && (this.entityVO.countryCode === null || this.entityVO.countryCode === undefined || this.entityVO.countryCode === '')) {
        this.commonProv.setValInsideNestedObj(this.countriesOptions.fcName,ConstantCommon.PLUS_SIGN + pn.getCountryCode(), this.entityVO);
      }
      if (this.entityVO !== undefined
        && (this.entityVO.subscriberNumber === null || this.entityVO.subscriberNumber === undefined || this.entityVO.subscriberNumber === '') && pn.getNumber('significant') !== undefined) {
        this.commonProv.setValInsideNestedObj(this.subscriberNumberOptions.fcName,pn.getNumber('significant'), this.entityVO);
        const fullNumber: string = pn.getNumber('e164').substring(1);
        this.setEntityValue(fullNumber);
      }
    } else {
      this.bFcPhoneNumber = false;
    }
    return this.countriesOptions;
  }

}
