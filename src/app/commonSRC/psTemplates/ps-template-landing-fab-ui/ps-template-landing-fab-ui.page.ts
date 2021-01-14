import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { PsButtonLogoutComponent } from 'src/app/commonBussinessSRC/psComponents/ps-action-button/ps-button-logout/ps-button-logout.component';
import { IOptionsPsActionButtonNotificationDefaultedExposed } from 'src/app/commonBussinessSRC/psComponents/ps-button-notification/ps-notification-defaulted/ps-notification-defaulted.component.interface';
import { IOptionsPsMenuHeaderExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-menu-header-container/ps-complex-menu-header-container.interfaces';
import { PsComplexMenuReachComponent } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-menu-reach/ps-complex-menu-reach.component';
import { PsComplexNotificationComponent } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-notification/ps-complex-notification.component';
import { IOptionsPsComplexProfileExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-profile/ps-complex-profile.component.interfaces';
import { IOptionsPsComplexUserProfileMenuExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-user-profile-menu/ps-complex-user-profile-menu.component.interfaces';
import { IOptionsPsLovPreferredLanguageExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-preferred-language/ps-lov-preferred-language.component.interfaces';
import { IOptionsTemplateLandingFabUi } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniCommonService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-common.service';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';

import { IOptionsPsComplexMenuReachExposed } from '../../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-menu-reach/ps-complex-menu-reach.component.interfaces';
import { IOptionsPsButtonFabList } from '../../psServices/models/ps-common-interface';
import { PsNotificationsService } from '../../psServices/notifications/ps-notifications.service';
import { PsCommonService } from '../../psServices/ps-common/ps-common.service';
import { PsTemplateLandingMainPage } from '../ps-template-landing-main/ps-template-landing-main.page';



@Component({
  selector: 'ps-template-landing-fab-ui',
  templateUrl: './ps-template-landing-fab-ui.page.html',
  styleUrls: ['./ps-template-landing-fab-ui.page.scss']
})
export class PsTemplateLandingFabUiPage extends PsTemplateLandingMainPage implements OnInit {
  preferredLanguageOptions: IOptionsPsLovPreferredLanguageExposed = {};
  optionsUserProfileMenu: IOptionsPsComplexUserProfileMenuExposed = {};
  menuHeaderoptions: IOptionsPsMenuHeaderExposed = {};
  psMenuReachOptions: IOptionsPsComplexMenuReachExposed = {};
  optionsComplexProfile: IOptionsPsComplexProfileExposed = {};
  @Input() options: IOptionsTemplateLandingFabUi;
  fabListOptions: IOptionsPsButtonFabList = {
    group: this.options.group,
    mainProperties: {
      iconName: 'landing-fab-button',
      group: this.options.group
    }
  };
  notificationOptions: IOptionsPsActionButtonNotificationDefaultedExposed = {
    iconName: 'notifications',
    psClass: 'ps-menu-reach-background',
    labelKey: 'notifications_key',
    notificationsCount: 0,
    group: this.options.group
  };
  notificationIsFlipped = false;
  isFabExpanded = false;
  constructor(public omniCommon: OmniCommonService, public componentFactoryResolver?: ComponentFactoryResolver,
    private omniPull?: OmniPullService,public commonService?: PsCommonService, public psNotificationsService?: PsNotificationsService,
    public callNumber?: CallNumber, private emailComposer?: EmailComposer) {
    super(omniCommon, componentFactoryResolver);
  }

  ngOnInit() {
    this.init();
    const menuReach: PsComplexMenuReachComponent = new PsComplexMenuReachComponent(this.omniPull,this.commonService, this.psNotificationsService, this.callNumber, this.emailComposer);
    const menuReachFabList = menuReach.fabListOptions;
    this.fabListOptions.startFabList = menuReachFabList.startFabList;
    this.fabListOptions.startFabList.splice(2, 1);
    this.fabListOptions.startFabList.push(
      {
        group: this.options.group,
        iconName: 'log-out',
        labelKey: 'logout_key',
        handler: (event) => {
          const psButtonLogoutComponent: PsButtonLogoutComponent = new PsButtonLogoutComponent(this.navService, this.omniPull);
          psButtonLogoutComponent.onButtonClicked(event);
        }
      }
    );
    menuReach.onClick.subscribe(result => {
      this.changeContent(result);
    });
  }
  notificationClickHandler() {
    this.goBack({ component: PsComplexNotificationComponent, componentOption: this.notificationOptions, title: 'notifications_key' });
  }
  isFabClosed() {
    this.isFabExpanded = false;
  }
  isFabOpened() {
    this.isFabExpanded = true;
  }

  goBack(component?) {
    this.changeContent(component ? component : this.previousComponent);
    if (this.previousComponent && this.previousComponent.component === PsComplexNotificationComponent) {
      if (this.psContainerFlip.isFlipped) {
        this.notificationIsFlipped = true;
      } else {
        this.notificationIsFlipped = false;
      }
    } else {
      this.notificationIsFlipped = false;
    }
  }
}
