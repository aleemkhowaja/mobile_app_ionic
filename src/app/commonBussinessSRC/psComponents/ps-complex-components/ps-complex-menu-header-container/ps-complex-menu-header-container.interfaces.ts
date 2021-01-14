import { IOptionsPsBaseFieldExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';

export interface IOptionsPsMenuHeaderExposed extends IOptionsPsBaseFieldExposed {
    timeout?: number;
    showProfile?: boolean;
    isWideLayout?: boolean;
    //sessionExist?:boolean;
}
