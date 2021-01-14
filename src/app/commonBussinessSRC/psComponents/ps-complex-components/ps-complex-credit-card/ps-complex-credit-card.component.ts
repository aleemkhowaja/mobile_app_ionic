import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PsBaseFieldComponent } from '../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from '../../../../commonSRC/psServices/logger/logger.service';
import { IchangeValues } from '../../../../commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsComplexCreditCardExposed } from './ps-complex-credit-card.component.interfaces';

/**
 * @author Zunair.Zakir
 * @since 25/10/2019
 *
 * <p> PsComplexCreditCardComponent is a complex component base on several complex and simple components</p>
 */
@Component({
  selector: 'ps-complex-credit-card',
  templateUrl: './ps-complex-credit-card.component.html',
  styleUrls: ['./ps-complex-credit-card.component.scss'],
})
export class PsComplexCreditCardComponent extends PsBaseFieldComponent implements OnInit {


  @Input() public options: IOptionsPsComplexCreditCardExposed;
  @Output() public onCardNumberChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onCardOwnerChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onCardCvvChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onCardDateChange: EventEmitter<any> = new EventEmitter<any>();


  defaultOptions: IOptionsPsComplexCreditCardExposed = {
    cardNumber: { labelKey: 'card_number_key', placeHolder: 'enter_your_card_number_key', fcName: 'cardNumber' },
    cardOwner: { labelKey: 'card_owner_name_key', placeHolder: 'enter_the_card_owner_name_key', fcName: 'cardOwnerName' },
    cardCVV: { labelKey: 'card_cvv_key', placeHolder: 'enter_the_card_cvv_key', fcName: 'cardCvv' },
    dateOptions: { labelKey: 'card_expiry_date_key', placeHolder: 'enter_the_card_Expiry_date_key', fcName: 'cardExpiryDate' },
  };

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }


  ngOnInit() {
    this.init();
  }

  public init() {
    super.init();
    this.commonProv.copyObject(this.defaultOptions, this.options);
  }

  onChangeCardNumber(value: IchangeValues) {
    this.onCardNumberChange.emit(value);
  }
  onChangeOwnerNumber(value: IchangeValues) {
    this.onCardOwnerChange.emit(value);
  }
  onChangeCvvNumber(value: IchangeValues) {
    this.onCardCvvChange.emit(value);
  }
  onChangeDate(value: IchangeValues) {
    this.onCardDateChange.emit(value);
  }

}
