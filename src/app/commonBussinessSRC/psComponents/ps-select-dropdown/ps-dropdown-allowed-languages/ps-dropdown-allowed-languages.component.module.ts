import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDropdownAllowedLanguagesComponent } from './ps-dropdown-allowed-languages.component';

@NgModule({
  declarations: [PsDropdownAllowedLanguagesComponent],
  imports: [
    SharedModule,
    PsComponentsModule
  ],
  exports: [PsDropdownAllowedLanguagesComponent],
  entryComponents: [PsDropdownAllowedLanguagesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownAllowedLanguagesComponentModule { }
