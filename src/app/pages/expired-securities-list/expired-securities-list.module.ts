import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsOptionExpiredSecurityComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-container-lookup-option/ps-option-expired-security/ps-option-expired-security.component.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateViewModule } from 'src/app/commonSRC/psTemplates/ps-template-view/ps-template-view.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { ExpiredSecuritiesListPage } from './expired-securities-list.page';

const routes: Routes = [
  {
    path: '',
    component: ExpiredSecuritiesListPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsTemplateViewModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsOptionExpiredSecurityComponentModule
  ],
  declarations: [ExpiredSecuritiesListPage],
  
})
export class ExpiredSecuritiesListPageModule {}
