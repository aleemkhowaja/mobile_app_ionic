import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsButtonLogoutModule } from 'src/app/commonBussinessSRC/psComponents/ps-action-button/ps-button-logout/ps-button-logout.component.Module';
import { PsComplexExchangeComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-exchange/ps-complex-exchange.component.module';
import { PsComplexFindCIFComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-find-CIF/ps-complex-find-CIF.component.module';
import { PsComplexMenuReachComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-menu-reach/ps-complex-menu-reach.component.module';
import { PsComplexMenuModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-menu/ps-complex-menu.component.module';
import { PsComplexPrayerTimeModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-prayer-time/ps-complex-prayer-time.component.module';
import { PsComplexProfileComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-profile/ps-complex-profile.component.module';
import { PsMapAtmBranchesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.module';

import { PsComponentsModule } from '../../psComponents/ps-components.module';
import { SharedModule } from '../../shared.module';
import { PsTemplateBasePageModule } from '../ps-template-base/ps-template-base.module';
import { PsTemplateLandingMainPageModule } from '../ps-template-landing-main/ps-template-landing-main.module';
import { PsTemplateLandingWebPage } from './ps-template-landing-web.template';



@NgModule({
  imports: [
    SharedModule,
    PsComplexMenuModule,
    PsComplexProfileComponentModule,
    PsComplexMenuReachComponentModule,
    PsButtonLogoutModule,
    PsTemplateLandingMainPageModule,
    PsMapAtmBranchesComponentModule,
    PsComponentsModule,
    PsComplexExchangeComponentModule,
    PsTemplateBasePageModule,
    PsComplexPrayerTimeModule,
    PsComplexFindCIFComponentModule
    ],
  declarations: [PsTemplateLandingWebPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [PsTemplateLandingWebPage],
  entryComponents: [PsTemplateLandingWebPage],
})
export class PsTemplateLandingWebPageModule { }
