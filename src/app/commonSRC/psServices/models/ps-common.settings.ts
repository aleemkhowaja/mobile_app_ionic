import { Injector } from '@angular/core';
import { IUserIpInfo } from './ps-common-interface';


export interface IServiceUrl {
  authenticate: string;
  reportDetails: string;
  saveOperCustomization: string;
  resetOperCustomization: string;
  returnElmCustomization: string;
  returnTranslationKeys: string;
  returnNotificationUnreadCount: string;
  returnNotifications: string;
  returnVersionDetails: string;
  notificationDeviceToken: string;
  commonSubmitAction: string;
  updateSubmitData: string;
  executeExpression: string;
  returnKeyLabels: string;
  SubmitOutsideAction: string;
  customizationCommonServiceEndPoint: string;
}

export interface IPsCommonSettings {
  custMode: boolean;
  missingTranslations: string[];
  activeLanguge: string;
  submitAfterSave: boolean;
  savedraft: boolean;
  savedraftParam: object;
  deviceLocalIp: string;
  devicePublicIp: string;
  userIpInfo: IUserIpInfo;
  ENCRYPT_PARAMS: string;
  availableLanguage: any;
  oper_ID: number;
  pageName: string;
  isRtl: boolean;
  APP_ID: number;
  CHNL_ID: number;
  COMP_CODE: number;
  APP_CHNL_ID: number;
  appVersionCode: string | number;
  appVersionNumber: string;// major.minor.extension.store.live.assets
  latestAppVerNb: string; // major.minor.extension.store.live.assets
  mandatoryUpdate: string; // 0/1
  PS_LABEL_INPUT_POSITION: 'fixed' | 'floating' | 'stacked';
  psSelectDropdownInterface: 'popover' | 'action-sheet' | 'alert';
  DECIMAL_SEPARATOR: string;
  THOUSANDS_SEPARATOR: string;
  loadAssetsFromService: boolean;
  serviceUrl: IServiceUrl;
  injector?: Injector;
  MAP_MARKER_ANIMATION: string;
  MAP_TYPE_BRANCH_IMG: string;
  MAP_TYPE_ATM_IMG: string;
  MAP_TYPE_CDM_IMG: string;
  MAP_TYPE_LOCATION_IMG: string;
  MAP_TYPE_BRANCH_COLOR: string;
  MAP_TYPE_ATM_COLOR: string;
  MAP_TYPE_CDM_COLOR: string;
  GOOGLE_MAP_API_KEY: string;
  GOOGLE_MAP_CAMERA_DURATION: number;
  GOOGLE_MAP_CAMERA_ZOOM: number;
  GOOGLE_MAP_CAMERA_TILT: number;
  GOOGLE_MAP_CAMERA_BEARING: number;
  GOOGLE_MAP_DIRECTION_COLOR: string;
  QUALITY: number;
  DESTINATION_TYPE: string;
  ENCODING_TYPE: string;
  enableEmptyOpt: boolean;

  isRedemption: boolean;
  isRedemptionOccurring: boolean;
  forceSocial: boolean;
  timeoutNotification: number;
  sessionTimeoutInterval: number,
  showDropdownIcon: boolean;
  showDefaultTemplateOption: boolean;

  requestTimeOut: number;
  showInitialCardValues: number;

  PRAYER_NOTIFIC_STATUE: string;
  isLoggedIn: boolean;
  browserIsRefreshed: boolean;
  PROFILE_IMAGE_MAX_SIZE: number;
  PROFILE_IMAGE_TARGET_WIDTH: number;
  PROFILE_IMAGE_TARGET_HEIGTH: number;
  PDF_CONTENT_TYPE: string;
  menuIsTreeView: boolean;
  Excel_CONTENT_TYPE: string;
  GOOGLE_MAP_CAMERA_ZOOM_USER_POSITION: number;
  GOOGLE_MAP_CAMERA_MIN_ZOOM: number;
  COORDS_LONGITUDE_KEY: string;
  COORDS_LATITUDE_KEY: string;
  COORDS_TIMESTAMP_KEY: string;
  LK_COMPANY_ISO: string;
  functions?: {
    __SET(variable: IPsCommonSettings);
    _REFRESH();
  };
}
export let PsCommonSettings: IPsCommonSettings = {
  functions: {
    __SET(variable: IPsCommonSettings) {
      const set = PsCommonSettings.functions.__SET;
      PsCommonSettings = variable;
      PsCommonSettings.functions.__SET = set;
    },
    _REFRESH() {
      PsCommonSettings.MAP_TYPE_BRANCH_IMG = 'pin-branch.svg';
      PsCommonSettings.MAP_TYPE_ATM_IMG = 'pin-atm.svg';
      PsCommonSettings.MAP_TYPE_CDM_IMG = 'pin-cdm.svg';
      PsCommonSettings.MAP_TYPE_LOCATION_IMG = 'pin-my-location.svg';
    },
  },
  custMode: false,
  missingTranslations: null,
  activeLanguge: 'EN',
  submitAfterSave: false,
  savedraft: false,
  savedraftParam: {},
  deviceLocalIp: '',
  devicePublicIp: '',
  userIpInfo: null,
  ENCRYPT_PARAMS: 'ENCRYPT_PARAMS',
  availableLanguage: null,
  oper_ID: null,
  isRtl: false,
  APP_ID: 1,
  CHNL_ID: 1,
  COMP_CODE: 1,
  APP_CHNL_ID: 1,
  appVersionCode: null,
  appVersionNumber: null,
  latestAppVerNb: '3.1.1.0.0.0',
  mandatoryUpdate: '0',
  PS_LABEL_INPUT_POSITION: 'stacked',
  psSelectDropdownInterface: 'action-sheet',
  DECIMAL_SEPARATOR: '.',
  THOUSANDS_SEPARATOR: ',',
  loadAssetsFromService: false,
  MAP_MARKER_ANIMATION: 'DROP',   // DROP OR BOUNCE
  MAP_TYPE_BRANCH_IMG: 'pin-branch.svg',
  MAP_TYPE_ATM_IMG: 'pin-atm.svg',
  MAP_TYPE_CDM_IMG: 'pin-cdm.svg',
  MAP_TYPE_LOCATION_IMG: 'pin-my-location.svg',
  MAP_TYPE_BRANCH_COLOR: '#61627f',
  MAP_TYPE_ATM_COLOR: '#243f84',
  MAP_TYPE_CDM_COLOR: '#6c74b5',
  GOOGLE_MAP_API_KEY: 'AIzaSyBaTVlHDndpSgbdDnRsCy2xFJt2tB41NB0',
  GOOGLE_MAP_CAMERA_DURATION: 2000,
  GOOGLE_MAP_CAMERA_ZOOM: 15,
  GOOGLE_MAP_CAMERA_TILT: 10,
  GOOGLE_MAP_CAMERA_BEARING: 30,
  GOOGLE_MAP_DIRECTION_COLOR: 'red',
  QUALITY: 50,
  DESTINATION_TYPE: '',
  ENCODING_TYPE: '',
  enableEmptyOpt: true,
  pageName: null,
  isRedemption: false,
  isRedemptionOccurring: false,
  forceSocial: false,
  timeoutNotification: null,
  sessionTimeoutInterval: 1000,
  PROFILE_IMAGE_MAX_SIZE: 1024,
  PROFILE_IMAGE_TARGET_WIDTH: 400,
  PROFILE_IMAGE_TARGET_HEIGTH: 300,
  GOOGLE_MAP_CAMERA_ZOOM_USER_POSITION: 15,
  GOOGLE_MAP_CAMERA_MIN_ZOOM: 2,
  serviceUrl: {
    authenticate: 'rest/omniCommon/authenticateUser',
    reportDetails: 'rest/omniCommonPull/returnReportDetails',
    saveOperCustomization: 'rest/omniCommonPush/saveOperCustomization',
    resetOperCustomization: 'rest/omniCommonPush/resetOperCustomization',
    returnElmCustomization: 'rest/omniCommonPull/returnElmCustomization',
    returnTranslationKeys: 'rest/omniCommonPull/returnTranslationKeys',
    commonSubmitAction: 'rest/omniCommonPush/submitAction',
    returnNotificationUnreadCount: 'rest/omniCommonPull/returnUnReadNotificationCount/',
    returnNotifications: 'rest/omniCommonPull/returnNotificationList/',
    notificationDeviceToken: 'rest/omniCommonPush/createNotificationDeviceToken/',
    returnVersionDetails: 'rest/omniCommonPull/returnVersionDetails/',

    updateSubmitData: 'rest/omniCommonPush/submitAction',
    executeExpression: 'rest/omniCommonPull/executeExpression',
    returnKeyLabels: 'rest/omniCommonPull/returnAutoCompKeyLabel',
    SubmitOutsideAction: 'rest/omniCommonPush/submitActionOutside',
    customizationCommonServiceEndPoint: 'rest/omniCommon/executePWSService'
  },

  showDropdownIcon: true,
  showDefaultTemplateOption: false,
  requestTimeOut: 20000,
  showInitialCardValues: 3,
  PRAYER_NOTIFIC_STATUE: 'PRAYER_NOTIFIC_STATUE',
  isLoggedIn: false,
  browserIsRefreshed: false,
  PDF_CONTENT_TYPE: 'application/pdf',
  Excel_CONTENT_TYPE: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  menuIsTreeView: null,
  COORDS_LONGITUDE_KEY: 'COORDS_LONGITUDE_KEY',
  COORDS_LATITUDE_KEY: 'COORDS_LATITUDE_KEY',
  COORDS_TIMESTAMP_KEY: 'COORDS_TIMESTAMP_KEY',
  LK_COMPANY_ISO: 'LK',
};


export enum EncodingType {
  JPEG = 0,
  PNG = 1
}
export enum DestinationType {
  DATA_URL = 0,
  FILE_URL = 1,
  NATIVE_URI = 2
}
export enum MediaType {
  PICTURE = 0,
  VIDEO = 1,
  ALLMEDIA = 2
}
export enum PictureSourceType {
  PHOTOLIBRARY = 0,
  CAMERA = 1,
  SAVEDPHOTOALBUM = 2
}
