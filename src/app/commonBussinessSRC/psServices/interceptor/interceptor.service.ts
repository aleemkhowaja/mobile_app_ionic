/**
 * @author khaledaltimany
 * all request made from the application will be intercepted here and then
 * the header will be updated as necesary to includxe token or any other things
 */
import { HttpErrorResponse, HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CommonCustUtils } from 'src/app/commonSRC/customization/psServices/util/common-cust-utils';
import { PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsRequestCacheService } from 'src/app/commonSRC/psServices/ps-request-cache/ps-request-cache.service';
import { CheckAppService } from '../../../commonSRC/psServices/checkApp/checkApp.service';
import { HybridKeyService } from '../../../commonSRC/psServices/hybridkey/hybridkey.service';
import { ConstantCommon } from '../../../commonSRC/psServices/models/common-constant';
import { CommonUtils } from '../../../commonSRC/psServices/models/common-utils';
import { IKeyGeneratorResult } from '../../../commonSRC/psServices/models/hybridkey-interface';
import { CommonBussinessConstant } from '../models/ps-common-bussiness-constant';
import { OmniCommonService } from '../omni-common/omni-common.service';


/* nabil feghali - OMNI common security  */
@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {


    constructor(private omniCommonService: OmniCommonService, private hybridkey: HybridKeyService, private cache: PsRequestCacheService, private checkAppService: CheckAppService) { }


    addToken(req: HttpRequest<any>): HttpRequest<any> {
        const USER_IS_LOGGED_IN = PsCommonSettings.isLoggedIn;
        const udid = this.omniCommonService.common.session.getValueOf(ConstantCommon.UUID);
        req.body.udid = udid; /* nabil feghali - OMNI common security  */
        const sessionId = this.omniCommonService.common.session.getValueOf('sessionId');
        const agentAllowedCifNo = this.omniCommonService.common.session.getValueOf('agentAllowedCifNo');
        const listAllAllowedCifs = this.omniCommonService.common.session.getValueOf(ConstantCommon.listAllowedCifsAsString);
        const compCode = this.omniCommonService.returnCompCode();
        const channelId = this.omniCommonService.returnChnlID();
        const sessionAppId = this.omniCommonService.common.session.getValueOf(ConstantCommon.APP_ID);
        const appId = sessionAppId ? sessionAppId : this.omniCommonService.returnAppID();
        const userInfo = this.omniCommonService.common.session.getValueOf(ConstantCommon.USERINFO);
        const ocUserId = userInfo ? userInfo.ocUserId : null;
        let storedUserName = this.omniCommonService.common.session.getValueOf(ConstantCommon.USER_NAME);
        const userType = this.omniCommonService.common.session.getValueOf(ConstantCommon.USR_TYPE);
        const appChnlId = this.omniCommonService.returnAppChnlID();
        const type = PsCommonSettings.submitAfterSave ? 'S' : PsCommonSettings.savedraft ? 'D' : 'A';
        const language = String(PsCommonSettings.activeLanguge).toUpperCase();
        const cifBranchCode = this.omniCommonService.common.session.getValueOf(ConstantCommon.CUSTOMER_CIF_BRANCH);
        const appCustomerName = this.omniCommonService.common.session.getValueOf(ConstantCommon.CORPORATE_ID);
        const autoLogin = this.omniCommonService.common.session.getValueOf(ConstantCommon.AUTO_LOGIN);
        const userID = this.omniCommonService.common.session.getValueOf(ConstantCommon.userID);
        const userAgent = this.checkAppService.returnNativeUserAgent();
        let cif;
        let wcif;
        let newBody: any = {};
        let theBody: any = {};
        const SERVER_PUBLIC_KEY = this.omniCommonService.common.session.getValueOf(ConstantCommon.SERVER_PUBLIC_KEY);
        if (userInfo && userInfo.omniUserVO) {
            cif = userInfo.omniUserVO.CIF_NO;
            /* nabil feghali - OMNI common security  */
            if (storedUserName === undefined || storedUserName == null || storedUserName === '') {
                storedUserName = userInfo.omniUserVO.NAME;
            }
        }
        const workingCif = this.omniCommonService.common.session.getValueOf('WORKINGCIF');
        if (workingCif !== undefined) {
            wcif = workingCif;
        } else {
            wcif = cif;
        }
        const enableEcryption = this.omniCommonService.common.session.getValueOf(PsCommonSettings.ENCRYPT_PARAMS);
        newBody = {
            sessionId,
            compCode,
            channelId,
            appId,
            ocUserId,
            appChnlId,
            transferType: type,
            language: language ? language : 'EN',
            userType,
            userCifNo: cif,
            workingCif: wcif,
            localIp: PsCommonSettings.deviceLocalIp,
            publicIp: PsCommonSettings.devicePublicIp,
            userAgent,
            requestTimeout: PsCommonSettings.requestTimeOut,
            userIpInfo: !!PsCommonSettings.userIpInfo ? PsCommonSettings.userIpInfo : null,
            cifBranchCode,
            appCustomerName: appCustomerName ? appCustomerName : null,
            autoLogin: autoLogin ? autoLogin : 0,
            cifName: userInfo && userInfo['customerInfoCO'] ? userInfo['customerInfoCO']['shortName'] : null,
            userID,
            ...req.body,
        };
        this.omniCommonService.common.removeEmpty(newBody);
        // Moved here by Richie for #BUG 934127 in order to have the oper_id sent from prelogin screens as well.
        if (req.body && !req.body.operId) {
            newBody.operId = PsCommonSettings.oper_ID > 0 ? PsCommonSettings.oper_ID : CommonBussinessConstant.DEFAULT_FALLBACK_OPER;
        }
        if (req.body && req.body.userName) {
            newBody.userName = req.body.userName;
        } else {
            newBody.userName = storedUserName;
        }
        if (USER_IS_LOGGED_IN) {
            if (PsCommonSettings.savedraft) {
                if (CommonUtils.isObject(PsCommonSettings.savedraftParam)) {
                    const keys = Object.keys(PsCommonSettings.savedraftParam);
                    if (CommonUtils.isNotEmptyArray(keys)) {
                        newBody = { ...newBody, ...PsCommonSettings.savedraftParam };
                    }
                }
            }
            if (!newBody.agentAllowedCifNo && (agentAllowedCifNo != null && agentAllowedCifNo !== undefined)) {
                newBody = { ...newBody, agentAllowedCifNo };
            }
            if (!newBody.listAllAllowedCifs && (listAllAllowedCifs != null && listAllAllowedCifs !== undefined)) {
                newBody = { ...newBody, listAllAllowedCifs };
            }
            if (this.omniCommonService.isSocialFb()) {
                if (!newBody.appIdentifier) {
                    newBody = {
                        ...newBody,
                        appIdentifier: this.omniCommonService.common.session.getValueOf(ConstantCommon.FACEBOOK_SOCIAL_ID)
                    };
                }
            }
            const currPage = this.omniCommonService.getInfoByOperId(newBody.operId);
            const operType = !!currPage ? currPage.operVO.TYPE_DESC : null;
            newBody.operType = operType;
            // Added here by Richie in order to encrypt all the params (including the default ones added here)
            this.omniCommonService.common.logger.log(`%c request: [${req.url.split('/').pop()}]`, 'background: #F49025; color: #000', newBody);
        } else {
            if (req.url.includes(ConstantCommon.LOGIN_END_POINT)) {
                if (this.omniCommonService.isSocialFb()) {
                    if (!newBody.appIdentifier) {
                        newBody = {
                            ...newBody,
                            appIdentifier: this.omniCommonService.common.session.getValueOf(ConstantCommon.FACEBOOK_SOCIAL_ID)
                        };
                    }
                }
            } else {
                newBody.sessionId = 'PRE_LOGIN';
            }
            this.omniCommonService.common.logger.log(`%c request: [${req.url.split('/').pop()}]`, 'background: #F49025; color: #000', newBody);
        }
        if (enableEcryption) {
            // Added by Richie for #TP 997475: opening omni cust war
            CommonCustUtils.putReqBody(newBody);
            // End Richie
            const result = this.encrypt(newBody);
            theBody = {
                pathParam: result.message,
                fromIonic: 1,
                key: result.key,
                iv: result.iv,
                udid, /* nabil feghali - OMNI common security  */
                appId,
                channelId,
                compCode: this.omniCommonService.returnCompCode(),
                serverPublicKeyToReceive: this.hybridkey.hashcode(SERVER_PUBLIC_KEY),
                userName: storedUserName
            };

            /* nabil feghali - OMNI common security  */

            theBody = this.hybridkey.encryptTransportMessage(theBody);

            const theHeader: any = {
                'Content-Type': 'application/json;charset=utf-8'
            };

            const loginToken = this.omniCommonService.common.session.getValueOf(ConstantCommon.SERVER_LOGIN_TOKEN);
            if (loginToken != null && loginToken !== '') {
                theHeader.loginToken = loginToken;
            }

            const authToken = this.omniCommonService.common.session.getValueOf(ConstantCommon.SERVER_AUTH_TOKEN);
            if (authToken !== undefined && authToken != null) {
                if (req.url.includes(authToken.lastServiceToCall)) {
                    theHeader.authToken = authToken.token;
                    this.omniCommonService.common.session.remove(ConstantCommon.SERVER_AUTH_TOKEN);
                } else {
                    const servicesToCallList = authToken.servicesToCallList;
                    if (servicesToCallList !== undefined && servicesToCallList != null) {
                        for (const serverUrl of servicesToCallList) {
                            if (req.url.includes(serverUrl)) {
                                theHeader.authToken = authToken.token;
                                break;
                            }
                        }
                    }
                }
            }

            /* nabil feghali - OMNI common security - end */

            const R: HttpRequest<any> = req.clone({
                setHeaders: theHeader, body: theBody
            });
            return R;
        } else {
            theBody = newBody;
            const R: HttpRequest<any> = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json;charset=utf-8',
                }, body: theBody
            });
            return R;
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        if (req.url.includes(PsCommonSettings.serviceUrl.returnVersionDetails) || req.url.includes(ConstantCommon.PRE_LOGIN_SERVICE_URL) || req.url.includes('api.aladhan.com') ||
            req.url.includes('ip-api.io') || req.url.includes('assets/') || req.url.includes('ps-config.json') || req.url.includes('ps-default-config.json')) {
            this.omniCommonService.common.logger.log(`%c Request: [${req.url.split('/').pop()}]`, 'background: #42ebf4; color: #000', req);

            /* nabil feghali - OMNI common security  */
            if (req.url.includes(PsCommonSettings.serviceUrl.returnVersionDetails) || req.url.includes(ConstantCommon.PRE_LOGIN_SERVICE_URL)) {
                const newBody = this.hybridkey.encryptTransportMessage(req.body);

                const R = req.clone({
                    setHeaders: {
                        'Content-Type': 'application/json;charset=utf-8',
                    }, body: newBody
                });


                return next.handle(R).pipe(
                    catchError(error => {
                        return this.handleHttpError(error, req, next);
                    })
                );
            } else {/* nabil feghali - OMNI common security - end */
                const cachedResponse = this.cache.get(req);
                if (cachedResponse) {
                    return of(cachedResponse);
                } else {
                    return next.handle(req).pipe(
                        tap(event => {
                            if (event instanceof HttpResponse && req.url.includes('assets/')) {
                                this.cache.put(req, event);
                            }
                        }),
                        catchError(error => {
                            return this.handleHttpError(error, req, next);
                        })
                    );
                }
            }
        } else {
            const R = this.addToken(req);
            this.omniCommonService.common.logger.log(`%c Request: [${R.url.split('/').pop()}]`, 'background: #42ebf4; color: #000', R);

            // Added by Richie for #TP 997475: opening omni cust war
            const mockReq = CommonCustUtils.callMockService(req);
            if (mockReq) {
                return CommonCustUtils.returnResponse(mockReq, req);
            }
            // End Richie

            return next.handle(R).pipe(
                catchError(error => {
                    return this.handleHttpError(error, req, next);
                })
            );
        }

    }

    handleHttpError(error, req, next): Observable<any> {
        this.omniCommonService.common.logger.error('<----- PATH REQUEST ERROR HANDLER ----->', error);
        if (error instanceof HttpErrorResponse) {
            switch ((error as HttpErrorResponse).status) {
                case 500:
                    this.omniCommonService.common.logger.warn('%c [' + String.fromCharCode(9888) + ']' + ' Something Went Wrong On The Server!', 'background: #eeff05; color: #000');
                    return throwError(new HttpErrorResponse(error));
                // return next.handle(req);
                case 400:
                    return this.handle400Error(error);
                case 403:
                    return this.handle403Error(error);
                default:
                    return throwError(new HttpErrorResponse(error));
                // return next.handle(req);

            }
        } else {
            return throwError(new HttpErrorResponse(error));
        }
    }

    handle400Error(error) {
        return throwError(error);
    }

    handle403Error(error) {
        return throwError(new HttpErrorResponse(error));
    }

    /* nabil feghali - OMNI common security  */

    encrypt(message): IKeyGeneratorResult {
        const pKey = this.omniCommonService.common.session.getValueOf(ConstantCommon.SERVER_PUBLIC_KEY);

        let result: IKeyGeneratorResult = {};
        let ocUserId;
        const compCode = PsApplicationSettings.MAIN_CONFIG.COMP_CODE;

        if (message.hasOwnProperty('ocUserId')) {
            ocUserId = this.hybridkey.encryptKey(message.ocUserId, pKey);
        }

        result = this.hybridkey.encryptMessage(message, pKey);

        result.compCode = compCode;
        if (message.hasOwnProperty('ocUserId')) {
            result.ocUserId = parseInt(ocUserId);
        }
        return result;
    }

    /* nabil feghali - OMNI common security - end */

}
