import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsIconAvailable } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsActionIconComponent } from '../ps-action-icon.component';

@Component({
  selector: 'ps-icon-available',
  templateUrl: './ps-icon-available.component.html',
  styleUrls: ['./ps-icon-available.component.scss'],
})
export class PsIconAvaiableComponent extends PsActionIconComponent implements OnInit {
  @Input() options: IOptionsPsIconAvailable;

  constructor(common: PsCommonService, public logger: LoggerService) {
    super(common, logger);
  }

  ngOnInit() {
    this.options = {
      iconName: 'circle'
    };
  }

  // onIconClicked(event) {
  //   // this.onClick.emit(event);
  // }

}
