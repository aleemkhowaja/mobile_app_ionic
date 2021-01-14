import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsComplexCurrencyExchangeReportModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-currency-exchange-report/ps-complex-currency-exchange-report.module';
import { PsComplexTermsAndConditionsOnlineRegistrationModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-terms-and-conditions/ps-complex-terms-and-conditions-online-registration/ps-complex-terms-and-conditions-online-registration.component.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { GilbertComponentPage } from './gilbert-component.page';

const routes: Routes = [
  {
    path: '',
    component: GilbertComponentPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsComplexTermsAndConditionsOnlineRegistrationModule,
    PsComplexCurrencyExchangeReportModule,
  ],
  declarations: [GilbertComponentPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class GilbertComponentPageModule { }
