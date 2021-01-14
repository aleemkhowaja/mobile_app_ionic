import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsComplexBeneficiaryBankDetailsComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-beneficiary-bank-details/ps-complex-beneficiary-bank-details.component.module';
import { PsComplexBeneficiaryDetailsComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-beneficiary-details/ps-complex-beneficiary-details.component.module';
import { PsInputVarcharComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateFormModule } from 'src/app/commonSRC/psTemplates/ps-template-form/ps-template-form.template.module';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { InternationalBeneficiaryPage } from './international-beneficiary.page';

const routes: Routes = [
  {
    path: '',
    component: InternationalBeneficiaryPage
  }
];

//Author: GRadwan 16Jan2020, ISayad 21Jan2020 

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    PsTemplateFormModule,
    PsComponentsModule,
    PsTemplateStepperModule,
    PsComplexBeneficiaryDetailsComponentModule,
    PsComplexBeneficiaryBankDetailsComponentModule,
    PsInputVarcharComponentModule
  ],
  declarations: [InternationalBeneficiaryPage]
})
export class InternationalBeneficiaryPageModule {}
