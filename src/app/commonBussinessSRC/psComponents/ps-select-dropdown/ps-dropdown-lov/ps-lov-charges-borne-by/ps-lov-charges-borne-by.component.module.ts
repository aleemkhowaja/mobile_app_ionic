import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovChargesBorneByComponent } from './ps-lov-charges-borne-by.component';




@NgModule({
    declarations: [PsLovChargesBorneByComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovChargesBorneByComponent],
    entryComponents: [PsLovChargesBorneByComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovChargesBorneByComponentModule { }