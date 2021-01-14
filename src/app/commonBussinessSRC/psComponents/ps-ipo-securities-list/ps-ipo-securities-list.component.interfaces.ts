import { IOptionsPsBaseFieldExposed } from '../../psServices/models/ps-common-bussiness-interfaces';

export interface IOptionsPsIpoSecuritiesListExposed extends IOptionsPsBaseFieldExposed {
    itemList?: any[];
    listOfOptions?: any[];
    showItemPopUp?: boolean;
    item?: any;
    showOnlyList?: boolean;
    isEditable?: boolean;
}
