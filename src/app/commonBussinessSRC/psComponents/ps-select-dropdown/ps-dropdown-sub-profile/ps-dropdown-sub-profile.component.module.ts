import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownSubProfileComponent } from './ps-dropdown-sub-profile.component';

@NgModule({
  declarations: [PsDropdownSubProfileComponent],
  imports: [
    SharedModule,
    PsComponentsModule
  ],
  exports: [PsDropdownSubProfileComponent],
  entryComponents: [PsDropdownSubProfileComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownSubProfileComponentModule { }
