import { Component, Input, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsButtonCallComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-action/ps-action-button/ps-button-call/ps-button-call.component';
import { PsBaseActionComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-action/ps-base-action.component';
import { IOptionsPsActionButton, IOptionsPsBaseActionPopOver, IOptionsPsButtonCall, IOptionsPsButtonFabList } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsActionButtonEmailUsDefaultedComponent } from '../../ps-button-email-us/ps-email-us-defaulted/ps-email-us-defaulted.component';
import { IOptionsPsActionButtonEmailUsDefaultedExposed } from '../../ps-button-email-us/ps-email-us-defaulted/ps-email-us-defaulted.component.interface';
import { IOptionsPsActionButtonNotificationDefaultedExposed } from '../../ps-button-notification/ps-notification-defaulted/ps-notification-defaulted.component.interface';
import { PsDraftsReportComponent } from '../../ps-drafts-report/ps-drafts-report.component';
import { PsComplexInfoComponent } from '../ps-complex-info/ps-complex-info.component';
import { PsComplexNotificationComponent } from '../ps-complex-notification/ps-complex-notification.component';
import { PsNotificationsService } from './../../../../commonSRC/psServices/notifications/ps-notifications.service';
import { IOptionsPsComplexMenuReachExposed } from './ps-complex-menu-reach.component.interfaces';

@Component({
  selector: 'ps-complex-menu-reach',
  templateUrl: './ps-complex-menu-reach.component.html',
  styleUrls: ['./ps-complex-menu-reach.component.scss'],
})
export class PsComplexMenuReachComponent extends PsBaseActionComponent implements OnInit {

  @Input() options: IOptionsPsComplexMenuReachExposed = {

  };
  public parameters;
  callOptions: IOptionsPsButtonCall = {
    iconName: this.commonService.isWebLayout() ? 'customer-service-color' : 'call',
    psClass: 'ps-menu-reach-background',
    labelKey: 'call_us_key',
    group: null
  };
  infoOptions: IOptionsPsActionButton = {
    iconName: this.commonService.isWebLayout() ? 'info-color' : 'information-circle-outline',
    psClass: 'ps-menu-reach-background',
    labelKey: 'info_key',
    group: null
  };
  notificationOptions: IOptionsPsActionButtonNotificationDefaultedExposed = {
    iconName: this.commonService.isWebLayout() ? 'bell-color' : 'notifications',
    psClass: 'ps-menu-reach-background',
    labelKey: 'notifications_key',
    notificationsCount: 0,
    group: null
  };
  emailUsOptions: IOptionsPsActionButtonEmailUsDefaultedExposed = {
    iconName: this.commonService.isWebLayout() ? 'email-color' : 'mail',
    psClass: 'ps-menu-reach-background',
    labelKey: 'email_us_key',
    group: null
  };
  pendingApprovalOptions: IOptionsPsActionButton = {
    iconName: this.commonService.isWebLayout() ? 'checklist-color' : 'bookmark',
    psClass: 'ps-menu-reach-background',
    labelKey: 'to_do_key',
    group: null
  };
  popoverOptions: IOptionsPsBaseActionPopOver = {};
  fabListOptions: IOptionsPsButtonFabList = {
    // gilbert andary DO NOT change order of this array. 
    // you can add new fields but do not change the order. 
    // if you want to change the order notify me before
    mainProperties: {
      iconName: 'chevron-left',
      group: null
    },
    startFabList: [
      {
        group: null,
        iconName: this.infoOptions.iconName,
        labelKey: this.infoOptions.labelKey,
        handler: () => {
          this.faqClickHandler();
        }
      },
      {
        group: null,
        iconName: this.callOptions.iconName,
        labelKey: this.callOptions.labelKey,
        handler: (event) => {
          const callButton: PsButtonCallComponent = new PsButtonCallComponent(this.omniPull.omniCommon.common, this.omniPull.omniCommon.common.logger, this.callNumber, this.omniPull);
          callButton.onCallClicked(event);
        }
      },
      {
        group: null,
        iconName: this.notificationOptions.iconName,
        labelKey: this.notificationOptions.labelKey,
        handler: () => {
          this.notificationClickHandler();
        }
      },
      {
        group: null,
        iconName: this.emailUsOptions.iconName,
        labelKey: this.emailUsOptions.labelKey,
        handler: async (event) => {
          const emailUS: PsActionButtonEmailUsDefaultedComponent = new PsActionButtonEmailUsDefaultedComponent(this.omniPull.omniCommon.common, this.omniPull.omniCommon.common.logger, this.omniPull, this.emailComposer);
          await emailUS.init();
          emailUS.onEmailClicked(event);
        }
      }
    ],
    group: null
  };
  constructor(private omniPull: OmniPullService,public commonService?: PsCommonService, public psNotificationsService?: PsNotificationsService,
    public callNumber?: CallNumber, private emailComposer?: EmailComposer) {
    super(omniPull.omniCommon.common, omniPull.omniCommon.common.logger);
  }
  ngOnInit() {
    this.omniPull.omniCommon.common.copyObject(this.callOptions, this.options.callOptions);
    this.omniPull.omniCommon.common.copyObject(this.notificationOptions, this.options.notificationOptions);
    this.omniPull.omniCommon.common.copyObject(this.pendingApprovalOptions, this.options.pendingApprovalOptions);

    // this.notificationOptions.notificationsCount = this.psNotificationsService.returnUnseenNotificationsCount();
  }
  faqClickHandler() {
    this.onClick.emit({ component: PsComplexInfoComponent, title: 'info_key' });
  }
  notificationClickHandler() {
    this.onClick.emit({ component: PsComplexNotificationComponent, componentOption: this.notificationOptions, title: 'notifications_key' });
  }
  PendingApprovalClickHandler(event: Event) {
    this.onClick.emit({ component: PsDraftsReportComponent, title: 'to_do_key'});
  }

  onPopoverDismiss($event) {
    this.popoverOptions = {};
  }


}
