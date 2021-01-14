import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsInputNumericComponentModule } from '../ps-input-numeric/ps-input-numeric.component.module';
import { PsInputCountComponent } from './ps-input-count.component';


@NgModule({
  declarations: [PsInputCountComponent],
  imports: [
    SharedModule,
    PsComponentsModule,
    PsInputNumericComponentModule
  ],
  exports: [PsInputCountComponent],
  entryComponents: [PsInputCountComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsInputCountComponentModule { }
