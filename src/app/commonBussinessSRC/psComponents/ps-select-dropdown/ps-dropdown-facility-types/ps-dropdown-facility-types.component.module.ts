import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsDropdownFacilityTypesComponent } from './ps-dropdown-facility-types.component';

@NgModule({
  declarations: [
    PsDropdownFacilityTypesComponent
  ],
  imports: [
    SharedModule,
    PsComponentsModule
  ],
  exports: [
    PsDropdownFacilityTypesComponent
  ],
  entryComponents: [
    PsDropdownFacilityTypesComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownFacilityTypesComponentModule { }
