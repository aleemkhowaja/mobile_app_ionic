import { PsApplicationConfiguration, PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { CommonBussinessConstant } from './ps-common-bussiness-constant';


export interface IServiceUrl {
  FinancialCalculator: string;
  FacilityRequest: string;
  prayersList: string;
  countriesList: string;
  citiesList: string;
  countriesRegions: string;
  banks: string;
  correspondingBanks: string;
  parameterValue: string;
  securityQuestions: string;
  onlineRegistration: string;
  verificationImageList: string;
  changePin: string;
  changePass: string;
  forgotCredentials: string;
  login: string;
  termsAndConditionsTermsAndConditions: string;
  mapAtmBranches: string;
  capchaEndPoint: string;
  authenticationType: string;
  verifyPwd: string;
  verifyOTP: string;
  requireOTP: string;
  verifySecurtiyQuestion: string;
  accountOpeningEndPoint: string;
  letterOfGuaranteeEndPoint: string;
  accountTypes: string;
  accountsList: string;
  transactionsList: string;
  transactionDetails: string;
  dealsList: string;
  NotificationsData: string;
  returnBranches: string;
  returnChequebooksList: string;
  deactivationReasons: string;
  changeSecurityQuestion: string;
  exchangeRateEndPoint: string;
  amountFromToCurrencyEndPoint: string;
  amountValidationEndPoint: string;
  returnCardTypes: string;
  debitCardRequest: string;
  securityRenewal: string;
  creditCardRequest: string;
  chequeBookRequest: string;
  authenticationsRequiredProcess: string;
  beneficiaries: string;
  findCIF: string;
  lostDocument: string;
  tfsDocument: string;
  insuranceCompany: string;
  activity: string;
  shipmentTerms: string;
  facilityDetails: string;
  returnCategorySubcategory: string;
  sukukSecurities: string;
  chequeBookType: string;
  accountDeactivation: string;
  updateUserInfoProfileImage: string;
  smartDetails: string;
  returnExpiredSecurityList: string;
  verifyPin: string;
  verifyPassword: string;
  verifySecurityQuestion: string;
  OTPGeneration: string;
  verifyOtp: string;
  returnRanking: string;
  legalStatus: string;
  postalCode: string;
  nationalities: string;
  returnEcoSectors: string;
  returnCifTypes: string;
  fundstransferEndPoint: string;
  returnOccupation: string;
  returnSubmitDataList: string;
  deleteSubmitData: string;
  returnCoreReasons: string;
  personalizationNicknameEndPoint: string;
  deleteBeneficiaryEndPoint: string;
  fundSubscriptionRequest: string;
  returnLanguageList: string;
  financingPaymentRequest: string;
  returnScheduledTransferList: string;
  cifOpeningRequest: string;
  maturityAccountDetailsRestEndPoint: string;
  profitRateRestEndPoint: string;
  sukukCurrency: string;
  bulkPaymentEndPoint: string;
  returnSmartList: string;
  returnPortfoliosEndPoint: string;
  returnSubProfiles: string;
  returnUserAccounts: string;
  registerUser: string;
  deleteCorporateUserEndpoint: string;
  suspendCorporateUserEndpoint: string;
  activateCorporateUserEndpoint: string;
  accountNumberCurrencyEndPoint: string;
  formOfDocumentaryCreditEndPoint: string;
  billTypeListEndPoint: string;
  billersListEndPoint: string;
  billPaymentEndPoint: string;
  cardActionRequestEndPoint: string;
  creditCardSettlementRequestEndPoint: string;
  updateProfileSettingsEndPoint: string;
  returnCIFList: string;
  returnCIFDetails: string;
  sweepingAndPoolingRequestEndPoint: string;
  updateMaturityInstructions: string;
}

export interface IPsCommonBusinessSettings {
  ICON_LOCATION_LANGUAGE: string;
  ICON_LOCATION_CURRENCIES: string;
  IMG_CURRENCY_EXTENSION: string;
  IMG_GENDER_EXTENSION: string;
  ICON_LOCATION_GENERAL: string;
  onlineRegistrationTermsAndConditionsFileName: string;
  productsBankFileName: string;
  firstLoginTermsAndConditionsFileName: string;
  accountOpeningTermsAndConditionsFileName: string;
  securityStatementFileName: string;
  faq: string;
  serviceUrl: IServiceUrl;
  defaultTermsAndConditions: string;
  isRetail: boolean;
  isCorporate: boolean;
  isAgent: boolean;
  isMaker: boolean;
  isChecker: boolean;
  commonParamServices: Array<string>;
  filteredReport: Array<number>;
  functions?: {
    __SET(variable: IPsCommonBusinessSettings);
    _REFRESH();
  };
  paramExclusionList: {};
}
export let PsCommonBusinessSettings: IPsCommonBusinessSettings = {
  functions: {
    __SET(variable: IPsCommonBusinessSettings) {
      const set = PsCommonBusinessSettings.functions.__SET;
      PsCommonBusinessSettings = variable;
      PsCommonBusinessSettings.functions.__SET = set;
    },
    _REFRESH() {
      PsCommonBusinessSettings.ICON_LOCATION_GENERAL = PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL,
        PsCommonBusinessSettings.ICON_LOCATION_LANGUAGE = PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL + 'countries/';
      PsCommonBusinessSettings.ICON_LOCATION_CURRENCIES = PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL + 'currencies/';
      PsCommonBusinessSettings.commonParamServices =
        [
          PsCommonSettings.serviceUrl.commonSubmitAction,
          PsCommonSettings.serviceUrl.updateSubmitData,
          PsCommonBusinessSettings.serviceUrl.FinancialCalculator,
          PsCommonSettings.serviceUrl.SubmitOutsideAction
        ];
      PsCommonBusinessSettings.filteredReport =
        [
          CommonBussinessConstant.SECURITY_MARKET_PRICE_REPORT,
          CommonBussinessConstant.PORTFOLIO_POSITION_REPORT,
          CommonBussinessConstant.STATMENT_OF_TRANSACTION_REPORT,
          CommonBussinessConstant.IPO_REQUEST_REPORT,
          CommonBussinessConstant.RENEWAL_REQUEST_REPORT,
          CommonBussinessConstant.CIF_OPENING_REPORT
        ];

      PsCommonBusinessSettings.isCorporate = PsApplicationConfiguration.MAIN_CONFIG.APP_ID === 2 ? true : false;
      PsCommonBusinessSettings.isAgent = PsApplicationConfiguration.MAIN_CONFIG.APP_ID === 4 ? true : false;

    }
  },
  commonParamServices: [],
  filteredReport: [],
  ICON_LOCATION_GENERAL: PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL,
  ICON_LOCATION_LANGUAGE: PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL + 'countries/',
  ICON_LOCATION_CURRENCIES: PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL + 'currencies/',
  IMG_CURRENCY_EXTENSION: '.png',
  IMG_GENDER_EXTENSION: '.svg',
  serviceUrl: {
    returnCIFList: 'rest/omniCorePull/returnCIFList',
    returnCIFDetails: 'rest/omniCorePull/returnCifInformation',
    cardActionRequestEndPoint: 'rest/omniCommonPush/submitAction',
    returnUserAccounts: 'rest/omniCommonPull/returnCustomerUsersList',
    returnSubProfiles: 'rest/omniCommonPull/returnSubProfilesList',
    returnPortfoliosEndPoint: 'rest/omniCorePull/returnPortfoliosList',
    FinancialCalculator: 'rest/omniCommonPush/financialCalculator/',
    FacilityRequest: 'rest/omniCommonPush/submitAction',
    prayersList: 'rest/omniCommon/returnPrayTime',
    countriesList: 'rest/omniCommonPull/returnCountriesList',
    citiesList: 'rest/omniCommonPull/returnCitiesList',
    countriesRegions: 'rest/omniCommonPull/returnCountriesRegionsList',
    banks: 'rest/omniCorePull/banks',
    correspondingBanks: '',
    parameterValue: 'rest/omniCommon/fetchParameterValues',
    securityQuestions: 'rest/omniAuthenticationMatrix/returnSecurityQuestion',
    onlineRegistration: 'rest/omniCommon/onlineRegistration/',
    verificationImageList: 'rest/omniAuthenticationMatrix/returnVerificationImageList',
    changePass: 'rest/omniCredential/changePassword',
    changePin: 'rest/omniCredential/changePin',
    forgotCredentials: 'rest/omniCredential/forgotCredentials',
    login: 'rest/omniCommon/loginUser',
    termsAndConditionsTermsAndConditions: 'rest/omniCredential/confirmTermsAndConditions',
    mapAtmBranches: 'rest/omniCommonPull/returnATMBranchDetails',
    capchaEndPoint: 'rest/omniCommon/verifyCaptcha',
    authenticationType: 'rest/omniAuthenticationMatrix/requiredAuthenticationMatrix',
    verifyOTP: 'rest/omniAuthenticationMatrix/verifyOtp',
    verifyPwd: 'rest/omniAuthenticationMatrix/verifyPin',
    requireOTP: 'rest/omniAuthenticationMatrix/generateOTP',
    verifySecurtiyQuestion: 'rest/omniAuthenticationMatrix/verifySecurityQuestion',
    accountOpeningEndPoint: 'rest/omniCommonPush/submitAction',
    letterOfGuaranteeEndPoint: 'rest/omniCommonPush/submitAction',
    accountTypes: 'rest/omniCommonPull/returnAccountTypes',
    accountsList: 'rest/omniCorePull/accounts',
    transactionsList: 'rest/omniCorePull/returnTransactionsList',
    transactionDetails: 'rest/omniCorePull/returnTransactionDetails',
    dealsList: 'rest/omniCorePull/returnDealList',
    NotificationsData: 'rest/omniCorePull/returnNotificationsList',
    returnBranches: 'rest/omniCommonPull/returnBranchesList',
    returnChequebooksList: 'rest/omniCorePull/returnChequebookList',
    deactivationReasons: 'rest/omniCommonPull/returnOmniReasonsList',
    exchangeRateEndPoint: 'rest/omniCorePull/exchangeRate',
    amountFromToCurrencyEndPoint: 'rest/omniCorePull/amountFromToCurrency',
    amountValidationEndPoint: 'rest/omniCommon/amountValidation',
    returnCardTypes: 'rest/omniCommonPull/returnCardTypeList',
    debitCardRequest: 'rest/omniCommonPush/submitAction',
    creditCardRequest: 'rest/omniCommonPush/submitAction',
    chequeBookRequest: 'rest/omniCommonPush/submitAction',
    authenticationsRequiredProcess: 'rest/omniCommon/authenticationsRequiredProcess',
    beneficiaries: 'rest/omniCommonPull/returnSubmitDataList',
    lostDocument: 'rest/omniCommonPull/returnLostDocumentTypeList',
    tfsDocument: 'rest/omniCommonPull/returnTFSDocumentType',
    insuranceCompany: "rest/omniCommonPull/returnInsuranceCompanies",
    activity: "rest/",
    shipmentTerms: "rest/",
    facilityDetails: 'rest/omniCorePull/returnDealList',
    findCIF: 'rest/omniCommonPull/returnAgentCIFList',
    returnCategorySubcategory: 'rest/omniCommonPull/returnCategoriesList',
    chequeBookType: 'rest/omniCommonPull/returnChequebookTypeList',
    accountDeactivation: 'rest/omniCredential/deactivateUser',
    updateUserInfoProfileImage: 'rest/omniCredential/updateUserInfo',
    verifyPin: 'rest/omniAuthenticationMatrix/verifyPIN',
    verifyPassword: 'rest/omniCredential/verifyPassword',
    verifySecurityQuestion: 'rest/omniCommon/verifySecurityQuestion',
    OTPGeneration: 'rest/omniAuthenticationMatrix/generateOTP',
    verifyOtp: 'rest/omniAuthenticationMatrix/verifyOtp',
    sukukSecurities: 'rest/omniCorePull/returnIpoEligibleSecurityList',
    smartDetails: 'rest/omniCorePull/returnSmartDetails',
    returnExpiredSecurityList: 'rest/omniCorePull/returnExpiredSecurityList',
    returnRanking: 'rest/omniCorePull/rankings',
    legalStatus: 'rest/omniCorePull/legalStatuses',
    postalCode: 'rest/omniCommonPull/returnPostalCodeList',
    nationalities: 'rest/omniCorePull/nationalities',
    returnEcoSectors: 'rest/omniCommonPull/returnEcoSectorsList',
    fundstransferEndPoint: 'rest/omniCommonPush/submitAction',
    returnCifTypes: 'rest/omniCommonPull/returnCifTypeList/',
    returnOccupation: 'rest/omniCommonPull/returnPositionsList',
    returnSubmitDataList: 'rest/omniCommonPull/returnSubmitDataList',
    deleteSubmitData: 'rest/omniCommonPush/submitAction',
    returnCoreReasons: 'rest/omniCommonPull/returnReasonsList',
    personalizationNicknameEndPoint: 'rest/omniCommonPush/personalizeNickname',
    deleteBeneficiaryEndPoint: 'rest/omniCommonPush/submitAction',
    // securityRenewal: 'rest/omniCommonPush/holdingRenewalRequest',
    securityRenewal: 'rest/omniCommonPush/submitAction',
    fundSubscriptionRequest: 'rest/omniCommonPush/',
    returnLanguageList: 'rest/omniCommon/returnLanguageList',
    financingPaymentRequest: 'rest/omniCommonPush/',
    returnScheduledTransferList: 'rest/omniCommonPull/',
    cifOpeningRequest: 'rest/omniCommonPush/submitAction',
    maturityAccountDetailsRestEndPoint: 'rest/omniCorePull/accountInformation',
    profitRateRestEndPoint: 'rest/omniCommonPull/returnProfitRateList',
    sukukCurrency: 'rest/omniCorePull/returnSukukList',
    bulkPaymentEndPoint: 'rest/omniCommonPush/submitAction',
    returnSmartList: 'rest/omniCorePull/returnSmartList',
    registerUser: 'rest/omniCommonPush/submitAction',
    deleteCorporateUserEndpoint: 'rest/omniCommonPush/submitAction',
    suspendCorporateUserEndpoint: 'rest/omniCommonPush/submitAction',
    activateCorporateUserEndpoint: 'rest/omniCommonPush/submitAction',
    accountNumberCurrencyEndPoint: 'rest/omniCorePull/accountInformation',
    formOfDocumentaryCreditEndPoint: 'rest/',
    billTypeListEndPoint: 'rest/omniCommonPull/returnBillTypeList',
    billersListEndPoint: 'rest/omniCorePull/returnBillersList',
    billPaymentEndPoint: 'rest/omniCommonPush/submitAction',
    creditCardSettlementRequestEndPoint: 'rest/omniCommonPush/submitAction',
    updateProfileSettingsEndPoint: 'rest/omniCommonPush/submitAction',
    changeSecurityQuestion: 'rest/omniCommonPush/submitAction',
    sweepingAndPoolingRequestEndPoint: 'rest/omniCommonPush/submitAction',
    updateMaturityInstructions: 'rest/omniCommonPush/submitAction'
  },
  onlineRegistrationTermsAndConditionsFileName: 'TermsAndConditions.html',
  productsBankFileName: 'products.html',
  firstLoginTermsAndConditionsFileName: 'TermsAndConditions.html',

  accountOpeningTermsAndConditionsFileName: 'TermsAndConditions.html',
  securityStatementFileName: 'SecurityStatement.html',
  faq: 'faq.html',
  defaultTermsAndConditions: 'TermsAndConditions.html',
  isRetail: false,
  isCorporate: PsApplicationConfiguration.MAIN_CONFIG.APP_ID === 2 ? true : false,
  isAgent: PsApplicationConfiguration.MAIN_CONFIG.APP_ID === 4 ? true : false,
  isMaker: false,
  isChecker: false,
  paramExclusionList: {
    RoundingMethod: null,
    AllowedLanguage: null,
    DefaultLanguage: null,
    enableDynamicMenu: null,
    SliderSpeed: null,
    clearCacheDuration: null,
    BankPhoneNumber: null,
    BankWebsiteUrl: null,
    ApplyDefaultAccount: null,
    enableBiometrics: null,
    SessionTimeout: null,
    SessionTimeoutAlert: null,
    BankName: null,
    DefaultDateFormat: null,
    CCContactEmail: null,
    ToContactEmail: null,
    AccountsAsIBAN: null,
    DefaultDateTimeFormat: null
  },
};
