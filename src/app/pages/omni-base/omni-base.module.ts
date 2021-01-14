import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { OmniBasePage } from './omni-base.page';

const routes: Routes = [
  {
    path: '',
    component: OmniBasePage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OmniBasePage]
})
export class OmniBasePageModule { }
