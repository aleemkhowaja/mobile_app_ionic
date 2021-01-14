import { IOptionsPsBaseFieldExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';

import { IOptionsPsInputVarcharExposed } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsDropdownRegionsExposed } from '../../ps-select-dropdown/ps-dropdown-regions/ps-dropdown-regions.component.interface';

export interface IOptionsPsComplexPoBoxExposed extends IOptionsPsBaseFieldExposed {
    regionOptions?:IOptionsPsDropdownRegionsExposed,
    poBoxInputOptions?:IOptionsPsInputVarcharExposed,
}