import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexLookupComponentModule } from '../../ps-complex-components/ps-complex-lookup/ps-complex-lookup.component.module';
import { PsLookupBeneficiariesInternalComponent } from './ps-lookup-beneficiaries-internal.component';

@NgModule({
    declarations: [
        PsLookupBeneficiariesInternalComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsComplexLookupComponentModule
    ],
    exports: [
        PsLookupBeneficiariesInternalComponent
    ],
    entryComponents: [
        PsLookupBeneficiariesInternalComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLookupBeneficiariesInternalComponentModule { }
