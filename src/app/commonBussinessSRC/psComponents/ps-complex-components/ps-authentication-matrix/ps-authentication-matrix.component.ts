import { AfterViewInit, Component, EventEmitter, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { ModalController, NavParams } from '@ionic/angular';
import { OmniCommonService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-common.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { PsCommonService } from '../../../../commonSRC/psServices/ps-common/ps-common.service';
import { CommonBussinessConstant } from '../../../psServices/models/ps-common-bussiness-constant';
import { ConstantCommon } from './../../../../commonSRC/psServices/models/common-constant';
import { IdefaultValidators, IOptionsPsActionButton, IOptionsPsActionImageExposed, IOptionsPsBaseFieldExposed, IOptionsPsButtonDismiss, IOptionsPsButtonStandard, IOptionsPsInputPassword, IOptionsPsKeyinInput, IOptionsPsLabel, IOptionsPsSelectDropdown, IPsSelect } from './../../../../commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from './../../../../commonSRC/psServices/navigator/ps-navigator.service';
import { OmniPullService } from './../../../psServices/omni-common/omni-pull.service';
import { IPsCaptchaOptions } from './../../ps-captcha/ps-captcha.component.interface';
import { IAuthCaptcha, IAuthenticationMatrixRequest, IAuthenticationMatrixResponse, IAuthPassword, IAuthSecurityQuestion, IAuthSmsOTP, IAuthTransactionPassword } from './ps-authentication-matrix.component.interface';




@Component({
    selector: 'ps-authentication-matrix',
    templateUrl: './ps-authentication-matrix.component.html',
    styleUrls: ['./ps-authentication-matrix.component.scss'],
})
export class PsAuthenticationMatrixComponent implements OnInit, AfterViewInit {

    @ViewChild('stepper', { static: true }) stepper: MatStepper;


    transactionPasswordForm: FormGroup = new FormGroup({});
    passwordForm: FormGroup = new FormGroup({});
    securityQuestionForm: FormGroup = new FormGroup({});
    smsOTPForm: FormGroup = new FormGroup({});
    captchaForm: FormGroup = new FormGroup({});
    fingerPrintForm: FormGroup = new FormGroup({});
    physicalTokenForm: FormGroup = new FormGroup({});
    @ViewChild('securityQuestion', { static: false }) securityQuestionValue = new EventEmitter<HTMLElement>();
    smsOTPEnabled = false;
    transactionPasswordEnabled = false;
    transactionPasswordCompleted = false;
    passwordCompleted = false;
    authenticationCompleted = false;
    physicalTokenCompleted = false;
    captchaCompleted = false;
    fingerPrintEnabled = false;
    physicalTokenEnabled = false;
    securityQuestionEnabled = false;
    securityQuestionCompleted = false;
    fingerPrintCompleted = false;
    captchaEnabled = false;
    smsOTPCompleted = false;
    hideSubmit = true;
    loadsmsOtp: boolean;
    otpRequested = true;
    loading = false;
    transactionPasswordLoading = true;
    securityQuestionisActive = true;
    smsOTPLoading = true;
    verifyButtonDisabled = false;
    showTransactionPasswordErrorMessage = false;
    showPasswordErrorMessage = false;
    showSecurityQuestionErrorMessage = false;
    physicalTokenErrorMessage = false;
    showOTPErrorMessageOne = false;
    showOTPErrorMessageTwo = false;
    transactionPasswordErrorMessage = '';
    passwordErrorMessage = '';
    securityQuestionErrorMessage = '';
    otpErrorMessageOne = '';
    otpErrorMessageTwo = '';
    deviceHaveFingerPrint: boolean = null;
    requestButtonDisabled = false;
    remainingRefreshAttempts = 3;
    transactionPasswordVO: IAuthTransactionPassword;
    passwordVO: IAuthPassword;
    securityQuestionVO: IAuthSecurityQuestion;
    OTPsmsVO: IAuthSmsOTP;
    captchaVO: IAuthCaptcha;
    captchaErrorMessage = 'value_is_missing_key';
    showCaptchaError = false;
    captchaViewed = false;
    maxPinTrial = 4;
    maxCaptchaTrial = 4;
    maxNumberOfInvalidSecurityQuestion = 4;
    maxNumberOfInvalidSmsOTP = 4;
    OTPPeriodTime: number;
    OTPPeriod: string;
    refreshOtpGenerator = 30000;
    otpGeneratorAttempts = 3;
    siteKey: string;
    onlyBiometrics = false;
    isFinger: string = CommonBussinessConstant.FINGER_PRINT;
    securityQuestions: IPsSelect[];
    smsRequest: string = CommonBussinessConstant.SMS_REQUEST;
    userInfo;
    transactionPasswordOptions: IOptionsPsInputPassword = {
        labelKey: 'pin_key',
        fcName: 'transactionPassword',
        group: this.transactionPasswordForm,
        placeHolder: 'enter_your_pin_key'
    };
    passwordOptions: IOptionsPsInputPassword = {
        labelKey: 'password_key',
        fcName: 'password',
        group: this.passwordForm,
        placeHolder: 'enter_your_password_key'
    };
    transactionPasswordValidOptions: IOptionsPsKeyinInput = {
        fcName: 'transactionPasswordValid',
        group: this.transactionPasswordForm,
        type: 'text'
    };
    passwordValidOptions: IOptionsPsKeyinInput = {
        fcName: 'passwordValid',
        group: this.passwordForm,
        type: 'text'
    };
    verifyButtonOptions: IOptionsPsActionButton = {
        labelKey: 'verify_key',
        type: 'button',
        psClass: 'ps-button-submit',
        group: null
    };
    cancelButtonOptions: IOptionsPsButtonDismiss = {
        labelKey: 'cancel_key',
        group: null
    };
    securityQuestionOptions: IOptionsPsSelectDropdown = {
        labelKey: 'security_question_key',
        fcName: 'securityQuestion',
        group: this.securityQuestionForm,
        placeHolder: 'please_select_security_question_key'
    };
    securityAnswerOptions: IOptionsPsKeyinInput = {
        labelKey: 'security_answer_key',
        placeHolder: 'enter_your_security_answer_key',
        fcName: 'securityQuestionField',
        group: this.securityQuestionForm,
        type: 'text'
    };
    physicalTokenOptions: IOptionsPsKeyinInput = {
        labelKey: 'physical_token_key',
        placeHolder: 'enter_the_token_recieved_key',
        fcName: 'physicalToken',
        group: this.physicalTokenForm,
        type: 'text'
    };
    smsOtpOptions: IOptionsPsInputPassword = {
        labelKey: 'otp_key',
        fcName: 'smsOtp',
        group: this.smsOTPForm,
        placeHolder: 'enter_code_generated_key'
    };
    smsOtpValidOptions: IOptionsPsKeyinInput = {
        fcName: 'smsOtpValid',
        group: this.smsOTPForm,
        type: 'text'
    };
    requestOtpOptions: IOptionsPsButtonStandard = {
        labelKey: 'ask_for_new_otp_key',
        iconName: 'paper-plane',
        group: null
    };
    biometricOptions: IOptionsPsLabel = {
        labelKey: 'biometric_key'
    };
    actionImageOptions: IOptionsPsActionImageExposed = {
        imageName: CommonUtils.getCssVariableValue('--ps-success-message-image-name')
    };
    counter = 0;
    captchaOptions: IPsCaptchaOptions = {
        fcName: 'recaptchaReactive',
        group: this.captchaForm
    };
    expiryOtpUnit: string;
    expiryOtpValue: number;
    captchaData;
    viewCaptcha = false;
    private mainLockButton = false;

    public TransactionPass = CommonBussinessConstant.TRANSACTION_PASSWORD;
    public Password = CommonBussinessConstant.PASSWORD;
    public SecurityQuest = CommonBussinessConstant.SECURITY_QUESTION;
    public OTP = CommonBussinessConstant.SMSOTP;

    public authenticationMatrixType: IAuthenticationMatrixResponse[];
    public mobileNo;
    public baseField: PsBaseFieldComponent;
    public fieldOptions: IOptionsPsBaseFieldExposed = null;
    authenticationMatrixUserName: string;
    authVerifyID = ConstantCommon.AUTH_MATRIX_VERIFY_BUTTON_ID;
    @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
            this.onVerifyClicked();
        }
    }

    constructor(public navParams: NavParams, private commonService: PsCommonService, private navService: PsNavigatorService, private formBuilder: FormBuilder,
        private omniPull: OmniPullService, private modalCtrl: ModalController, public faio: FingerprintAIO,
        private omniCommon: OmniCommonService) {
        this.initScreen();
        this.faio.isAvailable().then(result => {
            this.deviceHaveFingerPrint = result;
        }).catch(error => this.commonService.logger.log(error));
        this.userInfo = this.commonService.session.getValueOf(ConstantCommon.USERINFO);

        this.authenticationMatrixType = this.navParams.get('authenticationMatrixType');
        this.authenticationMatrixUserName = this.navParams.get('authenticationMatrixUserName');
        if (this.authenticationMatrixType) {
            this.fieldOptions = this.authenticationMatrixType[0].fieldOptions;
            this.mobileNo = this.authenticationMatrixType[0].mobileNo;
            this.baseField = this.authenticationMatrixType[0].baseField;
        }

    }

    ngOnInit() {
        if (this.mobileNo) {
            this.requestOTP();
        }
    }

    private initScreen() {

        this.passwordVO = { password: null, passwordValid: null };
        this.commonService.setFormData(this.passwordForm, this.passwordVO);
        this.transactionPasswordVO = { transactionPassword: null, transactionPasswordValid: null };
        this.commonService.setFormData(this.transactionPasswordForm, this.transactionPasswordVO);
        this.securityQuestionVO = { securityQuestion: null, securityQuestionField: null, securityQuestionValid: null };
        this.commonService.setFormData(this.securityQuestionForm, this.securityQuestionVO);
        this.OTPsmsVO = { smsOtp: null, smsOtpValid: null };
        this.commonService.setFormData(this.smsOTPForm, this.OTPsmsVO);
        const transactionPasswordValidator: Map<string, IdefaultValidators> = new Map<string, IdefaultValidators>();
        transactionPasswordValidator.set(this.transactionPasswordOptions.fcName, this.commonService.prepareValidation(false, true));
        transactionPasswordValidator.set(this.transactionPasswordValidOptions.fcName, this.commonService.prepareValidation(false, true));
        this.commonService.setDefaultValidators(transactionPasswordValidator, this.transactionPasswordForm);
        const passwordValidator: Map<string, IdefaultValidators> = new Map<string, IdefaultValidators>();
        passwordValidator.set(this.passwordOptions.fcName, this.commonService.prepareValidation(false, true));
        passwordValidator.set(this.passwordValidOptions.fcName, this.commonService.prepareValidation(false, true));
        this.commonService.setDefaultValidators(passwordValidator, this.passwordForm);
        const securityQuestionValidator: Map<string, IdefaultValidators> = new Map<string, IdefaultValidators>();
        securityQuestionValidator.set(this.securityQuestionOptions.fcName, this.commonService.prepareValidation(false, true));
        securityQuestionValidator.set(this.securityAnswerOptions.fcName, this.commonService.prepareValidation(false, true));
        this.commonService.setDefaultValidators(securityQuestionValidator, this.securityQuestionForm);
        const smsOtpValidator: Map<string, IdefaultValidators> = new Map<string, IdefaultValidators>();
        smsOtpValidator.set(this.smsOtpOptions.fcName, this.commonService.prepareValidation(false, true));
        smsOtpValidator.set(this.smsOtpValidOptions.fcName, this.commonService.prepareValidation(false, true));
        this.commonService.setDefaultValidators(smsOtpValidator, this.smsOTPForm);

        if (this.navParams.get('authenticationMatrixType')) {
            const authenticationMatrixType: IAuthenticationMatrixResponse[] = this.navParams.get('authenticationMatrixType');
            if (authenticationMatrixType.length > 0) {
                for (const authType of authenticationMatrixType) {
                    if (authType.authentionTypesEnabled.includes(CommonBussinessConstant.SMSOTP)) {
                        this.smsOTPEnabled = true;
                    } else if (authType.authentionTypesEnabled.includes(CommonBussinessConstant.TRANSACTION_PASSWORD)) {
                        this.transactionPasswordEnabled = true;
                    } else if (authType.authentionTypesEnabled.includes(CommonBussinessConstant.SECURITY_QUESTION)) {
                        this.getSecurityQuestion();
                        this.securityQuestionEnabled = true;
                        this.commonService.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.securityQuestionOptions.fcName], 1);
                        this.commonService.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.securityAnswerOptions.fcName], 1);

                    } else if (authType.authentionTypesEnabled.includes(CommonBussinessConstant.EMAILOTP)) {
                        this.smsOTPEnabled = true;
                    } else if (authType.authentionTypesEnabled.includes(CommonBussinessConstant.CAPTCHA)) {
                        this.captchaEnabled = true;
                    } else if (authType.authentionTypesEnabled.includes(CommonBussinessConstant.PHYSICAL_TOKEN)) {
                        this.physicalTokenEnabled = true;
                    } else if (authType.authentionTypesEnabled.includes(CommonBussinessConstant.FINGER_PRINT)) {
                        this.fingerPrintEnabled = true;
                    } else {
                        this.commonService.logger.error('unkown authentications type');
                    }
                }
                if (authenticationMatrixType.length === 1 && authenticationMatrixType[0].authentionTypesEnabled.includes(CommonBussinessConstant.FINGER_PRINT)) {
                    this.onlyBiometrics = true;
                }
            }
        } else {
            this.returnToRequest();
        }

        this.omniPull.getParamValOf(this.TransactionPass, 'OTPPeriodicity', this.SecurityQuest, this.OTP, 'OTPPeriodicityTime', 'Captcha', CommonBussinessConstant.REFRESH_OTP_GENERATOR, CommonBussinessConstant.OTP_GENERATOR_ATTEMPTS).then((result) => {
            if (result) {
                if (result[this.TransactionPass]) {
                    this.maxPinTrial = result[this.TransactionPass];
                }
                if (result[this.SecurityQuest]) {
                    this.maxNumberOfInvalidSecurityQuestion = result[this.SecurityQuest];
                }
                if (result.Captcha) {
                    this.maxCaptchaTrial = result.Captcha;
                }
                if (result.OTPPeriodicityTime) {
                    this.OTPPeriodTime = result.OTPPeriodicityTime;
                    this.expiryOtpValue = this.OTPPeriodTime;
                }
                if (result[this.OTP]) {
                    this.maxNumberOfInvalidSmsOTP = result[this.OTP];
                }
                if (result.OTPPeriodicity) {
                    this.OTPPeriod = result.OTPPeriodicity;
                }
                if (result[CommonBussinessConstant.REFRESH_OTP_GENERATOR]) {
                    this.refreshOtpGenerator = result[CommonBussinessConstant.REFRESH_OTP_GENERATOR];
                }
                if (result[CommonBussinessConstant.OTP_GENERATOR_ATTEMPTS]) {
                    this.otpGeneratorAttempts = result[CommonBussinessConstant.OTP_GENERATOR_ATTEMPTS];
                    this.remainingRefreshAttempts = this.otpGeneratorAttempts;
                }
            }
            if (this.OTPPeriod === CommonBussinessConstant.SECONDS) {
                this.OTPPeriodTime = this.OTPPeriodTime * ConstantCommon.CONVERT_SECONDS_TO_MILLISECONDS;
                this.expiryOtpUnit = 'seconds_key';
            } else if (this.OTPPeriod === CommonBussinessConstant.MINUTES) {
                this.OTPPeriodTime = this.OTPPeriodTime * ConstantCommon.CONVERT_MINUTS_TO_MILLISECONDS;
                this.expiryOtpUnit = 'minutes_key';
            } else if (this.OTPPeriod === CommonBussinessConstant.MONTHS) {
                this.OTPPeriodTime = this.OTPPeriodTime * ConstantCommon.CONVERT_MONTHS_TO_MILLISECONDS;
                this.expiryOtpUnit = 'months_key';
            } else if (this.OTPPeriod === CommonBussinessConstant.DAYS) {
                this.OTPPeriodTime = this.OTPPeriodTime * ConstantCommon.CONVERT_DAYS_TO_MILLISECONDS;
                this.expiryOtpUnit = 'days_key';
            }
        }).catch(error => this.commonService.logger.log(error));
    }

    varifyBiometrics() {
        this.commonService.session.getStoredValueOf(CommonBussinessConstant.USER_NAME).then(username => {
            if (username) {
                this.commonService.biometricAuth({ username }).then(bioResult => {
                    if (bioResult === ConstantCommon.BIOMETRIC_AUTH_SUCCESS) {
                        this.fingerPrintCompleted = true;
                        setTimeout(() => {
                            this.next();
                        }, 1000);
                    }
                }).catch(error => this.commonService.logger.log(error));
            }
        });
    }

    ngAfterViewInit() {
        if (this.onlyBiometrics) {
            setTimeout(() => {
                this.fingerPrintEnabled = true;
                this.varifyBiometrics();
            }, 1000);
        }
    }

    onCancelClicked() {
        this.modalCtrl.dismiss({ success: false });
    }

    onVerifyClicked(captchData?) {
        switch (this.stepper.selected.label) {
            case CommonBussinessConstant.TRANSACTION_PASSWORD: {
                this.verifyPin();
                break;
            }
            case CommonBussinessConstant.PASSWORD: {
                this.verifyPassword();
                break;
            }
            case CommonBussinessConstant.SECURITY_QUESTION: {
                this.verifySecurityQuestion();
                break;
            }
            case CommonBussinessConstant.SMSOTP: {
                this.verifyOtp();
                break;
            }
            case CommonBussinessConstant.EMAILOTP: {
                this.verifyOtp();
                break;
            }
            case CommonBussinessConstant.CAPTCHA: {
                this.verifyCaptcha(captchData);
                break;
            }
            case CommonBussinessConstant.PHYSICAL_TOKEN: {
                this.verifyPhysicalToken();
                break;
            }
        }
    }

    verifyPhysicalToken() {
        this.physicalTokenCompleted = true;
        this.next();
    }

    async verifyPassword() {
        this.verifyButtonDisabled = true;
        this.showPasswordErrorMessage = false;
        const paramData = {
            authenticationType: 'PASS',
            password: this.passwordVO.password,
            userName: this.authenticationMatrixUserName
        };
        if (this.passwordForm.get(this.passwordOptions.fcName).valid && paramData.password) {
            this.commonService.presentLoading();
            const result = await this.omniPull.omniCommon.verifyPassword(paramData);
            if (result.responseCode === 1) {
                this.passwordCompleted = true;
                this.passwordForm.get(this.passwordValidOptions.fcName).setValue(true);
                this.next();
            } else {
                if (this.maxPinTrial) {
                    this.passwordForm.reset();
                    const remainingAttempt = (result as any).remainingAttempt;
                    if (remainingAttempt <= 0) {
                        this.sendTheUserOut();
                    } else {
                        this.passwordErrorMessage = this.commonService.translate('remaining_attempts_key') + (':') + ` ${remainingAttempt} `;
                        this.showPasswordErrorMessage = true;
                    }
                }
            }
            this.verifyButtonDisabled = false;
        } else {
            this.passwordErrorMessage = this.commonService.translate('please_enter_your_password_code_key');
            this.showPasswordErrorMessage = true;
            this.verifyButtonDisabled = false;
        }
        this.commonService.dismissLoading();;
    }

    async verifyPin() {
        this.verifyButtonDisabled = true;
        this.showTransactionPasswordErrorMessage = false;
        const paramData: IAuthenticationMatrixRequest = {
            authenticationType: 'PIN',
            value: this.transactionPasswordVO.transactionPassword,
            userName: this.authenticationMatrixUserName
        };
        if (this.transactionPasswordForm.get(this.transactionPasswordOptions.fcName).valid && paramData.value) {
            this.commonService.presentLoading();
            const result = await this.omniPull.omniCommon.verifyPin(paramData);
            if (result.responseCode === 1) {
                this.transactionPasswordCompleted = true;
                this.transactionPasswordForm.get(this.transactionPasswordValidOptions.fcName).setValue(true);
                this.next();
            } else {
                if (this.maxPinTrial) {
                    this.passwordForm.reset();
                    const remainingAttempt = (result as any).remainingAttempt;
                    if (remainingAttempt <= 0) {
                        this.sendTheUserOut();
                    } else {
                        this.transactionPasswordErrorMessage = this.commonService.translate('remaining_attempts_key') + (':') + ` ${remainingAttempt} `;
                        this.showTransactionPasswordErrorMessage = true;
                    }
                }
            }
            this.verifyButtonDisabled = false;
        } else {
            this.transactionPasswordErrorMessage = this.commonService.translate('please_enter_your_pin_code_key');
            this.showTransactionPasswordErrorMessage = true;
            this.verifyButtonDisabled = false;
        }
        this.commonService.dismissLoading();
    }

    get fingerPrintIsSupported() {
        return this.commonService.isNativeMobile() && this.deviceHaveFingerPrint;
    }

    async verifySecurityQuestion() {
        this.verifyButtonDisabled = true;
        if (this.securityQuestionValue['innerValue'].itemValue) {
            this.securityQuestionForm.get(this.securityQuestionOptions.fcName).patchValue(this.securityQuestionValue['innerValue'].itemValue);
        }
        const paramData = {
            securityQuestionId: this.securityQuestionForm.get(this.securityQuestionOptions.fcName).value,
            securityQuestionAnswer: this.securityQuestionForm.get(this.securityAnswerOptions.fcName).value,
            requestType: CommonBussinessConstant.VERIFY_TYPE_SECURITY_QUESTION,
            userName: this.authenticationMatrixUserName
        };
        if (this.securityQuestionForm.valid && paramData.securityQuestionId && paramData.securityQuestionAnswer) {
            this.commonService.presentLoading();
            const result = await this.omniPull.omniCommon.verifySecurityQuestion(paramData);
            if (result && result.responseCode === 1) {
                this.securityQuestionCompleted = true;
                this.securityQuestionVO.securityQuestionValid = true;
                this.next();
            } else {
                this.securityQuestionForm.get(this.securityQuestionOptions.fcName).reset();
                this.securityQuestionForm.get(this.securityAnswerOptions.fcName).reset();
                if (this.maxNumberOfInvalidSecurityQuestion) {
                    const nbrHit = Number(this.maxNumberOfInvalidSecurityQuestion) - Number(result.ctrSecurityQuestionHit);
                    if (nbrHit <= 0) {
                        this.sendTheUserOut();
                    } else {
                        this.securityQuestionErrorMessage = this.commonService.translate('remaining_attempts_key') + (':') + ` ${nbrHit} `;
                        this.showSecurityQuestionErrorMessage = true;
                    }
                }
            }
        } else {
            this.securityQuestionErrorMessage = this.commonService.translate('please_select_your_security_question_and_its_answer_key');
            this.showSecurityQuestionErrorMessage = true;
            this.verifyButtonDisabled = false;
        }
        this.commonService.dismissLoading();
    }

    private next() {
        if (this.stepper._steps.length === this.stepper.selectedIndex + 1) {
            this.authenticationCompleted = true;
            setTimeout(() => {
                this.stepper.next();
                this.returnToRequest();
            }, 500);
        } else {
            this.moveToNextStep();
        }

    }

    returnToRequest() {
        setTimeout(() => {
            this.modalCtrl.dismiss({ success: true });
        }, 2000);

    }

    moveToNextStep() {
        this.stepper.next();
        if (this.stepper.selected.label === CommonBussinessConstant.FINGER_PRINT) {
            this.varifyBiometrics();
        }
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }

    sendTheUserOut() {
        this.omniPull.omniCommon.presentFailureAlert(null, { title: 'Maximum_trials_reached_key', message: 'user_is_blocked_key', autoHide: true });
        this.omniCommon.logout(4).then(() => {
            this.dismiss();
        });
        // PsCommonSettings.oper_ID = ConstantCommon.LOGIN_OPER_ID;
        // this.navService.navigateToMain(['./omni-login'], { queryParams: { logout: true } }).then(() => {
        //     PsCommonSettings.isLoggedIn = false;
        //     this.navService.isLoggedIn.next(false);
        //     PsCommonSettings.oper_ID = null;
        //     PsCommonSettings.pageName = null;
        //     this.omniPull.omniCommon.common.session.remove(ConstantCommon.USERINFO);
        // });
    }

    getSecurityQuestion() {
        this.securityQuestionOptions.listOfOptions = [];
        const paramData = {
            language: ConstantCommon.language,
            nbRec: ConstantCommon.MINUS_ONE,
            recToskip: ConstantCommon.recToskip,
            status: ConstantCommon.STATUS_APPROVED
        };
        this.omniPull.returnSecurityQuestion(paramData).then(result => {
            if (result && result.gridModel && result.gridModel.length > 0) {
                for (let i = 0; i < result.gridModel.length; i++) {
                    this.securityQuestionOptions.listOfOptions.push({
                        itemValue: result.gridModel[i].securityQuestionVO.SECURITY_ID,
                        description: result.gridModel[i].securityQuestionVO.DESCRIPTION
                    });
                }
            } else {
                this.commonService.logger.log('no questions available');
                this.omniPull.omniCommon.presentFailureAlert('no_questions_found');
            }
        }).catch(error => this.commonService.logger.log(error));
    }

    requestOTP() {
        this.requestOtpOptions.isDisabled = true;
        this.remainingRefreshAttempts--;
        let parameter: IAuthenticationMatrixRequest = {};
        this.loadsmsOtp = true;

        this.prepareParam(parameter).then(result => {
            parameter = result;
            parameter.authenticationType = 'SMSOTP';
            this.generateOTPRequest(parameter);
        });
    }


    /*
    * to prepare the param by sending either the mobile number(in case called from mobile number component)
    * or send the userid and username from session in the other cases
    */
    async prepareParam(parameter: IAuthenticationMatrixRequest): Promise<IAuthenticationMatrixRequest> {

        if (this.mobileNo) {
            parameter = {
                mobileNo: this.mobileNo,
            };
        } else {
            if (this.authenticationMatrixUserName) {
                parameter = {
                    userName: this.authenticationMatrixUserName,
                };
            } else {
                const username = await this.commonService.session.getStoredValueOf(CommonBussinessConstant.USER_NAME);
                parameter = {
                    userName: username,
                };
            }
        }
        return parameter;
    }

    async generateOTPRequest(parameter: IAuthenticationMatrixRequest) {
        this.omniPull.omniCommon.generateOTP(parameter).then(result => {
            setTimeout(() => {
                this.requestOtpOptions.isDisabled = false;
            }, this.refreshOtpGenerator);
            if (result && (result.responseCode === 1 || result.outputType === 'S')) {
                const message = this.commonService.translate('it_will_be_expired_in_key') + ' : ' + this.expiryOtpValue + ' ' + this.commonService.translate(this.expiryOtpUnit);
                this.omniPull.omniCommon.presentInfoAlert(null, { title: 'otp_generated_key', message });
                this.requestOtpOptions.labelKey = 'otp_generated_key';
            } else {
                this.requestOtpOptions.isDisabled = false;
            }
            if (this.otpGeneratorAttempts - this.remainingRefreshAttempts === 0) {
                this.requestOtpOptions.isDisabled = true;
            }
        }).catch(error => this.commonService.logger.log(error));
    }

    async verifyOtp() {
        this.verifyButtonDisabled = true;
        let paramData: IAuthenticationMatrixRequest;
        let MaxNumberOfInvalidOTP: number;
        let verifyType: string;
        let otpValue: string;
        MaxNumberOfInvalidOTP = this.maxNumberOfInvalidSmsOTP;
        verifyType = ConstantCommon.VERIFY_TYPE_SMS_OTP;
        otpValue = this.smsOTPForm.get(this.smsOtpOptions.fcName).value;
        let username = await this.commonService.session.getStoredValueOf(CommonBussinessConstant.USER_NAME);
        if (!username) {
            username = this.authenticationMatrixUserName;
        }
        if (otpValue && (username || this.mobileNo)) {
            paramData = {
                value: otpValue,
                maxNumberOfInvalidOTP: MaxNumberOfInvalidOTP,
                verifyType,
            };
            if (this.mobileNo) {
                paramData.mobileNo = this.mobileNo;
            } else {
                paramData.userName = username;
            }
            if ((this.smsOTPForm.get(this.smsOtpOptions.fcName) && this.smsOTPForm.get(this.smsOtpOptions.fcName).valid)) {
                this.loading = true;
                this.commonService.presentLoading();
                const result = await this.omniPull.omniCommon.verifyOtp(paramData);
                if (result) {
                    if (result.responseCode === 1 && result.outputCode === 0) {
                        if (this.fieldOptions) {
                            CommonUtils.deleteError(this.fieldOptions.group, this.fieldOptions.fcName);
                            if (this.mobileNo) {
                                this.fieldOptions.group.controls[this.fieldOptions.fcName].setValue(this.mobileNo.substring(1));
                                this.baseField.writeValue(this.mobileNo.substring(1));
                            }
                        }
                        this.smsOTPCompleted = true;
                        this.smsOTPForm.get(this.smsOtpValidOptions.fcName).setValue(true);
                        this.next();
                        this.verifyButtonDisabled = false;
                    } else if (result.responseCode === 1 && result.outputCode === -1 && result.responseDesc === 'OTP_is_expired' && result.status != ConstantCommon.USER_STATUS_BLOCKED) {
                        this.otpErrorMessageOne = this.commonService.translate('please_to_generate_a_new_one_key');
                        this.showOTPErrorMessageOne = true;
                        this.requestOtpOptions.labelKey = 'request_key';
                        this.requestButtonDisabled = false;
                    } else {
                        if (result.status === ConstantCommon.USER_STATUS_BLOCKED) {
                            this.sendTheUserOut();
                        } else {
                            let remainingAttempts: number;
                            this.smsOTPForm.get(this.smsOtpOptions.fcName).reset();
                            remainingAttempts = result.remainingAttempt;
                            if (remainingAttempts >= 0) {
                                this.otpErrorMessageOne = this.commonService.translate('invalid_otp_key');
                                this.otpErrorMessageTwo = this.commonService.translate('remaining_attempts_key') + (':') + ` ${remainingAttempts} `;
                                this.showOTPErrorMessageOne = true;
                                this.showOTPErrorMessageTwo = true;
                                this.verifyButtonDisabled = false;
                            }
                        }
                    }
                }
                this.loading = false;
            } else {
                this.otpErrorMessageOne = this.commonService.translate('please_enter_the_otp_generated_key');
                this.showOTPErrorMessageOne = true;
                this.verifyButtonDisabled = false;
            }
        }
        this.commonService.dismissLoading();
    }

    verifyCaptcha(captchData) {
        if (captchData !== undefined) {
            this.showCaptchaError = false;
            this.captchaCompleted = true;
            setTimeout(() => {
                this.next();
            }, 1000);
        } else {
            this.showCaptchaError = true;
        }
    }

}
