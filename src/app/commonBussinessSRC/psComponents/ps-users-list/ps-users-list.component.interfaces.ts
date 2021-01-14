import { IOptionsPsBaseFieldExposed } from '../../psServices/models/ps-common-bussiness-interfaces';

export interface IOptionsPsUsersListExposed extends IOptionsPsBaseFieldExposed {
    itemList?: any[];
    listOfOptions?: any[];
    showItemPopUp?: boolean;
    item?: any;
    showOnlyList?: boolean;
    isEditable?: boolean;
    allowedActions?: IOptionsActionTypeInterface;
    rePopulateList?: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IOptionsActionTypeInterface {
    activate?: boolean;
    suspend?: boolean;
    delete?: boolean;
    edit?: boolean;
}
