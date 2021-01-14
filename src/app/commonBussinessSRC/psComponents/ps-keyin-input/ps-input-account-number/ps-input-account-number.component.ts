import { Component, Input, OnInit } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsKeyinInputComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-keyin/ps-keyin-input/ps-keyin-input.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsInputAccountNumberExposed } from './ps-input-account-number.component.interface';

@Component({
  selector: 'ps-input-account-number',
  templateUrl: './ps-input-account-number.component.html',
  styleUrls: ['./ps-input-account-number.component.scss'],
})
export class PsInputAccountNumberComponent extends PsKeyinInputComponent implements OnInit {
  @Input() options: IOptionsPsInputAccountNumberExposed;
  // public format: any = 2;
  // public accountLength: any = 8;

  constructor(commonP: PsCommonService, loggerP: LoggerService, private omniPull: OmniPullService) {
    super(commonP, loggerP);
    //   this.omniPull.getParamValOf('AccountsInputFormat', 'AccountAddRefLength').then((result) => {
    //     if (result.AccountsInputFormat) {
    //       this.format = result.AccountsInputFormat;
    //     }
    //     if (result.AccountAddRefLength) {
    //       this.accountLength = result.AccountAddRefLength;
    //     }
    //   }).catch((error) => { });
  }


  ngOnInit() {
   // don't remove ngOnInit() it's needed in 
  }

  onChangeEvent(val) {
    this.onPsChange.emit(val);
  }
}
