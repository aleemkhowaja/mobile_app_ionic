export class ConstantCommon {
    public static readonly PREVIEW_COMPONENT_DELIMITER = '&emsp;';
    public static readonly PREVIEW_COMPONENT_DELIMITER_HEX = '\u2003';
    /** Added by Richie for #BUG 755638 */
    public static DECIMAL_SEPARATOR = '.';
    public static THOUSANDS_SEPARATOR = ',';
    /** End Richie */
    public static readonly USER_IS_LOGGED_IN = 'userIsLoggedIn';
    public static readonly USER_FORCE_LOGOUT = 'userForceLogout';
    public static readonly UUID = 'UUID';
    public static readonly listAllowedCifsAsString = 'listAllowedCifsAsString';
    public static readonly USR_ID = 'ocUserId';
    public static readonly APP_ID = 'appId';
    public static readonly USER_NAME = 'userName';
    public static readonly USR_TYPE = 'userType';
    public static readonly CUSTOMER_CIF_BRANCH = 'CUSTOMER_CIF_BRANCH';
    public static readonly CORPORATE_ID = 'corporateId';
    public static readonly FACEBOOK_SOCIAL_ID = 'FACEBOOK_SOCIAL_ID';
    public static readonly SERVER_PUBLIC_KEY = 'serverPublicKey';
    public static readonly LOGIN_END_POINT = 'rest/omniCommon/loginProcess';
    public static readonly PRE_LOGIN_SERVICE_URL = 'rest/omniCommon/preLoginService';
    public static readonly LOGIN_SERVICE_URL = 'rest/omniCommon/loginProcess';
    public static readonly psComponentsDefaultClass = 'ps-component-default-class';
    public static readonly MENUPAGE_OPER_ID = 1475;
    public static readonly GLOBAL_OPER_ID = '2222';
    public static readonly VIEW_STATEMENT_OF_TRANSACTIONS = 1533; // as requested by shour 1521;
    public static readonly CHEQUEBOOK_REPORT = 1565;
    public static readonly DEAL_REPORT = 1570;
    public static readonly CHANNEL = 'C';
    public static readonly SESSION = 'session';
    public static readonly OLD_VALUE = 'oldValue';
    public static readonly DEFAULT_FILE_SIZE = 1024;
    public static readonly DEFAULT_ALLOWED_FILE_TYPE = '.doc,.txt,.docx';

    public static readonly DEVICE_IP = 'ip';

    public static readonly USR_EMAIL = 'Email';
    public static readonly LAST_ACCESS_TIME = 'LAST_ACCESS_TIME';
    // 825981
    public static readonly DEFAULT_MAX_LENGTH = 50;
    public static readonly DEFAULT_MIN_LENGTH = 3;
    public static readonly INTEGER_ZERO = 0;
    public static readonly DEFAULT_MAX_DECIMAL_LENGTH = 3;
    public static readonly DEFAULT_MAX_VALUE = 999999.999;
    public static readonly ALLOWED_KEY_CODES = [18, 40, 37, 39, 38, 8, 20, 17, 46, 35, 13, 27, 44, 16, 32, 9, 36, 45, 144];
    public static readonly ALPHA_NUMERIC_WITH_WHITE_CHAR_REGEX = '[^A-Za-zÀ-ÿ0-9\u0600-\u06FF\s]';
    public static readonly PUBLIC_KEY = 'publicKey';
    public static readonly PRIVATE_KEY = 'privateKey';
    public static readonly SESSION_ID = 'sessionId';
    public static readonly frontEndPublicKeyToSend = 'frontEndPublicKeyToSend';
    /* nabil feghali - OMNI common security */
    public static readonly SERVER_LOGIN_TOKEN = 'serverLoginToken';
    public static readonly SERVER_AUTH_TOKEN = 'serverAuthToken';
    public static readonly LOGIN_USER_URL = 'loginUser';

    public static readonly MINUS_ONE = -1;
    public static readonly recToskip = 0;
    public static readonly STATUS_APPROVED = 'A';

    public static readonly FileTyps = { TEXT: 'text', IMAGE: 'img', PDF: 'pdf', HTML: 'html', WORD: 'word', EXCEL: 'excel', PPT: 'ppt' };

    public static readonly MessagePage_END_POINT = 'rest/omniCommonPull/inboxMessagesByThread';
    // 913222
    public static readonly validEmailAddressRegEx = /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;
    // 915417
    public static readonly validIMALAccountRegEx = /^(\d{4}-\d{3}-\d{6}-\d{8}-\d{3})$/;
    public static readonly ACCOUNT_FORMAT_IS_IBAN = 1;
    public static readonly ACCOUNT_FORMAT_IS_ADDITIONAL_REFERENCE = 2;
    public static readonly ACCOUNT_FORMAT_IS_IMAL = 3;
    public static readonly FILE_STATUS_NEW = 'N';
    public static readonly FILE_STATUS_RETRIEVE = 'R';
    public static readonly FILE_STATUS_DELTETED = 'D';
    // 1101772
    public static readonly alphaNumericRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
    public static readonly numericRegex = /^[0-9]*$/;
    public static readonly alphaRegex = /^[a-zA-Z]*$/;
    public static readonly anyRegex =  /^[0-9]*$/;
    // Added by Richie for the customization
    public static readonly ACTION_TYPE_MANDATORY = 'MANDATORY';
    public static readonly ACTION_TYPE_VISIBLE = 'VISIBLE';
    public static readonly ACTION_TYPE_READONLY = 'READONLY';
    public static readonly ACTION_TYPE_LABEL = 'LABEL';
    public static readonly ACTION_TYPE_MAXLENGTH = 'MAXLENGTH';
    public static readonly ACTION_TYPE_MINLENGTH = 'MINLENGTH';
    public static readonly ACTION_TYPE_MAXVALUE = 'MAXVALUE';
    public static readonly ACTION_TYPE_MINVALUE = 'MINVALUE';
    public static readonly ACTION_TYPE_DEFAULT_VALUE = 'DEFAULTVALUE';
    public static readonly ACTION_TYPE_PATTERN = 'PATTERN'; // 1101772
    // end Richie

    // Added by Richie: used as inner attributes inside the form controller
    public static readonly CONTROLLER_CLEAR_VALUE = 'clearValue';
    public static readonly CONTROLLER_VALUE_CHANGED = 'valueChanged';
    public static readonly CONTROLLER_MASK_OPTIONS = 'maskOptions';
    public static readonly CONTROLLER_MASK_APPLICABLE = 'maskApplicable';
    public static readonly CONTROLLER_CALL_VALIDATE_SERVICE = 'callValidateService';
    public static readonly CONTROLLER_CALLED_AFTER_CHANGE = 'calledAfterChange';
    public static readonly CONTROLLER_SCREEN_DISPLAY_VO = 'screenDisplayVO';
    public static readonly CONTROLLER_ERROR_MSGS = 'errorMsgs';
    public static readonly CONTROLLER_PREVENT_CHANGE_EVENT = 'preventChangeEvent';
    public static readonly CONTROLLER_INNER_VALUE = 'innerValue';
    public static readonly CONTROLLER_CHILD_COMPONENTS = 'childComponents';
    // end Richie

    public static readonly HREFRESTRICTVALUE = 'javascript:;';
    public static readonly BIOMETRIC_AUTH_SUCCESS = 'Success';
    public static readonly BIOMETRIC_AUTH_SUCCESS_ANDROID = 'biometric_success';
    public static readonly BIOMETRIC_AUTH_FAIL = 'fail';
    public static readonly BIOMETRIC_AUTH_ERROR = 'error';
    public static readonly BIOMETRIC_AUTH_UNAVAILABLE = 'unavailable';


    public static readonly LAST_ACTIVE_STEP = 'lastActiveStep';
    public static readonly TODO_LIST_STEP_VALIDATION_DELAY = 5000;
    public static readonly MIME_TYPES =
        {
            '.aac': 'audio/aac',
            '.abw': 'application/x-abiword',
            '.arc': 'application/x-freearc',
            '.avi': 'video/x-msvideo',
            '.azw': 'application/vnd.amazon.ebook',
            '.bin': 'application/octet-stream',
            '.bmp': 'image/bmp',
            '.bz': 'application/x-bzip',
            '.bz2': 'application/x-bzip2',
            '.csh': 'application/x-csh',
            '.css': 'text/css',
            '.csv': 'text/csv',
            '.doc': 'application/msword',
            '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            '.eot': 'application/vnd.ms-fontobject',
            '.epub': 'application/epub+zip',
            '.gif': 'image/gif',
            '.html': 'text/html',
            '.ico': 'image/vnd.microsoft.icon',
            '.ics': 'text/calendar',
            '.jar': 'application/java-archive',
            '.jpeg': 'image/jpeg',
            '.jpg': 'image/jpeg',
            '.js': 'text/javascript',
            '.json': 'application/json',
            '.jsonld': 'application/ld+json',
            '.midi': 'audio/midi audio/x-midi',
            '.mjs': 'text/javascript',
            '.mp3': 'audio/mpeg',
            '.mpeg': 'video/mpeg',
            '.mpkg': 'application/vnd.apple.installer+xml',
            '.odp': 'application/vnd.oasis.opendocument.presentation',
            '.ods': 'application/vnd.oasis.opendocument.spreadsheet',
            '.odt': 'application/vnd.oasis.opendocument.text',
            '.oga': 'audio/ogg',
            '.ogv': 'video/ogg',
            '.ogx': 'application/ogg',
            '.otf': 'font/otf',
            '.png': 'image/png',
            '.pdf': 'application/pdf',
            '.ppt': 'application/vnd.ms-powerpoint',
            '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            '.rar': 'application/x-rar-compressed',
            '.rtf': 'application/rtf',
            '.sh': 'application/x-sh',
            '.svg': 'image/svg+xml',
            '.swf': 'application/x-shockwave-flash',
            '.tar': 'application/x-tar',
            '.tiff': 'image/tiff',
            '.ttf': 'font/ttf',
            '.txt': 'text/plain',
            '.vsd': 'application/vnd.visio',
            '.wav': 'audio/wav',
            '.weba': 'audio/webm',
            '.webm': 'video/webm',
            '.webp': 'image/webp',
            '.woff': 'font/woff',
            '.woff2': 'font/woff2',
            '.xhtml': 'application/xhtml+xml',
            '.xls': 'application/vnd.ms-excel',
            '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            '.xml': 'application/xml',
            '.xul': 'application/vnd.mozilla.xul+xml',
            '.zip': 'application/zip',
            '.3gp': 'video/3gpp',
            '.3g2': 'video/3gpp2',
            '.7z': 'application/x-7z-compressed'
        };
    public static readonly userID = 'userID';
    public static readonly errorMessage = 'Fatal_Error_Key';
    public static readonly USERINFO = 'USERINFO';
    public static readonly WORKINGCIF = 'WORKINGCIF';

    // ps-dropdown-account-types
    public static readonly FacilityType = 'F';
    public static readonly GeneralType = 'G';
    public static readonly ACC_TYPE_T = 'T';
    public static readonly ACC_TYPE_D = 'D';
    public static readonly AllowedGeneralAccountTypes = 'AllowedAccountType';
    public static readonly AllowedFixedMaturityAccountsTypes = 'AllowedAccountType';
    public static readonly AccountOpeningBranch = 'AccountOpeningBranch';
    public static readonly cifBranch = 'C';
    public static readonly userInput = 'U';
    // ps-label-cif-branch
    public static readonly CIF_INFORMATION = 'cifInformation';
    // Authentication Matrix
    public static readonly VERIFY_TYPE_SMS_OTP = 'SMSOTP';
    public static readonly VERIFY_TYPE_EMAIL_OTP = 'EMAILOTP';
    public static readonly USER_STATUS_BLOCKED = 'B';

    public static readonly SMS = 'sms';
    public static readonly EMAIL = 'email';
    public static readonly language = 'EN';
    public static readonly CONVERT_SECONDS_TO_MILLISECONDS = 1000;
    public static readonly CONVERT_MINUTS_TO_MILLISECONDS = 60000;
    public static readonly CONVERT_MONTHS_TO_MILLISECONDS = 2592000; //30*24*3600
    public static readonly CONVERT_DAYS_TO_MILLISECONDS = 86400;
    public static readonly OC_USER_ID = 'ocUserId';
    public static readonly VERIFY_TYPE_SECURITY_QUESTION = 'VerifySecurityQuestion';
    // Qibla Direction
    public static readonly qiblaLocation = { longitude: 39.826206, latitude: 21.422487 };


    public static readonly POSTION_ROW = 'row';
    public static readonly POSTION_ROW_REVERSE = 'row-reverse';
    public static readonly POSTION_COLUMN = 'column';
    public static readonly POSTION_COLUMN_REVERSE = 'column-reverse';
    public static readonly MOBILE_MENU = 'm1';

    // public static readonly PARAMS = 'PARAMS';
    public static readonly PRE_LOGIN_PARAMS = 'PRE_LOGIN_PARAMS';

    public static readonly CUSTOMIZATION_BY_TYPE = 'customizationByType';
    public static readonly CUSTOMIZATION_BY_NAME = 'customizationByName';
    public static readonly EMPTY_BIGDECIMAL_VALUE = -9999999;

    public static ACCOUNT_DEACTIVATION_OTHER_REASON = 'other';
    public static readonly AUTO_LOGIN = 'autoLogin';
    // Account opening
    public static readonly AccountOpeningPage_OPER_ID = 27;
    public static readonly AccountOpeningFixedMaturityAccountPage_OPER_ID = 1563;
    public static readonly ONE = '1';
    // Debit card request
    public static readonly CARDTYPE_D = '\'D\'';
    // Credit card request
    public static readonly CARDTYPE_C = '\'C\'';

    public static readonly MARITAL_STATUS_LOV_TYPE_ID = 36;
    public static readonly CATEG = 'M';
    public static readonly EXCHANGE_RATE_OPER = 30;
    public static readonly HASH_INPUT = '#';
    public static readonly REMIND_BEFORE = 5;
    public static readonly ENABLE_BIOMETRICS_PARAM = 'enableBiometrics';
    public static readonly SESSION_TIMEOUT_ALERT = 'timeoutNotification';
    public static readonly LOGIN_OPER_ID = 1544;
    public static readonly LOGIN_PAGE_NAME = 'login_key';
    public static readonly LANDING_OPER_ID = -1;
    public static readonly preLoginResponse = 'preLoginResponse';
    public static readonly keyPair = 'keyPair';
    public static readonly CANCEL_CLICKED = 'true';
    public static readonly REPORT_TYPE = '1';
    public static readonly EXPORT_REPORT_TYPE = '2';
    public static readonly selectorCriteria = 'psFcName';
    public static readonly NOTIFICATION_OPER_ID = 102;
    public static readonly TRANSLATION_KEYS = 'TRANSLATION_KEYS';
    public static readonly BUSINESS_PROFILE_MAP = 'BUSINESSPROFILEMAP';
    public static readonly PLUS_SIGN = '+';
    public static readonly CUSTOM_ERROR_KEY = 'customErrorKey';
    public static readonly DEFAULT_MANDATORY = 1;
    public static readonly DEFAULT_READONLY = 0;
    public static readonly DEFAULT_VISIBLE = 1;
    public static readonly FORM_READONLY = 'formReadonly';
    public static readonly FCM_REQUEST_PERM_MAX_COUNTER = 5;
    public static FCM_TOKEN = null;

    public static readonly STEPPER_CANCEL_DEFAULT_ID = '_cancel_btn';
    public static readonly STEPPER_NEXT_DEFAULT_ID = '_next_btn';
    public static readonly STEPPER_PREVIOUS_DEFAULT_ID = '_previous_btn';
    public static readonly STEPPER_SAVE_DEFAULT_ID = '_save_btn';
    public static readonly STEPPER_SUBMIT_DEFAULT_ID = '_submit_btn';
    public static readonly GOOGLE_MAPS_WEB_SCRIPT_ID = 'ps-google-maps';

    public static readonly PROFILE_OPER_ID = 767;
    public static readonly MATURITY_UPDATE_OPER_ID = 1574;

    public static readonly ACTION_TYPE_DELETE = 'delete';
    public static readonly ACTION_TYPE_SUBMIT = 'submit';
    public static readonly ACTION_TYPE_EDIT = 'edit';
    public static readonly ACTION_TYPE_SAVE = 'save';
    public static readonly ACTION_TYPE_UPDTAE = 'update';
    public static readonly OUT_PUT_TYPE_SUCCESS = 'S';

    public static readonly ACTION_REASON_INPUT = 'input';
    public static readonly ACTION_REASON_WARNING = 'prompt';

    public static readonly LANGUAGES_LOV_TYPE_ID = 412;
    public static readonly INTERNAL_TRANSACTION_TYPE = 'internal';
    public static readonly INTERNATIONAL_TRANSACTION_TYPE = 'international';
    public static readonly LOCAL_TRANSACTION_TYPE = 'local';
    public static readonly OWN_TRANSACTION_TYPE = 'own';

    public static readonly EXCHANGE_RATE_OPER_ID = 30;

    public static readonly PREV_DATE_FORMAT = 'YYYY-MM-DD';

    public static readonly AUTH_MATRIX_VERIFY_BUTTON_ID = 'authenticcation_matrix_verify';

    /* Updated by Hisham.Omar TP# 986400 start
     * After changing the way of listening to the report click event from 'JQuery' syntax to 'JS' syntax,
     * then only class name is needed to catch the anchor tag.
    **/
    public static readonly REPORT_CLICK_EVENT_REFERENCE = 'dummy-hyperlink-class';
    /** Updated by Hisham.Omar TP# 986400 end */

    public static readonly SESSION_VARS_TO_BE_READ = {
        sessionVarsToBeFiltered: ['USERINFO', 'preLoginResponse.language', 'preLoginResponse.businessProfilesCO', 'preLoginResponse.companySettingsCO']
    };

    public static readonly AGENT_APPLICATION_APP_ID = 4;
    public static readonly DEFAULT_ALLOWED_IMG_TYPE = ['png', 'gif', 'jpeg', 'jpg'];
}
