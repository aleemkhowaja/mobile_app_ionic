import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsAccountsListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component.module';
import { PsInputVarcharComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsLookupOwnAccountComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.module';
import { PsDropdownCountryComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-country/ps-dropdown-country.component.module';
import { PsDropdownCurrenciesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-currencies/ps-dropdown-currencies.component.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { BankerChequePage } from './banker-cheque.page';

const routes: Routes = [
  {
    path: '',
    component: BankerChequePage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsTemplateStepperModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsDropdownCurrenciesComponentModule,
    PsInputVarcharComponentModule,
    PsLookupOwnAccountComponentModule,
    PsDropdownCountryComponentModule,
    PsAccountsListComponentModule
  ],
  declarations: [BankerChequePage]
})
export class BankerChequePageModule {}
