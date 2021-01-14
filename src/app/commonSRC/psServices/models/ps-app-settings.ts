import { CommonUtils } from './common-utils';

interface ASSETS_STRUCTURE {
    ASSETS_URL?: string;
    MAIN_CSS_FILE_NAME?: string;
    IMGS_FOLDER_URL?: string;
    CSS_FOLDER_URL?: string;
    FONTS_URL?: string;
    ICONS_URL?: string;
    HTML_URL?: string;
    FONT_FAMILY?: string;
    SVG_URL?: string;
    BANNERS_FILE_URL?: string;
    UI_CONFIGURATION?: {
        LANDING_UI_TYPE?: number,
        DISPLAY_SLIDER_ON_LOGIN?: boolean,
        MENU_TREE?: boolean,
    };
}

export interface PsApplicationConfiguration {
    MAIN_CONFIG?: {
        MAIN_PATH?: string;
        PACKAGE_NAME?: string;
        COMP_CODE?: number;
        APP_VERSION?: string;
        SERVICE_URL?: string;
        APP_ID?: number;
        LOG_LEVEL_INTERVAL?: number;
        MINIFIED_DEFAULT_CSS_FILE_NAME?: string;
        MINIFIED_CLIENT_CSS_FILE_NAME?: string;
    };
    DEFAULT_ASSETS_CONFIG?: ASSETS_STRUCTURE;
    CLIENT_ASSETS_CONFIG?: ASSETS_STRUCTURE;
    GOOGLE_API_KEYS?: {
        RECAPTCHA_KEY?: string;
        RECAPTCHA_NATIVE_KEY?: string;
        MAP_WEB_API_KEY?: string;
    };
    functions?: {
        __SET(variable?: PsApplicationConfiguration);
        _REFRESH();
    };
}

export let PsApplicationConfiguration: PsApplicationConfiguration = {
    functions: {
        __SET(variable: PsApplicationConfiguration) {
            const set = PsApplicationConfiguration.functions.__SET;
            if (variable) {
                // Object.keys(variable).forEach((key) => {
                //     PsApplicationConfiguration[key] = variable[key];
                // });
                CommonUtils.copyObject(PsApplicationConfiguration, variable);
            }
            PsApplicationConfiguration.functions.__SET = set;
            if (!PsApplicationConfiguration.CLIENT_ASSETS_CONFIG) {
                PsApplicationConfiguration.CLIENT_ASSETS_CONFIG = {};
            }
        },
        _REFRESH() {

        }
    },
    MAIN_CONFIG: {},
    DEFAULT_ASSETS_CONFIG: {},
    CLIENT_ASSETS_CONFIG: {},
    GOOGLE_API_KEYS: {}
};





export let PsApplicationSettings: PsApplicationConfiguration = {
    functions: {
        __SET(variable: PsApplicationConfiguration) {
            const set = PsApplicationSettings.functions.__SET;
            PsApplicationSettings = variable;
            PsApplicationSettings.functions.__SET = set;
        },
        _REFRESH() {
            PsApplicationSettings.MAIN_CONFIG = {
                MAIN_PATH: PsApplicationConfiguration.MAIN_CONFIG.MAIN_PATH,
                APP_VERSION: PsApplicationConfiguration.MAIN_CONFIG.APP_VERSION,
                COMP_CODE: PsApplicationConfiguration.MAIN_CONFIG.COMP_CODE,
                PACKAGE_NAME: PsApplicationConfiguration.MAIN_CONFIG.PACKAGE_NAME,
                SERVICE_URL: PsApplicationConfiguration.MAIN_CONFIG.MAIN_PATH + PsApplicationConfiguration.MAIN_CONFIG.PACKAGE_NAME + '/pathservices/',
                APP_ID: PsApplicationConfiguration.MAIN_CONFIG.APP_ID,
                LOG_LEVEL_INTERVAL: PsApplicationConfiguration.MAIN_CONFIG.LOG_LEVEL_INTERVAL,
                MINIFIED_DEFAULT_CSS_FILE_NAME: PsApplicationConfiguration.MAIN_CONFIG.MINIFIED_DEFAULT_CSS_FILE_NAME,
                MINIFIED_CLIENT_CSS_FILE_NAME: PsApplicationConfiguration.MAIN_CONFIG.MINIFIED_CLIENT_CSS_FILE_NAME,
            };
            PsApplicationSettings.DEFAULT_ASSETS_CONFIG = {
                ASSETS_URL: PsApplicationConfiguration.DEFAULT_ASSETS_CONFIG.ASSETS_URL,
                MAIN_CSS_FILE_NAME: PsApplicationConfiguration.DEFAULT_ASSETS_CONFIG.MAIN_CSS_FILE_NAME,
                IMGS_FOLDER_URL: PsApplicationConfiguration.DEFAULT_ASSETS_CONFIG.ASSETS_URL + PsApplicationConfiguration.DEFAULT_ASSETS_CONFIG.IMGS_FOLDER_URL,
                CSS_FOLDER_URL: PsApplicationConfiguration.DEFAULT_ASSETS_CONFIG.ASSETS_URL + PsApplicationConfiguration.DEFAULT_ASSETS_CONFIG.CSS_FOLDER_URL,
                SVG_URL: PsApplicationConfiguration.DEFAULT_ASSETS_CONFIG.ASSETS_URL + PsApplicationConfiguration.DEFAULT_ASSETS_CONFIG.SVG_URL,
                FONTS_URL: PsApplicationConfiguration.DEFAULT_ASSETS_CONFIG.ASSETS_URL + PsApplicationConfiguration.DEFAULT_ASSETS_CONFIG.FONTS_URL,
                ICONS_URL: PsApplicationConfiguration.DEFAULT_ASSETS_CONFIG.ASSETS_URL + PsApplicationConfiguration.DEFAULT_ASSETS_CONFIG.ICONS_URL,
                HTML_URL: PsApplicationConfiguration.DEFAULT_ASSETS_CONFIG.HTML_URL,
                FONT_FAMILY: PsApplicationConfiguration.DEFAULT_ASSETS_CONFIG.ASSETS_URL + PsApplicationConfiguration.DEFAULT_ASSETS_CONFIG.FONTS_URL + PsApplicationConfiguration.DEFAULT_ASSETS_CONFIG.FONT_FAMILY,
                UI_CONFIGURATION: PsApplicationConfiguration.DEFAULT_ASSETS_CONFIG.UI_CONFIGURATION,
                BANNERS_FILE_URL: PsApplicationConfiguration.DEFAULT_ASSETS_CONFIG.BANNERS_FILE_URL
            };
            // initi PsApplicationConfiguration.CLIENT_ASSETS_CONFIG if not initialized
            if (PsApplicationConfiguration.CLIENT_ASSETS_CONFIG == null) {
                PsApplicationConfiguration.CLIENT_ASSETS_CONFIG = {};
            }

            PsApplicationSettings.CLIENT_ASSETS_CONFIG = {
                ASSETS_URL: PsApplicationConfiguration.CLIENT_ASSETS_CONFIG.ASSETS_URL,
                MAIN_CSS_FILE_NAME: PsApplicationConfiguration.CLIENT_ASSETS_CONFIG.MAIN_CSS_FILE_NAME,
                IMGS_FOLDER_URL: PsApplicationConfiguration.CLIENT_ASSETS_CONFIG.ASSETS_URL + PsApplicationConfiguration.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL,
                CSS_FOLDER_URL: PsApplicationConfiguration.CLIENT_ASSETS_CONFIG.ASSETS_URL + PsApplicationConfiguration.CLIENT_ASSETS_CONFIG.CSS_FOLDER_URL,
                SVG_URL: PsApplicationConfiguration.CLIENT_ASSETS_CONFIG.ASSETS_URL + PsApplicationConfiguration.CLIENT_ASSETS_CONFIG.SVG_URL,
                FONTS_URL: PsApplicationConfiguration.CLIENT_ASSETS_CONFIG.ASSETS_URL + PsApplicationConfiguration.CLIENT_ASSETS_CONFIG.FONTS_URL,
                ICONS_URL: PsApplicationConfiguration.CLIENT_ASSETS_CONFIG.ASSETS_URL + PsApplicationConfiguration.CLIENT_ASSETS_CONFIG.ICONS_URL,
                HTML_URL: PsApplicationConfiguration.CLIENT_ASSETS_CONFIG.HTML_URL,
                FONT_FAMILY: PsApplicationConfiguration.CLIENT_ASSETS_CONFIG.ASSETS_URL + PsApplicationConfiguration.CLIENT_ASSETS_CONFIG.FONTS_URL + PsApplicationConfiguration.CLIENT_ASSETS_CONFIG.FONT_FAMILY,
                UI_CONFIGURATION: PsApplicationConfiguration.CLIENT_ASSETS_CONFIG.UI_CONFIGURATION,
                BANNERS_FILE_URL: PsApplicationConfiguration.CLIENT_ASSETS_CONFIG.BANNERS_FILE_URL
            };

            // Any undefined config should revert to default settings
            Object.keys(PsApplicationSettings.DEFAULT_ASSETS_CONFIG).forEach((key) => {
                if (!PsApplicationSettings.CLIENT_ASSETS_CONFIG[key]) {
                    PsApplicationSettings.CLIENT_ASSETS_CONFIG[key] = PsApplicationSettings.DEFAULT_ASSETS_CONFIG[key];
                }
            });
            PsApplicationSettings.GOOGLE_API_KEYS = {
                RECAPTCHA_KEY: PsApplicationConfiguration.GOOGLE_API_KEYS.RECAPTCHA_KEY,
                RECAPTCHA_NATIVE_KEY: PsApplicationConfiguration.GOOGLE_API_KEYS.RECAPTCHA_NATIVE_KEY,
                MAP_WEB_API_KEY: PsApplicationConfiguration.GOOGLE_API_KEYS.MAP_WEB_API_KEY
            };
        },
    },
    MAIN_CONFIG: {},
    DEFAULT_ASSETS_CONFIG: {},
    CLIENT_ASSETS_CONFIG: {},
    GOOGLE_API_KEYS: {},
};
