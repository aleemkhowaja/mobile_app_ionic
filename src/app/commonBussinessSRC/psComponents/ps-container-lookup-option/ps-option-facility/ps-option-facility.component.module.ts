import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from './../../../../commonSRC/psComponents/ps-components.module';
import { PsOptionFacilityComponent } from './ps-option-facility.component';

@NgModule({
    declarations: [PsOptionFacilityComponent],
    imports:
        [
            SharedModule,
            PsComponentsModule
        ],
    exports: [PsOptionFacilityComponent],
    entryComponents: [PsOptionFacilityComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsOptionFacilityComponentModule { }