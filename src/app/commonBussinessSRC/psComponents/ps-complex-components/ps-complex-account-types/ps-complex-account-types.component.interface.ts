import { IOptionsPsBaseFieldExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsKeyinInputExposed } from 'src/app/commonSRC/psServices/models/ps-common-interface';

import { IOptionsPsDropdownAccountTypesExposed } from '../../ps-select-dropdown/ps-dropdown-account-types/ps-dropdown-account-types.component.interface';

export interface IOptionsPsComplexAccountTypesExposed extends IOptionsPsBaseFieldExposed {
    accountTypesOptions?: IOptionsPsDropdownAccountTypesExposed;
    periodicity?: IOptionsPsKeyinInputExposed;
    minimumBalance?: IOptionsPsKeyinInputExposed;
    requestObject?: any;
}
