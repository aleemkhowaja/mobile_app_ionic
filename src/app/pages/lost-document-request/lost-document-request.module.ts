import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsAccountsListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component.module';
import { PsOptionCardComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-container-lookup-option/ps-option-card/ps-option-card.component.module';
import { PsOptionChequebookComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-container-lookup-option/ps-option-chequebook/ps-option-chequebook.component.module';
import { PsDateDayMonthYearPastComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-day-month-year/ps-date-day-month-year-past/ps-date-day-month-year-past.component.module';
import { PsInputFreeTextComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-free-text/ps-input-free-text.component.module';
import { PsInputVarcharComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsLookupChequebooksComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-chequebooks/ps-lookup-chequebooks.component.module';
import { PsLookupCreditCardsComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-credit-cards/ps-lookup-credit-cards.component.module';
import { PsLookupDebitCardsComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-debit-cards/ps-lookup-debit-cards.component.module';
import { PsLookupOwnAccountComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.module';
import { PsDropdownAccountTypesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-account-types/ps-dropdown-account-types.component.module';
import { PsDropdownCardTypesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-card-types/ps-dropdown-card-types.component.module';
import { PsDropdownCoreReasonsComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-core-reasons/ps-dropdown-core-reasons.component.module';
import { PsDropdownDocumentTypesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-document-types/ps-dropdown-document-types.component.module';
import { PsLovCardTypesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-card-types/ps-lov-card-types.component.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { LostDocumentRequestPage } from './lost-document-request.page';

const routes: Routes = [
  {
    path: '',
    component: LostDocumentRequestPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsTemplateStepperModule,
    PsDropdownAccountTypesComponentModule,
    PsLookupOwnAccountComponentModule,
    PsInputVarcharComponentModule,
    PsDropdownCardTypesComponentModule,
    PsDateDayMonthYearPastComponentModule,
    PsInputFreeTextComponentModule,
    PsAccountsListComponentModule,
    PsDropdownDocumentTypesComponentModule,
    PsOptionChequebookComponentModule,
    PsLookupChequebooksComponentModule,
    PsLookupDebitCardsComponentModule,
    PsLookupCreditCardsComponentModule,
    PsOptionCardComponentModule,
    PsDropdownCoreReasonsComponentModule,
    PsLovCardTypesComponentModule

  ],
  declarations: [LostDocumentRequestPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LostDocumentRequestPageModule { }
