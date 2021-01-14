import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsComplexUserAddressExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-address/ps-complex-address.component.interface';
import { IOptionsPsComplexCifIdTypesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-cif-id-types/ps-complex-cif-id-types.component.interface';
import { IOptionsComplexEcoSectorsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-eco-sector/ps-complex-eco-sector.component.interface';
import { PsComplexEmploymentDetailsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-employment-details/ps-complex-employment-details.component.interface';
import { PsComplexPersonalDetailsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-personal-details/ps-complex-personal-details.component.interfaces';
import { IOptionsPsComplexSelectBranchComponentExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-select-branch/ps-complex-select-branch.component.interface';
import { IOptionsPsComplexUserCredentialExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-user-credentials/ps-complex-user-credentials.component.interfaces';
import { IOptionsPsEntityPhoneNumberExposed } from 'src/app/commonBussinessSRC/psComponents/ps-field-entity/ps-entity-phone-number/ps-entity-phone-number.component.interfaces';
import { IOptionsPsInputEmailExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-email/ps-input.email.component.interface';
import { IOptionsPsInputNumericExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-numeric/ps-input-numeric.component.interfaces';
import { IOptionsPsInputVarcharExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsMapAtmBranchesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.interfaces';
import { IOptionsPsDropdownAccountTypesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-account-types/ps-dropdown-account-types.component.interface';
import { IOptionsPsDropdownCardTypesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-card-types/ps-dropdown-card-types.component.interface';
import { IOptionsPsDropdownChequebookTypesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-chequebook-types/ps-dropdown-chequebook-types.component.interface';
import { IOptionsPsDropDownCountryExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-country/ps-dropdown-country.component.interfaces';
import { IOptionsPsDropdownCurrenciesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-currencies/ps-dropdown-currencies.component.interfaces';
import { IOptionsPsDropdownLegalStatusExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-legal-status/ps-dropdown-legal-status.component.interface';
import { IOptionsPsDropdownLov } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-dropdown-lov.component.interfaces';
import { IOptionsPsLovGenderExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-gender/ps-lov-gender.component.interfaces';
import { IOptionsPsDropdownPostalCodesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-postal-codes/ps-dropdown-postal-codes.component.interfaces';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { EventEmitterService } from 'src/app/commonSRC/psServices/event-emitter/event-emitter.service';
import { Events } from 'src/app/commonSRC/psServices/Event/event.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsContainerPanel, IOptionsPsFileUploadComponent, IOptionsPsKeyinInputExposed, IOptionsPsLabel, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { OmniBasePage } from '../omni-base/omni-base.page';


@Component({
  selector: 'on-boarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnBoardingPage extends OmniBasePage implements OnInit, AfterViewInit {
  @Output() public fileSelected: EventEmitter<any> = new EventEmitter<any>();
  selectedFileData: any;
  formGroup: FormGroup = new FormGroup({});
  enableCifBranch = false;
  onBoardingVO: any = {};
  stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'create_account_stepper',
    isHorizontalStepper: true,
    numberOfSteps: 5,
    namesofSteps: ['create_account_step1', 'create_account_step2', 'create_account_step3', 'create_account_step4', 'create_account_step5'],
    group: this.formGroup,
    submitOptions: {
      group: this.formGroup,
      submitServiceUrl: this.commonProv.activePage.value.operID === CommonBussinessConstant.ON_BOARDING_OPER ? PsCommonSettings.serviceUrl.SubmitOutsideAction : PsCommonSettings.serviceUrl.commonSubmitAction
    },
    requestObject: this.onBoardingVO,
    showReport: false
  };
  showCardToggle = false;
  showChequeBookToggle = false;
  panelOptions1Step1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'personal_details_key',
    iconName: 'user',
    expanded: true
  };
  panelOptions2Step2: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'identification_details_key',
    iconName: 'finger-print',
    expanded: false
  };
  panelOptions1Step2: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'address_details_key',
    iconName: 'compass',
    expanded: true
  };
  panelOptions1Step3: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'credentials_key',
    iconName: 'clipboard',
    expanded: true
  };
  panelOptions1Step4: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'products_key',
    iconName: 'document',
    expanded: true
  };
  panelIdDetailsOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'id_details_key',
    expanded: true,
  };
  panelAddressDetailsOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'address_key',
    expanded: true
  };
  panelAccountOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'account_request_key',
    expanded: false
  };
  panelAttachementOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'attachment_details_key',
    expanded: false
  };
  panelCifInformationOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'cif_information_key',
    expanded: false
  };
  panelAditionalInformationOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'additional_details_key',
    expanded: false
  };
  atmBranchesPanelOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'atm_branches_key',
    expanded: false
  };
  panelCifAddressOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'address_details_key',
    expanded: false
  };
  ////////////////////////////////////////////////////////////////
  panelEmployementDetailsOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'employement_details_key',
    expanded: false
  };


  phoneNumberOptions: IOptionsPsEntityPhoneNumberExposed = {
    group: this.formGroup,
    labelKey: 'mobile_number_key',
    placeHolder: 'mobile_key',
    fcName: 'onb_accountMobile',
    validate: true
  }
  emailOptions: IOptionsPsInputEmailExposed = {
    group: this.formGroup,
    fcName: 'onb_accountEmail',
    labelKey: 'email_key',
    placeHolder: 'enter_email_key',
  };
  userCredentialsOptions: IOptionsPsComplexUserCredentialExposed = {
    fcName: 'onb_complexUserCredentials',
    group: this.formGroup,
    userNameOption: {
      fcName: 'onb_accountUsername',
      group: this.formGroup,
    },
    passwordConfirmOptions: {
      group: this.formGroup,
      password: {
        labelKey: 'password_key',
        placeHolder: 'enter_password_key',
        fcName: 'onb_accountPass',
        group: this.formGroup,
      },
      confirmPassword: {
        labelKey: 'confirm_password_key',
        placeHolder: 'enter_confirm_password_key',
        fcName: 'onb_accountConfirmPass',
        group: this.formGroup,
      }
    }
  };
  fileUploadOptions: IOptionsPsFileUploadComponent = {
    multiple: true,
    fcName: 'uploadedFiles',
    group: this.formGroup,
    uploadIconName: 'attach'
  };
  addressOptions2: IOptionsPsComplexUserAddressExposed = {
    areaOptions: {
      labelKey: 'area_key',
      placeHolder: 'enter_area_key',
      fcName: 'onb_accountArea',
      group: this.formGroup
    },
    wayOptions: {
      labelKey: 'way_key',
      placeHolder: 'enter_way_key',
      fcName: 'onb_accountWay',
      group: this.formGroup,
    },
    buildingOptions: {
      labelKey: 'building_no_key',
      placeHolder: 'enter_building_no_key',
      fcName: 'onb_accountOccupationBuilding',
      group: this.formGroup
    },
    streetOptions: {
      labelKey: 'street_key',
      placeHolder: 'enter_street_key',
      fcName: 'onb_accountStreet',
      group: this.formGroup
    },
    countriesOptions: {
      labelKey: 'country_key',
      placeHolder: 'select_country_key',
      fcName: 'onb_accountCountryCode',
      group: this.formGroup,
    },
    regionOptions: {
      labelKey: 'region_key',
      placeHolder: 'select_region_key',
      fcName: 'onb_accountRegionCode',
      group: this.formGroup
    },
    cityOptions: {
      labelKey: 'city_key',
      placeHolder: 'select_city_key',
      fcName: 'onb_accountCityCode',
      group: this.formGroup,
    },
    poBoxInputOptions: {
      group: this.formGroup,
      fcName: 'onb_accountPoBox',
      labelKey: 'pobox_key',
      placeHolder: 'enter_pobox_key',

    },
    postalCodesOptions: {
      labelKey: 'postal_code',
      placeHolder: 'select_postal_code_key',
      fcName: 'onb_postalCode',
      group: this.formGroup,
      iconOptions: {
        iconName: 'clipboard'
      }
    }
  };

  fileUploadLabelDescription: IOptionsPsLabel = {
    labelKey: 'onboarding_label_upload_description_key',
  };
  defaultCifIdTypesOptions: IOptionsPsComplexCifIdTypesExposed = {
    showCifType: false,
    group: this.formGroup,
    cifTypeOptions: {
      group: this.formGroup,
      fcName: 'onb_cifType'
    },
    complexIdDetailsOptions: {
      dropdownIdTypesOptions: {
        group: this.formGroup
      },
      idNumberOptions: {
        group: this.formGroup
      },
      dateExpiryOptions: {
        group: this.formGroup
      },
      countriesOptions: {
        group: this.formGroup

      },
      issueDateOptions: {
        group: this.formGroup

      }
    },
    complexIdDetailsOptions1: {
      dropdownIdTypesOptions: {
        group: this.formGroup
      },
      idNumberOptions: {
        group: this.formGroup
      },
      dateExpiryOptions: {
        group: this.formGroup
      },
      countriesOptions: {
        group: this.formGroup

      },
      issueDateOptions: {
        group: this.formGroup

      }
    },
    requestObject: this.onBoardingVO
  };
  firstNameOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'onb_firstname',
    labelKey: 'english_first_name_key',
    placeHolder: 'enter_english_first_name_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  middleNameOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'onb_middleName',
    labelKey: 'english_middle_name_key',
    placeHolder: 'enter_english_middle_name_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  lastNameOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'onb_lastName',
    labelKey: 'english_last_name_key',
    placeHolder: 'enter_english_last_name_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };

  shortArabicNameOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'briefNameArabic',
    labelKey: 'arabic_brief_name_key',
    placeHolder: 'enter_arabic_brief_name_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  longArabicNameOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'longNameArabic',
    labelKey: 'arabic_long_name_key',
    placeHolder: 'enter_arabic_long_name_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  defaultPersonalDetailsOptions: PsComplexPersonalDetailsExposed = {
    customerNameOptions: {
      group: this.formGroup,
      fcName: 'onb_customername',
      labelKey: 'customer_name_key',
      placeHolder: 'enter_customer_name_key',
      iconOptions: {
        iconName: 'clipboard'
      }
    },
    psDobOptions: {
      group: this.formGroup,
      fcName: 'onb_birthDate',
      labelKey: 'date_of_birth_key',
      placeHolder: 'select_date_of_birth_key',
    },
    nationalityOptions: {
      labelKey: 'select_nationality_key',
      placeHolder: 'please_select_nationality_key',
      fcName: 'onb_nationality',
      group: this.formGroup,
      iconOptions: {
        iconName: 'clipboard'
      }
    },
    maritalstatusOptions: {
      labelKey: 'marital_status_key',
      // placeHolder: 'select_maritial_status_key',
      fcName: 'onb_martialStatus',
      group: this.formGroup,
      iconOptions: {
        iconName: 'clipboard'
      }
    }
  };
  postalCodeOptions: IOptionsPsDropdownPostalCodesExposed = {
    labelKey: 'select_postal_code_key',
    placeHolder: 'please_select_postal_code_key',
    fcName: 'onb_postalCode',
    group: this.formGroup,
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  genderOptions: IOptionsPsLovGenderExposed = {
    group: this.formGroup,
    fcName: 'onb_gender',
  };
  lstatusOptions: IOptionsPsDropdownLegalStatusExposed = {
    labelKey: 'legal_status_key',
    placeHolder: 'legal_status_key',
    group: this.formGroup,
    fcName: 'onb_lstatus',
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  accountTypeOptions: IOptionsPsDropdownAccountTypesExposed = {
    allowedAccountType: ConstantCommon.AllowedGeneralAccountTypes,
    accountCategory: ConstantCommon.ACC_TYPE_D,
    group: this.formGroup,
    fcName: 'onb_accountTypes'
  };
  currencyOptions: IOptionsPsDropdownCurrenciesExposed = {
    labelKey: 'currency_key',
    placeHolder: 'select_currency_key',
    group: this.formGroup,
    fcName: 'onb_currency'
  };
  commentOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'onb_comment',
    labelKey: 'file_comment_key',
    placeHolder: 'enter_file_comment_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  tinNumberOptions: IOptionsPsInputNumericExposed = {
    fcName: 'onb_tinNumber',
    group: this.formGroup,
    labelKey: 'tin_number_key',
    placeHolder: 'enter_tin_number_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  countriesOptions: IOptionsPsDropDownCountryExposed = {
    labelKey: 'country_of_birth_key',
    placeHolder: 'select_country_key',
    fcName: 'onb_country',
    group: this.formGroup,
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  branchOptions: IOptionsPsKeyinInputExposed = {
    placeHolder: 'get cif branch from session',
    labelKey: 'branch_key',
    group: this.formGroup,
    fcName: 'onb_branch_name'
  };
  defaultEmployeeOptions: PsComplexEmploymentDetailsExposed = {
    employerNameOptions: {
      group: this.formGroup,
      fcName: 'onb_employeename',
      labelKey: 'company_name_key',
      placeHolder: 'enter_company_name_key',
      iconOptions: {
        iconName: 'clipboard'
      }
    },
    occupationOptions: {
      group: this.formGroup,
      fcName: 'onb_occupation',
      labelKey: 'occupation_key',
      placeHolder: 'enter_occupation_key',
      iconOptions: {
        iconName: 'clipboard'
      }
    },
    dateOfJoiningDivisionOptions: {
      group: this.formGroup,
      fcName: 'onb_dateofjoining',
      labelKey: 'date_of_joining_key',
      placeHolder: 'enter_date_of_joining_key'
    },
    addressOptions: {
      areaOptions: {
        labelKey: 'area_key',
        placeHolder: 'enter_area_key',
        fcName: 'onb_employeearea',
        group: this.formGroup
      },
      wayOptions: {
        labelKey: 'way_key',
        placeHolder: 'enter_way_key',
        fcName: 'onb_employeeway',
        group: this.formGroup,
      },
      buildingOptions: {
        labelKey: 'building_no_key',
        placeHolder: 'enter_building_no_key',
        fcName: 'onb_employeebuilding',
        group: this.formGroup
      },
      // poBoxOptions: {
      //   regionOptions: {
      //     labelKey: 'region_key',
      //     placeHolder: 'region_key',
      //     fcName: 'region',
      //     selectedCountryCode: '',
      //     group: this.formGroup,
      //     iconOptions: {
      //       iconName: 'clipboard'
      //     }
      //   }, poBoxInputOptions: {
      //     labelKey: 'pobox_key',
      //     placeHolder: 'enter_pobox_key',
      //     fcName: 'poboxinput',
      //     group: this.formGroup,
      //   }
      // },
      postalCodesOptions: {
        labelKey: 'postal_code',
        placeHolder: 'select_postal_code_key',
        fcName: 'onb_employeePostalcode',
        group: this.formGroup,
        iconOptions: {
          iconName: 'clipboard'
        }
      },
      streetOptions: {
        labelKey: 'street_key',
        placeHolder: 'enter_street_key',
        fcName: 'onb_employeestreet',
        group: this.formGroup
      },
      countriesOptions: {
        labelKey: 'country_key',
        placeHolder: 'select_country_key',
        fcName: 'onb_employeecountry',
        group: this.formGroup,
      },
      regionOptions: {
        labelKey: 'region_key',
        placeHolder: 'select_region_key',
        fcName: 'onb_employeeregion',
        group: this.formGroup
      },
      cityOptions: {
        labelKey: 'city_key',
        placeHolder: 'select_city_key',
        fcName: 'onb_employeecity',
        group: this.formGroup,
      },
      poBoxInputOptions: {
        group: this.formGroup,
        fcName: 'onb_employeepobox',
        labelKey: 'pobox_key',
        placeHolder: 'enter_pobox_key',
        iconOptions: {
          iconName: 'clipboard'
        }
      }
    },
    officeTelPhoneNumberOptions: {
      fcName: 'onb_empOfficeTelPhoneNumber',
      group: this.formGroup,
      labelKey: 'office_tel_key',
    },
    handPhoneNumberOptions: {
      fcName: 'onb_empHandPhoneNumber',
      group: this.formGroup,
      labelKey: 'hand_phone_number_key',
    },
    faxOptions: {
      fcName: 'onb_empFaxNumber',
      group: this.formGroup,
      labelKey: 'fax_key',
    }
  };

  lostDocumentRequestVO = {};

  cardsLookupOptiops: IOptionsPsDropdownLov = {
    fcName: 'onb_card',
    group: this.formGroup,
  };

  cardcheckboxOptions = {
    group: this.formGroup,
    fcName: 'onb_card_checkbox',
    labelKey: 'i_want_a_card_key',
    allowCust: false,
  };
  chequeBookcheckboxOptions = {
    group: this.formGroup,
    fcName: 'onb_chequebook_checkbox',
    labelKey: 'i_want_a_cheque_book_key',
    allowCust: false,
  };

  chequebookTypeOptions: IOptionsPsDropdownChequebookTypesExposed = {
    group: this.formGroup,
    fcName: 'onb_chequeBookTypes'
  };
  debitCardTypeOptions: IOptionsPsDropdownCardTypesExposed = {
    labelKey: 'debit_card_type_key',
    placeHolder: 'debit_card_type_key',
    group: this.formGroup,
    fcName: 'onb_debitcardType',
    cardType: ConstantCommon.CARDTYPE_D
  };
  creditCardTypeOptions: IOptionsPsDropdownCardTypesExposed = {
    labelKey: 'credit_card_type_key',
    placeHolder: 'credit_card_type_key',
    group: this.formGroup,
    fcName: 'onb_creditCardType',
    cardType: ConstantCommon.CARDTYPE_C
  };
  selectBranchOptions: IOptionsPsComplexSelectBranchComponentExposed = {
    fcName: 'mapAtmBranchesDropdown',
    group: this.formGroup
  };
  panelOptions2Step1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'select_branch_key',
    iconName: 'document',
    expanded: true
  };
  showCifDetails = false;
  public showChequebooklookup = false;
  public showCardTypelookup = false;
  public showCreditCardTypes = false;
  public showDebitCardTypes = false;
  //////////////////////////////////////////////////////////

  mapAtmBranchesOptions: IOptionsPsMapAtmBranchesExposed = {};
  complexEcoSectorOptions: IOptionsComplexEcoSectorsExposed = {
    fcName: 'ecoSector',
    group: this.formGroup
  };
  constructor(public commonProv: PsCommonService, public loggerP: LoggerService, private omniPull: OmniPullService,
    public eventEmitterService: EventEmitterService, public events: Events) {
    super();
  }

  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
    this.mapAtmBranchesOptions = {
      group: this.formGroup,
      fcName: 'onb_mapAtmBranches',
      labelKey: 'map_branch_key',
      mapOptions: {
        labelKey: 'map'
      },
      showSegments: false,
      mapTypesInclude: '\'B\'',
      branchIds: '1,3,5'
    };
    this.omniPull.getParamValOf(CommonBussinessConstant.CIF_MAX_NUMBER_OF_ATTACHMENTS).then((result) => {
      if (result) {
        this.fileUploadOptions.maxNbFiles = result[CommonBussinessConstant.CIF_MAX_NUMBER_OF_ATTACHMENTS];
      }
    });
    if (this.commonProv.activePage.value.operID === CommonBussinessConstant.CIF_ONBOARDING_OPER) {
      this.showCifDetails = true;
      this.loadOnBoardingData();
    }
    this.eventEmitterService.getSelectBranchEmitter().subscribe((val) => {
      this.formGroup.controls[this.mapAtmBranchesOptions.fcName].setValue(val);
      this.commonProv.setValInsideNestedObj(this.mapAtmBranchesOptions.fcName, val, this.onBoardingVO);
    });

  }

  ionViewDidEnter() {
    super.ionViewDidEnter();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.cardcheckboxOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, ['mapBranchInput'], 0);
  }
  onSelectBranch($event) {
    if ($event.itemValue !== undefined) {
      this.formGroup.controls[this.selectBranchOptions.fcName].setValue($event);
      this.commonProv.setValInsideNestedObj(this.selectBranchOptions.fcName, $event.selectedObj, this.onBoardingVO);
    }
  }

  loadOnBoardingData() {
    this.omniPull.returnSubmitDataList({ filterByOper: true, status: 'DR' }).then((val) => {
      const data = val.gridModel;
      this.commonProv.dismissLoading();
      if (data.length > 0) {
        const VO = data[0];
        VO.submitFieldValueMap.actionType = 'save';
        VO.submitFieldValueMap.dataSaveId = Number(VO.dataSaveId);
        this.events.publish('draft:navigation', VO.submitFieldValueMap);
        this.commonProv.dismissLoading();
      }
    }).catch((err) => {
      this.commonProv.dismissLoading();
    });
  }

  resetVisibility() {
    this.showCardToggle = false;
    this.showChequeBookToggle = false;
    this.showCardTypelookup = false;
    this.showChequebooklookup = false;
    this.resetCardsVisibility();
  }

  resetCardsVisibility() {
    this.showDebitCardTypes = false;
    this.showCreditCardTypes = false;
  }

  cardChecking(event) {
    if (event.newValue != undefined) {
      if (event.newValue == 'true' || event.newValue == true) {
        this.showCardTypelookup = true;
      } else {
        this.showCardTypelookup = false;
        this.resetCardsVisibility();
      }
    }
  }
  chequeBookChecking(event) {
    if (event.newValue != undefined) {
      if (event.newValue == 'true' || event.newValue == true) {
        this.showChequebooklookup = true;
      } else {
        this.showChequebooklookup = false;
      }
    }
  }

  cardTypeChecking(event) {
    if (event.newValue != undefined || event.itemValue != undefined) {
      if (event.newValue === 'D' || event.itemValue === 'D') {
        this.showDebitCardTypes = true;
        this.showCreditCardTypes = false;
      } else if (event.newValue === 'C' || event.itemValue === 'C') {
        this.showCreditCardTypes = true;
        this.showDebitCardTypes = false;
      }
    }
  }

  accountTypeChecking(event) {
    this.resetVisibility();
    if (event.affectCard != undefined) {
      if (event.affectCard === '1') {
        this.showCardToggle = true;
      }
      if (event.affection === '2') {
        this.showChequeBookToggle = true;
      }
    }
  }

  ngAfterViewInit() {
    if (this.onBoardingVO[this.cardcheckboxOptions.fcName] === undefined) {
      this.onBoardingVO[this.cardcheckboxOptions.fcName] = false;
    }
    if (this.onBoardingVO[this.chequeBookcheckboxOptions.fcName] === undefined) {
      this.onBoardingVO[this.chequeBookcheckboxOptions.fcName] = false;
    }
  }

}
