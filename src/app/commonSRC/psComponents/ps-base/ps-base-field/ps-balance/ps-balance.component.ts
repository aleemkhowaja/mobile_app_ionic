import { Component, Input, OnInit } from '@angular/core';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { IOptionsPsBalanceExposed, IOptionsPsLabel } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { LoggerService } from './../../../../psServices/logger/logger.service';

@Component({
  selector: 'ps-balance',
  templateUrl: './ps-balance.component.html',
  styleUrls: ['./ps-balance.component.scss'],
})
export class PsBalanceComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsBalanceExposed = {};
  public labelBalance1: IOptionsPsLabel = {};
  public labelBalance2: IOptionsPsLabel = {};
  public balanceValue1: any;
  public balanceValue2: any;

  constructor(
    commonService: PsCommonService,
    logger: LoggerService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    this.custIconOptions.component = PsBalanceComponent;
    this.custIconOptions.componentOptions = this.options;
    this.labelBalance1 = {
      labelKey: this.options.labelBalance1
    };
    this.labelBalance2 = {
      labelKey: this.options.labelBalance2
    };
    if (this.options.balanceValue1 !== null && this.options.balanceValue1 !== undefined) {
      this.balanceValue1 = this.options.balanceValue1;
    } else {
      this.balanceValue1 = '0.0';
    }
    if (this.options.balanceValue2 !== null && this.options.balanceValue2 !== undefined) {
      this.balanceValue2 = this.options.balanceValue2;
    } else {
      this.balanceValue2 = '0.0';
    }
  }

}
