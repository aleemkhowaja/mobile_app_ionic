import { IOptionsPsBaseFieldExposed } from '../../../../commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsDropdownBranchesExposed } from '../../ps-select-dropdown/ps-dropdown-branches/ps-dropdown-branches.component.interface';
import { IOptionsPsComplexCountryRegionsCitiesComponentExposed } from '../ps-complex-country-regions-cities/ps-complex-country-regions-cities.component.interface';

export interface IOptionsPsComplexSelectBranchComponentExposed extends IOptionsPsBaseFieldExposed {
    branchesOptions?: IOptionsPsDropdownBranchesExposed;
    countryRegionCityOptions?: IOptionsPsComplexCountryRegionsCitiesComponentExposed;
    parameterToCheck?: string;
}
