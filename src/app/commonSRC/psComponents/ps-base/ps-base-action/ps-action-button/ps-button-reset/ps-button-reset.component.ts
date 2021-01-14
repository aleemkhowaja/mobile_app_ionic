import { Component, Input, OnInit } from '@angular/core';

import { LoggerService } from './../../../../../psServices/logger/logger.service';
import { IOptionsPsActionButton, IOptionsPsButtonReset } from './../../../../../psServices/models/ps-common-interface';
import { PsCommonService } from './../../../../../psServices/ps-common/ps-common.service';
import { PsActionButtonComponent } from './../ps-action-button.component';

@Component({
  selector: 'ps-button-reset',
  templateUrl: './ps-button-reset.component.html',
  styleUrls: ['./ps-button-reset.component.scss'],
})
export class PsButtonResetComponent extends PsActionButtonComponent implements OnInit {

  @Input() options: IOptionsPsButtonReset;

  resetOptions: IOptionsPsActionButton;

  constructor(common: PsCommonService, loggerP: LoggerService) {
    super(common, loggerP);
  }

  ngOnInit() {
    this.resetOptions = {
      labelKey: this.options.labelKey,
      type: 'reset',
      iconName: 'refresh',
      iconPosition: 'end',
      psClass: 'ps-button-reset',
      group: this.options.group
    };
  }

  onResetClicked(event: Event) {
    this.onClick.emit(event);
  }

}
