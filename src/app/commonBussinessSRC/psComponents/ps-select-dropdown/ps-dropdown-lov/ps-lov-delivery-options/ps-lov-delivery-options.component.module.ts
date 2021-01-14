import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../../commonSRC/psComponents/ps-components.module';
import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovDeliveryOptionsComponent } from './ps-lov-delivery-options.component';

@NgModule({
    declarations: [PsLovDeliveryOptionsComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovDeliveryOptionsComponent],
    entryComponents: [PsLovDeliveryOptionsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovDeliveryOptionsComponentModule { }
