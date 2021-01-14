import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from './../../../../../../commonSRC/psServices/logger/logger.service';
import { IOptionsPsKeyinDate } from './../../../../../../commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from './../../../../../../commonSRC/psServices/ps-common/ps-common.service';
import { PsDateDayMonthYearFutureComponent } from './../ps-date-day-month-year-future.component';
import { IOptionsPsDateDayMonthYearFutureAsStringExposed } from './ps-date-day-month-year-future-asString.component.interface';

/**
 * @author Hisham.Omar 
 * TP#1136797
 */
@Component({
    selector: 'ps-date-day-month-year-future-asString',
    templateUrl: './ps-date-day-month-year-future-asString.component.html'
})
export class PsDateDayMonthYearFutureAsStringComponent extends PsDateDayMonthYearFutureComponent implements OnInit {
    @Input() options: IOptionsPsDateDayMonthYearFutureAsStringExposed;
    dateDayMonthYearFutureOptions: IOptionsPsKeyinDate = {
        setValAsFormat: true
    }

    constructor(public commonProv: PsCommonService, loggerP: LoggerService) {
        super(commonProv, loggerP);
    }

    ngOnInit() {
        this.commonProv.copyObject(this.dateDayMonthYearFutureOptions, this.options, false);
    }

}