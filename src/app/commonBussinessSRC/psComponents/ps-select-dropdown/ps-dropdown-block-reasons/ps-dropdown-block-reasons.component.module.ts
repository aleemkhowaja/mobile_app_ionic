import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownCardBlockReasonsComponent } from './ps-dropdown-block-reasons.component';

@NgModule({
    declarations: [
        PsDropdownCardBlockReasonsComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsDropdownCardBlockReasonsComponent
    ],
    entryComponents: [
        PsDropdownCardBlockReasonsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownCardBlockReasonsComponentModule { }