import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsActionButtonEmailUsDefaultedComponent } from './ps-email-us-defaulted.component';

@NgModule({
  declarations: [PsActionButtonEmailUsDefaultedComponent],
  imports: [
    SharedModule,
    PsComponentsModule
  ],
  exports: [PsActionButtonEmailUsDefaultedComponent],
  entryComponents: [PsActionButtonEmailUsDefaultedComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsActionButtonEmailUsDefaultedModule { }