import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateReportModule } from 'src/app/commonSRC/psTemplates/ps-template-report/ps-template-report.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PoolingReportPagePage } from './pooling-report-page.page';

const routes: Routes = [
  {
    path: '',
    component: PoolingReportPagePage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsComponentsModule,
    PsTemplateReportModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PoolingReportPagePage],
  exports: [PoolingReportPagePage],
  entryComponents: [PoolingReportPagePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PoolingReportPagePageModule { }
