import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsGalleryVerificationImagesComponent } from './ps-gallery-verification-images.component';

@NgModule({
  declarations: [PsGalleryVerificationImagesComponent],
  imports: [
    SharedModule,
    PsComponentsModule
  ],
  exports: [PsGalleryVerificationImagesComponent],
  entryComponents: [PsGalleryVerificationImagesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsGalleryVerificationImagesModule { }
