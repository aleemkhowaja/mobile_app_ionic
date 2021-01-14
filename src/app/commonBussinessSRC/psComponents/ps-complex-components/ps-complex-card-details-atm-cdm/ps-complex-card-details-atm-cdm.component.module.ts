import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from './../../../../commonSRC/psComponents/ps-components.module';
import { PsComplexCardDetailAtmCdmComponent } from './ps-complex-card-detail-atm-cdm.component';

@NgModule({
    declarations: [PsComplexCardDetailAtmCdmComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [PsComplexCardDetailAtmCdmComponent],
    entryComponents: [PsComplexCardDetailAtmCdmComponent],
    imports: [SharedModule, PsComponentsModule]
})
export class PsComplexCardDetailsAtmCdmComponentModule {

}
