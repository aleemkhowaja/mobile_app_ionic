import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsInputCardCvvComponent } from './ps-input-card-cvv.component';

@NgModule({
    declarations: [
        PsInputCardCvvComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsInputCardCvvComponent
    ],
    entryComponents: [
        PsInputCardCvvComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsInputCardCvvComponentModule { }
