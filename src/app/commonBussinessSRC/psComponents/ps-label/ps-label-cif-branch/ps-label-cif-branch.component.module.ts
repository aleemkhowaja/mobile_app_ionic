import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsLabelCifBranchComponent } from './ps-label-cif-branch.component';

@NgModule({
    declarations: [
        PsLabelCifBranchComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
    ],
    exports: [
        PsLabelCifBranchComponent
    ],
    entryComponents: [
        PsLabelCifBranchComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLabelCifBranchComponentModule { }
