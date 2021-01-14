import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovMaterialFromOtherCountryComponent } from './ps-lov-material-from-other-country.component';




@NgModule({
    declarations: [PsLovMaterialFromOtherCountryComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovMaterialFromOtherCountryComponent],
    entryComponents: [PsLovMaterialFromOtherCountryComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovMaterialFromOtherCountryComponentModule { }