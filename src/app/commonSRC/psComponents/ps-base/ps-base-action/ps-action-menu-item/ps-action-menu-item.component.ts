import { Component, Input } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsActionMenuItem } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsBaseActionComponent } from '../ps-base-action.component';

@Component({
  selector: 'ps-action-menu-item',
  templateUrl: './ps-action-menu-item.component.html',
  styleUrls: ['./ps-action-menu-item.component.scss'],
})

export class PsActionMenuItemComponent extends PsBaseActionComponent {
  @Input() options: IOptionsPsActionMenuItem = {};


  constructor(common: PsCommonService, public logger: LoggerService) {
    super(common, logger);

  }


  onButtonClick(event) {
    this.onClick.emit(event);
  }

}
