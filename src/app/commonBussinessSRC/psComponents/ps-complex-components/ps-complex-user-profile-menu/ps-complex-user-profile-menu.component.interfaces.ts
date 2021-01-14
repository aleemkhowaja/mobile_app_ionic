import { IOptionsPsBaseFieldExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsBase } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsLabelUserEmailExposed } from '../../ps-label/ps-label-user-email/ps-label-user-email.component.interfaces';
import { IOptionsPsLabelUserLastLoginExposed } from '../../ps-label/ps-label-user-last-login/ps-label-user-last-login.component.interfaces';
import { IOptionsPsLabelWelcomeExposed } from '../../ps-label/ps-label-welcome/ps-label-welcome.component.interfaces';
import { IOptionsPsLovPreferredLanguageExposed } from '../../ps-select-dropdown/ps-dropdown-lov/ps-lov-preferred-language/ps-lov-preferred-language.component.interfaces';

/*
Author: E.Sayed
Date: 17Nov2019
WI: #928302
ps-complex-user-profile-menu
*/
export interface IOptionsPsComplexUserProfileMenuExposed extends IOptionsPsBaseFieldExposed, IOptionsPsBase {
   // userEmailOptions?: IOptionsPsLabelUserEmailExposed;
   // userLastLoginOptions?: IOptionsPsLabelUserLastLoginExposed;
   // labelWelcomeOptions?: IOptionsPsLabelWelcomeExposed;
   preferredLanguageOptions?: IOptionsPsLovPreferredLanguageExposed;


}

