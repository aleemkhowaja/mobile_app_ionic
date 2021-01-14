import { IOptionsPsBaseFieldExposed } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsDropDownCountryExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-country/ps-dropdown-country.component.interfaces';
import { IOptionsPsDropdownRegionsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-regions/ps-dropdown-regions.component.interface';
import { IOptionsPsDropdownCitiesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-cities/ps-dropdown-cities.component.interface';

export interface IOptionsPsComplexCountryRegionsCitiesComponentExposed extends IOptionsPsBaseFieldExposed {
    countriesOptions?: IOptionsPsDropDownCountryExposed;
    regionOptions?: IOptionsPsDropdownRegionsExposed;
    cityOptions?: IOptionsPsDropdownCitiesExposed;
}