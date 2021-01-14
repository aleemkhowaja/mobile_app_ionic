import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsIpoSecuritiesListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-ipo-securities-list/ps-ipo-securities-list.component.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateViewModule } from 'src/app/commonSRC/psTemplates/ps-template-view/ps-template-view.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { IpoSecuritiesListPage } from './ipo-securities-list.page';

const routes: Routes = [
  {
    path: '',
    component: IpoSecuritiesListPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsTemplateViewModule,
    PsIpoSecuritiesListComponentModule,
    RouterModule.forChild(routes),
    PsComponentsModule
  ],
  declarations: [IpoSecuritiesListPage]
})
export class IpoSecuritiesListPageModule { }
