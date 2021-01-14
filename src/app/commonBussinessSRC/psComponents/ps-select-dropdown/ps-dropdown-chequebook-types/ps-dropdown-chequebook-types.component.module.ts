import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownChequebookTypesComponent } from './ps-dropdown-chequebook-types.component';

@NgModule({
    declarations: [PsDropdownChequebookTypesComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsDropdownChequebookTypesComponent],
    entryComponents: [PsDropdownChequebookTypesComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownChequebookTypesComponentModule { }