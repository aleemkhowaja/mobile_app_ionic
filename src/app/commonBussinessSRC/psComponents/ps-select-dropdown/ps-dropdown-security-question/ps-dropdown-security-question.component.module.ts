import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsDropdownSecurityQuestionComponent } from './ps-dropdown-security-question.component';


@NgModule({
  declarations: [PsDropdownSecurityQuestionComponent],
  imports: [
    SharedModule,
    PsComponentsModule
  ],
  exports: [PsDropdownSecurityQuestionComponent],
  entryComponents: [PsDropdownSecurityQuestionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsDropdownSecurityQuestionComponentModule { }
