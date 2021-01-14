import { IOptionsPsSelectDropdown } from 'src/app/commonSRC/psServices/models/ps-common-interface';


export interface IOptionsPsDropdownLov extends IOptionsPsSelectDropdown {
     lovTypeId?: number;
     iconLocation?: string;
     iconExtension?: string;
}
