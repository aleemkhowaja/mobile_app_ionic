import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsKeyinDate } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsDateDayMonthYearFutureExposed } from './ps-date-day-month-year-future.component.interfaces';
import { PsDateDayMonthYearComponent } from '../ps-date-day-month-year.component';

@Component({
  selector: 'ps-date-day-month-year-future',
  templateUrl: './ps-date-day-month-year-future.component.html',
  styleUrls: ['./ps-date-day-month-year-future.component.scss'],
})
export class PsDateDayMonthYearFutureComponent extends PsDateDayMonthYearComponent implements OnInit {

  @Input() options: IOptionsPsDateDayMonthYearFutureExposed;
  dateDayMonthYearOptions: IOptionsPsKeyinDate = {
    min: new Date()
  };

  constructor(public commonProv: PsCommonService, loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.dateDayMonthYearOptions, this.options, false);
    super.ngOnInit();
  }

  dataChanged(value){
    this.onPsChange.emit(value);
  }

  superWriteValue(val){
    super.writeValue(val);
  }
}
