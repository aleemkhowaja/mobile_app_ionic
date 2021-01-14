import { Component, Input, OnInit } from '@angular/core';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsContainerItem } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsDisplayOnlyCurrencyAmountExposed } from './ps-display-only-currency-amount.component.interfaces';
import { FormGroup } from '@angular/forms';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';

/**
 * @author Ammar.Ahmed
 * @since 20/10/2020
 *
 * <p> PsDisplayOnlyCurrencyAmountComponent -- </p>
 */
@Component({
  selector: 'ps-display-only-currency-amount',
  templateUrl: './ps-display-only-currency-amount.component.html',
  styleUrls: ['./ps-display-only-currency-amount.component.scss'],
})
export class PsDisplayOnlyCurrencyAmountComponent extends PsBaseFieldComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({});
  amountItemOptions: IOptionsPsContainerItem = {
    psClass: 'dispaly-only-amount-currency ps-disabled'
  };

  @Input() options: IOptionsPsDisplayOnlyCurrencyAmountExposed = {};

  defaultOptions: IOptionsPsDisplayOnlyCurrencyAmountExposed = {
    currency: '',
    currenciesOptions: {
      labelKey: 'currency_key',
      placeHolder: 'select_currency_key',
      fcName: 'currencyCode',
      group: this.formGroup
    },
    amountOptions: {
      labelKey: 'amount_key',
      placeHolder: 'enter_amount_key',
      fcName: 'currentWdLimit',
      type: 'amount',
      group: this.formGroup
    },
    psClass: 'ps-disabled',
    forceShowOnPreview: false
  };

  constructor(
    commonService: PsCommonService,
    logger: LoggerService,
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    // super.ngOnInit();
    this.defaultOptions.amountOptions.fcName = this.options.amountOptions.fcName;
    // this.commonProv.copyObject(this.options, this.defaultOptions);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.options.currenciesOptions.fcName], true);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.options.amountOptions.fcName], true);
  }

}
