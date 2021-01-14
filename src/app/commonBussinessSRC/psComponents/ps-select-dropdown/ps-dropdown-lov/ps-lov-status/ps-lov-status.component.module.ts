import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../../commonSRC/psComponents/ps-components.module';
import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovStatusComponent } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-status/ps-lov-status.component';


@NgModule({
    declarations: [PsLovStatusComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovStatusComponent],
    entryComponents: [PsLovStatusComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovStatusComponentModule { }
