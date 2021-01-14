import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsDraftsReportPageModule } from 'src/app/commonBussinessSRC/psComponents/ps-drafts-report/ps-drafts-report.component.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { SavedDraftsReportPage } from './saved-drafts-report.page';

const routes: Routes = [
  {
    path: '',
    component: SavedDraftsReportPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsDraftsReportPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SavedDraftsReportPage]
})
export class SavedDraftsReportPageModule { }
