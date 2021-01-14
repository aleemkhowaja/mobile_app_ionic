import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PsAccountsListComponent } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component';
import { IOptionsPsInputVarcharExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsDropdownCurrenciesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-currencies/ps-dropdown-currencies.component.interfaces';
import { IOptionsPsContainerPanel, IOptionsPsInputAmount, IOptionsPsLabel, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';

import { OmniBasePage } from '../omni-base/omni-base.page';
import { IOptionsPsLookupOwnAccountsExposed } from './../../commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.interfaces';

@Component({
  selector: 'demand-draft',
  templateUrl: './demand-draft.page.html',
  styleUrls: ['./demand-draft.page.scss'],
})
export class DemandDraftPage extends OmniBasePage implements OnInit {
  public demandDraftVO = {};
  formGroup: FormGroup = new FormGroup({});
  stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'dem_draft_stepper',
    isHorizontalStepper: true,
    numberOfSteps: 1,
    namesofSteps: ['demand_draft_step1'],
    group: this.formGroup,
    requestObject: this.demandDraftVO
  };
  currencyOptions: IOptionsPsDropdownCurrenciesExposed = {
    labelKey: 'transfer_currency_key',
    placeHolder: 'transfer currency',
    group: this.formGroup,
    fcName: 'transferCurrency'
  };
  inputAmountOptions: IOptionsPsInputAmount = {
    labelKey: 'Amount_key',
    placeHolder: 'enter_your_amount_key',
    fcName: 'inputAmount',
    group: this.formGroup,
    type: 'amount',
    decimalPoints: 3
  };
  chargesOptions: IOptionsPsInputVarcharExposed = {
    labelKey: 'charges_key',
    placeHolder: 'charges_key',
    group: this.formGroup,
    fcName: 'charges'
  };
  ExchangeRateOptions: IOptionsPsInputVarcharExposed = {
    labelKey: 'beneficiary_branch_key',
    placeHolder: 'beneficiary_branch_key',
    group: this.formGroup,
    fcName: 'beneficiaryBranch'
  };
  accountListOptions: IOptionsPsLookupOwnAccountsExposed = {
    labelKey: 'account_no_key',
    placeHolder: 'select_account_no_key',
    component: PsAccountsListComponent,
    accountNumber: '25252626355',
    currency: 'USD',
    group: this.formGroup,
    accountAllowedCurrencies: [],
    accountAllowedTypes: [],
    glTypes: 'G',
    fcName: 'savingAccNo',
    fromTo: 'from',
    requestObject: this.demandDraftVO
  };
  panelOptions1Step1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'Demand_draft_details_key',
    iconName: 'document',
    expanded: true
  };
  effectiveDateLabelOptions: IOptionsPsLabel = { labelKey: 'effective_date_key' };
  effectiveDateLabelValueOptions: IOptionsPsLabel = {};
  purposeOptions: IOptionsPsInputVarcharExposed = {
    labelKey: 'purpose_key',
    placeHolder: 'purpose_key',
    group: this.formGroup,
    fcName: 'purposeid'
  };
  constructor() {
    super();
  }

  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
  }

}
