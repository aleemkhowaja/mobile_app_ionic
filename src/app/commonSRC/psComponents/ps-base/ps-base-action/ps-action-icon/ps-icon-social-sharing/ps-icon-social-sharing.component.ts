import { Component, Input } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsSocialSharing } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsActionIconComponent } from '../ps-action-icon.component';

@Component({
  selector: 'ps-icon-social-sharing',
  templateUrl: './ps-icon-social-sharing.component.html',
  styleUrls: ['./ps-icon-social-sharing.component.scss'],
})
export class PsIconSocialSharingComponent  extends PsActionIconComponent {
  @Input() options: IOptionsPsSocialSharing;

  defaultOptions: IOptionsPsSocialSharing = {
    message: null,
    subject: null,
    url: null,
    files: null,
    labelKey: 'share_key',
    iconName: 'share' ,
  };
  constructor(private commonP: PsCommonService, loggerP: LoggerService) {
      super(commonP, loggerP);
  }

  sendShare(event) {
    this.commonP.share(this.defaultOptions.message, this.defaultOptions.subject, this.defaultOptions.files, this.defaultOptions.url);
  }

  ngOnInit() {
    super.ngOnInit();
    this.commonP.copyObject(this.defaultOptions, this.options, false, false);
  }

}
