import { IOptionsPsBaseFieldExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsEntityPhoneNumberExposed } from '../../ps-field-entity/ps-entity-phone-number/ps-entity-phone-number.component.interfaces';
import { IOptionsPsInputEmailExposed } from '../../ps-keyin-input/ps-input-email/ps-input.email.component.interface';
import { IOptionsPsComplexUserAddressExposed } from '../ps-complex-address/ps-complex-address.component.interface';

export interface PsComplexCifDetailsExposed extends IOptionsPsBaseFieldExposed {
    mobileNumberOptions?: IOptionsPsEntityPhoneNumberExposed;
    residentialTelOptions?: IOptionsPsEntityPhoneNumberExposed;
    telOptions?: IOptionsPsEntityPhoneNumberExposed;
    faxOptions?: IOptionsPsEntityPhoneNumberExposed;
    emailOptions?: IOptionsPsInputEmailExposed;
    addressOptions?: IOptionsPsComplexUserAddressExposed;
    isInstitutionType?: boolean;
}
