import { Component, Input, OnInit } from '@angular/core';
import { CommonUtils } from '../../../../commonSRC/psServices/models/common-utils';
import { PsKeyinDateComponent } from './../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-field-keyin/ps-keyin-date/ps-keyin-date.component';
import { LoggerService } from './../../../../commonSRC/psServices/logger/logger.service';
import { IOptionsPsKeyinDate } from './../../../../commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from './../../../../commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsDateMonthYearExposed } from './ps-date-month-year.component.interfaces';
import { OmniPullService } from '../../../psServices/omni-common/omni-pull.service';


@Component({
  selector: 'ps-date-month-year',
  templateUrl: './ps-date-month-year.component.html',
  styleUrls: ['./ps-date-month-year.component.scss'],
})
export class PsDateMonthYearComponent extends PsKeyinDateComponent implements OnInit {

  @Input() options: IOptionsPsDateMonthYearExposed;
  dateOptions: IOptionsPsKeyinDate = {};
  omniPull: OmniPullService;
  constructor(public commonProv: PsCommonService, loggerP: LoggerService) {
    super(commonProv, loggerP);
    this.omniPull = CommonUtils.injectionHandler(OmniPullService);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.dateOptions, this.options);
    this.dateOptions.displayFormat = 'MMM YYYY';
    // this.returnDisplayFormat();// to be called once the parameter is created for month year format
    this.dateOptions.pickerFormat = this.dateOptions.displayFormat;
  }

  async returnDisplayFormat() {
    const res = await this.omniPull.getParamValOf('DefaultDateFormat').catch(err => this.logger.log(err));
    if (res) {
      this.dateOptions.displayFormat = res.DefaultDateFormat ? res.DefaultDateFormat : 'MMM YYYY';
    }
  }

}
