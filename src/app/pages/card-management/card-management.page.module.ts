import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/commonSRC/shared.module';
import { PsComponentsModule } from '../../commonSRC/psComponents/ps-components.module';
import { CardManagementPage } from './card-management.page';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { PsOptionCardComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-container-lookup-option/ps-option-card/ps-option-card.component.module';
import { PsConfirmPinModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-password-confirm/ps-confirm-pin/ps-confirm-pin.component.module';
import { PsComplexPasswordConfirmModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-password-confirm/ps-complex-password-confirm.component.module';
import { PsMapAtmBranchesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.module';
import { PsInputVarcharComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsLabelCifBranchComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-label/ps-label-cif-branch/ps-label-cif-branch.component.module';
import { PsComplexSelectBranchComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-select-branch/ps-complex-select-branch.component.module';
import { PsLovDeliveryLocationComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-delivery-location/ps-lov-delivery-location.module';
import { PsInputDisplayOnlyCIFAddressHomeComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-display-only-cif-address-home/ps-input-display-only-cif-address-home.component.module';
import { PsInputDisplayOnlyCIFAddressWorkComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-display-only-cif-address-work/ps-input-display-only-cif-address-work.component.module';
import { PsDropdownCardBlockReasonsComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-block-reasons/ps-dropdown-block-reasons.component.module';
import { PsInputNumericComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-numeric/ps-input-numeric.component.module';
import { PsDropdownCoreReasonsComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-core-reasons/ps-dropdown-core-reasons.component.module';
import { PsDisplayOnlyCurrencyAmountComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-input-display-only/ps-display-only-currency-amount/ps-display-only-currency-amount.component.module';


const routes: Routes = [
  {
    path: '',
    component: CardManagementPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsTemplateStepperModule,
    PsComponentsModule,
    PsOptionCardComponentModule,
    PsConfirmPinModule,
    PsComplexPasswordConfirmModule,
    PsMapAtmBranchesComponentModule,
    PsInputVarcharComponentModule,
    PsLabelCifBranchComponentModule,
    PsComplexSelectBranchComponentModule,
    PsLovDeliveryLocationComponentModule,
    PsInputDisplayOnlyCIFAddressHomeComponentModule,
    PsInputDisplayOnlyCIFAddressWorkComponentModule,
    PsDropdownCardBlockReasonsComponentModule,
    PsInputNumericComponentModule,
    PsDropdownCoreReasonsComponentModule,
    PsDisplayOnlyCurrencyAmountComponentModule
  ],
  declarations: [CardManagementPage]
})
export class CardManagementPageModule { }
