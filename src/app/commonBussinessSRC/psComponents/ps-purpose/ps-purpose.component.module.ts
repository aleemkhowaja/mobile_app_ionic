import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsPurposeComponent } from './ps-purpose.component';

@NgModule({
    declarations: [
        PsPurposeComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsPurposeComponent
    ],
    entryComponents: [
        PsPurposeComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsPurposeComponentModule { }
