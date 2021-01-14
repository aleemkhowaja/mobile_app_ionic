import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsDropdownReasonsComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-reasons/ps-dropdown-reasons.component.module';
import { PsTemplateFormModule } from 'src/app/commonSRC/psTemplates/ps-template-form/ps-template-form.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../commonSRC/psComponents/ps-components.module';
import { AccountDeactivationPage } from './account-deactivation.page';

const routes: Routes = [
  {
    path: '',
    component: AccountDeactivationPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsDropdownReasonsComponentModule,
    PsTemplateFormModule,

  ],
  declarations: [AccountDeactivationPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountDeactivationPageModule { }
