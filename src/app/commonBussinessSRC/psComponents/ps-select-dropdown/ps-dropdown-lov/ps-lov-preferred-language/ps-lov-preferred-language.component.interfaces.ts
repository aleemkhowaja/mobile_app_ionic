import { IOptionsPsBaseGroupFormExposed } from './../../../../../commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsBaseFieldExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';

export interface IOptionsPsLovPreferredLanguageExposed extends IOptionsPsBaseGroupFormExposed,IOptionsPsBaseFieldExposed {
    iconLocation?:string;
}
