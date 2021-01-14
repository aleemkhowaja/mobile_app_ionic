import { Type } from '@angular/core';
import { IOptionsPsBaseFieldExposed } from 'src/app/commonSRC/psServices/models/ps-common-interface';

export interface IOptionsPsLookupBenificiariesInternalExposed extends IOptionsPsBaseFieldExposed {
    listOfBenificiaries?: any[];
    currency?: string;
    component?: Type<any>;
    showOnlyList?: boolean;
    type?: string;
    isEditable?: boolean;
    requestObject: any;
}
