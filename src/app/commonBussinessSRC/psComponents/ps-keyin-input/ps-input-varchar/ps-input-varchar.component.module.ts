import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsInputVarcharComponent } from './ps-input-varchar.component';

@NgModule({
    declarations: [
        PsInputVarcharComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsInputVarcharComponent
    ],
    entryComponents: [
        PsInputVarcharComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsInputVarcharComponentModule { }
