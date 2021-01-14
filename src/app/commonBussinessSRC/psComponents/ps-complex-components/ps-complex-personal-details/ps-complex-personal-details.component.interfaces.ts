import { IOptionsPsBaseFieldExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsDateDayMonthYearPastAsStringExposed } from '../../ps-keyin-input/ps-day-month-year/ps-date-day-month-year-past/ps-date-day-month-year-past-asString/ps-date-day-month-year-past-asString.component.interface';
import { IOptionsPsInputVarcharExposed } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { PsDropdownMaritalStatusExposed } from '../../ps-select-dropdown/ps-dropdown-marital-status/ps-dropdown-marital-status.component.interfaces';
import { IOptionsPsDropdownNationalitiesExposed } from '../../ps-select-dropdown/ps-dropdown-nationalities/ps-dropdown-nationalities.component.interfaces';


export interface PsComplexPersonalDetailsExposed extends IOptionsPsBaseFieldExposed {
    customerNameOptions?: IOptionsPsInputVarcharExposed;
    /** Updated by Hisham.Omar TP#1136182 start */
    psDobOptions?: IOptionsPsDateDayMonthYearPastAsStringExposed;
    /** Updated by Hisham.Omar TP#1136182 end */
    nationalityOptions?: IOptionsPsDropdownNationalitiesExposed;
    maritalstatusOptions?: PsDropdownMaritalStatusExposed;
    isInstitutionType?: boolean;
}
