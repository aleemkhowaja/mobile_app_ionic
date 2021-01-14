import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexPasswordConfirmComponent } from './ps-complex-password-confirm.component';




@NgModule({
  declarations: [PsComplexPasswordConfirmComponent],
  imports: [
    SharedModule,
    PsComponentsModule,
  ],
  exports: [PsComplexPasswordConfirmComponent],
  entryComponents: [PsComplexPasswordConfirmComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexPasswordConfirmModule { }
