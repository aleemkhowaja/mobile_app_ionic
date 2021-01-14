import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsActionButtonComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-action/ps-action-button/ps-action-button.component';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { IOptionsPsLogoutButtonExposed } from './ps-button-logout.component.interfaces';


@Component({
  selector: 'ps-button-logout',
  templateUrl: './ps-button-logout.component.html',
  styleUrls: ['./ps-button-logout.component.scss'],
})
export class PsButtonLogoutComponent extends PsActionButtonComponent implements OnInit {

  @Input() options: IOptionsPsLogoutButtonExposed;
  defalutOptions: IOptionsPsLogoutButtonExposed;

  constructor(
    private navService?: PsNavigatorService, private omniPull?: OmniPullService) {
    super(omniPull.omniCommon.common, omniPull.omniCommon.common.logger);
  }

  ngOnInit() {
    this.defalutOptions = {
      iconName: 'log-out',
      psClass: 'ps-button-cancel ps-button-logout',
      labelKey: 'logout_key',
      group: this.options.group
    }
  }

  onButtonClicked(event: Event) {
    this.common.presentLoading();
    const sessionId = this.omniPull.omniCommon.session.getValueOf(ConstantCommon.SESSION_ID);
    const userId = this.omniPull.omniCommon.session.getValueOf(ConstantCommon.USERINFO).ocUserId

    this.omniPull.omniCommon.logout(0).then(() => {
      this.onClick.emit(event);

      this.common.activePage.next({
        title: 'activity_log_key',
        component: 'report-page'
      });
      const navigationExtras: NavigationExtras = {
        queryParams: {
          operId: CommonBussinessConstant.ACTIVITY_LOG_OPER_ID_LOGOUT,
          filterSessionId: sessionId,
          userId: userId
        }
      };
      this.navService.navigateForward('activity-log-report', navigationExtras);
      this.common.dismissLoading();
    });
  }
}
