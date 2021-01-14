import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsAccountsListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component.module';
import { PsInternalBeneficiaryComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-beneficiary/ps-internal-beneficiary/ps-internal-beneficiary.component.module';
import { PsInternationalBeneficiaryComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-beneficiary/ps-international-beneficiary/ps-international-beneficiary.component.module';
import { PsLocalBeneficiaryComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-beneficiary/ps-local-beneficiary/ps-local-beneficiary.component.module';
import { PsComplexAmountComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-amount/ps-complex-amount.component.module';
import { PsComplexExchangeComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-exchange/ps-complex-exchange.component.module';
import { PsComplexPurposeModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-purpose/ps-complex-purpose.component.module';
import { PsComplexRecurringSchedulerComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-recurring-scheduler/ps-complex-recurring-scheduler.component.module';
import { PsComplexSwiftTransferComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-swift-transfer/ps-complex-swift-transfer.component.module';
import { PsDateDayMonthYearFutureComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-day-month-year/ps-date-day-month-year-future/ps-date-day-month-year-future.component.module';
import { PsInputAccountNumberComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-account-number/ps-input-account-number.module';
import { PsInputVarcharComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsLookupBeneficiariesInternalComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-beneficiaries-internal/ps-lookup-beneficiaries-internal.component.module';
import { PsLookupBeneficiariesInternationalComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-beneficiaries-international/ps-lookup-beneficiaries-international.component.module';
import { PsLookupBeneficiariesLocalComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-beneficiaries-local/ps-lookup-beneficiaries-local.component.module';
import { PsLookupOwnAccountComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.module';
import { PsPurposeComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-purpose/ps-purpose.component.module';
import { PsDropdownCurrenciesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-currencies/ps-dropdown-currencies.component.module';
import { PsSwiftAccountListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-swift-account-list/ps-swift-account-list.component.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PaymentPage } from './payment.page';
import { PsBanksComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-banks/ps-banks.component.module';

const routes: Routes = [
  {
    path: '',
    component: PaymentPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsTemplateStepperModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsLookupOwnAccountComponentModule,
    PsDropdownCurrenciesComponentModule,
    PsInputVarcharComponentModule,
    PsComplexExchangeComponentModule,
    PsAccountsListComponentModule,
    PsComplexRecurringSchedulerComponentModule,
    PsInputAccountNumberComponentModule,
    PsComplexAmountComponentModule,
    PsComplexSwiftTransferComponentModule,
    PsSwiftAccountListComponentModule,
    PsLookupBeneficiariesInternalComponentModule,
    PsLookupBeneficiariesInternationalComponentModule,
    PsLookupBeneficiariesLocalComponentModule,
    PsInternalBeneficiaryComponentModule,
    PsInternationalBeneficiaryComponentModule,
    PsLocalBeneficiaryComponentModule,
    PsComplexPurposeModule,
    PsPurposeComponentModule,
    PsDateDayMonthYearFutureComponentModule,
    PsBanksComponentModule
  ],
  declarations: [PaymentPage]
})
export class PaymentPageModule { }
