import { IOptionsPsSelectDropDownExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';

export interface IOptionsPsDropdownAccountTypesExposed extends IOptionsPsSelectDropDownExposed {
    allowedAccountType?: string;
    accountCategory?: string;
}
