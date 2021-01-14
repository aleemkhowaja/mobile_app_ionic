import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovABOrignalForComponent } from './ps-lov-ab-orignal-for.component';




@NgModule({
    declarations: [PsLovABOrignalForComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovABOrignalForComponent],
    entryComponents: [PsLovABOrignalForComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovABOrignalForComponentModule { }