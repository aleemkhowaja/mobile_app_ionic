import { Component, Input, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsButtonEmailUsComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-action/ps-action-button/ps-button-email-us/ps-button-email-us.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsButtonEmailUs } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsActionButtonEmailUsDefaultedExposed } from './ps-email-us-defaulted.component.interface';

@Component({
  selector: 'ps-email-us-defaulted',
  templateUrl: './ps-email-us-defaulted.component.html',
  styleUrls: ['./ps-email-us-defaulted.component.scss'],
})
export class PsActionButtonEmailUsDefaultedComponent extends PsButtonEmailUsComponent implements OnInit {
  @Input() options: IOptionsPsActionButtonEmailUsDefaultedExposed;
  defaultOptions: IOptionsPsButtonEmailUs = {
    toContactEmails: 'to@gmail.com',
    ccContactEmails: 'cc@gmail.com',
    group: this.options.group
  };

  constructor(public commonService: PsCommonService, loggerP: LoggerService,
    private omniPull: OmniPullService, private emailComposerC: EmailComposer) {
    super(commonService, loggerP, emailComposerC);
  }

  ngOnInit() {
    this.commonService.copyObject(this.defaultOptions, this.options);
    this.defaultOptions.group = this.options.group;
    this.init();
  }

  async init() {
    const result = await this.omniPull.getParamValOf('ToContactEmail', 'CCContactEmail')
    if (result.ToContactEmail) {
      this.defaultOptions.toContactEmails = result.ToContactEmail;
    }
    if (result.CCContactEmail) {
      this.defaultOptions.ccContactEmails = result.CCContactEmail;
    }
  }

  onEmailClicked(event) {
    const emailUS: PsButtonEmailUsComponent = new PsButtonEmailUsComponent(this.omniPull.omniCommon.common, this.omniPull.omniCommon.common.logger, this.emailComposerC);
    this.commonService.copyObject(emailUS.options, this.defaultOptions);
    emailUS.onEmailClicked(event);
  }
}
