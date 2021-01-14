import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PsComponentsModule } from '../../commonSRC/psComponents/ps-components.module';
import { PsTemplateViewModule } from '../../commonSRC/psTemplates/ps-template-view/ps-template-view.template.module';
import { SharedModule } from '../../commonSRC/shared.module';
import { UsersListPage } from './users-list.page';
import { PsUsersListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-users-list/ps-users-list.component.module';
import { PsTemplateAlertControllerModule } from 'src/app/commonSRC/psTemplates/ps-template-alert-controller/ps-template-alert-controller.template.module';

const routes: Routes = [
  {
    path: '',
    component: UsersListPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsTemplateViewModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsUsersListComponentModule,
    PsTemplateAlertControllerModule
    ],
  declarations: [UsersListPage]
})
export class UsersListPageModule {}
