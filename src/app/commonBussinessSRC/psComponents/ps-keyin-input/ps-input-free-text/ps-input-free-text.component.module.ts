import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsInputFreeTextComponent } from './ps-input-free-text.component';

@NgModule({
    declarations: [
        PsInputFreeTextComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsInputFreeTextComponent
    ],
    entryComponents: [
        PsInputFreeTextComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsInputFreeTextComponentModule { }
