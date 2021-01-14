import { IOptionsPsFormMap } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsBaseFieldExposed } from './../../../commonSRC/psServices/models/ps-common-interface';


export interface IOptionsPsMapAtmBranchesExposed extends IOptionsPsBaseFieldExposed {
    mapOptions?: IOptionsPsFormMap;
    showSegments?: boolean;
    mapTypesInclude?: string; // 'A', 'B', 'C', 'A,B,C' ...
    branchIds?: string; // "1, 2, 3" ...
    parameterToCheck?: string;
}
