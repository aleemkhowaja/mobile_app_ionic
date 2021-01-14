import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovIncotermsComponent } from './ps-lov-incoterms.component';




@NgModule({
    declarations: [PsLovIncotermsComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovIncotermsComponent],
    entryComponents: [PsLovIncotermsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovIncotermsComponentModule { }