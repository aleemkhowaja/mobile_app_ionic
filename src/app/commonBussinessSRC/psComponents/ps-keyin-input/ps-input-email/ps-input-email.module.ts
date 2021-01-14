import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsInputEmailComponent } from './ps-input-email.component';

@NgModule({
  declarations: [
    PsInputEmailComponent
  ],
  imports: [
    SharedModule,
    PsComponentsModule
  ],
  exports: [
    PsInputEmailComponent
  ],
  entryComponents: [PsInputEmailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsInputEmailComponentModule { }
