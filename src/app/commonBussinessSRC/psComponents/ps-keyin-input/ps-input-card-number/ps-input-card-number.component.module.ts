import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsInputCardNumberComponent } from './ps-input-card-number.component';

@NgModule({
    declarations: [
        PsInputCardNumberComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsInputCardNumberComponent
    ],
    entryComponents: [
        PsInputCardNumberComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsInputCardNumberComponentModule { }
