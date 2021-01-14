import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsLabel } from '../../../../../psServices/models/ps-common-interface';
import { PsFieldLabelComponent } from '../ps-field-label.component';

@Component({
  selector: 'ps-label',
  templateUrl: './ps-label.component.html',
})
export class PsLabelComponent extends PsFieldLabelComponent implements OnInit {
  @Input() options: IOptionsPsLabel;

  position = PsCommonSettings.PS_LABEL_INPUT_POSITION;
  get getLabelKey(): any {
    return this.options.labelKey;
  }
  constructor(common: PsCommonService, public logger: LoggerService) {
    super(common, logger);
  }


}
