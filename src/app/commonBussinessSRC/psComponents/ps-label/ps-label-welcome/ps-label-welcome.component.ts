import { Component, Input, OnInit } from '@angular/core';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsLabelComponent } from './../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-field-label/ps-label/ps-label.component';
import { ConstantCommon } from './../../../../commonSRC/psServices/models/common-constant';
import { IOptionsPsLabel } from './../../../../commonSRC/psServices/models/ps-common-interface';
import { OmniCommonService } from './../../../psServices/omni-common/omni-common.service';
import { IOptionsPsLabelWelcomeExposed } from './ps-label-welcome.component.interfaces';

@Component({
  selector: 'ps-label-welcome',
  templateUrl: './ps-label-welcome.component.html',
  styleUrls: ['./ps-label-welcome.component.scss']
})
export class PsLabelWelcomeComponent extends PsLabelComponent
  implements OnInit {
  @Input() options: IOptionsPsLabelWelcomeExposed;
  labelOptions: IOptionsPsLabel = {
    labelKey: 'welcome_key' // set the key for translation.
  };
  userLabelOptions: IOptionsPsLabel = {
    translate: false
  };
  userWelcomeOptions: IOptionsPsLabel = {
    labelKey: 'welcome_key'
  };
  constructor(
    common: PsCommonService,
    public logger: LoggerService,
    public omniCommon: OmniCommonService
  ) {
    super(common, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.options, this.userLabelOptions, false, true);
    this.commonProv.copyObject(this.options, this.labelOptions, false, true);
    try {
      this.labelOptions.labelKey = this.omniCommon.common.translate(this.labelOptions.labelKey);
      const result = this.commonProv.session.getValueOf(ConstantCommon.USERINFO);
      if (result) {
        if (PsCommonBusinessSettings.isAgent || PsCommonBusinessSettings.isCorporate) {
          this.userLabelOptions.labelKey = result.name !== undefined ? result.name : '';
        } else {
          this.userLabelOptions.labelKey = result.customerInfoCO.shortName !== undefined ? result.customerInfoCO.shortName : '';
        }
      }
    } catch (e) {
      this.omniCommon.common.logger.error(e);
    }
  }
}
