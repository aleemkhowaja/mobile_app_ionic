import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsDropdownProductTypesComponent } from './ps-dropdown-product-types.component';

@NgModule({
  declarations: [
    PsDropdownProductTypesComponent
  ],
  imports: [
    SharedModule,
    PsComponentsModule
  ],
  exports: [
    PsDropdownProductTypesComponent
  ],
  entryComponents: [
    PsDropdownProductTypesComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownProductTypesComponentModule { }
