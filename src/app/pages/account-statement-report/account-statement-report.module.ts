import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from './../../commonSRC/psComponents/ps-components.module';
import { PsTemplateReportModule } from './../../commonSRC/psTemplates/ps-template-report/ps-template-report.template.module';
import { AccountStatementReportPage } from './account-statement-report.page';

const routes: Routes = [
  {
    path: '',
    component: AccountStatementReportPage
  }
];

@ NgModule({
  imports: [
    SharedModule,
    PsComponentsModule,
    PsTemplateReportModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AccountStatementReportPage],
  exports: [AccountStatementReportPage],
  entryComponents: [AccountStatementReportPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountStatementReportPageModule {}