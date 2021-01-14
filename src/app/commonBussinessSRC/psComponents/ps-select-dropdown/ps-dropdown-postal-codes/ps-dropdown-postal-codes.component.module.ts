import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownPostalCodesComponent } from './ps-dropdown-postal-codes.component';

@NgModule({
    declarations: [
        PsDropdownPostalCodesComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsDropdownPostalCodesComponent
    ],
    entryComponents: [
        PsDropdownPostalCodesComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownPostalCodesComponentModule { }