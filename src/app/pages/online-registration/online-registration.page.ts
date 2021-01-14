import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsGalleryVerificationImagesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-action-gallery/ps-gallery-verification-images/ps-gallery-verification-images.interfaces';
import { IOptionsPsComplexBankAuthenticationExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-bank-authentication/ps-complex-bank-authentication.component.interface';
import { IOptionsPsComplexIdDetailsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-id-details/ps-complex-id-details.interface';
import { IOptionsPinConfirmExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-password-confirm/ps-confirm-pin/ps-confirm-pin.component.interfaces';
import { IOptionsPsComplexSecurityQuestionExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-security-questions/ps-complex-security-questions.component.interfaces';
import { IOptionsPsComplexTermsAndConditionsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-terms-and-conditions/ps-complex-terms-and-conditions.component.interfaces';
import { IOptionsPsEntityPhoneNumberExposed } from 'src/app/commonBussinessSRC/psComponents/ps-field-entity/ps-entity-phone-number/ps-entity-phone-number.component.interfaces';
import { IOptionsPsInputEmailExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-email/ps-input.email.component.interface';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsContainerPanel, IOptionsPsLabel, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsComplexUserCredentialExposed } from '../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-user-credentials/ps-complex-user-credentials.component.interfaces';
import { OmniBasePage } from '../omni-base/omni-base.page';
import { IOptionsPsDateDayMonthYearPastAsStringExposed } from './../../commonBussinessSRC/psComponents/ps-keyin-input/ps-day-month-year/ps-date-day-month-year-past/ps-date-day-month-year-past-asString/ps-date-day-month-year-past-asString.component.interface';
import { IOptionsPsInputPassword, IOptionsPsInputPasswordExposed, IOptionsPsInputUserNameExposed } from './../../commonSRC/psServices/models/ps-common-interface';


@Component({
  selector: 'online-registration',
  templateUrl: './online-registration.page.html',
  styleUrls: ['./online-registration.page.scss'],
})
export class OnlineRegistrationPage extends OmniBasePage implements OnInit {

  EnableSecurityQuestion: boolean;
  RequireTransactionPassword: boolean
  formGroup: FormGroup = new FormGroup({});
  termsAndConditionsOptions: IOptionsPsComplexTermsAndConditionsExposed = {
    checkBoxOptions: {
      group: this.formGroup,
      fcName: 'checkboxConfirm',
      labelKey: 'agree_terms_and_conditions_key'
    },
    htmlViewerOptions: {
      fileName: PsCommonBusinessSettings.onlineRegistrationTermsAndConditionsFileName
    }
  };
  stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'on_reg_stepper',
    isHorizontalStepper: true,
    numberOfSteps: 2,
    namesofSteps: ['online_reg_step1', 'online_reg_step2'],
    group: this.formGroup,
    submitOptions: {
      group: this.formGroup,
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.onlineRegistration,
    },
    requestObject: {},
  };
  panelOptions1Step2: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'identification_details_key',
    iconName: 'finger-print',
    expanded: true
  };
  panelOptions2Step2: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'authentication_and_contact_details_key',
    iconName: 'contact'
  };
  panelOptions1Step1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'user-profile_key',
    iconName: 'person'
  };
  panelOptions1Step3: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'credentials_key',
    iconName: 'clipboard',
    expanded: true
  };
  panelOptions2Step3: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'pin_key',
    iconName: 'contact'
  };
  panelOptions3Step3: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'security_question_key',
    iconName: 'lock'
  };
  panelOptions4Step3: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'verification_image_key',
    iconName: 'images'
  };
  complexPhoneOptions: IOptionsPsEntityPhoneNumberExposed = {
    fcName: 'omniUserCO.omniUserVO.MOBILE_NUMBER',
    group: this.formGroup
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
      labelKey: 'country_key',
      placeHolder: 'enter_country_key',
      fcName: 'country',
      group: this.formGroup,
    },
    issueDateOptions: {
      labelKey: 'issue_date_key',
      placeHolder: 'issue_date_key',
      fcName: 'issueDate',
      group: this.formGroup,
    }
  };
  emailOptions: IOptionsPsInputEmailExposed = {
    group: this.formGroup,
    fcName: 'omniUserCO.omniUserVO.EMAIL',
    labelKey: 'email_key',
    placeHolder: 'enter_email_key'
  }
  cardPinOptions: IOptionsPsInputPassword = {
    fcName: 'cardPin',
    labelKey: 'card_pin_key',
    placeHolder: 'enter_card_pin_key',
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
  pinConfirmOptions: IOptionsPinConfirmExposed = {
    group: this.formGroup,
    password: {
      fcName: 'omniUserCO.omniUserVO.PIN_PASSWORD',
      group: this.formGroup,
    },
    confirmPassword: {
      fcName: 'confirmPin',
      group: this.formGroup,
    }
  };
  securityQuestionOptions: IOptionsPsComplexSecurityQuestionExposed = {
    group: this.formGroup,
    securityQuestionOptions: {
      fcName: 'securityQuestion',
      group: this.formGroup,
    },
    securityAnswerOptions: {
      labelKey: 'security_answer_key',
      placeHolder: 'enter_your_security_answer_key',
      fcName: 'omniUserCO.omniUserVO.SEC_ANSWER',
      group: this.formGroup,
    }
  };
  verificationImageOptions: IOptionsPsGalleryVerificationImagesExposed = {
    fcName: 'verification',
    group: this.formGroup,
  };
  userNameOptions: IOptionsPsInputUserNameExposed = {
    group: this.formGroup,
    fcName: 'username'
  };
  passwordOptions: IOptionsPsInputPasswordExposed = {
    group: this.formGroup,
    fcName: 'password'
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
  psDateDayMonthYearPastAsStringOptions: IOptionsPsDateDayMonthYearPastAsStringExposed = {
    fcName: 'dateOfBirth',
    group: this.formGroup,
    labelKey: 'date_of_birth_key',
    placeHolder: 'enter_date_of_birth_key'
  };
  registrationLabelOptions: IOptionsPsLabel = {
    labelKey: 'registration_charges_key'
  };
  registrationChargesOptions: IOptionsPsLabel = {};
  registrationCharges: number;

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService, private omniPull: OmniPullService) {
    super();
  }


  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
    PsCommonSettings.oper_ID = CommonBussinessConstant.ONLINE_REGISTRATION_OPER;
    PsCommonSettings.pageName = CommonBussinessConstant.ONLINE_REGISTRATION_TITLE;
    this.omniPull.getParamValOf('EnableSecurityQuestion', 'RequireTransactionPassword').then(res => {
      this.EnableSecurityQuestion = res.EnableSecurityQuestion;
      this.RequireTransactionPassword = res.RequireTransactionPassword;
    }).catch(err => this.loggerP.log(err));
    const preLoginResponse = this.commonProv.session.getValueOf(ConstantCommon.preLoginResponse);
    this.registrationCharges = preLoginResponse.businessProfilesCO.businessProfileVO.REGISTRATION_CHARGES ? preLoginResponse.businessProfilesCO.businessProfileVO.REGISTRATION_CHARGES : null;
    const chargesCurrency = preLoginResponse.companySettingsCO.briefDesc;
    if (this.registrationCharges) {
      this.registrationChargesOptions.labelKey = String(this.registrationCharges) + ' ' + chargesCurrency;
    }
  }

}
