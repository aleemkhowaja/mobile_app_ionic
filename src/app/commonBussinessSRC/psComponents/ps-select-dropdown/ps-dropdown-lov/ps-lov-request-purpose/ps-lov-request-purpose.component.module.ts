import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovRequestPurposeComponent } from './ps-lov-request-purpose.component';




@NgModule({
    declarations: [PsLovRequestPurposeComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovRequestPurposeComponent],
    entryComponents: [PsLovRequestPurposeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovRequestPurposeComponentModule { }