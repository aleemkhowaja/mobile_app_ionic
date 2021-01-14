import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexFacilityAmountsComponent } from './ps-complex-facility-amounts.component';

@NgModule({
  declarations: [
    PsComplexFacilityAmountsComponent
  ],
  imports: [
    SharedModule,
    PsComponentsModule
  ],
  exports: [
    PsComplexFacilityAmountsComponent
  ],
  entryComponents: [
    PsComplexFacilityAmountsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexFacilityAmountsComponentModule { }
