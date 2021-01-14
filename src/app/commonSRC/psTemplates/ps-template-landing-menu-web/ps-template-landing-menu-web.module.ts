import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsButtonLogoutModule } from 'src/app/commonBussinessSRC/psComponents/ps-action-button/ps-button-logout/ps-button-logout.component.Module';
import { PsNotificationDefaultedComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-button-notification/ps-notification-defaulted/ps-notification-defaulted.component.module';
import { PsComplexFindCIFComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-find-CIF/ps-complex-find-CIF.component.module';
import { PsComplexInfoComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-info/ps-complex-info.component.module';
import { PsComplexMenuHeaderContainerModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-menu-header-container/ps-complex-menu-header-container.module';
import { PsComplexMenuReachComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-menu-reach/ps-complex-menu-reach.component.module';
import { PsComplexMenuModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-menu/ps-complex-menu.component.module';
import { PsComplexProfileComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-profile/ps-complex-profile.component.module';
import { PsComplexUserProfileMenuModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-user-profile-menu/ps-complex-user-profile-menu.module';

import { PsComponentsModule } from '../../psComponents/ps-components.module';
import { SharedModule } from '../../shared.module';
import { PsTemplateBasePageModule } from '../ps-template-base/ps-template-base.module';
import { PsTemplateLandingMenuWebPage } from './ps-template-landing-menu-web.page';


@NgModule({
  imports: [
    SharedModule,
    PsComponentsModule,
    CommonModule,
    PsComplexUserProfileMenuModule,
    PsComplexMenuHeaderContainerModule,
    PsButtonLogoutModule,
    PsComplexMenuModule,
    PsComplexMenuReachComponentModule,
    PsTemplateBasePageModule,
    PsComplexProfileComponentModule,
    PsComplexInfoComponentModule,
    PsComplexFindCIFComponentModule,
    PsNotificationDefaultedComponentModule
  ],
  declarations: [PsTemplateLandingMenuWebPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [PsTemplateLandingMenuWebPage],
  entryComponents: [PsTemplateLandingMenuWebPage],
})
export class PsTemplateLandingMenuWebPageModule { }
