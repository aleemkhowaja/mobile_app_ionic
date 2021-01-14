import { IOptionsPsInputFreeTextExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-free-text/ps-input-free-text.component.interfaces';
import { IOptionsPsInputNumericExposed } from '../../ps-keyin-input/ps-input-numeric/ps-input-numeric.component.interfaces';

import { IOptionsPsBaseGroupFormExposed , IOptionsPsSelectCheckboxExposed } from './../../../../commonSRC/psServices/models/ps-common-interface';

export interface IOptionsPsComplexBillItemExposed extends IOptionsPsBaseGroupFormExposed {
    checkBoxOptions?: IOptionsPsSelectCheckboxExposed;
    copyInputOptions?: IOptionsPsInputNumericExposed;
    originalInputOptions?: IOptionsPsInputNumericExposed;
    BillTypeArray?: any;
    otherInputOptions?: IOptionsPsInputFreeTextExposed;
}

