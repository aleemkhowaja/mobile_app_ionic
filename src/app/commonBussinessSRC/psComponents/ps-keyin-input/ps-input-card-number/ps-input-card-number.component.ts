import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsKeyinInput } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsKeyinInputComponent } from './../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-field-keyin/ps-keyin-input/ps-keyin-input.component';
import { IOptionsPsInputCardNumberExposed } from './ps-input-card-number.component.interfaces';

/**
 * @author Zunair Zakir
 * @since 01/11/2019
 *
 * <p> PsInputCardNumberComponent is a simple component base on ps-keyin-input and have free text field</p>
 */
@Component({
  selector: 'ps-input-card-number',
  templateUrl: './ps-input-card-number.component.html',
  styleUrls: ['./ps-input-card-number.component.scss'],
})
export class PsInputCardNumberComponent extends PsKeyinInputComponent implements OnInit {

  @Input() options: IOptionsPsInputCardNumberExposed = {};

  public defaultOptions: IOptionsPsKeyinInput = {
    mask: { mask: '9999 9999 9999 9999' },
    labelKey: 'card_number_key',
    placeHolder: 'enter_your_card_number_key',
    type: 'tel',
    imageOptions: {
      imageName: '',
      psClass: 'card-action-image'
    }
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

  changeCardIcon(event: any) {
    const currentValue = event.target.value;

    if (currentValue.startsWith('4')) {
      this.defaultOptions.imageOptions.imageName = 'Visa-Curved.png';
    } else if (this.checkCard(52, 55, currentValue) || this.checkCard(2221, 2720, currentValue)) {
      this.defaultOptions.imageOptions.imageName = 'Mastercard-Curved.png';
    } else if (currentValue.startsWith('34') || currentValue.startsWith('37')) {
      this.defaultOptions.imageOptions.imageName = 'American-Express-Curved.png';
    } else if (currentValue.startsWith('6011') || currentValue.startsWith('65')) {
      this.defaultOptions.imageOptions.imageName = 'Discover-Straight.png';
    } else if (currentValue.startsWith('36') || currentValue.startsWith('38') || this.checkCard(300, 305, currentValue)) {
      this.defaultOptions.imageOptions.imageName = 'DinerClub.png';
    } else if (currentValue.startsWith('35') || currentValue.startsWith('2131') || currentValue.startsWith('1800')) {
      this.defaultOptions.imageOptions.imageName = 'jbc-card.jpg';
    } else {
      this.defaultOptions.imageOptions.imageName = '';
    }
  }

  checkCard(start, end, value: string) {
    let found = false;
    if (value && start && end) {
      for (let i = start; i <= end; i++) {
        if (value.startsWith(i.toString())) {
          found = true;
          break;
        }
      }
    }
    return found;
  }

}
