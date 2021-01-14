import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateLandingMainPageModule } from 'src/app/commonSRC/psTemplates/ps-template-landing-main/ps-template-landing-main.module';
import { PsTemplateLandingWebPageModule } from 'src/app/commonSRC/psTemplates/ps-template-landing-web/ps-template-landing-web.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    PsTemplateLandingMainPageModule,
    PsTemplateLandingWebPageModule,
    PsComponentsModule
  ],
  declarations: [HomePage],
  exports: [HomePage],
  entryComponents: [HomePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule { }
