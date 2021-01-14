import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateViewModule } from 'src/app/commonSRC/psTemplates/ps-template-view/ps-template-view.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { InformationPage } from './information.page';

const routes: Routes = [
  {
    path: '',
    component: InformationPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsTemplateViewModule,
  
  ],
  declarations: [InformationPage]
})
export class InformationPageModule {}
