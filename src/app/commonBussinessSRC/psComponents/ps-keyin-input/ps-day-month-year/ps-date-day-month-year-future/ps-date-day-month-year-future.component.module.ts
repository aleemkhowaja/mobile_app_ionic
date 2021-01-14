import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../../commonSRC/psComponents/ps-components.module';
import { PsDateDayMonthYearComponentModule } from '../ps-date-day-month-year.component.module';
import { PsDateDayMonthYearFutureComponent } from './ps-date-day-month-year-future.component';


@NgModule({
    declarations: [
        PsDateDayMonthYearFutureComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDateDayMonthYearComponentModule
    ],
    exports: [
        PsDateDayMonthYearFutureComponent
    ],
    entryComponents: [
        PsDateDayMonthYearFutureComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDateDayMonthYearFutureComponentModule { }
