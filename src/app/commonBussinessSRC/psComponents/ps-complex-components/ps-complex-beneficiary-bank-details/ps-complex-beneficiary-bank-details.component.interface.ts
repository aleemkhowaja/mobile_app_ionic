import { IOptionsPsBaseFieldExposed, IOptionsPsSelectDropdown } from '../../../../commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsInputVarcharExposed } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsDropDownCountryExposed } from '../../ps-select-dropdown/ps-dropdown-country/ps-dropdown-country.component.interfaces';
import { IOptionsPsDropdownRegionsExposed } from '../../ps-select-dropdown/ps-dropdown-regions/ps-dropdown-regions.component.interface';
import { IOptionsPsDropdownCitiesExposed } from '../../ps-select-dropdown/ps-dropdown-cities/ps-dropdown-cities.component.interface';

export interface IOptionsPsComplexBenefBankDetailsComponentExposed extends IOptionsPsBaseFieldExposed {
    //transferType?: 'local' | 'international'|'internal';
    //BankOptions?: IOptionsPsSelectDropdown;
    countriesOptions?: IOptionsPsDropDownCountryExposed,
    swiftCodeOptions?: IOptionsPsInputVarcharExposed;
    bankNameOptions?: IOptionsPsInputVarcharExposed;
    branchNameOptions?: IOptionsPsInputVarcharExposed;
    regionOptions?:IOptionsPsDropdownRegionsExposed,
    cityOptions?:IOptionsPsDropdownCitiesExposed,
}
