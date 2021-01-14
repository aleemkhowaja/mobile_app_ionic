import { PsInputVarcharComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateFormModule } from 'src/app/commonSRC/psTemplates/ps-template-form/ps-template-form.template.module';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { FacilityRequestPage } from './facility-request.page';
import { PsComplexFacilityRequestComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-facility-request/ps-complex-facility-request.component.module';
import { PsMapAtmBranchesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.module';
import { PsComplexSelectBranchComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-select-branch/ps-complex-select-branch.component.module';

const routes: Routes = [
  {
    path: '',
    component: FacilityRequestPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsComplexFacilityRequestComponentModule,
    PsTemplateFormModule,
    PsComplexSelectBranchComponentModule,
    PsTemplateStepperModule,
    PsInputVarcharComponentModule,
    PsMapAtmBranchesComponentModule,
  ],
  declarations: [FacilityRequestPage]
})
export class FacilityRequestPageModule { }
