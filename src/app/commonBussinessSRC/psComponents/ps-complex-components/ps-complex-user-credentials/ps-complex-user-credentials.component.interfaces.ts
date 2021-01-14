import { IOptionsPasswordConfirmExposed } from '../ps-complex-password-confirm/ps-complex-password-confirm.component.interfaces';
import { IOptionsPinConfirmExposed } from '../ps-complex-password-confirm/ps-confirm-pin/ps-confirm-pin.component.interfaces';
import { IOptionsPsComplexSecurityQuestionExposed } from '../ps-complex-security-questions/ps-complex-security-questions.component.interfaces';
import { IOptionsPsBaseFieldExposed, IOptionsPsInputUserNameExposed } from './../../../../commonSRC/psServices/models/ps-common-interface';


export interface IOptionsPsComplexUserCredentialExposed extends IOptionsPsBaseFieldExposed {
    userNameOption?: IOptionsPsInputUserNameExposed;
    passwordConfirmOptions?: IOptionsPasswordConfirmExposed;
    pinConfirmOptions?: IOptionsPinConfirmExposed;
    securityQuestionOptions?: IOptionsPsComplexSecurityQuestionExposed;
}
