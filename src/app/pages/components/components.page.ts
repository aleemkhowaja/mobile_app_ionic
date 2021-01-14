import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PsAccountsListComponent } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component';
import { IOptionsPsAnchorSwitcherExposed } from 'src/app/commonBussinessSRC/psComponents/ps-action-anchor/ps-anchor-switcher/ps-anchor-switcher.component.interfaces';
import { IOptionsPsGalleryVerificationImagesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-action-gallery/ps-gallery-verification-images/ps-gallery-verification-images.interfaces';
import { IOptionsPsActionButtonEmailUsDefaultedExposed } from 'src/app/commonBussinessSRC/psComponents/ps-button-email-us/ps-email-us-defaulted/ps-email-us-defaulted.component.interface';
import { IOptionsPsComplexBankAuthenticationExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-bank-authentication/ps-complex-bank-authentication.component.interface';
import { IOptionsPsComplexExchnageExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-exchange/ps-complex-exchange.component.interfaces';
import { IOptionsPsComplexFindCIFComponentExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-find-CIF/ps-complex-find-CIF.component.interfaces';
import { IOptionsPsComplexMenuReachExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-menu-reach/ps-complex-menu-reach.component.interfaces';
import { IOptionsComplexPurposeExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-purpose/ps-complex-purpose.component.interfaces';
import { IOptionsPSComplexRecurringSchedulerExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-recurring-scheduler/ps-complex-recurring-scheduler.component.interfaces';
import { IOptionsPsComplexSecurityQuestionExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-security-questions/ps-complex-security-questions.component.interfaces';
import { IOptionsPsInputAccountNumberExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-account-number/ps-input-account-number.component.interface';
import { IOptionsPsInputCardNumberExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-card-number/ps-input-card-number.component.interfaces';
import { IOptionsPsInputEmailExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-email/ps-input.email.component.interface';
import { IOptionsPsMapAtmBranchesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.interfaces';
import { IOptionsPsDropdownCitiesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-cities/ps-dropdown-cities.component.interface';
import { IOptionsPsDropDownCountryExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-country/ps-dropdown-country.component.interfaces';
import { IOptionsPsDropdownCurrenciesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-currencies/ps-dropdown-currencies.component.interfaces';
import { IOptionsPsDropdownRegionsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-regions/ps-dropdown-regions.component.interface';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsActionImageExposed, IOptionsPsButtonCall, IOptionsPsFileUploadComponent, IOptionsPsHyperlinkAnchor, IOptionsPsKeyinDate, IOptionsPsKeyinInput, IOptionsQiblaDirection, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsComplexCreditCardExposed } from '../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-credit-card/ps-complex-credit-card.component.interfaces';
import { IOptionsPsComplexIdDetailsExposed } from '../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-id-details/ps-complex-id-details.interface';
import { IOptionsPasswordConfirmExposed } from '../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-password-confirm/ps-complex-password-confirm.component.interfaces';
import { IOptionsPsComplexUserCredentialExposed } from '../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-user-credentials/ps-complex-user-credentials.component.interfaces';
import { IOptionsPsInputFreeTextExposed } from '../../commonBussinessSRC/psComponents/ps-keyin-input/ps-input-free-text/ps-input-free-text.component.interfaces';
import { IOptionsPsInputVarcharExposed } from '../../commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsLabelCifBranchExposed } from '../../commonBussinessSRC/psComponents/ps-label/ps-label-cif-branch/ps-label-cif-branch.component.interface';
import { IOptionsPsLookupOwnAccountsExposed } from '../../commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.interfaces';
import { IOptionsPsDropdownAccountTypesExposed } from '../../commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-account-types/ps-dropdown-account-types.component.interface';
import { IOptionsPsLovDeliveryOptionsExposed } from '../../commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-delivery-options/ps-lov-delivery-options.component.interfaces';
import { IOptionsPsLovPreferredLanguageExposed } from '../../commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-preferred-language/ps-lov-preferred-language.component.interfaces';
import { IchangeValues, IOptionsPsButtonNext, IOptionsPsButtonPrevious, IOptionsPsButtonReset, IOptionsPsButtonStandard, IOptionsPsButtonSubmit, IOptionsPsContainerPanel, IOptionsPsInputAmount, IOptionsPsInputPasswordExposed, IOptionsPsInputUserNameExposed, IOptionsPsKeyinTextarea, IOptionsPsSelectCheckbox, IOptionsPsSelectDropdown, IOptionsSelectRadio } from '../../commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from '../../commonSRC/psServices/ps-common/ps-common.service';


// import { IOptionsPsSwitcherLov } from 'src/app/commonBussinessSRC/psComponents/ps-action-anchor/ps-anchor-switcher/ps-switcher-lov/ps-switcher-lov.component.interfaces';
// import { IOptionsPsSwitcherLovPreferredLanguageExposed } from 'src/app/commonBussinessSRC/psComponents/ps-action-anchor/ps-anchor-switcher/ps-switcher-lov/ps-switcher-lov-preferred-language/ps-switcher-lov-preferred-language.component.interfaces';




@Component({
  selector: 'ps-components',
  templateUrl: './components.page.html',
  styleUrls: ['./components.page.scss'],
})
export class ComponentsPage implements OnInit {
  public defaultOptions: IOptionsPsSelectDropdown = {
    listOfOptions: []
  };

  formGroup: FormGroup = new FormGroup({});
  myFormVO: any = { keyinInput: '1234' };
  // actionOptions:IOptionsPsActionButton;
  submitOptions: IOptionsPsButtonSubmit;
  resetoptions: IOptionsPsButtonReset;
  backOptions: IOptionsPsButtonPrevious;
  nextOptions: IOptionsPsButtonNext;
  standardOptions: IOptionsPsButtonStandard;
  checkboxOptions: IOptionsPsSelectCheckbox;
  radioOptions: IOptionsSelectRadio;
  psanchor: IOptionsPsHyperlinkAnchor = {
    anchorValue: '',
    iconOptions: {
      iconName: 'user',
      labelOptions: {
        labelKey: 'testanchor1',
      },

    }
  }
  currenciesOptions: IOptionsPsDropdownCurrenciesExposed = {
    labelKey: 'currency_key',
    placeHolder: 'select_currency_key',
    fcName: 'currency',
    group: this.formGroup
  };
  psanchorimg: IOptionsPsHyperlinkAnchor = {
    anchorValue: '',
    imageOptions: {
      labelOptions: {
        labelKey: 'testanchor1',

      },
      imageBase64Url: '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'
    }
  };


  qiblaDirectionOptions: IOptionsQiblaDirection = {

  }
  psSwitcher: IOptionsPsAnchorSwitcherExposed = {
    listOfOptions: [
      {
        iconOptions: {
          iconName: 'user',
          labelOptions: {
            labelKey: 'testanchorIcon1',
          },
        }
      },
      {
        iconOptions: {
          iconName: 'flag2',
          labelOptions: {
            labelKey: 'testanchorIcon2',

          },

        }
      }

    ]
  };

  // psSwitcherImage: IOptionsPsAnchorSwitcherExposed = {
  //   listOfOptions: [
  //     {
  //       imageOptions: {
  //         labelOptions: {
  //           labelKey: 'testanchorImg1',

  //         },
  //         imageBase64Url: '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'
  //       }

  //     },
  //     {
  //       imageOptions: {
  //         labelOptions: {
  //           labelKey: 'testanchorImg2',

  //         },
  //         imageBase64Url: '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'
  //       }
  //     }

  //   ]
  // };
  emailUsOptions: IOptionsPsActionButtonEmailUsDefaultedExposed = {
    group: this.formGroup
  };

  accountTypeOptions: IOptionsPsDropdownAccountTypesExposed = {
    allowedAccountType: ConstantCommon.AllowedGeneralAccountTypes,
    group: this.formGroup,
    fcName: 'accountTypes'
  };

  countriesOptions: IOptionsPsDropDownCountryExposed = {
    labelKey: 'country_key',
    placeHolder: 'select_country_key',
    fcName: 'country',
    group: this.formGroup
  };

  regionsOptions: IOptionsPsDropdownRegionsExposed = {
    labelKey: 'region_key',
    placeHolder: 'select_region_key',
    fcName: 'region',
    group: this.formGroup
  }
  citiesOptions: IOptionsPsDropdownCitiesExposed = {
    labelKey: 'city_key',
    placeHolder: 'select_city_key',
    fcName: 'city',
    group: this.formGroup
  };

  cifBranchOtpions: IOptionsPsLabelCifBranchExposed = {};

  selectDropDwnOptions: IOptionsPsSelectDropdown = {
    labelKey: 'Select Drop Down',
    placeHolder: 'Please Select An Option',
    fcName: 'selectDropDwn',
    group: this.formGroup,
    listOfOptions: [{ itemValue: 1, description: 'Option 1', iconName: 'more', iconUrl: '' },
    { itemValue: 2, description: 'Option 2', iconName: 'more', iconUrl: '' }]
  };
  inputOptions: IOptionsPsKeyinInput = {
    labelKey: 'Keyin Input',
    placeHolder: 'Enter your Input',
    fcName: 'keyinInput',
    group: this.formGroup,
    mask: { mask: '999 999 999' },
    type: 'text'
  };
  inputAmountOptions: IOptionsPsInputAmount = {
    labelKey: 'Input Amount',
    placeHolder: 'enter_your_amount_key',
    fcName: 'inputAmount',
    group: this.formGroup,
    type: 'amount',
    decimalPoints: 3
  };
  dateOptions: IOptionsPsKeyinDate = {
    labelKey: 'Date Field',
    placeHolder: 'Enter the Date',
    fcName: 'dateInput',
    group: this.formGroup,
  };
  newPasswordForm: FormGroup = new FormGroup({});
  confirmPasswordOptions: IOptionsPasswordConfirmExposed = {
    group: this.newPasswordForm,
    password: {
      labelKey: 'new_password_key',
      placeHolder: 'enter_new_password_key',
      fcName: 'newPassword',
      group: this.newPasswordForm,
    },
    confirmPassword: {
      labelKey: 'confirm_password_key',
      placeHolder: 'confirm_new_password_key',
      fcName: 'confirmPassword',
      group: this.newPasswordForm,
    }
  };

  cardOptions: IOptionsPsComplexCreditCardExposed = {
    cardNumber: { labelKey: 'credit_card_number_key', placeHolder: 'enter_your_card_number_key', fcName: 'cardNumber', group: this.formGroup },
    cardOwner: { labelKey: 'credit_card_owner_name_key', placeHolder: 'enter_the_card_owner_name_key', fcName: 'cardOwnerName', group: this.formGroup },
    cardCVV: { labelKey: 'credit_card_cvv_key', placeHolder: 'enter_the_card_cvv_key', fcName: 'cardCvv', group: this.formGroup },
    dateOptions: { labelKey: 'credit_card_expiry_date_key', placeHolder: 'enter_the_card_Expiry_date_key', fcName: 'cardExpiryDate', group: this.formGroup }
  };
  actionImageOptions: IOptionsPsActionImageExposed = {
    // eslint-disable-next-line max-len
    imageBase64Url: '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',
    imageName: 'Visa-Curved.png'
  };
  securityQuestionForm: FormGroup = new FormGroup({});
  securityQuestionOptions: IOptionsPsComplexSecurityQuestionExposed = {
    fcName: 'complexSecurityQuestion',
    group: this.securityQuestionForm,
    securityQuestionOptions: {
      fcName: 'securityQuestion',
      group: this.securityQuestionForm,
    },
    securityAnswerOptions: {
      labelKey: 'security_answer_key',
      placeHolder: 'enter_your_security_answer_key',
      fcName: 'securityAnswer',
      group: this.securityQuestionForm,
    }
  };
  userCredentialsOptions: IOptionsPsComplexUserCredentialExposed = {
    fcName: 'complexUserCredentials',
    group: this.formGroup,
    userNameOption: {
      fcName: 'userName',
      group: this.formGroup,
    },
    passwordConfirmOptions: {
      group: this.formGroup,
      password: {
        labelKey: 'new_password_key',
        placeHolder: 'enter_new_password_key',
        fcName: 'newPassword',
        group: this.formGroup,
      },
      confirmPassword: {
        labelKey: 'confirm_password_key',
        placeHolder: 'confirm_new_password_key',
        fcName: 'confirmPassword',
        group: this.formGroup,
      }
    },
    pinConfirmOptions: {
      group: this.formGroup,
      password: {
        fcName: 'Pin',
        group: this.formGroup,
      },
      confirmPassword: {
        fcName: 'confirmPin',
        group: this.formGroup,
      }
    },
    securityQuestionOptions: {
      fcName: 'complexSecurityQuestion',
      group: this.formGroup,
      securityQuestionOptions: {
        fcName: 'securityQuestion',
        group: this.formGroup,
      },
      securityAnswerOptions: {
        labelKey: 'security_answer_key',
        placeHolder: 'enter_your_security_answer_key',
        fcName: 'securityAnswer',
        group: this.formGroup,
      }
    }
  };
  verificationImageOptions: IOptionsPsGalleryVerificationImagesExposed = {
    fcName: 'verification',
    group: this.formGroup,
  };
  panelOptions: IOptionsPsContainerPanel = {
    labelKey: 'PHONE_KEY',
    iconName: 'call',
    isExpandable: true
  };
  textareaOptions: IOptionsPsKeyinTextarea = {
    placeHolder: 'ENTER_YOUR_NAME_KEY',
    labelKey: 'USER_NAME_KEY',
    rows: '3',
    cols: '10',
    minLength: 5,
    maxLength: 10,
    fcName: 'username',
    group: this.formGroup
  };
  datePickerOptions: IOptionsPsKeyinDate = {
    labelKey: 'BIRTH_DATE_KEY',
    fcName: 'birthDate',
    group: this.formGroup,
    placeHolder: 'Choose a date',
    displayFormat: 'MMM DD, YYYY HH:mm'
  };
  emailOptions: IOptionsPsInputEmailExposed = {
    labelKey: 'email_key',
    placeHolder: 'enter_your_email_key',
    fcName: 'emailInput',
    group: this.formGroup,
  };
  acNumOptions: IOptionsPsInputAccountNumberExposed = {
    labelKey: 'account_number_key',
    placeHolder: 'enter_account_number_key',
    fcName: 'acNumInput',
    group: this.formGroup,
  };

  usroptions: IOptionsPsInputUserNameExposed = {
    fcName: 'userName',
    group: this.formGroup
  };
  bankAuthOptions: IOptionsPsComplexBankAuthenticationExposed = {
    acNumOptions: {
      fcName: 'acNumInputCC',
      group: this.formGroup
    },
    varcharOptions: {
      fcName: 'cifNo',
      group: this.formGroup
    },
    cardNumberOptions: {
      fcName: 'cardNumber',
      group: this.formGroup
    }
  };

  lovDevlieryOptions: IOptionsPsLovDeliveryOptionsExposed = {
    fcName: 'deliveryOptions',
    group: this.formGroup
  };

  preferredLanguageOptions: IOptionsPsLovPreferredLanguageExposed = {
    fcName: 'lang',
    group: this.formGroup
  };

  inputCardNumberForm: FormGroup = new FormGroup({});
  inputCardNumberOptions: IOptionsPsInputCardNumberExposed = {
    fcName: 'inputCardNumber',
    group: this.inputCardNumberForm
  };

  inputCardCvvForm: FormGroup = new FormGroup({});
  inputCardCvvOptions: IOptionsPsInputCardNumberExposed = {
    fcName: 'inputCardCvv',
    group: this.inputCardCvvForm
  };
  psMenuReachOptions: IOptionsPsComplexMenuReachExposed = {

  };

  lookupOwnAccountsOptions: IOptionsPsLookupOwnAccountsExposed = {
    component: PsAccountsListComponent,
    accountNumber: '25252626355',
    currency: 'USD',
    labelKey: 'own_accounts_key',
    placeHolder: 'select_own_account_key',
    group: this.formGroup,
    accountAllowedCurrencies: [],
    accountAllowedTypes: [],
    glTypes: 'G',
    fromTo: 'from',
    requestObject: null
  };
  purposeComplexOptions: IOptionsComplexPurposeExposed = {
    group: this.formGroup,
    fcName: 'purposeComplex'
  };
  findCIFOptions: IOptionsPsComplexFindCIFComponentExposed = {
    fcName: 'findCIF',
    group: this.formGroup
  };
  fileUploadOptions: IOptionsPsFileUploadComponent = {
    multiple: true,
    fcName: 'fileUpload',
    group: this.formGroup
  };

  public complexExchangeOptions: IOptionsPsComplexExchnageExposed = {
    editableMode: true,
    fromAmountOptions: {
      currency: '',
      currenciesOptions: {
        placeHolder: 'currency_key',
        fcName: 'currency',
        group: this.formGroup
      },
      amountOptions: {
        labelKey: 'amount_key',
        placeHolder: 'enter_amount_key',
        fcName: 'transactionAmount',
        group: this.formGroup
      }
    },
    toAmountOptions: {
      currency: '',
      currenciesOptions: {
        placeHolder: 'currency_key',
        fcName: 'toCurrency',
        group: this.formGroup
      },
      amountOptions: {
        labelKey: 'exchange_amount_key',
        placeHolder: 'enter_amount_key',
        fcName: 'toAmount',
        group: this.formGroup
      }
    }
  };

  onInitialPurposeChange(val) {
    // console.log('onInitialPurposeChange', val);
  }

  constructor(private common: PsCommonService) {
  }

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
    }
  };

  freeInputTextOptions: IOptionsPsInputFreeTextExposed = {
    group: this.formGroup,
    fcName: 'freetxt',
    labelKey: 'Input Free Text',
    placeHolder: 'Input Free Text'
  };

  freeInputTextVarchar: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'varchartxt',
    labelKey: 'Input varchar',
    placeHolder: 'Input varchar',
  };



  stepperOptions: IOptionsTemplateStepper = {
    isHorizontalStepper: true,
    numberOfSteps: 2,
    namesofSteps: [],
    group: this.formGroup,
    submitOptions: {
      submitServiceUrl: 'omnicommon/test',
      preCallFunction: {
        func() {
          return new Promise<any>((resolve, reject) => {
            resolve(this.executionClass.onSubmit());
          });
        },
        executionClass: this
      },
      postCallFunction: {
        func() {
          return new Promise<any>((resolve, reject) => {
            resolve(this.executionClass.checkUsername());
          });
        },
        executionClass: this
      },
      group: this.formGroup,
    }
  };

  userNameOptions: IOptionsPsInputUserNameExposed = {
    group: this.formGroup,
    fcName: 'username'
  };

  passwordOptions: IOptionsPsInputPasswordExposed = {
    group: this.formGroup,
    fcName: 'password'
  };

  // psSwitcherlov:IOptionsPsSwitcherLov={

  // }
  // psSwitcherlov:IOptionsPsSwitcherLovPreferredLanguageExposed={
  mapAtmBranchesOptions: IOptionsPsMapAtmBranchesExposed = {
    mapOptions: {
      labelKey: 'map'
    }
  };
  callOptions: IOptionsPsButtonCall = {
    cellNumber: '12312312312',
    group: this.formGroup
  };
  schedulerOptions: IOptionsPSComplexRecurringSchedulerExposed = {
    fcName: 'psScheduler',
    group: this.formGroup
  };
  // directionOptions: IOptionsPsButtonDirection = {
  //   labelKey: 'Direction_Button_Key'
  // };
  // };

  // psSwitcher: IOptionsPsAnchorSwitcherExposed = {
  //   listOfOptions: [
  //     {
  //       iconOptions:{
  //         iconName:'user',
  //         labelOptions:{
  //             labelKey:'testanchorIcon1',
  //         //    positionOption:'column'
  //           },

  //       }  
  //     },
  //     {           
  //       iconOptions:{
  //         iconName:'flag2',
  //         labelOptions:{
  //             labelKey:'testanchorIcon2',
  //        //     positionOption:'column'
  //           },

  //       }  
  //     }

  //   ]
  // };
  // psSwitcherImage: IOptionsPsAnchorSwitcherExposed = {
  //   listOfOptions: [
  //     {
  //       imageOptions: {      
  //         labelOptions:{
  //           labelKey:'testanchorImg1',
  //       //    positionOption:'column'
  //         } ,
  //          imageBase64Url:'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'
  //        }

  //     },
  //     {
  //       imageOptions: {      
  //         labelOptions:{
  //           labelKey:'testanchorImg2',
  //        //   positionOption:'column'
  //         } ,
  //          imageBase64Url:'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'
  //        }
  //     }

  //   ]
  // };

  ngOnInit() {
    this.submitOptions = {
      labelKey: 'Save',
      group: this.formGroup
    };
    this.resetoptions = {
      labelKey: 'Reset',
      group: this.formGroup
    };
    this.backOptions = {
      labelKey: 'Back',
      group: this.formGroup
    };
    this.nextOptions = {
      labelKey: 'Next',
      group: this.formGroup
    };
    this.standardOptions = {
      iconName: 'create',
      iconPosition: 'icon-only',
      group: this.formGroup
    };
    this.checkboxOptions = {
      labelKey: 'Checkbox',
      fcName: 'checkbox',
      group: this.formGroup
    };
    this.radioOptions = {
      labelKey: 'Radio Button',
      listOfOptions: [{ itemValue: 1, description: 'Hisham' }, { itemValue: 2, description: 'Gilbert', checked: true }],
      group: this.formGroup,
      fcName: 'employee'
      // listOfRadioOptions: [{ itemValue: 1, description: 'Option 1'},
      // { itemValue: 2, description: 'Option 2'}]
    };
    this.common.setFormData(this.formGroup, this.myFormVO);
  }

  onCall() {
    // console.warn('onCall Clicked !');
  }

  onDirection() {
    // console.warn('onDirection Clicked !');
  }

  onSubmit() {
    // console.warn('Submit Clicked !');
  }

  onReset() {
    // console.warn('Reset Clicked !');
  }

  onBack() {
    // console.warn('Back Clicked !');
  }

  onNext() {
    // console.warn('Next Clicked !');
  }

  onPress() {
    // console.warn('Standard Clicked !');
  }

  onCancel() {
    // console.warn('Cancel Clicked !');
  }

  onChange(values: IchangeValues) {
    // console.log('the changed values are:');
    // console.log(values);
    // console.log('the formVO values are:');
    // console.log(this.myFormVO);
  }

  onInputKeyDown(event) {
    // console.log('the input keydown event is triggered');
  }

  onCardNumberChange(value: IchangeValues) {
    // console.log('CardNumber:' + value.newValue);
  }
  onCardOwnerChange(value: IchangeValues) {
    // console.log('CardOwner:' + value.newValue);
  }
  onCardMonthChange(value: IchangeValues) {
    // console.log('CardMonth:' + value);
  }
  onCardYearChange(value: IchangeValues) {
    // console.log('CardYear:' + value);
  }
  onCardCvvChange(value: IchangeValues) {
    // console.log('CardCvv:' + value.newValue);
  }

  onSecurityQuestionChange(value: IchangeValues) {
    // console.log('onSecurityQuestionChange:' + value);
  }

  onAnswerChange(value: IchangeValues) {
    // console.log('onAnswerChange:' + value.newValue);
  }

  onUserCredentialPasswordChange(value: IchangeValues) {
    // console.log('onUserCredentialPasswordChange:' + value.newValue);
  }
  onUserCredentialUsernameChange(value: IchangeValues) {
    // console.log('onUserCredentialUsernameChange:' + value.newValue);
  }
  onUserCredentialComplexPasswordChange(value: IchangeValues) {
    // console.log('onUserCredentialComplexPasswordChange:' + value.newValue);
  }
  onUserCredentialComplexConfirmPasswordChange(value: IchangeValues) {
    // console.log('onUserCredentialComplexConfirmPasswordChange:' + value.newValue);
  }
  onUserCredentialSecurityQuestionChange(value: IchangeValues) {
    // console.log('onUserCredentialSecurityQuestionChange:' + value);
  }
  onUserCredentialInputChange(value: IchangeValues) {
    // console.log('onUserCredentialInputChange:' + value.newValue);
  }


  onConfirmNewPasswordChange(value: IchangeValues) {
    // console.log('onConfirmNewPasswordChange:' + value);
  }
  onConfirmPasswordChange(value: IchangeValues) {
    // console.log('onConfirmPasswordChange:' + value.newValue);
  }

  onCardNumberInputChange(value: IchangeValues) {
    // console.log('onCardNumberInputChange:' + value.newValue);
  }
  onCardCvvInputChange(value: IchangeValues) {
    // console.log('onCardCvvInputChange:' + value.newValue);
  }
  onActionImageClick(value: IchangeValues) {
    // console.log('onActionImageClick:' + value);
  }
}
