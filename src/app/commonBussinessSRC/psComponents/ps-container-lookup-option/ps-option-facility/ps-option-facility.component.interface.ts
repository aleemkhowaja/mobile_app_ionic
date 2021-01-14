import { IOmniCommonResponse, IOptionsPsBaseFieldExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';

export interface IOptionsPsOptionFacilityExposed extends IOptionsPsBaseFieldExposed {
itemList?: any[];
listOfOptions?: any[];
showItemPopUp?: boolean;
item?: any;
showOnlyList?: boolean;
isEditable?: boolean;
}

export interface IFacilityDetailsResponse extends IOmniCommonResponse {
  facilityNo?:string;
  facilityAmount?:string;
  expiryDate?:string;
  unutilizedAmount?:string;
  branchName?:string;
  currency?:string;
  }

