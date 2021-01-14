import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PsComponentsModule } from '../../commonSRC/psComponents/ps-components.module';
import { PsTemplateStepperModule } from '../../commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from '../../commonSRC/shared.module';
import { ReportLostFoundPage } from './report-lost-found.page';

const routes: Routes = [
  {
    path: '',
    component: ReportLostFoundPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsTemplateStepperModule,
    RouterModule.forChild(routes),
    PsComponentsModule
  ],
  declarations: [ReportLostFoundPage]
})
export class ReportLostFoundPageModule {}
