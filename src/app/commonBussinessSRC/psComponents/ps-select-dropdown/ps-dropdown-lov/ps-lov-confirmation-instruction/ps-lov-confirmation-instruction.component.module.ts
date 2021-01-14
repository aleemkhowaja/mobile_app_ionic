import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovConfirmationInstructionComponent } from './ps-lov-confirmation-instruction.component';




@NgModule({
    declarations: [PsLovConfirmationInstructionComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovConfirmationInstructionComponent],
    entryComponents: [PsLovConfirmationInstructionComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovConfirmationInstructionComponentModule { }