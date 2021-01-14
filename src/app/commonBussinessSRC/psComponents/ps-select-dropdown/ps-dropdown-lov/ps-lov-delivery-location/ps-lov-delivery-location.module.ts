import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovDeliveryLocationComponent } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-delivery-location/ps-lov-delivery-location.component';



@NgModule({
    declarations: [PsLovDeliveryLocationComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovDeliveryLocationComponent],
    entryComponents: [PsLovDeliveryLocationComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovDeliveryLocationComponentModule { }