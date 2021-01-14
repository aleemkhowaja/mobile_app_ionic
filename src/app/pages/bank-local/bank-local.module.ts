import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PsComponentsModule } from '../../commonSRC/psComponents/ps-components.module';
import { PsTemplateStepperModule } from '../../commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from '../../commonSRC/shared.module';
import { BankLocalPage } from './bank-local.page';

const routes: Routes = [
  {
    path: '',
    component: BankLocalPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsTemplateStepperModule,
    RouterModule.forChild(routes),
    PsComponentsModule
  ],
  declarations: [BankLocalPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BankLocalPageModule {}
