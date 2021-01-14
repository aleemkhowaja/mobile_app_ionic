import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { PsComponentsModule } from '../../psComponents/ps-components.module';
import { SharedModule } from '../../shared.module';
import { PsComplexPreview } from './ps-complex-preview.template';

@NgModule({
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    declarations: [PsComplexPreview],
    exports: [PsComplexPreview],
    entryComponents: [PsComplexPreview],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class PsComplexPreviewModule { }
