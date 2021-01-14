import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsDropdownCountryComponent } from './ps-dropdown-country.component';

@NgModule({
    declarations: [PsDropdownCountryComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsDropdownCountryComponent],
    entryComponents: [PsDropdownCountryComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownCountryComponentModule { }
