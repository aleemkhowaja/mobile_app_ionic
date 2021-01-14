import { IOptionsPsLovCreditAvailabilityExposed } from '../../ps-select-dropdown/ps-dropdown-lov/ps-lov-credit-availability/ps-lov-credit-availability.component.interfaces';
import { IOptionsPsBaseFieldExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsKeyinInput } from 'src/app/commonSRC/psServices/models/ps-common-interface';

export interface IOptionsPsComplexCreditAvailabilityExposed extends IOptionsPsBaseFieldExposed {
    creditAvailabilityOptions?: IOptionsPsLovCreditAvailabilityExposed;
    payableAtOptions?: IOptionsPsKeyinInput;
    daysFromOptions?: IOptionsPsKeyinInput;

}
