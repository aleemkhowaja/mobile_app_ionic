import { IOptionsPsKeyinInput, IOptionsPsKeyinInputExposed } from '../../../../commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsInputNumericExposed } from '../ps-input-numeric/ps-input-numeric.component.interfaces';

export interface IOptionsPsInputCountExposed extends IOptionsPsKeyinInputExposed {
    min?: number;
    max?: number;
    inputCountOptions: IOptionsPsInputNumericExposed;
    inputDefaultOptions?: IOptionsPsKeyinInput;
    defaultValue?: string;
    inputCountObject?: any;
}
