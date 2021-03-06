import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateReportModule } from 'src/app/commonSRC/psTemplates/ps-template-report/ps-template-report.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { TransfersListReportPage } from './transfers-list-report.page';

const routes: Routes = [
  {
    path: '',
    component: TransfersListReportPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsComponentsModule,
    PsTemplateReportModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TransfersListReportPage]
})
export class TransfersListReportPageModule {}
