import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';
import { PsSplashScreenPage } from './ps-splash-screen.page';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [PsSplashScreenPage],
  exports: [PsSplashScreenPage],
  entryComponents: [PsSplashScreenPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsSplashScreenPageModule {}
