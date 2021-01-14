import { IOptionsPsSelectCheckboxExposed } from 'src/app/commonSRC/psServices/models/ps-common-interface';

import { IOptionsPsContainerHtmlViewerExposed } from '../../../psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsBaseFieldExposed } from './../../../../commonSRC/psServices/models/ps-common-interface';




/*
TODO: handle api calling
Author: H.Hassan
Date: 21Oct2019
WI: #915289
ps-complex-template-terms-and-conditions
*/

export interface IOptionsPsComplexTermsAndConditionsExposed extends IOptionsPsBaseFieldExposed {
    checkBoxOptions?: IOptionsPsSelectCheckboxExposed;
    htmlViewerOptions?: IOptionsPsContainerHtmlViewerExposed;
    chargesAmount?: string;
}
