import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexLookupComponentModule } from '../../ps-complex-components/ps-complex-lookup/ps-complex-lookup.component.module';
import { PsLookupCreditCardsComponent } from './ps-lookup-credit-cards.component';

@NgModule({
    declarations: [
        PsLookupCreditCardsComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsComplexLookupComponentModule
    ],
    exports: [
        PsLookupCreditCardsComponent
    ],
    entryComponents: [
        PsLookupCreditCardsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLookupCreditCardsComponentModule { }
