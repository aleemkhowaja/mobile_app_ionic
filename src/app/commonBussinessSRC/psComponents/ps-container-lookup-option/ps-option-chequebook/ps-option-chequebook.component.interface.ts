import { IOptionsPsBaseFieldExposed } from './../../../../commonSRC/psServices/models/ps-common-interface';

export interface IOptionsPsOptionChequebookExposed extends IOptionsPsBaseFieldExposed{
    chequebookInformation?: IChequebooksListResponse;
    itemList?: any[];
    listOfOptions?: any[];
    showItemPopUp?: boolean;
    item?: any;
    showOnlyList?: boolean;
    isEditable?: boolean;
}

export interface IChequebooksListRequest {
    cifNo?: string;
}

export interface IChequebooksListResponse {
    fromNumber?: string;
    printingLocation?: string;
    chequebookCode?: string;
    chequebookStatus?: string;
    toNumber?: string;
    cif?: string;
    additionalRef?: string;
    accGl?: string;
    currency?: string;
    branch?: string;
    serialNo?: string;
    chequeCode?: string;
    chequeTypeName?: string;
    lookupKey?: number | string;
    chequebookStatusDesc?: string;
}