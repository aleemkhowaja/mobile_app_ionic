import { IOmniCommonResponse, IOptionsPsBaseFieldExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';

export interface IOptionsPsOptionCardExposed extends IOptionsPsBaseFieldExposed {
  cardType?: string;
  cardInformation?: IOmniCardsResponse;
  itemList?: any[];
  listOfOptions?: any[];
  showItemPopUp?: boolean;
  item?: any;
  showOnlyList?: boolean;
  isEditable?: boolean;
  cardAction?: boolean;
  translate?: boolean;
  limitFlags?: any;
}

export interface IOmniCardsResponse extends IOmniCommonResponse {
  cardNumber?: string;
  cardName?: string;
  oldCardName?: string;
  cardType?: string;
  cardTypeCode?: any;
  posLimitAmount?: string;
  withdrawalLimit?: string;
  status?: string;
  limitCheckingBy?: string;
  currencyDesc?: string;
  expiryDate?: string | Date;
  currencyCountryFlag?: string;
  cardNumberMask?: string;
  primaryAccount?: string;
  cardLimit?: number;
  remainingBalance?: number;
  settlementRate?: number;
  debitOrCredit?: string;
  outstandingBalance?: number;
  ownerName?: string;
  loyaltyPoint?: number | string;
  lookupKey?: number | string;
  applicationId?: number | string;
  additionalRef?: number | string;
  accGl?: number | string;
  branch?: number | string;
  cif?: number | string;
  currency?: number | string;
  serialNo?: number | string;
  cardTypeName?: string;
  key?: string;
  nickName?: string;
  cardWdLimitAmount?: number | string;
  currencyCode?: number | string;
  cardNo?: string;
  limitFlags?: any;
  maxRenewPeriod?: number | string;
  allowRenew?: number | string;
}

