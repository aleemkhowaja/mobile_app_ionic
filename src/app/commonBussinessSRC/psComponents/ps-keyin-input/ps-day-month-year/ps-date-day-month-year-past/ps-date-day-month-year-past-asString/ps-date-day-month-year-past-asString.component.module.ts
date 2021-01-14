import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from './../../../../../../commonSRC/psComponents/ps-components.module';
import { SharedModule } from './../../../../../../commonSRC/shared.module';
import { PsDateDayMonthYearPastComponentModule } from './../ps-date-day-month-year-past.component.module';
import { PsDateDayMonthYearPastAsStringComponent } from './ps-date-day-month-year-past-asString.component';

@NgModule({
    declarations: [
        PsDateDayMonthYearPastAsStringComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDateDayMonthYearPastComponentModule
    ],
    exports: [
        PsDateDayMonthYearPastAsStringComponent
    ],
    entryComponents: [
        PsDateDayMonthYearPastAsStringComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDateDayMonthYearPastAsStringComponentModule { }
