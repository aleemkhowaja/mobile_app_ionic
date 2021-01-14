import { IOptionsPsSelectDropDownExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';

//Author: GRadwan 16/01/2020
export interface IOptionsPsDropdownRegionsExposed extends IOptionsPsSelectDropDownExposed {
    selectedCountryCode?:string;
}
