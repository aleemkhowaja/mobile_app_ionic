import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PsAccountsListComponent } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component';
import { IOptionsPSComplexDateFilter } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-date-filter/ps-complex-date-filter.component.interfaces';
import { PsComplexExchangeComponent } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-exchange/ps-complex-exchange.component';
import { IOptionsPsComplexExchnageExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-exchange/ps-complex-exchange.component.interfaces';
import { IOptionsPSComplexRecurringSchedulerExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-recurring-scheduler/ps-complex-recurring-scheduler.component.interfaces';
import { IOptionsPsDateDayMonthYearFutureExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-day-month-year/ps-date-day-month-year-future/ps-date-day-month-year-future.component.interfaces';
import { IOptionsPsLookupOwnAccountsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.interfaces';
import { IOptionsPsLovInstructionMethodExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-instruction-method/ps-lov-instruction-method.component.interfaces';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsContainerPanel, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { OmniBasePage } from '../omni-base/omni-base.page';


@Component({
  selector: 'app-sweeping-and-pooling',
  templateUrl: './sweeping-and-pooling.page.html',
  styleUrls: ['./sweeping-and-pooling.page.scss'],
})
export class SweepingAndPoolingPage extends OmniBasePage implements OnInit {
  public formGroup: FormGroup = new FormGroup({});
  public sweepingAndPoolingVO = {};
  public exchangeRate = '0.00';
  public amountInToAccountAmount = '0.00';
  @ViewChild(PsComplexExchangeComponent) exchangeChild: PsComplexExchangeComponent;
  @ViewChild('toAccountRef') toAccountRef;
  @ViewChild('fromAccountRef') fromAccountRef;

  stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'sweeping_and_pooling_key',
    isHorizontalStepper: true,
    numberOfSteps: 2,
    schedulerStepIndex: 1,
    namesofSteps: [
      'sweeping_and_pooling_step1_key',
      'periodicity_step2_key',
    ],
    group: this.formGroup,
    submitOptions: {
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.sweepingAndPoolingRequestEndPoint,
      group: this.formGroup,
    },
    requestObject: this.sweepingAndPoolingVO,
  };
  public panelSweepingOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'sweeping_and_pooling_main_details_key',
    expanded: true
  };
  public panelPeriodicityOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'periodicity_details_key',
    expanded: true
  };
  instructionMethodOptions: IOptionsPsLovInstructionMethodExposed = {
    group: this.formGroup,
    fcName: 'instructionMethod',
  };
  instructionTypeOptions: IOptionsPsLovInstructionMethodExposed = {
    group: this.formGroup,
    fcName: 'instructionType',
  };
  public targetAccountListOptions: IOptionsPsLookupOwnAccountsExposed = {
    labelKey: 'target_account_key',
    placeHolder: 'target_account_key',
    component: PsAccountsListComponent,
    group: this.formGroup,
    accountAllowedCurrencies: [],
    accountAllowedTypes: [],
    glTypes: 'G',
    fcName: 'fromAccount',
    accountType: 'G',
    fromTo: 'to',
    requestObject: this.sweepingAndPoolingVO,
  };
  public toAccountListOptions: IOptionsPsLookupOwnAccountsExposed = {
    component: PsAccountsListComponent,
    group: this.formGroup,
    accountAllowedCurrencies: [],
    accountAllowedTypes: [],
    glTypes: 'G',
    fcName: 'toAccount',
    accountType: 'G',
    fromTo: 'to',
    requestObject: this.sweepingAndPoolingVO,
  };

  public schedulerOptions: IOptionsPSComplexRecurringSchedulerExposed = {
    fcName: 'psScheduler',
    group: this.formGroup,
    inputCountOptions: {
      fcName: 'noOfPayments',
    },
    inputDefaultOptions: {
      fcName: 'noOfPayment',
    },
  };
  public complexExchangeOptions: IOptionsPsComplexExchnageExposed = {
    editableMode: false,
    showToCurrencyOptions: true,
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
    requestObject: this.sweepingAndPoolingVO,
    group: this.formGroup
  };
  instructionType: any;
  showIsMinimumOrMax = false;
  hideDates = true;
  startDateOptions: IOptionsPsDateDayMonthYearFutureExposed = {
    fcName: 'startDate',
    group: this.formGroup,
    labelKey: 'start_date_key',
    placeHolder: 'start_date_key'
  };

  endDateOptions: IOptionsPsDateDayMonthYearFutureExposed = {
    fcName: 'endDate',
    group: this.formGroup,
    labelKey: 'end_date_key',
    placeHolder: 'end_date_key'
  };
  defaultFormat: any = 'MM/DD/YYYY';
  filterDate: IOptionsPSComplexDateFilter = {
    fromDate: {
      group: this.formGroup,
      fcName: 'filterFromDate',
      displayFormat: this.defaultFormat,
      placeHolder: 'from_date_key',
    },
    toDate: {
      group: this.formGroup,
      fcName: 'filterToDate',
      displayFormat: this.defaultFormat,
      placeHolder: 'to_date_key',
    }
  };

  public toAccountComponent: any = {};
  showDate = false;
  showtoAccount = false;

  constructor(public commonService: PsCommonService, public logger: LoggerService, private navService: PsNavigatorService) {
    super();
  }

  ngOnInit() {
    super.init();
    this.commonProv.setFormData(this.formGroup, this.sweepingAndPoolingVO);
    setTimeout(() => {
      // tslint:disable-next-line: no-string-literal
      const todayDate = new Date()['clearTime']();
      this.formGroup.controls[this.startDateOptions.fcName].setValue(todayDate);
      this.sweepingAndPoolingVO[this.schedulerOptions.fcName] = {
        startingDate: todayDate,
        endingDate: 'unlimited',
        unlimitedNumberOfPayments: true,
      };
      this.sweepingAndPoolingVO[this.startDateOptions.fcName] = todayDate;
      this.formGroup.controls[this.endDateOptions.fcName].setValue(null);
    }, 100);
    this.schedulerOptions.requestObject = this.sweepingAndPoolingVO;

  }

  ionViewDidEnter() {
    super.ionViewDidEnter();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.endDateOptions.fcName], 0);
  }


  public onFromAccountChange(fromAccount) {
    this.complexExchangeOptions.fromAmountOptions.currencyCode = fromAccount.currency;
    setTimeout(() => {
      this.stepperOptions.requestObject[this.complexExchangeOptions.fromAmountOptions.currenciesOptions.fcName] = fromAccount.currency;
    }, 1);

    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.complexExchangeOptions.toAmountOptions.currenciesOptions.fcName], 1);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.complexExchangeOptions.toAmountOptions.amountOptions.fcName], 1);
  }
  public onToAccountChange(toAccount) {

    this.complexExchangeOptions.toAmountOptions.currencyCode = toAccount.currency;
    setTimeout(() => {
      this.stepperOptions.requestObject[this.complexExchangeOptions.toAmountOptions.currenciesOptions.fcName] = toAccount.currency;
    }, 1);
    this.showExchangeRate();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.complexExchangeOptions.toAmountOptions.currenciesOptions.fcName], 1);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.complexExchangeOptions.toAmountOptions.amountOptions.fcName], 1);
  }
  onChangeSchedule(value) {

    let stateDay;
    if (value !== undefined) {
      if (value.priodicityBy === 'S' || value.priodicityBy === 'M') {
        stateDay = value.startDate.getDay() + 1;
        if (value.priodicityBy === 'S') {
          this.sweepingAndPoolingVO['submitType'] = '4';
        } else {
          stateDay = value.startDate.getDate();
          this.sweepingAndPoolingVO['submitType'] = '5';
        }
      }
      if (value.priodicityBy === 'W') {
        stateDay = value.startDate.getDay() + 1;
        this.sweepingAndPoolingVO['submitType'] = '5';
      }
    }
    if (value.unlimitedNumberOfPayments && value.priodicityBy !== 'S') {
      this.sweepingAndPoolingVO[this.schedulerOptions.fcName] = {
        startingDate: value.startDate,
        endingDate: 'unlimited',
        day: stateDay
      };
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.endDateOptions.fcName], 0);
      this.formGroup.controls[this.endDateOptions.fcName].setValue(null);
    } else {
      this.sweepingAndPoolingVO[this.schedulerOptions.fcName] = {
        startingDate: value.startDate,
        endingDate: value.endDate,
        day: stateDay
      };
      this.formGroup.controls[this.endDateOptions.fcName].setValue(value.endDate);
    }
    this.formGroup.controls[this.startDateOptions.fcName].setValue(value.startDate);

  }

  onInstructionChange(event) {
    if (event != null && event !== undefined) {
      if (event.itemValue === CommonBussinessConstant.INSTRUCTION_TYPE_MIN || event.itemValue === CommonBussinessConstant.INSTRUCTION_TYPE_AUTO) {
        if (event.itemValue === CommonBussinessConstant.INSTRUCTION_TYPE_MIN) {
          this.showIsMinimumOrMax = true;

        } else {
          this.showIsMinimumOrMax = false;
        }
        this.toAccountListOptions = {
          labelKey: 'covering_account_key',
          placeHolder: 'covering_account_key',
          component: PsAccountsListComponent,
          group: this.formGroup,
          accountAllowedCurrencies: [],
          accountAllowedTypes: [],
          glTypes: 'G',
          fcName: 'toAccount',
          accountType: 'G',
          fromTo: 'from',
          requestObject: this.sweepingAndPoolingVO,
        };

        this.complexExchangeOptions.fromAmountOptions.amountOptions.labelKey = 'minimum_balance_key';
        this.complexExchangeOptions.toAmountOptions.amountOptions.labelKey = 'minimum_balance_key';
        this.complexExchangeOptions.fromAmountOptions.amountOptions.placeHolder = 'enter_minimum_balance_key';
        this.complexExchangeOptions.toAmountOptions.amountOptions.placeHolder = 'enter_minimum_balance_key'
        // this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.toAccountListOptions.fcName], CommonBussinessConstant.VISIBLE_FIELD);
        this.showtoAccount = true;
      }
      if (event.itemValue === CommonBussinessConstant.INSTRUCTION_TYPE_MAX) {
        this.showIsMinimumOrMax = true;
        this.toAccountListOptions = {
          labelKey: 'receiving_account_key',
          placeHolder: 'receiving_account_key',
          component: PsAccountsListComponent,
          group: this.formGroup,
          accountAllowedCurrencies: [],
          accountAllowedTypes: [],
          glTypes: 'G',
          fcName: 'toAccount',
          accountType: 'G',
          fromTo: 'to1',
          requestObject: this.sweepingAndPoolingVO,
        };
        this.complexExchangeOptions.fromAmountOptions.amountOptions.labelKey = 'maximum_balance_key';
        this.complexExchangeOptions.toAmountOptions.amountOptions.labelKey = 'maximum_balance_key';
        this.complexExchangeOptions.fromAmountOptions.amountOptions.placeHolder = 'enter_maximum_balance_key';
        this.complexExchangeOptions.toAmountOptions.amountOptions.placeHolder = 'enter_maximum_balance_key'
        //   this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.toAccountListOptions.fcName], CommonBussinessConstant.VISIBLE_FIELD);
        this.showtoAccount = true;
      }
    }
  }

  private showExchangeRate() {
    this.exchangeChild.showToCurrency();
  }
  onInstructionMethodChange(event) {
    if (event.itemValue === CommonBussinessConstant.INSTRUCTION_METHOD_OFFLINE) {
      this.stepperOptions.numberOfSteps = 2;
      this.showDate = false;
    } else {
      this.showDate = true;
      this.stepperOptions.numberOfSteps = 1;
    }

  }

}
