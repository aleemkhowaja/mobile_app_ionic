import { Component, Input, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsActionButton, IOptionsPsButtonEmailUs } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsActionButtonComponent } from '../ps-action-button.component';


@Component({
  selector: 'ps-button-email-us',
  templateUrl: './ps-button-email-us.component.html',
  styleUrls: ['./ps-button-email-us.component.scss'],
})
export class PsButtonEmailUsComponent extends PsActionButtonComponent implements OnInit {
  @Input() options: IOptionsPsButtonEmailUs;

  emailUsOptions: IOptionsPsActionButton;
  lockButton = false;


  constructor(public commonService: PsCommonService, loggerP: LoggerService, private emailComposer: EmailComposer) {
    super(commonService, loggerP);
  }

  ngOnInit() {

    this.emailUsOptions = {
      /* labelKey: 'email_us_key', */ // commented due to wrong UI in reach menu gilbertandary
      type: 'button',
      iconName: 'mail',
      iconPosition: 'start',
      group: this.options.group
    };
    this.commonService.copyObject(this.emailUsOptions, this.options);

  }

  onEmailClicked(event: Event) {
    if (this.lockButton) {
      return;
    }
    this.lockButton = true;
    if (this.commonService.isNativeMobile()) {
      const email = {
        to: this.options.toContactEmails,
        cc: this.options.ccContactEmails,
        subject: this.options.subject,
        isHtml: true
      };
      this.emailComposer.open(email).then((opened) => {
        setTimeout(() => {
          this.lockButton = false;
        }, 1000);
      }).catch((error) => {
        setTimeout(() => {
          this.lockButton = false;
        }, 1000);
      });
    } else {
      const mail = document.createElement('a');
      mail.href = 'mailto:' + this.options.toContactEmails + '?cc=' + this.options.ccContactEmails;
      mail.click();
      setTimeout(() => {
        this.lockButton = false;
      }, 1000);
    }
  }

}
