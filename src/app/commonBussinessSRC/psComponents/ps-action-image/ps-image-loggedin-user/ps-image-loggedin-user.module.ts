import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsImageLoggedinUserComponent } from './ps-image-loggedin-user.component';

@NgModule({
  declarations: [PsImageLoggedinUserComponent],
  imports: [
    SharedModule,
    PsComponentsModule
  ],
  exports: [PsImageLoggedinUserComponent],
  entryComponents: [PsImageLoggedinUserComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsImageLoggedinUserModule { }
