import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../../commonSRC/psComponents/ps-components.module';
import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovPaymentMethodIndividualComponent } from './ps-lov-payment-method-individual.component';

@NgModule({
    declarations: [PsLovPaymentMethodIndividualComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovPaymentMethodIndividualComponent],
    entryComponents: [PsLovPaymentMethodIndividualComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovPaymentMethodIndividualComponentModule { }
