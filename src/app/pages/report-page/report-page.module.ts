import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateReportModule } from 'src/app/commonSRC/psTemplates/ps-template-report/ps-template-report.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { ReportPagePage } from './report-page.page';

const routes: Routes = [
  {
    path: '',
    component: ReportPagePage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsComponentsModule,
    PsTemplateReportModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReportPagePage],
  exports: [ReportPagePage],
  entryComponents: [ReportPagePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportPagePageModule {}
