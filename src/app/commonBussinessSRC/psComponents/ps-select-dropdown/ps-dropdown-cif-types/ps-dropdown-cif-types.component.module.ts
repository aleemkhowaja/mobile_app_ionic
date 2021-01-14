import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownCifTypesComponent } from './ps-dropdown-cif-types.component';

@NgModule({
    declarations: [PsDropdownCifTypesComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsDropdownCifTypesComponent],
    entryComponents: [PsDropdownCifTypesComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownCifTypesComponentModule { }
