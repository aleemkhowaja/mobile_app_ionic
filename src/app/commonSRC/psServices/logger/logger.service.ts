import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { ErrorHandlerService } from '../errorhandler/errorhandler.service';
import { CommonUtils } from '../models/common-utils';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private errorHandlerService: ErrorHandlerService) { }

  public LOG_NORMAL = 1;
  public LOG_DEBUG = 2;
  public LOG_VERBOSE = 3;
  public LOG_ERROR = 4;

  public log(...message: any[]): void {
    if (environment.production && CommonUtils.isNativeMobile()) {
      this.errorHandlerService.handleLoggerServiceMessage(message, this.errorHandlerService.LOG_DEBUG);
    } else if (!environment.production) {
      console.log(...message);
    }
  }

  public warn(...message: any[]): void {
    if (environment.production && CommonUtils.isNativeMobile()) {
      this.errorHandlerService.handleLoggerServiceMessage(message, this.errorHandlerService.LOG_WARN);
    } else if (!environment.production) {
      console.warn(...message);
    }
  }

  public info(...message: any[]): void {
    if (environment.production && CommonUtils.isNativeMobile()) {
      this.errorHandlerService.handleLoggerServiceMessage(message, this.errorHandlerService.LOG_INFO);
    } else if (!environment.production) {
      console.info(...message);
    }
  }

  public error(...message: any[]): void {
    if (environment.production && CommonUtils.isNativeMobile()) {
      this.errorHandlerService.handleLoggerServiceMessage(message, this.errorHandlerService.LOG_ERROR);
    } else if (!environment.production) {
      console.error(...message);
    }
  }

  public trace(...message: any[]): void {
    if (environment.production && CommonUtils.isNativeMobile()) {
      this.errorHandlerService.handleLoggerServiceMessage(message, this.errorHandlerService.LOG_DEBUG);
    } else if (!environment.production) {
      console.trace(...message);
    }
  }
  public clear() {
    console.clear();
  }

  public table(...message: any[]) {
    console.table(...message);
  }
}
