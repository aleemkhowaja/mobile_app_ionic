import { ICommonInterfaceRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsBaseFieldExposed } from 'src/app/commonSRC/psServices/models/ps-common-interface';

export interface IOptionsPsOptionSecurityExposed extends IOptionsPsBaseFieldExposed{
    securityInformation?: ISecurityListResponse;
    isEditable?: boolean;
}

export interface ISecurityListRequest extends ICommonInterfaceRequest {
  numberOfRecordsToReturn?: number;
  numberOfRecordsStillExist?: number;
  inRenewalPeriod?: string;
  securityPriceDetails?: string;
  branchCode?: number;
  portfolioCif?: string;
  cifList?: string;
  processStateList?: string;
  pendingState?: string;
  approvedStateList?: string;
  fromDate?: Date;
  toDate?: Date;
  fromCIF?: string;
  toCIF?: string;
  transactionNo?: string;
  portfolioSeq?: string;
  quantity?: string;
  sukukType?: string;
  nbRec?: string;
  recToskip?: string;

}

export interface ISecurityListResponse {

    portfolioCif: string;
    portfolioName: string;
    sukukType: string;
    isdaraNumber: string;
    issueDate: string;
    balance: number;
    totalNumberOfSukuk: number;
    maturityDate: string;
    marketPrice: number;
    title: string;
    subTitle: string;
    profitRate: string;
    newIsdaraLabel: string;
    sukukPrice: number;
    balanceStr: string;
    totalNumberOfSukukStr: string;
}