import { IOptionsPsBaseFieldExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { Type } from '@angular/core';

export interface IOptionsPsLookupOwnDealsExposed extends IOptionsPsBaseFieldExposed{
    component?: Type<any>;
    requestObject?: any;
    listOfDeals?: any[];
}