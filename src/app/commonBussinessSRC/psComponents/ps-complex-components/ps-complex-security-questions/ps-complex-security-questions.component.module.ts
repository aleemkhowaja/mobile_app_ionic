import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsInputFreeTextComponentModule } from '../../ps-keyin-input/ps-input-free-text/ps-input-free-text.component.module';
import { PsDropdownSecurityQuestionComponentModule } from '../../ps-select-dropdown/ps-dropdown-security-question/ps-dropdown-security-question.component.module';
import { PsComplexSecurityQuestionComponent } from './ps-complex-security-questions.component';



@NgModule({
  declarations: [PsComplexSecurityQuestionComponent],
  imports: [
    SharedModule,
    PsComponentsModule,
    PsDropdownSecurityQuestionComponentModule,
    PsInputFreeTextComponentModule
  ],
  exports: [PsComplexSecurityQuestionComponent],
  entryComponents: [PsComplexSecurityQuestionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexSecurityQuestionComponentModule { }
