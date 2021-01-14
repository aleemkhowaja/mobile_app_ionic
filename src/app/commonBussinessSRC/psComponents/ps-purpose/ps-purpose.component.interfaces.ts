import { ICategorySubCategoryOptions, IOptionsPsBaseFieldExposed } from '../../psServices/models/ps-common-bussiness-interfaces';

export interface IOptionsPsPurposeExposed extends IOptionsPsBaseFieldExposed, ICategorySubCategoryOptions {
    requestObject?: any;
}

