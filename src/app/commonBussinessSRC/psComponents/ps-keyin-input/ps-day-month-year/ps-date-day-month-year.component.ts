import { Component, Input, OnInit } from '@angular/core';

import { LoggerService } from '../../../../commonSRC/psServices/logger/logger.service';
import { IOptionsPsKeyinDate } from '../../../../commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../commonSRC/psServices/ps-common/ps-common.service';
import { OmniPullService } from '../../../psServices/omni-common/omni-pull.service';
import { PsKeyinDateComponent } from '../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-field-keyin/ps-keyin-date/ps-keyin-date.component';
import { CommonUtils } from '../../../../commonSRC/psServices/models/common-utils';
import { IOptionsPsDateDayMonthYearExposed } from './ps-date-day-month-year.component.interfaces';


@Component({
  selector: 'ps-date-day-month-year',
  templateUrl: './ps-date-day-month-year.component.html',
  styleUrls: ['./ps-date-day-month-year.component.scss'],
})
export class PsDateDayMonthYearComponent extends PsKeyinDateComponent implements OnInit {

  @Input() options: IOptionsPsDateDayMonthYearExposed;
  dateOptions: IOptionsPsKeyinDate = {};
  omniPull: OmniPullService;

  constructor(public commonProv: PsCommonService, loggerP: LoggerService) {
    super(commonProv, loggerP);
    this.omniPull = CommonUtils.injectionHandler(OmniPullService);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.dateOptions, this.options, false);
    this.returnDisplayFormat();
    this.dateOptions.pickerFormat = this.dateOptions.displayFormat;
  }

  async returnDisplayFormat() {
    const res = await this.omniPull.getParamValOf('DefaultDateFormat').catch(err => this.logger.log(err));
    if (res) {
      this.dateOptions.displayFormat = res.DefaultDateFormat ? res.DefaultDateFormat : 'DD/MM/YYYY';
    }
  }
  dateChanged(value){
    this.onPsChange.emit(value);
  }

}
