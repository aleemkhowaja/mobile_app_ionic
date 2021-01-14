import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsDropdownLovComponent } from './ps-dropdown-lov.component';

@NgModule({
    declarations: [PsDropdownLovComponent],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [PsDropdownLovComponent],
    entryComponents: [PsDropdownLovComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownLovComponentModule { }
