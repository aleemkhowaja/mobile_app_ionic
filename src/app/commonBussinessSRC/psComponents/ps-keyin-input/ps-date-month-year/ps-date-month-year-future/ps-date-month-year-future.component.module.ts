import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDateMonthYearComponentModule } from '../ps-date-month-year.component.module';
import { PsDateMonthYearFutureComponent } from './ps-date-month-year-future.component';


@NgModule({
    declarations: [
        PsDateMonthYearFutureComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDateMonthYearComponentModule
    ],
    exports: [
        PsDateMonthYearFutureComponent
    ],
    entryComponents: [
        PsDateMonthYearFutureComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDateMonthYearFutureComponentModule { }
