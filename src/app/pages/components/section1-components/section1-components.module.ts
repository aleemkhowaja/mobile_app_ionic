import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsDateMonthYearPastComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-date-month-year/ps-date-month-year-past/ps-date-month-year-past.component.module';
import { PsDateDayMonthYearFutureComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-day-month-year/ps-date-day-month-year-future/ps-date-day-month-year-future.component.module';
import { PsDateDayMonthYearPastComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-day-month-year/ps-date-day-month-year-past/ps-date-day-month-year-past.component.module';
import { PsDateDayMonthYearComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-day-month-year/ps-date-day-month-year.component.module';

import { PsComplexCardDetailsAtmCdmComponentModule } from './../../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-card-details-atm-cdm/ps-complex-card-details-atm-cdm.component.module';
import { PsComplexCardDetailsBranchComponentModule } from './../../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-card-details-branch/ps-complex-card-details-branch.component.module';
import { PsDateMonthYearFutureComponentModule } from './../../../commonBussinessSRC/psComponents/ps-keyin-input/ps-date-month-year/ps-date-month-year-future/ps-date-month-year-future.component.module';
import { PsDateMonthYearComponentModule } from './../../../commonBussinessSRC/psComponents/ps-keyin-input/ps-date-month-year/ps-date-month-year.component.module';
import { PsComponentsModule } from './../../../commonSRC/psComponents/ps-components.module';
import { PsTemplateReportModule } from './../../../commonSRC/psTemplates/ps-template-report/ps-template-report.template.module';
import { SharedModule } from './../../../commonSRC/shared.module';
import { Section1ComponentsPage } from './section1-components.page';

const routes: Routes = [
  {
    path: 'section1-components',
    component: Section1ComponentsPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsComponentsModule,
    PsDateMonthYearComponentModule,
    PsDateMonthYearFutureComponentModule,
    PsDateMonthYearPastComponentModule,
    PsDateDayMonthYearComponentModule,
    PsDateDayMonthYearFutureComponentModule,
    PsDateDayMonthYearPastComponentModule,
    PsComplexCardDetailsAtmCdmComponentModule,
    PsComplexCardDetailsBranchComponentModule,
    PsTemplateReportModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Section1ComponentsPage],
  exports: [Section1ComponentsPage]
})
export class Section1ComponentsPageModule {}
