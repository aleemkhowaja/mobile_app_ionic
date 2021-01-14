import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';

import { IOmniResponseBaseObject, IOmniUserCO, IOptionsPsBaseFieldExposed } from '../../../psServices/models/ps-common-bussiness-interfaces';
import { ICommonInterfaceRequest } from './../../../psServices/models/ps-common-bussiness-interfaces';


export interface IAuthMatrix {
    success: boolean;
    data: any;
}

export interface IAuthenticationMatrixResponse extends IOmniResponseBaseObject {
    authentionTypesEnabled?: string;
    authenticationTypesDesc?: string;
    status?: string;
    omniUserCO?: IOmniUserCO;
    remainingTime?: number;
    remainingAttempt?: number;
    mobileNo?: string;
    fieldOptions?: IOptionsPsBaseFieldExposed;
    baseField?: PsBaseFieldComponent;
}

export enum AuthMatrixViewer {
    MODAL = 'Modal'
}

export interface IAuthenticationMatrixRequest extends ICommonInterfaceRequest {
    mobileNo?: string;
    authenticationType?: string;
    operationKey?: string;
    value?: string;
    verifyType?: string;
    maxNumberOfInvalidOTP?: number;
}

export interface IAuthTransactionPassword {
    transactionPassword: string;
    transactionPasswordValid: boolean;
}

export interface IAuthPassword {
    password: string;
    passwordValid: boolean;
}

export interface IAuthSecurityQuestion {
    securityQuestion: string;
    securityQuestionField: number;
    securityQuestionValid: boolean;
}

export interface IAuthSmsOTP {
    smsOtp: string;
    smsOtpValid: boolean;
}

export interface IAuthCaptcha {
    captcha: string;
    captchaValid: boolean;
}