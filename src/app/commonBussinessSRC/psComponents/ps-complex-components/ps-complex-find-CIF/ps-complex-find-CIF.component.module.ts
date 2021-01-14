import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsInputVarcharComponentModule } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsComplexFindCIFComponent } from './ps-complex-find-CIF.component';

@NgModule({
    declarations: [
        PsComplexFindCIFComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsInputVarcharComponentModule
    ],
    exports: [
        PsComplexFindCIFComponent
    ],
    entryComponents: [
        PsComplexFindCIFComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexFindCIFComponentModule { }
