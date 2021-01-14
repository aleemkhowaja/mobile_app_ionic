import { IOptionsPsBaseFieldExposed } from '../../psServices/models/ps-common-bussiness-interfaces';

export interface IOptionsPsSwiftAccountListExposed extends IOptionsPsBaseFieldExposed {
    itemList?: any[];
    listOfOptions?: any[];
    showItemPopUp?: boolean;
    item?: any;
    showOnlyList?: boolean;
    isEditable?: boolean;
}
