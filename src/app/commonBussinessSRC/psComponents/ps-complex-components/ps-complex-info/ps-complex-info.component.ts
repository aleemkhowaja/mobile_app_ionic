import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseActionComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-action/ps-base-action.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsHyperlinkAnchor } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsComplexMenuReachExposed } from '../ps-complex-menu-reach/ps-complex-menu-reach.component.interfaces';

@Component({
  selector: 'ps-complex-info',
  templateUrl: './ps-complex-info.component.html',
  styleUrls: ['./ps-complex-info.component.scss'],
})
export class PsComplexInfoComponent extends PsBaseActionComponent implements OnInit {
  @Input() options: IOptionsPsComplexMenuReachExposed;
  labelKey: string;
  iconName: string;

  isTreeView = PsCommonSettings.menuIsTreeView;
  termsAndConditionOptions: IOptionsPsHyperlinkAnchor = {
    labelKey: 'terms_and_condition_key',
    titleOptions: {
      labelKey: 'terms_and_condition_key',
    },
    iconOptions: {
      iconName: 'document-outline',
    },
    route: 'terms-and-condition',
    pageOptions: {
      iconName: 'document-outline',
      title: 'terms_and_conditions_key'
    },
    navigationOptions: {
      queryParams: {
        fileName: PsCommonBusinessSettings.onlineRegistrationTermsAndConditionsFileName
      }
    }
  };

  bankWebsiteOptions: IOptionsPsHyperlinkAnchor = {
    labelKey: 'bank_website_key',
    titleOptions: {
      labelKey: 'bank_website_key',
    },
    iconOptions: {
      iconName: 'globe-outline',
    },
    handler: () => {
      this.onButtonClick(CommonBussinessConstant.INFO_BANK_WEBSITE);
    },
    disableLoading: true
  };
  faqOptions: IOptionsPsHyperlinkAnchor = {
    labelKey: 'faq_key',
    titleOptions: {
      labelKey: 'faq_key',
    },
    iconOptions: {
      iconName: 'help',
    },
    route: 'faq',
    pageOptions: {
      iconName: 'help',
      title: 'info_faq_key'
    },
    navigationOptions: {
      queryParams: {
        fileName: PsCommonBusinessSettings.faq
      }
    }
  };
  securityStatementOptions: IOptionsPsHyperlinkAnchor = {
    labelKey: 'security_statement_key',
    titleOptions: {
      labelKey: 'security_statement_key',
    },
    iconOptions: {
      iconName: 'lock',
    },
    route: 'security-statement',
    pageOptions: {
      iconName: 'lock',
      title: 'security_statement_key'
    },
    navigationOptions: {
      queryParams: {
        fileName: PsCommonBusinessSettings.securityStatementFileName
      }
    }
  };

  public parameters;
  fileName: string;
  public complexInfo: Array<IOptionsPsHyperlinkAnchor> = [];

  constructor(public commonService?: PsCommonService, public loggerP?: LoggerService,
    private omniPull?: OmniPullService, public popoverCtrl?: PopoverController, public navService?: PsNavigatorService
  ) {
    super(commonService, loggerP);
  }

  ngOnInit() {
    this.complexInfo.push(this.termsAndConditionOptions, this.bankWebsiteOptions, this.securityStatementOptions, this.faqOptions);
  }
  onButtonClick(type: any) {
    if (type === CommonBussinessConstant.INFO_BANK_WEBSITE) {
      this.omniPull.getParamValOf('BankWebsiteUrl').then(res => {
        this.parameters = res;
        const url = 'https://' + this.parameters.BankWebsiteUrl;
        const browser = this.commonService.inAppBrowser.create(url);
        browser.show();
      }).catch(err => this.omniPull.omniCommon.common.logger.log(err));
    }
  }

}
