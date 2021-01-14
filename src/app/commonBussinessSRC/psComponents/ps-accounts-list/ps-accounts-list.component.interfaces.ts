import { IOptionsPsBaseFieldExposed } from '../../psServices/models/ps-common-bussiness-interfaces';

export interface IOptionsPsAccountsListExposed extends IOptionsPsBaseFieldExposed {
    itemList?: any[];
    listOfOptions?: any[];
    showItemPopUp?: boolean;
    item?: any;
    showOnlyList?: boolean;
    isEditable?: boolean;
    isFMA?:boolean;
    requestObject?: any;
}
