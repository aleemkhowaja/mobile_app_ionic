import { IOptionsPsSelectDropDownExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsSelect } from 'src/app/commonSRC/psServices/models/common-type';

export interface IOptionsPsDropDownIdTypesExposed extends IOptionsPsSelectDropDownExposed {
    listOfOptions?: PsSelect;
}
