import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsDropdownCountryCodeComponentModule } from '../../ps-select-dropdown/ps-dropdown-country-code/ps-dropdown-country-code.component.module';
import { PsEntityPhoneNumberComponent } from './ps-entity-phone-number.component';


@NgModule({
    declarations: [PsEntityPhoneNumberComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownCountryCodeComponentModule
    ],
    exports: [PsEntityPhoneNumberComponent],
    entryComponents: [PsEntityPhoneNumberComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsEntityPhoneNumberComponentModule { }
