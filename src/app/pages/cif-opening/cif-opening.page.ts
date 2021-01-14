import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsComplexUserAddressExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-address/ps-complex-address.component.interface';
import { PsComplexCifDetailsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-cif-details/ps-complex-cif-details.component.interface';
import { IOptionsPsComplexCifIdTypesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-cif-id-types/ps-complex-cif-id-types.component.interface';
import { IOptionsComplexEcoSectorsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-eco-sector/ps-complex-eco-sector.component.interface';
import { PsComplexEmploymentDetailsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-employment-details/ps-complex-employment-details.component.interface';
import { IOptionsPsComplexIdDetailsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-id-details/ps-complex-id-details.interface';
import { PsComplexPersonalDetailsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-personal-details/ps-complex-personal-details.component.interfaces';
import { IOptionsPsComplexSelectBranchComponentExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-select-branch/ps-complex-select-branch.component.interface';
import { IOptionsPsComplexUserContactExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-user-contact/ps-complex-user-contact.component.interfaces';
import { IOptionsPsEntityPhoneNumberExposed } from 'src/app/commonBussinessSRC/psComponents/ps-field-entity/ps-entity-phone-number/ps-entity-phone-number.component.interfaces';
import { IOptionsPsInputNumericExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-numeric/ps-input-numeric.component.interfaces';
import { IOptionsPsInputVarcharExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsMapAtmBranchesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.interfaces';
import { IOptionsPsDropdownCifTypesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-cif-types/ps-dropdown-cif-types.component.interfaces';
import { IOptionsPsDropDownCountryExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-country/ps-dropdown-country.component.interfaces';
import { IOptionsPsDropdownLegalStatusExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-legal-status/ps-dropdown-legal-status.component.interface';
import { IOptionsPsLovGenderExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-gender/ps-lov-gender.component.interfaces';
import { IOptionsPsDropdownPostalCodesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-postal-codes/ps-dropdown-postal-codes.component.interfaces';
import { IOptionsPsDropdownRankingExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-ranking/ps-dropdown-reanking.component.interface';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IOcBranchesRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { EventEmitterService } from 'src/app/commonSRC/psServices/event-emitter/event-emitter.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsContainerPanel, IOptionsPsFileUploadComponent, IOptionsPsKeyinInputExposed, IOptionsPsTemplateForm, IOptionsTemplateStepper, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { OmniBasePage } from '../omni-base/omni-base.page';
import { IOptionsPsLovResidencyExposed } from './../../commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-residency/ps-lov-residency.component.interface';


@Component({
  selector: 'cif-opening',
  templateUrl: './cif-opening.page.html',
  styleUrls: ['./cif-opening.page.scss'],
})
export class CifOpeningPage extends OmniBasePage implements OnInit, AfterViewInit {
  formGroup: FormGroup = new FormGroup({});
  enableCifBranch = false;
  cifInfo: any;
  cifOpeningVO: any = {};
  mapAtmBranchesOptions: IOptionsPsMapAtmBranchesExposed = {};
  isInstitutionType = false;
  stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'cif_open_stepper',
    isHorizontalStepper: true,
    numberOfSteps: 3,
    namesofSteps: ['cif_open_step1', 'cif_open_step2', 'cif_open_step3'],
    group: this.formGroup,
    submitOptions: {
      extraParams: {},
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.cifOpeningRequest,
      group: this.formGroup,
    },
    requestObject: this.cifOpeningVO
  };
  cifOptions: IOptionsPsComplexCifIdTypesExposed = {
    group: this.formGroup,
    cifTypeOptions: {
      group: this.formGroup,
      fcName: 'cifType'
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
    requestObject: this.cifOpeningVO
  };

  public options: IOptionsPsTemplateForm = {
    // submitServiceUrl: PsCommonBusinessSettings.serviceUrl.changeSecurityQuestion,
    group: this.formGroup
  };
  panelIdDetailsOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'id_details_key',
    expanded: true
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
    labelKey: 'attachement_key',
    expanded: false
  };
  panelCifInformationOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'name_details_key',
    expanded: false
  };
  panelAditionalInformationOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'additional_information_key',
    expanded: false
  };
  shortNameArabicOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'briefNameArabic',
    labelKey: 'arabic_brief_name_key',
    placeHolder: 'enter_arabic_brief_name_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  longNameArabicOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'longNameArabic',
    labelKey: 'arabic_long_name_key',
    placeHolder: 'enter_arabic_long_name_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  customerNameValOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'customerName',
    labelKey: 'customer_name_key',
    placeHolder: 'enter_customer_name_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  defaultPersonalDetailsOptions: PsComplexPersonalDetailsExposed = {

    psDobOptions: {
      group: this.formGroup,
      fcName: 'birthDate',
      labelKey: 'date_of_birth_key',
      placeHolder: 'select_date_of_birth_key',
    },
    nationalityOptions: {
      labelKey: 'nationality_key',
      placeHolder: 'select_nationality_key',
      fcName: 'nationality',
      group: this.formGroup,
      iconOptions: {
        iconName: 'clipboard'
      }
    },
    maritalstatusOptions: {
      labelKey: 'marital_status_key',
      placeHolder: 'select_maritial_status_key',
      fcName: 'martialStatus',
      group: this.formGroup,
      iconOptions: {
        iconName: 'clipboard'
      }
    }
  };
  firstNameOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'firstName',
    labelKey: 'english_first_name_key',
    placeHolder: 'enter_english_first_name_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  middleNameOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'middleName',
    labelKey: 'english_middle_name_key',
    placeHolder: 'enter_english_middle_name_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  lastNameOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'lastName',
    labelKey: 'english_last_name_key',
    placeHolder: 'enter_english_last_name_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  longNameOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'longName',
    labelKey: 'english_long_name_key',
    placeHolder: 'enter_english_long_name_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  shortNameOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'shortName',
    labelKey: 'english_short_name_key',
    placeHolder: 'enter_english_short_name_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  postalCodeOptions: IOptionsPsDropdownPostalCodesExposed = {
    labelKey: 'select_postal_code_key',
    placeHolder: 'please_select_postal_code_key',
    fcName: 'postalCode',
    group: this.formGroup,
    iconOptions: {
      iconName: 'clipboard'
    }
  };

  genderOptions: IOptionsPsLovGenderExposed = {
    group: this.formGroup,
    fcName: 'gender',
  };
  panelEmployementDetailsOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'employement_details_key',
    expanded: true
  };
  lstatusOptions: IOptionsPsDropdownLegalStatusExposed = {
    labelKey: 'legal_status_key',
    placeHolder: 'legal_status_key',
    group: this.formGroup,
    fcName: 'lstatus',
    iconOptions: {
      iconName: 'clipboard'
    }
  };

  panelBankRegisterOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'bank_register_key',
    expanded: false
  };

  userContactOptions: IOptionsPsComplexUserContactExposed = {
    emailBankOptions: {
      labelKey: 'email_key',
      placeHolder: 'email_key',
      fcName: 'userBankEmail',
      group: this.formGroup
    },
    phoneNumberBankOptions: {
      fcName: 'omniUserCO.omniUserVO.MOBILE_NUMBER',
      group: this.formGroup
    }
  };

  addressOptions: IOptionsPsComplexUserAddressExposed = {
    areaOptions: {
      labelKey: 'area_key',
      placeHolder: 'enter_area_key',
      fcName: 'employeearea',
      group: this.formGroup
    },
    wayOptions: {
      labelKey: 'way_key',
      placeHolder: 'enter_way_key',
      fcName: 'employeeway',
      group: this.formGroup,
    },
    buildingOptions: {
      labelKey: 'building_no_key',
      placeHolder: 'enter_building_no_key',
      fcName: 'employeebuilding',
      group: this.formGroup
    },
    poBoxOptions: {
      regionOptions: { // Author: GRadwan 16/01/2020
        labelKey: 'region_key',
        placeHolder: 'select_region_key',
        fcName: 'region',
        selectedCountryCode: '',
        iconOptions: {
          iconName: 'clipboard'
        }
      }, poBoxInputOptions: {
        labelKey: 'pobox_key',
        placeHolder: 'enter_pobox_key',
        fcName: 'poboxinput',
        iconOptions: {
          iconName: 'clipboard'
        }
      }
    },
    streetOptions: {
      labelKey: 'street_key',
      placeHolder: 'enter_street_key',
      fcName: 'employeestreet',
      group: this.formGroup
    },
    countriesOptions: {
      labelKey: 'country_key',
      placeHolder: 'select_country_key',
      fcName: 'employeecountry',
      group: this.formGroup,
    },
    regionOptions: {
      labelKey: 'region_key',
      placeHolder: 'select_region_key',
      fcName: 'employeeregion',
      group: this.formGroup
    },
    cityOptions: {
      labelKey: 'city_key',
      placeHolder: 'select_city_key',
      fcName: 'employeecity',
      group: this.formGroup,
    },
    postalCodesOptions: {
      labelKey: 'postal_code',
      placeHolder: 'select_postal_code_key',
      fcName: 'postalcode',
      group: this.formGroup,
      iconOptions: {
        iconName: 'clipboard'
      }
    }

  };

  fileUploadOptions: IOptionsPsFileUploadComponent = {
    multiple: true,
    fcName: 'selectedFileData',
    group: this.formGroup
  };

  commentOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'comment',
    labelKey: 'file_comment_key',
    placeHolder: 'enter_file_comment_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  complexEcoSectorOptions: IOptionsComplexEcoSectorsExposed = {
    fcName: 'ecoSector',
    group: this.formGroup
  };
  complexIdDetailsOptions: IOptionsPsComplexIdDetailsExposed = {

    dropdownIdTypesOptions: {
      fcName: 'idType',
      group: this.formGroup,
      labelKey: 'national_id_type_key',
      placeHolder: 'enter_national_id_type_key',
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
      labelKey: 'country_of_issuance_key',
      placeHolder: 'select_country_of_issuance_key',
      fcName: 'issuanceCountry',
      iconOptions: {
        iconName: 'clipboard'
      },
      group: this.formGroup
    },
    issueDateOptions: {
      labelKey: 'issue_date_key',
      placeHolder: 'issue_date_key',
      fcName: 'issueDate',
      group: this.formGroup
    }

  };
  tinNumberOptions: IOptionsPsInputNumericExposed = {
    fcName: 'tinNumber',
    group: this.formGroup,
    labelKey: 'tin_number_key',
    placeHolder: 'enter_tin_number_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };

  birthCountriesOptions: IOptionsPsDropDownCountryExposed = {
    labelKey: 'country_of_birth_key',
    placeHolder: 'select_country_key',
    fcName: 'birthCountry',
    group: this.formGroup,
    iconOptions: {
      iconName: 'clipboard'
    }
  };

  countriesOptions: IOptionsPsDropDownCountryExposed = {
    labelKey: 'country_key',
    placeHolder: 'select_country_key',
    fcName: 'addressDetailsCountry',
    group: this.formGroup,
    iconOptions: {
      iconName: 'clipboard'
    }
  };


  branchOptions: IOptionsPsKeyinInputExposed = {
    placeHolder: 'get_cif_branch_frm_session_key',
    labelKey: 'branch_key',
    group: this.formGroup,
    fcName: 'branch_name'
  };
  cifTypeOptions: IOptionsPsDropdownCifTypesExposed = {
    labelKey: 'cif',
    placeHolder: 'select_cif_type_key',
    fcName: 'cifType',
    group: this.formGroup,
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  defaultEmployeeOptions: PsComplexEmploymentDetailsExposed = {
    employerNameOptions: {
      group: this.formGroup,
      fcName: 'employeename',
      labelKey: 'company_name_key',
      placeHolder: 'enter_company_name_key',
      iconOptions: {
        iconName: 'clipboard'
      }
    },
    occupationOptions: {
      group: this.formGroup,
      fcName: 'position',
      labelKey: 'position_key',
      placeHolder: 'enter_occupation_key',
      iconOptions: {
        iconName: 'clipboard'
      }

    },

    dateOfJoiningDivisionOptions: {
      group: this.formGroup,
      fcName: 'dateofjoining',
      labelKey: 'date_of_joining_key',
      placeHolder: 'enter_date_of_joining_key'
    },
    addressOptions: {
      areaOptions: {
        labelKey: 'area_key',
        placeHolder: 'enter_area_key',
        fcName: 'employeearea',
        group: this.formGroup
      },
      wayOptions: {
        labelKey: 'way_key',
        placeHolder: 'enter_way_key',
        fcName: 'employeeway',
        group: this.formGroup,
      },
      buildingOptions: {
        labelKey: 'building_no_key',
        placeHolder: 'enter_building_no_key',
        fcName: 'employeebuilding',
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
        fcName: 'employeePostalcode',
        group: this.formGroup,
        iconOptions: {
          iconName: 'clipboard'
        }
      },
      streetOptions: {
        labelKey: 'street_key',
        placeHolder: 'enter_street_key',
        fcName: 'employeestreet',
        group: this.formGroup
      },
      countriesOptions: {
        labelKey: 'country_key',
        placeHolder: 'select_country_key',
        fcName: 'employeecountry',
        group: this.formGroup,
      },
      regionOptions: {
        labelKey: 'region_key',
        placeHolder: 'select_region_key',
        fcName: 'employeeregion',
        group: this.formGroup
      },
      cityOptions: {
        labelKey: 'city_key',
        placeHolder: 'select_city_key',
        fcName: 'employeecity',
        group: this.formGroup,
      },
      poBoxInputOptions: {
        group: this.formGroup,
        fcName: 'pobox',
        labelKey: 'pobox_key',
        placeHolder: 'enter_pobox_key',
        iconOptions: {
          iconName: 'clipboard'
        }

      }
    },
    officeTelPhoneNumberOptions: {
      fcName: 'empOfficeTelPhoneNumber',
      group: this.formGroup,
      labelKey: 'office_tel_key',
    },
    handPhoneNumberOptions: {
      fcName: 'empHandPhoneNumber',
      group: this.formGroup,
      labelKey: 'hand_phone_number_key',
    },
    faxOptions: {
      fcName: 'empFaxNumber',
      group: this.formGroup,
      labelKey: 'fax_key',
    },
    establishmentDateOptions: {
      group: this.formGroup,
      fcName: 'establishmentDate',
      labelKey: 'establishment_date_key',
      placeHolder: 'enter_establishment_date_key'
    }
  };
  panelCifAddressOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'address_details_key',
    expanded: false
  };
  panelSelectBranch: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'select_branch_key',
    iconName: 'document',
    expanded: true
  };
  defaultCifDetailsOptions: PsComplexCifDetailsExposed = {
    mobileNumberOptions: {
      fcName: 'personalMobileNo',
      group: this.formGroup,
      labelKey: 'personal_tel_key'
    },
    residentialTelOptions: {
      fcName: 'residentialMobileNo',
      group: this.formGroup,
      labelKey: 'residential_tel_key'
    },
    faxOptions: {
      fcName: 'faxNumber',
      group: this.formGroup,
      labelKey: 'fax_key'
    },
    emailOptions: {
      labelKey: 'email_key',
      placeHolder: 'enter_email_key',
      fcName: 'personalEmail',
      group: this.formGroup,
    },
    addressOptions: {
      areaOptions: {
        labelKey: 'area_key',
        placeHolder: 'enter_area_key',
        fcName: 'area',
        group: this.formGroup
      },
      wayOptions: {
        labelKey: 'way_key',
        placeHolder: 'enter_way_key',
        fcName: 'way',
        group: this.formGroup
      },
      buildingOptions: {
        labelKey: 'building_no_key',
        placeHolder: 'enter_building_no_key',
        fcName: 'building',
        group: this.formGroup
      },
      // poBoxOptions: {
      //   regionOptions: {
      //     labelKey: 'region_key',
      //     placeHolder: 'select_region_key',
      //     fcName: 'region',
      //     group: this.formGroup,
      //     selectedCountryCode: '',
      //     iconOptions: {
      //       iconName: 'clipboard'
      //     }
      //   },
      //   poBoxInputOptions: {
      //     labelKey: 'pobox_key',
      //     placeHolder: 'enter_pobox_key',
      //     fcName: 'poboxinput',
      //     group: this.formGroup,
      //   }
      // },
      postalCodesOptions: {
        labelKey: 'postal_code',
        placeHolder: 'select_postal_code_key',
        fcName: 'postalcode',
        group: this.formGroup,
        iconOptions: {
          iconName: 'clipboard'
        }
      },
      streetOptions: {
        labelKey: 'street_key',
        placeHolder: 'enter_street_key',
        fcName: 'street',
        group: this.formGroup,
        iconOptions: {
          iconName: 'clipboard'
        }
      },
      countriesOptions: {
        labelKey: 'country_key',
        placeHolder: 'select_country_key',
        fcName: 'contactBirthCountry',
        group: this.formGroup,
        iconOptions: {
          iconName: 'clipboard'
        }
      },
      regionOptions: {
        labelKey: 'region_key',
        placeHolder: 'region_key',
        fcName: 'region',
        group: this.formGroup,
        iconOptions: {
          iconName: 'clipboard'
        }
      },
      cityOptions: {
        labelKey: 'city_key',
        placeHolder: 'select_city_key',
        fcName: 'city',
        group: this.formGroup,
        iconOptions: {
          iconName: 'clipboard'
        }
      },
      poBoxInputOptions: {
        group: this.formGroup,
        fcName: 'pobox',
        labelKey: 'pobox_key',
        placeHolder: 'enter_pobox_key',
        iconOptions: {
          iconName: 'clipboard'
        }

      }

    }
  };

  moreAddressDetailsInputOptions: IOptionsPsKeyinInputExposed = {
    labelKey: 'more_address_details_key',
    placeHolder: 'more_adress_details_key',
    fcName: 'moreAddressDetails',
    group: this.formGroup
  };

  mobileNumberOptions: IOptionsPsEntityPhoneNumberExposed = {
    labelKey: 'mobile_key',
    fcName: 'mobileNumber',
    group: this.formGroup
  };

  rankingOptions: IOptionsPsDropdownRankingExposed = {
    labelKey: 'ranking_key',
    placeHolder: 'ranking_key',
    fcName: 'ranking',
    group: this.formGroup
  };
  selectBranchOptions: IOptionsPsComplexSelectBranchComponentExposed = {
    fcName: 'mapAtmBranchesDropdown',
    group: this.formGroup
  };

  residencyOptions: IOptionsPsLovResidencyExposed = {
    fcName: 'residency',
    group: this.formGroup
  };
  showAddress = false;
  constructor(public commonService: PsCommonService, private omniPull: OmniPullService,
    private navService: PsNavigatorService,
    public loggerP: LoggerService, public eventEmitterService: EventEmitterService) {
    super();
  }

  ngOnInit() {
    super.init();
    this.mapAtmBranchesOptions = {
      group: this.formGroup,
      fcName: 'mapAtmBranches',
      labelKey: 'map_atm-branch_key',
      mapOptions: {
        labelKey: 'map'
      },
      showSegments: false,
      mapTypesInclude: '\'A\',\'B\',\'C\'',
      branchIds: '1,3,5',
      parameterToCheck: CommonBussinessConstant.CIF_BRANCH
    };
    this.eventEmitterService.getSelectBranchEmitter().subscribe((val) => {
      this.formGroup.controls[this.mapAtmBranchesOptions.fcName].setValue(val);
      this.commonProv.setValInsideNestedObj(this.mapAtmBranchesOptions.fcName, val, this.cifOpeningVO);
    });
    if (JSON.stringify(this.navService.getAllParams()) !== '{}') {
      this.cifOpeningVO = this.navService.getAllParams() ? this.navService.getAllParams() : {};
      this.commonProv.copyObject(this.stepperOptions.requestObject, this.cifOpeningVO, true, false);
    }
    this.cifInfo = this.commonService.session.getValueOf(ConstantCommon.USERINFO);
    this.baseFormGroup = this.formGroup;
  }

  ionViewDidEnter() {
    super.ionViewDidEnter();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.defaultPersonalDetailsOptions.nationalityOptions.fcName], 1);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.birthCountriesOptions.fcName], 1);
    // this.omniPull.getParamValOf(CommonBussinessConstant.ALLOWED_ATTACHMENTS_FILES).then((result) => {
    //   if (result) {
    //     this.fileUploadOptions.allowedTypes = result[CommonBussinessConstant.ALLOWED_ATTACHMENTS_FILES];
    //   }
    // });

    this.omniPull.getParamValOf(CommonBussinessConstant.CIF_MAX_NUMBER_OF_ATTACHMENTS, CommonBussinessConstant.CIF_BRANCH).then((result) => {

      if (result) {
        this.fileUploadOptions.maxNbFiles = result[CommonBussinessConstant.CIF_MAX_NUMBER_OF_ATTACHMENTS];
      }

      if (result[CommonBussinessConstant.CIF_BRANCH] === CommonBussinessConstant.OTHER) {
        this.enableCifBranch = false;
      } else {
        this.enableCifBranch = true;
        this.loadBranch();
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.stepperOptions.namesofSteps[2]], 0, true);
      }
    }).catch((error) => { });
  }

  ngAfterViewInit() {
  }

  onSelectBranch($event) {
    if ($event.itemValue !== undefined) {
      this.formGroup.controls[this.selectBranchOptions.fcName].setValue($event);
      this.commonProv.setValInsideNestedObj(this.selectBranchOptions.fcName, $event.selectedObj, this.cifOpeningVO);
    }
  }

  loadBranch() {
    try {
      const paramData: IOcBranchesRequest = {
        branchesIdList: this.cifInfo.cifBranch ? this.cifInfo.cifBranch : ''
      };
      this.omniPull.returnBranchesList(paramData).then((result) => {
        if (result && result.gridModel != null && result.gridModel.length > 0) {
          const branch = this.cifInfo.cifBranch ? this.cifInfo.cifBranch + ' - ' + result.gridModel[0].longDesc : '';
          this.branchOptions.group.controls[this.branchOptions.fcName].setValue(branch);
         } else { this.loggerP.warn(result, 'empty response'); }
      }).catch((error) => { });
    } catch (error) { }
  }

  onNameChange(val) {
    if (this.cifOpeningVO[this.firstNameOptions.fcName] && this.cifOpeningVO[this.lastNameOptions.fcName]) {
      this.cifOpeningVO[this.customerNameValOptions.fcName] =
        this.cifOpeningVO[this.firstNameOptions.fcName] + ' ' + this.cifOpeningVO[this.lastNameOptions.fcName];
    }
  }

  onResidencyChange(val) {
    if (val && val.selectedObj) {
      if (val.selectedObj.itemValue === CommonBussinessConstant.RESIDENT_CODE) {
        this.showAddress = true;
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.countriesOptions.fcName], CommonBussinessConstant.INVISIBLE_FIELD);
        this.commonProv.setValInsideNestedObj(this.defaultCifDetailsOptions.addressOptions.countriesOptions.fcName, CommonBussinessConstant.SUDAN_COUNTRY_CODE, this.cifOpeningVO);
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.defaultCifDetailsOptions.addressOptions.countriesOptions.fcName, this.defaultCifDetailsOptions.addressOptions.regionOptions.fcName, this.defaultCifDetailsOptions.addressOptions.cityOptions.fcName, this.defaultCifDetailsOptions.addressOptions.streetOptions.fcName, this.defaultCifDetailsOptions.addressOptions.postalCodesOptions.fcName], CommonBussinessConstant.VISIBLE_FIELD);
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.defaultCifDetailsOptions.addressOptions.countriesOptions.fcName], CommonBussinessConstant.VISIBLE_FIELD);
        this.cifOpeningVO[this.countriesOptions.fcName] = '';
      } else {
        this.showAddress = false;
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.countriesOptions.fcName], CommonBussinessConstant.VISIBLE_FIELD);
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.defaultCifDetailsOptions.addressOptions.countriesOptions.fcName, this.defaultCifDetailsOptions.addressOptions.regionOptions.fcName, this.defaultCifDetailsOptions.addressOptions.cityOptions.fcName, this.defaultCifDetailsOptions.addressOptions.streetOptions.fcName, this.defaultCifDetailsOptions.addressOptions.postalCodesOptions.fcName], CommonBussinessConstant.INVISIBLE_FIELD);
        this.cifOpeningVO[this.defaultCifDetailsOptions.addressOptions.countriesOptions.fcName] = '';
        this.cifOpeningVO[this.defaultCifDetailsOptions.addressOptions.regionOptions.fcName] = '';
        this.cifOpeningVO[this.defaultCifDetailsOptions.addressOptions.cityOptions.fcName] = '';
        this.cifOpeningVO[this.defaultCifDetailsOptions.addressOptions.streetOptions.fcName] = '';
        this.cifOpeningVO[this.defaultCifDetailsOptions.addressOptions.postalCodesOptions.fcName] = '';
      }
    }
  }

  onCifTypeSelected(selectedCIF: IPsSelect) {
    if (selectedCIF && selectedCIF.selectedObj) {
      if (selectedCIF.selectedObj.vtIndicator && selectedCIF.selectedObj.vtIndicator === CommonBussinessConstant.INSTITUTION_VT_INDICATOR) {
        this.isInstitutionType = true;
        this.defaultPersonalDetailsOptions.isInstitutionType = true;
        this.defaultEmployeeOptions.isInstitutionType = true;
        this.defaultCifDetailsOptions.isInstitutionType = true;
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_LABEL, ['cif_open_employment_details_panel'], 'institution_details_key');
        this.defaultPersonalDetailsOptions.nationalityOptions.labelKey = 'country_of_establishment_key';
        this.defaultPersonalDetailsOptions.nationalityOptions.placeHolder = 'country_of_establishment_key';
        this.defaultCifDetailsOptions.mobileNumberOptions = {
          fcName: 'personalMobileNo',
          group: this.formGroup,
          labelKey: 'telephone_key'
        };
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [
          this.firstNameOptions.fcName, this.middleNameOptions.fcName, this.lastNameOptions.fcName,
          this.genderOptions.fcName, this.customerNameValOptions.fcName,
          this.defaultPersonalDetailsOptions.psDobOptions.fcName, this.defaultPersonalDetailsOptions.maritalstatusOptions.fcName,
          this.birthCountriesOptions.fcName, this.defaultEmployeeOptions.employerNameOptions.fcName, this.defaultEmployeeOptions.occupationOptions.fcName
        ], 0);
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [
          this.longNameOptions.fcName, this.shortNameOptions.fcName, this.defaultEmployeeOptions.establishmentDateOptions.fcName
        ], 1);
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE,
          [
            this.defaultCifDetailsOptions.residentialTelOptions.fcName,
            this.defaultCifDetailsOptions.residentialTelOptions.fcName + 'countriesFcName',
            this.defaultCifDetailsOptions.residentialTelOptions.fcName + 'numberFcName',
            this.defaultCifDetailsOptions.faxOptions.fcName,
            this.defaultCifDetailsOptions.faxOptions.fcName + 'countriesFcName',
            this.defaultCifDetailsOptions.faxOptions.fcName + 'numberFcName',
            this.genderOptions.fcName,
            this.customerNameValOptions.fcName
          ], 0);
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE,
          [
            this.defaultCifDetailsOptions.mobileNumberOptions.fcName,
            this.defaultCifDetailsOptions.mobileNumberOptions.fcName + 'countriesFcName',
            this.defaultCifDetailsOptions.mobileNumberOptions.fcName + 'numberFcName',
          ], 1);
      } else {
        this.isInstitutionType = false;
        this.defaultPersonalDetailsOptions.isInstitutionType = false;
        this.defaultEmployeeOptions.isInstitutionType = false;
        this.defaultCifDetailsOptions.isInstitutionType = false;
        this.defaultPersonalDetailsOptions.nationalityOptions.labelKey = 'nationality_key';
        this.defaultPersonalDetailsOptions.nationalityOptions.placeHolder = 'select_nationality_key';
        this.defaultCifDetailsOptions.mobileNumberOptions = {
          fcName: 'personalMobileNo',
          group: this.formGroup,
          labelKey: 'personal_tel_key'
        };
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_LABEL, ['cif_open_employment_details_panel'], 'employement_details_key');
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [
          this.firstNameOptions.fcName, this.middleNameOptions.fcName, this.lastNameOptions.fcName,
          this.genderOptions.fcName, this.customerNameValOptions.fcName,
          this.defaultPersonalDetailsOptions.psDobOptions.fcName, this.defaultPersonalDetailsOptions.maritalstatusOptions.fcName,
          this.birthCountriesOptions.fcName, this.defaultEmployeeOptions.employerNameOptions.fcName, this.defaultEmployeeOptions.occupationOptions.fcName
        ], 1);
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [
          this.longNameOptions.fcName, this.shortNameOptions.fcName, this.defaultEmployeeOptions.establishmentDateOptions.fcName
        ], 0);
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE,
          [
            this.defaultCifDetailsOptions.residentialTelOptions.fcName,
            this.defaultCifDetailsOptions.residentialTelOptions.fcName + 'countriesFcName',
            this.defaultCifDetailsOptions.residentialTelOptions.fcName + 'numberFcName',
            this.defaultCifDetailsOptions.mobileNumberOptions.fcName,
            this.defaultCifDetailsOptions.mobileNumberOptions.fcName + 'countriesFcName',
            this.defaultCifDetailsOptions.mobileNumberOptions.fcName + 'numberFcName',
            this.defaultCifDetailsOptions.faxOptions.fcName,
            this.defaultCifDetailsOptions.faxOptions.fcName + 'countriesFcName',
            this.defaultCifDetailsOptions.faxOptions.fcName + 'numberFcName',
            this.genderOptions.fcName,
            this.customerNameValOptions.fcName
          ], 1);
      }
    }
  }
}
