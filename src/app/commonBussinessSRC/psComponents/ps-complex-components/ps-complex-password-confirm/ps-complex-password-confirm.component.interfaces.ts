import { IOptionsPsInputPassword, IOptionsPsInputPasswordExposed, IOptionsPsKeyinInputExposed } from './../../../../commonSRC/psServices/models/ps-common-interface';

export interface IOptionsPasswordConfirmExposed extends IOptionsPsKeyinInputExposed {
    password?: IOptionsPsInputPassword;
    confirmPassword?: IOptionsPsInputPassword;
    allowUserSimilarToPassword?: boolean;
    username?: string;
    requestObject?: any;
}
