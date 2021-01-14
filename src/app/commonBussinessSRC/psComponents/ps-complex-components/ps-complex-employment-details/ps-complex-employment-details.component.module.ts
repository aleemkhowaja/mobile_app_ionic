import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PsComponentsModule } from 'src/app/commonSRC/psComponents/ps-components.module';
import { SharedModule } from 'src/app/commonSRC/shared.module';
import { PsEntityPhoneNumberComponentModule } from '../../ps-field-entity/ps-entity-phone-number/ps-entity-phone-number.component.module';

import { PsDateDayMonthYearPastComponentModule } from '../../ps-keyin-input/ps-day-month-year/ps-date-day-month-year-past/ps-date-day-month-year-past.component.module';
import { PsInputFreeTextComponentModule } from '../../ps-keyin-input/ps-input-free-text/ps-input-free-text.component.module';
import { PsInputNumericComponentModule } from '../../ps-keyin-input/ps-input-numeric/ps-input-numeric.component.module';
import { PsInputVarcharComponentModule } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.module';
import { PsDropdownOccupationComponentModule } from '../../ps-select-dropdown/ps-dropdown-occupation/ps-dropdown-occupation.component.module';
import { PsComplexAddressComponentModule } from '../ps-complex-address/ps-complex-address.component.module';
import { PsComplexEmploymentDetailsComponent } from './ps-complex-employment-details.component';



@NgModule({
    declarations: [
        PsComplexEmploymentDetailsComponent
    ],
    imports: [
        SharedModule,
        PsComponentsModule,
        PsInputFreeTextComponentModule,
        PsInputNumericComponentModule,
        PsComplexAddressComponentModule,
        PsInputVarcharComponentModule,
        PsDateDayMonthYearPastComponentModule,
        PsDropdownOccupationComponentModule,
        PsEntityPhoneNumberComponentModule
    ],
    exports: [
        PsComplexEmploymentDetailsComponent
    ],
    entryComponents: [
        PsComplexEmploymentDetailsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PsComplexEmploymentDetailsComponentModule { }