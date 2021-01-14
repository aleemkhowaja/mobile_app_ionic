import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../../commonSRC/psComponents/ps-components.module';
import { PsDateDayMonthYearComponentModule } from '../ps-date-day-month-year.component.module';
import { PsDateDayMonthYearPastComponent } from './ps-date-day-month-year-past.component';


@NgModule({
    declarations: [
        PsDateDayMonthYearPastComponent,
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDateDayMonthYearComponentModule
    ],
    exports: [
        PsDateDayMonthYearPastComponent
    ],
    entryComponents: [
        PsDateDayMonthYearPastComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDateDayMonthYearPastComponentModule { }
