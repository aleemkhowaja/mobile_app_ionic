import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsComponentsModule } from '../../../../commonSRC/psComponents/ps-components.module';
import { PsDateMonthYearPastComponentModule } from '../../ps-keyin-input/ps-date-month-year/ps-date-month-year-past/ps-date-month-year-past.component.module';
import { PsDateDayMonthYearFutureComponentModule } from '../../ps-keyin-input/ps-day-month-year/ps-date-day-month-year-future/ps-date-day-month-year-future.component.module';
import { PsInputFreeTextComponentModule } from '../../ps-keyin-input/ps-input-free-text/ps-input-free-text.component.module';
import { PsDropdownCountryComponentModule } from '../../ps-select-dropdown/ps-dropdown-country/ps-dropdown-country.component.module';
import { PsDropDownIdTypesComponentModule } from '../../ps-select-dropdown/ps-dropdown-lov/ps-dropdown-id-types/ps-dropdown-id-types.component.module';
import { PsComplexIdDetailsComponent } from './ps-complex-id-details.component';



@NgModule({
  declarations: [PsComplexIdDetailsComponent],
  imports: [
    SharedModule,
    PsComponentsModule,
    PsInputFreeTextComponentModule,
    PsDropDownIdTypesComponentModule,
    PsDateDayMonthYearFutureComponentModule,
    PsDropdownCountryComponentModule,
    PsDateMonthYearPastComponentModule
  ],
  exports: [PsComplexIdDetailsComponent],
  entryComponents: [PsComplexIdDetailsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexIdDetailsModule { }
