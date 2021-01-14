import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PsButtonNotificationComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-action/ps-action-button/ps-button-notification/ps-button-notification.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsButtonNotification } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsComplexNotificationComponent } from '../../ps-complex-components/ps-complex-notification/ps-complex-notification.component';
import { PsNavigatorService } from './../../../../commonSRC/psServices/navigator/ps-navigator.service';
import { IOptionsPsActionButtonNotificationDefaultedExposed } from './ps-notification-defaulted.component.interface';
import { Badge } from '@ionic-native/badge/ngx';

@Component({
  selector: 'ps-notification-defaulted',
  templateUrl: './ps-notification-defaulted.component.html',
  styleUrls: ['./ps-notification-defaulted.component.scss'],
})
export class PsNotificationDefaultedComponent extends PsButtonNotificationComponent implements OnInit {

  @Input() options: IOptionsPsActionButtonNotificationDefaultedExposed;
  notificationDefaultOptions: IOptionsPsButtonNotification = {
    component: PsComplexNotificationComponent,
    componentOption: {},
    group: this.options.group
  };
  constructor(commonService: PsCommonService, loggerP: LoggerService, public popoverCtrl: PopoverController,
    public navService: PsNavigatorService, public badge: Badge) {
    super(commonService, loggerP, popoverCtrl, badge);
  }

  ngOnInit() {
    this.commonService.copyObject(this.notificationDefaultOptions, this.options);
  }

  ngAfterViewInit() {

    this.commonService.notificationService.returnNotificationUnreadCount().then
    ((result) => {
      if (result && result.data) {
        this.notificationDefaultOptions.notificationsCount = result.data.unReadNotificationCount;
        this.badge.set(this.notificationDefaultOptions.notificationsCount);
      }
    }).catch((error) => {
      this.logger.error(error);
    });
  }
}
