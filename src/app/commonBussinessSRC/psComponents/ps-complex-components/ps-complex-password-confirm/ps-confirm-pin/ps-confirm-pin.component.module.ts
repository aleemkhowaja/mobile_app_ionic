import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexPasswordConfirmModule } from '../ps-complex-password-confirm.component.module';
import { PsComplexPinConfirmComponent } from './ps-confirm-pin.component';


@NgModule({
  declarations: [PsComplexPinConfirmComponent],
  imports: [
    SharedModule,
    PsComponentsModule,
    PsComplexPasswordConfirmModule
  ],
  exports: [PsComplexPinConfirmComponent],
  entryComponents: [PsComplexPinConfirmComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsConfirmPinModule { }
