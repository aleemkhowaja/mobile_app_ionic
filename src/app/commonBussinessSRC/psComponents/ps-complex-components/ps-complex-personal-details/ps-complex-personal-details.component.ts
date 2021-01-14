import { Component, Input, OnInit } from '@angular/core';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsComplexPersonalDetailsExposed } from './ps-complex-personal-details.component.interfaces';

@Component({
  selector: 'ps-complex-personal-details',
  templateUrl: './ps-complex-personal-details.component.html',
  styleUrls: ['./ps-complex-personal-details.component.scss'],
})
export class PsComplexPersonalDetailsComponent extends PsBaseFieldComponent implements OnInit {

  @Input() public options: PsComplexPersonalDetailsExposed;

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
  }

}
