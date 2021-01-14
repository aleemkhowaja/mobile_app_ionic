import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Market } from '@ionic-native/market/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Deploy } from 'plugins/cordova-plugin-ionic/dist/ngx';
import { IOptionsAlert } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { CheckAppService } from '../../psServices/checkApp/checkApp.service';
import { CommonUtils } from '../../psServices/models/common-utils';
import { PsApplicationSettings } from '../../psServices/models/ps-app-settings';
import { IOptionsAlertButton } from '../../psServices/models/ps-common-interface';
import { PsCommonSettings } from '../../psServices/models/ps-common.settings';
import { PsCommonService } from '../../psServices/ps-common/ps-common.service';


declare var BuildInfo: any;

@Component({
  selector: 'ps-splash-screen',
  templateUrl: './ps-splash-screen.page.html',
  styleUrls: ['./ps-splash-screen.page.scss'],
})
export class PsSplashScreenPage implements OnInit {

  @Output() public loadComplete: EventEmitter<any> = new EventEmitter<any>();

  labelKeysTransList = [
    { lang: 'en', labels: { loading_key: 'Loading…', error_while_updating_app_key: 'error while updating app', warning_key: 'Warning', application_is_under_maintenance_key: 'Application is under maintenance. Please try again later', update_key: 'Update', update_available_key: 'Update is available. Do you Want To Update?', store_update_required_key: 'An update from store is required', cancel_key: 'Cancel', updating_key: 'Updating…', downloading_key: 'Downloading...', extracting_key: 'Extracting...', reloading_key: 'Reloading App' } },
    {
      lang: 'fr', labels: {
        loading_key: 'Chargement…', error_while_updating_app_key: 'Erreur durant l\'actualisation de l\'application ', warning_key: 'Avertissement', application_is_under_maintenance_key: 'L\'application est en cours de maintenance.Veuillez réessayer plus tard', update_key: 'Mise à jour', update_available_key: 'Une mise à jour est disponible.Voulez - vous mettre à jour?', store_update_required_key: 'Une mise à jour du magasin est requise', cancel_key: 'Annuler', updating_key: 'Mise à jour…', downloading_key: 'Téléchargement…', extracting_key: 'Extraire...', reloading_key: 'Application de rechargement'
      }
    },
    { lang: 'ar', labels: { loading_key: 'جار التحميل', error_while_updating_app_key: '', warning_key: '', application_is_under_maintenance_key: 'التطبيق قيد الصيانة. الرجاء معاودة المحاولة في وقت لاحق', update_key: 'تحديث', update_available_key: 'يتوفر تحديث. هل تريد التحديث؟', store_update_required_key: 'مطلوب تحديث من المتجر', cancel_key: '', updating_key: 'جارٍ التحديث…', downloading_key: 'جارى التحميل…', extracting_key: 'جارٍ الاستخراج...', reloading_key: 'إعادة تحميل التطبيق' } }
  ];

  loadingKey = 'loading_key';
  progress = 0;
  updating = true;
  loaderIcon;
  bankLogo;
  constructor(
    private common: PsCommonService,
    private deploy: Deploy,
    private splashScreen: SplashScreen,
    private checkAppService: CheckAppService,
    private platform: Platform,
    private translate: TranslateService,
    private market: Market) {
    this.init();
  }
  async init() {
    await this.platform.ready();
    this.splashScreen.hide();
  }

  async ngOnInit() {
    this.loaderIcon = PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL + CommonUtils.getCssVariableValue('--ps-loader-image-name');
    this.bankLogo = PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL + CommonUtils.getCssVariableValue('--ps-splash-screen-logo-name');
    this.labelKeysTransList.forEach(element => {
      if (element.lang === PsCommonSettings.activeLanguge.toLocaleLowerCase()) {
        this.common.language.addAndUseTranstlation(element.lang, element.labels);
      }
    });

    // Added by Richie for security checkings
    const stopApp = await this.checkAppService.checkAppProtection().catch(err => {
      this.common.logger.error(err);
    });
    if (!stopApp) {
      // Added by Richie to handle the version control and live update process
      const res = await this.checkAvailableUpdate().catch(err => {
        this.common.logger.error(err);
        const errMsg = this.common.translate('error_while_updating_app_key');
        CommonUtils.presentFailureAlert(errMsg);
      });
      if (res === 'success' || res === 'noUpdate') {
        // this.updating = false;
        this.loadComplete.emit();
      } else if (res === 'error') {
        this.updating = false;
        const errMsg = this.common.translate('error_while_updating_app_key');
        CommonUtils.presentFailureAlert(errMsg);
      }
    }
    // End Richie
  }

  async checkAvailableUpdate(): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      if (this.common.isNativeMobile()) {
        // get latest version (for now will read it from commonsettings)
        // const latestVer = PsCommonSettings.latestAppVerNb; // major.minor.store.live.assets
        const res = await this.common.returnAppVersion();
        if (res) {
          // means we have successfully retrieved the version
          let updateAvailable = false;
          const appVerParts = CommonUtils.returnVersionParts(PsCommonSettings.appVersionNumber);
          if (appVerParts) {
            const latestVer = await this.returnMandatoryVer();
            if (latestVer) {
              // get the latest version splits
              const latestVerParts = CommonUtils.returnVersionParts(latestVer);
              if (latestVerParts) {
                // for the case if the app was updated from the store and the database was not updated then stop the app
                // checking on version.extension is added by Richie for TP# 1135618
                if (latestVerParts.major < appVerParts.major || latestVerParts.minor < appVerParts.minor || latestVerParts.extension < appVerParts.extension || latestVerParts.store < appVerParts.store) {
                  const msg = this.common.translate('application_is_under_maintenance_key');
                  const alertOptions: IOptionsAlert = { title: 'warning_key', message: msg, noButtons: true };
                  CommonUtils.presentInfoAlert(null, alertOptions);
                  resolve('stop');
                  return;
                }
                // checking on version.extension is added by Richie for TP# 1135618
                if (latestVerParts.major > appVerParts.major || latestVerParts.minor > appVerParts.minor || latestVerParts.extension > appVerParts.extension || latestVerParts.store > appVerParts.store) {
                  PsCommonSettings.mandatoryUpdate = '1';
                  updateAvailable = true;
                }
                if (!updateAvailable && (latestVerParts.live !== appVerParts.live || latestVerParts.assets !== appVerParts.assets)) {
                  const update = await this.deploy.checkForUpdate();
                  updateAvailable = update.available;
                }
              }
            }
          }
          if (updateAvailable) {
            const msg = this.common.translate('store_update_required_key');
            // this.common.logger.warn(warningMsg);
            const alertOptions: IOptionsAlert = { title: 'update_key', message: msg, buttonsArray: [] };
            const updatetBtnOption: IOptionsAlertButton = {
              group: null,
              labelKey: 'update_key',
              handler: async () => {
                this.common.modalCtrl.dismiss();
                if (PsCommonSettings.mandatoryUpdate === '1') {
                  const packageName = BuildInfo.packageName;
                  this.market.open(packageName);
                  resolve('storeUpdate');
                  return;
                } else {
                  await this.performManualUpdate();
                }
                resolve('success');
              }
            };
            alertOptions.buttonsArray.push(updatetBtnOption);
            if ('0' === PsCommonSettings.mandatoryUpdate) {
              alertOptions.message = this.common.translate('update_available_key');
              // add the cancel the button
              const cancelBtnOption: IOptionsAlertButton = {
                group: null,
                labelKey: 'cancel_key',
                handler: async () => {
                  this.common.modalCtrl.dismiss();
                  resolve('noUpdate');
                }
              };
              alertOptions.buttonsArray.push(cancelBtnOption);
            }
            CommonUtils.presentInfoAlert(null, alertOptions);
          } else {
            resolve('noUpdate');
          }
        } else {
          reject('error');
        }
      } else {
        resolve('success');
      }
    });
  }
  async performManualUpdate() {
    this.common.logger.log('Manual Update Started');
    this.loadingKey = 'updating_key';
    await this.deploy.downloadUpdate((downProgress) => {
      if (this.loadingKey !== 'downloading_key') {
        this.loadingKey = 'downloading_key';
      }
      this.progress = downProgress;
    });
    await this.deploy.extractUpdate((extractProgress) => {
      if (this.loadingKey !== 'extracting_key') {
        this.loadingKey = 'extracting_key';
      }
      this.progress = extractProgress;
    });
    this.loadingKey = 'reloading_key';
    await this.deploy.reloadApp();
    this.common.logger.log('Manual Update Finished');
  }
  async performAutomaticUpdate(): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const currentVersion = await this.deploy.getCurrentVersion();
        // const config: IDeployConfig = {channel: 'Richie'};
        // await this.deploy.configure(config);
        this.common.logger.log('Automatic Update Started');
        this.loadingKey = 'updating_key';
        const resp = await this.deploy.sync({ updateMethod: 'auto' }, percentDone => {
          this.progress = percentDone;
        });
        if (!currentVersion || currentVersion.versionId !== resp.versionId) {
          // We found an update, and are in process of redirecting you since you put auto!
          this.common.logger.log('Automatic Update finished');
          resolve('success');
        } else {
          // No update available
          resolve('noUpdate');
        }
      } catch (err) {
        this.common.logger.error(err);
        reject('error');
      }
    });
  }
  private async returnMandatoryVer(): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const versionParam = {
        compCode: PsApplicationSettings.MAIN_CONFIG.COMP_CODE,
        appId: PsApplicationSettings.MAIN_CONFIG.APP_ID
      };
      this.common.http.commonRequestAjax(PsCommonSettings.serviceUrl.returnVersionDetails, versionParam).then(res => {
        if (res && res.data && res.data.gridModel && res.data.gridModel[0] && res.data.gridModel[0].webVersion) {
          resolve(res.data.gridModel[0].webVersion);
        } else {
          resolve(null);
        }
      }).catch((err) => {
        this.common.logger.error(err);
        reject(err);
      });
    });
  }

}
