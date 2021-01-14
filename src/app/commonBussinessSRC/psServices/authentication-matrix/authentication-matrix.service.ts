import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOmniRequestBaseObject } from 'src/app/commonSRC/psServices/models/ps-common-interface';

import { PsAuthenticationMatrixComponent } from '../../psComponents/ps-complex-components/ps-authentication-matrix/ps-authentication-matrix.component';
import { IAuthenticationMatrixResponse } from '../../psComponents/ps-complex-components/ps-authentication-matrix/ps-authentication-matrix.component.interface';
import { IOptionsPsBaseFieldExposed } from '../models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from '../models/ps-commonBusiness.settings';
import { PsCommonSettings } from './../../../commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from './../../../commonSRC/psServices/ps-common/ps-common.service';
import { AuthMatrixViewer, IAuthMatrix } from './../../psComponents/ps-complex-components/ps-authentication-matrix/ps-authentication-matrix.component.interface';



@Injectable({ providedIn: 'root' })
export class AuthenticationMatrixService {

  constructor(public common: PsCommonService, private modalController: ModalController) { }

  returnAuthenticationsRequired(parameter: IOmniRequestBaseObject): Promise<IAuthenticationMatrixResponse> {
    return new Promise<IAuthenticationMatrixResponse>((resolve) => {
      parameter.apiCode = -1;
      this.common.http.commonRequestAjax(PsCommonBusinessSettings.serviceUrl.authenticationsRequiredProcess, parameter).then(response => {
        resolve(CommonUtils.isNotNull(response.data) ? response.data.gridModel : []);
      }).catch(error => this.common.logger.log(error));
    });
  }

  authenticationEnabled(username: string): Promise<IAuthMatrix> {
    return new Promise<IAuthMatrix>((resolve, reject) => {
      const paramData: IOmniRequestBaseObject = {
        code: Number(PsCommonSettings.oper_ID),
        userName: username
      };
      this.returnAuthenticationsRequired(paramData).then(authenticationResult => {
        if (authenticationResult && (authenticationResult as Array<any>).length > 0) {
          resolve({ success: true, data: authenticationResult });
        } else {
          resolve({ success: false, data: null });
        }
      }).catch(error => {
        this.common.logger.error(error);
        reject(error);
      });
    });
  }

  /*
  * initialize the OTP validation parameters and pass the value to the authentication matrix to show the OTP and handle the validation
  */
  requestOTPValidation(viewedAs: AuthMatrixViewer, mobileNo?: string, config?: IOptionsPsBaseFieldExposed, baseField?: PsBaseFieldComponent) {

    return new Promise<IAuthMatrix>(async (resolve, reject) => {
      let authEnabled;
      const otp: IAuthenticationMatrixResponse[] = [{ authentionTypesEnabled: 'OTP', mobileNo, fieldOptions: config, baseField: baseField }];
      authEnabled = { data: otp, success: true };

      this.showAndManageValidations(authEnabled, viewedAs);

    });

  }

  /*
  *get the authentications and display the required ones
  */
  authenticationMatrixProcess(viewedAs: AuthMatrixViewer, group: FormGroup): Promise<IAuthMatrix> {
    CommonUtils.presentLoading();
    return new Promise<IAuthMatrix>((resolve, reject) => {
      let username;
      this.common.session.getStoredValueOf(ConstantCommon.USER_NAME).then(name => {
        if (name) {
          username = name;
        } else {
          username = group.controls.formData.value[ConstantCommon.USER_NAME];
        }
        this.authenticationEnabled(username).then(authEnabled => {
          if (authEnabled.success) {
            this.showAndManageValidations(authEnabled, viewedAs, username).then(result => {
              resolve(result);
            }).catch(error => {
              reject(error);
            });
          } else {
            resolve({ success: true, data: null });
          }
        });
      });
    });
  }

  showAndManageValidations(authEnabled: any, viewedAs: AuthMatrixViewer, userName?: string) {
    return new Promise<IAuthMatrix>(async (resolve, reject) => {
      const data = authEnabled.data;
      switch (viewedAs) {
        case AuthMatrixViewer.MODAL: {
          const alertID = 'ps-auth-matrix-process-alert';
          this.modalController.dismiss(null, null, alertID);
          const authModal = await this.modalController.create({
            component: PsAuthenticationMatrixComponent,
            componentProps: { authenticationMatrixType: data, authenticationMatrixUserName: userName },
            cssClass: 'alert-modal',
            animated: false,
            id: alertID
          });
          await authModal.present().then(() => {
            // resolve();
          }).catch(error => this.common.logger.log(error));
          CommonUtils.dismissLoading(); // Dismiss loading that was created in ps-button-submit
          await authModal.onDidDismiss().then(data => {
            if (data['data']['success'] === true) {
              resolve({ success: true, data });
            } else {
              reject({ success: false, data: null });
            }
          }).catch(error => this.common.logger.log(error));
        }
      }
    });
  }

}
