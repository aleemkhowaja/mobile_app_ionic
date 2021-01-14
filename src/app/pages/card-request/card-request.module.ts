import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsInputVarcharComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsMapAtmBranchesComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.module';

import { PsComponentsModule } from '../../commonSRC/psComponents/ps-components.module';
import { PsTemplateStepperModule } from '../../commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from '../../commonSRC/shared.module';
import { CardRequestPage } from './card-request.page';
import { PsComplexSelectBranchComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-select-branch/ps-complex-select-branch.component.module';

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
    PsComplexSelectBranchComponentModule,
    PsInputVarcharComponentModule
  ],
  declarations: [CardRequestPage]
})
export class CardRequestPageModule {}
