import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexTermsAndConditionsModule } from './../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-terms-and-conditions/ps-complex-terms-and-conditions.module';
import { PsComponentsModule } from './../../commonSRC/psComponents/ps-components.module';
import { PsTemplateFormModule } from './../../commonSRC/psTemplates/ps-template-form/ps-template-form.template.module';
import { TermsAndConditionsPage } from './terms-and-conditions.page';

const routes: Routes = [
  {
    path: '',
    component: TermsAndConditionsPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    PsComplexTermsAndConditionsModule,
    PsTemplateFormModule,
    PsComponentsModule
  ],
  declarations: [TermsAndConditionsPage],

})
export class TermsAndConditionsPageModule {}
