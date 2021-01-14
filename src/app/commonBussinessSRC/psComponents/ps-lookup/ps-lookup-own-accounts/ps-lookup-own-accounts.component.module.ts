import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexLookupComponentModule } from '../../ps-complex-components/ps-complex-lookup/ps-complex-lookup.component.module';
import { PsInputVarcharComponentModule } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsLookupOwnAccountsComponent } from './ps-lookup-own-accounts.component';

@NgModule({
    declarations: [
        PsLookupOwnAccountsComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsInputVarcharComponentModule,
        PsComplexLookupComponentModule
    ],
    exports: [
        PsLookupOwnAccountsComponent
    ],
    entryComponents: [
        PsLookupOwnAccountsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLookupOwnAccountComponentModule { }
