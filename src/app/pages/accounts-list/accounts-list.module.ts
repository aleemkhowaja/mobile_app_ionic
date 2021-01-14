import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsAccountsListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component.module';
import { PsSelectLookupOptionListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-select-lookup-option-list/ps-select-lookup-option-list.component.module';

import { PsComponentsModule } from '../../commonSRC/psComponents/ps-components.module';
import { PsTemplateViewModule } from '../../commonSRC/psTemplates/ps-template-view/ps-template-view.template.module';
import { SharedModule } from '../../commonSRC/shared.module';
import { AccountsListPage } from './accounts-list.page';

const routes: Routes = [
  {
    path: '',
    component: AccountsListPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsTemplateViewModule,
    PsSelectLookupOptionListComponentModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsAccountsListComponentModule
    ],
  declarations: [AccountsListPage]
})
export class AccountsListPageModule {}
