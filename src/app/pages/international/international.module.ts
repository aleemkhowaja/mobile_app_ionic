import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PsComponentsModule } from '../../commonSRC/psComponents/ps-components.module';
import { PsTemplateStepperModule } from '../../commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from '../../commonSRC/shared.module';
import { InternationalPage } from './international.page';

const routes: Routes = [
  {
    path: '',
    component: InternationalPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsTemplateStepperModule,
    RouterModule.forChild(routes),
    PsComponentsModule
  ],
  declarations: [InternationalPage]
})
export class InternationalPageModule {}
