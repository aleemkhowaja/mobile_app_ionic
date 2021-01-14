import { CommonUtils } from './../../../../commonSRC/psServices/models/common-utils';
import { IOptionsPsComplexAlertController } from './../../../../commonSRC/psTemplates/ps-template-alert-controller/ps-template-alert-controller.template.interfaces';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { IOptionsPsContainerItem, IOptionsPsContainerList, IOptionsPsLabel } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { INotification, INotificationDetail, IOptionsPsActionButton } from './../../../../commonSRC/psServices/models/ps-common-interface';

@Component({
  selector: 'ps-complex-notification',
  templateUrl: './ps-complex-notification.component.html',
  styleUrls: ['./ps-complex-notification.component.scss']
})
export class PsComplexNotificationComponent implements OnInit {
  containerlistOptions: IOptionsPsContainerList = {};
  newLabelOptions: IOptionsPsLabel = {
    labelKey: 'recent_key',
    psClass: 'ps-complex-notification-divider-label'
  };
  earlierLabelOptions: IOptionsPsLabel = {
    labelKey: 'earlier_key',
    psClass: 'ps-complex-notification-divider-label'
  };

  loadMoreOptions: IOptionsPsActionButton = {
    labelKey: 'load_more_key',
    psClass: 'ps-complex-notification-loadmoreButton',
    group: null
  };

  itemOptions: IOptionsPsContainerItem = {
    hideImageAndIconIfNotPresent: true
  };
  public notificationsList: INotificationDetail[];

  constructor(
    public common: PsCommonService,
  ) {

  }

  ngOnInit() {
    // this.common.notificationService.pushNotification();
  }

  ngAfterViewInit() {
    this.common.notificationService.returnNotifications().then
    ((result) => {
      if (result && result.data) {
        this.notificationsList = this.common.notificationService.notificationsList.pushNotificationDetailList;
      }
    }).catch((error) => {
      this.common.logger.error(error);
    });
  }

  onPsNotificationClick(event: Event, item) {
    CommonUtils.presentInfoAlert(item.body, {
      title : item.title,
      message : item.body,
      autoHide : false,
      displayImageOrIcon: false,
      buttonsArray: [
        {
          group: null,
          labelKey: 'ok_key',
          handler: () => {
            this.makeUnseenNotification(item);
            CommonUtils.dismissAllModals();
          }
        }]
    });
  }

  onPSLoadMoreClick() {
    const notidication: INotification = {
    };
    this.common.notificationService.addNotification(notidication);
    console.log('Load More Notifications');
  }



  getNotificationItemData(item) {
    return {
      route: item.externalUrl,
      disableLoading: true,
      titleOptions: {
        labelKey: item.title,
        psClass: 'anchor-title'
      },
      descriptionOptions: {
        labelKey: item.body
      },
      iconOptions: {
        iconName: item.type === 'Info' ? 'notifications' : 'calculator',
        psClass: 'notification_icon'
      }
    };
  }
  getNotificationDate(item) {
    const date = item.notificationDate ? new Date(item.notificationDate) : new Date();
    const dateNow = new Date();
    const years = dateNow.getFullYear() - date.getFullYear();
    const mou = dateNow.getMonth() - date.getMonth();
    const days = dateNow.getDate() - date.getDate();
    let formatedDate;
    if (mou > 0 || years > 0 || days >= 7) {
      formatedDate = moment(date).format('MMMM Do YYYY, h:mm a');
    } else if (days < 7 && days >= 1) {
      formatedDate = moment(date).calendar();
    } else if (days < 1) {
      formatedDate = moment(date).fromNow();
    }

    return {
      labelKey: formatedDate,
      psClass: 'ps-complex-notification-date-label'
    };
  }
  public makeUnseenNotification(notification: INotification) {
    if (notification) {
      const index = this.notificationsList.indexOf(notification, 0);
      if (index > -1) {
        this.notificationsList[index].status = 'R';
      }
    }
  }
}
