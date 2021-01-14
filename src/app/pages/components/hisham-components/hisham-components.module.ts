import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PsDateMonthYearFutureComponentModule } from '../../../commonBussinessSRC/psComponents/ps-keyin-input/ps-date-month-year/ps-date-month-year-future/ps-date-month-year-future.component.module';
import { PsDateMonthYearComponentModule } from './../../../commonBussinessSRC/psComponents/ps-keyin-input/ps-date-month-year/ps-date-month-year.component.module';
import { PsComponentsModule } from './../../../commonSRC/psComponents/ps-components.module';
import { SharedModule } from './../../../commonSRC/shared.module';
import { HishamComponentsPage } from './hisham-components.page';

const routes: Routes = [
  {
    path: 'hisham-components',
    component: HishamComponentsPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsComponentsModule,
    PsDateMonthYearComponentModule,
    PsDateMonthYearFutureComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HishamComponentsPage],
  exports: [HishamComponentsPage]
})
export class HishamComponentsPageModule {}
