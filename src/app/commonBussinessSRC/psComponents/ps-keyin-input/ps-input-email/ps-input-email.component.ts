import { Component, Input, OnInit } from '@angular/core';
import { PsKeyinInputComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-keyin/ps-keyin-input/ps-keyin-input.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsKeyinInput } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsInputEmailExposed } from './ps-input.email.component.interface';

@Component({
  selector: 'ps-input-email',
  templateUrl: './ps-input-email.component.html',
  styleUrls: ['./ps-input-email.component.scss'],
})
export class PsInputEmailComponent extends PsKeyinInputComponent implements OnInit {
  @Input() options: IOptionsPsInputEmailExposed;
  public mainOptions: IOptionsPsKeyinInput = {};

  constructor(commonP: PsCommonService, loggerP: LoggerService) {
    super(commonP, loggerP);
  }


  ngOnInit() {
    this.mainOptions = this.options;
    this.mainOptions.type = 'email';
    this.mainOptions.iconOptions = {
      iconName: 'mail'
    };
  }
  onChangeEmail($event){
    this.onPsChange.emit($event);
  }

}
