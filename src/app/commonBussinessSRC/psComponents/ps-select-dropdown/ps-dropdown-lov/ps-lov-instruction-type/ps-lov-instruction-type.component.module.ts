import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovInstructionTypeComponent } from './ps-lov-instruction-type.component';

@NgModule({
    declarations: [PsLovInstructionTypeComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovInstructionTypeComponent],
    entryComponents: [PsLovInstructionTypeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovInstructionTypeComponentModule { }
