import { IOptionsPsBaseFieldExposed } from "src/app/commonSRC/psServices/models/ps-common-interface";

export interface IOptionsPsOptionsCifReportExposed
  extends IOptionsPsBaseFieldExposed {
  isEditable?: any;
  itemList?: any[];
  listOfOptions?: any[];
  showItemPopUp?: boolean;
  item?: any;
  showOnlyList?: boolean;
  cifReportlist?: ICifReportListReponse;
  rePopulateList?: boolean;
}

export interface ICifReportListReponse {
  branchCode?: string;
  cifName?: string;
  cifTypeDesc?: string;
  dateCreation?: number | string;
  firstName?: string;
  lastName?: string;
  mobile?: string | number;
  status?: string;
  tel?: string | number;
  userCifNo?: string | number;
  statusCode?: string | boolean;
}
