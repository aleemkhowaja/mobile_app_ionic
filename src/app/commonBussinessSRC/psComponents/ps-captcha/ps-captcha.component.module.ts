import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsCaptchaComponent } from './ps-captcha.component';


@NgModule({
  declarations: [PsCaptchaComponent],
  imports: [
    SharedModule,
    PsComponentsModule,

  ],
  exports: [PsCaptchaComponent],
  entryComponents: [PsCaptchaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsCaptchaComponentModule { }