import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexPrayerTimeModule } from './../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-prayer-time/ps-complex-prayer-time.component.module';
import { PsTemplateViewModule } from './../../commonSRC/psTemplates/ps-template-view/ps-template-view.template.module';
import { PrayerTimePage } from './prayer-time.page';

const routes: Routes = [
  {
    path: '',
    component: PrayerTimePage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsComplexPrayerTimeModule,
    PsTemplateViewModule
  ],
  declarations: [PrayerTimePage]
})
export class PrayerTimePageModule {}
