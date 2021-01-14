import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDateMonthYearComponentModule } from '../ps-date-month-year.component.module';
import { PsDateMonthYearPastComponent } from './ps-date-month-year-past.component';


@NgModule({
    declarations: [
        PsDateMonthYearPastComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDateMonthYearComponentModule
    ],
    exports: [
        PsDateMonthYearPastComponent, 
    ],
    entryComponents: [
        PsDateMonthYearPastComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDateMonthYearPastComponentModule { }
