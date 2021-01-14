import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsDateDayMonthYearComponent } from './ps-date-day-month-year.component';


@NgModule({
    declarations: [
        PsDateDayMonthYearComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsDateDayMonthYearComponent
    ],
    entryComponents: [
        PsDateDayMonthYearComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDateDayMonthYearComponentModule { }
