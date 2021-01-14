import { IOptionsPsDropDownCountryExposed } from './../../ps-select-dropdown/ps-dropdown-country/ps-dropdown-country.component.interfaces';
import { IOptionsPsDropdownGoodsExposed } from './../../ps-select-dropdown/ps-dropdown-goods/ps-dropdown-goods.component.interfaces';

import { IOptionsPsBaseGroupFormExposed } from './../../../../commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsDropdownGoodCategoriesExposed } from '../../ps-select-dropdown/ps-dropdown-good-categories/ps-dropdown-good-categories.component.interfaces';

export interface IOptionsPsComplexGoodsExposed extends IOptionsPsBaseGroupFormExposed {

    countryGoodsOptions?: IOptionsPsDropDownCountryExposed;
    goodOptions?: IOptionsPsDropdownGoodsExposed;
    goodCategoriesOptions?: IOptionsPsDropdownGoodCategoriesExposed;

}

