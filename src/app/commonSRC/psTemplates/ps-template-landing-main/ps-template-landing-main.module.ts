import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';
import { PsTemplateLandingFabUiPageModule } from '../ps-template-landing-fab-ui/ps-template-landing-fab-ui.module';
import { PsTemplateLandingMenuWebPageModule } from '../ps-template-landing-menu-web/ps-template-landing-menu-web.module';
import { PsTemplateLandingPageModule } from '../ps-template-landing/ps-template-landing.module';
import { PsTemplateLandingMainPage } from './ps-template-landing-main.page';


@NgModule({
  imports: [
    SharedModule,
    PsTemplateLandingPageModule,
    PsTemplateLandingFabUiPageModule,
    PsTemplateLandingMenuWebPageModule
  ],
  declarations: [PsTemplateLandingMainPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [PsTemplateLandingMainPage],
  entryComponents: [PsTemplateLandingMainPage],
})
export class PsTemplateLandingMainPageModule { }
