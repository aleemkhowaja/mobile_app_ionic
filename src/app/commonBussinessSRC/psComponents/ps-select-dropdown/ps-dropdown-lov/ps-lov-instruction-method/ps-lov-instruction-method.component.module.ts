import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovInstructionMethodComponent } from './ps-lov-instruction-method.component';



@NgModule({
    declarations: [PsLovInstructionMethodComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovInstructionMethodComponent],
    entryComponents: [PsLovInstructionMethodComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovInstructionMethodComponentModule { }
