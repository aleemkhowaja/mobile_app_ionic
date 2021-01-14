import { Component, Input, OnInit } from '@angular/core';
import { Badge } from '@ionic-native/badge/ngx';
import { PopoverController } from '@ionic/angular';
import { PsComplexNotificationComponent } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-notification/ps-complex-notification.component';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { LoggerService } from '../../../../../psServices/logger/logger.service';
import { INotificationDetail, IOptionsPsActionButton, IOptionsPsBaseActionPopOver, IOptionsPsButtonNotification } from '../../../../../psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../../psServices/ps-common/ps-common.service';
import { PsActionButtonComponent } from '../ps-action-button.component';


@Component({
  selector: 'ps-button-notification',
  templateUrl: './ps-button-notification.component.html',
  styleUrls: ['./ps-button-notification.component.scss'],
})
export class PsButtonNotificationComponent extends PsActionButtonComponent implements OnInit {
  @Input() options: IOptionsPsButtonNotification;
  notificationOptions: IOptionsPsActionButton = {
    labelKey: 'notification_key',
    group: this.options.group
  };
  onClickNotificaion: boolean;
  popoverOptions: IOptionsPsBaseActionPopOver = {};
  constructor(public commonService: PsCommonService, loggerP: LoggerService, public popoverCtrl: PopoverController
    , public badge: Badge) {
    super(commonService, loggerP);
  }

  ngOnInit() {
    this.onClickNotificaion = false;
    this.commonService.copyObject(this.notificationOptions, this.options);
    if (CommonUtils.isNativeMobile()) {
      this.commonService.notificationService.fcm.onNotification().subscribe(data => {
        this.options.notificationsCount += 1;
        this.badge.increase(1);

        const notification = data as INotificationDetail;
        this.commonService.notificationService.addNotification(notification);

        if (data.wasTapped) {
          this.onClick.emit({ component: PsComplexNotificationComponent, componentOption: this.notificationOptions });

        } else {
        }
      });
    }
  }

  onNotificationClicked(event: Event) {
    if (this.onClickNotificaion) {
      if (this.common.notificationService.notificationsList.pushNotificationDetailList) {
        for (let notification of this.common.notificationService.notificationsList.pushNotificationDetailList) {
          notification.status = 'R';
        }
      }
    }
    this.options.notificationsCount = 0;

    this.onClickNotificaion = true;
    this.popoverOptions = {
      component: this.options.component,
      event: event,
      psClass: 'custom-notification-popover',
      componentOption: this.options.componentOption
    };
    this.onClickNotificaion = true;
  }
}
