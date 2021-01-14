import { IOptionsPsBaseFieldExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsEntityPhoneNumberExposed } from '../../ps-field-entity/ps-entity-phone-number/ps-entity-phone-number.component.interfaces';

import { IOptionsPsInputVarcharExposed } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';

export interface IOptionsPsComplexUserContactExposed extends IOptionsPsBaseFieldExposed {
    emailBankOptions?: IOptionsPsInputVarcharExposed;
    phoneNumberBankOptions?: IOptionsPsEntityPhoneNumberExposed;
}
