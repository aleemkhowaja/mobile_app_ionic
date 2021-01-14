import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsOptionCardComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-container-lookup-option/ps-option-card/ps-option-card.component.module';

import { PsComponentsModule } from '../../commonSRC/psComponents/ps-components.module';
import { PsTemplateViewModule } from '../../commonSRC/psTemplates/ps-template-view/ps-template-view.template.module';
import { SharedModule } from '../../commonSRC/shared.module';
import { CardsListPage } from './cards-list.page';

const routes: Routes = [
  {
    path: '',
    component: CardsListPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsTemplateViewModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsOptionCardComponentModule
  ],
  declarations: [CardsListPage]
})
export class CardsListPageModule {}
