import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PsAccountsListComponent } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component';
import { PsComplexExchangeComponent } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-exchange/ps-complex-exchange.component';
import { IOptionsPsComplexExchnageExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-exchange/ps-complex-exchange.component.interfaces';
import { IOptionsPSComplexRecurringSchedulerExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-recurring-scheduler/ps-complex-recurring-scheduler.component.interfaces';
import { PsOptionCardComponent } from 'src/app/commonBussinessSRC/psComponents/ps-container-lookup-option/ps-option-card/ps-option-card.component';
import { IOptionsPsLookupCreditCardsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-credit-cards/ps-lookup-credit-cards.component.interfaces';
import { IOptionsPsLookupOwnAccountsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.interfaces';
import { CreditCardSettlementVO } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniCommonService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-common.service';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { EventEmitterService } from 'src/app/commonSRC/psServices/event-emitter/event-emitter.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsContainerPanel, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { OmniBasePage } from '../omni-base/omni-base.page';


@Component({
  selector: 'credit-card-settlement',
  templateUrl: './credit-card-settlement.page.html',
  styleUrls: ['./credit-card-settlement.page.scss'],
})
export class CreditCardSettlementPage extends OmniBasePage implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  creditCardSettlementVO: CreditCardSettlementVO = {};
  defaultVO: any = {};
  public ownAccountVO = {};
  // public exchangeRate = '0.00';
  // public amountInToAccountAmount = '0.00';
  @ViewChild(PsComplexExchangeComponent) exchangeChild: PsComplexExchangeComponent;
  @ViewChild('toAccountRef') toAccountRef;
  @ViewChild('fromAccountRef') fromAccountRef;

  stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'credit_card_settlement',
    isHorizontalStepper: true,
    numberOfSteps: 1,
    namesofSteps: [
      'credit_card_settlement_step1',
    ],
    group: this.formGroup,
    submitOptions: {
      extraParams: {},
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.creditCardSettlementRequestEndPoint,
      group: this.formGroup,
    },
    requestObject: this.creditCardSettlementVO,
  };
  panelOptions1Step1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'credit_card_settlement_key',
    iconName: 'document',
    expanded: true,
  };
  creditCardsLookupOptiops: IOptionsPsLookupCreditCardsExposed = {
    labelKey: 'credit_card_key',
    placeHolder: 'select_credit_card_key',
    group: this.formGroup,
    fcName: 'creditCard',
    requestObject: this.creditCardSettlementVO,
    component: PsOptionCardComponent
  };

  public accountListOptions: IOptionsPsLookupOwnAccountsExposed = {
    labelKey: 'settlement_account_key',
    placeHolder: 'settlement_account_key',
    component: PsAccountsListComponent,
    group: this.formGroup,
    accountAllowedCurrencies: [],
    accountAllowedTypes: [],
    glTypes: 'G',
    fcName: 'toAccount',
    accountType: 'G',
    fromTo: 'to',
    requestObject: this.creditCardSettlementVO,
  };

  public complexExchangeOptions: IOptionsPsComplexExchnageExposed = {
    editableMode: false,
    // showToCurrencyOptions: true,
    fromAmountOptions: {
      currency: '',
      currenciesOptions: {
        placeHolder: 'currency_key',
        labelKey: 'currency_key',
        fcName: 'fromCurrency',
        group: this.formGroup
      },
      amountOptions: {
        labelKey: 'amount_key',
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
        labelKey: 'currency_key',
        fcName: 'currency',
        group: this.formGroup
      },
      amountOptions: {
        labelKey: 'exchange_amount_key',
        placeHolder: 'enter_amount_key',
        fcName: 'toAmount',
        group: this.formGroup,
        decimalPoints: 2
      }
    },
    requestObject: this.creditCardSettlementVO,
    group: this.formGroup
  };

  public toAccountComponent: any = {};
  public schedulerOptions: IOptionsPSComplexRecurringSchedulerExposed = {
    fcName: 'psScheduler',
    group: this.formGroup
  };

  constructor(private omniPull: OmniPullService, public logger: LoggerService,
    public nav: PsNavigatorService, public loggerP: LoggerService, public commonService: PsCommonService, public omniCommon: OmniCommonService, public eventEmitterService: EventEmitterService) {
    super();

  }

  ngOnInit() {
    super.init();
    this.commonProv.setFormData(this.formGroup, this.creditCardSettlementVO);
    this.baseFormGroup = this.formGroup;
  }
  public toAccountChange(toAccount) {
    if (this.stepperOptions.requestObject && !this.stepperOptions.requestObject[this.accountListOptions.fcName] && toAccount && toAccount.additionalRef) {
      this.stepperOptions.requestObject[this.accountListOptions.fcName] = toAccount.additionalRef;
    }

    this.complexExchangeOptions.toAmountOptions.currency = toAccount.currencyCode;
    this.complexExchangeOptions.toAmountOptions.currencyCode = toAccount.currency;
    setTimeout(() => {
      this.stepperOptions.requestObject[this.complexExchangeOptions.toAmountOptions.currenciesOptions.fcName] = toAccount.currency;
    }, 1);
    this.showExchangeRate();

  }

  public creditCardListChange(credCardAccount) {
    this.complexExchangeOptions.fromAmountOptions.currency = credCardAccount.currencyCode;
    this.complexExchangeOptions.fromAmountOptions.currencyCode = credCardAccount.currency;
    setTimeout(() => {
      this.stepperOptions.requestObject[this.complexExchangeOptions.fromAmountOptions.currenciesOptions.fcName] = credCardAccount.currency;
    }, 1);
    // this.showExchangeRate();
    this.toAccountChange(credCardAccount);
  }

  /** to show exchange rate if from and to currencies are different */
  private showExchangeRate() {
    this.exchangeChild.showToCurrency();
  }




}
