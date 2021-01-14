import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsComplexCifDetailsComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-cif-details/ps-complex-cif-details.component.module';
import { PsComplexEmploymentDetailsComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-employment-details/ps-complex-employment-details.component.module';
import { PsComplexPersonalDetailsComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-personal-details/ps-complex-personal-details.component.module';
import { PsInputEmailComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-email/ps-input-email.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateFormModule } from 'src/app/commonSRC/psTemplates/ps-template-form/ps-template-form.template.module';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { PsTemplateViewModule } from 'src/app/commonSRC/psTemplates/ps-template-view/ps-template-view.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PersonalDetailsPage } from './personal-details.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalDetailsPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsTemplateFormModule,
    PsComplexCifDetailsComponentModule,
    PsComplexEmploymentDetailsComponentModule,
    PsComplexPersonalDetailsComponentModule,
    PsInputEmailComponentModule,
    PsTemplateViewModule,
    PsTemplateStepperModule,

  ],
  declarations: [PersonalDetailsPage]
})
export class PersonalDetailsPageModule { }
