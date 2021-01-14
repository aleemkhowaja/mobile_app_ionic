import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { CommonCustUtils } from 'src/app/commonSRC/customization/psServices/util/common-cust-utils';
import { ErrorHandlerService } from 'src/app/commonSRC/psServices/errorhandler/errorhandler.service';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';
import { IOptionsAlert } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { ConstantCommon } from '../../../commonSRC/psServices/models/common-constant';
import { PsCommonSettings } from '../../../commonSRC/psServices/models/ps-common.settings';
import { PsNavigatorService } from '../../../commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from '../../../commonSRC/psServices/ps-common/ps-common.service';
import { SessionService } from '../../../commonSRC/psServices/session/session.service';
import { IAuthenticationMatrixRequest, IAuthenticationMatrixResponse } from '../../psComponents/ps-complex-components/ps-authentication-matrix/ps-authentication-matrix.component.interface';
import { CommonBussinessConstant } from '../models/ps-common-bussiness-constant';
import { IBusinessProfile, IOmniCommonRequest, IOmniCommonResponse, IPreLoginRequest, IPreLoginResponse, OmniUserResponse } from '../models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from '../models/ps-commonBusiness.settings';


@Injectable({
  providedIn: 'root'
})
export class OmniCommonService {

  constructor(public platform: Platform, public common: PsCommonService, public session: SessionService, public navService: PsNavigatorService, private errorHandlerService: ErrorHandlerService) { }

  appChannelId: Map<string, number> = new Map<string, number>();
  appId: number = PsCommonSettings.APP_ID;

  public returnCompCode(): number {
    return PsApplicationSettings.MAIN_CONFIG.COMP_CODE;
  }

  returnChnlID(): number {
    /**
     *
     *      CHNL_ID				    CHNL_NAME				      DESCRIPTION
     *        0				    	  all_channel_key		    All Channels
     *        1					      ib_key					      Internet Banking
     *        2					      mob_key					      Mobile Banking
     *        3					      facebook_key			    Facebook
     *        4					      twitter_key				    twitter_key
     *      cordova ->	on a device running Cordova.
     *      android	-> on a device running Android.
     *      ios ->	on a device running iOS.
     *      ipad ->	on an iPad device.
     *      iphone ->	on an iPhone device.
     *      desktop ->	on a desktop device.
     *      mobile ->	on a mobile device.
     *      mobileweb -> in a browser on a mobile device.
     *      phablet ->	on a phablet device. <--not needed
     *      tablet ->	on a tablet device. <--not needed
     *      windows ->	on a device running Windows.
     */

    // Added by Richie for #TP 997475: opening omni cust war
    if (PsCommonSettings.custMode) {
      return CommonCustUtils.returnChnlID();
    }
    // End Richie

    const nativeMobile: boolean = this.common.isNativeMobile();
    const mobileWeb: boolean = this.common.platform.is('mobileweb');
    const mobile: boolean = this.common.platform.is('mobile');
    const desktop: boolean = this.common.platform.is('desktop');
    const cordova: boolean = this.common.platform.is('cordova');
    const deviceWithTouchSupport: boolean = ('ontouchstart' in window);


    if (PsCommonSettings.forceSocial) {
      return 3;
    }

    if (this.isRedemption() || this.isRedemptionOccurring()) {
      return 3;
    }


    // gilbert andary, check if app is running inside facebook, twitter or any container
    if (window != window.top) {
      if (CommonBussinessConstant.FACEBOOK_REFERRER_URL == document.referrer) {
        return 3;
      }
    } else {
      // this.logger.log("Main App Is Running Independently");
      if ((cordova && nativeMobile) || (mobile && deviceWithTouchSupport)) { // on native decices
        return 2;
      } else if (desktop || mobileWeb) {// on desktop devices and on mobile devices using browser
        return 1;
      } else {
        this.common.logger.warn('Unkown Device channel set to zero.');
        return 0;
      }
    }
  }

  public isRedemption(): boolean {
    return PsCommonSettings.isRedemption;
    // if (this.common.session.getValueOf(CommonBussinessConstant.isRedemption) && JSON.parse(this.common.session.getValueOf(CommonBussinessConstant.isRedemption))) {
    //   return true;
    // }
    // return false;
  }
  public isRedemptionOccurring(): boolean {
    return PsCommonSettings.isRedemptionOccurring;
    // if (this.common.session.getValueOf(CommonBussinessConstant.isRedemptionOccurring) && JSON.parse(this.common.session.getValueOf(CommonBussinessConstant.isRedemptionOccurring))) {
    //   return true;
    // }
    // return false;
  }

  public setAppId(id: number) {
    this.appId = id;
    PsCommonSettings.APP_ID = id;
  }

  public returnAppID(): number {
    /**
     * 0 : all_application_key\
     * 1 : retail_key
     * 2 : corporate_key
     * 3 : social_media_key
     */
    // if (!AppSettings.USER_IS_LOGGED_IN) {
    //   return 1;
    // }

    // Added by Richie for #TP 997475: opening omni cust war
    if (PsCommonSettings.custMode) {
      const appId = CommonCustUtils.returnAppID();
      this.setAppId(appId);
      return appId;
    }
    // End Richie

    this.setAppId(PsApplicationSettings.MAIN_CONFIG.APP_ID);

    if (this.isRedemption() || this.isRedemptionOccurring()) {
      this.setAppId(3);
      return this.appId;
    }

    if (window != window.top) {
      if (CommonBussinessConstant.FACEBOOK_REFERRER_URL == document.referrer) {
        this.setAppId(3);
      }
    }
    return this.appId;
  }

  public returnAppChnlID(): number {
    return this.appChannelId.get(`${this.returnAppID()},${this.returnChnlID()}`);
  }

  public isSocialFb(): boolean {
    if ((this.returnAppID() === 3) &&
      this.returnChnlID() === 3) {
      return true;
    } else { return false; }
  }

  /**
   * it accept an operID and return IBusinessProfile if user has acces to this operation or null if it doesnt have access
   * @author Khaled Al-Timany
   */
  public getInfoByOperId(operID: string | number): IBusinessProfile {
    const pages = this.common.session.getValueOf(CommonBussinessConstant.BusinessProfile) as Array<IBusinessProfile>;
    if (pages) {
      const activePage = pages.find((p) => {
        return Number(p.operVO.OPER_ID) == Number(operID);
      });
      return activePage;
    }
    return null;
  }

  preLoginService(parameter?: IPreLoginRequest): Promise<IPreLoginResponse> {
    {
      return new Promise<IPreLoginResponse>((resolve, reject) => {
        parameter.apiCode = -1;
        this.common.http.commonRequestAjax('rest/omniCommon/preLoginService', parameter
        ).then
          ((result) => {
            resolve(result.data);
          }).catch((error) => {
            this.common.logger.error(error); reject(error);
          });
      })
    };
  }

  public mapToJson(map: Map<any, any>) {
    let json = JSON.parse(
      JSON.stringify(
        Array.from(map).reduce((out, [key, value]) => {
          out[key] = value;

          return out;
        }, {})
      ));
    return json;
  }

  presentSuccessAlert(message?: string, options?: IOptionsAlert) {
    CommonUtils.presentSuccessAlert(message, options);
  }

  presentFailureAlert(message?: string, options?: IOptionsAlert) {
    CommonUtils.presentFailureAlert(message, options);
  }

  presentFatalAlert(message?: string, options?: IOptionsAlert) {
    CommonUtils.presentFatalAlert(message, options);
  }

  presentInfoAlert(message?: string, options?: IOptionsAlert) {
    CommonUtils.presentInfoAlert(message, options);
  }





  verifyPin(parameter: IAuthenticationMatrixRequest): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      parameter.apiCode = -1;
      this.common.http.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.verifyPin, parameter).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        this.common.logger.error(error);
        reject(error);
      });
    });
  }

  verifyPassword(parameter: IAuthenticationMatrixRequest): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      parameter.apiCode = -1;
      this.common.http.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.verifyPassword, parameter).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        this.common.logger.error(error);
        reject(error);
      });
    });
  }

  verifySecurityQuestion(parameter): Promise<OmniUserResponse> {
    return new Promise<OmniUserResponse>((resolve, reject) => {
      parameter.apiCode = -1;
      this.common.http.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.verifySecurityQuestion, parameter).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        this.common.logger.error(error);
        reject(error);
      });
    });
  }

  generateOTP(parameter: IAuthenticationMatrixRequest): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.common.http.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.OTPGeneration, parameter).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        this.common.logger.log(error);
        reject(error);
      });
    });
  }

  verifyOtp(parameter: IAuthenticationMatrixRequest): Promise<IAuthenticationMatrixResponse> {
    return new Promise<IAuthenticationMatrixResponse>((resolve, reject) => {
      parameter.apiCode = -1;
      this.common.http.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.verifyOtp, parameter).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        this.common.logger.error(error);
        reject(error);
      });
    });
  }

  /**
     logoutType values :
     case 0: Manual Logout 
   case 1: Force Logout
   case 2: Session Timeout Logout  
   case 3: Account Deactivation Logout
   case 4: User Blocked Maximum trials reached Logout
   */
  logout(logoutType: number): Promise<any> {
    /* nabil feghali - OMNI common security */
    return new Promise<any>((resolve, reject) => {
      this.common.presentLoading();
      const userInfo = this.common.session.getValueOf(ConstantCommon.USERINFO);
      const sessionAppId = this.common.session.getValueOf(ConstantCommon.APP_ID);

      const parameter = {
        userName: userInfo ? userInfo.omniUserVO.NAME : null,
        operId: 1559,
        sessionId: this.common.session.getValueOf(ConstantCommon.SESSION_ID),
        compCode: this.returnCompCode(),
        channelId: this.returnChnlID(),
        appId: sessionAppId ? sessionAppId : this.returnAppID(),
        ocUserId: userInfo ? userInfo.ocUserId : null,
        logoutType: logoutType ? logoutType : 0
      };


      this.common.http.commonRequestAjax('rest/omniCommon/logoutUser', parameter
      ).then
        ((result) => {
          this.common.session.append(ConstantCommon.SERVER_PUBLIC_KEY, result.data.serverPublicKey);
          PsCommonSettings.oper_ID = ConstantCommon.LOGIN_OPER_ID;
          this.common.screenDisplayParams.getValue().clear();
          this.common.initialScreenDisplayParams.clear();
          if (PsCommonSettings.custMode) {
            PsCommonSettings.custMode = false;
          }
          this.prepareCommonParameters(result.data.parameters);
          this.navService.navigateToMain(['./omni-login'], { queryParams: { logout: true } }).then(() => {
            document.querySelector('html').classList.remove('userIsLoggedIn');
            document.querySelector('html').classList.add('userIsNotLoggedIn');
            this.navService.isLoggedIn.next(false);
            this.common.clearResponse();
            this.common.session.clearUserSession();

            this.errorHandlerService.resetLogLevelByUser();
            this.common.dismissLoading();
            resolve(true);
          }).catch((err) => {
            this.common.dismissLoading();
            this.common.logger.error(err); reject(err);
          });

        }).catch((error) => {
          this.common.dismissLoading();
          this.common.logger.error(error); reject(error);
        });

    });

    /* nabil feghali - OMNI common security - end  */
  }

  isAgent(): boolean {
    return PsCommonBusinessSettings.isAgent;
  }

  initializeLogin(loginResponse, isRefresh?) {
    if (loginResponse) {
      // Commented by Richie for #TP 997475: opening omni cust war
      // PsCommonSettings.custMode = loginResponse.omniUserVO.USR_TYPE === 'A';
      if (!isRefresh) {
        this.session.append(ConstantCommon.USER_IS_LOGGED_IN, true);

        /* nabil feghali - OMNI common security - key reload  */
        this.session.remove(ConstantCommon.USER_FORCE_LOGOUT);
        this.session.remove(ConstantCommon.SERVER_PUBLIC_KEY);
        this.session.append(ConstantCommon.SERVER_PUBLIC_KEY, loginResponse.serverPublicKey);
        this.session.append(ConstantCommon.SESSION_ID, loginResponse[ConstantCommon.SESSION_ID]);
        /* nabil feghali - OMNI common security - end */

      }
      PsCommonSettings.isLoggedIn = true;
      this.navService.isLoggedIn.next(true);
      document.querySelector('html').classList.add('userIsLoggedIn');
      document.querySelector('html').classList.remove('userIsNotLoggedIn');
      if (loginResponse && (loginResponse['deductChargeRequired'] === true || loginResponse['deductChargeRequired'] === 'true')) {
        this.common.deductCharges.next(true);
        PsCommonSettings.oper_ID = CommonBussinessConstant.REGISTRATION_CHARGES_OPER;
        this.common.activePage.next({
          title: 'registration_charges_key',
          component: 'registration-charges'
        });
        this.navService.navigateForward('registration-charges');
      } else {
        PsCommonSettings.oper_ID = ConstantCommon.LANDING_OPER_ID;
        this.navService.navigateToMain('home');
      }
    }
  }

  returnLanguageList(parameter?: IOmniCommonRequest): Promise<IOmniCommonResponse> {
    return new Promise<IOmniCommonResponse>((resolve, reject) => {
      this.common.http.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.returnLanguageList, parameter).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        this.common.logger.log(error);
        reject(error);
      });
    });
  }

  endedByOtherActiveSession(errorCode?: number) {
    const userIsLoggedIn = this.session.getValueOf(ConstantCommon.USER_IS_LOGGED_IN);
    const userForceLogout = this.session.getValueOf(ConstantCommon.USER_FORCE_LOGOUT);
    if (userIsLoggedIn && errorCode === -3
      && (typeof userForceLogout === 'undefined' || userForceLogout === undefined || userForceLogout == null)) {
      this.session.append(ConstantCommon.USER_FORCE_LOGOUT, true);
      this.logout(1).then(() => {
        CommonUtils.dismissAllModals();
        this.presentInfoAlert(this.common.translate('force_logout_key'));
      });
    } else {
      CommonUtils.dismissAllModals();
      if (errorCode === -3) {
        this.presentInfoAlert(this.common.translate('force_logout_key'));
      } else {
        this.presentInfoAlert(this.common.translate('security_alert_key'));
      }
    }
  }

  prepareCommonParameters(parameters) {
    if (parameters) {
      for (const par in parameters) {
        if (Object.keys(PsCommonBusinessSettings.paramExclusionList).indexOf(par) >= 0) {
          const tempParam = parameters[par].parameterVal;
          let paramVal;
          try {
            paramVal = JSON.parse(tempParam);
          } catch (error) {
            paramVal = tempParam;
          }
          PsCommonBusinessSettings.paramExclusionList[par] = paramVal;
        }
      }
    }
  }
}
