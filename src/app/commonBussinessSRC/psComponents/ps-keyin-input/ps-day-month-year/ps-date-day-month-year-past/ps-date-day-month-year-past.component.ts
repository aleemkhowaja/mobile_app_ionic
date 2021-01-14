import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsDateDayMonthYearPastExposed } from './ps-date-day-month-year-past.component.interfaces';
import { PsDateDayMonthYearComponent } from '../ps-date-day-month-year.component';
import { IOptionsPsDateDayMonthYearExposed } from '../ps-date-day-month-year.component.interfaces';

@Component({
  selector: 'ps-date-day-month-year-past',
  templateUrl: './ps-date-day-month-year-past.component.html',
  styleUrls: ['./ps-date-day-month-year-past.component.scss'],
})
export class PsDateDayMonthYearPastComponent extends PsDateDayMonthYearComponent implements OnInit {

  @Input() options: IOptionsPsDateDayMonthYearPastExposed;
  dateDayMonthYearOptions: IOptionsPsDateDayMonthYearExposed = {
    max: new Date()
  };

  constructor(public commonProv: PsCommonService, loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.dateDayMonthYearOptions, this.options, false);
  }

}
