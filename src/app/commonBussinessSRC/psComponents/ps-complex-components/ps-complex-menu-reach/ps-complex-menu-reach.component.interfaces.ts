import { IOptionsPsBaseActionExposed, IOptionsPsButtonCallExposed } from 'src/app/commonSRC/psServices/models/ps-common-interface';

import { IOptionsPsActionButtonEmailUsDefaultedExposed } from '../../ps-button-email-us/ps-email-us-defaulted/ps-email-us-defaulted.component.interface';
import { IOptionsPsActionButtonNotificationDefaultedExposed } from '../../ps-button-notification/ps-notification-defaulted/ps-notification-defaulted.component.interface';
import { IOptionsPsDraftsReportComponent } from '../../ps-drafts-report/ps-drafts-report.component.interfaces';

export interface IOptionsPsComplexMenuReachExposed extends IOptionsPsBaseActionExposed {
    callOptions?: IOptionsPsButtonCallExposed;
    notificationOptions?: IOptionsPsActionButtonNotificationDefaultedExposed;
    emailUsOptions?: IOptionsPsActionButtonEmailUsDefaultedExposed;
    pendingApprovalOptions?: IOptionsPsDraftsReportComponent;
}
export interface IOtionsCommonMenuReachHandler {
    mainOptions: any;
    component: any;
}
