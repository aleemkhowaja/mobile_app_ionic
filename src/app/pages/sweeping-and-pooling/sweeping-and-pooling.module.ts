import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsAccountsListComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component.module';
import { PSComplexDateFilterComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-date-filter/ps-complex-date-filter.component.module';
import { PsComplexExchangeComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-exchange/ps-complex-exchange.component.module';
import { PsComplexRecurringSchedulerComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-recurring-scheduler/ps-complex-recurring-scheduler.component.module';
import { PsOptionCardComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-container-lookup-option/ps-option-card/ps-option-card.component.module';
import { PsDateDayMonthYearFutureComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-day-month-year/ps-date-day-month-year-future/ps-date-day-month-year-future.component.module';
import { PsLookupOwnAccountComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.module';
import { PsLovConfirmationInstructionComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-confirmation-instruction/ps-lov-confirmation-instruction.component.module';
import { PsLovInstructionMethodComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-instruction-method/ps-lov-instruction-method.component.module';
import { PsLovInstructionTypeComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-instruction-type/ps-lov-instruction-type.component.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { PsTemplateFormModule } from 'src/app/commonSRC/psTemplates/ps-template-form/ps-template-form.template.module';
import { PsTemplateStepperModule } from 'src/app/commonSRC/psTemplates/ps-template-stepper/ps-template-stepper.template.module';
import { PsTemplateViewModule } from 'src/app/commonSRC/psTemplates/ps-template-view/ps-template-view.template.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';
import { SweepingAndPoolingPage } from './sweeping-and-pooling.page';


const routes: Routes = [
  {
    path: '',
    component: SweepingAndPoolingPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PsComponentsModule,
    PsTemplateFormModule,
    PsTemplateViewModule,
    PsTemplateStepperModule,
    PsLovConfirmationInstructionComponentModule,
    PsLookupOwnAccountComponentModule,
    PsComplexExchangeComponentModule,
    PsAccountsListComponentModule,
    PsOptionCardComponentModule,
    PsDateDayMonthYearFutureComponentModule,
    PsComplexRecurringSchedulerComponentModule,
    PsLovInstructionMethodComponentModule,
    PsLovInstructionTypeComponentModule,
    PSComplexDateFilterComponentModule,

  ],
  declarations: [SweepingAndPoolingPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SweepingAndPoolingPageModule { }
