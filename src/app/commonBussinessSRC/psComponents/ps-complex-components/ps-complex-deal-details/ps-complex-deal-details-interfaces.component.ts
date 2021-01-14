import { IOptionsPsBaseFieldExposed, IOptionsPsContainerLookupOptionComponentExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';

export interface IOptionsPsComplexDealDetailsExposed extends IOptionsPsBaseFieldExposed{
    containerLookupOption?: IOptionsPsContainerLookupOptionComponentExposed;
    itemList?: any[];
    listOfOptions?: any[];
    showItemPopUp?: boolean;
    item?: any;
    showOnlyList?: boolean;
    isEditable?:boolean;
}

export interface IDealDetails {
    title?: string;
    subTitle?: string;
    nextPaymentDate?: string;
    nextPaymentVal?: string;
    paidAmount?: string;
    amount?: string;
    lastPaymentDate?: string;
    outstandingBalance?: string;
    noOfRemainingIns?: string;
  }