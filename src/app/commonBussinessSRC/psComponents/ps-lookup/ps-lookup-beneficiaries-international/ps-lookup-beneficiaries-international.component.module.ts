import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexLookupComponentModule } from '../../ps-complex-components/ps-complex-lookup/ps-complex-lookup.component.module';
import { PsLookupBeneficiariesInternationalComponent } from './ps-lookup-beneficiaries-international.component';

@NgModule({
    declarations: [
        PsLookupBeneficiariesInternationalComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsComplexLookupComponentModule
    ],
    exports: [
        PsLookupBeneficiariesInternationalComponent
    ],
    entryComponents: [
        PsLookupBeneficiariesInternationalComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLookupBeneficiariesInternationalComponentModule { }
