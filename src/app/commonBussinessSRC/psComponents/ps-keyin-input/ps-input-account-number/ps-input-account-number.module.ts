import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsInputAccountNumberComponent } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-account-number/ps-input-account-number.component';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from './../../../../commonSRC/psComponents/ps-components.module';

@NgModule({
    declarations: [
        PsInputAccountNumberComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsInputAccountNumberComponent
    ],
    entryComponents: [PsInputAccountNumberComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsInputAccountNumberComponentModule { }