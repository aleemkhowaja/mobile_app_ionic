import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsDateDayMonthYearPastComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-day-month-year/ps-date-day-month-year-past/ps-date-day-month-year-past.component.module';
import { PsLovStatusComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-status/ps-lov-status.component.module';
import { PsDropdownPortfolioComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-portfolio/ps-dropdown-portfolio.component.module';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';
import { PsDisplayOnlyTodayDateComponentModule } from '../../ps-input-display-only/ps-display-only-today-date/ps-display-only-today-date.component.module';
import { PsInputNumericComponentModule } from '../../ps-keyin-input/ps-input-numeric/ps-input-numeric.component.module';
import { PsInputVarcharComponentModule } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsDropdownActivityComponentModule } from '../../ps-select-dropdown/ps-dropdown-activity/ps-dropdown-activity.component.module';
import { PsDropdownCurrenciesComponentModule } from '../../ps-select-dropdown/ps-dropdown-currencies/ps-dropdown-currencies.component.module';
import { PsLovTransactionTypeComponentModule } from '../../ps-select-dropdown/ps-dropdown-lov/ps-lov-transaction-type/ps-lov-transaction-type.component.module';
import { PSComplexDateFilterComponentModule } from '../ps-complex-date-filter/ps-complex-date-filter.component.module';
import { PsComplexFilterAmountComponentModule } from '../ps-complex-filter-amount/ps-complex-filter-amount.component.module';
import { PsComplexReportFilterCriteriaComponent } from './ps-complex-report-filter-criteria.component';

@NgModule({
  declarations: [PsComplexReportFilterCriteriaComponent],
  imports: [
    SharedModule,
    PsComponentsModule,
    PSComplexDateFilterComponentModule,
    PsDropdownCurrenciesComponentModule,
    PsInputNumericComponentModule,
    PsComplexFilterAmountComponentModule,
    PsLovTransactionTypeComponentModule,
    PsDropdownPortfolioComponentModule,
    PsLovStatusComponentModule,
    PsDateDayMonthYearPastComponentModule,
    PsDisplayOnlyTodayDateComponentModule,
    PsInputVarcharComponentModule,
    PsDropdownActivityComponentModule
  ],
  exports: [PsComplexReportFilterCriteriaComponent],
  entryComponents: [PsComplexReportFilterCriteriaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexReportFilterCriteriaComponentModule { }
