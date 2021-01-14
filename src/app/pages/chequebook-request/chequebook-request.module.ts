import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsAccountsListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component.module';
import { PsComplexIdDetailsModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-id-details/ps-complex-id-details.module';
import { PsInputNumericComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-numeric/ps-input-numeric.component.module';
import { PsInputVarcharComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsLookupOwnAccountComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.module';
import { PsMapAtmBranchesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.module';
import { PsDropdownChequebookTypesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-chequebook-types/ps-dropdown-chequebook-types.component.module';
import { PsDropdownCurrenciesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-currencies/ps-dropdown-currencies.component.module';
import { PsDropDownIdTypesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-dropdown-id-types/ps-dropdown-id-types.component.module';
import { PsLovDestinationBranchComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-destination-branch/ps-lov-destination-branch.component.module';
import { PsLovPreferredLanguageComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-preferred-language/ps-lov-preferred-language.component.module';

import { PsComponentsModule } from '../../commonSRC/psComponents/ps-components.module';
import { PsTemplateStepperModule } from '../../commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from '../../commonSRC/shared.module';
import { ChequebookRequestPage } from './chequebook-request.page';
import { PsDropdownAllowedLanguagesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-allowed-languages/ps-dropdown-allowed-languages.component.module';
import { PsComplexSelectBranchComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-select-branch/ps-complex-select-branch.component.module';

const routes: Routes = [
  {
    path: '',
    component: ChequebookRequestPage
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
    PsLovPreferredLanguageComponentModule,
    PsInputNumericComponentModule,
    PsDropDownIdTypesComponentModule,
    PsMapAtmBranchesComponentModule,
    PsAccountsListComponentModule,
    PsComplexIdDetailsModule,
    PsDropdownChequebookTypesComponentModule,
    PsLovDestinationBranchComponentModule,
    PsComplexSelectBranchComponentModule,
    PsDropdownAllowedLanguagesComponentModule
  ],
  declarations: [ChequebookRequestPage]
})
export class ChequebookRequestPageModule {}
