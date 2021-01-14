import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsInputVarcharExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsPsContainerPanel, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsComplexBeneficiaryDetailsExposed } from '../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-beneficiary-details/ps-complex-beneficiary-details.component.interface';
import { OmniBasePage } from '../omni-base/omni-base.page';
import { IOptionsPsBanksExposed } from './../../commonBussinessSRC/psComponents/ps-banks/ps-banks.component.interfaces';

@Component({
  selector: 'local-beneficiary',
  templateUrl: './local-beneficiary.page.html',
  styleUrls: ['./local-beneficiary.page.scss'],
})
export class LocalBeneficiaryPage extends OmniBasePage implements OnInit {

  public formGroup: FormGroup = new FormGroup({});
  public localBeneficiaryVO = {};
  public stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'loc_benef_stepper',
    isHorizontalStepper: true,
    numberOfSteps: 1,
    namesofSteps: ['local_benef_step1'],
    group: this.formGroup,
    submitOptions: {
      group: this.formGroup,
      submitServiceUrl: PsCommonSettings.serviceUrl.commonSubmitAction,
      postCallFunction: {
        func(response) {
          return new Promise<any>((resolve, reject) => {
            resolve(this.executionClass.updateLocalBeneficiary(response));
          });
        },
        params: [this],
        executionClass: this
      },
    },
    requestObject: this.localBeneficiaryVO
  };
  public beneficiaryDetailsOptions: PsComplexBeneficiaryDetailsExposed = {
    beneficiaryType: 'local',
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

  public banksOptions: IOptionsPsBanksExposed = {
    categoryLabelKey: 'bank_key',
    categoryPlaceholderKey: 'select_bank_key',
    categoryFcName: 'bank',
    subCategoryLabelKey: 'branch_key',
    subCategoryPlaceholderKey: 'select_branch_key',
    subCategoryFcName: 'branch',
    group: this.formGroup,
    requestObject: this.localBeneficiaryVO
  };

  branchOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'benefBranchTxt',
    labelKey: 'branch_key',
    placeHolder: 'enter_branch_key',
  };

  constructor(
    private navService: PsNavigatorService,
    public commonProvider: PsCommonService) {
    super();
  }

  ngOnInit() {
    super.init();
    PsCommonSettings.oper_ID = CommonBussinessConstant.LOCAL_BENEFICIARY_OPER_ID;
    this.baseFormGroup = this.formGroup;
    this.localBeneficiaryVO = this.navService.getAllParams() ? this.navService.getAllParams() : {};
    this.commonProv.copyObject(this.stepperOptions.requestObject, this.localBeneficiaryVO, true, false);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.banksOptions.subCategoryFcName], 0);
  }

  private updateLocalBeneficiary(response) {
    if (response.outputCode === 0 || response.outputType === 'S') {
      this.navService.pop();
    } else {
      CommonUtils.presentFailureAlert(response.outputNotification, { autoHide: true });
    }
  }
}
