import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsBaseComponent } from '../ps-base.component';


@Component({
  selector: 'ps-base-container-body',
  templateUrl: './ps-base-container-body.component.html',
  styleUrls: ['./ps-base-container-body.component.scss'],
})
export class PsBaseContainerBodyComponent extends PsBaseComponent implements OnInit {

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {}

}
