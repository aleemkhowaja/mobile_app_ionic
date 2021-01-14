import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsAccountsListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component.module';
import { PsInputVarcharComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsLabelCifBranchComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-label/ps-label-cif-branch/ps-label-cif-branch.component.module';
import { PsLookupOwnAccountComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.module';
import { PsMapAtmBranchesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.module';
import { PsDropdownCardTypesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-card-types/ps-dropdown-card-types.component.module';

import { PsComponentsModule } from '../../commonSRC/psComponents/ps-components.module';
import { PsTemplateStepperModule } from '../../commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from '../../commonSRC/shared.module';
import { CardRequestPage } from './debit-card-request.page';
import { PsLovDeliveryLocationComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-delivery-location/ps-lov-delivery-location.module';
import { PsComplexSelectBranchComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-select-branch/ps-complex-select-branch.component.module';
import { PsInputDisplayOnlyCIFAddressHomeComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-display-only-cif-address-home/ps-input-display-only-cif-address-home.component.module';
import { PsInputDisplayOnlyCIFAddressWorkComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-display-only-cif-address-work/ps-input-display-only-cif-address-work.component.module';

const routes: Routes = [
  {
    path: '',
    component: CardRequestPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsTemplateStepperModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsMapAtmBranchesComponentModule,
    PsInputVarcharComponentModule,
    PsDropdownCardTypesComponentModule,
    PsLookupOwnAccountComponentModule,
    PsAccountsListComponentModule,
    PsLabelCifBranchComponentModule,
    PsComplexSelectBranchComponentModule,
    PsLovDeliveryLocationComponentModule,
    PsInputDisplayOnlyCIFAddressHomeComponentModule,
    PsInputDisplayOnlyCIFAddressWorkComponentModule
  ],
  declarations: [CardRequestPage]
})
export class DebitCardRequestPageModule {}
