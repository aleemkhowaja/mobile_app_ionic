import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvatarModule } from 'ngx-avatar';
import { ComponentTestComponentModule } from 'src/app/commonBussinessSRC/component-test/component-test.component.module';
import { PsAccountsListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component.module';
import { PsAnchorSwitcherComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-action-anchor/ps-anchor-switcher/ps-anchor-switcher.component.module';
import { PsActionButtonEmailUsDefaultedModule } from 'src/app/commonBussinessSRC/psComponents/ps-button-email-us/ps-email-us-defaulted/ps-email-us-defaulted.component.module';
import { PsComplexCardDetailsBranchComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-card-details-branch/ps-complex-card-details-branch.component.module';
import { PsComplexFindCIFComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-find-CIF/ps-complex-find-CIF.component.module';
import { PsConfirmPinModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-password-confirm/ps-confirm-pin/ps-confirm-pin.component.module';
import { PsComplexPurposeModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-purpose/ps-complex-purpose.component.module';
import { PsComplexRecurringSchedulerComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-recurring-scheduler/ps-complex-recurring-scheduler.component.module';
import { PsInputCardCvvComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-card-cvv/ps-input-card-cvv.component.module';
import { PsInputCardNumberComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-card-number/ps-input-card-number.component.module';
import { PsLabelCifBranchComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-label/ps-label-cif-branch/ps-label-cif-branch.component.module';
import { PsLookupOwnAccountComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.module';
import { PsMapAtmBranchesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.module';
import { PsScheduledTransfersListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-scheduled-transfers-list/ps-scheduled-transfers-list.component.module';
import { PsDropdownAccountTypesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-account-types/ps-dropdown-account-types.component.module';
import { PsDropdownCitiesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-cities/ps-dropdown-cities.component.module';
import { PsDropdownCountryComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-country/ps-dropdown-country.component.module';
import { PsDropdownCurrenciesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-currencies/ps-dropdown-currencies.component.module';
import { PsDropdownRegionsComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-regions/ps-dropdown-regions.component.module';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { PsComplexBankAuthenticationComponentModule } from '../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-bank-authentication/ps-complex-bank-authentication.module';
import { PsComplexCreditCardComponentModule } from '../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-credit-card/ps-complex-credit-card.component.module';
import { PsComplexIdDetailsModule } from '../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-id-details/ps-complex-id-details.module';
import { PsComplexLookupComponentModule } from '../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-lookup/ps-complex-lookup.component.module';
import { PsComplexMenuReachComponentModule } from '../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-menu-reach/ps-complex-menu-reach.component.module';
import { PsComplexPasswordConfirmModule } from '../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-password-confirm/ps-complex-password-confirm.component.module';
import { PsComplexSecurityQuestionComponentModule } from '../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-security-questions/ps-complex-security-questions.component.module';
import { PsComplexUserCredentialsComponentModule } from '../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-user-credentials/ps-complex-user-credentials.component.module';
import { PsInputAccountNumberComponentModule } from '../../commonBussinessSRC/psComponents/ps-keyin-input/ps-input-account-number/ps-input-account-number.module';
import { PsInputEmailComponentModule } from '../../commonBussinessSRC/psComponents/ps-keyin-input/ps-input-email/ps-input-email.module';
import { PsInputFreeTextComponentModule } from '../../commonBussinessSRC/psComponents/ps-keyin-input/ps-input-free-text/ps-input-free-text.component.module';
import { PsInputVarcharComponentModule } from '../../commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsLovDeliveryOptionsComponentModule } from '../../commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-delivery-options/ps-lov-delivery-options.component.module';
import { PsLovPreferredLanguageComponentModule } from '../../commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-preferred-language/ps-lov-preferred-language.component.module';
import { PsDropdownSecurityQuestionComponentModule } from '../../commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-security-question/ps-dropdown-security-question.component.module';
import { PsComponentsModule } from '../../commonSRC/psComponents/ps-components.module';
import { SharedModule } from '../../commonSRC/shared.module';
import { ComponentsPage } from './components.page';
import { Section1ComponentsPageModule } from './section1-components/section1-components.module';



const routes: Routes = [
  {
    path: '',
    component: ComponentsPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    PsComponentsModule,
    PsComplexUserCredentialsComponentModule,
    PsComplexSecurityQuestionComponentModule,
    PsComplexPasswordConfirmModule,
    PsComplexCreditCardComponentModule,
    PsDropdownSecurityQuestionComponentModule,
    PsTemplateStepperModule,
    PsInputFreeTextComponentModule,
    PsInputVarcharComponentModule,
    PsLovPreferredLanguageComponentModule,
    PsLovDeliveryOptionsComponentModule,
    PsInputCardNumberComponentModule,
    PsInputCardCvvComponentModule,
    PsComplexIdDetailsModule,
    PsInputEmailComponentModule,
    PsInputAccountNumberComponentModule,
    PsComplexBankAuthenticationComponentModule,
    PsAnchorSwitcherComponentModule,
    PsConfirmPinModule,
    Section1ComponentsPageModule,
    PsComplexCardDetailsBranchComponentModule,
    PsMapAtmBranchesComponentModule,
    ComponentTestComponentModule,
    PsActionButtonEmailUsDefaultedModule,
    // PsSwitcherLovComponentModule,
    // PsSwitcherLovPreferredLanguageComponentModule,
    PsComplexMenuReachComponentModule,
    PsDropdownAccountTypesComponentModule,
    PsLabelCifBranchComponentModule,
    PsDropdownCurrenciesComponentModule,
    PsDropdownCountryComponentModule,
    PsDropdownRegionsComponentModule,
    PsDropdownCitiesComponentModule,
    PsLookupOwnAccountComponentModule,
    PsComplexLookupComponentModule,
    PsComplexRecurringSchedulerComponentModule,
    PsAccountsListComponentModule,
    PsComplexPurposeModule,
    PsComplexFindCIFComponentModule,
    AvatarModule,
    PsScheduledTransfersListComponentModule
  ],
  declarations: [ComponentsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsPageModule { }
