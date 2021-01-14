import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PsTemplateLoginPageModule } from '../../commonSRC/psTemplates/ps-template-login/ps-template-login.module';
import { SharedModule } from '../../commonSRC/shared.module';
import { PsComponentsModule } from './../../commonSRC/psComponents/ps-components.module';
import { OmniLoginPage } from './omni-login.page';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: OmniLoginPage
      }
    ]),
    SharedModule,
    PsTemplateLoginPageModule,
    PsComponentsModule
  ],
  declarations: [OmniLoginPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OmniLoginPageModule { }
