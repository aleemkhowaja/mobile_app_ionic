import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PsAccountsListComponent } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component';
import { PsComplexDealDetailsComponent } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-deal-details/ps-complex-deal-details.component';
import { PsComplexExchangeComponent } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-exchange/ps-complex-exchange.component';
import { IOptionsPsComplexExchnageExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-exchange/ps-complex-exchange.component.interfaces';
import { IOptionsPsLookupOwnAccountsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.interfaces';
import { IOptionsPsLookupOwnDealsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-deals/ps-lookup-own-deals.component.interfaces';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsContainerPanel, IOptionsPsTemplateView, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { OmniBasePage } from '../omni-base/omni-base.page';


@Component({
  selector: 'financing-payment',
  templateUrl: './financing-payment.page.html',
  styleUrls: ['./financing-payment.page.scss'],
})
export class FinancingPaymentPage extends OmniBasePage implements OnInit {

  public formGroup = new FormGroup({});
  public FinancingPaymentVO = {};
  public exchangeRate = '0.00';
  @ViewChild(PsComplexExchangeComponent) exchangeChild: PsComplexExchangeComponent;


  public stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'finan_pay_stepper',
    isHorizontalStepper: true,
    numberOfSteps: 1,
    namesofSteps: ['financing-payment_step1'],
    group: this.formGroup,
    submitOptions: {
      group: this.formGroup,
      submitServiceUrl: PsCommonSettings.serviceUrl.commonSubmitAction
    },
    requestObject: this.FinancingPaymentVO
  };

  public panelOptionsPayment: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'payment_details_key',
    iconName: '',
    expanded: true,
  };

  constructor(
    public logger: LoggerService,
  ) {
    super();
  }

  public templateViewOptions: IOptionsPsTemplateView = {
    group: this.formGroup
  };


  public ownAccountListOptions: IOptionsPsLookupOwnAccountsExposed = {
    labelKey: 'settlement_account_key',
    placeHolder: 'select_from_accounts_key',
    component: PsAccountsListComponent,
    group: this.formGroup,
    accountAllowedCurrencies: [],
    accountAllowedTypes: [],
    glTypes: 'G',
    fcName: 'settleAccount',
    accountType: 'G',
    fromTo: 'from',
    requestObject: this.FinancingPaymentVO,
    currency: '',
  };


  public ownDealsListOptions: IOptionsPsLookupOwnDealsExposed = {
    labelKey: 'financing_key',
    placeHolder: 'select_from_deals_key',
    fcName: 'financing_account',
    group: this.formGroup,
    component: PsComplexDealDetailsComponent,
    requestObject: this.FinancingPaymentVO
  }

  public complexExchangeOptions: IOptionsPsComplexExchnageExposed = {
    editableMode: false,
    showToCurrencyOptions: true,
    fromAmountOptions: {
      currency: '',
      currenciesOptions: {
        placeHolder: 'currency_key',
        labelKey: 'financing_currency_key',
        fcName: 'fromCurrency',
        group: this.formGroup
      },
      amountOptions: {
        labelKey: 'financing_amount_key',
        placeHolder: 'enter_amount_key',
        fcName: 'transactionAmount',
        group: this.formGroup,
        decimalPoints: 2
      }
    },
    toAmountOptions: {
      currency: '',
      currenciesOptions: {
        placeHolder: 'currency_key',
        labelKey: 'settlement_currency_key',
        fcName: 'currency',
        group: this.formGroup
      },
      amountOptions: {
        labelKey: 'settlement_amount_key',
        placeHolder: 'enter_amount_key',
        fcName: 'toAmount',
        group: this.formGroup,
        decimalPoints: 2
      }
    },
    group: this.formGroup
  };


  async ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
    setTimeout(() => {
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.complexExchangeOptions.fromAmountOptions.currenciesOptions.fcName], 0);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.complexExchangeOptions.fromAmountOptions.currenciesOptions.fcName], 1);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.complexExchangeOptions.toAmountOptions.currenciesOptions.fcName], 0);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.complexExchangeOptions.toAmountOptions.currenciesOptions.fcName], 1);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.complexExchangeOptions.toAmountOptions.amountOptions.fcName], 0);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.complexExchangeOptions.toAmountOptions.amountOptions.fcName], 1);

      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.complexExchangeOptions.fromAmountOptions.amountOptions.fcName], 0);
      // this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.complexExchangeOptions.fromAmountOptions.amountOptions.fcName], 1);
    }, 100);

  }


  public onSettlAccountChange(event) {
    this.complexExchangeOptions.toAmountOptions.currency = event.currencyBriefNameEnglish;
    this.complexExchangeOptions.toAmountOptions.currencyCode = event.currency;

    setTimeout(() => {
      this.stepperOptions.requestObject[this.complexExchangeOptions.toAmountOptions.currenciesOptions.fcName] = event.currency;
    }, 1);
    this.showExchangeRate();
  }

  public onDealChange(event) {
    let currencyCode: any = event.currencyCode;
    let currency: any = event.currency;

    this.complexExchangeOptions.fromAmountOptions.currency = currency;
    this.complexExchangeOptions.fromAmountOptions.currencyCode = currencyCode;

    this.formGroup.controls[this.complexExchangeOptions.fromAmountOptions.amountOptions.fcName].setValue(event.nextPaymentVal);
    setTimeout(() => {
      this.stepperOptions.requestObject[this.complexExchangeOptions.fromAmountOptions.currenciesOptions.fcName] = currencyCode;//temp currencyCode
    }, 1);
    this.showExchangeRate();
  }

  public currencyChange(event) {

  }

  public amountChange(event) {

  }

  private showExchangeRate() {
    this.exchangeChild.showToCurrency();
  }
}
