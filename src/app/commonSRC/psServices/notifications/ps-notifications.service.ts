import { Injectable } from '@angular/core';
import { Badge } from '@ionic-native/badge/ngx';
import { Platform } from '@ionic/angular';
import { FCM } from 'plugins/cordova-plugin-fcm-with-dependecy-updated/ionic/ngx/FCM';
import { HttpService } from '../http/http.service';
import { LoggerService } from '../logger/logger.service';
import { ConstantCommon } from '../models/common-constant';
import { INotification, INotificationDetail } from '../models/ps-common-interface';
import { PsCommonSettings } from '../models/ps-common.settings';

/**
 * @author Heba.Hassan
 * @since 22/01/2020
 * @summary initialize and configure the firebase notifications service
 */

@Injectable({
  providedIn: 'root'
})
export class PsNotificationsService {
  public notificationsList: INotification = {
    pushNotificationDetailList: []
  };
  private userToken: string;
  constructor(
    public fcm: FCM,
    private badge: Badge,
    private platform: Platform,
    public logger?: LoggerService,
    public http?: HttpService,
  ) {
    // this.platform.ready().then(() => {
    //   this.initFirbaseNotificationsConfig();
    // });

  }

  async returnNotifPermission(counter): Promise<boolean> {
    if (counter === ConstantCommon.FCM_REQUEST_PERM_MAX_COUNTER) {
      return false;
    }
    const hasPerm: boolean = await this.fcm.hasPermission();
    if (hasPerm) {
      return hasPerm;
    } else {
      const wasPermissionGiven: boolean = await this.fcm.requestPushPermission({
        ios9Support: {
          timeout: 10,  // How long it will wait for a decision from the user before returning `false`
          interval: 0.3 // How long between each permission verification
        }
      });
      if (wasPermissionGiven) {
        return wasPermissionGiven;
      } else {
        counter++;
        return this.returnNotifPermission(counter);
      }
    }
  }

  initFirbaseNotificationsConfig() {
    this.platform.ready().then(async () => {
      this.badge.requestPermission();
      this.badge.set(0);

      const permReturned = await this.returnNotifPermission(0);
      if (permReturned && ConstantCommon.FCM_TOKEN == null) {
        // get FCM token then print out to the browser console.
        const fcmToken: string = await this.fcm.getToken();
        this.userToken = fcmToken;
        ConstantCommon.FCM_TOKEN = fcmToken;
      }

      this.createNotificationDeviceToken();
      // refresh the FCM token.
      this.fcm.onTokenRefresh().subscribe(token => {
        this.userToken = token;
        this.logger.log('in onTokenRefresh:' + this.userToken);
        if (this.userToken) {
          ConstantCommon.FCM_TOKEN = token;
          this.createNotificationDeviceToken();
        }
      });
    });
  }

  createNotificationDeviceToken(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (ConstantCommon.FCM_TOKEN) {
        const request = { deviceToken: ConstantCommon.FCM_TOKEN };
        this.http.commonRequestAjax(PsCommonSettings.serviceUrl.notificationDeviceToken, request).then(result => {
          resolve(result);
        }).catch(error => {
          this.logger.log(error);
          reject(error);
        });
      } else {
        reject('FCM token is null');
      }
    });
  }
  public returnNotifications() {
    return new Promise<any>((resolve, reject) => {
      return this.http.commonRequestAjax(PsCommonSettings.serviceUrl.returnNotifications,
        { operId: ConstantCommon.NOTIFICATION_OPER_ID }
      ).then
        ((result) => {
          if (result && result.data && result.data.gridModel && result.data.gridModel.length > 0) {
            this.notificationsList.pushNotificationDetailList = result.data.gridModel as INotificationDetail[];
            resolve(result);
          }
        }).catch((error) => {
          this.logger.error(error); reject(error);
        });
    });


  }

  public returnNotificationUnreadCount() {
    return new Promise<any>((resolve, reject) => {
      return this.http.commonRequestAjax(PsCommonSettings.serviceUrl.returnNotificationUnreadCount,
        { operId: ConstantCommon.NOTIFICATION_OPER_ID }
      ).then
        ((result) => {
          if (result && result.data) {
            resolve(result);
          }
        }).catch((error) => {
          this.logger.error(error); reject(error);
        });
    });
  }

  public addNotification(notification: INotificationDetail) {
    if (!this.notificationsList) {
      this.notificationsList = { pushNotificationDetailList: [] };
    }
    this.notificationsList.pushNotificationDetailList.unshift(notification);
  }
  public removeNotification(notification: INotification) {
    if (notification) {
      const index = this.notificationsList.pushNotificationDetailList.indexOf(notification, 0);
      if (index > -1) {
        this.notificationsList.pushNotificationDetailList.splice(index, 1);
      }
    }
  }



}
