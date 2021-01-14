import { HttpResponse } from '@angular/common/http';
import { Routes } from '@angular/router';
import * as mockData from 'customization_src/mock-data/mockData.json';
import { of } from 'rxjs';
import { HybridKeyService } from 'src/app/commonSRC/psServices/hybridkey/hybridkey.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';
import { ICustUrlParams, IPageCommon } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsApplicationConfiguration } from '../../../../../../src/app/commonSRC/psServices/models/ps-app-settings';


export const EXTENDED_ROUTES: Routes = [];

/**
 * @author RichardZourob
 * common functions used for customization special handling in the common code
 */
export class CommonCustUtils {
    static custUrlParams: ICustUrlParams;
    static reqBody: any;

    constructor(/** no object should be injected here this a global classs and should not depend on any obejct from angular injector */) {
        throw new Error('Error: Instantiation failed: Use CommonUtils.methodName(...) instead of new.');
    }

    public static returnCustUrlParams(): ICustUrlParams {
        return this.custUrlParams;
    }
    public static putCustUrlParams(params: ICustUrlParams) {
        this.custUrlParams = params;
    }
    public static returnReqBody(): any {
        return this.reqBody;
    }
    public static putReqBody(body: any) {
        this.reqBody = body;
    }

    public static returnChnlID(): number {
        return this.returnCustUrlParams().chnlId;
    }
    public static returnAppID(): number {
        return this.returnCustUrlParams().appId;
    }
    public static returnOperID(): number {
        return this.returnCustUrlParams().operId;
    }
    public static returnCompCode(): number {
        return PsApplicationSettings.MAIN_CONFIG.COMP_CODE;
    }

    public static custAppInitialize() {
        const hybridkey: HybridKeyService = CommonUtils.injectionHandler(HybridKeyService);
        if (document.URL.indexOf('?pathParams=') > 0) {
            this.custUrlParams = {};
            const splitURL = document.URL.split('?pathParams=');
            // const splitParams = decodeURIComponent(splitURL[1]).split('&');
            // splitParams.forEach(element => {
            //     const singleURLParam = element.split('=');
            //     const paramName = singleURLParam[0];
            //     const paramValue = singleURLParam[1];
            //     this.custUrlParams[paramName] = paramValue;
            // });

            const decryptedPathParam = hybridkey.decryptTransportMessage(splitURL[1]);
            this.custUrlParams = JSON.parse(decryptedPathParam);
        }
        PsCommonSettings.custMode = true;
        if (this.custUrlParams.chnlId) {
            PsCommonSettings.CHNL_ID = this.custUrlParams.chnlId;
        }
        //const session:  SessionService = CommonUtils.injectionHandler(SessionService);
        const commonService: PsCommonService = CommonUtils.injectionHandler(PsCommonService);
        PsCommonSettings.isLoggedIn = false;
        PsCommonSettings.oper_ID = null;
        PsCommonSettings.pageName = null;
        commonService.session.remove(ConstantCommon.SESSION_ID);
        commonService.session.remove(ConstantCommon.USER_IS_LOGGED_IN);
        commonService.session.remove(ConstantCommon.SERVER_LOGIN_TOKEN);
        commonService.session.remove(ConstantCommon.SERVER_AUTH_TOKEN);
        commonService.session.remove(ConstantCommon.USER_FORCE_LOGOUT);
        // session.append(ConstantCommon.USER_IS_LOGGED_IN, false);
    }

    public static adjustPreLoginParams(prelogInParam) {
        prelogInParam.autoLoginUser = this.returnCustUrlParams().userName;
        prelogInParam.autoLoginPwd = this.returnCustUrlParams().userPwd;
    }

    public static async preLoginReponseHandler(preLoginResponse) {
        const navService: PsNavigatorService = CommonUtils.injectionHandler(PsNavigatorService);
        const commonService: PsCommonService = CommonUtils.injectionHandler(PsCommonService);
        // set all the needed properties to mark the user as logged in
        commonService.session.append(ConstantCommon.USER_IS_LOGGED_IN, true);
        PsCommonSettings.isLoggedIn = true;
        const loginResponse = mockData.loginResponse;
        loginResponse.serverLoginToken = preLoginResponse.serverLoginToken;
        loginResponse.serverPublicKey = preLoginResponse.publicKey;
        loginResponse.sessionId = preLoginResponse.sessionId;
        loginResponse.omniUserVO.NAME = this.returnCustUrlParams().userName;
        commonService.session.append(ConstantCommon.USERINFO, loginResponse);
        if (preLoginResponse.hasOwnProperty(ConstantCommon.SERVER_LOGIN_TOKEN)
            && preLoginResponse[ConstantCommon.SERVER_LOGIN_TOKEN] != null
            && preLoginResponse[ConstantCommon.SERVER_LOGIN_TOKEN] !== '') {
            commonService.session.append(ConstantCommon.SERVER_LOGIN_TOKEN, preLoginResponse[ConstantCommon.SERVER_LOGIN_TOKEN]);
        }
        commonService.session.append(ConstantCommon.SESSION_ID, loginResponse[ConstantCommon.SESSION_ID]);
        if (loginResponse && loginResponse.businessProfiles && loginResponse.businessProfiles.length > 0) {
            const businessProfileMap = [];
            loginResponse.businessProfiles.forEach(row => {
                const busProfile = row.operVO;
                commonService.copyObject(busProfile, row.businessProfileOperVO, false, false);
                commonService.copyObject(busProfile, row.operAppChnlVO, false, false);
                businessProfileMap.push(busProfile);
            });
            commonService.session.append(ConstantCommon.BUSINESS_PROFILE_MAP, businessProfileMap);
        }

        // load customization css
        const cssUrl = PsApplicationConfiguration.DEFAULT_ASSETS_CONFIG.ASSETS_URL + 'css/ps-customization-ui.css';
        CommonUtils.loadCssIfNot(cssUrl, 'ps-customization-ui.css');

        const page: IPageCommon = {
            title: this.returnCustUrlParams().pageName,
            component: this.returnCustUrlParams().pageHref,
            icon: this.returnCustUrlParams().pageIconName,
            param: this.returnCustUrlParams().pageParam,
            operID: this.returnCustUrlParams().operId
        };
        PsCommonSettings.oper_ID = page.operID;
        PsCommonSettings.pageName = page.title;

        const params = {
            operId: PsCommonSettings.oper_ID,
            appId: PsCommonSettings.APP_ID,
            channelId: PsCommonSettings.CHNL_ID,
            compCode: PsCommonSettings.COMP_CODE,
            calledFrom: 'C' // called from customization to get the current list of customization for the screen based on the app/chnl selected directly and not the global in case current doesnot exist.
        };

        commonService.applyPageCustomization('C').catch((err) => commonService.logger.error(err));
        commonService.activePage.next(page);
        navService.navigateToMain(this.returnCustUrlParams().pageHref, { queryParams: page.param });

    }

    public static returnNavUrl(url) {
        url = this.returnCustUrlParams().pageHref;
    }

    public static returnResponse(res, req) {
        return of(new HttpResponse(
            { status: 200, body: res, url: req.url }
        ));
    }

    public static callMockService(req) {
        const reqTo = req.url.split('/').pop();
        const mockDataObj = mockData['default'];
        const mockedResponse = mockDataObj[reqTo];
        let mockedParamResponse;

        if (mockedResponse) {

            if (mockedResponse.data !== undefined && mockedResponse.data.length !== undefined) {
                mockedResponse.data.forEach((value) => {
                    if (value.params !== undefined) {
                        if (req.body.hasOwnProperty(Object.keys(value.params)[0]) && Object.values(value.params)[0] === req.body[Object.keys(value.params)[0]]) {
                            mockedParamResponse = value;
                        }
                    }
                });
            }
            if (mockedParamResponse !== undefined) {
                const mockLiveDataResponse = {
                    ...this.returnReqBody(),
                    ...mockedParamResponse
                };
                return mockLiveDataResponse;
            } else if (mockedResponse.data) {
                const mockLiveDataResponse = {
                    ...this.returnReqBody(),
                    ...mockedResponse.data
                };
                return mockLiveDataResponse;
            } else if (mockedResponse.gridModel !== undefined) {
                const mockLiveDataResponse = {
                    ...this.returnReqBody(),
                    ...mockedResponse
                };
                return mockLiveDataResponse;
            } else {
                return null;
            }
        }
    }

    public static submitBtnCallServer() {
        const commonService: PsCommonService = CommonUtils.injectionHandler(PsCommonService);
        commonService.presentAlert(commonService.translate('warning_key'), commonService.translate('cust_mode_submit_request_not_allowed_key'), [commonService.translate('ok_key')]);
    }

    public static getDefaultIndicatorType(): {} {
        return { displayDefaultIndicatorType: false };
    }

    public static getStepperIconName() {
        return 'build';
    }

    public static getAllVariablesNamesFromSession(): string[] {
        const commonService: PsCommonService = CommonUtils.injectionHandler(PsCommonService);
        const sessionParamList = commonService.session.getListOfSessionVarilables();
        if (sessionParamList.length > 0) {
            return sessionParamList;
        } else {
            return [];
        }
    }
}
