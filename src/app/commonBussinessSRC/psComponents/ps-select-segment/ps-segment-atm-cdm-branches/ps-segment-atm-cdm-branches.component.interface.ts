import { IOptionsPsFieldSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';

import { IPsSelect } from '../../../../commonSRC/psServices/models/ps-common-interface';

export interface IOptionsPsSegmentAtmCdmBranchesExposed extends IOptionsPsFieldSelect {
    defaultSegment?: IPsSelect;
    allowedSegments?: Array<string>;
}
