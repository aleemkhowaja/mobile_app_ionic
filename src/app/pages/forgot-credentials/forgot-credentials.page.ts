import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsComplexBankAuthenticationExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-bank-authentication/ps-complex-bank-authentication.component.interface';
import { IOptionsPsComplexIdDetailsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-id-details/ps-complex-id-details.interface';
import { IOptionsPsEntityPhoneNumberExposed } from 'src/app/commonBussinessSRC/psComponents/ps-field-entity/ps-entity-phone-number/ps-entity-phone-number.component.interfaces';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsInputPassword, IOptionsPsSelectCheckbox, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { OmniBasePage } from '../omni-base/omni-base.page';
import { IOptionsPsComplexUserCredentialExposed } from './../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-user-credentials/ps-complex-user-credentials.component.interfaces';
import { IOptionsPsDateDayMonthYearPastAsStringExposed } from './../../commonBussinessSRC/psComponents/ps-keyin-input/ps-day-month-year/ps-date-day-month-year-past/ps-date-day-month-year-past-asString/ps-date-day-month-year-past-asString.component.interface';
import { ConstantCommon } from './../../commonSRC/psServices/models/common-constant';
import { IOptionsPsContainerPanel, IOptionsPsLabel } from './../../commonSRC/psServices/models/ps-common-interface';



@Component({
  selector: 'forgot-credentials',
  templateUrl: './forgot-credentials.page.html',
  styleUrls: ['./forgot-credentials.page.scss'],
})
export class ForgotCredentialsPage extends OmniBasePage implements OnInit {

  formGroup: FormGroup = new FormGroup({});
  forgotCredentialsVO = {};
  stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'forgot_cred_step',
    isHorizontalStepper: true,
    numberOfSteps: 2,
    namesofSteps: ['forgot_cred_step1', 'forgot_cred_step2'],
    group: this.formGroup,
    submitOptions: {
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.forgotCredentials,
      group: this.formGroup,
    },
    requestObject: this.forgotCredentialsVO
  };
  panelOptions1Step2: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'IDENTIFICATION_DETAILS_KEY',
    iconName: 'finger-print',
    expanded: true
  };
  panelOptions2Step2: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'AUTHENTICATION_DETAILS_KEY',
    iconName: 'contact'
  };
  forgotUsernameOptions: IOptionsPsSelectCheckbox = {
    labelKey: 'send_me_my_username_key',
    group: this.formGroup,
    fcName: 'forgotUsername'
  };
  complexPhoneOptions: IOptionsPsEntityPhoneNumberExposed = {
    labelKey: 'phone_number_key',
    placeHolder: 'country_key',
    fcName: 'omniUserCO.omniUserVO.MOBILE_NUMBER',
    group: this.formGroup
  };
  userCredentialsOptions1: IOptionsPsComplexUserCredentialExposed = {
    fcName: 'complexUserCredentials',
    group: this.formGroup,
    userNameOption: {
      fcName: 'omniUserCO.omniUserVO.NAME',
      group: this.formGroup,
    },
    passwordConfirmOptions: {
      group: this.formGroup,
      password: {
        labelKey: 'password_key',
        placeHolder: 'enter_password_key',
        fcName: 'omniUserCO.omniUserVO.PASSWORD',
        group: this.formGroup,
      },
      confirmPassword: {
        labelKey: 'confirm_password_key',
        placeHolder: 'enter_confirm_password_key',
        fcName: 'confirmPassword',
        group: this.formGroup,
      }
    }
  };
  forgotPasswordPanelOptions: IOptionsPsContainerPanel = {
    labelKey: 'FORGOT_PASSWORD_KEY',
    iconName: 'lock',
    expanded: true
  };
  complexIdDetailsOptions: IOptionsPsComplexIdDetailsExposed = {
    dropdownIdTypesOptions: {
      fcName: 'idType',
      group: this.formGroup,
    },
    idNumberOptions: {
      labelKey: 'id_number_key',
      placeHolder: 'enter_id_number_key',
      fcName: 'idNumber',
      group: this.formGroup
    },
    dateExpiryOptions: {
      labelKey: 'expiry_date_key',
      placeHolder: 'enter_expiry_date_key',
      fcName: 'expiryDate',
      group: this.formGroup,
    },
    countriesOptions: {
      placeHolder: 'country_of_issuance_key',
      labelKey: 'country_of_issuance_key',
      fcName: 'country',
      group: this.formGroup,
    },
    issueDateOptions: {
      labelKey: 'issue_date_key',
      placeHolder: 'issue_date_key',
      fcName: 'issueDate',
      group: this.formGroup
    }
  };
  cardPinOptions: IOptionsPsInputPassword = {
    fcName: 'omniUserCO.omniUserVO.PIN_PASSWORD',
    labelKey: 'card_pin_key',
    placeHolder: 'enter_card_pin_key',
    group: this.formGroup
  };
  grpOptions: IOptionsPsComplexBankAuthenticationExposed = {
    acNumOptions: {
      fcName: 'omniUserCO.omniUserVO.ACCOUNT_NUMBER',
      group: this.formGroup
    },
    varcharOptions: {
      fcName: 'userCifNo',
      group: this.formGroup,
      iconOptions: {
        iconName: 'user-cif'
      }
    },
    cardNumberOptions: {
      fcName: 'cardNumber',
      group: this.formGroup,
      iconOptions: {
        iconName: 'card-input'
      }
    }
  };

  /** Updated by Hisham.Omar TP#1136182 
   *  Change the interface to be fit with the updated component 'ps-date-day-month-year-past-asString'
   */
  psDateDayMonthYearPastOptions: IOptionsPsDateDayMonthYearPastAsStringExposed = {
    fcName: 'dateOfBirthday',
    group: this.formGroup,
    labelKey: 'date_of_birth_key',
    placeHolder: 'enter_your_date_of_birth_key'
  };
  orLabelOptions: IOptionsPsLabel = {
    labelKey: 'OR_KEY'
  };

  sendUserName = false;

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super();
  }


  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
    PsCommonSettings.oper_ID = CommonBussinessConstant.FORGOT_CREDENTIALS_OPER;
    PsCommonSettings.pageName = CommonBussinessConstant.FORGOT_CREDENTIALS_TITLE;
    this.commonProv.setValInsideNestedObj(this.forgotUsernameOptions.fcName, true, this.forgotCredentialsVO);
  }

  ionViewDidEnter() {
    super.ionViewDidEnter();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.forgotUsernameOptions.fcName], 0);
  }

  onforgotUsernameChanged(event) {
    let enableForgotPassword = 0;
    if (event && event.newValue) {
      this.userCredentialsOptions1.passwordConfirmOptions.password.group.controls[this.userCredentialsOptions1.passwordConfirmOptions.password.fcName].reset();
      this.userCredentialsOptions1.passwordConfirmOptions.confirmPassword.group.controls[this.userCredentialsOptions1.passwordConfirmOptions.confirmPassword.fcName].reset();
      this.userCredentialsOptions1.userNameOption.group.controls[this.userCredentialsOptions1.userNameOption.fcName].reset();
      enableForgotPassword = 1;
      this.sendUserName = true;
    } else {
      enableForgotPassword = 0;
      this.sendUserName = false;
    }
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.userCredentialsOptions1.userNameOption.fcName, this.userCredentialsOptions1.passwordConfirmOptions.password.fcName, this.userCredentialsOptions1.passwordConfirmOptions.confirmPassword.fcName], !enableForgotPassword);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.userCredentialsOptions1.userNameOption.fcName, this.userCredentialsOptions1.passwordConfirmOptions.password.fcName, this.userCredentialsOptions1.passwordConfirmOptions.confirmPassword.fcName], enableForgotPassword);
  }

}
