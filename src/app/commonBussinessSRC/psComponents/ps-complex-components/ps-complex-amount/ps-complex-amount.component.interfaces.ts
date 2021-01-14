import { IOptionsPsBaseFieldExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsActionImage, IOptionsPsInputAmount } from 'src/app/commonSRC/psServices/models/ps-common-interface';

import { IOptionsPsDropdownCurrenciesExposed } from '../../ps-select-dropdown/ps-dropdown-currencies/ps-dropdown-currencies.component.interfaces';

export interface IOptionsPsComplexAmountExposed extends IOptionsPsBaseFieldExposed {
    currenciesOptions?: IOptionsPsDropdownCurrenciesExposed;
    amountOptions?: IOptionsPsInputAmount;
    currency?: string;
    currencyCode?: number;
    currencyDisabled?: boolean;
    currencyFlagOptions?: IOptionsPsActionImage;
    amount?: number;
    currencyObj?: any;

}
