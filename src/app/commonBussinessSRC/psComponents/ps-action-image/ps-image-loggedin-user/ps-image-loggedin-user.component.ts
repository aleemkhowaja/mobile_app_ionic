import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OmniCommonService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-common.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsActionImage } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsActionImageComponent } from './../../../../commonSRC/psComponents/ps-base/ps-base-action/ps-action-image/ps-action-image.component';
import { IOptionsPsImageLoggedinUserExposed } from './ps-image-loggedin-user.component.interfaces';

@Component({
  selector: 'ps-image-loggedin-user',
  templateUrl: './ps-image-loggedin-user.component.html',
  styleUrls: ['./ps-image-loggedin-user.component.scss'],
})
export class PsImageLoggedinUserComponent extends PsActionImageComponent implements OnInit {
  @Input() options: IOptionsPsImageLoggedinUserExposed;
  actionImageOptions: IOptionsPsActionImage = {
    psClass: 'ps-action-image-img'
  };
  constructor(public omniCommon: OmniCommonService, public logger: LoggerService, public commonp: PsCommonService, private translate: TranslateService) {
    super(commonp, logger);
  }

  ngOnInit() {
    try {
      this.actionImageOptions.imageName = this.omniCommon.common.getLoginResponse().profileImage || 'avatar.svg';
    } catch (e) {
      this.omniCommon.common.logger.error(e);
    }
  }
}
