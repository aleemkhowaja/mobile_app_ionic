import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IAmountFromToCurrencyRequest, IAmountValidationRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsActionIconExposed, IOptionsPsLabel } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsComplexExchnageExposed } from './ps-complex-exchange.component.interfaces';

/**
 * @author Aftab.Ali
 * @since 26/12/2019
 *
 * <p> PsComplexExchangeComponent -- </p>
 */
@Component({
  selector: 'ps-complex-exchange',
  templateUrl: './ps-complex-exchange.component.html',
  styleUrls: ['./ps-complex-exchange.component.scss'],
})
export class PsComplexExchangeComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsComplexExchnageExposed;
  public fromCurrencyCode = '';
  public toCurrencyCode = '';
  public exchangeRate = '0.00';
  public amountInToAccountAmount = '0.00';
  public excnageRateIconOptions: IOptionsPsActionIconExposed = {};
  public toCurrenciesWarning = true;
  public toCurrenciesWarningText: any;
  public amountEntered: string;
  public exchangeRatelabelOptions: IOptionsPsLabel = {
    labelKey: 'exchange_rate_key',
    previewMode: false
  };
  exchangeRateValueOptions: IOptionsPsLabel = {
    labelKey: '0.00',
    previewMode: true
  };

  constructor(
    commonService: PsCommonService,
    logger: LoggerService,
    private omniPull: OmniPullService,
    private cdRef?: ChangeDetectorRef
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    super.ngOnInit();
    this.excnageRateIconOptions = {
      iconName: 'sync'
    };
  }


  /**
   *
   * @param selectedValue
   */
  public onamountInFromAccountChange(selectedValue) {
    if (this.options.toAmountOptions && this.options.editableMode === true && (this.options.toAmountOptions.currencyCode === null || this.options.toAmountOptions.currencyCode === undefined)) {
      this.toCurrenciesWarning = true;
      this.toCurrenciesWarningText = this.omniPull.omniCommon.common.translate('please_select_to_currency_key');

      return;
    }
    if (selectedValue === null || selectedValue === undefined) {
      this.toCurrenciesWarning = true;
      this.toCurrenciesWarningText = this.omniPull.omniCommon.common.translate('please_enter_from_amount_key');

      return;
    } else if (selectedValue !== null && selectedValue !== undefined && (selectedValue.amount === null || selectedValue.amount === undefined || selectedValue.amount === '')) {
      this.toCurrenciesWarning = true;
      this.toCurrenciesWarningText = this.omniPull.omniCommon.common.translate('please_enter_from_amount_key');

      return;
    }

    if (selectedValue && this.options && this.options.fromAmountOptions && this.options.toAmountOptions && this.options.toAmountOptions.currenciesOptions.fcName) {
      this.toCurrenciesWarning = false;
      const param: IAmountValidationRequest = {
        amount: selectedValue.amount,
        currencyCode: this.options.fromAmountOptions.currencyCode
      };
      /* this.omniPull.amountValidation(param).then((result) => {
        if (result && result.errorCode !== undefined && result.errorCode === 1) {
          this.options.toAmountOptions.amountOptions.group.controls[this.options.toAmountOptions.amountOptions.fcName].setValue('');
        }
      }).catch(err => {
        this.logger.error(err);
      }); */
      this.amountEntered = selectedValue.amount;
      if (this.options.fromAmountOptions.currencyCode !== undefined && this.options.toAmountOptions.currencyCode !== undefined && this.options.fromAmountOptions.currencyCode !== this.options.toAmountOptions.currencyCode) {
        let toCurrencyObj: any;
        if (this.options.toAmountOptions && this.options.toAmountOptions.currencyObj) {
          toCurrencyObj = this.options.toAmountOptions.currencyObj;
        } else if (this.options.requestObject) {
          toCurrencyObj = this.options.requestObject[this.options.toAmountOptions.currenciesOptions.fcName];
        }
        const paramData: IAmountFromToCurrencyRequest = {
          fromAmount: selectedValue.amount,
          fromCurrency: this.options.fromAmountOptions.currencyObj,
          toCurrency: toCurrencyObj.selectedObj !== undefined ? toCurrencyObj.selectedObj : toCurrencyObj,
          operId: this.options.operId ? this.options.operId : null,
        };
        this.omniPull.returnAmountFromToCurrency(paramData).then((result) => {
          if (result && result.outputCode == 0 && result.toAmount) {
            this.amountInToAccountAmount = result.toAmount.toString();
            this.exchangeRate = result.exchangeRate.toString();
            this.exchangeRateValueOptions.labelKey = result.exchangeRate.toString();
            this.options.toAmountOptions.amountOptions.group.controls[this.options.toAmountOptions.amountOptions.fcName].setValue(this.amountInToAccountAmount);
          } else {
            this.options.toAmountOptions.amountOptions.group.controls[this.options.toAmountOptions.amountOptions.fcName].setValue('');
          }
        }).catch(err => {
          this.logger.error(err);
        });
      } else if (this.options.requestObject) {
        this.commonProv.setValInsideNestedObj(this.options.toAmountOptions.amountOptions.fcName, this.options.requestObject[this.options.fromAmountOptions.amountOptions.fcName], this.options.requestObject);
      }
    }
  }

  public fromCurrencyChange(event) {
    if (event !== undefined && event.selectedObj !== undefined) {
      this.options.fromAmountOptions.currencyCode = event.selectedObj.currencyCode;
      this.options.fromAmountOptions.currency = event.selectedObj.description;
      this.options.fromAmountOptions.currencyObj = event.selectedObj;
      this.options.fromAmountOptions.amountOptions.decimalPoints = event.selectedObj.decimalPoint;
      this.options.fromCurrency = event;
      if (this.options.showToCurrencyOptions !== undefined && this.options.showToCurrencyOptions === true) {
        this.showToCurrency();
      }
      if (this.options.toAmountOptions.currencyObj !== null && this.options.toAmountOptions.currencyObj !== undefined && this.checkAmount()) {
        const selectedVal = {
          amount: this.amountEntered
        };
        this.onamountInFromAccountChange(selectedVal);
      }
    }
  }

  public toCurrencyChange(event) {
    this.toCurrenciesWarning = false;
    if (event !== undefined && event.selectedObj !== undefined) {
      this.options.toAmountOptions.currencyCode = event.selectedObj.currencyCode;
      this.options.toAmountOptions.currency = event.selectedObj.description;
      this.options.toAmountOptions.currencyObj = event.selectedObj;
      this.options.toAmountOptions.amountOptions.decimalPoints = event.selectedObj.decimalPoint;
      if (this.options.showToCurrencyOptions !== undefined && this.options.showToCurrencyOptions === true) {
        this.showToCurrency();
      }
      if (this.options.fromAmountOptions.currencyObj !== null && this.options.fromAmountOptions.currencyObj !== undefined && this.checkAmount()) {
        const selectedVal = {
          amount: this.amountEntered
        };
        this.onamountInFromAccountChange(selectedVal);
      }
    }
  }

  public showToCurrency() {
    if (this.options.fromAmountOptions !== undefined && this.options.toAmountOptions !== undefined && this.options.fromAmountOptions.currencyCode !== undefined && this.options.toAmountOptions.currencyCode !== undefined && this.options.fromAmountOptions.currencyCode !== this.options.toAmountOptions.currencyCode) {
      this.options.editableMode = true;
    } else {
      this.options.editableMode = false;
    }
  }

  private checkAmount(): boolean {
    if( this.options.fromAmountOptions.amountOptions.group.controls[this.options.fromAmountOptions.amountOptions.fcName].value >0) {
      this.amountEntered = this.options.fromAmountOptions.amountOptions.group.controls[this.options.fromAmountOptions.amountOptions.fcName].value;
    }
    if (this.amountEntered !== null && this.amountEntered !== undefined && this.amountEntered !== '') {
      return true;
    } else {
      return false;
    }
  }

}
