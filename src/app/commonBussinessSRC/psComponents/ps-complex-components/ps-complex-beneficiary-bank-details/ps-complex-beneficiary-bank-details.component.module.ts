import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsInputVarcharComponentModule } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsDropdownCitiesComponentModule } from '../../ps-select-dropdown/ps-dropdown-cities/ps-dropdown-cities.component.module';
import { PsDropdownCountryComponentModule } from '../../ps-select-dropdown/ps-dropdown-country/ps-dropdown-country.component.module';
import { PsDropdownRegionsComponentModule } from '../../ps-select-dropdown/ps-dropdown-regions/ps-dropdown-regions.component.module';
import { PsComplexBeneficiaryBankDetailsComponent } from './ps-complex-beneficiary-bank-details.component';
import { PsComplexCountryRegionsCitiesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-country-regions-cities/ps-complex-country-regions-cities.component.module';

@NgModule({
    declarations: [
        PsComplexBeneficiaryBankDetailsComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsInputVarcharComponentModule,
        PsDropdownCountryComponentModule,
        PsDropdownRegionsComponentModule,
        PsDropdownCitiesComponentModule,
        PsComplexCountryRegionsCitiesComponentModule
    ],
    exports: [
        PsComplexBeneficiaryBankDetailsComponent
    ],
    entryComponents: [PsComplexBeneficiaryBankDetailsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexBeneficiaryBankDetailsComponentModule { }
