import { IOptionsPsBaseFieldExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';

import { IOptionsPsInputFreeTextExposed } from '../../ps-keyin-input/ps-input-free-text/ps-input-free-text.component.interfaces';
import { IOptionsPsInputVarcharExposed } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsDropdownCitiesExposed } from '../../ps-select-dropdown/ps-dropdown-cities/ps-dropdown-cities.component.interface';
import { IOptionsPsDropDownCountryExposed } from '../../ps-select-dropdown/ps-dropdown-country/ps-dropdown-country.component.interfaces';
import { IOptionsPsDropdownPostalCodesExposed } from '../../ps-select-dropdown/ps-dropdown-postal-codes/ps-dropdown-postal-codes.component.interfaces';
import { IOptionsPsDropdownRegionsExposed } from '../../ps-select-dropdown/ps-dropdown-regions/ps-dropdown-regions.component.interface';
import { IOptionsPsComplexPoBoxExposed } from '../ps-complex-po-box/ps-complex-po-box.component.interfaces';


export interface IOptionsPsComplexUserAddressExposed extends IOptionsPsBaseFieldExposed {
    areaOptions?:IOptionsPsInputFreeTextExposed,
    buildingOptions?:IOptionsPsInputFreeTextExposed,
    wayOptions?:IOptionsPsInputFreeTextExposed
    poBoxOptions?:IOptionsPsComplexPoBoxExposed,
    streetOptions?:IOptionsPsInputFreeTextExposed,
    countriesOptions?: IOptionsPsDropDownCountryExposed,
    regionOptions?:IOptionsPsDropdownRegionsExposed,
    cityOptions?:IOptionsPsDropdownCitiesExposed,
    postalCodesOptions?:IOptionsPsDropdownPostalCodesExposed,
    poBoxInputOptions?: IOptionsPsInputVarcharExposed ;
}
