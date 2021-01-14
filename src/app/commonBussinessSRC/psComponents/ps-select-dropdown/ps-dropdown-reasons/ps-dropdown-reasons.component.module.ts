import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownReasonsComponent } from './ps-dropdown-reasons.component';

@NgModule({
    declarations: [
        PsDropdownReasonsComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsDropdownReasonsComponent
    ],
    entryComponents: [
        PsDropdownReasonsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownReasonsComponentModule { }