import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownBranchesComponent } from './ps-dropdown-branches.component';

@NgModule({
    declarations: [PsDropdownBranchesComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsDropdownBranchesComponent],
    entryComponents: [PsDropdownBranchesComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownBranchesComponentModule { }