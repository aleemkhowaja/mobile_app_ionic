import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsInternalBeneficiaryComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-beneficiary/ps-internal-beneficiary/ps-internal-beneficiary.component.module';
import { PsInternationalBeneficiaryComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-beneficiary/ps-international-beneficiary/ps-international-beneficiary.component.module';
import { PsLocalBeneficiaryComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-beneficiary/ps-local-beneficiary/ps-local-beneficiary.component.module';
import { PsSelectLookupOptionListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-select-lookup-option-list/ps-select-lookup-option-list.component.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateViewModule } from 'src/app/commonSRC/psTemplates/ps-template-view/ps-template-view.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { BeneficiaryListPage } from './beneficiary-list.page';

const routes: Routes = [
  {
    path: '',
    component: BeneficiaryListPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    PsTemplateViewModule,
    PsSelectLookupOptionListComponentModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsInternalBeneficiaryComponentModule,
    PsInternationalBeneficiaryComponentModule,
    PsLocalBeneficiaryComponentModule
  ],
  declarations: [BeneficiaryListPage]
})
export class BeneficiaryListPageModule { }
