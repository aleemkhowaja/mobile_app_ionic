import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { PsComponentsModule } from '../../../../../commonSRC/psComponents/ps-components.module';
import { SharedModule } from '../../../../../commonSRC/shared.module';
import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovPeriodicityOptionsComponent } from './ps-lov-periodicity.component';

@NgModule({
    declarations: [PsLovPeriodicityOptionsComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovPeriodicityOptionsComponent],
    entryComponents: [PsLovPeriodicityOptionsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovPeriodicityOptionsComponentModule { }
