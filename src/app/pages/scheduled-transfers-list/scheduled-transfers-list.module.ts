import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsScheduledTransfersListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-scheduled-transfers-list/ps-scheduled-transfers-list.component.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateViewModule } from 'src/app/commonSRC/psTemplates/ps-template-view/ps-template-view.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { ScheduledTransfersListPage } from './scheduled-transfers-list.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduledTransfersListPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsComponentsModule,
    PsTemplateViewModule,
    PsScheduledTransfersListComponentModule,
    RouterModule.forChild(routes),
    
  ],
  declarations: [ScheduledTransfersListPage]
})
export class ScheduledTransfersListPageModule {}
