import { IOptionsPsBaseFieldExposed, IOptionsPsKeyinDate } from 'src/app/commonSRC/psServices/models/ps-common-interface';

export interface IOptionsPSComplexDateFilter extends IOptionsPsBaseFieldExposed {
    fromDate?: IOptionsPsKeyinDate;
    toDate?: IOptionsPsKeyinDate;
}