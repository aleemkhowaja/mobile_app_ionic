import { IOptionsPsLabelUserEmailExposed } from './ps-label-user-email.component.interfaces';
import { OmniCommonService } from './../../../psServices/omni-common/omni-common.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsLabelComponent } from './../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-field-label/ps-label/ps-label.component';
import { IOptionsPsLabel } from './../../../../commonSRC/psServices/models/ps-common-interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ps-label-user-email',
  templateUrl: './ps-label-user-email.component.html',
  styleUrls: ['./ps-label-user-email.component.scss']
})
export class PsLabelUserEmailComponent extends PsLabelComponent
  implements OnInit {
  @Input() options: IOptionsPsLabelUserEmailExposed;
  labelOptions: IOptionsPsLabel = {
    translate: false
  };
  constructor(
    common: PsCommonService,
    public logger: LoggerService,
    public omniCommon: OmniCommonService
  ) {
    super(common, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.options, this.labelOptions, false, true);
    this.labelOptions.labelKey = this.omniCommon.common.getLoginResponse().omniUserVO.EMAIL;
  }
}
