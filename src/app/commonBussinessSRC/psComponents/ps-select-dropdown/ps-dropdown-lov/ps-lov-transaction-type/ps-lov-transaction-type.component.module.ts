import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovTransactionTypeComponent } from './ps-lov-transaction-type.component';




@NgModule({
    declarations: [PsLovTransactionTypeComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovTransactionTypeComponent],
    entryComponents: [PsLovTransactionTypeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovTransactionTypeComponentModule { }