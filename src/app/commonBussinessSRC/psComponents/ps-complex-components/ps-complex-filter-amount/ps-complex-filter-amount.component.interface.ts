import { IOptionsPsBaseFieldExposed, IOptionsPsInputAmount } from 'src/app/commonSRC/psServices/models/ps-common-interface';

export interface IOptionsPSComplexAmountFilter extends IOptionsPsBaseFieldExposed {
    min?: IOptionsPsInputAmount;
    max?: IOptionsPsInputAmount;
}