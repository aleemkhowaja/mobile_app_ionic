import { PsInputVarcharComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsLabelCifBranchComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-label/ps-label-cif-branch/ps-label-cif-branch.component.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsInputCountComponentModule } from '../../ps-keyin-input/ps-input-count/ps-input-count.component.module';
import { PsDropdownProductTypesComponentModule } from '../../ps-select-dropdown/ps-dropdown-product-types/ps-dropdown-product-types.component.module';
import { PsComplexAmountComponentModule } from './../ps-complex-amount/ps-complex-amount.component.module';
import { PsComplexFacilityRequestComponent } from './ps-complex-facility-request.component';
import { PsDropdownFacilityTypesComponentModule } from '../../ps-select-dropdown/ps-dropdown-facility-types/ps-dropdown-facility-types.component.module';

@NgModule({
  declarations: [
    PsComplexFacilityRequestComponent
  ],
  imports: [
    SharedModule,
    PsComponentsModule,
    PsDropdownProductTypesComponentModule,
    PsComplexAmountComponentModule,
    PsInputCountComponentModule,
    PsDropdownFacilityTypesComponentModule,
    PsLabelCifBranchComponentModule,
    PsInputVarcharComponentModule
  ],
  exports: [
    PsComplexFacilityRequestComponent
  ],
  entryComponents: [
    PsComplexFacilityRequestComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexFacilityRequestComponentModule { }
