import { IOptionsPsBaseFieldExposed, IOptionsPsLabel } from './../../../../commonSRC/psServices/models/ps-common-interface';
import { IOpeningHours } from './../../../psServices/models/ps-common-bussiness-interfaces';

export interface IOptionsPsComplexCardDetailsBranchComponentExposed extends IOptionsPsBaseFieldExposed {
    latitude?: number;
    longtitude?: number;
    countryId?: number;
    regionId?: number;
    mapType?: string;
    cityName?: string;
    locationDetails?: string;
    telephoneNumber?: string;
    faxNumber?: string;
    facilities?: string;
    address?: string;
    others?: string;
    managerName?: string;
    regionName?: string;
    countryName?: string;
    openingHours?: IOpeningHours[];
    selectedBranch?: boolean;
    panelColor?: string;
    briefDesc?: string;
}

export interface IDayOptions {
    dayLabel?: IOptionsPsLabel;
    openingHourLabel?: IOptionsPsLabel;
    closingHourLabel?: IOptionsPsLabel;
    closingYN?: string;
}
