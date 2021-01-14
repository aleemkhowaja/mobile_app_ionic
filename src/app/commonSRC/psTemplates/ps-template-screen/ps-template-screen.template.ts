import { Component, OnInit } from '@angular/core';
import { IOptionsPsActionIcon, IOptionsPsLabelHeader } from '../../psServices/models/ps-common-interface';
import { PsTemplateBasePage } from '../ps-template-base/ps-template-base.page';


@Component({
  selector: 'ps-template-screen',
  templateUrl: './ps-template-screen.template.html',
  styleUrls: ['./ps-template-screen.template.scss'],
})
export class PsTemplateScreenPage extends PsTemplateBasePage implements OnInit {

  arrowIconOptios: IOptionsPsActionIcon = {
    iconName: 'arrow-back'
  };

  homeOptions: IOptionsPsActionIcon = {
    iconName: 'lock'
  };
  optionsHeader: IOptionsPsLabelHeader = {};
  headerIconOptions: IOptionsPsActionIcon = {};

  constructor() {
    super();
  }
  ngOnInit() {
    super.init();
    if (this.navService.isUserLoggedIn) {
      this.homeOptions.iconName = 'menu';
    }
    this.commonProv.activePage.subscribe(page => {
      if (page) {
        this.optionsHeader.labelKey = page.title;
        if (page.icon) {
          this.headerIconOptions.iconName = page.icon;
        }
      }
    });
  }

  openPage() {
    // if (this.navService.isUserLoggedIn) {
    //   // if (this.commonProv.isWebLayout()) {
    //   //   this.navService.pop();
    //   // } else {
    //   //   this.navService.navigateToMain(['./home']);
    //   // }
    //   this.navService.navigateToMain(['./home']);
    // } else {
    //   this.commonProv.activePage.next(null);
    //   PsCommonSettings.oper_ID = ConstantCommon.LOGIN_OPER_ID;
    //   this.navService.navigateToMain(['./omni-login']);
    // }
    this.navService.navigateToMain();
  }

  onBackIconClicked() {
    this.navService.onCancelClicked();
  }
}
