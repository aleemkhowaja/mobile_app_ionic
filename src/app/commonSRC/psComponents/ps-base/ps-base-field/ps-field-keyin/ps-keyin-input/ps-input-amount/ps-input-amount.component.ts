import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from '../../../../../../psServices/logger/logger.service';
import { IOptionsPsInputAmount, IOptionsPsKeyinInput, IPsMaskOptions } from '../../../../../../psServices/models/ps-common-interface';
import { PsCommonSettings } from '../../../../../../psServices/models/ps-common.settings';
import { PsCommonService } from '../../../../../../psServices/ps-common/ps-common.service';
import { PsKeyinInputComponent } from '../ps-keyin-input.component';


@Component({
  selector: 'ps-input-amount',
  templateUrl: './ps-input-amount.component.html',
  styleUrls: ['./ps-input-amount.component.scss'],
})
export class PsInputAmountComponent extends PsKeyinInputComponent implements OnInit {

  @Input() options: IOptionsPsInputAmount = {};
  // alias currency instead of amount by Richie for #BUG 960357
  mask: IPsMaskOptions = {
    groupSeparator: PsCommonSettings.THOUSANDS_SEPARATOR,
    alias: 'currency',
    autoGroup: true,
    placeholder: '0',
    greedy: false
  };
  private defaultInputOptions: IOptionsPsKeyinInput = {
    mask: this.mask,
  };

  get inputOptions() {
    if (this.options) {
      this.defaultInputOptions.placeHolder = this.options.placeHolder;
      this.defaultInputOptions.labelKey = this.options.labelKey;
      this.defaultInputOptions.mask.digits = this.options.decimalPoints;
      // commented/Added by Richie for #BUG 960357
      // this.defaultInputOptions.mask.mask = '(' + this.defaultInputOptions.mask.groupSeparator + '999){+|1}';
      if (this.options.decimalPoints > 0) {
        this.defaultInputOptions.mask.radixPoint = PsCommonSettings.DECIMAL_SEPARATOR;
        // for (let i = 0; i < this.options.decimalPoints; i++) {
        //   if (i === 0) {
        //     this.defaultInputOptions.mask.radixPoint = PsCommonSettings.DECIMAL_SEPARATOR;
        //     this.defaultInputOptions.mask.mask += '(' + this.defaultInputOptions.mask.radixPoint;
        //   }
        //   this.defaultInputOptions.mask.mask += '9';
        // }
        // this.defaultInputOptions.mask.mask += '){1}';
        // End Richie
      }
    }
    return this.defaultInputOptions;
  }

  constructor(commonProv: PsCommonService, loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.defaultInputOptions.type = 'amount';
    if (this.options) {
      this.defaultInputOptions.group = this.options.group;
      this.defaultInputOptions.fcName = this.options.fcName;
      // Added by Richie for #TP 1082495 in order to copy the mask properties
      this.commonProv.copyObject(this.defaultInputOptions, this.options, false, true);
    }
  }

}
