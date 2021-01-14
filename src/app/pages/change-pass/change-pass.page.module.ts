import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsComplexPasswordConfirmModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-password-confirm/ps-complex-password-confirm.component.module';
import { PsTemplateFormModule } from 'src/app/commonSRC/psTemplates/ps-template-form/ps-template-form.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from './../../commonSRC/psComponents/ps-components.module';
import { ChangePassPage } from './change-pass.page';

const routes: Routes = [
  {
    path: '',
    component: ChangePassPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsComponentsModule,
    RouterModule.forChild(routes),
    PsTemplateFormModule,
    PsComplexPasswordConfirmModule
  ],
  declarations: [ChangePassPage]
})
export class ChangePassPageModule { }
