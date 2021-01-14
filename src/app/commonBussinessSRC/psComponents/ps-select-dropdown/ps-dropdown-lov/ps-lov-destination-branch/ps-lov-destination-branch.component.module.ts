import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovDestinationBranchComponent } from './ps-lov-destination-branch.component';



@NgModule({
    declarations: [PsLovDestinationBranchComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovDestinationBranchComponent],
    entryComponents: [PsLovDestinationBranchComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovDestinationBranchComponentModule { }