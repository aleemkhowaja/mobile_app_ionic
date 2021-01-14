import { IOptionsPsActionHyperlinkExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsHyperlinkAnchor } from 'src/app/commonSRC/psServices/models/ps-common-interface';


export interface IOptionsPsAnchorSwitcherExposed extends IOptionsPsHyperlinkAnchor {
    listOfOptions?: Array<IOptionsPsActionHyperlinkExposed>;
}
