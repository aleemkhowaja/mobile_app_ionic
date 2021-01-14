import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsPsContainerPanel, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsComplexBeneficiaryDetailsExposed } from '../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-beneficiary-details/ps-complex-beneficiary-details.component.interface';
import { OmniBasePage } from '../omni-base/omni-base.page';

@Component({
  selector: 'internal-beneficiary',
  templateUrl: './internal-beneficiary.page.html',
  styleUrls: ['./internal-beneficiary.page.scss'],
})
export class InternalBeneficiaryPage extends OmniBasePage implements OnInit {

  public formGroup: FormGroup = new FormGroup({});
  public internalBeneficiaryVO = {};
  public stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'int_benef_stepper',
    isHorizontalStepper: true,
    numberOfSteps: 1,
    namesofSteps: ['internal_benef_step1'],
    group: this.formGroup,
    submitOptions: {
      group: this.formGroup,
      submitServiceUrl: PsCommonSettings.serviceUrl.commonSubmitAction,
      postCallFunction: {
        func(response) {
          return new Promise<any>((resolve, reject) => {
            resolve(this.executionClass.updateInternalBeneficiary(response));
          });
        },
        params: [this],
        executionClass: this
      },
    },
    requestObject: this.internalBeneficiaryVO
  };

  public beneficiaryDetailsOptions: PsComplexBeneficiaryDetailsExposed = {
    beneficiaryType: 'internal',
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


  public panelOptionsBenf: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'beneficiary_details_key',
    iconName: '',
    expanded: true
  };

  constructor(
    public commonProvider: PsCommonService,
    private navService: PsNavigatorService
  ) {
    super();
  }

  ngOnInit() {
    super.init();
    PsCommonSettings.oper_ID = CommonBussinessConstant.INTERNAL_BENEFICIARY_OPER_ID;
    this.baseFormGroup = this.formGroup;
    this.internalBeneficiaryVO = this.navService.getAllParams() ? this.navService.getAllParams() : {};
    this.commonProv.copyObject(this.stepperOptions.requestObject, this.internalBeneficiaryVO, true, false);
  }

  private updateInternalBeneficiary(response) {
    if (response.outputCode == 0 || response.outputType === 'S') {
      this.navService.pop();
    } else {
      CommonUtils.presentFailureAlert(response.outputNotification, { autoHide: true });
    }
  }
}
