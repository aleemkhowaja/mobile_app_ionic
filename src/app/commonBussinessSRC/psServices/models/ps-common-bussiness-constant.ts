export class CommonBussinessConstant {
    public static readonly forceSocial = 'forceSocial';
    public static readonly FACEBOOK_REFERRER_URL = ''/* 'https://apps.facebook.com/' */;
    public static readonly isRedemption = 'isRedemption';
    public static readonly isRedemptionOccurring = 'isRedemptionOccurring';
    public static readonly BusinessProfile = 'BusinessProfile';
    public static readonly LOV_TYPE_ID_ID_TYPES = 641;
    public static readonly LOV_TYPE_ID_PREFERRED_LANGUAGES = 412;
    public static readonly LOV_TYPE_ID_WEEK_DAYS = 1150;
    public static readonly LOV_TYPE_ID_HIJIRI_MONTHS = 1741;
    public static readonly LOV_TYPE_ID_DELIVERY_OPTIONS = 1057;
    public static readonly LOV_TYPE_ID_PRIODICITY_OPTIONS = 1332;
    public static readonly LOV_TYPE_ID_WEEKDAYS_OPTIONS = 436;
    public static readonly LOV_TYPE_ID_RECURRENCEMONTHS_OPTIONS = 71;
    public static readonly LOV_TYPE_ID_INTERVALDATA_OPTIONS = 286;
    public static readonly ACCOUNT_POOLING_REPORT = 1583;
    public static readonly LOV_TYPE_ID_MONTHS_OPTIONS = 286;
    public static readonly LOV_TYPE_ID_DEBIT_CREDIT_OPTIONS = 269;
    public static readonly LOV_TYPE_ID_IPO_PAYMENT_METHOD_AGENT = 1534;
    public static readonly LOV_TYPE_ID_IPO_PAYMENT_METHOD_INDIVIDUAL = 1535;
    public static readonly LOV_TYPE_ID_PRIODICITY = 1842;
    public static readonly LC_REQUEST_PURPOSE_LOV_TYPE_ID = 1042;
    public static readonly AMOUNT_TOLERANCE_LOV_TYPE_ID = 527;
    public static readonly CREDIT_AVAILABILITY_LOV_TYPE_ID = 525;
    public static readonly SELLLEMENT_METHOD_LOV_TYPE_ID = 272;
    public static readonly CONFIRMATION_INSUTRUCTION_LOV_TYPE_ID = 385;
    public static readonly AND_OR_LOV_TYPE_ID = 213;
    public static readonly MATIRIAL_FROM_OTHER_CONTRY_LOV_TYPE_ID = 43;
    public static readonly AIR_BILL_LOV_TYPE_ID = 119;
    public static readonly CHARGES_BORNE_BY_LOV_TYPE_ID = 391;
    public static readonly INCOTERMS_LOV_TYPE_ID = 1990;
    public static readonly FORM_OF_DOCUMENTARY_CREDIT_LOV_TYPE_ID = 274;
    public static readonly INSUTRUCTION_METHOD_LOV_TYPE_ID = 1357;
    public static readonly INSUTRUCTION_TYPE_LOV_TYPE_ID = 1356;
    public static readonly nbRec = 250;

    public static readonly LOV_TYPES_END_POINT = 'rest/omniCommon/returnLovValues';
    public static readonly LOV_TYPE_MAP = 'LOV_TYPE_MAP';
    public static readonly INPUT_TYPE_TEXT = 'text';
    public static readonly TermsAndConditionsApi = 'rest/omniCommon/termsAndCondition';
    public static readonly STATUS_APPROVED = 'A';
    public static readonly REMEMBER_ME = 'rememberMe';
    public static readonly USER_NAME = 'userName';
    public static readonly PRODUCT_TYPES_END_POINT = 'rest/omniCommonPull/returnProductClasses/';
    public static readonly SUKUK_LIST_END_POINT = 'rest/omniCorePull/returnSukukList/';
    public static readonly GOODS_CATEGORIES_END_POINT = 'rest/omniCommonPull/getGoodsCategory/';
    public static readonly GOODS_END_POINT = 'rest/omniCommonPull/returnGoods/';
    public static readonly FACILITY_TYPES_END_POINT = 'rest/omniCorePull/returnFacilityTypes/';
    public static readonly CURRENCIES_LIST_END_POINT = 'rest/omniCommonPull/returnCurrenciesList';
    public static readonly IIS_ISLAMIC_CALCULATOR_REQUEST_END_POINT = 'rest/omniCommonPush/iisIslamicCalculator';

    public static readonly LOV_TYPE_ID_ATM_CDM_BRANCHES = 1104;
    public static readonly ID_TYPES_END_POINT = 'rest/omniCommon/returnIdTypes';
    public static readonly SucessAlertTimeout = 1500;
    public static readonly SUCESSMSGTITLE = 'SUCCESS_TITLE';
    public static readonly WARNINGMSGTITLE = 'WARNING_TITLE';
    public static readonly FATALMSGTITLE = 'FATAL_TITLE';
    public static readonly INFOMSGTITLE = 'INFO_TITLE';
    public static readonly INFO_TERMS_AND_CONDITION = 'termsAndCondition';
    public static readonly INFO_BANK_WEBSITE = 'bankWebsite';
    public static readonly INFO_SECURITY_STATEMENT = 'securityStatement';
    public static readonly INFO_PRODUCT_BANKS = 'products';
    public static readonly INFO_FAQ = 'faq';
    public static readonly REASON_TYPE_FOR_ACCOUNT_DEACTIVATION = '1';
    public static readonly OTHER_DEACTIVATION_ITEM_VALUE = -2;
    public static readonly FINANCING_CALC_REPORT = 106;
    public static readonly DEAL_REQUEST_REPORT_OPER = 1594;
    public static readonly DEAL_REQUEST_OPER = 1572; // Heba.Hassan - 11 June 2020 TP: #988289
    public static readonly CHEQUEBOOK_SECTION_OPER = 1497;
    public static readonly CHEQUEBOOK_REPORT_OPER = 1565;
    public static readonly EXPIRED_SECURITIES_LIST = 1557;
    public static readonly IPO_ELIGABLE_SECURITY_LIST = 1552;
    public static readonly WORKING_CIF_OPER_TO_BE_CHECKED = [CommonBussinessConstant.EXPIRED_SECURITIES_LIST, CommonBussinessConstant.IPO_ELIGABLE_SECURITY_LIST];
    public static readonly SECURITIY_RENEWAL = 1462;
    public static readonly DELETE_STANDING_ORDER = 1575;
    public static readonly STOP_STANDING_ORDER = 1265;
    public static readonly EDIT_STANDING_ORDER = 1576;
    public static readonly PENDING_TRANSFERS_OPER_ID = 623;
    public static readonly EDIT_IMMEDIATE_TRANSFER = 627;
    public static readonly DELETE_IMMEDIATE_TRANSFER = 629;

    public static readonly SECURITY_MARKET_PRICE_REPORT = 56;
    public static readonly PORTFOLIO_POSITION_REPORT = 1483;
    public static readonly STATMENT_OF_TRANSACTION_REPORT = 1484;
    public static readonly IPO_REQUEST_REPORT = 1480;
    public static readonly RENEWAL_REQUEST_REPORT = 1516;
    public static readonly CIF_OPENING_REPORT = 106;
    public static readonly CIF_OPENING_REQ_REPORT = 1510;

    public static readonly PRE_LOGIN_SCREENS = [
        'forgot-credentials',
        'online-registration',
        'qibla-direction',
        'prayer-time',
        'atm-branch-locator',
        'financial-calculator'
    ];
    public static readonly MINIMUM_OPENING_BALANCE = 'MinimumOpeningBalance';
    public static readonly AccountOpeningPageApi = 619;
    public static readonly AcntOpenBranchesGenAcc = 'AcntOpenBranchesGenAcc';
    public static readonly AcntOpenBranchesMatAcc = 'AcntOpenBranchesMatAcc';
    public static readonly AllowedBranches = 'allowedBranches';
    public static readonly DEFAULT_IMAGE = 'avatar.svg';
    public static readonly CAMERA_QUALITY = 100;
    public static readonly INTERNAL_BENEFICIARY = 'bank_key';
    public static readonly LOCAL_BENEFICIARY = 'local_key';
    public static readonly INTERNATIONAL_BENEFICIARY = 'international_key';
    public static readonly BENEFICIARY_MANAGMENT = 1489;
    public static readonly INTERNAL = 'INTERNAL';
    public static readonly LOCAL = 'LOCAL';
    public static readonly INTERNATIONAL = 'INTERNATIONAL';
    public static readonly NO = 'N';
    public static readonly YS = 'Y';
    public static readonly ALLOWEDCHEQUEBOOKTYPES = 'AllowedChequebookTypes';
    public static readonly DESTINATIONBRANCH_LOV_ID = 19;
    public static readonly DESTINATIONBRANCH_OPTION = 'Other Branch';
    public static readonly ALLOWEDCURRENCIES = 'AllowedCurrencies';

    public static readonly SMSOTP = 'OTP';
    public static readonly TRANSACTION_PASSWORD = 'TransactionPass';
    public static readonly PASSWORD = 'Password';
    public static readonly SECURITY_QUESTION = 'SecurityQuest';
    public static readonly CAPTCHA = 'Captcha';
    public static readonly PHYSICAL_TOKEN = 'physicalToken';
    public static readonly FINGER_PRINT = 'FingerPrint';
    public static readonly EMAILOTP = 'OTP';
    public static readonly VERIFY_TYPE_SECURITY_QUESTION = 'VerifySecurityQuestion';
    public static readonly SMS_REQUEST = 'sms';
    public static readonly EMAIL_REQUEST = 'email';
    public static readonly SECONDS = 'S';
    public static readonly MONTHS = 'M';
    public static readonly DAYS = 'D';
    public static readonly MINUTES = 'N';
    public static readonly REFRESH_OTP_GENERATOR = 'refreshOtpGenerator';
    public static readonly OTP_GENERATOR_ATTEMPTS = 'otpGeneratorAttempts';

    public static readonly PMS = 'PMS';
    public static readonly GENDER_LOV_TYPE_ID = 15;

    public static readonly PASSPORT_NO_ID = '3';
    public static readonly DEBIT_CARD_TYPE = '1';
    public static readonly CREDIT_CARD_TYPE = '2';
    public static readonly CREDIT_CARD_TYPE_NAME = 'CREDIT';
    public static readonly DEBIT_CARD_TYPE_NAME = 'DEBIT';
    public static readonly CIF_BRANCH = 'cifbranch';
    public static readonly ALLOWED_ATTACHMENTS_FILES = 'AllowedAttachmentTypes';

    public static readonly FACILITY_CIF_BRANCH = 'RequestBranch';
    public static readonly FACILITY_USER_INPUT_VALUE = 'U';
    public static readonly OTHER = 'other';

    public static readonly RESET_SEC_QUESTION_OPER = 1321;
    public static readonly RESET_SEC_QUESTION_TITLE = 'RESET_SEC_QUESTION_KEY';
    public static readonly ONLINE_REGISTRATION_OPER = 863;
    public static readonly FORGOT_CREDENTIALS_OPER = 1465;
    public static readonly FINANCIAL_CALCULATOR_OPER = 61;
    public static readonly ON_BOARDING_OPER = 182;
    public static readonly CIF_ONBOARDING_OPER = 1577;
    public static readonly LOV_TYPE_ID_SELLLEMENT_TYPE = 223;

    public static readonly FACILITY_REQUEST_OPER = 73;
    public static readonly ONLINE_REGISTRATION_TITLE = 'online_registration_key';
    public static readonly FORGOT_CREDENTIALS_TITLE = 'help_with_credentials_key';
    public static readonly FINANCIAL_CALCULATOR_TITLE = 'financial_calculator_key';
    public static readonly FACILITY_REQUEST_TITLE = 'facility_request_key';


    public static readonly SHOWLINKS = 'showlinks';
    public static readonly PROFILE_IMAGE_OPER_ID = 767;
    public static readonly INTERNAL_BENEFICIARY_OPER_ID = 869;
    public static readonly EXTERNAL_BENEFICIARY_OPER_ID = 868;
    public static readonly LOCAL_BENEFICIARY_OPER_ID = 1514;
    public static readonly INTERNAL_BENEFICIARY_TRANSFER = 1507;
    public static readonly LOCAL_BENEFICIARY_TRANSFER = 109;
    public static readonly INTERNATIONAL_BENEFICIARY_TRANSFER = 1505;
    public static readonly OWN_ACCOUNT_STANDING_ORDER_OPER_ID = 92;
    public static readonly INTERNAL_BENEFICIARY_TRANSFER_STANDING_ORDER_OPER_ID = 94;
    public static readonly LOCAL_BENEFICIARY_TRANSFER_STANDING_ORDER_OPER_ID = 1567;
    public static readonly EXTERNAL_BENEFICIARY_TRANSFER_STANDING_ORDER_OPER_ID = 96;
    public static readonly CHANGE_PASSWORD_OPER = 78;
    public static readonly REGISTRATION_CHARGES_OPER = 1320;
    public static readonly CHANGE_PIN_OPER = 79;
    public static readonly STOP_REASON_TYPE = 2;

    public static readonly ACCOUNT_BRANCH_ID = 1;
    public static readonly CIF_BRANCH_ID = 2;
    public static readonly END_USER_INPUT_ID = 3;
    public static readonly COLLECTIONBRANCH = 'CollectionBranch';
    public static readonly PENDING_TRANSFERS_REPORT_OPER_ID = 1580;

    public static readonly MNTH = 'Month';
    public static readonly YR = 'Year';
    public static readonly DY = 'Day';
    public static readonly MONTH_S = 'Months';
    public static readonly YEAR_S = 'Years';
    public static readonly DAY_S = 'Days';
    public static readonly YEAR = 'Y';
    public static readonly AllowedCurrencies = 'AllowedCurrencies';
    public static readonly AllAllowedBranches = 'AllAllowedBranches';

    public static readonly INTERNAL_TRANSFER_STANDING_ORDER_OPER_ID = 94;
    public static readonly LOCAL_TRANSFER_STANDING_ORDER_OPER_ID = 1567;
    public static readonly INTERNATIONAL_TRANSFER_STANDING_ORDER_OPER_ID = 96;
    public static readonly TRANSFER_LIST_OPER_ID = 85;
    public static readonly DEFAULT_FALLBACK_OPER = 101;
    public static readonly ACCOUNT_DEACTIVATION_OPER = 1459;
    public static readonly COUNTRY_OPER_ID = 57;
    public static readonly REGION_OPER_ID = 57;
    public static readonly CITY_OPER_ID = 57;
    public static readonly NATIONALITY_OPER_ID = 57;
    public static readonly POSTAL_CODE_OPER_ID = 57;
    public static readonly OCCUPATION_OPER_ID = 57;
    public static readonly CATEGORY_PURPSE = 'Purpose';
    public static readonly CATEGORY_BANK = 'Bank';
    public static readonly CONTACT_DETAILS_OPER_ID = 104;
    public static readonly BULK_PAYMENT_OPER_ID = 1578;
    public static readonly BILL_PAYMENTS_OPER_ID = 1504;
    public static readonly LOV_TYPE_FILE_TYPES = 1905;
    public static readonly CARDS_REQUEST_BRANCH = 'RequestBranch';
    public static readonly CARDS_DESTINATION_BRANCH = 'CollectionDestinationBranch';
    public static readonly DELIVERY_LOC_LOV_ID = 1912;
    public static readonly HOME_ADDRESS_VALUE = 'H';
    public static readonly WORK_ADDRESS_VALUE = 'W';
    public static readonly OTHER_ADDRESS_VALUE = 'O';
    public static readonly SPECIFIC_BRANCH_VALUE = 'S';
    public static readonly CARD_REPORT = 1527;
    public static readonly ACCOUNT_HISTORY_OPER_ID = 1532;
    public static readonly CIF_MAX_NUMBER_OF_ATTACHMENTS = 'CIFOpeningMaximumNumberOfAttachments';
    public static readonly IPO_RENEWAL = 1463;
    public static readonly FACILITY_REPORT = 0;
    public static readonly LOV_TYPE_TRANSACTION_TYPE = 1929;
    public static readonly CIF_OPENING_OPER_ID = 1481;

    public static readonly EDIT_END_USERS_REGISTRATION = 1523;
    public static readonly DELETE_END_USERS_REGISTRATION = 1250;
    public static readonly END_USERS_MANAGEMENT = 1323;
    public static readonly END_USERS_REGISTRATION = 1522;
    public static readonly SUSPEND_END_USERS_REGISTRATION = 1560;
    public static readonly ACTIVATE_END_USERS_REGISTRATION = 1561;

    public static readonly CARD_ACTION_TYPE_BLOCK = 'block';
    public static readonly CARD_ACTION_TYPE_RENEW = 'renew';
    public static readonly CARD_ACTION_TYPE_PIN_CHANGE = 'pin_change';
    public static readonly CARD_ACTION_TYPE_PIN_RESET = 'pin_reset';
    public static readonly CARD_ACTION_TYPE_LIMIT_UPDATE = 'limit_update';

    public static readonly ENABLE_LOCAL_BENEFICIARY_APPROVAL = '';
    public static readonly ENABLE_INTERNATIONAL_BENEFICIARY_APPROVAL = '';
    public static readonly REPORT_PAGE_ROUTE_NAME = 'report-page';
    public static readonly DEFAULT_DATE_TIME_LOV_TYPE_ID = 1030;
    public static readonly RENEW_DEBIT_CARD = 1584;
    public static readonly BLOCK_DEBIT_CARD = 1585;
    public static readonly CHANGE_CREDIT_CARD_PIN = 1587;
    public static readonly CHANGE_DEBIT_CARD_PIN = 1588;
    public static readonly RESET_CREDIT_CARD_PIN = 1589;
    public static readonly RESET_DEBIT_CARD_PIN = 1590;
    public static readonly UPDATE_CREDIT_CARD_LIMIT = 1591;
    public static readonly UPDATE_DEBIT_CARD_LIMIT = 1592;
    public static readonly CARD_SEGMENT_NAME_DEBIT = 'Debit';
    public static readonly CARD_SEGMENT_NAME_CREDIT = 'Credit';

    public static readonly STATUS_APPROVED_ITEM_VALUE = 'P';
    public static readonly STATUS_PENDING_ITEM_VALUE = 'A';

    public static readonly RESIDENCY_LOV_TYPE_ID = 24;
    public static readonly RESIDENT_CODE = 'R';
    public static readonly SUDAN_COUNTRY_CODE = '736';
    public static readonly WEEK = 'Week';
    public static readonly WEEK_CODE = 'W';
    public static readonly QUATER = 'Quater';
    public static readonly QUATER_CODE = 'Q';

    public static readonly INDIVIDUAL_VT_INDICATOR = 'V';
    public static readonly INSTITUTION_VT_INDICATOR = 'T';


    public static readonly LIMIT = 'L';
    public static readonly OPEN = 'O';
    public static readonly BALANCE = 'B';

    public static readonly PORTFOLIO_STATUS_LOV_TYPE_ID = 1949;
    public static readonly RENEWAL_REQUEST_STATUS_LOV_TYPE_ID = 1950;
    public static readonly IPO_REQUEST_STATUS_LOV_TYPE_ID = 1951;
    public static readonly PORTFOLIO_POSITION_OPER_ID = 1483;
    public static readonly RENEWAL_REQUEST_OPER_ID = 1516;
    public static readonly IPO_REQUEST_OPER_ID = 1480;

    public static readonly CARD_STATEMENT = 1586;
    public static readonly VISIBLE_FIELD = 1;
    public static readonly INVISIBLE_FIELD = 0;
    public static readonly USER_STATE_ACTIVE = 'Active';
    public static readonly USER_STATE_SUSPEND = 'Suspended';
    public static readonly USER_STATE_INACTIVE = 'Inactive';
    public static readonly USER_STATE_DEACTIVE = 'Deactive';
    public static readonly USER_STATE_BLOCKED = 'Blocked';
    public static readonly USER_STATE_NEW = 'New';

    public static readonly DEFAULT_DATA_TYPE = '0';
    public static readonly ALPHA_DATA_TYPE = '1';
    public static readonly NUMERIC_DATA_TYPE = '2';
    public static readonly ALPHA_NUMERIC_DATA_TYPE = '3';
    public static readonly MY_PROFILE_OPER = 57;
    public static readonly PERSONAL_DETAILS_OPER_ID = 57;
    public static readonly ACTIVITY_LOG_OPER_ID = 81;
    public static readonly ACTIVITY_LOG_OPER_ID_LOGOUT = 1329;

    public static readonly APPROVED = 'approved';

    public static readonly INSTRUCTION_METHOD_ONLINE = 'ON';
    public static readonly INSTRUCTION_METHOD_OFFLINE = 'OFF';
    public static readonly INSTRUCTION_TYPE_MIN = 'MIN';
    public static readonly INSTRUCTION_TYPE_MAX = 'MAX';
    public static readonly INSTRUCTION_TYPE_AUTO = 'AUTO';

    // CHANGE MATURITY INSTRUCTIONS
    public static readonly CHANGE_MATURITY_ACCOUNT_OPER_ID = 1574;
    public static readonly CIF_OPENING_EDIT_OPER_ID = 1581;
    public static readonly CIF_OPENING_DELETE_OPER_ID = 1595;

    public static readonly DEBIT_CARD_REQ = 52;
    public static readonly CREDIT_CARD_REQ = 1564;
    public static readonly CHEQUE_BOOK_REQ = 49;
}
