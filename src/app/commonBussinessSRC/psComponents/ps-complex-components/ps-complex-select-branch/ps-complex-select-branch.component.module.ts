import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComplexSelectBranchComponent } from './ps-complex-select-branch.component';
import { SharedModule } from '../../../../commonSRC/shared.module';
import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsComplexCountryRegionsCitiesComponentModule } from '../ps-complex-country-regions-cities/ps-complex-country-regions-cities.component.module';
import { PsDropdownBranchesComponentModule } from '../../ps-select-dropdown/ps-dropdown-branches/ps-dropdown-branches.component.module';

@NgModule({
    declarations: [
        PsComplexSelectBranchComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownBranchesComponentModule,
        PsComplexCountryRegionsCitiesComponentModule
    ],
    exports: [
        PsComplexSelectBranchComponent
    ],
    entryComponents: [PsComplexSelectBranchComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexSelectBranchComponentModule { }