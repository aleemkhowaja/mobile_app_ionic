import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovSettlementTypeComponent } from './ps-lov-settlement-type.component';




@NgModule({
    declarations: [PsLovSettlementTypeComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovSettlementTypeComponent],
    entryComponents: [PsLovSettlementTypeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovSettlementTypeComponentModule { }