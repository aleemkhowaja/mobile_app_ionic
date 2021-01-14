import { IOptionsPsBaseFieldExposed } from '../../psServices/models/ps-common-bussiness-interfaces';


export interface IOptionsPsOptionScheduledTransferExposed extends IOptionsPsBaseFieldExposed {
    itemList?: any[];
    listOfOptions?: IOmniScheduledTransfer[];
    showItemPopUp?: boolean;
    item?: any;
    showOnlyList?: boolean;
    isEditable?: boolean;
}
export interface IOmniScheduledTransfer extends IOmniTransactionDetails {
    reference?: string;
    type?: string;
    transactionStatus?: string;
    date?: string | Date;
    title?: string;
    subTtile?: string;
    transactionNumber?: string;
    toBeneficiary?: string;
    scheduler?: boolean;
    operId?: number;
    accGl?: string;
    workingCif?: string;
    serialNo?: string;
    transferType?: string;
    branch?: string;
}


export interface IOmniTransactionDetails {
    currencyDesciption?: string;
    fromCurrencyDescription?: string;
    fromAccount?: string;
    toAccount?: string;
    transactionAmount?: string;
    fromCurrency?: string;
    purpose?: string;
    subPurpose?: string;
    transactionNumber?: string;
    currency?: string;
    toBeneficiary?: string;
    toAccount_lookupKey?: string;
    fromAccount_lookupKey?: string;
    scheduler?: boolean;
    start?: Date;
    startDate?: Date;
    endDate?: Date;
    end?: Date;
    periodicity?: string;
    noOfPayments?: string;
    end_count?: string;
    noOfPayment?: string;
    toAccountType?: string;
    currencyBriefNameEnglish?: string;
    bankCifShortNameEng?: string;
    transactionDate?: string;
}