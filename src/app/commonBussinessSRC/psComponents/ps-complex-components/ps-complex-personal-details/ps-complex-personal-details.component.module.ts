import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';

import { PsDateDayMonthYearPastComponentModule } from '../../ps-keyin-input/ps-day-month-year/ps-date-day-month-year-past/ps-date-day-month-year-past.component.module';
import { PsInputVarcharComponentModule } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsDropdownMaritalStatusComponentModule } from '../../ps-select-dropdown/ps-dropdown-marital-status/ps-dropdown-marital-status.component.module';
import { PsDropdownNationalitiesComponentModule } from '../../ps-select-dropdown/ps-dropdown-nationalities/ps-dropdown-nationalities.component.module';
import { PsDateDayMonthYearPastAsStringComponentModule } from './../../ps-keyin-input/ps-day-month-year/ps-date-day-month-year-past/ps-date-day-month-year-past-asString/ps-date-day-month-year-past-asString.component.module';
import { PsComplexPersonalDetailsComponent } from './ps-complex-personal-details.component';



@NgModule({
    declarations: [
        PsComplexPersonalDetailsComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsInputVarcharComponentModule,
        PsDateDayMonthYearPastComponentModule,
        PsDateDayMonthYearPastAsStringComponentModule,
        PsDropdownMaritalStatusComponentModule,
        PsDropdownNationalitiesComponentModule
    ],
    exports: [
        PsComplexPersonalDetailsComponent
    ],
    entryComponents: [
        PsComplexPersonalDetailsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexPersonalDetailsComponentModule { }