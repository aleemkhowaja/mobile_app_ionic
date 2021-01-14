import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';

import { SharedModule } from './../../../../commonSRC/shared.module';
import { PsCaptchaComponentModule } from './../../ps-captcha/ps-captcha.component.module';
import { PsAuthenticationMatrixComponent } from './ps-authentication-matrix.component';

@NgModule({
  declarations: [PsAuthenticationMatrixComponent],
  imports: [
    PsComponentsModule,
    SharedModule,
    PsCaptchaComponentModule
  ],
  exports: [PsAuthenticationMatrixComponent],
  entryComponents: [PsAuthenticationMatrixComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsAuthenticationMatrixComponentModule { }
