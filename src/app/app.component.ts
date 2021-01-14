import { Component, HostListener, OnDestroy } from '@angular/core';
import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { FCM } from 'plugins/cordova-plugin-fcm-with-dependecy-updated/ionic/ngx/FCM';
import { Subscription } from 'rxjs';
import { IOptionsPsActionImageExposed, IPreLoginRequest, IPreLoginResponse } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PrayerService } from 'src/app/commonBussinessSRC/psServices/omni-common/prayer.service';
import { CommonCustUtils } from 'src/app/commonSRC/customization/psServices/util/common-cust-utils';
import { ErrorHandlerService } from 'src/app/commonSRC/psServices/errorhandler/errorhandler.service';
import { HybridKeyService } from 'src/app/commonSRC/psServices/hybridkey/hybridkey.service';
import { LanguageService } from 'src/app/commonSRC/psServices/language/language.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IPublicPrivateKey } from 'src/app/commonSRC/psServices/models/hybridkey-interface';
import { PsApplicationConfiguration, PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';
import { INavigationHandler } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsNotificationsService } from 'src/app/commonSRC/psServices/notifications/ps-notifications.service';
import { environment } from 'src/environments/environment';

/* nabil feghali - OMNI common security */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy {
  // ARagab : this is the pryer date returned from service
  pryerDate: string;
  prayerNotficStat;
  private subscription: Subscription;
  private browserRefeshSubscription: Subscription;
  private userLoggedInSubscription: Subscription;
  private timeoutEndTime: number;
  public loaderOptions: IOptionsPsActionImageExposed;
  notificationTimeoutAlert;
  public isPlatformReady = false;
  public showPsSplashScreen = false;
  backButtonSubscription: Subscription;
  closeAppToast: HTMLIonToastElement;
  numberOfBackButtonPressed = 0;
  public exitWasTriggerred = false;
  private lastAccessDate = Date.now();
  private sessionTimeout = false;
  private sessionTimeoutInterval: NodeJS.Timer;
  private eventSub: Subscription; // Added by Richie #TP 1105083 due to migration to ionic 5 since Event service was removed and replaced with observable

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private logger: LoggerService,
    private omniPull: OmniPullService,
    public nav: PsNavigatorService,
    public localNotifications: LocalNotifications,
    public nativeAudio: NativeAudio,
    private languageService: LanguageService,
    private notificationsService: PsNotificationsService,
    private prayerService: PrayerService,
    private hybridkey: HybridKeyService,
    private errorHandlerService: ErrorHandlerService,
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private fcm: FCM,
    private firebaseCrashlytics: FirebaseCrashlytics,
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    // moved here by Richie for #BUG 1119658
    await this.platform.ready();
    if (this.omniPull.omniCommon.common.isNativeMobile()) {
      this.fcm.hasPermission().then(permission => {
        if (permission) {
          this.fcm.getToken().then(token => {
            // alert('hasPermission - getToken token=' + token);
            ConstantCommon.FCM_TOKEN = token;
          });
        } else {
          this.fcm.requestPushPermission().then(wasPermissionGiven => {
            if (wasPermissionGiven) {
              this.fcm.getToken().then(token => {
                // alert('requestPushPermission - getToken token=' + token);
                ConstantCommon.FCM_TOKEN = token;
              });
            } else {
              this.logger.error('notification wasPermissionGiven is false');
            }
          });
        }
      });
      if (environment.production) {
        this.errorHandlerService.crashlytics = this.firebaseCrashlytics.initialise();
      }
    }
    // End Richie
    // Added by Richie for #TP 997475: opening omni cust war
    CommonCustUtils.custAppInitialize();
    this.subscribeOnNativeBackClick();
    const isLoggedIn = this.omniPull.omniCommon.common.session.getValueOf(ConstantCommon.USER_IS_LOGGED_IN);
    PsCommonSettings.isLoggedIn = isLoggedIn;
    // End Richie

    this.checkConnectivity();
    // this.errorHandlerService.initialiseCrashlytics();
    const clientConfig: any = await this.omniPull.omniCommon.common.http.http.get('ps-config.json').toPromise();
    const defaultConfg: any = await this.omniPull.omniCommon.common.http.http.get('ps-default-config.json').toPromise();
    this.refreshPsConfig(defaultConfg);
    this.refreshPsConfig(clientConfig);

    PsCommonSettings.appVersionNumber = PsApplicationConfiguration.MAIN_CONFIG.APP_VERSION;
    const FONT_FAMILY = PsApplicationSettings.CLIENT_ASSETS_CONFIG.FONT_FAMILY;
    const ICONS_URL = PsApplicationSettings.CLIENT_ASSETS_CONFIG.ICONS_URL;
    const MINIFIED_DEFAULT_CSS_FILE_NAME = PsApplicationSettings.MAIN_CONFIG.MINIFIED_DEFAULT_CSS_FILE_NAME;
    const MINIFIED_CLIENT_CSS_FILE_NAME = PsApplicationSettings.MAIN_CONFIG.MINIFIED_CLIENT_CSS_FILE_NAME;

    await this.loadCssIfNot(FONT_FAMILY, FONT_FAMILY);
    this.loadCssIfNot(ICONS_URL + 'favicon.ico', 'favicon.icon', 'shortcut icon');
    await this.loadCssIfNot(MINIFIED_DEFAULT_CSS_FILE_NAME, MINIFIED_DEFAULT_CSS_FILE_NAME);
    await this.loadCssIfNot(MINIFIED_CLIENT_CSS_FILE_NAME, MINIFIED_CLIENT_CSS_FILE_NAME);

    this.loaderOptions = {
      imageName: unescape(CommonUtils.getCssVariableValue('--ps-loader-image-name')),
      allowCust: false
    };

    if (CommonUtils.isNativeMobile()) {
      this.splashScreen.hide();
      this.showPsSplashScreen = true;
    } else {
      this.loadComplete(false);
    }
  }

  subscribeOnNativeBackClick() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(0, async () => {
      const isBasePage = (PsCommonSettings.oper_ID === ConstantCommon.LOGIN_OPER_ID) || (PsCommonSettings.oper_ID === ConstantCommon.LANDING_OPER_ID);
      if (isBasePage) {
        this.numberOfBackButtonPressed++;
        if (this.numberOfBackButtonPressed >= 2 && !this.exitWasTriggerred) {
          this.exitApp();
        } else {
          const alertMessage = this.nav.isUserLoggedIn ? CommonUtils.translate('double_tap_to_loggout_close_key') : CommonUtils.translate('double_tap_to_close_key');
          this.closeAppToast = await this.toastController.create({
            message: alertMessage,
            duration: 1000,
            position: 'bottom'
          });
          try {
            this.closeAppToast.dismiss();
          } catch (e) { }
          this.closeAppToast.present();
        }
        setTimeout(() => {
          this.numberOfBackButtonPressed = 0;
        }, 1000);
      } else {
        this.nav.pop();
      }
    });
  }

  exitApp() {
    if (this.exitWasTriggerred) {
      return;
    }
    this.exitWasTriggerred = true;
    this.numberOfBackButtonPressed = 0;
    if (this.nav.isUserLoggedIn === true) {
      this.omniPull.omniCommon.logout(0).then(() => {
        navigator['app'].exitApp();
      });
    } else {
      navigator['app'].exitApp();
    }
  }

  async loadComplete(fromSplash: boolean) {
    // await this.platform.ready();
    this.checkDevice();

    // modified by Richie #TP 1105083 due to migration to ionic 5 since Event service was removed and replaced with observable with one argument
    this.eventSub = this.omniPull.events.subscribe('user:endedByOtherActiveSession', (errorCode) => {
      this.omniPull.omniCommon.endedByOtherActiveSession(errorCode);
    });

    if (!PsCommonSettings.isLoggedIn) {
      this.preLogin().then(() => {
        if (CommonUtils.isNativeMobile()) {
          this.notificationsService.initFirbaseNotificationsConfig();
        }
        this.showPsSplashScreen = false;
      });
    } else {
      const preLoginResponse = this.omniPull.omniCommon.session.getValueOf(ConstantCommon.preLoginResponse);
      this.preLoginReponseHandler(preLoginResponse, null, true);
      const loginResponse = this.omniPull.omniCommon.session.getValueOf(ConstantCommon.USERINFO);
      // Added by Richie for #TP 997475: opening omni cust war
      this.refreshPsConfig(preLoginResponse.psConfigMap)
      if (PsCommonSettings.custMode) {
        CommonCustUtils.preLoginReponseHandler(preLoginResponse);
      } else {
        this.omniPull.omniCommon.initializeLogin(loginResponse, true);
      }
      this.showPsSplashScreen = false;
    }
  }

  checkDevice() {
    if (!PsCommonSettings.isLoggedIn) {
      document.querySelector('html').classList.remove('userIsLoggedIn');
      document.querySelector('html').classList.add('userIsNotLoggedIn');
    }

    if (this.nav.commonService.isWeb()) {
      document.querySelector('html').classList.add('isWeb-app');
      document.querySelector('html').classList.remove('isMobile-app');
    } else {
      document.querySelector('html').classList.remove('isWeb-app');
      document.querySelector('html').classList.add('isMobile-app');
    }

    if (this.nav.commonService.isWebLayout()) {
      document.querySelector('html').classList.add('isWeb-Layout');
      document.querySelector('html').classList.remove('isMobile-Layout');
    } else {
      document.querySelector('html').classList.remove('isWeb-Layout');
      document.querySelector('html').classList.add('isMobile-Layout');
    }
    PsCommonSettings.menuIsTreeView = PsApplicationSettings.CLIENT_ASSETS_CONFIG.UI_CONFIGURATION.MENU_TREE != null ?
      PsApplicationSettings.CLIENT_ASSETS_CONFIG.UI_CONFIGURATION.MENU_TREE : this.nav.commonService.isWeb() ? true : false;
  }

  preLogin(): Promise<IPreLoginResponse> {
    return new Promise<IPreLoginResponse>((resolve, reject) => {

      const prelogInParam: IPreLoginRequest = {
        compCode: this.omniPull.omniCommon.returnCompCode(),
        appId: this.omniPull.omniCommon.returnAppID(),
        channelId: this.omniPull.omniCommon.returnChnlID(),
        language: !!PsCommonSettings.activeLanguge ? PsCommonSettings.activeLanguge : 'EN'
      };
      // Added by Richie for #TP 997475: opening omni cust war
      CommonCustUtils.adjustPreLoginParams(prelogInParam);
      // End Richie


      this.omniPull.omniCommon.common.preparePrelogin().then((keyPairs) => {
        const pair: IPublicPrivateKey = this.hybridkey.returnReadableKeys(keyPairs.publicKey, keyPairs.privateKey);
        /* nabil feghali - OMNI common security  */
        this.omniPull.omniCommon.common.session.clearUserSession();
        this.omniPull.omniCommon.common.session.append(ConstantCommon.UUID, keyPairs.udid);
        prelogInParam.udid = keyPairs.udid;
        prelogInParam.publicKey = pair.publicKey;


        this.omniPull.omniCommon.preLoginService(prelogInParam).then((result) => {
          this.refreshPsConfig(result.psConfigMap);
          const preLoginResponse: IPreLoginResponse = result;
          this.omniPull.omniCommon.session.append(ConstantCommon.preLoginResponse, preLoginResponse);
          this.omniPull.omniCommon.session.append(ConstantCommon.keyPair, pair);
          this.preLoginReponseHandler(preLoginResponse, pair);
          // Added by Richie for #TP 997475: opening omni cust war
          CommonCustUtils.preLoginReponseHandler(preLoginResponse);
          resolve(result);
          // End Richie
        }).catch((err) => {
          this.logger.error(err);
        });
      }).catch((error) => {
        this.logger.error(error);
      });
    });
  }

  preLoginReponseHandler(preLoginResponse: IPreLoginResponse, pair: IPublicPrivateKey, isRefresh?) {
    if (!!preLoginResponse && !!preLoginResponse.parameters) {

      if (!isRefresh) {
        /* nabil feghali - OMNI common security */
        this.omniPull.omniCommon.session.append(ConstantCommon.PUBLIC_KEY, pair.publicKey);
        this.omniPull.omniCommon.session.append(ConstantCommon.PRIVATE_KEY, pair.privateKey);
        this.omniPull.omniCommon.session.append(ConstantCommon.SERVER_PUBLIC_KEY, preLoginResponse.publicKey);
        this.omniPull.omniCommon.session.append(PsCommonSettings.ENCRYPT_PARAMS, !!preLoginResponse.parameters.enableServiceTraficEncryption ? preLoginResponse.parameters.enableServiceTraficEncryption.parameterVal : false);


        this.omniPull.omniCommon.session.append(ConstantCommon.PRE_LOGIN_PARAMS, preLoginResponse.parameters);
        this.omniPull.omniCommon.session.append(ConstantCommon.TRANSLATION_KEYS, preLoginResponse.translations);

      }
      PsCommonSettings.activeLanguge = preLoginResponse.parameters.DefaultLanguage ? preLoginResponse.parameters.DefaultLanguage.parameterVal : 'EN';

      this.languageService.addAndUseTranstlation(PsCommonSettings.activeLanguge, preLoginResponse.translations);

      if (preLoginResponse.parameters.SessionTimeoutAlert) {
        // this.omniPull.omniCommon.session.append(ConstantCommon.SESSION_TIMEOUT_ALERT, preLoginResponse.parameters['SessionTimeoutAlert'].parameterVal);
        PsCommonSettings.timeoutNotification = preLoginResponse.parameters.SessionTimeoutAlert.parameterVal;
      }

      if (preLoginResponse.parameters.SessionTimeout) {
        this.timeoutEndTime = preLoginResponse.parameters.SessionTimeout.parameterVal;
      }

      if (preLoginResponse.parameters.SessionTimeout && preLoginResponse.parameters.SessionTimeoutAlert) {
        this.userLoggedInSubscription = this.nav.getIsUserLoggedIn().subscribe((result) => {
          if (result) {
            this.sessionTimeoutInterval = setInterval(() => {
              this.checkTimeout();
            }, PsCommonSettings.sessionTimeoutInterval);
          }
        });
      }
      // #DN: Gilbert : Added the below for #BUG 1060649 and #BUG 1060585
      this.omniPull.omniCommon.prepareCommonParameters(preLoginResponse.parameters);

      // this.initializeApp();
      this.isPlatformReady = true;

      // ARagab call prayer service for notification
      this.prayerNotficStat = this.omniPull.omniCommon.common.session.getValueOf(PsCommonSettings.PRAYER_NOTIFIC_STATUE);

      if (!this.prayerNotficStat || this.prayerNotficStat === 'undefined') {
        this.prayerNotficStat = false;
      }

      if (this.prayerNotficStat === true) {
        this.prayerService.initPrayersService().catch(error => {
          this.logger.error(error);
        });
      }

      if (this.prayerNotficStat === false) {
        this.localNotifications.clearAll().then((result) => {
          console.log(this.localNotifications.getAll());
        });
      }
    }
  }


  loadCssIfNot(url, cssId, rel?) {
    return CommonUtils.loadCssIfNot(url, cssId, rel);
  }


  checkConnectivity() {
    // implement connectivity when richie commits his code for splash screen
  }

  /* @HostListener('document:keyup', ['$event'])
  @HostListener('document:click', ['$event'])
  @HostListener('document:wheel', ['$event'])
  @HostListener('document:touchmove', ['$event']) */

  @HostListener('document:keyup')// removing $event param as on build --prod getting error as resetTimer function that has the HostListener directive does not take argument
  @HostListener('document:click')
  @HostListener('document:wheel')
  @HostListener('document:touchmove')
  resetTimer() {
    this.clearTimeOut();
  }

  checkTimeout() {
    if (this.nav.isUserLoggedIn === true) {
      const endTime = this.timeoutEndTime * 60 * 1000;
      const notificationTime = PsCommonSettings.timeoutNotification * 60 * 1000;
      const now = Date.now();
      if ((this.lastAccessDate + notificationTime) < now && !this.sessionTimeout) {
        this.sessionTimeout = true;
        this.omniPull.omniCommon.presentInfoAlert(null, {
          title: this.omniPull.omniCommon.common.translate('session_time_out_key'),
          message: this.omniPull.omniCommon.common.translate('the_session_will_expire_in_key') + ' ' + String((endTime - notificationTime) / (1000)) + ' ' + this.omniPull.omniCommon.common.translate('seconds_key')
        });
      }
      if ((this.lastAccessDate + endTime) < now && this.sessionTimeout) {
        clearInterval(this.sessionTimeoutInterval);
        this.omniPull.omniCommon.logout(2).then(() => {
          this.modalCtrl.dismiss();
          this.omniPull.omniCommon.presentInfoAlert(this.omniPull.omniCommon.common.translate('session_time_out_key'));
        });
      }
    }
  }

  clearTimeOut() {
    this.lastAccessDate = Date.now();
    this.sessionTimeout = false;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.browserRefeshSubscription) {
      this.browserRefeshSubscription.unsubscribe();
    }

    if (this.userLoggedInSubscription) {
      this.userLoggedInSubscription.unsubscribe();
    }

    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }

    if (this.sessionTimeoutInterval) {
      clearInterval(this.sessionTimeoutInterval);
    }
    // Added by Richie #TP 1105083
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
    // End Richie
  }

  refreshPsConfig(data) {
    PsApplicationConfiguration.functions.__SET(data);
    PsApplicationSettings.functions._REFRESH();
    PsCommonBusinessSettings.functions._REFRESH();
    PsCommonSettings.functions._REFRESH();
  }
}


declare global {
  interface Window {
    navigationHandler?: INavigationHandler;
    grecaptcha;
    grecaptchaCallback: (...param: any) => void;
  }
}
