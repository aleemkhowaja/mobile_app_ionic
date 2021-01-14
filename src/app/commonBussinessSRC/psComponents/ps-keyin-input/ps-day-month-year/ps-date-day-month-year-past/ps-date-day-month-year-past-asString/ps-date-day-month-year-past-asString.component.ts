import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from './../../../../../../commonSRC/psServices/logger/logger.service';
import { IOptionsPsKeyinDate } from './../../../../../../commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from './../../../../../../commonSRC/psServices/ps-common/ps-common.service';
import { PsDateDayMonthYearPastComponent } from './../ps-date-day-month-year-past.component';
import { IOptionsPsDateDayMonthYearPastAsStringExposed } from './ps-date-day-month-year-past-asString.component.interface';

/**
 * @author Hisham.Omar
 * TP#1136182
 */
@Component({
    selector: 'ps-date-day-month-year-past-asString',
    templateUrl: './ps-date-day-month-year-past-asString.component.html'
})
export class PsDateDayMonthYearPastAsStringComponent extends PsDateDayMonthYearPastComponent implements OnInit {
    @Input() options: IOptionsPsDateDayMonthYearPastAsStringExposed;
    dateDayMonthYearPastOptions: IOptionsPsKeyinDate = {
        setValAsFormat: true
    }

    constructor(public commonProv: PsCommonService, loggerP: LoggerService) {
        super(commonProv, loggerP);
    }

    ngOnInit() {
        this.commonProv.copyObject(this.dateDayMonthYearPastOptions, this.options, false);
    }
}