import { PsInputDisplayOnlyCIFAddressHomeComponentModule } from './../../commonBussinessSRC/psComponents/ps-keyin-input/ps-input-display-only-cif-address-home/ps-input-display-only-cif-address-home.component.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LetterOfCreditRequestPage } from './letter-of-credit-request.page';
import { PsLovRequestPurposeComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-request-purpose/ps-lov-request-purpose.component.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateViewModule } from 'src/app/commonSRC/psTemplates/ps-template-view/ps-template-view.template.module';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { PsTemplateFormModule } from 'src/app/commonSRC/psTemplates/ps-template-form/ps-template-form.template.module';
import { PsComplexAddressComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-address/ps-complex-address.component.module';
import { PsDropdownCountryComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-country/ps-dropdown-country.component.module';
import { PsInputVarcharComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsComplexAmountComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-amount/ps-complex-amount.component.module';
import { PsLookupOwnAccountComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.module';
import { PsAccountsListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component.module';
import { PsLovAmountToleranceComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-amount-tolerance/ps-lov-amount-tolerance.component.module';
import { PsComplexCreditAvailabilityComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-credit-availability/ps-complex-credit-availability.component.module';
import { PsInputNumericComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-numeric/ps-input-numeric.component.module';
import { PsInputFreeTextComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-free-text/ps-input-free-text.component.module';
import { PsLovSettlementMethodComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-settlement-method/ps-lov-settlement-method.component.module';
import { PsDropdownInsuranceCompanyComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-insurance-company/ps-dropdown-insurance-company.component.module';
import { PsLovConfirmationInstructionComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-confirmation-instruction/ps-lov-confirmation-instruction.component.module';
import { PsLovMeansOfTransportationComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-means-of-transportation/ps-lov-means-of-transportation.component.module';
import { PsComplexDocumentDetailsComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-document-details/ps-complex-document-details.component.module';
import { PsLovMaterialFromOtherCountryComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-material-from-other-country/ps-lov-material-from-other-country.component.module';
import { PsDropdownTFSDocumentTypeComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-tfs-document-type/ps-dropdown-tfs-document-type.component.module';
import { PsDateDayMonthYearFutureComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-day-month-year/ps-date-day-month-year-future/ps-date-day-month-year-future.component.module';
import { PsDropdownShipmentTermsComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-shipment-terms/ps-dropdown-shipment-terms.component.module';
import { PsLookupFacilityDetailsComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-facility-details/ps-lookup-facility-details.component.module';
import { PsOptionFacilityComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-container-lookup-option/ps-option-facility/ps-option-facility.component.module';
import { PsLovChargesBorneByComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-charges-borne-by/ps-lov-charges-borne-by.component.module';
import { PsComplexBillItemComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-bill-item/ps-complex-bill-item.component.module';
import { PsInputAccountNumberComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-account-number/ps-input-account-number.module';
import { PsLovIncotermsComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-incoterms/ps-lov-incoterms.component.module';
import { PsLovFormOfDocumentaryCreditComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-form-of-documentary-credit/ps-lov-form-of-documentary-credit.component.module';
import { PsBanksComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-banks/ps-banks.component.module';

const routes: Routes = [
  {
    path: '',
    component: LetterOfCreditRequestPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsTemplateViewModule,
    PsTemplateStepperModule,
    PsTemplateFormModule,
    PsLovRequestPurposeComponentModule,
    PsComplexAddressComponentModule,
    PsDateDayMonthYearFutureComponentModule,
    PsDropdownCountryComponentModule,
    PsInputVarcharComponentModule,
    PsComplexAmountComponentModule,
    PsLookupOwnAccountComponentModule,
    PsAccountsListComponentModule,
    PsLovAmountToleranceComponentModule,
    PsComplexCreditAvailabilityComponentModule,
    PsInputNumericComponentModule,
    PsInputFreeTextComponentModule,
    PsLovSettlementMethodComponentModule,
    PsLovConfirmationInstructionComponentModule,
    PsDropdownInsuranceCompanyComponentModule,
    PsLovMeansOfTransportationComponentModule,
    PsComplexDocumentDetailsComponentModule,
    PsLovMaterialFromOtherCountryComponentModule,
    PsDropdownTFSDocumentTypeComponentModule,
    PsDropdownShipmentTermsComponentModule,
    PsLookupFacilityDetailsComponentModule,
    PsOptionFacilityComponentModule,
    PsInputDisplayOnlyCIFAddressHomeComponentModule,
    PsLovChargesBorneByComponentModule,
    PsComplexBillItemComponentModule,
    PsInputAccountNumberComponentModule,
    PsDropdownCountryComponentModule,
    PsLovIncotermsComponentModule,
    PsLovFormOfDocumentaryCreditComponentModule,
    PsBanksComponentModule
  ],
  declarations: [LetterOfCreditRequestPage]
})
export class LetterOfCreditRequestPageModule { }
