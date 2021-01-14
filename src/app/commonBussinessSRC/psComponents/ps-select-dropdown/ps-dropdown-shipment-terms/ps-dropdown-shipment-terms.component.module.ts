import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownShipmentTermsComponent } from './ps-dropdown-shipment-terms.component';



@NgModule({
    declarations: [
        PsDropdownShipmentTermsComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule
    ],
    exports: [
        PsDropdownShipmentTermsComponent
    ],
    entryComponents: [
        PsDropdownShipmentTermsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownShipmentTermsComponentModule { }