import { Component, Input, OnInit } from '@angular/core';

import { PsActionButtonComponent } from '../ps-action-button.component';
import { LoggerService } from './../../../../../psServices/logger/logger.service';
import { IOptionsPsActionButton, IOptionsPsButtonStandard } from './../../../../../psServices/models/ps-common-interface';
import { PsCommonService } from './../../../../../psServices/ps-common/ps-common.service';

@Component({
  selector: 'ps-button-standard',
  templateUrl: './ps-button-standard.component.html',
  styleUrls: ['./ps-button-standard.component.scss'],
})
export class PsButtonStandardComponent extends PsActionButtonComponent implements OnInit {

  @Input() options: IOptionsPsButtonStandard;

  standardOptions: IOptionsPsActionButton;

  constructor(common: PsCommonService, loggerP: LoggerService) {
    super(common, loggerP);
  }

  ngOnInit() {
    this.standardOptions = {
      labelKey: this.options.labelKey,
      type: 'button',
      iconName: this.options.iconName,
      iconPosition: this.options.iconPosition,
      psClass: 'ps-button-standard',
      group: this.options.group
    };
    this.common.copyObject(this.standardOptions, this.options, false, true);
  }

  onStandardClicked(event: Event) {
    this.onClick.emit(event);
  }
}
