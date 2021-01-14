import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from './../../../../../../commonSRC/psComponents/ps-components.module';
import { SharedModule } from './../../../../../../commonSRC/shared.module';
import { PsDateDayMonthYearFutureComponentModule } from './../ps-date-day-month-year-future.component.module';
import { PsDateDayMonthYearFutureAsStringComponent } from './ps-date-day-month-year-future-asString.component';

@NgModule({
    declarations: [
        PsDateDayMonthYearFutureAsStringComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDateDayMonthYearFutureComponentModule
    ],
    exports: [
        PsDateDayMonthYearFutureAsStringComponent
    ],
    entryComponents: [
        PsDateDayMonthYearFutureAsStringComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDateDayMonthYearFutureAsStringComponentModule { }