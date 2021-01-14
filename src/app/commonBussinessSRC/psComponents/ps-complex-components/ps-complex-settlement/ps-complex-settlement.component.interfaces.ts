import { IOptionsPsLovSettlementTypeExposed } from './../../ps-select-dropdown/ps-dropdown-lov/ps-lov-settlement-type/ps-lov-settlement-type.component.interfaces';

import { IOptionsPsBaseGroupFormExposed, IOptionsPsKeyinInput } from './../../../../commonSRC/psServices/models/ps-common-interface';

export interface IOptionsPsComplexSettlementExposed extends IOptionsPsBaseGroupFormExposed {
    payableInput?: IOptionsPsKeyinInput;
    daysInput?: IOptionsPsKeyinInput;
    settlementTypesOptions?: IOptionsPsLovSettlementTypeExposed;
}

