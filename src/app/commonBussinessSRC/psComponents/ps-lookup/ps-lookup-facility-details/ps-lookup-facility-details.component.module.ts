import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexLookupComponentModule } from '../../ps-complex-components/ps-complex-lookup/ps-complex-lookup.component.module';
import { PsLookupFacilityDetailsComponent } from './ps-lookup-facility-details.component';
import { PsOptionFacilityComponentModule } from '../../ps-container-lookup-option/ps-option-facility/ps-option-facility.component.module';

@NgModule({
    declarations: [
        PsLookupFacilityDetailsComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsComplexLookupComponentModule,
        PsOptionFacilityComponentModule
    ],
    exports: [
        PsLookupFacilityDetailsComponent
    ],
    entryComponents: [
        PsLookupFacilityDetailsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsLookupFacilityDetailsComponentModule { }
