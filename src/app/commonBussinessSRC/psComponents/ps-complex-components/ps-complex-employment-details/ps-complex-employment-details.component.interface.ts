import { IOptionsPsBaseFieldExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsEntityPhoneNumberExposed } from '../../ps-field-entity/ps-entity-phone-number/ps-entity-phone-number.component.interfaces';

import { IOptionsPsDateMonthYearExposed } from '../../ps-keyin-input/ps-date-month-year/ps-date-month-year.component.interfaces';
import { IOptionsPsInputVarcharExposed } from '../../ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsDropdownOccupationExposed } from '../../ps-select-dropdown/ps-dropdown-occupation/ps-dropdown-occupation.component.interface';
import { IOptionsPsComplexUserAddressExposed } from '../ps-complex-address/ps-complex-address.component.interface';

export interface PsComplexEmploymentDetailsExposed extends IOptionsPsBaseFieldExposed {
    employerNameOptions?: IOptionsPsInputVarcharExposed;
    occupationOptions?: IOptionsPsDropdownOccupationExposed;
    addressOptions?: IOptionsPsComplexUserAddressExposed;
    dateOfJoiningDivisionOptions?: IOptionsPsDateMonthYearExposed;
    officeTelPhoneNumberOptions?: IOptionsPsEntityPhoneNumberExposed;
    handPhoneNumberOptions?: IOptionsPsEntityPhoneNumberExposed;
    faxOptions?: IOptionsPsEntityPhoneNumberExposed;
    isInstitutionType?: boolean;
    establishmentDateOptions?: IOptionsPsDateMonthYearExposed;
}
