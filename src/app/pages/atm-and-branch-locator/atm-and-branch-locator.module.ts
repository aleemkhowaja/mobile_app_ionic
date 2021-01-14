import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsMapAtmBranchesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateViewModule } from 'src/app/commonSRC/psTemplates/ps-template-view/ps-template-view.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { AtmAndBranchLocatorPage } from './atm-and-branch-locator.page';

const routes: Routes = [
  {
    path: '',
    component: AtmAndBranchLocatorPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsTemplateViewModule,
    PsMapAtmBranchesComponentModule
  ],
  declarations: [AtmAndBranchLocatorPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AtmAndBranchLocatorPageModule { }