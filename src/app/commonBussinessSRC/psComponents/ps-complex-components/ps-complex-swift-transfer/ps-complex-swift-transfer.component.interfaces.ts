import { Type } from '@angular/core';
import { IOptionsPsBaseFieldExposed } from 'src/app/commonSRC/psServices/models/ps-common-interface';

export interface IOptionsPsComplexSwiftTransferExposed extends IOptionsPsBaseFieldExposed {
    listOfSwiftAccounts?: any[];
    currency?: string;
    component?: Type<any>;
    showOnlyList?: boolean;
}
