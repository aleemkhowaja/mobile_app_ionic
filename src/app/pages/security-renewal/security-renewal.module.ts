import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsComplexAmountComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-amount/ps-complex-amount.component.module';
import { PsOptionExpiredSecurityComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-container-lookup-option/ps-option-expired-security/ps-option-expired-security.component.module';
import { PsDisplayOnlyTodayDateComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-input-display-only/ps-display-only-today-date/ps-display-only-today-date.component.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { SecurityRenewalPage } from './security-renewal.page';
import { PsInputNumericComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-numeric/ps-input-numeric.component.module';

const routes: Routes = [
  {
    path: '',
    component: SecurityRenewalPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsTemplateStepperModule,
    PsComplexAmountComponentModule,
    PsDisplayOnlyTodayDateComponentModule,
    PsOptionExpiredSecurityComponentModule,
    PsInputNumericComponentModule
  ],
  declarations: [SecurityRenewalPage]
})
export class SecurityRenewalPageModule { }
