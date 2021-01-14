import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PsComponentsModule } from '../../commonSRC/psComponents/ps-components.module';
import { PsTemplateViewModule } from '../../commonSRC/psTemplates/ps-template-view/ps-template-view.template.module';
import { SharedModule } from '../../commonSRC/shared.module';
import { FinancingListPage } from './financing-list.page';
import { PsComplexDealDetailsModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-deal-details/ps-complex-deal-details.component.module';

const routes: Routes = [
  {
    path: '',
    component: FinancingListPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsTemplateViewModule,
    PsComplexDealDetailsModule,
    RouterModule.forChild(routes),
    PsComponentsModule
  ],
  declarations: [FinancingListPage]
})
export class FinancingListPageModule {}
