import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { HybridKeyService } from '../hybridkey/hybridkey.service';
import { LoggerService } from '../logger/logger.service';
import { ConstantCommon } from '../models/common-constant';
import { CommonUtils } from '../models/common-utils';
import { PsApplicationSettings } from '../models/ps-app-settings';
import { IHTTPResponseResult } from '../models/ps-common-interface';
import { PsCommonSettings } from '../models/ps-common.settings';
import { ConnectionStatus, PsNetworkService } from '../network/ps-network.service';
import { SessionService } from '../session/session.service';
import { Events } from '../Event/event.service';


/* nabil feghali - OMNI common security  */

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private myHeaders = new HttpHeaders();
  constructor(public http: HttpClient, private session: SessionService, private events: Events, private logger: LoggerService, private psNetworkService: PsNetworkService, private hybridkey: HybridKeyService) { }

  sendRequest(url: string, theParams?: any, timeOut?: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.logger.log(PsApplicationSettings.MAIN_CONFIG.SERVICE_URL + url);
      // let _callStack: Array<string> = new Array<string>();
      // (new Error().stack).split("at").filter((x) => { return x.includes("webpackJsonp") }).forEach((str) => { let sp = str.replace(/ *\([^)]*\) */g, "").split("."); _callStack.push(`at  ${sp[sp.length - 1].trim() + '()'}  in ${sp[sp.length - 2].trim() + '.Class'}`) });
      // this.logger.log("%c Stack Call:", 'background: #5E35B1; color: #FFF', _callStack);
      const sub = this.http.request('POST', PsApplicationSettings.MAIN_CONFIG.SERVICE_URL + url, {
        body: theParams ? theParams : {}, // set as empty json in case it was null by Richie for #BUG 818945
        headers: this.myHeaders,
        observe: 'response',
        reportProgress: true,
        responseType: 'json'
      }).pipe(timeout(timeOut)).subscribe(res => {

        if (res && res.hasOwnProperty('ok') && res.ok) {
          let finalResponse: any = res.body;
          const enableEcryption = this.session.getValueOf(PsCommonSettings.ENCRYPT_PARAMS);

          /* nabil feghali - OMNI common security  */
          if (finalResponse && finalResponse.hasOwnProperty('pathResp')) {
            const decryptedPathParam = this.hybridkey.decryptTransportMessage(finalResponse.pathResp);
            finalResponse = JSON.parse(decryptedPathParam);
          }
          /* nabil feghali - OMNI common security - end  */

          if (enableEcryption && finalResponse && finalResponse.hasOwnProperty('pathParam') && finalResponse.hasOwnProperty('key') && finalResponse.hasOwnProperty('iv')) {
            this.logger.log(`%c Response: [${res.url.split('/').pop()}]`, 'background: #36f746; color: #000', res);
            const retData: IHTTPResponseResult = res.body;
            if (finalResponse) {
              try {
                /* nabil feghali - OMNI common security  */
                finalResponse = this.decryptResponse(finalResponse);

                if (url.includes(ConstantCommon.LOGIN_USER_URL)
                  && finalResponse.hasOwnProperty(ConstantCommon.SESSION_ID)
                  && finalResponse[ConstantCommon.SESSION_ID] != null
                  && finalResponse[ConstantCommon.SESSION_ID] != '') {
                  this.session.append(ConstantCommon.SESSION_ID, finalResponse[ConstantCommon.SESSION_ID]);
                }

                if (finalResponse.hasOwnProperty(ConstantCommon.SERVER_LOGIN_TOKEN)
                  && finalResponse[ConstantCommon.SERVER_LOGIN_TOKEN] != null
                  && finalResponse[ConstantCommon.SERVER_LOGIN_TOKEN] != '') {
                  this.session.append(ConstantCommon.SERVER_LOGIN_TOKEN, finalResponse[ConstantCommon.SERVER_LOGIN_TOKEN]);
                }


                if (finalResponse.hasOwnProperty(ConstantCommon.SERVER_AUTH_TOKEN)
                  && finalResponse[ConstantCommon.SERVER_AUTH_TOKEN] != null
                  && finalResponse[ConstantCommon.SERVER_AUTH_TOKEN] != '') {
                  this.session.append(ConstantCommon.SERVER_AUTH_TOKEN, finalResponse[ConstantCommon.SERVER_AUTH_TOKEN]);
                }

                /* nabil feghali - OMNI common security - end  */

              } catch (err) {
                this.logger.error(retData.key);
                this.logger.error(this.session.getValueOf(ConstantCommon.PRIVATE_KEY));
                this.logger.error(url);
              }
              this.logger.log(`%c Decrypted: [${res.url.split('/').pop()}]`, 'background: #f24eda; color: #FFF', finalResponse);
              const validity = this.processResponse(finalResponse, url, theParams);
              if (validity && !validity.isValid) {
                reject({
                  success: false,
                  error: null,
                  data: finalResponse,
                  suppressMessage: true
                });
                return;
              }

              resolve({
                success: true,
                error: null,
                data: finalResponse,
              });
            } else {
              reject({
                success: false,
                error: null,
                data: finalResponse,
                suppressMessage: true
              });
            }
          } else {
            const result = this.checkStatus(finalResponse);
            this.logger.log(`%c Response: [${res.url.split('/').pop()}]`, 'background: #36f746; color: #000', res);
            const validity = this.processResponse(finalResponse, url, theParams);
            this.handleSecurityError(finalResponse);

            if (validity && !validity.isValid) {
              reject({
                success: false,
                error: null,
                data: finalResponse,
                suppressMessage: true
              });
              return;
            }
            if (result.success) {
              resolve({
                success: true,
                error: null,
                data: finalResponse
              });
            } else {
              resolve({
                success: false,
                error: null,
                data: finalResponse
              });
            }
          }
        }

      },
        (err) => {
          if (err && err.error) {
            if (err.error === 'anotherSession') {
              this.events.publish('user:endedByOtherActiveSession');
              return;
            }
          }
          if (err instanceof HttpErrorResponse) {
            switch ((err as HttpErrorResponse).status) {
              case 500:
                this.logger.error('%c [' + String.fromCharCode(9888) + ']' + ' Something Went Wrong On The Server!', 'background: #eeff05; color: #000');
                break;
              // Commented temporarly until fixing the case to have specific error code handling when restarting the server
              // if (this.session.getValueOf(ConstantCommon.USER_IS_LOGGED_IN)) {
              //   this.events.publish("Navigator:logout");
              // }
              default:
                throwError(new HttpErrorResponse(err));

            }
            this.logger.error('Server error please contact administrator, ' + err.message);
            this.logger.error('%c ERROR --------------------------------------------------------â¤µ', 'background: #222; color: #FF5959');
            this.logger.error(err);
            this.logger.error('%c END ----------------------------------------------------------â¤´', 'background: #222; color: #FF5959');
            resolve({
              success: false,
              error: 'Server error please contact administrator, ' + err.message,
              data: null
            }
            );
          } else if (err instanceof TimeoutError) {
            sub.unsubscribe();
            reject(CommonUtils.translate('request_timeout_key'));
            return false;
          } else {
            this.logger.error('[' + String.fromCharCode(9888) + ']', 'Server is down or your cors extension need reload', err);
            resolve({
              success: false,
              error: 'Unknown Error',
              data: null
            });
          }

        });

      // commented by Richie and replaced with request.pipe(timeout(timeOut)) since the timeout section was triggered in case of cust war even if the response was returned successfully
      // if (timeOut) {
      //   setTimeout(() => {
      //     sub.unsubscribe();
      //     reject(CommonUtils.translate('request_timeout_key'));
      //     return false;
      //   }, timeOut);
      // }
    });

  }
  public async commonRequestAjax(url: string, theParams?: any): Promise<any> {
    const connectionStatus: ConnectionStatus = await this.psNetworkService.handleNetworkNotifications();
    if (connectionStatus === 0) {
      return;
    }
    return new Promise<any>((resolve, reject) => {
      return this.sendRequest(url, theParams, PsCommonSettings.requestTimeOut).then((response) => {
        resolve(response);
      }).catch((error) => {
        if (error && error.type !== 'U' && !(error.type && error.outputCode) && !error.suppressMessage) {
          CommonUtils.presentFatalAlert(error);
        }
        CommonUtils.dismissLoading();
        reject(error);
        return error;
      });
    });
  }
  // ARagab : This func used to call any third party api [like : prayers api]
  public httpGet(url: string, theParams?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(url, theParams).subscribe(res => {
        resolve(res);
      },
        (err) => {
          reject(err);
          this.logger.error(err);
        });
    });
  }
  private processResponse(finalResponse: any, url: string, theParams?: any): any {
    // gilbertAndary removed the below in order to be compatible with latest code 11-11-2019
    // if (!url.includes('loginProcess') && (!url.includes('logoutUser'))) {
    const sessionId = this.session.getValueOf(ConstantCommon.SESSION_ID);
    const publicKey = this.session.getValueOf(ConstantCommon.PUBLIC_KEY);
    const ENCRYPT_PARAMS = this.session.getValueOf(PsCommonSettings.ENCRYPT_PARAMS);
    if (finalResponse && finalResponse.hasOwnProperty(ConstantCommon.frontEndPublicKeyToSend) && ENCRYPT_PARAMS) {

      if (publicKey && String(finalResponse[ConstantCommon.frontEndPublicKeyToSend]) !== String(this.hybridkey.hashcode(publicKey))) {
        this.events.publish('user:endedByOtherActiveSession');
        return {
          showMessage: false,
          isValid: false
        };
      }
    }
    if (finalResponse && finalResponse.hasOwnProperty(ConstantCommon.SESSION_ID) && finalResponse[ConstantCommon.SESSION_ID] != '') {
      if (sessionId && String(finalResponse[ConstantCommon.SESSION_ID]) !== String(sessionId)) {
        this.events.publish('user:endedByOtherActiveSession');
        return {
          showMessage: false,
          isValid: false
        };
      }
    }
    if (finalResponse && finalResponse.entity) {
      let entityObj = null;
      try {
        entityObj = JSON.parse(finalResponse.entity);
      }
      catch (e) {
        this.logger.error(e);
      }
      // outputCode -3 means security error
      if (entityObj != null && entityObj.outputCode === -3 && entityObj.outputType == 'SEC_ERR') {
        return {
          showMessage: false,
          isValid: false
        };
      }
    }

    if ((url.includes(PsCommonBusinessSettings.serviceUrl.login) || url.includes(PsCommonSettings.serviceUrl.authenticate))
      && finalResponse && finalResponse.outputType
      && (((finalResponse.outputType).toString()).toLowerCase() === 'e' || ((finalResponse.outputType).toString()).toLowerCase() === 'f')) {

      this.session.clearUserSession();

    }

    return this.checkOutputType(finalResponse);
  }

  private handleSecurityError(finalResponse) {
    if (finalResponse && finalResponse.entity) {
      let entityObj = null;
      try {
        entityObj = JSON.parse(finalResponse.entity);
      }
      catch (e) {
        this.logger.error(e);
      }
      // -3 = force logout
      if (entityObj != null && entityObj.outputCode === -3 && entityObj.errorCode === -3) {
        this.events.publish('user:endedByOtherActiveSession', (entityObj.errorCode));
      }
    }
  }

  checkOutputType(finalResponse) {
    if (finalResponse && finalResponse.outputType) {
      if ((((finalResponse.outputType).toString()).toLowerCase() !== 's') && (((finalResponse.outputType).toString()).toLowerCase() !== 'i') && (((finalResponse.outputType).toString()).toLowerCase() !== 'sc')) {
        if (((finalResponse.outputType).toString()).toLowerCase() === 'e') {
          CommonUtils.presentFatalAlert(finalResponse.outputNotification);
        } else if (((finalResponse.outputType).toString()).toLowerCase() === 'f') {
          CommonUtils.presentFailureAlert(finalResponse.outputNotification);
        }
        return {
          showMessage: false,
          isValid: false
        };
      } else {
        if (((finalResponse.outputType).toString()).toLowerCase() === 'i') {
          CommonUtils.presentInfoAlert(finalResponse.outputNotification);
        } else if (((finalResponse.outputType).toString()).toLowerCase() === 's' && finalResponse.outputCode > 0) {
          CommonUtils.presentSuccessAlert(finalResponse.outputNotification, { autoHide: true });
        }
        return {
          isValid: true
        };
      }
    }
    return {
      isValid: true
    };
  }

  /**
   * function used to send request with file content
   * @author RichardZourob
   * @param url
   * @param theParams
   */
  public fileRequest(url: string, theParams?: any): Observable<HttpEvent<{}>> {
    const req = new HttpRequest('POST', PsApplicationSettings.MAIN_CONFIG.SERVICE_URL + url, theParams,
      {
        headers: this.myHeaders,
        reportProgress: true,
        responseType: 'text'
      });

    return this.http.request(req);
  }

  checkStatus(retData) {
    if (retData) {
      if (retData.hasOwnProperty('errorDesc') || retData.hasOwnProperty('errorCode')) {
        this.logger.warn('%c [' + String.fromCharCode(9888) + ']' + ' Something Went Wrong On The Server!', 'background: #eeff05; color: #000', retData.hasOwnProperty('errorDesc') ? retData.errorDesc : '', retData.hasOwnProperty('errorCode') ? retData.errorCode : '');
        return ({
          success: false,
          error: null,
          data: retData
        });
      } else {
        return ({
          success: true,
          error: null,
          data: retData
        });
      }
    } else {
      this.logger.warn('%c [' + String.fromCharCode(9888) + ']' + 'Either An error in enc/dec or your are not handling correctly your service! the body was returned as null', 'background: #eeff05; color: #000');
      return ({
        success: true,
        error: null,
        data: retData
      });
    }
  }

  decryptResponse(retData): string {

    /* nabil feghali - OMNI common security  */
    const pKey = this.session.getValueOf(ConstantCommon.PRIVATE_KEY);
    return this.hybridkey.decryptResponse(retData, pKey);
  }

}
