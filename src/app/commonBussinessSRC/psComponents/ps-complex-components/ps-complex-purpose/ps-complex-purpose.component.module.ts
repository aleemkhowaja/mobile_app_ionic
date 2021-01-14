import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownPurposeComponentModule } from '../../ps-select-dropdown/ps-dropdown-purpose/ps-dropdown-purpose.component.module';
import { PsComplexPurposeComponent } from './ps-complex-purpose.component';

@NgModule({
  declarations: [PsComplexPurposeComponent],
  imports: [
    SharedModule,
    PsComponentsModule,
    PsDropdownPurposeComponentModule
  ],
  exports: [PsComplexPurposeComponent],
  entryComponents: [PsComplexPurposeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexPurposeModule { }
