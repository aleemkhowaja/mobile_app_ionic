import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { IPageBussiness } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-menu/ps-complex-menu.component.interfaces';
import { IOptionsTemplateLogin } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniCommonService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-common.service';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { ErrorHandlerService } from 'src/app/commonSRC/psServices/errorhandler/errorhandler.service';
import { PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';
import { SessionService } from 'src/app/commonSRC/psServices/session/session.service';
import { CommonBussinessConstant } from '../../commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsCommonBusinessSettings } from '../../commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPushService } from '../../commonBussinessSRC/psServices/omni-common/omni-push.service';
import { IOptionsPsActionGallery } from '../../commonSRC/psComponents/ps-base/ps-base-action/ps-action-gallery/ps-action-gallery.interfaces';
import { ConstantCommon } from '../../commonSRC/psServices/models/common-constant';
import { IOptionsPsActionHyperlink, IOptionsPsButtonFabList, IOptionsPsLabel } from '../../commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from '../../commonSRC/psServices/models/ps-common.settings';
import { PsNavigatorService } from '../../commonSRC/psServices/navigator/ps-navigator.service';
import { OmniBasePage } from '../omni-base/omni-base.page';


@Component({
  selector: 'omni-login',
  templateUrl: './omni-login.page.html',
  styleUrls: ['./omni-login.page.scss'],
})

export class OmniLoginPage extends OmniBasePage implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  bannersOptions: IOptionsPsActionGallery;
  version: string = PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL;
  options: IOptionsTemplateLogin = {
    password: {
      fcName: 'password',
      group: this.loginForm,
    },
    userName: {
      fcName: 'userName',
      group: this.loginForm,
    },
    rememberMe: {
      fcName: 'rememberMe',
      group: this.loginForm
    },
    group: this.loginForm,
  };
  serverURLOptions: IOptionsPsActionHyperlink = {
    iconOptions: {
      iconName: 'diamond',
      labelOptions: {
        labelKey: 'SERVER_URL_KEY',
      }
    },
    disableLoading: true
  };
  atmAndBranchLocatorOptions: IOptionsPsActionHyperlink = {
    route: 'atm-branch-locator',
    labelKey: 'atm_and_branch_locator_key',
    iconOptions: {
      iconName: 'map-outline',
      labelOptions: {
        labelKey: 'atm_and_branch_locator_key'
      }
    }
  };
  qiblaDirectionOptions: IOptionsPsActionHyperlink = {
    route: 'qibla-direction',
    labelKey: 'qibla_direction_key',
    iconOptions: {
      iconName: 'compass-outline',
      labelOptions: {
        labelKey: 'qibla_direction_key',
      }
    }
  };
  createAccountOptions: IOptionsPsActionHyperlink = {
    pageOptions: {
      operId: CommonBussinessConstant.ON_BOARDING_OPER,
      title: 'become_our_customer_key',
      iconName: 'person-add'
    },
    route: 'on-boarding',
    labelKey: 'become_our_customer_key',
    iconOptions: {
      iconName: 'person-add',
      labelOptions: {
        labelKey: 'become_our_customer_key',
      }
    }
  };
  ProductNServiceCategoriesOptions: IOptionsPsActionHyperlink = {
    route: 'products-services',
    labelKey: 'products_and_services_key',
    iconOptions: {
      iconName: 'information-circle-outline',
      labelOptions: {
        labelKey: 'products_and_services_key',
      }
    }
  };

  financingCalculatorOptions: IOptionsPsActionHyperlink = {
    route: 'financial-calculator',
    pageOptions: {
      operId: CommonBussinessConstant.FINANCIAL_CALCULATOR_OPER,
      title: 'financing_calculator_key',
      iconName: 'calculator'
    },
    iconOptions: {
      iconName: 'calculator',
      labelOptions: {
        labelKey: 'financing_calculator_key'
      }
    }
  };
  prayerOptions: IOptionsPsActionHyperlink = {
    route: 'prayer-time',
    labelKey: 'prayer_time_key',
    iconOptions: {
      iconName: 'timer-outline',
      labelOptions: {
        labelKey: 'prayer_time_key'
      }
    }
  };
  loginfabListOptions: IOptionsPsButtonFabList = {
    group: this.loginForm,
    mainProperties: {
      iconName: 'login-fab-icon',
      group: this.loginForm
    },
    topFabList: [
      {
        group: this.loginForm,
        iconName: this.prayerOptions.iconOptions.iconName,
        labelKey: this.prayerOptions.iconOptions.labelOptions.labelKey,
        handler: () => {
          this.navService.openPage(
            {
              component: 'prayer-time',
              title: this.prayerOptions.labelKey
            });
        }
      },
      {
        group: this.loginForm,
        iconName: this.qiblaDirectionOptions.iconOptions.iconName,
        labelKey: this.qiblaDirectionOptions.iconOptions.labelOptions.labelKey,
        handler: () => {
          this.navService.openPage(
            {
              component: 'qibla-direction',
              title: this.qiblaDirectionOptions.labelKey
            });
        }
      },
      {
        group: this.loginForm,
        iconName: this.atmAndBranchLocatorOptions.iconOptions.iconName,
        labelKey: this.atmAndBranchLocatorOptions.iconOptions.labelOptions.labelKey,
        handler: () => {
          this.navService.openPage(
            {
              component: 'atm-branch-locator',
              title: this.atmAndBranchLocatorOptions.labelKey
            });
        }
      },

    ],
    startFabList: [
      {
        group: this.loginForm,
        iconName: this.ProductNServiceCategoriesOptions.iconOptions.iconName,
        labelKey: this.ProductNServiceCategoriesOptions.iconOptions.labelOptions.labelKey,
        handler: () => {
          this.navService.openPage(
            {
              component: 'products-services',
              title: this.ProductNServiceCategoriesOptions.labelKey
            });
        }
      },
      {
        group: this.loginForm,
        iconName: this.financingCalculatorOptions.iconOptions.iconName,
        labelKey: this.financingCalculatorOptions.iconOptions.labelOptions.labelKey,
        handler: () => {
          this.navService.openPage(
            {
              component: 'financial-calculator',
              title: this.financingCalculatorOptions.iconOptions.labelOptions.labelKey,
              operID:this.financingCalculatorOptions.pageOptions.operId
            });
        }
      },
      {
        group: this.loginForm,
        iconName: this.createAccountOptions.iconOptions.iconName,
        labelKey: this.createAccountOptions.iconOptions.labelOptions.labelKey,
        handler: () => {
          this.navService.openPage(
            {
              component: 'on-boarding',
              title: this.createAccountOptions.labelKey,
              operID:this.createAccountOptions.pageOptions.operId 
            });
        },
        // side: 'start'
      },
    ]
  };

  bankName: IOptionsPsLabel = {};


  constructor(private navService: PsNavigatorService, private session: SessionService,
    private alertCtrl: AlertController, private omniPush: OmniPushService, private ommniCommon: OmniCommonService, private errorHandlerService: ErrorHandlerService, private omniPull: OmniPullService) {
    super();
  }

  ngOnInit() {
    this.bannersOptions = { layout: 'slider' };
    PsCommonSettings.oper_ID = ConstantCommon.LOGIN_OPER_ID;
    PsCommonSettings.pageName = ConstantCommon.LOGIN_PAGE_NAME;
    this.omniPull.getParamValOf('BankName').then((result) => {
      if (result.BankName) {
        this.bankName.labelKey = result.BankName;
      }
    }).catch((error) => { });
  }

  authenticate(authenticationResponse) {
    this.commonProv.presentLoading();
    const routesArray: IPageBussiness[] = [];
    if (authenticationResponse.firstLogin) {
      routesArray.push({ component: 'terms-and-conditions', title: 'terms_and_conditions_key', icon: 'diamond' });
    }
    if (authenticationResponse.requireChangePassword) {
      routesArray.push({ component: 'change-pass', title: 'change_password_key', icon: 'diamond', operID: CommonBussinessConstant.CHANGE_PASSWORD_OPER });
    }
    if (authenticationResponse.requireChangePIN) {
      routesArray.push({ component: 'change-pin', title: 'change_pin_key', icon: 'diamond', operID: CommonBussinessConstant.CHANGE_PIN_OPER });
    }
    this.session.append(ConstantCommon.USERINFO, { ocUserId: authenticationResponse.ocUserId });
    this.session.append(ConstantCommon.APP_ID, authenticationResponse.appId);
    if (routesArray.length > 0) {
      routesArray.push({ component: 'omni-login', operID: ConstantCommon.LOGIN_OPER_ID });
      this.navService.autoNavigate({ currentPage: 0, mainPage: 'omni-login', pageData: routesArray, commonParam: { actionType: 'C' } });
    } else {
      this.login(authenticationResponse.ocUserId, authenticationResponse.userName);
    }
  }

  login(ocUserId, userName) {
    const loginRequest = { ocUserId, userName }; // no additional information to be passsed to the login service (CompCode, appId, channelId,userId are sent via the interceptor)
    this.omniPush.login(loginRequest).then(result => {
      if (result) {
        if (result.appId === 4) {
          PsCommonBusinessSettings.isAgent = true;
        }
        this.ommniCommon.common.session.append(ConstantCommon.USERINFO, result);
        this.ommniCommon.initializeLogin(result);
        this.errorHandlerService.initializeLogLevelByUser(result.omniUserVO.NAME, result.omniUserVO.LOG_LEVEL);
        /* FIX issue #1120252
        if (this.ommniCommon.common.isNativeMobile()) {
          this.ommniCommon.common.notificationService.createNotificationDeviceToken();
        }*/
      }
    }).catch(error => this.omniPush.commonService.logger.log(error));
  }

}
