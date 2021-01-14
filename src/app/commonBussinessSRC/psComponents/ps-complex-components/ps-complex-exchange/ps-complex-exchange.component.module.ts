import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsComplexAmountComponentModule } from '../ps-complex-amount/ps-complex-amount.component.module';
import { PsComplexExchangeComponent } from './ps-complex-exchange.component';

@NgModule({
    declarations: [PsComplexExchangeComponent],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsComplexAmountComponentModule
    ],
    exports: [PsComplexExchangeComponent],
    entryComponents: [PsComplexExchangeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexExchangeComponentModule { }
