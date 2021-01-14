import { IOptionsPsInputVarcharExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsKeyinInputExposed } from 'src/app/commonSRC/psServices/models/ps-common-interface';

import { IOptionsPsBaseGroupFormExposed, IOptionsPsInputAmount } from './../../../../commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsComplexAmountExposed } from './../ps-complex-amount/ps-complex-amount.component.interfaces';
import { IOptionsPsDropdownFacilityTypesExposed } from '../../ps-select-dropdown/ps-dropdown-facility-types/ps-dropdown-facility-types.component.interfaces';
import { IOptionsPsLabelCifBranchExposed } from '../../ps-label/ps-label-cif-branch/ps-label-cif-branch.component.interface';

export interface IOptionsPsComplexFacilityRequestExposed extends IOptionsPsBaseGroupFormExposed {
    facilitytypesOptions: IOptionsPsDropdownFacilityTypesExposed;
    complexAmountOptions?: IOptionsPsComplexAmountExposed;
    revolvingAmountOptions?: IOptionsPsInputVarcharExposed;
    cifBranchOtpions?: IOptionsPsLabelCifBranchExposed;
    downPaymentOptions?: IOptionsPsInputAmount;
    amountLabelOptions?: IOptionsPsKeyinInputExposed;
}

