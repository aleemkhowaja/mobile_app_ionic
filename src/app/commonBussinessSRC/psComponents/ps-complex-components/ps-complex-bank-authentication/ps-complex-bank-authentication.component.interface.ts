import { IOptionsPsInputAccountNumberExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-account-number/ps-input-account-number.component.interface';

import { IOptionsPsInputCardNumberExposed } from '../../ps-keyin-input/ps-input-card-number/ps-input-card-number.component.interfaces';
import { IOptionsPsBaseFieldExposed } from './../../../../commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsInputVarcharExposed } from './../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';

export interface IOptionsPsComplexBankAuthenticationExposed extends IOptionsPsBaseFieldExposed {
    acNumOptions?: IOptionsPsInputAccountNumberExposed;
    varcharOptions?: IOptionsPsInputVarcharExposed;
    cardNumberOptions?: IOptionsPsInputCardNumberExposed;
}
