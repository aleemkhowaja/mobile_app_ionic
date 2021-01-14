import { Component, Input, OnInit } from '@angular/core';

import { LoggerService } from '../../../../../psServices/logger/logger.service';
import { IOptionsPsLabel } from '../../../../../psServices/models/ps-common-interface';
import { PsCommonSettings } from '../../../../../psServices/models/ps-common.settings';
import { PsCommonService } from '../../../../../psServices/ps-common/ps-common.service';
import { PsFieldLabelComponent } from '../ps-field-label.component';

@Component({
  selector: 'ps-label-input',
  templateUrl: './ps-label-input.component.html',
  styleUrls: ['./ps-label-input.component.scss'],
})
export class PsLabelInputComponent extends PsFieldLabelComponent implements OnInit {
  @Input() options: IOptionsPsLabel = {
    psClass: 'ps-label-input',
    position: PsCommonSettings.PS_LABEL_INPUT_POSITION
  };


  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    if (this.options && this.options.previewMode != null && this.options.previewMode !== undefined && this.options.previewMode !== true) {
      this.options.previewMode = false;
    }
    this.options.psClass = 'ps-label-input';
  }

}
