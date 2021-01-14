import { PsLocalBeneficiaryComponentModule } from './../../commonBussinessSRC/psComponents/ps-beneficiary/ps-local-beneficiary/ps-local-beneficiary.component.module';
import { PsInputNumericComponentModule } from './../../commonBussinessSRC/psComponents/ps-keyin-input/ps-input-numeric/ps-input-numeric.component.module';
import { PsLovChargesBorneByComponentModule } from './../../commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-charges-borne-by/ps-lov-charges-borne-by.component.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { LetterOfGuaranteePage } from './letter-of-guarantee.page';
import { PsLookupOwnAccountComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.module';
import { PsComplexAddressComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-address/ps-complex-address.component.module';
import { PsDropdownTFSDocumentTypeComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-tfs-document-type/ps-dropdown-tfs-document-type.component.module';
import { PsLovRequestPurposeComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-request-purpose/ps-lov-request-purpose.component.module';
import { PsDropdownCountryComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-country/ps-dropdown-country.component.module';
import { PsInputVarcharComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsInputFreeTextComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-free-text/ps-input-free-text.component.module';
import { PsComplexAmountComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-amount/ps-complex-amount.component.module';
import { PsDateDayMonthYearFutureComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-day-month-year/ps-date-day-month-year-future/ps-date-day-month-year-future.component.module';
import { PsAccountsListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component.module';
import { PsInputDisplayOnlyCIFAddressHomeComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-display-only-cif-address-home/ps-input-display-only-cif-address-home.component.module';


const routes: Routes = [
  {
    path: '',
    component: LetterOfGuaranteePage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsTemplateStepperModule,
    PsLovRequestPurposeComponentModule,
    PsComplexAmountComponentModule,
    PsLookupOwnAccountComponentModule,
    PsAccountsListComponentModule,
    //PsTemplateFormModule,
    PsComplexAddressComponentModule,
    PsDropdownTFSDocumentTypeComponentModule,
    PsDropdownCountryComponentModule,
    PsInputVarcharComponentModule,
    PsInputNumericComponentModule,
    PsInputFreeTextComponentModule,
    PsDateDayMonthYearFutureComponentModule,
    PsInputDisplayOnlyCIFAddressHomeComponentModule,
    PsLovChargesBorneByComponentModule,
    PsLocalBeneficiaryComponentModule
  ],
  declarations: [LetterOfGuaranteePage]
})
export class LetterOfGuaranteePageModule { }
