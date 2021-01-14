import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsInputFreeTextComponentModule } from '../../ps-keyin-input/ps-input-free-text/ps-input-free-text.component.module';
import { PsInputNumericComponentModule } from '../../ps-keyin-input/ps-input-numeric/ps-input-numeric.component.module';
import { PsInputVarcharComponentModule } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsDropdownCitiesComponentModule } from '../../ps-select-dropdown/ps-dropdown-cities/ps-dropdown-cities.component.module';
import { PsDropdownCountryComponentModule } from '../../ps-select-dropdown/ps-dropdown-country/ps-dropdown-country.component.module';
import { PsDropdownPostalCodesComponentModule } from '../../ps-select-dropdown/ps-dropdown-postal-codes/ps-dropdown-postal-codes.component.module';
import { PsDropdownRegionsComponentModule } from '../../ps-select-dropdown/ps-dropdown-regions/ps-dropdown-regions.component.module';
import { PsComplexPoBoxComponentModule } from '../ps-complex-po-box/ps-complex-po-box.component.module';
import { PsComplexAddressComponent } from './ps-complex-address.component';
import { PsComplexCountryRegionsCitiesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-country-regions-cities/ps-complex-country-regions-cities.component.module';

@NgModule({
    declarations: [
        PsComplexAddressComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsInputFreeTextComponentModule,
        PsDropdownCountryComponentModule,
        PsInputNumericComponentModule,
        PsDropdownRegionsComponentModule,
        PsDropdownCitiesComponentModule,
        PsDropdownPostalCodesComponentModule,
        PsComplexPoBoxComponentModule,
        PsInputVarcharComponentModule,
        PsComplexCountryRegionsCitiesComponentModule
    ],
    exports: [
        PsComplexAddressComponent
    ],
    entryComponents: [
        PsComplexAddressComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

// Author: GRadwan 16/01/2020
export class PsComplexAddressComponentModule { }
