import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsBanksComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-banks/ps-banks.component.module';
import { PsInputVarcharComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsDropdownBranchesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-branches/ps-dropdown-branches.component.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateFormModule } from 'src/app/commonSRC/psTemplates/ps-template-form/ps-template-form.template.module';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComplexBeneficiaryDetailsComponentModule } from '../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-beneficiary-details/ps-complex-beneficiary-details.component.module';
import { LocalBeneficiaryPage } from './local-beneficiary.page';

const routes: Routes = [
  {
    path: '',
    component: LocalBeneficiaryPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    PsTemplateFormModule,
    PsComponentsModule,
    PsTemplateStepperModule,
    PsComplexBeneficiaryDetailsComponentModule,
    PsInputVarcharComponentModule,
    PsDropdownBranchesComponentModule,
    PsBanksComponentModule
  ],
  declarations: [LocalBeneficiaryPage]
})
export class LocalBeneficiaryPageModule { }
