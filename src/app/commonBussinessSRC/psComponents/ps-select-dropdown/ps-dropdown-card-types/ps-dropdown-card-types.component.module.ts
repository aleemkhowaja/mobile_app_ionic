import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownCardTypesComponent } from './ps-dropdown-card-types.component';

@NgModule({
    declarations: [PsDropdownCardTypesComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsDropdownCardTypesComponent],
    entryComponents: [PsDropdownCardTypesComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownCardTypesComponentModule { }
