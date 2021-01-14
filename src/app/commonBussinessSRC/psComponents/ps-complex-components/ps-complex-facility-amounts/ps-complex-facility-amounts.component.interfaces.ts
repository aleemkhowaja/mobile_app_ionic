import { IOptionsPsInputAmount, IOptionsPsBaseFieldExposed } from 'src/app/commonSRC/psServices/models/ps-common-interface';

export interface IOptionsPsComplexFacilityAmountExposed extends IOptionsPsBaseFieldExposed {
    downPaymentOptions?: IOptionsPsInputAmount;
    financeAmountOptions?: IOptionsPsInputAmount;
}
