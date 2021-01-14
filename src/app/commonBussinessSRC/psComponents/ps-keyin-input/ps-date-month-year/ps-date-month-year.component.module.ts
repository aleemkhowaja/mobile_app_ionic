import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDateMonthYearComponent } from './ps-date-month-year.component';


@NgModule({
    declarations: [
        PsDateMonthYearComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsDateMonthYearComponent
    ],
    entryComponents: [
        PsDateMonthYearComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDateMonthYearComponentModule { }
