import { IOptionsPsSelectDropDownExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';

export interface IOptionsPsDropdownAllowedLanguagesExposed extends IOptionsPsSelectDropDownExposed {
    changeSystemLanguage?: boolean; // Heba.Hassan 16 July 2020 TP #1038877 - flag must be true to change system language by default on change of languages
}
