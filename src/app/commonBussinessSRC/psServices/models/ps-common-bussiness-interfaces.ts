import { Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFunctionDefinition, INavigationHandler, IOmniBaseVO, IOmniCommonCO, IOptionsContainerDynComponentParam, IOptionsPsActionHyperlink, IOptionsPsActionIconExposed, IOptionsPsBaseActionExposed, IOptionsPsBaseExposed, IOptionsPsBaseGroupFormExposed, IOptionsPsFieldKeyinExposed, IOptionsPsInputPassword, IOptionsPsInputUserName, IOptionsPsKeyinInput, IOptionsPsSelectToggle, IPageCommon } from '../../../commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsComplexProfileExposed } from '../../psComponents/ps-complex-components/ps-complex-profile/ps-complex-profile.component.interfaces';




export interface IBusinessProfile {
    operAppChnlVO: {
        DISPLAY_TO_CUSTOMER_YN: string,
        PAGE_HREF: string,
        OPER_P_ID: number,
        ICON_NAME: string,
        DISP_ORDER: number,
    };
    operVO: {
        OPER_TYPE: string,
        OPER_NAME: string,
        TYPE_DESC: string,
        DESCRIPTION: string,
        OPER_ID: number,
    };
}

export interface IOC_ETL_CITIESVOKey extends IOmniBaseVO {
    CITIES_ID?: number;
}
export interface IOC_ETL_CITIESVO extends IOC_ETL_CITIESVOKey {
    COMP_CODE?: number;
    ADDITIONAL_REFERENCE?: string;
    COUNTRY_CODE?: string;
    REGION_CODE?: string;
    CITY_CODE?: string;
    LONG_DESC_ENG?: string;
    LONG_DESC_ARAB?: string;
    BRIEF_DESC_ARAB?: string;
    BRIEF_DESC_ENG?: string;
}

export interface IOmniRequestBaseObject {
    /*compCode?: string,
    channelId?: number,
    appId?: number,
    */
    ocUserId?: number;
    userName?: string;
    machineName?: string;
    sessionId?: string;
    deviceType?: string;
    deviceMacAddress?: string;
    deviceIp?: string;
    pathParam?: string;
    fromIonic?: string;
    code?: number;
    serviceMethod?: string;
    vsCode?: string;
    userCifNo?: string;
    apiCode?: number;
    language?: string;
    actionType?: string;
    serviceType?: string;
    pageActionName?: string;
    status?: string;
    triggerItem?: string;
    interactionTitle?: string;
    triggerEvent?: string;
    action?: string;
    description?: string;
    dateTime?: Date;
    userAgent?: string;
    appChnlId?: number;
    paramNameList?: string;
    udid?: string; /* nabil feghali - OMNI common security  */
    refCode?: number;
    appIdentifier?: string;
    profileId?: number;
    agentAllowedCifNo?: string;
    listAllAllowedCifs?: string;
    corporateId?: string;
    appId?: string | number;
    channelId?: string | number;

}
export interface IOmniBeneficiaryRequest extends IOmniRequestBaseObject {
    benefId?: number;
    branchCode?: number;
    benefBankName?: string;
    accountNumber?: string;
    accountFormat?: string;
    benefCifNo?: string;
    accountCurrency?: number;
    nickName?: string;
    benefBankId?: string;
    benefBankBranch?: string;
    benefAddress1?: string;
    benefAddress2?: string;
    benefAddress3?: string;
    benefCity?: number;
    benefRegion?: number;
    benefCountry?: number;
    branchesId?: number;
    benefState?: string;
    benefPostalCode?: number;
    benefResidenceStatus?: string;
    benefICNumber?: string;
    benefBillType?: number;
    benefBillerName?: string;
    benefInstruction1?: string;
    benefInstruction2?: string;
    benefInstruction3?: string;
    benefInstruction4?: string;
    denomination?: string;
    benefName?: string;
    trxTypeParameterName?: string;
    status?: string;
    transferCurrency?: number;
    benefNickName?: string;
    bicCode?: string;
    intermedBankCode?: string;
    swiftCode?: string;
    destinationCountry?: number;
    benefBillerReferenceNo?: string;
    oCCreatedBy?: number;
    createdDate?: Date;
    oCModifiedBy?: number;
    modifiedDate?: Date;
    oCDeletedBy?: number;
    deletedDate?: Date;
    approvedBy?: string;
    oCApprovedBy?: number;
    approvedDate?: Date;
    updatedDate?: Date;
    rejectedBy?: string;
    oCRejectedBy?: number;
    rejectedDate?: Date;
    purpose?: string;
    operId?: number;
    benefBranchId?: string;
    dataSaveId?: number;
    benefPhoneNumber?: string;
    currency?: number;
    bank?: number;
    branch?: number;
    country?: number;
    bankName?: string;
    region?: number;
    city?: number;
    benefPhone?: string;
    lookupKey?: string;
    filterByOper?: boolean;
    accountObject?: any;
    benefBranchTxt?: string;
}

export interface ICommonInterfaceRequest extends IOmniRequestBaseObject {
    /* compCode: number,
    channelId: number,
    appId: number,
    ocUserId: number, */
    serviceMethod?: string;
    vsCode?: string;
    userCifNo?: string;
    apiCode?: number;
    operId?: number;
    vsBranchCode?: string;
    cardType?: string;
}

export interface IPreLoginRequest extends ICommonInterfaceRequest {
    clientName?: string;
    compCode?: number;
    publicKey?: string;
    autoLoginUser?: string;
    autoLoginPwd?: string;
}


export interface IOmniResponseBaseObject extends IOmniRequestBaseObject {
    errorCode?: number;
    errorDesc?: string;
    reference?: string;
    totalNbRec?: number;
    gridModel?: Array<any>;
    responseCode?: number;
    responseDesc?: string;
    briefDesc?: string;
    longDesc?: string;
    serviceResponse?: IServiceResponseVO;
    outputType?: string;
    outputCode?: number;
    outputNotification?: string;
}

export interface IServiceResponseVO {
    statusCode?: string;
    statusDesc?: string;
    severity?: string;
    errorType?: string;
}

export interface IOmniCommonResponse extends IOmniResponseBaseObject {
    itemValue?: string;
    description?: string;
    iconName?: string;
}
export interface IProductClass {
    itemValue?: string;
    // description?: string;
    productClassCode?: string;
    productClassId?: string;
    briefName?: string;
    noOfPayment?: number;
    downPayment?: number;
    periodicityNumber?: number;
    periodicityType?: string;
    periodicityPosition?: string;
    productType?: string;
    minFinancingAmt?: number;
    maxFinancingAmt?: number;
    minNoOfRepayments?: number;
    maxNoOfRepayments?: number;
    checkMinFinancingAmt?: string;
    checkMaxFinancingAmt?: string;
}
export interface IBillType {

}
export interface IDraweeBank {

}
export interface ICountryGood {

}
export interface ISettlementType {

}
export interface IGoodCategory {

}
export interface IGood {

}
export interface IShowLinkResponse extends IOmniCommonResponse {
    showOnlineReg?: boolean;
    showForgotPwd?: boolean;
    showForgotUname?: boolean;
    showFingerprintAuth?: boolean;
    showSecurityStmt?: boolean;
    showTermsCndtn?: boolean;
    showProductSer?: boolean;
    showBankCall?: boolean;
    showRememberMe?: boolean;
    showRetailLogin?: boolean;
    showCorporateLogin?: boolean;
    showAgentLogin?: boolean;
}
export interface IOptionsPsBaseFieldExposed extends IOptionsPsBaseExposed, IOptionsPsBaseGroupFormExposed {
    placeHolder?: string;
}
export interface IPreLoginResponse extends IOmniCommonResponse {
    publicKey?: string;
    parameters: any;
    banners: Array<any>;
    showLink: IShowLinkResponse;
    translations: any;
    psConfigMap: any;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// START EXPOSED COMPONENTS/////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// export interface IOptionsPsBaseExposed {
//     labelKey?: string;
// }

// export interface IOptionsPsBaseGroupFormExposed {
//     group?: FormGroup;
//     fcName?: string;
// }

// export interface IOptionsPsBaseFieldExposed extends IOptionsPsBaseExposed, IOptionsPsBaseGroupFormExposed {
//     placeHolder?: string;
// }

// export interface IOptionsPsFieldKeyinExposed extends IOptionsPsBaseFieldExposed {

// }


// export interface IOptionsPsKeyinInputExposed extends IOptionsPsFieldKeyinExposed {
// iconOptions?: IOptionsPsActionIconExposed;
// }
export interface IOptionsPsKeyinDateExposed extends IOptionsPsFieldKeyinExposed {
    min?: Date;
    max?: Date;
}


// export interface IOptionsPsActionIconExposed extends IOptionsPsBaseActionExposed {
//     iconName?: string;
//     labelOptions?: IOptionsPsActionLabelExposed;
// }

export interface IOptionsPsSelectDropDownExposed extends IOptionsPsBaseFieldExposed {
    iconOptions?: IOptionsPsActionIconExposed;
    imageOptions?: IOptionsPsActionImageExposed;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// END EXPOSED COMPONENTS///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// START EXPOSED TEMPLATES//////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export interface IOptionsTemplateBase {
    group?: FormGroup;
    requestObject?: any;
    allowCust?: boolean;
}


export interface IOptionsTemplateLogin extends IOptionsTemplateBase {
    userName?: IOptionsPsInputUserName;
    password?: IOptionsPsInputPassword;
    rememberMe?: IOptionsPsSelectToggle;
    navigationHandler?: INavigationHandler;
}

export interface IOptionsTemplateLandingMain extends IOptionsTemplateBase {
    isWideLayout?: boolean;
    optionsComplexProfile?: IOptionsPsComplexProfileExposed;
    triggerMenuFlip?: (...param: any) => any;
}

export interface IOptionsTemplateLanding extends IOptionsTemplateLandingMain {

}
export interface IOptionsTemplateLandingFabUi extends IOptionsTemplateLandingMain {

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////// END EXPOSED TEMPLATES////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface IonicGridFilterCO {
    colName: string; // column name (as it is in the query to be filtered on it)
    filterOptions: IIonicGridSortFilterCO;
    operator?: 'AND' | 'OR'; // operator to add several filters on several columns
}
export interface IIonicGridSortFilterCO extends ICommonInterfaceRequest {
    colId?: string; // column name used for sorting
    sort?: 'ASC' | 'DESC';
    filter?: string; // sets the value of the filter column
    filterTo?: string; // value 2 of the filter in case the filter was 'inRange'
    filterType?: 'number' | 'text' | 'date'; // type of the column to be filtered
    type?: 'equals' | 'notEqual' | 'startsWith' | 'endsWith' | 'contains' | 'notContains' | 'lessThan' | 'lessThanOrEqual' | 'greaterThan' | 'greaterThanOrEqual' | 'inRange'; // type of the operation of the filter
    dateFrom?: string; // value of the date to be filtered on in case the filter type was 'date'
    dateTo?: string; // value 2 of the filter in case the filter was 'inRange' and the filter type was 'date'
}

export interface IOmniGridParamRequest extends ICommonInterfaceRequest {
    sortModel?: Array<IIonicGridSortFilterCO>;
    filterModel?: Array<IonicGridFilterCO>;
    sortOrder?: string;
    whereQuery?: string;
    nbRec?: number;
    totalNbRec?: number;
    recToskip?: number;
}

export interface IOcCountriesRegionsRequest extends IOmniGridParamRequest {
    countriesID?: number;
    countriesRegionID?: number;
    countriesCodes?: string;
    countriesRegionCode?: string;
    allowedCountries?: string;
    allowTransfBlacklisted?: string;
}
export interface IOcCountriesRegionsResponse extends IOmniCommonResponse {
    countriesID?: number;
    countriesRegionID?: number;
    compCode?: number;
    countriesCode?: string;
    countriesRegionCode?: string;
    additionalReference?: string;
    countriesBriefDesc?: string;
    countriesLongDesc?: string;
    regionsBriefDesc?: string;
    regionsLongDesc?: string;
    isoCountry?: string;
    ibanValidation?: string;
    ibanLength?: number;
    ibanCur?: string;
    allowTrsfrToBlacklistYN?: string;
    telephoneCode?: string;
    telephoneFormat?: string;
}

// Author: GRadwan 16/01/2020
export interface IOcCitiesRequest extends ICommonInterfaceRequest {
    countryCode?: number;
    cityCode?: number;
    regionCode?: number;
    nbRec?: number;
}
// Author: GRadwan 16/01/2020
export interface IOcCitiesResponse extends IOmniCommonResponse {
    citiesId?: number;
    citiesCode?: number;
    accountNumber?: string;
    longName?: string;
    briefName?: string;
    countryCode?: number;
    regionCode?: number;
}


export interface IOmniBankRequest extends ICommonInterfaceRequest {

}

/**
 * @author Ahmed.Ragab
 */
export interface IBanksCO extends IOmniCommonResponse {
    itemValue?: string;
    description?: string;
    bankId?: number;
    bankName?: string;
    bankCode?: string;

}


export interface IOmniLovTypeRequest extends ICommonInterfaceRequest {
    compCode?: number;
    language?: string;
    lovTypeId?: number;
    lovCodesExclude?: string;
    lovCodesInlude?: string;
    orderCriteria?: string;
}
export interface IOmniGalleryVerificationImagesRequest extends ICommonInterfaceRequest {
    previewAllYN: 'Y' | 'N';
}

export interface IOptionsProfileImage extends IOptionsPsBaseFieldExposed {
}

export interface IOTermsAndConditionsRequest extends ICommonInterfaceRequest {

}
export interface IOTermsAndConditionsResponse extends IOmniCommonResponse {
    termsAndCondition?: string;
    displayChargeScreenYN?: string;
    registrationCharge?: number;
    activationCharge?: number;
    transactionType?: string;
}

export interface IOptionsPsBaseContainerExposed extends IOptionsPsBaseExposed {

}

export interface ILoginResponse extends IOmniCommonResponse {

    outputType?: string;
    outputCode?: number;
    outputNotification?: string;
    chargePackageId?: number;
    limitPackageId?: number;
    customerInfoCO?: ICustomerInfoCO;
    companySettingsCO?: ICompanySettingsCO;
    omniUserVO?: IOC_USRVO;
    omniUserAppVO?: IOC_USR_APPVO;
    businessProfiles?: IBusinessProfilesCO[];
    accessToken?: IAccessToken;
    profileImage?: string;
    subscriberInfo?: any;
}


export interface operVO {
    DESCRIPTION?: string;
    OPER_NAME?: string;
    OPER_TYPE?: string;
    TYPE_DESC?: string;
    OPER_ID?: number;

}
export interface operAppChnlVO {
    PAGE_HREF?: string;
    DISP_ORDER?: number;
    DISPLAY_TO_CUSTOMER_YN?: string;
    ICON_NAME?: string;
    CATEG?: string;

}
export interface IOC_USRVO {
    STATUS?: string;
    EMAIL?: string;
    USR_CODE?: number;
    CIF_NO?: number;
    LOGIN_CTR_HIT?: number;
    SECURITY_ID?: number;
    MOBILE_NUMBER?: string;
    USR_TYPE?: string;
    CTR_CAPTCHA_REQUESTED?: number;
    CTR_SEC_QUESTION_UPDATED?: number;
    PWD_HASHING_ALGORITHM?: number;
    PIN_HASHING_ALGORITHM?: number;
    LAST_ACCESS_TIME?: Date;
    PWD_LAST_MODIFIED?: Date;
    PIN_LAST_MODIFIED?: Date;
    COMP_CODE?: number;
    NAME?: string;
    CREATED_BY?: number;
    CREATED_DATE?: Date;
    SESSION_ID?: string;
    DATE_UPDATED?: Date;
    PIN_RESET_YN?: string;
    PIN_PASSWORD?: string;
    PASSWORD?: string;
    BUSINESS_PROFILE_ID?: number;
    PASSWORD_RESET_YN?: string;
    USR_ID?: number;
    REMOTE_HOST: string;

}

export interface IOC_USR_APPVO {
    LAST_ACCESS_TIME?: Date;
}
export interface IBusinessProfilesCO {
    subProfile?: boolean;
    corporateProfile?: boolean;
    renderNoOfEndUsers?: boolean;
    operAppChnlVO?: operAppChnlVO;
    operVO?: operVO;
    children?: IBusinessProfilesCO[];

}
export interface ICompanySettingsCO {
    briefDesc?: string;
    decimalPoints?: number;
    compCountry?: number;
    baseCurrency?: number;
    cifNo?: number;
    baseCurrencyISO?: string;

}

export interface IAccessToken {
    tokenKey?: string;
    tokenType?: string;
    expiresIn?: number;
    issuedAt?: number;

}
export interface ICustomerInfoCO {
    message?: string;
    email?: string;
    chargePackageId?: number;
    limitPackageId?: number;
    userCifNo?: number;
    longName?: string;
    area?: string;
    buildingOrHouse?: string;
    poBox?: number;
    postalCode?: string;
    streetDetails?: string;
    employerName?: string;
    occupation?: string;
    employerDivision?: string;
    employerDepartment?: string;
    employerArea?: string;
    employerpoBox?: string;
    employerStreet?: string;

    addressRegionCode?: string;
    addresscityCode?: number;
    birthDate?: Date;
    countryCode?: number;
    addressCountryCode?: number;
    occupationBuilding?: string;
    branchCode?: number;
    cityCode?: number;
    cityName?: string;
    coreEmail?: string;
    country?: string;
    fax?: string;
    martialStatus?: string;
    fullName?: string;
    nationality?: string;
    homeTel?: string;
    poBoxArea?: string;
    postalCodeDesc?: string;
    regionCode?: number;
    regionName?: string;
    shortName?: string;
    userMobileNumber?: string;
    occupationCode?: number;
    employerCountry?: string;
    employerCity?: string;
    employerOfficeTel?: string;
    employerMobileNumber?: string;
    employerFax?: string;
    salary?: string;
    occupationLineNumber?: string;
    addressLineNumber?: string;
    strBirthDate?: string;
    strDateOfJoining?: string;
}

export interface ILoginRequest {
    ocUserId?: string;
    compCode?: string;
    appId?: string;
    channelId?: string;
}
export interface IOptionsPsActionImageExposed extends IOptionsPsBaseActionExposed {
    imageName?: string;
    imageBase64Url?: string;
}

export interface IOptionsPsActionHyperlinkExposed extends IOptionsPsBaseActionExposed {
    anchorValue?: string;
    iconOptions?: IOptionsPsActionIconExposed;
    imageOptions?: IOptionsPsActionImageExposed;
}
export interface IOmniTermsAndConditionsRequest extends ICommonInterfaceRequest {
    filePath?: string;
    filePathParamName?: string;
    fileNameParamName?: string;
}

export interface IOmniMapAtmBranchesRequest extends ICommonInterfaceRequest {
    language?: string;
    compCode?: number;
    branchIds?: string; // "1, 2, 3" ...
    mapTypesInclude?: string;
}

export interface IOmniTermsAndConditionsResponse extends IOmniCommonResponse {
    outputType?: string;
    outputCode?: number;
    outputNotification?: string;
    fileContent?: string;
    mimeType?: string;
}


export interface IOptionsPsContainerHtmlViewerExposed extends IOptionsPsBaseContainerExposed {
    fileName?: string;
    htmlSrc?: string;
    parseHtmlFromFile?: boolean;
}

enum MAPTYPES {
    CDM = 'C',
    ATM = 'A',
    BRANCH = 'B'
}

export interface IATMCDMBranchesRequest extends ICommonInterfaceRequest {
    mapTypesInclude?: MAPTYPES;
    // The language and the company code are extended from ICommonInterfaceRequest
}

export interface ICommonServiceResponse extends IOmniCommonResponse {
    outputType?: string;
    outputCode?: number;
    outputNotification?: string;
    // The gridModel is defined in the extended class
}

export interface IOpeningHours {
    openingHour?: string;
    day?: string;
    mapId?: number;
    closingHour?: string;
    closingYN?: string;
    openingHoursId?: string;
}

export interface IBranchAndATM {
    latitude?: number;
    longtitude?: number;
    countryId?: number;
    regionId?: number;
    mapType?: string;
    cityName?: string;
    locationDetails?: number;
    telephoneNumber?: string;
    faxNumber?: string;
    facilities?: string;
    address?: string;
    others?: string;
    managerName?: string;
    regionName?: string;
    countryName?: string;
    openingHours?: IOpeningHours[];
}

export interface IOmniATMCDMBranchesResponse extends ICommonServiceResponse {
    branchesAndATMs?: IBranchAndATM[];
}

export interface IOptionsPsActionGalleryExposed extends IOptionsPsBaseActionExposed {
    layout?: 'slider' | 'grid';
    selectedItem?: any;
    itemHieght?: number;
    itemWidth?: number;
    numberOfItemsPerPage?: number;
    mediaList?: MediaSourceExposed[];
}
export class MediaSourceExposed {
    data?: string;
    type?: 'image' | 'video' | 'html' | 'Text';
    id?: number;
    thumbnail?: string;
    description?: string;
    imageName?: string;
    fileName?: string;
}

export interface IOptionsPsLabelExposed extends IOptionsPsBaseFieldExposed {
}

export interface IOptionsPsContainerReportViewerExposed extends IOptionsPsBaseContainerExposed {
    serviceUrl?: string;
}

export interface ICurrenciesRequest extends IOmniRequestBaseObject {
    currencyCode?: number | string;
    codesInclude?: string;
    codesExclude?: string;
}

export interface ICurrenciesResponse extends IOmniCommonResponse {
    compCode?: number;
    currencyCode?: string;
    briefDescription?: string;
    longDescription?: string;
    decimalPoint?: number;
    additionalReference?: string;
    isoCode?: string;
    flagCtr?: string;
    cyIsoCode?: string;
}

export interface IOptionsPsTemplateForm extends IOptionsTemplateBase {
}

export interface IdTypesRequestObject extends ICommonInterfaceRequest {
    compCode?: number;
    language?: string;
    idTypeList?: string;
}

export interface IdTypesResponseObject extends IOmniCommonResponse {
    ID_TYPES_ID?: number;
    ADDITIONAL_REFERENCE?: string;
    COMP_CODE?: string;
    CODE?: string;
    DESC_ARAB?: string;
    DESC_ENG?: string;
    SADAD_ID_TYPE?: string;
    TYPES?: string;
    FROM_LEN?: string;
    ID_EXP_DTE_MAN?: string;
    TO_LEN?: string;
    EXPIRY_DAYS?: string;
}




export interface IOptionsContainerSliderExposed extends IOptionsPsBaseContainerExposed {
    slidesPerView?: number;
    slidesPerColumn?: number;
    slidesPerGroup?: number;
    watchSlidesProgress?: boolean;
    spaceBetween?: number;
    virtualTranslate?: boolean;
    mediaList?: MediaSourceExposed[];
}

export interface IAlertMessage {
    type?: string;
    code?: number;
    descreption?: string;
    message?: string;
    autoHide?: boolean;
}

export interface IAccounts extends IOmniBaseVO {
    accountName?: string;
    accountType?: string;
    accountNumber?: string;
    accountCurrency?: string;
    accountBalance?: number;
    currencyDesc?: string;
    currencyCode?: number;
    accountAvailableBalance?: number;
    glCode?: number;
    accountCat?: string;
    branchCode?: number;
    acName?: string;
    accList?: Array<any>;
    dateCreated?: Date;
    currentBalance?: number;
    holdAmount?: number;
    settlementAmount?: number;
    defaultCurrencyDecimalPoint?: number;
    cifShortName?: string;
    currencyDecimalPoints?: string;
    cifNo?: string;
    currencyBriefName?: string;
    flagCtr?: string;
    accruedDividends?: string;
    blockedAmount?: string;
    biefDesc?: string;
    consolidatedAccounts?: string;
    dividendPaymentMode?: string;
    dividendsPaid?: string;
    financingType?: string;
    accountBriefName?: string;
    gmiFlag?: string;
    maturityDate?: string;
    rate?: string;
    renew?: string;
    settlementeBalance?: string;
    status?: string;
    tenor?: string;
    amount?: number;
    outstandingBalance?: string;
    lastPaymentDate?: Date;
    lastPaymentAmount?: string;
    dealAmount?: string;
    yield?: string;
    facilityNo?: string;
    remainingDays?: string;
    valueDate?: Date;
    nextPaymentDate?: Date;
    nextPaymentAmount?: string;
    numberOfRecordsStillExist?: number;
    generalLedgerBriefNameEng?: string;
    accSign?: string;
    accOverDrawnYN?: string;
}

export interface IAccountTypesRequest extends IOmniRequestBaseObject {
    accountCategory?: string;
    permittedGLs?: Array<string>;
    accountType?: string;
}

export interface IAccountTypesResponse extends IOmniBaseVO {
    category?: string;
    affection?: string;
    checkbookNum?: number;
    affectCard?: string;
    defaultCard?: string;
    briefDesc?: string;
    ptInd?: string;
    bsContra?: string;
    acSign?: string;
    typeCode?: string;
}

export interface IMapKeyValue {
    key?: string;
    value?: string;
    isEdit?: boolean;
    staticValue?: string;
    formGroupMap?: IOptionsPsKeyinInput;
    showMappingOnNoValue?: boolean;
    isDetailOption?: boolean;
}

export interface IPrayerDate {
    prayersTimeTable: IPrayerTime[];
    prayersDate: Date;
    hijriDate: Date;
}
export interface IPrayerTime {
    id: 'Asr' | 'Dhuhr' | 'Fajr' | 'Imsak' | 'Isha' | 'Maghrib' | 'Midnight' | 'Sunrise' | 'Sunset';
    time: string;
    formattedTime: string;
    progress?: number;
    remaining?: string;
    originalTime?: string;
}

export interface IActionDetailsOptions {
    displayPosition?: string;
    buttonIcon?: string;
    actionUrl?: string;
    rquestParam?: string[];
    cssClass?: string;
    redirectUrl?: string;
    label?: string;
    iconName?: string;
    actionHyperlink?: IOptionsPsActionHyperlink;
    commonMethod?: string;
    component?: Type<any>;
    componentOptions?: any;
    param?: IOptionsContainerDynComponentParam;
    actionType?: string;
    alertType?: 'prompt' | 'input';
    operId?: number;
    filterParamValues?: string[];
    fcName?: string;
    alertMessage?: string;
    postCallFunction?: IFunctionDefinition;
    detailServiceCallOnAction?: boolean;
    detailServiceUrl?: string;
}


export interface IListContainerLookupOption {
    containerLookUpOptions?: IOptionsPsContainerLookupOptionComponentExposed;
    item?: any;
}



export interface IOptionsPsContainerLookupOptionComponentExposed extends IOptionsPsBaseFieldExposed {
    translateSubTitle?: boolean;
    listOfOptions?: any[];
    headerMap?: Map<string, IMapKeyValue>;
    labelsValueMap?: Map<string, IMapKeyValue>;
    itemList?: any[];
    showItemPopUp?: boolean;
    showTemplateCard?: boolean;
    actionDetailsOptions?: IActionDetailsOptions[];
    showSelectedCard?: boolean;
    item?: any;
    formGroup?: FormGroup;
    bottomPadding?: boolean;
    balanceMapping?: any[];
    currencyFlag?: string;
    isEditable?: boolean;
    statementOptions?: IActionDetailsOptions;
    editActionUrl?: string;
    requestMap?: Map<string, string>;
    editRequestMap?: Map<string, string>;
    pageData?: IPageCommon;
    reportInput?: any;
    showInitialCardValues?: number;
    detailServiceUrl?: Array<IDetailService>;
}

export interface IDetailService {
    url?: string;
    paramsKeyLabels?: Array<IMapKeyValue>;
    responseKeyLabel: Array<IMapKeyValue>;
}

export interface IOmniDealsListRequest extends ICommonInterfaceRequest {
    dealNumber?: string;
    compCode?: number;
    status?: string;
}
export interface IDealResponse extends IOmniCommonResponse {
    dealCurrency?: string;
    dealNumber?: string;
    customerDealNumber?: string;
    dealStructureNumber?: string;
    dealChartNumber?: string;
    facilityNumber?: string;
    leaseAsset?: string;
    cifNumber?: string;
    cifShortName?: string;
    cifShortNameArab?: string;
    idNumber?: string;
    productClassNumber?: string;
    productClassName?: string;
    drawDownDealReference?: string;
    DealReferenceNumber?: string;
    tradeReferenceNumber?: string;
    statusDescription?: string;
    createdBy?: string;
    dealCurrencyDescription?: string;
    valueDate?: Date;
    maturityDate?: string;
    printInd?: string;
    financeNumber?: string;
    linkedDealNumber?: string;
    linkedAbiNumber?: string;
    productType?: string;
    productTypeDescription?: string;
    categoryCode?: string;
    categoryName?: string;
    queryMode?: string;
    totalPaidAmount?: number;
    totalPrincipalOutstanding?: number;
    nextPaymentAmount?: string;
    nextPaymentDate?: string;
    noOfRemainingInstallment?: number;
    financingType?: string;
    pastDueAmount?: number;
    paymentPeriodicityNumber?: string;
    lastSettledDate?: string;
    lastSettledAmount?: number;
    financeAmount?: string;
    paidAmount?: string;
    outstandingBalance?: string;
    key?: string;
    nickName?: string;
    installmentAmount?: number;
    paymentPeriodicityType?: string;
}
export interface IOptionsAccountOpening {
    toggleOptions?: IOptionsPsSelectToggle;
    toggleProfitOptions?: IOptionsPsSelectToggle;
}

export interface IOcBranchesRequest extends IOmniRequestBaseObject {
    isPhysical?: string;
    vsBranchCode?: string;
    branchesCodeList?: string;
    bannedBranchesCodeList?: string;
    branchesIdList?: string;
    cityId?: number;
    mapTypesInclude?: string;
}
export interface IAccountDeactivationReasonRequest {
    reasonIds?: string;
    excludedReasonIds?: string;
    reasonsCode?: string;
    reasonType?: string;

}
export interface IMaritalStatusRequest {
    language?: string;
    lovTypeId?: number;
    lovCodesExclude?: string;
    lovCodesInlude?: string;
    orderCriteria?: string;
}
export interface IOmniCardsRequest extends ICommonInterfaceRequest {
    permittedCardStatusList?: string;
    specificAccountStatus?: boolean;
    omnibranchCode?: string;
    glCode?: string;
    currencyCode?: string;
    chequeNumberFrom?: string;
    chequeNumberTo?: string;
    numberOfRecordsToReturn?: number;
    numberOfRecordsStillExist?: number;
}

export interface IOmniCardNamePersonalizationRequest {
    cardNumber?: string;
    newCardName?: string;
    oldCardName?: string;
    operId?: number;
    compCode?: number;
    status?: string;
    appChnlId?: number;
    accountName?: string;
    apiCode?: number;
    appId?: number;
    nbRec?: number;
    language?: string;
    refCode?: string;
    action?: string;
    branchCode?: number;
}

export interface IExchangeRateRequest extends ICommonInterfaceRequest {
    currencyCodeFrom?: string;
    currencyCodeTo?: string;
    date?: Date;
    time?: number;
    nbRec?: number;
    recToskip?: number;
}

export interface IExchangeRateCO extends IOmniBaseVO {
    buyRate?: number;
    middleRate?: number;
    sellRate?: number;
    transferSellRate?: number;
    transferBuyRate?: number;
    currencyCode?: string;
    currencyDecimalPoints?: number;
    currencyPtMethod?: string;
    currencyDesc?: string;
    dateRate?: number;
    time?: string;
    rate?: number;
}

export interface IAmountValidationRequest extends ICommonInterfaceRequest {
    currencyCode?: number;
    transactionType?: string;
    amount?: number;
    limitPackageCode?: number;
    operationCode?: number;
}

export interface IAmountFromToCurrencyRequest extends IOmniRequestBaseObject {
    amount?: number;
    fromCurrency?: any;
    toCurrency?: any;
    branchCode?: string;
    transactionTypeCode?: number;
    accountGl?: number;
    fromAmount?: number;
    toAmount?: string;
    companyCode?: number;
    operId?: number;
}

export interface IAmountFromToCurrencyResponse extends IOmniCommonResponse {
    amountInToCurrency?: number;
    fromAmount?: number;
    toAmount?: number;
    exchangeRate?: number;
    multiplyDivideRateIndicator?: string;
}

export interface IAmountValidationResponse extends IOmniCommonResponse {
    isValid?: boolean;
}

export interface ICardTypeRequest extends IOmniRequestBaseObject {
    compCode?: number;
    cardCodes?: string;
    cardType?: string;
    cardTypesIds?: number;
    cardTypesIdsExclude?: string;
    cardTypeList?: string;

}
export interface IOptionsCardRequest {
    toggleSupplementaryOptions?: IOptionsPsSelectToggle;

}

export interface ICardTypeResponse extends IOmniCommonResponse {
    wdLimitAmount: number;
}


export interface ILegalStatusRequest extends IOmniRequestBaseObject {

}

export interface ILegalStatusResponse extends IOmniCommonResponse {

}
export interface IRankingRequest extends IOmniRequestBaseObject {

}

export interface IRankingResponse extends IOmniCommonResponse {

}

export interface IOmniINotificationRequest extends ICommonInterfaceRequest {
}

export interface INotificationResponse extends IOmniCommonResponse {
    title?: string;
    message?: string;
    time?: string;
    business_status?: string;
    externalUrl?: string;
    is_seen?: boolean;
    type?: string;
}

export interface IOmniUserCO extends IOmniBaseVO {
    corporateId?: string;
    deleteMsg?: string;
    statusDesc?: string;
    statusColorCode?: string;
    businessProfileCode?: number;
    businessProfileName?: string;
    subProfileCode?: number;
    subProfileName?: string;
    customerCode?: number;
    customerName?: string;
    cifName?: string;
    customerCifNo?: string;
    channelDropDown?: Array<ISelectCO>;
    omniUserVO?: IOC_USRVO;
    omniUserAppVO?: IOC_USR_APPVO;
    appChannelList?: Array<IOC_USR_APPVO>;
    omniChannelList?: Array<IOmniCommonCO>;
    omniApplicationList?: Array<IOmniCommonCO>;
    appList?: string;
    channelList?: string;
    systemDate?: Date;
    notificationMsg?: string;
    redirectPage?: string;
    multipleUserApp?: string;
    message?: string;
    reason?: string;
    isUpdate?: boolean;
    userCode?: number;
    deliverOptionCode?: string;
    deliveryOption?: string;
    userPkId?: number;
    customerId?: number;
    businessProfileId?: number;
    subProfileId?: number;
    subLimitName?: string;
    subLimitId?: number;
    reasonForDeactivation?: number;
    reasonForDeactivationDetail?: string;
    serverPublicKey?: string;
    userTypeDesc?: string;
    isAdmin?: boolean;
    chargeAmout?: number;
    operSrc?: string;
    totalBranchCharge?: number;
    accountDropDownList?: Array<any>;
    exchangeRate?: number;
    channelActivationChargesGridData?: string;
    channelActivationChargesGridDataList?: Array<any>;
    omniUserAccounts?: Array<any>;
    userAccountList?: Array<any>;
    accountList?: string;
    appChannelIds?: string;
    chargePackageId?: number;
    verificationImageData?: string;
    businessProfileIdCorp?: number;
    businessProfilesCO?: Array<any>;
    accessToken?: IOauth2Token;
}

export interface ISelectCO extends IOmniBaseVO {
    code?: string;
    descValue?: string;
    defaultValue?: string;
}

export interface IOauth2Token {
    tokenKey?: string;
    tokenType?: string;
    refreshToken?: string;
    expiresIn?: number;
    issuedAt?: number;
    issuer?: string;
}

export interface OmniUserResponse extends IOmniCommonResponse {
    ctrSecurityQuestionHit?: number;
}

export interface ILostDocumentListRequest extends IOmniCommonResponse {
    serviceMethod?: string;
    language?: string;
}


export interface IOmniPrayerTimeRequest extends ICommonInterfaceRequest {
    latitude?: number;
    longitude?: number;
    date?: string;
    timeZone?: string;
    calculationMethod?: 0 | 1 | 2 | 3 | 4;
    // 0 : Muslim World League ( Default)
    // 1 : ISNA Islamic Society of North America
    // 2 : Egypt Egyptian General Authority of Survey
    // 3 : Makkah Umm al-Qura University, Makkah
    // 4 : UIS
}

export interface ITFSDocumentTypeRequest extends ICommonInterfaceRequest {
    docType?: string;
    language?: string;
}

export interface ITFSDocumentTypeResponse extends IOmniCommonResponse {
    BRIEF_NAME_ENG?: string;
    COMP_CODE?: number;
    docType?: string;
    LONG_NAME_ENG?: string;
    settlementType?: string;
    cashFinance?: string;
}

export interface IInsuranceCompaniesRequest extends ICommonInterfaceRequest {
    language?: string;
}

export interface IInsuranceCompaniesResponse extends IOmniCommonResponse {
    BRIEF_NAME_ARAB?: string;
    BRIEF_NAME_ENG?: string;
    CODE?: string;
    COMP_CODE?: string;
    DETAILS_ENG?: string;
}


export interface IActivitiesResponse extends IOmniCommonResponse {

}

export interface IShipmentTermsRequest extends ICommonInterfaceRequest {
    // language?: string;
}

export interface IShipmentTermsResponse extends IOmniCommonResponse {
    BRIEF_NAME_ARAB?: string;
    BRIEF_NAME_ENG?: string;
    CODE?: string;
    COMP_CODE?: string;
    DETAILS_ENG?: string;
}

export interface IFacilityDetailsRequest extends ICommonInterfaceRequest {

}

export interface IFacilityDetailsResponse extends IOmniCommonResponse {
    facilityNo?: string;
    facilityAmount?: string;
    expiryDate?: string;
    unutilizedAmount?: string;
    branchName?: string;
    currency?: string;
    lineNumber?: string;
    key?: string;
}

export interface IFormOfDocumentaryRequest extends ICommonInterfaceRequest {

}

export interface IFormOfDocumentaryResponse extends IOmniCommonResponse {

}

export interface IPrayerTimeResponse extends IOmniCommonResponse {
    outputType?: string; // 'F'|'I'|'S';
    outputCode?: number;
    outputNotification?: string;
    fajar?: string;
    sunrise?: string;
    zuhar?: string;
    asser?: string;
    maghrib?: string;
    ishaa?: string;
    qiblaDirection?: string;
    hijriDate?: string;
}

export interface ISukukSecuritiesRequest extends ICommonInterfaceRequest {
    serverDate?: Date;
    eligibleIPO?: string;
    byBroker?: string;
    securityPriceDetails?: string;
    linkToSecurityDetails?: string;
    operator?: string;
    value?: string;
    securityCode1?: number;
    securityCode2?: number;
    sukukType?: string;
    filter?: string;
    branchCode?: number;
    numberOfRecordsToReturn?: number;
    numberOfRecordsStillExist?: number;
    userCifNo?: string;
    seq?: string;
    fromDate?: string;
    toDate?: string;
    workingCifNumber?: number;
    allowNegative?: string;
}

export interface ISukukSecuritiesCO extends IOmniBaseVO {
    portfolio?: string;
    sukukType?: string;
    isdaraNumber?: string;
    issueDate?: string;
    balance?: number;
    totalNbrOfSukuk?: number;
    maturityDate?: string;
    marketPrice?: number;
    sukukBalance?: number;
    availableBalance?: number;
    sukukLiquidation?: number;
    sukukRenewal?: number;
    valueOfLiquidatedShares?: number;
    currencyDesc?: string;
    currencyFlag?: string;
    profitRate?: number;
    newIsdaraLabel?: string;
    numberOfRecordsStillExist?: number;
    portfolioSeq?: number;
    securityCode1?: number;
    securityCode2?: number;
    tradeDate?: string;
    ipoStartDate?: string;
    ipoEndDate?: string;
    transactionNumber?: number;
    sukukPrice?: number;
    remainingLimit?: number;
    bondLife?: number;
    gridIssueDate?: string;
    gridIpoStartDate?: string;
    gridIpoEndDat?: string;
    calculatedSukukPrice?: number;
    transactionNumberDetails?: string;
    progReference?: string;
    subTitle?: string;
    title?: string;
    applicationName?: string;
    tradingCurrency?: string;
    longName?: string;
    tradingCurrencyCode?: string;
    years?: number | string;
}


export interface IOmniCommonRequest extends ICommonInterfaceRequest {
    parameterId?: string;
    parameterName?: string;
    paramNameList?: string;
    parameterGrp?: string;
    portfolioCif?: string;
    filterByOper?: boolean;
}

export interface IIPORequestListCO extends IOmniBaseVO {
    securityType?: string;
    securityName?: string;
    issueDate?: Date;
    ipoStartDate?: Date;
    ipoEndDate?: Date;
    sukukPrice?: number;
    remainingLimit?: number;
    bulletin?: string;
    additionalInfo?: string;
    currencyDesc?: string;
    currencyFlag?: string;
    profitRate?: number;
    bondLife?: string;
    trsNo?: string;
    type?: string;
    cifNumber?: number;
    portfolioNumber?: string;
    totalSukuk?: number;
    balance?: string;
    status?: string;
    ipoDate?: Date;
    maturityDate?: Date;
    requestNumber?: string;
    branchCode?: string;
    numberOfSukuk?: number;
    progReference?: string;
    transactionNumber?: string;
}

export interface IChequeTypesRequest extends IOmniRequestBaseObject {
    chequeBookTypesIds?: string;
    chequeBookTypesCodes?: string;
}

export interface IChequeTypesResponse extends IOmniCommonResponse {
    chequeTypesCode?: string;
    briefName?: string;
    trxType?: string;
    chargesSchema?: string;
    numberOfCheques?: string;
    chequeAmendable?: string;
    autoSubmit?: string;
    chequeType?: string;
    chequeUrgent?: string;
    chequeSerialNumber?: string;
    accountNumber?: string;
}
export interface IUpdateUserProfileRequest extends IOmniCommonResponse {
    profilePicture?: string;
    email?: string;
    mobileNumber?: string;
    operId?: number;
}

export interface ISmartFieldRequest extends IOmniRequestBaseObject {
    applicationName?: string;
    progReference?: string;
    transactionNumber?: string;
    smartFieldCode?: string;
}

export interface ISmartFieldResponse extends IOmniResponseBaseObject {
    applicationName?: string;
    progReference?: string;
    transactionNumber?: string;
    smartFieldCode?: number;
    smartFieldBriefName?: string;
    smartFieldText?: string;
    smartFieldNumber?: number;
    smartFieldDate?: Date;
    smartFieldThirdPartyLocation?: string;
    smartFieldFileContents?: string;
    isFile?: string;
}

export interface ISmartFieldCO extends IOmniBaseVO {
    applicationName?: string;
    progReference?: string;
    transactionNumber?: string;
    smartFieldCode?: number;
    smartFieldBriefName?: string;
    smartFieldText?: string;
    smartFieldNumber?: number;
    smartFieldDate?: Date;
    smartFieldThirdPartyLocation?: string;
    smartFieldFileContents?: string;
    isFile?: string;
    smartDetails?: any;
}
export interface IOcPostalCodeRequest extends ICommonInterfaceRequest {
    regionsCode?: number;
    countriesCode?: number;
    postalCodesIds?: number;
    postalCodes?: number;
}
export interface ICifTypeRequest extends IOmniCommonResponse {
    cifTypeCode?: string;
    language?: string;
}

export interface IChequeBookRequestVO extends IOmniBaseVO {
    inputAmount?: number;
    currency?: any;
    chequeBookTypes?: any;
    destinationBranch?: any;
    idType?: any;
    idNumber?: any;
    branchName?: any;

}

export interface IChangePinVO extends IOmniBaseVO {
    oldPin?: string;
    confNewPin?: string;
    newPin?: string;
}


export interface ICoreReasonsRequest extends IOmniRequestBaseObject {
    includeIds?: string;
    includeCodes?: string;
    reasonType?: number;
}

export interface IKeyLabelsRequest extends IOmniRequestBaseObject {
    desc: any;
}

export interface CreditCardRequestVO extends IOmniBaseVO {

}
export interface CreditCardSettlementVO extends IOmniBaseVO {

}
export interface LostDocumentRequestVO extends IOmniBaseVO {

}

export interface FinancingPaymentRequestVO extends IOmniBaseVO {

}

export interface IpoRequestVO extends IOmniBaseVO {
    quantity?: string;
    price?: string;
    brokerCode?: string;
    tradeDate?: string;
    portfolioCif?: string;
    portfolioSequenceNumber?: string;
}

export interface ICategorySubCategoryOptions {
    categoryFcName?: string;
    categoryLabelKey?: string;
    categoryPlaceholderKey?: string;
    subCategoryFcName?: string;
    subCategoryLabelKey?: string;
    subCategoryPlaceholderKey?: string;
}


export interface RegisterAdminUserVO {

}
export interface IMaturityAccountInforRequest extends IOmniRequestBaseObject {
    accountNumber?: string;
    accountType: string;
}

export interface IAccountNumberCurrRequest extends IOmniRequestBaseObject {
    accountNumber?: string;
    accountType?: string;
}

export interface IAccountNumberCurrResponse extends IOmniCommonResponse {
    currencyCode?: number;
}

export interface IMaturityAccountInforResponse extends IOmniResponseBaseObject {
    renewAccount?: string;
    transferAccount?: any;
    profitAccount?: any;
    postProfitTo?: string;
    createaNewAccountWithTheFollowing: boolean;
    distributeprofittotheMaturityAccount: boolean;
    distributionPeriodicity: string;
    dividendsPaid: string;
    externalTransfer: string;
    renew?: boolean | string;
    renewWithSame?: boolean | string;
}

export interface IOcPortfolioRequest {

}

export interface CardManagementVO {
    action?: string;
    limitFlags?: any;
    posLimitAmount?: any;
    currencyCode?: any;
    cardWdLimitAmount?: any;
}
export interface ITransactionResponse extends IOmniCommonCO {
    toAccountNumber?: string;
    transferTypeOperId?: string;
    transferTypeDesc?: string;
    amount?: string;
    transactionTypeShortNameEnglish?: string;
    transactionDate?: string;
    createdBy?: string;
    cifShortName?: string;
    toTransactionAccountGl?: string;
    transactionAccountBranch?: string;
    status?: string;
    fromAccountCurrency?: string;
    currencyBriefNameEnglish?: string;
    fromAccountAdditionalRef?: string;
    transactionNo?: string;
    transactionAccountSl?: string;
    transactionAccountCif?: string;
    fromAccountAccGl?: string;
    soReference?: string;
    toAccountAdditionalRef?: string;
    valueDate?: string;
    transferType?: string;
    fromAccountCif?: string;
    toAccountCif?: string;
    // transferTypeOperId?: number;
    fromAccountSerialNo?: string;
    bankCifShortNameEng?: string;
    fromAccountBranch?: string;
}