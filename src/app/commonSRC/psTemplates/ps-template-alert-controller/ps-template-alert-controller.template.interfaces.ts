import { IOptionsPsSelectDropDownExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsActionButton, IOptionsPsActionImageExposed, IOptionsPsButtonSubmitExposed, IOptionsPsFieldKeyinExposed, IOptionsSelectRadio } from 'src/app/commonSRC/psServices/models/ps-common-interface';

export interface IOptionsPsComplexAlertController {
    header?: string;
    subHeader?: string;
    message?: string;
    cssClass?: string;
    inputs?: IOptionsPsAlertInput[];
    buttons?: IOptionsPsAlertButton[];
    id?: string;
    headerImageOptions?: IOptionsPsActionImageExposed;
}


export interface IOptionsPsAlertInput {
    type?: 'keyin' | 'dropdown' | 'radio';
    subType?: any;
    options: IOptionsPsFieldKeyinExposed | IOptionsPsSelectDropDownExposed | IOptionsSelectRadio;
}


export interface IOptionsPsAlertButton {
    options?: IOptionsPsActionButton | IOptionsPsButtonSubmitExposed;
    role?: 'cancel' | 'submit';
    handler?: (value?: any) => boolean | void | {
        [key: string]: any;
    };
    buttonSize?: string;
}

