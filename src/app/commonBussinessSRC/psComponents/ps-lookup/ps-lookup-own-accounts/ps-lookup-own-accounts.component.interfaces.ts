import { Type } from '@angular/core';
import { IAccounts } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsBaseFieldExposed } from 'src/app/commonSRC/psServices/models/ps-common-interface';

export interface IOptionsPsLookupOwnAccountsExposed extends IOptionsPsBaseFieldExposed {
    listOfAccounts?: IAccounts[];
    accountNumber?: string;
    currency?: string;
    accountAllowedCurrencies?: any[];
    accountAllowedTypes?: any[];
    glTypes?: string;
    component?: Type<any>;
    showOnlyList?: boolean;
    accountType?: string;
    fromTo: string;
    fromCurrency?: string;
    toCurrency?: string;
    requestObject: any;
}
