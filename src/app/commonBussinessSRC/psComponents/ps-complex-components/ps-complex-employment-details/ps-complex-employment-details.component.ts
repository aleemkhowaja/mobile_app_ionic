import { Component, Input, OnInit } from '@angular/core';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsComplexEmploymentDetailsExposed } from './ps-complex-employment-details.component.interface';

@Component({
  selector: 'ps-complex-employment-details',
  templateUrl: './ps-complex-employment-details.component.html',
  styleUrls: ['./ps-complex-employment-details.component.scss'],
})
export class PsComplexEmploymentDetailsComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: PsComplexEmploymentDetailsExposed;

  constructor(
    public commonProv: PsCommonService,
    public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
  }

}
