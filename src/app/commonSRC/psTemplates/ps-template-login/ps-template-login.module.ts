import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PsComplexMenuHeaderContainerModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-menu-header-container/ps-complex-menu-header-container.module';

import { PsComponentsModule } from '../../psComponents/ps-components.module';
import { SharedModule } from '../../shared.module';
import { PsTemplateBasePageModule } from '../ps-template-base/ps-template-base.module';
import { PsTemplateLoginPage } from './ps-template-login.page';

@NgModule({
  imports: [
    SharedModule,
    PsComponentsModule,
    RouterModule,
    PsTemplateBasePageModule,
    PsComplexMenuHeaderContainerModule
  ],
  declarations: [PsTemplateLoginPage],
  exports: [PsTemplateLoginPage],
  entryComponents: [PsTemplateLoginPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsTemplateLoginPageModule { }
