import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovCreditAvailabilityComponent } from './ps-lov-credit-availability.component';




@NgModule({
    declarations: [PsLovCreditAvailabilityComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovCreditAvailabilityComponent],
    entryComponents: [PsLovCreditAvailabilityComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovCreditAvailabilityComponentModule { }