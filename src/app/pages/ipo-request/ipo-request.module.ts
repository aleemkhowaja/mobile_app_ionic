import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsComplexAmountComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-amount/ps-complex-amount.component.module';
import { PsComplexTermsAndConditionsModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-terms-and-conditions/ps-complex-terms-and-conditions.module';
import { PsIpoSecuritiesListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-ipo-securities-list/ps-ipo-securities-list.component.module';
import { PsInputNumericComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-numeric/ps-input-numeric.component.module';
import { PsLovPaymentMethodAgentComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-payment-method-agent/ps-lov-payment-method-agent.component.module';
import { PsLovPaymentMethodIndividualComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-payment-method-individual/ps-lov-payment-method-individual.component.module';
import { PsDropdownPortfolioComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-portfolio/ps-dropdown-portfolio.component.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { IpoRequestPage } from './ipo-request.page';

const routes: Routes = [
  {
    path: '',
    component: IpoRequestPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    PsComponentsModule,
    PsTemplateStepperModule,
    PsComplexTermsAndConditionsModule,
    PsComplexAmountComponentModule,
    PsIpoSecuritiesListComponentModule,
    PsInputNumericComponentModule,
    PsLovPaymentMethodAgentComponentModule,
    PsLovPaymentMethodIndividualComponentModule,
    PsDropdownPortfolioComponentModule
  ],
  declarations: [IpoRequestPage]
})
export class IpoRequestPageModule {}
