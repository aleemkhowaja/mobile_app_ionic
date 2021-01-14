import { IOptionsPsInputAccountNumberExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-account-number/ps-input-account-number.component.interface';

import { IOptionsPsInputCardNumberExposed } from '../../ps-keyin-input/ps-input-card-number/ps-input-card-number.component.interfaces';
import { IOptionsPsBaseFieldExposed } from './../../../../commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsInputVarcharExposed } from './../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsDropdownCifTypesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-cif-types/ps-dropdown-cif-types.component.interfaces';
import { IOptionsPsComplexIdDetailsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-id-details/ps-complex-id-details.interface';

export interface IOptionsPsComplexCifIdTypesExposed extends IOptionsPsBaseFieldExposed {
    cifTypeOptions?: IOptionsPsDropdownCifTypesExposed;
    complexIdDetailsOptions?: IOptionsPsComplexIdDetailsExposed;
    complexIdDetailsOptions1?: IOptionsPsComplexIdDetailsExposed;
    requestObject?: any;
    showCifType?: boolean;
}
