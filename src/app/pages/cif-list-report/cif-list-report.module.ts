import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateViewModule } from 'src/app/commonSRC/psTemplates/ps-template-view/ps-template-view.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { ReportCIFListPage } from './cif-list-report.page';
import { PsOptionCifReportListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-container-lookup-option/ps-cif-list/ps-cif-list.component.module';

const routes: Routes = [
  {
    path: '',
    component: ReportCIFListPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsTemplateViewModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsOptionCifReportListComponentModule
  ],
  declarations: [ReportCIFListPage],

})
export class ReportCIFListPageModule {}
