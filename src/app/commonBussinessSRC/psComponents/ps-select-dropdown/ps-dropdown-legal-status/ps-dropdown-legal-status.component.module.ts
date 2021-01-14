import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownLegalStatusComponent } from './ps-dropdown-legal-status.component';

@NgModule({
    declarations: [PsDropdownLegalStatusComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsDropdownLegalStatusComponent],
    entryComponents: [PsDropdownLegalStatusComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownLegalStatusComponentModule { }