import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { AlertController } from '@ionic/angular';
import { IOptionsTemplateLogin } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { CommonBussinessConstant } from '../../../commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { ConstantCommon } from '../../psServices/models/common-constant';
import { PsApplicationSettings } from '../../psServices/models/ps-app-settings';
import { IchangeValues, IdefaultValidators, IOptionsPsActionHyperlink, IOptionsPsButtonSubmit, IOptionsPsHyperlinkAnchor } from '../../psServices/models/ps-common-interface';
import { PsCommonSettings } from '../../psServices/models/ps-common.settings';
import { PsCommonService } from '../../psServices/ps-common/ps-common.service';
import { PsTemplateBasePage } from '../ps-template-base/ps-template-base.page';


@Component({
  selector: 'ps-template-login',
  templateUrl: './ps-template-login.page.html',
  styleUrls: ['./ps-template-login.page.scss'],
})
export class PsTemplateLoginPage extends PsTemplateBasePage implements OnInit {


  public mainOptions: IOptionsTemplateLogin = {};
  maskedUserName = '';
  showBannerOnLogin = false;
  onlineRegistrationOptions: IOptionsPsActionHyperlink = {
    route: 'online-registration',
    pageOptions: {
      operId: CommonBussinessConstant.ONLINE_REGISTRATION_OPER,
      title: 'online_registration_key',
      iconName: 'user'
    },
    iconOptions: {
      iconName: 'user',
      labelOptions: {
        labelKey: 'online_registration_key'// used for the anchor label description
      }
    }
  };
  helpCredentialsOptions: IOptionsPsActionHyperlink = {
    route: 'forgot-credentials',
    pageOptions: {
      operId: CommonBussinessConstant.FORGOT_CREDENTIALS_OPER,
      iconName: 'help-circle',
      title: 'forgot_credentials_key'
    },
    iconOptions: {
      iconName: 'help-circle',
      labelOptions: {
        labelKey: 'help_with_credentials_key'
      }
    }
  };

  @Input() public showForgotPwd: string;
  @Input('options') set option(val: IOptionsTemplateLogin) {
    if (val) {
      this.mainOptions = val;
      /* if (val.navigationHandler && this.submitOptions) {
        this.submitOptions = {
          ...this.submitOptions,
          navigationHandler: val.navigationHandler
        };
      } */
    }
  }
  @Output() public onUserNameChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public logInClicked: EventEmitter<any> = new EventEmitter<any>();
  toggle: boolean;
  defaultConfiguration: IOptionsTemplateLogin = {
    password: {
      fcName: 'userPassword',
    },
    userName: {
      fcName: 'userName',
    },
    rememberMe: {
      labelKey: 'remember_me_key',
      fcName: 'rememberMe',
    }
  };
  biometricLoginOptions: IOptionsPsHyperlinkAnchor = {
    iconOptions: {
      iconName: 'finger-print',
      labelOptions: {
        labelKey: 'biometric_login_key',
      }
    }
  };
  submitOptions: IOptionsPsButtonSubmit = {
    group: this.mainOptions.group,
    labelKey: 'login_key',
    submitServiceUrl: PsCommonSettings.serviceUrl.authenticate,
    preCallFunction: {
      func() {
        return new Promise<any>((resolve, reject) => {
          resolve(this.executionClass.checkUsername());
        });
      },
      executionClass: this
    },
    postCallFunction: {
      func(response) {
        return new Promise<any>((resolve, reject) => {
          resolve(this.executionClass.logIn(response));
        });
      },
      params: [this],
      executionClass: this
    },
  };
  userNameValue: string = null;
  constructor(public faio: FingerprintAIO, private alertCtrl: AlertController, private commonServices: PsCommonService,
    private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.init();
    this.showBannerOnLogin = PsApplicationSettings.CLIENT_ASSETS_CONFIG.UI_CONFIGURATION.DISPLAY_SLIDER_ON_LOGIN;
    this.commonProv.copyObject(this.mainOptions, this.defaultConfiguration, false, true);
    this.submitOptions.group = this.mainOptions.group;
    const defaultValidations: Map<string, IdefaultValidators> = new Map<string, IdefaultValidators>();
    defaultValidations.set(this.mainOptions.userName.fcName, {
      required: true
    });
    defaultValidations.set(this.mainOptions.password.fcName, {
      required: true
    });
    this.commonProv.setDefaultValidators(defaultValidations, this.mainOptions.group);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.mainOptions.password.fcName], 1);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.mainOptions.rememberMe.fcName], 0);
    this.commonProv.session.append(ConstantCommon.AUTO_LOGIN, 0);
    this.commonProv.session.getStoredValueOf(CommonBussinessConstant.REMEMBER_ME).then(result => {
      this.submitOptions.group.controls[this.mainOptions.rememberMe.fcName].setValue(result);
      if (result) {
        this.logInByBiometric();
      }
    });
    this.commonServices.cancelClicked.subscribe(cancelClicked => {
      // Adding if conditions by Richie for #TP 1105083 since they were generating an error due to call reset of undifiend in case of closing the page with force logout
      if (this.submitOptions.group && this.submitOptions.group.controls) {
        if (this.submitOptions.group.controls[this.mainOptions.userName.fcName]) {
          this.submitOptions.group.controls[this.mainOptions.userName.fcName].reset();
        }
        if (this.submitOptions.group.controls[this.mainOptions.password.fcName]) {
          this.submitOptions.group.controls[this.mainOptions.password.fcName].reset();
        }
      }
    });
  }




  logInByBiometric() {
    this.commonProv.session.getStoredValueOf(CommonBussinessConstant.USER_NAME).then(result => {
      if (result) {
        this.maskedUserName = this.maskInput(result);
        this.submitOptions.group.controls[this.mainOptions.userName.fcName].setValue(this.maskedUserName);
        this.route.queryParams.subscribe(data => {
          if (!data.logout) {
            this.commonServices.cancelClicked.subscribe(cancelClicked => {
              if (cancelClicked === false) {
                const preLoginParams = this.commonProv.session.getValueOf(ConstantCommon.PRE_LOGIN_PARAMS);
                if (preLoginParams && preLoginParams[ConstantCommon.ENABLE_BIOMETRICS_PARAM] && preLoginParams[ConstantCommon.ENABLE_BIOMETRICS_PARAM].parameterVal === 'true') {
                  this.commonProv.biometricAuth({ username: result }).then(bioResult => {
                    if (bioResult === ConstantCommon.BIOMETRIC_AUTH_SUCCESS) {
                      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.mainOptions.password.fcName], 0);
                      this.commonProv.session.append(ConstantCommon.AUTO_LOGIN, 1);
                      this.commonServices.fireAuth.next(true);
                    }
                  }).catch(error => {
                    this.commonProv.logger.log(error);
                  });
                }
              }
            });
          }
        });
      }
    }).catch(error => {
      this.commonProv.logger.log(error);
    });
  }


  logIn(loginResponse) {
    this.commonProv.session.append(CommonBussinessConstant.REMEMBER_ME, this.toggle, true);
    this.commonProv.session.append(CommonBussinessConstant.USER_NAME, loginResponse.userName, true);
    this.logInClicked.emit({ ...JSON.parse(JSON.stringify(this.mainOptions.group.controls.formData.value)), ...loginResponse });
  }


  async onToggle(event: IchangeValues) {
    this.toggle = event.newValue;
  }

  onUserNameChangeFn(event) {
    this.onUserNameChange.emit(event);
  }

  private maskInput(str: string) {
    let masked = '';
    const iterations: number = Math.floor(Math.random() * 3) + 5;
    for (let i = 0; i < iterations; i++, masked += String.fromCharCode(9679)) { }
    str = str[0] + masked + str[str.length - 1];
    return str;
  }

  checkUsername(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this.maskedUserName === this.submitOptions.group.controls[this.mainOptions.userName.fcName].value) {
        this.commonProv.session.getStoredValueOf(CommonBussinessConstant.USER_NAME).then((result) => {
          this.submitOptions.extraParams = {
            userName: result
          };
          resolve(this.submitOptions.extraParams);
        }).catch((error) => {
          this.loggerP.log(error);
        });
      } else {
        this.commonProv.session.remove(ConstantCommon.USER_NAME);
        resolve(true);
      }
    });
  }

  onEmptyUsername() {
    this.submitOptions.group.controls[this.mainOptions.password.fcName].reset();
  }
}
