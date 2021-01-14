import { IOptionsPsDateMonthYearExposed } from '../../ps-keyin-input/ps-date-month-year/ps-date-month-year.component.interfaces';
import { IOptionsPsInputFreeTextExposed } from '../../ps-keyin-input/ps-input-free-text/ps-input-free-text.component.interfaces';
import { IOptionsPsDropDownCountryExposed } from '../../ps-select-dropdown/ps-dropdown-country/ps-dropdown-country.component.interfaces';
import { IOptionsPsDropDownIdTypesExposed } from '../../ps-select-dropdown/ps-dropdown-lov/ps-dropdown-id-types/ps-dropdown-id-types.component.interfaces';
import { IOptionsPsBaseFieldExposed } from './../../../../commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsDateDayMonthYearFutureExposed } from './../../ps-keyin-input/ps-day-month-year/ps-date-day-month-year-future/ps-date-day-month-year-future.component.interfaces';


export interface IOptionsPsComplexIdDetailsExposed extends IOptionsPsBaseFieldExposed {
    dropdownIdTypesOptions?: IOptionsPsDropDownIdTypesExposed;
    idNumberOptions?: IOptionsPsInputFreeTextExposed;
    dateExpiryOptions?: IOptionsPsDateDayMonthYearFutureExposed;
    countriesOptions?: IOptionsPsDropDownCountryExposed;
    issueDateOptions?: IOptionsPsDateMonthYearExposed;
}
