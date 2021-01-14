import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexInfoComponent } from './ps-complex-info.component';


@NgModule({
    declarations: [
        PsComplexInfoComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
    ],
    exports: [
        PsComplexInfoComponent
    ],
    entryComponents: [
        PsComplexInfoComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexInfoComponentModule { }