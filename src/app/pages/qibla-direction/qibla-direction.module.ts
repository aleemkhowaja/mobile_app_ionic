import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsComplexLandmarkCompassComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-landmark-compass/ps-complex-landmark-compass.component.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateViewModule } from 'src/app/commonSRC/psTemplates/ps-template-view/ps-template-view.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { QiblaDirectionPage } from './qibla-direction.page';


const routes: Routes = [
  {
    path: '',
    component: QiblaDirectionPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsTemplateViewModule,
    PsComplexLandmarkCompassComponentModule
  ],
  declarations: [QiblaDirectionPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class QiblaDirectionPageModule { }
