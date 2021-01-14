import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexLookupComponentModule } from '../../ps-complex-components/ps-complex-lookup/ps-complex-lookup.component.module';
import { PsLookupDebitCardsComponent } from './ps-lookup-debit-cards.component';

@NgModule({
    declarations: [
        PsLookupDebitCardsComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsComplexLookupComponentModule
    ],
    exports: [
        PsLookupDebitCardsComponent
    ],
    entryComponents: [
        PsLookupDebitCardsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLookupDebitCardsComponentModule { }
