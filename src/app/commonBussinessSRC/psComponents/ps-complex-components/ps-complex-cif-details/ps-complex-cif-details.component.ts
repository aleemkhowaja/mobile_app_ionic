import { Component, Input, OnInit } from '@angular/core';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsComplexCifDetailsExposed } from './ps-complex-cif-details.component.interface';

@Component({
  selector: 'ps-complex-cif-details',
  templateUrl: './ps-complex-cif-details.component.html',
  styleUrls: ['./ps-complex-cif-details.component.scss'],
})
export class PsComplexCifDetailsComponent extends PsBaseFieldComponent implements OnInit {

  @Input() public options: PsComplexCifDetailsExposed;

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
  }

}
