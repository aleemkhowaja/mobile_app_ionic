import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsComplexFinancialCalculcatorExposed } from './ps-complex-financial-calculator.component.interfaces';

/**
 * @author Aftab.Ali
 * @since 20/11/2019
 * @edited Heba.Hassan
 * 
 * <p> PsComplexFinancialCalculatorComponent is a complex component composed for financial calculations</p>
 */
@Component({
  selector: 'ps-complex-financial-calculator',
  templateUrl: './ps-complex-financial-calculator.component.html',
  styleUrls: ['./ps-complex-financial-calculator.component.scss'],
})
export class PsComplexFinancialCalculatorComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsComplexFinancialCalculcatorExposed;
  @Output() public productTypeChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public currencyChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public amountChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    commonService: PsCommonService,
    public omniPull: OmniPullService,
    logger: LoggerService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    super.ngOnInit();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.options.numberOfInstallmentsCountOptions.fcName], 0);
  }


  onProductChange(value: any) {
    if (value && value.selectedObj) {
      this.productTypeChange.emit(value);
    }
  }
  onAmountChanged(value: any) {
    if (value) {
      this.amountChange.emit(value);
    }
  }
  onCurrencyChange(value: any) {
    if (value) {
      this.currencyChange.emit(value);
    }
  }


}
