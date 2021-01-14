import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsComplexSecurityQuestionComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-security-questions/ps-complex-security-questions.component.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateFormModule } from 'src/app/commonSRC/psTemplates/ps-template-form/ps-template-form.template.module';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { ChangeSecurityQuestionsPage } from './change-security-questions.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeSecurityQuestionsPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsTemplateFormModule,
    PsComponentsModule,
    PsComplexSecurityQuestionComponentModule,
    PsTemplateStepperModule,

  ],
  declarations: [ChangeSecurityQuestionsPage]
})
export class ChangeSecurityQuestionsPageModule { }
