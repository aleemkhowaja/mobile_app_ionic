import { IOptionsPsSelectDropDownExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';

export interface IOptionsPsDropdownPostalCodesExposed extends IOptionsPsSelectDropDownExposed {
    selectedCountryCode?:string;
    selectedRegionCode?:string;
}
