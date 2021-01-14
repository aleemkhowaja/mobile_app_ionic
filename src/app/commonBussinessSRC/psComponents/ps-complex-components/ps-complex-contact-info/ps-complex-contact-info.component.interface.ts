import { IOptionsPsBaseFieldExposed } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsEntityPhoneNumberExposed } from '../../ps-field-entity/ps-entity-phone-number/ps-entity-phone-number.component.interfaces';
import { IOptionsPsInputVarcharExposed } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';

export interface IOptionsPscomplexContactInfoExposed extends IOptionsPsBaseFieldExposed {
    emailOptions?: IOptionsPsInputVarcharExposed;
    fullNameOptions?: IOptionsPsInputVarcharExposed;
    phoneNumberOptions?: IOptionsPsEntityPhoneNumberExposed;
}
