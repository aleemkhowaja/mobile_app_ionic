import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsComplexPasswordConfirmModule } from '../ps-complex-password-confirm/ps-complex-password-confirm.component.module';
import { PsConfirmPinModule } from '../ps-complex-password-confirm/ps-confirm-pin/ps-confirm-pin.component.module';
import { PsComplexSecurityQuestionComponentModule } from '../ps-complex-security-questions/ps-complex-security-questions.component.module';
import { PsComplexUserCredentialsComponent } from './ps-complex-user-credentials.component';



@NgModule({
  declarations: [PsComplexUserCredentialsComponent],
  imports: [
    SharedModule,
    PsComponentsModule,
    PsComplexPasswordConfirmModule,
    PsComplexSecurityQuestionComponentModule,
    PsConfirmPinModule
  ],
  exports: [PsComplexUserCredentialsComponent],
  entryComponents: [PsComplexUserCredentialsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexUserCredentialsComponentModule { }
