import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PsComplexCifDetailsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-cif-details/ps-complex-cif-details.component.interface';
import { PsComplexEmploymentDetailsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-employment-details/ps-complex-employment-details.component.interface';
import { PsComplexPersonalDetailsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-personal-details/ps-complex-personal-details.component.interfaces';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { ILoginResponse } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsPsContainerPanel, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { OmniBasePage } from '../omni-base/omni-base.page';

@Component({
  selector: 'personal-details',
  templateUrl: './personal-details.page.html',
  styleUrls: ['./personal-details.page.scss'],
})
export class PersonalDetailsPage extends OmniBasePage implements OnInit {

  formGroup: FormGroup = new FormGroup({});
  public personalDetailsVO: any = {};
  panelPersonalDetailsOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'personal_details_key',
    expanded: true
  };
  panelCifAddressOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'address_details_key',
    expanded: false
  };
  panelEmployementDetailsOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'employement_details_key',
    expanded: false
  };
  defaultPersonalDetailsOptions: PsComplexPersonalDetailsExposed = {
    customerNameOptions: {
      group: this.formGroup,
      fcName: 'longName',
      labelKey: 'customer_name_key',
      placeHolder: 'enter_customer_name_key',
      iconOptions: {
        iconName: 'clipboard'
      }
    },
    psDobOptions: {
      group: this.formGroup,
      fcName: 'strBirthDate',
      labelKey: 'date_of_birth_key',
    },
    nationalityOptions: {
      fcName: 'nationality',
      group: this.formGroup,
      labelKey: 'nationality_key',
      placeHolder: 'enter_nationality_key',
      iconOptions: {
        iconName: 'clipboard'
      }
    },
    maritalstatusOptions: {
      labelKey: 'marital_status_key',
      // placeHolder: 'select_maritial_status_key',
      fcName: 'martialStatus',
      group: this.formGroup,
      iconOptions: {
        iconName: 'clipboard'
      }
    }
  };
  defaultCifDetailsOptions: PsComplexCifDetailsExposed = {
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
        fcName: 'buildingOrHouse',
        group: this.formGroup
      },
      postalCodesOptions: {
        labelKey: 'postal_code',
        placeHolder: 'select_postal_code_key',
        fcName: 'postalCode',
        group: this.formGroup,
        iconOptions: {
          iconName: 'clipboard'
        }
      },
      streetOptions: {
        labelKey: 'street_key',
        placeHolder: 'enter_street_key',
        fcName: 'streetDetails',
        group: this.formGroup
      },
      countriesOptions: {
        labelKey: 'country_key',
        placeHolder: 'select_country_key',
        fcName: 'addressCountryCode',
        group: this.formGroup,
        iconOptions: {
          iconName: 'clipboard'
        }
      },
      regionOptions: {
        labelKey: 'region_key',
        placeHolder: 'select_region_key',
        fcName: 'addressRegionCode',
        selectedCountryCode: '',
        group: this.formGroup,
        iconOptions: {
          iconName: 'clipboard'
        }
      },
      cityOptions: {
        labelKey: 'city_key',
        placeHolder: 'select_city_key',
        fcName: 'addresscityCode',
        group: this.formGroup,

        iconOptions: {
          iconName: 'clipboard'
        }
      },
      // countriesOptions: {
      //   labelKey: 'country_key',
      //   placeHolder: 'select_country_key',
      //   fcName: 'addressCountryCode',
      //   group: this.formGroup,
      // },
      // regionOptions: {
      //   labelKey: 'region_key',
      //   placeHolder: 'select_region_key',
      //   fcName: 'addressRegionCode',
      //   group: this.formGroup
      // },
      // cityOptions: {
      //   labelKey: 'city_key',
      //   placeHolder: 'select_city_key',
      //   fcName: 'addresscityCode',
      //   group: this.formGroup,
      // },
      poBoxInputOptions: {
        group: this.formGroup,
        fcName: 'poBox',
        labelKey: 'pobox_key',
        placeHolder: 'enter_pobox_key',
        iconOptions: {
          iconName: 'clipboard'
        }
      }
    },
    mobileNumberOptions: {
      fcName: 'userMobileNumber',
      group: this.formGroup,
      labelKey: 'mobile_no_key'
    },
    residentialTelOptions: {
      fcName: 'homeTel',
      group: this.formGroup,
      labelKey: 'residential_tel_key'
    },
    telOptions: {
      fcName: 'telNumber',
      group: this.formGroup,
      labelKey: 'telephone_key'
    },
    faxOptions: {
      fcName: 'fax',
      group: this.formGroup,
      labelKey: 'fax_key'
    },
    emailOptions: {
      labelKey: 'email_key',
      placeHolder: 'enter_your_email_key',
      fcName: 'coreEmail',
      group: this.formGroup,
    }
  };
  defaultEmployeeOptions: PsComplexEmploymentDetailsExposed = {
    employerNameOptions: {
      group: this.formGroup,
      fcName: 'institutionName',
      labelKey: 'company_name_key',
      placeHolder: 'enter_company_name_key',
      iconOptions: {
        iconName: 'clipboard'
      }
    },
    occupationOptions: {
      group: this.formGroup,
      fcName: 'occupationCode',
      labelKey: 'occupation_key',
      placeHolder: 'enter_occupation_key',
      iconOptions: {
        iconName: 'clipboard'
      }
    },
    dateOfJoiningDivisionOptions: {
      group: this.formGroup,
      fcName: 'strDateOfJoining',
      labelKey: 'date_of_joining_key',
      placeHolder: '',
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
        fcName: 'occupationBuilding',
        group: this.formGroup
      },
      streetOptions: {
        labelKey: 'street_key',
        placeHolder: 'enter_street_key',
        fcName: 'employerStreet',
        group: this.formGroup
      },
      countriesOptions: {
        labelKey: 'country_key',
        placeHolder: 'select_country_key',
        fcName: 'countryCode',
        group: this.formGroup,
      },
      regionOptions: {
        labelKey: 'region_key',
        placeHolder: 'select_region_key',
        fcName: 'regionCode',
        group: this.formGroup
      },
      cityOptions: {
        labelKey: 'city_key',
        placeHolder: 'select_city_key',
        fcName: 'cityCode',
        group: this.formGroup,
      },
      poBoxInputOptions: {
        group: this.formGroup,
        fcName: 'employerpoBox',
        labelKey: 'pobox_key',
        placeHolder: 'enter_pobox_key',
        iconOptions: {
          iconName: 'clipboard'
        }
      }
    },
    officeTelPhoneNumberOptions: {
      fcName: 'employerOfficeTel',
      group: this.formGroup,
      labelKey: 'office_tel_key',
    },
    handPhoneNumberOptions: {
      fcName: 'employerMobileNumber',
      group: this.formGroup,
      labelKey: 'hand_phone_number_key',
    },
    faxOptions: {
      fcName: 'employerFax',
      group: this.formGroup,
      labelKey: 'fax_key',
    }
  };
  userInformation: ILoginResponse;
  cifDetailsVO = {};
  employeeDetailsVO = {};
  stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'personal_details',
    isHorizontalStepper: true,
    numberOfSteps: 1,
    namesofSteps: [
      'personal_details_step1',
    ],
    group: this.formGroup,
    submitOptions: {
      extraParams: {
        name: 'personalInfo'
      },
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.updateProfileSettingsEndPoint,
      group: this.formGroup,
    },
    requestObject: this.personalDetailsVO,
  };
  cifInfo: any;
  constructor(public commonService: PsCommonService, private navService: PsNavigatorService, public logger: LoggerService, private omniPull: OmniPullService) {
    super();
  }

  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
    PsCommonSettings.oper_ID = CommonBussinessConstant.MY_PROFILE_OPER;
    this.userInformation = this.commonService.session.getValueOf(ConstantCommon.USERINFO);
    this.commonService.logger.log('userinfo:', this.userInformation);
    if (CommonUtils.isEmptyObject(this.navService.getAllParams())) {
      this.personalDetailsVO = this.userInformation.customerInfoCO;
    } else {
      this.personalDetailsVO = this.navService.getAllParams() ? this.navService.getAllParams() : {};
    }
    this.commonProv.copyObject(this.stepperOptions.requestObject, this.personalDetailsVO, true, false);
    delete this.stepperOptions.requestObject.cifType;
  }

  ionViewDidEnter() {
    super.ionViewDidEnter();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.defaultPersonalDetailsOptions.customerNameOptions.fcName, this.defaultPersonalDetailsOptions.psDobOptions.fcName], CommonBussinessConstant.VISIBLE_FIELD);
  }

}
