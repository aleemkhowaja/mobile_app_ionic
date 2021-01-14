import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IOptionsPsDateDayMonthYearPastExposed } from "src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-day-month-year/ps-date-day-month-year-past/ps-date-day-month-year-past.component.interfaces";
import { IOptionsPsLovStatusExposed } from "src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-status/ps-lov-status.component.interface";
import { IOptionsPsDropdownPortfolioExposed } from "src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-portfolio/ps-dropdown-portfolio.component.interface";
import { CommonBussinessConstant } from "src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant";
import { OmniPullService } from "src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service";
import { PsBaseFieldComponent } from "src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component";
import { LoggerService } from "src/app/commonSRC/psServices/logger/logger.service";
import { ConstantCommon } from "src/app/commonSRC/psServices/models/common-constant";
import { IdefaultValidators, IOptionsPsActionButton, IOptionsPsContainerPanel, IOptionsPsKeyinDate } from "src/app/commonSRC/psServices/models/ps-common-interface";
import { PsCommonSettings } from "src/app/commonSRC/psServices/models/ps-common.settings";
import { PsCommonService } from "src/app/commonSRC/psServices/ps-common/ps-common.service";
import { IOptionsPsInputNumericExposed } from "../../ps-keyin-input/ps-input-numeric/ps-input-numeric.component.interfaces";
import { IOptionsPsDropdownActivityExposed } from "../../ps-select-dropdown/ps-dropdown-activity/ps-dropdown-activity.component.interfaces";
import { IOptionsPsDropdownCurrenciesExposed } from "../../ps-select-dropdown/ps-dropdown-currencies/ps-dropdown-currencies.component.interfaces";
import { IOptionsPsLovTransactionTypeExposed } from "../../ps-select-dropdown/ps-dropdown-lov/ps-lov-transaction-type/ps-lov-transaction-type.component.interfaces";
import { IOptionsPSComplexDateFilter } from "../ps-complex-date-filter/ps-complex-date-filter.component.interfaces";
import { IOptionsPSComplexAmountFilter } from "../ps-complex-filter-amount/ps-complex-filter-amount.component.interface";
import { IOptionsPsInputVarcharExposed } from "./../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces";

@Component({
  selector: 'ps-complex-report-filter-criteria',
  templateUrl: './ps-complex-report-filter-criteria.component.html',
  styleUrls: ['./ps-complex-report-filter-criteria.component.scss'],
})
export class PsComplexReportFilterCriteriaComponent extends PsBaseFieldComponent implements OnInit, OnDestroy {
  formGroup = new FormGroup({});
  filterDate: IOptionsPSComplexDateFilter = {};
  requestObject: any = {};

  filterButtonOptions: IOptionsPsActionButton = {
    labelKey: 'filter_key',
    iconName: 'checkmark-circle-outline',
    type: 'submit',
    psClass: 'ps-button-export',
    group: this.formGroup
  };

  filterRestButtonOptions: IOptionsPsActionButton = {
    labelKey: 'reset_key',
    iconName: 'close-circle',
    type: 'reset',
    psClass: 'ps-button-cancel',
    group: this.formGroup
  };

  currencyOptions: IOptionsPsDropdownCurrenciesExposed = {};

  filterStatusOptions: IOptionsPsLovStatusExposed = {};


  transactionTypesOptions: IOptionsPsLovTransactionTypeExposed = {};

  filterReferenceNumberOptions: IOptionsPsInputNumericExposed = {};

  nbOfTransactions: IOptionsPsInputNumericExposed = {};

  filterAmountOptions: IOptionsPSComplexAmountFilter = {};

  filterCriteriaPanelOptions: IOptionsPsContainerPanel = {
    labelKey: 'filter_options_key'
  };

  filterPortfolioOptions: IOptionsPsDropdownPortfolioExposed = {};

  filterDateOptions: IOptionsPsDateDayMonthYearPastExposed = {};

  marketDate: IOptionsPsKeyinDate = {}; // IOptionsPsDisplayOnlyTodayDateExposed = {};
  defaultFormat: any = 'MM/DD/YYYY';
  fromDate = false;
  toDate = false;
  filterDateSingle = false;
  dateMarket = false;
  reset = false;
  showPortfolioList = false;

  sukukTypeOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'sukukType',
    labelKey: 'sukuk_type_key',
    placeHolder: 'enter_sukuk_type_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  filterRefresh: any;
  isdaraOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'isdaraNumber',
    labelKey: 'isdara_number_key',
    placeHolder: 'enter_isdara_number_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };

  activityFilterOptions: IOptionsPsDropdownActivityExposed = {
    fcName: 'filterActivity',
    group: this.formGroup,
    labelKey: 'activity_key',
    placeHolder: 'select_activity_key',
  }

  showDate = true;
  statusChangeValue: any = null;
  constructor(private commonC: PsCommonService, private loggerC: LoggerService, private omniPull: OmniPullService) {
    super(commonC, loggerC);
    this.filterRefresh = this.commonProv.reportRefrshFlag.subscribe((flag) => {
      if (flag) {
        this.init();
      }
    });
  }

  async init() {
    this.filterStatusOptions = { // TRANSFERS
      fcName: 'status',
      group: this.formGroup,
    };

    this.filterReferenceNumberOptions = { // TRANSFERS
      fcName: 'ReferenceNumber',
      group: this.formGroup,
      labelKey: 'reference_number_key',
      placeHolder: 'enter_reference_number_key'
    };

    this.nbOfTransactions = {
      fcName: 'nbOfTransactions',
      group: this.formGroup,
      labelKey: 'number_of_transactions_key',
      placeHolder: 'enter_number_of_transactions_key'
    };

    this.filterAmountOptions = { // TRANSFERS
      max: {
        group: this.formGroup,
        fcName: 'toAmount',
        labelKey: 'enter_max_amount_key',
        placeHolder: 'enter_max_amount_key'
      },
      min: {
        group: this.formGroup,
        fcName: 'fromAmount',
        labelKey: 'enter_min_amount_key',
        placeHolder: 'enter_min_amount_key'
      }
    };

    this.transactionTypesOptions = { // STATEMENT 1533
      fcName: 'trsTypeInd',
      group: this.formGroup,
    };

    this.filterDate = { // STATEMENT 1533 || TRANSFERS
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

    this.currencyOptions = { // EXCHANGE || TRANSFERS
      fcName: 'currencyCode',
      group: this.formGroup,
      labelKey: 'filter_currency_key',
      placeHolder: 'currency_key',
      iconOptions: {
        iconName: 'filter-report-icon'
      }
    };

    this.filterPortfolioOptions = {
      fcName: 'portfolioNumber',
      group: this.formGroup,
      labelKey: 'portfolio_key',
      placeHolder: 'select_portfolio_key'
    };

    this.filterDateOptions = {
      fcName: 'filterDate',
      group: this.formGroup,
      labelKey: 'select_date_key',
      placeHolder: 'select_date_key',
    };

    this.marketDate = {
      fcName: 'marketDate',
      group: this.formGroup,
      labelKey: 'market_date_key',
      placeHolder: 'market_date_key',
      psClass: 'ps-disabled'
    };

    this.common.setFormData(this.formGroup, this.requestObject);

    // ADDED FOR OTHER REPORTS. CHECKS IF CUSTOMIZATION IS AVAILABLE IF NOT THEN FILTES WILL NOT SHOW

    const res = await this.omniPull.getParamValOf('DefaultDateFormat').catch(err => this.logger.log(err));
    this.defaultFormat = res.DefaultDateFormat ? res.DefaultDateFormat : ConstantCommon.PREV_DATE_FORMAT;
    // Using this.common.initialScreenDisplay to get the values from the services and not the defaulted values and based on that. showing or hiding the filter panel
    const sysParamScreenDispList = this.common.initialScreenDisplayParams.get(PsCommonSettings.oper_ID) ? this.common.initialScreenDisplayParams.get(PsCommonSettings.oper_ID) : new Map<string, any>();
    // Added in all the conditionals. the value of the IS_VISIBLE property as well for further checking of the customization
    if ((sysParamScreenDispList.get(this.currencyOptions.fcName) === undefined || sysParamScreenDispList.get(this.currencyOptions.fcName).IS_VISIBLE === 0) &&
      (sysParamScreenDispList.get(this.filterAmountOptions.max.fcName) === undefined || sysParamScreenDispList.get(this.filterAmountOptions.max.fcName).IS_VISIBLE === 0) &&
      (sysParamScreenDispList.get(this.filterAmountOptions.min.fcName) === undefined || sysParamScreenDispList.get(this.filterAmountOptions.min.fcName).IS_VISIBLE === 0) &&
      (sysParamScreenDispList.get(this.transactionTypesOptions.fcName) === undefined || sysParamScreenDispList.get(this.transactionTypesOptions.fcName).IS_VISIBLE === 0) &&
      (sysParamScreenDispList.get(this.filterDate.fromDate.fcName) === undefined || sysParamScreenDispList.get(this.filterDate.fromDate.fcName).IS_VISIBLE === 0) &&
      (sysParamScreenDispList.get(this.filterDate.toDate.fcName) === undefined || sysParamScreenDispList.get(this.filterDate.toDate.fcName).IS_VISIBLE === 0) &&
      (sysParamScreenDispList.get(this.filterReferenceNumberOptions.fcName) === undefined || sysParamScreenDispList.get(this.filterReferenceNumberOptions.fcName).IS_VISIBLE === 0) &&
      (sysParamScreenDispList.get(this.filterStatusOptions.fcName) === undefined || sysParamScreenDispList.get(this.filterStatusOptions.fcName).IS_VISIBLE === 0) &&
      (sysParamScreenDispList.get(this.filterDateOptions.fcName) === undefined || sysParamScreenDispList.get(this.filterDateOptions.fcName).IS_VISIBLE === 0) &&
      (sysParamScreenDispList.get(this.filterPortfolioOptions.fcName) === undefined || sysParamScreenDispList.get(this.filterPortfolioOptions.fcName).IS_VISIBLE === 0) &&
      (sysParamScreenDispList.get(this.marketDate.fcName) === undefined || sysParamScreenDispList.get(this.marketDate.fcName).IS_VISIBLE === 0) &&
      (sysParamScreenDispList.get(this.nbOfTransactions.fcName) === undefined || sysParamScreenDispList.get(this.nbOfTransactions.fcName).IS_VISIBLE === 0) &&
      (sysParamScreenDispList.get(this.activityFilterOptions.fcName) === undefined || sysParamScreenDispList.get(this.activityFilterOptions.fcName).IS_VISIBLE === 0)) {

      this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['filter_submit_button'], 0);
      this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['filter_reset_button'], 0);
      this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['online_reg_panel1'], 0);
    } else {
      this.checkCustomizations(sysParamScreenDispList);
      this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['filter_submit_button'], 1);
      this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['filter_reset_button'], 1);
      this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['online_reg_panel1'], 1);
    }
    // ENDING FOR CHECKING CUSTOMIZATIONS

  }

  checkCustomizations(sysParamScreenDispList) {
    if (sysParamScreenDispList.get(this.currencyOptions.fcName) === undefined) {
      this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.currencyOptions.fcName], 0);
    }

    if (sysParamScreenDispList.get(this.filterAmountOptions.max.fcName) === undefined) {
      this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.filterAmountOptions.max.fcName], 0);
    }

    if (sysParamScreenDispList.get(this.filterAmountOptions.min.fcName) === undefined) {
      this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.filterAmountOptions.min.fcName], 0);
    }

    if (sysParamScreenDispList.get(this.transactionTypesOptions.fcName) === undefined) {
      this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.transactionTypesOptions.fcName], 0);
    }

    if (sysParamScreenDispList.get(this.filterDate.fromDate.fcName) === undefined) {
      this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.filterDate.fromDate.fcName], 0);
    } else {
      if (sysParamScreenDispList.get(this.filterDate.fromDate.fcName).IS_VISIBLE === 1) {
        this.fromDate = true;
        if (!this.reset) {
          this.commonProv.setValInsideNestedObj(this.filterDate.fromDate.fcName, new Date(), this.requestObject);
        }
      }
    }

    if (sysParamScreenDispList.get(this.filterDate.toDate.fcName) === undefined) {
      this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.filterDate.toDate.fcName], 0);
    } else {
      if (sysParamScreenDispList.get(this.filterDate.toDate.fcName).IS_VISIBLE === 1) {
        this.toDate = true;
        if (!this.reset) {
          this.commonProv.setValInsideNestedObj(this.filterDate.toDate.fcName, new Date(), this.requestObject);
        }
      }
    }

    if (sysParamScreenDispList.get(this.filterReferenceNumberOptions.fcName) === undefined) {
      this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.filterReferenceNumberOptions.fcName], 0);
    }

    if (sysParamScreenDispList.get(this.filterStatusOptions.fcName) === undefined) {
      this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.filterStatusOptions.fcName], 0);
    }

    if (sysParamScreenDispList.get(this.sukukTypeOptions.fcName) === undefined) {
      this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.sukukTypeOptions.fcName], 0);
    }

    if (sysParamScreenDispList.get(this.isdaraOptions.fcName) === undefined) {
      this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.isdaraOptions.fcName], 0);
    }

    if (sysParamScreenDispList.get(this.filterDateOptions.fcName) === undefined) {
      this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.filterDateOptions.fcName], 0);
    } else {
      if (sysParamScreenDispList.get(this.filterDateOptions.fcName).IS_VISIBLE === 1) {
        this.filterDateSingle = true;
        if (!this.reset) {
          this.commonProv.setValInsideNestedObj(this.filterDateOptions.fcName, new Date(), this.requestObject);
        }
      }
    }

    if (sysParamScreenDispList.get(this.filterPortfolioOptions.fcName) === undefined) {
      this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.filterPortfolioOptions.fcName], 0);
    } else {
      if (sysParamScreenDispList.get(this.filterPortfolioOptions.fcName).IS_VISIBLE === 1) {
        this.showPortfolioList = true;
      }
    }

    if (sysParamScreenDispList.get(this.marketDate.fcName) === undefined) {
      this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.marketDate.fcName], 0);
    } else {
      if (sysParamScreenDispList.get(this.marketDate.fcName).IS_VISIBLE === 1) {
        this.dateMarket = true;
        this.marketDate.displayFormat = this.defaultFormat;
        this.commonProv.setValInsideNestedObj(this.marketDate.fcName, new Date(), this.requestObject);
        this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.marketDate.fcName], 1);
      }
    }

    if (sysParamScreenDispList.get(this.nbOfTransactions.fcName) === undefined) {
      this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.nbOfTransactions.fcName], 0);
    } else {
      if (sysParamScreenDispList.get(this.nbOfTransactions.fcName).IS_VISIBLE === 1) {
        const defaultValidations: Map<string, IdefaultValidators> = new Map<string, IdefaultValidators>();
        defaultValidations.set(this.nbOfTransactions.fcName, this.commonProv.prepareValidation(false, null, false, 0));
        this.commonProv.setDefaultValidators(defaultValidations, this.formGroup);
      }
    }

    if (sysParamScreenDispList.get(this.activityFilterOptions.fcName) === undefined) {
      this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.activityFilterOptions.fcName], 0);
    }

    setTimeout(() => {
      if (PsCommonSettings.oper_ID === CommonBussinessConstant.PORTFOLIO_POSITION_OPER_ID) {
        if (this.statusChangeValue === "M") {
          setTimeout(() => {
            this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.filterDate.fromDate.fcName, this.filterDate.toDate.fcName], 0);
          }, 500);
        } else {
          this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.filterDate.fromDate.fcName, this.filterDate.toDate.fcName], 1);
        }
      }
    }, 500);
  }

  ngOnInit() {
    super.init();
    this.init();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.filterRefresh.unsubscribe();
  }

  filterReport() {
    this.reset = false;
    // eslint-disable-next-line guard-for-in
    for (const property in this.requestObject) {
      if (this.requestObject[property] === undefined || this.requestObject[property] === '') {
        delete this.requestObject[property];
      }
    }
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
    if (this.fromDate && this.requestObject.hasOwnProperty('filterFromDate')) {
      this.requestObject.filterFromDate = new Date(new Date(this.requestObject.filterFromDate).toDateString());
      this.requestObject.filterFromDate = (new Date(this.requestObject.filterFromDate - tzoffset)).toISOString();
    }
    if (this.toDate && this.requestObject.hasOwnProperty('filterToDate')) {
      this.requestObject.filterToDate = new Date(new Date(this.requestObject.filterToDate).toDateString());
      this.requestObject.filterToDate = (new Date(this.requestObject.filterToDate - tzoffset)).toISOString();
    }
    if (this.dateMarket && this.requestObject.hasOwnProperty("dateMarket")) {
      this.requestObject.dateMarket = new Date(new Date(this.requestObject.dateMarket).toDateString());
    }
    this.filterCriteriaPanelOptions.expanded = false;
    this.onPsChange.emit(this.requestObject);
  }

  resetReport() {
    this.formGroup.reset();
    // eslint-disable-next-line guard-for-in
    for (const property in this.requestObject) {
      delete this.requestObject[property];
    }
    this.reset = true;
    this.ngOnInit();
  }

  onChangeLov(values) {
    this.statusChangeValue = values.itemValue;
    if (PsCommonSettings.oper_ID === CommonBussinessConstant.PORTFOLIO_POSITION_OPER_ID) {
      if (values.itemValue === "M") {
        this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.filterDate.fromDate.fcName, this.filterDate.toDate.fcName], 0);
      } else {
        this.common.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.filterDate.fromDate.fcName, this.filterDate.toDate.fcName], 1);
      }
    }
  }
}
