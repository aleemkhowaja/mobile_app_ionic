import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexCardDetailsAtmCdmComponentModule } from '../ps-complex-components/ps-complex-card-details-atm-cdm/ps-complex-card-details-atm-cdm.component.module';
import { PsComplexCardDetailsBranchComponentModule } from '../ps-complex-components/ps-complex-card-details-branch/ps-complex-card-details-branch.component.module';
import { PsSegmentAtmCdmBranchesComponentModule } from '../ps-select-segment/ps-segment-atm-cdm-branches/ps-segment-atm-cdm-branches.component.module';
import { PsMapAtmBranchesComponent } from './ps-map-atm-branches.component';


@NgModule({
    declarations: [
        PsMapAtmBranchesComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsComplexCardDetailsBranchComponentModule,
        PsComplexCardDetailsAtmCdmComponentModule,
        PsSegmentAtmCdmBranchesComponentModule
    ],
    exports: [
        PsMapAtmBranchesComponent
    ],
    entryComponents: [
        PsMapAtmBranchesComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsMapAtmBranchesComponentModule { }
