import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsComplexBenefBankDetailsComponentExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-beneficiary-bank-details/ps-complex-beneficiary-bank-details.component.interface';
import { PsComplexBeneficiaryDetailsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-beneficiary-details/ps-complex-beneficiary-details.component.interface';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsPsContainerPanel, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { OmniBasePage } from '../omni-base/omni-base.page';

//Author: GRadwan 02Feb2020 

@Component({
  selector: 'international-beneficiary',
  templateUrl: './international-beneficiary.page.html',
  styleUrls: ['./international-beneficiary.page.scss'],
})
export class InternationalBeneficiaryPage extends OmniBasePage implements OnInit {

  public formGroup: FormGroup = new FormGroup({});
  public internationalBeneficiaryVO = {};
  public stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'interna_stepper',
    isHorizontalStepper: true,
    numberOfSteps: 2,
    namesofSteps: ['international_benef_step1', 'international_benef_step2'],
    group: this.formGroup,
    submitOptions: {
      group: this.formGroup,
      submitServiceUrl: PsCommonSettings.serviceUrl.commonSubmitAction,
      postCallFunction: {
        func(response) {
          return new Promise<any>((resolve, reject) => {
            resolve(this.executionClass.updateInternationalBeneficiary(response));
          });
        },
        params: [this],
        executionClass: this
      },
    },
    requestObject: this.internationalBeneficiaryVO
  };
  public bankTransferOptions: IOptionsPsComplexBenefBankDetailsComponentExposed = {
    swiftCodeOptions: {
      fcName: 'swiftCode',
      labelKey: 'bic_swift_code_key',
      placeHolder: 'enter_swift_code_key',
      group: this.formGroup,
      iconOptions: {
        iconName: 'clipboard'
      }
    },

    countriesOptions: {
      labelKey: 'country_key',
      placeHolder: 'select_country_key',
      fcName: 'country',
      group: this.formGroup,
      iconOptions: {
        iconName: 'clipboard'
      }
    },

    bankNameOptions: {
      fcName: 'bankName',
      labelKey: 'bank_name_key',
      placeHolder: 'enter_bank_name_key',
      group: this.formGroup,
      iconOptions: {
        iconName: 'clipboard'
      }
    },

    branchNameOptions: {
      fcName: 'branch',
      labelKey: 'branch_key',
      placeHolder: 'enter_branch_key',
      group: this.formGroup,
      iconOptions: {
        iconName: 'clipboard'
      }
    },

    regionOptions: {
      labelKey: 'region_key',
      placeHolder: 'select_region_key',
      fcName: 'region',
      selectedCountryCode: '',
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
  };

  public panelOptionsBenfBankDetails: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'beneficiary_bank_details_key',
    iconName: '',
    expanded: true
  };

  public beneficiaryDetailsOptions: PsComplexBeneficiaryDetailsExposed = {
    beneficiaryType: 'international',
    benefNameOptions: {
      fcName: 'benefName',
      labelKey: 'beneficiary_name_key',
      placeHolder: 'beneficiary_name_key',
      group: this.formGroup
    },
    benefPhoneOptions: {
      fcName: 'benefPhone',
      labelKey: 'mobile_no_key',
      placeHolder: 'mobile_no_key',
      group: this.formGroup
    },
    benefAccountNumberOptions: {
      fcName: 'accountNumber',
      labelKey: 'account_no_iban_key',
      placeHolder: 'enter_account_no_iban_key',
      group: this.formGroup
    },
    benefReasonOptions: {
      fcName: 'purpose',
      labelKey: 'purpose_key',
      placeHolder: 'purpose_key',
      group: this.formGroup
    },
    currencyOptions: {
      fcName: 'currency',
      group: this.formGroup,
      labelKey: 'currency_key',
      placeHolder: 'select_currency_key'
    },
  };

  public panelOptionsbenefDetails: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'beneficiary_details_key',
    iconName: '',
    expanded: true
  };



  constructor(
    private navService: PsNavigatorService,
    public commonProvider: PsCommonService) {
    super();
  }

  ngOnInit() {
    super.init();
    PsCommonSettings.oper_ID = CommonBussinessConstant.EXTERNAL_BENEFICIARY_OPER_ID;
    this.baseFormGroup = this.formGroup;
    this.internationalBeneficiaryVO = this.navService.getAllParams() ? this.navService.getAllParams() : {};
    this.commonProv.copyObject(this.stepperOptions.requestObject, this.internationalBeneficiaryVO, true, false);
  }

  private updateInternationalBeneficiary(response) {
    if (response.outputCode == 0 || response.outputType === 'S') {
      this.navService.pop();
    } else {
      CommonUtils.presentFailureAlert(response.outputNotification, { autoHide: true });
    }
  }
}
