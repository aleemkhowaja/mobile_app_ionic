import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsSegmentAtmCdmBranchesComponent } from './ps-segment-atm-cdm-branches.component';

@NgModule({
    declarations: [
        PsSegmentAtmCdmBranchesComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsSegmentAtmCdmBranchesComponent
    ],
    entryComponents: [
        PsSegmentAtmCdmBranchesComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsSegmentAtmCdmBranchesComponentModule { }
