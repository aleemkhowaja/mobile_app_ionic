import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsThemeCreatorPage } from './ps-theme-creator.page';

const routes: Routes = [
  {
    path: '',
    component: PsThemeCreatorPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PsThemeCreatorPage]
})
export class PsThemeCreatorPageModule {}
