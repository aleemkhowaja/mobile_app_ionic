import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovFileTypesComponent } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-file-types/ps-lov-file-types.component';



@NgModule({
    declarations: [PsLovFileTypesComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovFileTypesComponent],
    entryComponents: [PsLovFileTypesComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovFileTypesComponentModule { }