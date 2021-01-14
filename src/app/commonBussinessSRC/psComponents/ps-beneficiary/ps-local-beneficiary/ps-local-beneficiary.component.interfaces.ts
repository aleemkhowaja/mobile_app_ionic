import { IOptionsPsBaseFieldExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';

export interface IOptionsPsLocalBeneficiaryExposed extends IOptionsPsBaseFieldExposed {
    itemList?: any[];
    listOfOptions?: any[];
    showItemPopUp?: boolean;
    item?: any;
    showOnlyList?: boolean;
    isEditable?: boolean;
    type?: string;
}
