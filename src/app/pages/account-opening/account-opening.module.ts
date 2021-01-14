import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsInputVarcharComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsLabelCifBranchComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-label/ps-label-cif-branch/ps-label-cif-branch.component.module';
import { PsMapAtmBranchesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.module';
import { PsDropdownAccountTypesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-account-types/ps-dropdown-account-types.component.module';
import { PsDropdownCurrenciesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-currencies/ps-dropdown-currencies.component.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { AccountOpeningPage } from './account-opening.page';
import { PsComplexSelectBranchComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-select-branch/ps-complex-select-branch.component.module';
import { PsComplexExchangeComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-exchange/ps-complex-exchange.component.module';
import { PsLookupOwnAccountComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.module';
import { PsAccountsListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component.module';


const routes: Routes = [
  {
    path: '',
    component: AccountOpeningPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsTemplateStepperModule,
    PsLabelCifBranchComponentModule,
    PsDropdownAccountTypesComponentModule,
    PsInputVarcharComponentModule,
    PsDropdownCurrenciesComponentModule,
    PsMapAtmBranchesComponentModule,
    PsComplexSelectBranchComponentModule,
    PsLookupOwnAccountComponentModule,
    PsComplexExchangeComponentModule,
    PsAccountsListComponentModule,

  ],
  declarations: [AccountOpeningPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccountOpeningPageModule {}
