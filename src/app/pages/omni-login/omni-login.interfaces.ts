import { IOmniCommonServiceResponse } from '../omni-base/omni-base.interfaces';

export interface ILoginRequest {

}

export interface ILoginResponse extends IOmniCommonServiceResponse {
    chargePackageId?: number;
    limitPackageId?: number;
    customerInfoCO?: IcustomerInfoCO;
    companySettingsCO?: ICompanySettingsCO;
    omniUserVO?: IOmniUserVO;
    omniUserAppVO?: IOmniUserAppVO;
    businessProfiles?: IbusinessProfilesCO[];
    accessToken?: IAccessToken;
    profileImage?: string;
}

export interface IcustomerInfoCO {
    message?: string;
    email?: string;
    chargePackageId?: number;
    limitPackageId?: number;
    longName?: string;
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

export interface IbusinessProfilesCO {
    subProfile?: boolean;
    corporateProfile?: boolean;
    renderNoOfEndUsers?: boolean;
    operAppChnlVO?: IOperAppChnlVO;
    operVO?: IOperVO;
    children?: IbusinessProfilesCO[];
    businessProfileOperVO?: IBusinessProfileOperVO;
}
export interface IBusinessProfileOperVO {
    MAKER_YN?: string;
    CHECKER_YN?: string;
}

export interface IOperAppChnlVO {
    PAGE_HREF?: string;
    DISP_ORDER?: number;
    DISPLAY_TO_CUSTOMER_YN?: string;
    ICON_NAME?: string;
    CATEG?: string;
    PARAM?: any;
}

export interface IOperVO {
    DESCRIPTION?: string;
    OPER_NAME?: string;
    OPER_TYPE?: string;
    TYPE_DESC?: string;
    OPER_ID?: number;
    BUSINESS_PROFILE_YN?: string;
}

export interface IOperDef extends IOperVO, IOperAppChnlVO, IBusinessProfileOperVO {
    route?: string | Array<string>;
}

export interface IOmniUserAppVO {
    LAST_ACCESS_TIME?: Date;
}

export interface IOmniUserVO {
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
    LOG_LEVEL?: string;
}