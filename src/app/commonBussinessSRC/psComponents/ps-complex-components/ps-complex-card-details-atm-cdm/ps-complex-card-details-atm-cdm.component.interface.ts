import { IOptionsPsBaseFieldExposed } from './../../../../commonSRC/psServices/models/ps-common-interface';

export interface IOptionsPsComplexCardDetailsAtmCdmComponentExposed extends IOptionsPsBaseFieldExposed {
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
    panelColor?: string;
}
