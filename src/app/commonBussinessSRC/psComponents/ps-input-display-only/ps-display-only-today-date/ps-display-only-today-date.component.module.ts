import { NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDisplayOnlyTodayDateComponent } from './ps-display-only-today-date.component';

@NgModule({
    declarations: [
        PsDisplayOnlyTodayDateComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,

    ],
    exports: [
        PsDisplayOnlyTodayDateComponent
    ],
    entryComponents: [
        PsDisplayOnlyTodayDateComponent
    ],
    /* schemas: [CUSTOM_ELEMENTS_SCHEMA] */

})
export class PsDisplayOnlyTodayDateComponentModule { }