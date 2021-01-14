import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from '../../../../../commonSRC/psServices/logger/logger.service';
import { PsCommonService } from '../../../../../commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsDateMonthYearFutureExposed } from './ps-date-month-year-future.component.interfaces';
import { PsDateMonthYearComponent } from '../ps-date-month-year.component';
import { IOptionsPsDateMonthYearExposed } from '../ps-date-month-year.component.interfaces';

@Component({
  selector: 'ps-date-month-year-future',
  templateUrl: './ps-date-month-year-future.component.html',
  styleUrls: ['./ps-date-month-year-future.component.scss'],
})
export class PsDateMonthYearFutureComponent extends PsDateMonthYearComponent implements OnInit {

  @Input() options: IOptionsPsDateMonthYearFutureExposed;
  dateMonthYearOptions: IOptionsPsDateMonthYearExposed = {
    min: new Date()
  };

  constructor(public commonProv: PsCommonService, loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.dateMonthYearOptions, this.options, false);
    super.ngOnInit();
  }

}
