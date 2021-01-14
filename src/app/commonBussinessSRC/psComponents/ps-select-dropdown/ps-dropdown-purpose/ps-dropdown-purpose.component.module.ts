import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownPurposeComponent } from './ps-dropdown-purpose.component';

@NgModule({
    declarations: [
        PsDropdownPurposeComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsDropdownPurposeComponent
    ],
    entryComponents: [
        PsDropdownPurposeComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownPurposeComponentModule { }