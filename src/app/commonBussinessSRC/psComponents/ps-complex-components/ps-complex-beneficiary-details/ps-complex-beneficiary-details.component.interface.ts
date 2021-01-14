import { IOptionsPsBaseFieldExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsSelectDropdown } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsEntityPhoneNumberExposed } from '../../ps-field-entity/ps-entity-phone-number/ps-entity-phone-number.component.interfaces';

import { IOptionsPsInputAccountNumberExposed } from '../../ps-keyin-input/ps-input-account-number/ps-input-account-number.component.interface';
import { IOptionsPsInputVarcharExposed } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';

export interface PsComplexBeneficiaryDetailsExposed extends IOptionsPsBaseFieldExposed {
    beneficiaryType?: 'local' | 'internal' | 'international';
    benefNameOptions?: IOptionsPsInputVarcharExposed;
    benefAccountNumberOptions?: IOptionsPsInputAccountNumberExposed;
    currencyOptions?: IOptionsPsSelectDropdown;
    benefPhoneOptions?: IOptionsPsEntityPhoneNumberExposed;
    benefReasonOptions?: IOptionsPsInputVarcharExposed;

}
