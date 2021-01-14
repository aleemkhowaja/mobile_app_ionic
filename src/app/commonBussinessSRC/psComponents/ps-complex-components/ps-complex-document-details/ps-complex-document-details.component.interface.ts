import { IOptionsPsSelectCheckbox } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsBaseFieldExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsInputFreeTextExposed } from '../../ps-keyin-input/ps-input-free-text/ps-input-free-text.component.interfaces';
import { IOptionsPsInputNumericExposed } from '../../ps-keyin-input/ps-input-numeric/ps-input-numeric.component.interfaces';
import { IOptionsPsDropdownLov } from '../../ps-select-dropdown/ps-dropdown-lov/ps-dropdown-lov.component.interfaces';

export interface IOptionsPsComplexDocumentDetailsExposed extends IOptionsPsBaseFieldExposed {

    documentdetailsCheckbox?: IOptionsPsSelectCheckbox;
    documentType?:'N'|'T';
    documentDetailsFreeTextOptions?:IOptionsPsInputFreeTextExposed;
    documentDetailsNumericOptions?:IOptionsPsInputNumericExposed;
    documentDetailsLovOptions?:IOptionsPsDropdownLov;
    hasLov?:boolean;

}
