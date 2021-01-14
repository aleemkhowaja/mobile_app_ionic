import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsDateMonthYearComponent } from '../ps-date-month-year.component';
import { IOptionsPsDateMonthYearExposed } from '../ps-date-month-year.component.interfaces';
import { IOptionsPsDateMonthYearPastExposed } from './ps-date-month-year-past.component.interfaces';

@Component({
  selector: 'ps-date-month-year-past',
  templateUrl: './ps-date-month-year-past.component.html',
  styleUrls: ['./ps-date-month-year-past.component.scss'],
})
export class PsDateMonthYearPastComponent extends PsDateMonthYearComponent implements OnInit {

  @Input() options: IOptionsPsDateMonthYearPastExposed;
  dateMonthYearOptions: IOptionsPsDateMonthYearExposed = {
    max: new Date()
  };

  constructor(public commonProv: PsCommonService, loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.dateMonthYearOptions, this.options, false);
    super.ngOnInit();
  }
  superWriteValue(val){
    super.writeValue(val);
  }
}
