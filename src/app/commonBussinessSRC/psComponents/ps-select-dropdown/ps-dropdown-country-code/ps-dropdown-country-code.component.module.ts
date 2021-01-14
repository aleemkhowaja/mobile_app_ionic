import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsDropdownCountryCodeComponent } from './ps-dropdown-country-code.component';

@NgModule({
    declarations: [PsDropdownCountryCodeComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsDropdownCountryCodeComponent],
    entryComponents: [PsDropdownCountryCodeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownCountryCodeComponentModule { }
