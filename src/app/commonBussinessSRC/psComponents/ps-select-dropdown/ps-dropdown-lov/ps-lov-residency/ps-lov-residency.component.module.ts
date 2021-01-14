import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../../commonSRC/psComponents/ps-components.module';
import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovResidencyComponent } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-residency/ps-lov-residency.component';


@NgModule({
    declarations: [PsLovResidencyComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovResidencyComponent],
    entryComponents: [PsLovResidencyComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovResidencyComponentModule { }
