import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovSettlementMethodComponent } from './ps-lov-settlement-method.component';




@NgModule({
    declarations: [PsLovSettlementMethodComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovSettlementMethodComponent],
    entryComponents: [PsLovSettlementMethodComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovSettlementMethodComponentModule { }