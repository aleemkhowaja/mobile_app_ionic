import { Component, Input, OnInit } from '@angular/core';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsComplexUserContactExposed } from './ps-complex-user-contact.component.interfaces';

@Component({
  selector: 'ps-complex-user-contact',
  templateUrl: './ps-complex-user-contact.component.html',
  styleUrls: ['./ps-complex-user-contact.component.scss'],
})
export class PsComplexUserContactComponent  extends PsBaseFieldComponent implements OnInit {
  @Input() public options: IOptionsPsComplexUserContactExposed;

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }


  ngOnInit() {}

}
