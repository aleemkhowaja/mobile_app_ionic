import { Type } from '@angular/core';
import { IMapKeyValue } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsActionIcon, IOptionsPsBaseFieldExposed } from 'src/app/commonSRC/psServices/models/ps-common-interface';

export interface IOptionsPsComplexLookUpComponentExposed extends IOptionsPsBaseFieldExposed {
    refreshIconOptions?: IOptionsPsActionIcon;
    listPopupOptions?: IOptionsPsActionIcon;
    showDropdownIcon?: boolean;
    component?: Type<any>;
    listOfOptions?: any[];
    showDefaultTemplate?: boolean;
    title?: string;
    subTitle?: string;
    labelsValueMap?: Map<string, IMapKeyValue>;
    showOnlyList?: boolean;
    itemList?: any[];
    requestObject: any;
    notFoundMessage: string;
}
