import { Type } from '@angular/core';
import { IActionDetailsOptions, IMapKeyValue } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsBaseFieldExposed } from 'src/app/commonSRC/psServices/models/ps-common-interface';

export interface IOptionsPsSelectLookupOptionListComponentExposed extends IOptionsPsBaseFieldExposed {
    title?: string;
    subTitle?: string;
    labelsValueMap?: Map<string, IMapKeyValue>;
    headerMap?: Map<string, IMapKeyValue>;
    showTemplateCard?: boolean;
    itemList?: any[];
    showItemPopUp?: boolean;
    listOfOptions?: any;
    actionDetailsOptions?: IActionDetailsOptions[];
    showSelectedCard?: boolean;
    showDefaultTemplate?: boolean;
    component?: Type<any>;
    showOnlyList?: boolean;
}
