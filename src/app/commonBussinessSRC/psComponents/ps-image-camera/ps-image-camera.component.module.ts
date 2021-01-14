import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsImageCameraComponent } from './ps-image-camera.component';


@NgModule({
  declarations: [PsImageCameraComponent],
  imports: [
    SharedModule,
    PsComponentsModule
  ],
  exports: [PsImageCameraComponent],
  entryComponents: [PsImageCameraComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsImageCameraComponentModule { }
