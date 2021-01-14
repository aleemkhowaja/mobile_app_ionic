import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsButtonLogoutModule } from 'src/app/commonBussinessSRC/psComponents/ps-action-button/ps-button-logout/ps-button-logout.component.Module';
import { PsNotificationDefaultedComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-button-notification/ps-notification-defaulted/ps-notification-defaulted.component.module';
import { PsComplexFindCIFComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-find-CIF/ps-complex-find-CIF.component.module';
import { PsComplexMenuHeaderContainerModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-menu-header-container/ps-complex-menu-header-container.module';
import { PsComplexMenuReachComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-menu-reach/ps-complex-menu-reach.component.module';
import { PsComplexMenuModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-menu/ps-complex-menu.component.module';
import { PsComplexProfileComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-profile/ps-complex-profile.component.module';

import { PsComponentsModule } from '../../psComponents/ps-components.module';
import { SharedModule } from '../../shared.module';
import { PsTemplateBasePageModule } from '../ps-template-base/ps-template-base.module';
import { PsTemplateLandingFabUiPage } from './ps-template-landing-fab-ui.page';


@NgModule({
  imports: [
    SharedModule,
    PsComponentsModule,
    PsComplexMenuHeaderContainerModule,
    PsButtonLogoutModule,
    PsComplexMenuModule,
    PsComplexMenuReachComponentModule,
    PsTemplateBasePageModule,
    PsComplexProfileComponentModule,
    PsComplexFindCIFComponentModule,
    PsNotificationDefaultedComponentModule
  ],
  declarations: [PsTemplateLandingFabUiPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [PsTemplateLandingFabUiPage],
  entryComponents: [PsTemplateLandingFabUiPage],
})
export class PsTemplateLandingFabUiPageModule { }
