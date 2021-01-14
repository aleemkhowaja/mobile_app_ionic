import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovAmountToleranceComponent } from './ps-lov-amount-tolerance.component';




@NgModule({
    declarations: [PsLovAmountToleranceComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovAmountToleranceComponent],
    entryComponents: [PsLovAmountToleranceComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovAmountToleranceComponentModule { }