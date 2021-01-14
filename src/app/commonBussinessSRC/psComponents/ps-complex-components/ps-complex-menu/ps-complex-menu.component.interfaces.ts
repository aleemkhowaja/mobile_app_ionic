import { IOptionsPsBaseFieldExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { IPageCommon } from 'src/app/commonSRC/psServices/models/ps-common-interface';

export interface IOptionsPsMenuExposed extends IOptionsPsBaseFieldExposed {
    pages?: Array<IPageBussiness>;
}

export interface IPageBussiness extends IPageCommon {
    operParentID?: number;
}
