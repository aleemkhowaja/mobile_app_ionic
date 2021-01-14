import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsIconUnAvailable } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsActionIconComponent } from '../ps-action-icon.component';

@Component({
  selector: 'ps-icon-unavailable',
  templateUrl: './ps-icon-unavailable.component.html',
  styleUrls: ['./ps-icon-unavailable.component.scss'],
})
export class PsIconUnAvaiableComponent extends PsActionIconComponent implements OnInit {
  @Input() options: IOptionsPsIconUnAvailable;

  constructor(common: PsCommonService, public logger: LoggerService) {
    super(common, logger);
  }

  ngOnInit() {
    this.options = {
      iconName: 'circle'
    };
  }
}
