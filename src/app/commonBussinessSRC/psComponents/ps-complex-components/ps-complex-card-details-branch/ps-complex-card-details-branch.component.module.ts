import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from './../../../../commonSRC/psComponents/ps-components.module';
import { PsComplexCardDetailsBranchComponent } from './ps-complex-card-details-branch.component';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [PsComplexCardDetailsBranchComponent],
    exports: [PsComplexCardDetailsBranchComponent],
    entryComponents: [PsComplexCardDetailsBranchComponent],
    imports: [SharedModule, PsComponentsModule],
})
export class PsComplexCardDetailsBranchComponentModule {

}