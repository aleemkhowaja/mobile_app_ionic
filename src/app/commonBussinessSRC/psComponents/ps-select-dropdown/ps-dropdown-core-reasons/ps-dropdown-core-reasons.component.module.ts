import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownCoreReasonsComponent } from './ps-dropdown-core-reasons.component';

@NgModule({
    declarations: [
        PsDropdownCoreReasonsComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsDropdownCoreReasonsComponent
    ],
    entryComponents: [
        PsDropdownCoreReasonsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownCoreReasonsComponentModule { }