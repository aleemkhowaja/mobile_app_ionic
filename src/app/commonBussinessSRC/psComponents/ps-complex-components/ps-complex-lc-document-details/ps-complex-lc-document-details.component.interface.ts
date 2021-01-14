import { IOptionsPsSelectCheckbox } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsBaseFieldExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsInputFreeTextExposed } from '../../ps-keyin-input/ps-input-free-text/ps-input-free-text.component.interfaces';
import { IOptionsPsInputNumericExposed } from '../../ps-keyin-input/ps-input-numeric/ps-input-numeric.component.interfaces';
import { IOptionsPsLovABOrignalForExposed } from '../../ps-select-dropdown/ps-dropdown-lov/ps-lov-ab-orignal-for/ps-lov-ab-orignal-for.component.interfaces';

export interface IOptionsPsComplexLcDocumentDetailsExposed extends IOptionsPsBaseFieldExposed {

    documentdetailsCheckbox?: IOptionsPsSelectCheckbox;
    documentType?:'N'|'T';
    documentDetailsFreeText?:IOptionsPsInputFreeTextExposed;
    documentDetailsNumeric?:IOptionsPsInputNumericExposed;
    airwayBillLovOptions?:IOptionsPsLovABOrignalForExposed;
    hasLov?:boolean;

}
