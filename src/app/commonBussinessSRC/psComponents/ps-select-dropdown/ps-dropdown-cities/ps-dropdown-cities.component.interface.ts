import { IOptionsPsSelectDropDownExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';

//Author: GRadwan 16Jan2020

export interface IOptionsPsDropdownCitiesExposed extends IOptionsPsSelectDropDownExposed {
    selectedCountryCode?:string;
    selectedRegionCode?:string;
}
