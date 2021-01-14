import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsAccountsListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component.module';
import { PsInputVarcharComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsDropdownReasonsComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-reasons/ps-dropdown-reasons.component.module';
import { PsSelectLookupOptionListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-select-lookup-option-list/ps-select-lookup-option-list.component.module';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';
import { PsComponentsModule } from '../../commonSRC/psComponents/ps-components.module';
import { NationalPoolingPage } from './national-pooling.page';


const routes: Routes = [
  {
    path: '',
    component: NationalPoolingPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsDropdownReasonsComponentModule,
    PsAccountsListComponentModule,
    PsTemplateStepperModule,
    PsSelectLookupOptionListComponentModule,
    PsInputVarcharComponentModule
  ],
  declarations: [NationalPoolingPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NationalPoolingPageModule { }
