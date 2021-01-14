import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PsAccountsListComponent } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component';
import { IOptionsPsInputVarcharExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsLookupOwnAccountsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.interfaces';
import { IOptionsPsDropDownCountryExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-country/ps-dropdown-country.component.interfaces';
import { IOptionsPsDropdownCurrenciesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-currencies/ps-dropdown-currencies.component.interfaces';
import { IOptionsPsContainerPanel, IOptionsPsInputAmount, IOptionsPsLabel, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';

import { OmniBasePage } from '../omni-base/omni-base.page';

@Component({
  selector: 'banker-cheque',
  templateUrl: './banker-cheque.page.html',
  styleUrls: ['./banker-cheque.page.scss'],
})
export class BankerChequePage extends OmniBasePage implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  public bankerCheque = {};
  stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'bank_cheq_stepper',
    isHorizontalStepper: true,
    numberOfSteps: 2,
    namesofSteps: ['bank_cheq_step1', 'bank_cheq_step2', 'bank_cheq_step3'],
    group: this.formGroup,
    requestObject: this.bankerCheque
    // submitServiceUrl: PsCommonSettings.serviceUrl.checkbook-request,
  };
  currencyOptions: IOptionsPsDropdownCurrenciesExposed = {
    labelKey: 'currency_key',
    placeHolder: 'currency_key',
    group: this.formGroup,
    fcName: 'currency'
  };
  inputAmountOptions: IOptionsPsInputAmount = {
    labelKey: 'Amount_key',
    placeHolder: 'enter_your_amount_key',
    fcName: 'inputAmount',
    group: this.formGroup,
    type: 'amount',
    decimalPoints: 3
  };
  beneficiaryNameOptions: IOptionsPsInputVarcharExposed = {
    labelKey: 'beneficiary_name_key',
    placeHolder: 'beneficiary_name_key',
    group: this.formGroup,
    fcName: 'beneficiaryName'
  };
  beneficiaryBankOptions: IOptionsPsInputVarcharExposed = {
    labelKey: 'beneficiary_bank_key',
    placeHolder: 'beneficiary_bank_key',
    group: this.formGroup,
    fcName: 'beneficiaryBank'
  };
  beneficiaryICNumberOptions: IOptionsPsInputVarcharExposed = {
    labelKey: 'beneficiary_ic_number_key',
    placeHolder: 'beneficiary_ic_number_key',
    group: this.formGroup,
    fcName: 'beneficiaryICNumber'
  };
  beneficiaryBranchOptions: IOptionsPsInputVarcharExposed = {
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
    requestObject: this.bankerCheque
  };
  panelOptions1Step1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'Bankers_cheque_details_key',
    iconName: 'document',
    expanded: true
  };
  panelOptions1Step2: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'Beneficiary_details_key',
    iconName: 'document',
    expanded: true
  };
  panelOptions1Step3: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'address_key',
    iconName: 'document',
    expanded: true
  };
  effectiveDateLabelOptions: IOptionsPsLabel = { labelKey: 'effective_date_key' };
  effectiveDateLabelValueOptions: IOptionsPsLabel = { labelKey: '12/12/2019' };
  submittedDateLabelOptions: IOptionsPsLabel = { labelKey: 'submitted_date_key' };
  submittedDateLabelValueOptions: IOptionsPsLabel = { labelKey: '12/12/2019' };
  purposeOptions: IOptionsPsInputVarcharExposed = {
    labelKey: 'purpose_key',
    placeHolder: 'purpose_key',
    group: this.formGroup,
    fcName: 'purposeid'
  };
  beneficiaryAcNumberOptions: IOptionsPsInputVarcharExposed = {
    labelKey: 'beneficiary_account_number_key',
    placeHolder: 'beneficiary_account_number_key',
    group: this.formGroup,
    fcName: 'beneficiaryAcNumber'
  };
  addressline1Options: IOptionsPsInputVarcharExposed = {
    labelKey: 'addressline1_key',
    placeHolder: 'addressline1_key',
    group: this.formGroup,
    fcName: 'addressline1'
  };
  addressline2Options: IOptionsPsInputVarcharExposed = {
    labelKey: 'addressline2_key',
    placeHolder: 'addressline2_key',
    group: this.formGroup,
    fcName: 'addressline2'
  };
  addressline3Options: IOptionsPsInputVarcharExposed = {
    labelKey: 'addressline3_key',
    placeHolder: 'addressline3_key',
    group: this.formGroup,
    fcName: 'addressline3'
  };
  countriesOptions: IOptionsPsDropDownCountryExposed = {
    labelKey: 'country_key',
    placeHolder: 'select_country_key',
    fcName: 'country',
    group: this.formGroup
  };
  constructor() { super(); }

  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
  }

}
