import { ErrorHandler, Injectable } from '@angular/core';
import { FirebaseCrashlytics } from '@ionic-native/firebase-crashlytics/ngx';
import { PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';
import { environment } from '../../../../environments/environment';
import { CommonUtils } from '../models/common-utils';



@Injectable({ providedIn: 'root' })
export class ErrorHandlerService implements ErrorHandler {

  public crashlytics = null;

  public LOG_VERBOSE = 2;
  public LOG_DEBUG = 3;
  public LOG_INFO = 4;
  public LOG_WARN = 5;
  public LOG_ERROR = 6;

  public LOG_LEVEL_ALL = 'ALL';
  private logLevelInterval = PsApplicationSettings.MAIN_CONFIG.LOG_LEVEL_INTERVAL ? PsApplicationSettings.MAIN_CONFIG.LOG_LEVEL_INTERVAL : 300;
  private logLevelEnabledTime = null;
  private logLevelByUser = null;
  private userName = null;

  constructor(private firebaseCrashlytics: FirebaseCrashlytics) {

  }

  initialiseCrashlytics() {

    if (environment.production && CommonUtils.isNativeMobile()) {
      this.crashlytics = this.firebaseCrashlytics.initialise();
    }
  }

  initializeLogLevelByUser(userName: string, logLevelByUser: string) {

    this.userName = userName;
    this.logLevelByUser = logLevelByUser;
    if (this.LOG_LEVEL_ALL === logLevelByUser) {
      this.logLevelEnabledTime = new Date();
    } else {
      this.logLevelEnabledTime = null;
      this.logLevelByUser = null;
    }
  }

  resetLogLevelByUser() {

    this.logLevelEnabledTime = null;
    this.logLevelByUser = null;
    this.userName = null;
  }

  isLogLevelAllEnabled(): boolean {
    if (this.LOG_LEVEL_ALL === this.logLevelByUser) {
      const checkDate = new Date(this.logLevelEnabledTime.getTime() + (this.logLevelInterval * 1000));
      if (checkDate.getTime() >= new Date().getTime()) {
        return true;
      } else {
        this.logLevelEnabledTime = null;
        this.logLevelByUser = null;
        return false;
      }
    }
    return false;
  }

  addLoggedInUserTrace(): string {
    return ' [user=' + (this.userName ? this.userName : 'UNKNOWN_USER') + ', date=' + new Date().toISOString() + '] ';
  }
  /**
   * function used to handle logger error from logger.service provided from console.log(), console.error() ....
   */
  handleLoggerServiceMessage(message: any, level: number) {
    if (environment.production && CommonUtils.isNativeMobile()) {
      /*in case the object is not yet initialized, then initialize it*/
      if (this.crashlytics === undefined || this.crashlytics == null) {
        this.crashlytics = this.firebaseCrashlytics.initialise();
      }

      if (this.isLogLevelAllEnabled()) {
        if (level === this.LOG_VERBOSE) {
          this.crashlytics.logPriority(this.LOG_VERBOSE, 'OMNI Logger Verbose: ' + this.addLoggedInUserTrace(), JSON.stringify(message));
        }

        if (level === this.LOG_DEBUG) {
          this.crashlytics.logPriority(this.LOG_DEBUG, 'OMNI Logger Debug: ' + this.addLoggedInUserTrace(), JSON.stringify(message));
        }

        if (level === this.LOG_INFO) {
          this.crashlytics.logPriority(this.LOG_INFO, 'OMNI Logger Info: ' + this.addLoggedInUserTrace(), JSON.stringify(message));
        }

        if (level === this.LOG_WARN) {
          this.crashlytics.logPriority(this.LOG_WARN, 'OMNI Logger Warn: ' + this.addLoggedInUserTrace(), JSON.stringify(message));
        }
      }

      if (level === this.LOG_ERROR) {
        if (!this.isLogLevelAllEnabled() && this.excludeErrors(message)) {
          return;
        }
        this.crashlytics.logPriority(this.LOG_ERROR, 'OMNI Logger Error: ' + this.addLoggedInUserTrace(), JSON.stringify(message));
      }
    }
  }

  /**
   * function used to handle runtime error like typescript error, or any other error not provided from logger.service.
   */
  handleError(error: any) {

    if (environment.production && CommonUtils.isNativeMobile()) {
      /*in case the object is not yet initialized, then initialize it*/
      if (this.crashlytics === undefined || this.crashlytics == null) {
        this.crashlytics = this.firebaseCrashlytics.initialise();
      }

      this.crashlytics.logException('OMNI Runtime Error: ' + + this.addLoggedInUserTrace() + ' error.message: ' + error.message + ' error.stack: ' + error.stack);
    }
  }

  /**
   * prevent submitting specific errors to crashlytics console
   */
  excludeErrors(message: any) {
    // bug #1033045
    // exclude assets not found 404
    // for example exclude the following error : HttpErrorResponse {headers: HttpHeaders, status: 404, statusText: "OK", url: "http://localhost/assets/html/EN/default_banners/housing.html" }
    if (message !== undefined && message != null &&
      message.length === 2
      && message[1].constructor !== undefined && message[1].constructor != null && message[1].constructor.name === 'HttpErrorResponse'
      && message[1].status === 404
      && message[1].url !== undefined && message[1].url != null && message[1].url.includes('/assets/')) {
      return true;
    }
    return false;
  }
}
