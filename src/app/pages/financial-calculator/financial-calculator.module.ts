import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PscomplexContactInfoComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-contact-info/ps-complex-contact-info.component.module';
import { PsComplexFacilityAmountsComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-facility-amounts/ps-complex-facility-amounts.component.module';
import { PsComplexFinancialCalculatorComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-financial-calculator/ps-complex-financial-calculator.component.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateFormModule } from 'src/app/commonSRC/psTemplates/ps-template-form/ps-template-form.template.module';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { FinancialCalculatorPage } from './financial-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: FinancialCalculatorPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsComplexFinancialCalculatorComponentModule,
    PsComplexFacilityAmountsComponentModule,
    PsTemplateFormModule,

    PsTemplateStepperModule,
    PscomplexContactInfoComponentModule,
  ],
  declarations: [FinancialCalculatorPage]
})
export class FinancialCalculatorPageModule { }
