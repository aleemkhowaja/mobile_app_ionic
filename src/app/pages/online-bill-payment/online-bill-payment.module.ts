import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OnlineBillPaymentPage } from './online-bill-payment.page';
import { SharedModule } from 'src/app/commonSRC/shared.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { PsLookupOwnAccountComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.module';
import { PsAccountsListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component.module';
import { PsComplexAmountComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-amount/ps-complex-amount.component.module';
import { PsInputFreeTextComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-free-text/ps-input-free-text.component.module';
import { PsComplexExchangeComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-exchange/ps-complex-exchange.component.module';
import { PsDropdownBillersCategoryComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-billers-category/ps-dropdown-billers-category.component.module';
import { PsDropdownBillerComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-biller/ps-dropdown-biller.component.module';

const routes: Routes = [
  {
    path: '',
    component: OnlineBillPaymentPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsTemplateStepperModule,
    PsLookupOwnAccountComponentModule,
    PsAccountsListComponentModule,
    PsComplexAmountComponentModule,
    PsInputFreeTextComponentModule,
    PsComplexExchangeComponentModule,
    PsDropdownBillersCategoryComponentModule,
    PsDropdownBillerComponentModule
  ],
  declarations: [OnlineBillPaymentPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineBillPaymentPageModule {}
