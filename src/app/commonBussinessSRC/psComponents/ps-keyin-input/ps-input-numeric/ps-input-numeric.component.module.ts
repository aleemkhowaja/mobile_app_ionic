import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsInputNumericComponent } from './ps-input-numeric.component';


@NgModule({
  declarations: [PsInputNumericComponent],
  imports: [
    SharedModule,
    PsComponentsModule
  ],
  exports: [PsInputNumericComponent],
  entryComponents: [PsInputNumericComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsInputNumericComponentModule { }
