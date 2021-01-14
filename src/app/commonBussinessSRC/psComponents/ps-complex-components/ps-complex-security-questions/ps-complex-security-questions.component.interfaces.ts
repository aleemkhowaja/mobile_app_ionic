import { IOptionsPsInputFreeTextExposed } from '../../ps-keyin-input/ps-input-free-text/ps-input-free-text.component.interfaces';
import { IOptionsPsDropdownSecurityQuestionExposed } from '../../ps-select-dropdown/ps-dropdown-security-question/ps-dropdown-security-question.component.interfaces';
import { IOptionsPsBaseFieldExposed } from './../../../../commonSRC/psServices/models/ps-common-interface';

export interface IOptionsPsComplexSecurityQuestionExposed extends IOptionsPsBaseFieldExposed {
    securityQuestionOptions: IOptionsPsDropdownSecurityQuestionExposed;
    securityAnswerOptions: IOptionsPsInputFreeTextExposed;
}
