import { Component, Input, OnInit } from '@angular/core';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsComplexTermsAndConditionsExposed } from '../ps-complex-terms-and-conditions.component.interfaces';
import { IOptionsPsComplexTermsAndConditionsOnlineRegistrationExposed } from './ps-complex-terms-and-conditions-online-registration.component.interfaces';

@Component({
  selector: 'ps-complex-terms-and-conditions-online-registration',
  templateUrl: './ps-complex-terms-and-conditions-online-registration.component.html',
  styleUrls: ['./ps-complex-terms-and-conditions-online-registration.component.scss'],
})
export class PsComplexTermsAndConditionsOnlineRegistrationComponent extends PsBaseFieldComponent implements OnInit {

  @Input() public options: IOptionsPsComplexTermsAndConditionsOnlineRegistrationExposed;
  public mainOptions: IOptionsPsComplexTermsAndConditionsExposed = {};

  constructor(commonProv: PsCommonService, loggerP: LoggerService) {
    super(commonProv, loggerP);
  }
  ngOnInit() {
    super.init();
    if (this.options) {
      this.commonProv.copyObject(this.mainOptions, this.options, false, true);
      this.commonProv.setValInsideNestedObj('htmlViewerOptions.fileName', 'TermsAndConditions.html', this.mainOptions);
      this.commonProv.setValInsideNestedObj('checkBoxOptions.labelKey', 'I_agree_key', this.mainOptions);
    }
  }

}
