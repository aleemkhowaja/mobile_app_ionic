import { IOptionsPsSelectDropDownExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';

export interface IOptionsPsDropdownBranchesExposed extends IOptionsPsSelectDropDownExposed {
    selectedCityCode?: string;
}
