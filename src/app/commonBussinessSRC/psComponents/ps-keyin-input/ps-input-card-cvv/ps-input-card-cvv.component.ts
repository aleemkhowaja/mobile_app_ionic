import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsKeyinInput } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import {
  PsKeyinInputComponent,
} from '../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-field-keyin/ps-keyin-input/ps-keyin-input.component';
import { IOptionsPsInputCardCvvExposed } from './ps-input-card-cvv.component.interfaces';

/**
 * @author Zunair Zakir
 * @since 01/11/2019
 *
 * <p> PsInputCardCvvComponent is a simple component base on ps-keyin-input and have free text field</p>
 */
@Component({
  selector: 'ps-input-card-cvv',
  templateUrl: './ps-input-card-cvv.component.html',
  styleUrls: ['./ps-input-card-cvv.component.scss'],
})
export class PsInputCardCvvComponent extends PsKeyinInputComponent implements OnInit {

  @Input() options: IOptionsPsInputCardCvvExposed = {};

  public defaultOptions: IOptionsPsKeyinInput = {
    mask: { mask: '999'},
    labelKey: 'card_CVV_key',
    placeHolder: 'enter_your_card_CVV_key',
    type: 'number'
  };
  constructor(
    commonService: PsCommonService,
    logger: LoggerService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultOptions, this.options, false);
  }

}
