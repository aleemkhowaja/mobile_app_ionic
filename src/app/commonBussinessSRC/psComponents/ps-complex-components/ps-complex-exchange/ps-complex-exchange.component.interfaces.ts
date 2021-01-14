import { IOptionsPsBaseFieldExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';

import { IOptionsPsComplexAmountExposed } from './../ps-complex-amount/ps-complex-amount.component.interfaces';

export interface IOptionsPsComplexExchnageExposed extends IOptionsPsBaseFieldExposed {
    fromAmountOptions?: IOptionsPsComplexAmountExposed;
    toAmountOptions?: IOptionsPsComplexAmountExposed;
    editableMode?: boolean;
    showToCurrencyOptions?: boolean;
    operId?: number;
    requestObject?: any;
    fromCurrency?: IPsSelect;
}
