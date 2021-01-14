import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PsComponentsModule } from '../../commonSRC/psComponents/ps-components.module';
import { PsTemplateViewModule } from '../../commonSRC/psTemplates/ps-template-view/ps-template-view.template.module';
import { SharedModule } from '../../commonSRC/shared.module';
import { PsOptionChequebookComponentModule } from './../../commonBussinessSRC/psComponents/ps-container-lookup-option/ps-option-chequebook/ps-option-chequebook.component.module';
import { ChequebookListPage } from './chequebook-list.page';

const routes: Routes = [
  {
    path: '',
    component: ChequebookListPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsTemplateViewModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsOptionChequebookComponentModule
  ],
  declarations: [ChequebookListPage]
})
export class ChequebookListPageModule {}
