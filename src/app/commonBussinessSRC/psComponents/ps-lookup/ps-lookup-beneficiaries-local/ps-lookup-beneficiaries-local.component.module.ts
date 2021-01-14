import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexLookupComponentModule } from '../../ps-complex-components/ps-complex-lookup/ps-complex-lookup.component.module';
import { PsLookupBeneficiariesLocalComponent } from './ps-lookup-beneficiaries-local.component';

@NgModule({
    declarations: [
        PsLookupBeneficiariesLocalComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsComplexLookupComponentModule
    ],
    exports: [
        PsLookupBeneficiariesLocalComponent
    ],
    entryComponents: [
        PsLookupBeneficiariesLocalComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLookupBeneficiariesLocalComponentModule { }
