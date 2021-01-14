import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsBanksComponent } from './ps-banks.component';

@NgModule({
    declarations: [
        PsBanksComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsBanksComponent
    ],
    entryComponents: [
        PsBanksComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsBanksComponentModule { }
