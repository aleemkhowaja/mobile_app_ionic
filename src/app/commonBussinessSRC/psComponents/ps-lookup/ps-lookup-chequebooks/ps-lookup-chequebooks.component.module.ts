import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexLookupComponentModule } from '../../ps-complex-components/ps-complex-lookup/ps-complex-lookup.component.module';
import { PsLookupChequebooksComponent } from './ps-lookup-chequebooks.component';

@NgModule({
    declarations: [
        PsLookupChequebooksComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsComplexLookupComponentModule,
    ],
    exports: [
        PsLookupChequebooksComponent
    ],
    entryComponents: [
        PsLookupChequebooksComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLookupChequebooksComponentModule { }
