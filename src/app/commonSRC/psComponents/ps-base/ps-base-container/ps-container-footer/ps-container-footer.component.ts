import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsBaseContainerComponent } from '../ps-base-container.component';

@Component({
  selector: 'ps-container-footer',
  templateUrl: './ps-container-footer.component.html',
  styleUrls: ['./ps-container-footer.component.scss'],
})

export class PsContainerFooterComponent extends PsBaseContainerComponent implements OnInit {

  constructor(commonProv: PsCommonService, loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() { }

}
