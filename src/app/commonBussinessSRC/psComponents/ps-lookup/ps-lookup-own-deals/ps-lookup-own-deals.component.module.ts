import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexLookupComponentModule } from '../../ps-complex-components/ps-complex-lookup/ps-complex-lookup.component.module';
import { PsInputVarcharComponentModule } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsLookupOwnDealsComponent } from './ps-lookup-own-deals.component';

@NgModule({
    declarations: [
        PsLookupOwnDealsComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsInputVarcharComponentModule,
        PsComplexLookupComponentModule
    ],
    exports: [
        PsLookupOwnDealsComponent
    ],
    entryComponents: [
        PsLookupOwnDealsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLookupOwnDealsComponentModule { }
