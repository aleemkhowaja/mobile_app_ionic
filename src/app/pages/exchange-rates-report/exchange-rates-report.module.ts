import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from './../../commonSRC/psComponents/ps-components.module';
import { PsTemplateReportModule } from './../../commonSRC/psTemplates/ps-template-report/ps-template-report.template.module';
import { ExchangeRatesReportPage } from './exchange-rates-report.page';

const routes: Routes = [
  {
    path: '',
    component: ExchangeRatesReportPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsComponentsModule,
    PsTemplateReportModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExchangeRatesReportPage],
  exports:[ExchangeRatesReportPage],
  entryComponents: [ExchangeRatesReportPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExchangeRatesReportPageModule {}
