import { PsInputNumericComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-numeric/ps-input-numeric.component.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexCreditAvailabilityComponent } from './ps-complex-credit-availability.component';
import { PsLovCreditAvailabilityComponentModule } from '../../ps-select-dropdown/ps-dropdown-lov/ps-lov-credit-availability/ps-lov-credit-availability.component.module';

@NgModule({
  declarations: [
    PsComplexCreditAvailabilityComponent
  ],
  imports: [
    SharedModule,
    PsComponentsModule,
    PsLovCreditAvailabilityComponentModule,
    PsInputNumericComponentModule
],
exports: [
  PsComplexCreditAvailabilityComponent
],
entryComponents: [
  PsComplexCreditAvailabilityComponent
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexCreditAvailabilityComponentModule { }