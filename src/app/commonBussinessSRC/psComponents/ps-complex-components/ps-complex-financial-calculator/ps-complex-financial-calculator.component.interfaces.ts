import { IProductClass } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';

import { IOptionsPsInputCountExposed } from '../../ps-keyin-input/ps-input-count/ps-input-count.component.interfaces';
import { IOptionsPsDropdownProductTypesExposed } from '../../ps-select-dropdown/ps-dropdown-product-types/ps-dropdown-product-types.component.interfaces';
import { IOptionsPsBaseGroupFormExposed, IOptionsPsInputAmount, IOptionsPsLabel } from './../../../../commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsComplexAmountExposed } from './../ps-complex-amount/ps-complex-amount.component.interfaces';

export interface IOptionsPsComplexFinancialCalculcatorExposed extends IOptionsPsBaseGroupFormExposed {
    productTypesOptions?: IOptionsPsDropdownProductTypesExposed;
    complexAmountOptions?: IOptionsPsComplexAmountExposed;
    downPaymentOptions?: IOptionsPsInputAmount;
    numberOfInstallmentsCountOptions?: IOptionsPsInputCountExposed;
    amountLabelOptions?: IOptionsPsLabel;
    paymentsLabelOptions?: IOptionsPsLabel;
    downPaymentExists? : boolean;
}

