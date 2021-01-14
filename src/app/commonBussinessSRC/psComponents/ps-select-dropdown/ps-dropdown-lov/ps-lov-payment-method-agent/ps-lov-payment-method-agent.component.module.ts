import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../../commonSRC/psComponents/ps-components.module';
import { PsDropdownLovComponentModule } from '../ps-dropdown-lov.component.module';
import { PsLovPaymentMethodAgentComponent } from './ps-lov-payment-method-agent.component';

@NgModule({
    declarations: [PsLovPaymentMethodAgentComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsDropdownLovComponentModule
    ],
    exports: [PsLovPaymentMethodAgentComponent],
    entryComponents: [PsLovPaymentMethodAgentComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLovPaymentMethodAgentComponentModule { }
