import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsPsContainerItem } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { CommonBussinessConstant } from '../../../psServices/models/ps-common-bussiness-constant';
import { IOptionsPsComplexAmountExposed } from './ps-complex-amount.component.interfaces';


/**
 * @author Aftab.Ali
 * @since 26/12/2019
 *
 * <p> PsComplexAmountComponent -- </p>
 */
@Component({
  selector: 'ps-complex-amount',
  templateUrl: './ps-complex-amount.component.html',
  styleUrls: ['./ps-complex-amount.component.scss'],
})
export class PsComplexAmountComponent extends PsBaseFieldComponent implements OnInit {

  public isValid = false;
  public hasFocus = false;
  public touched = false;

  amountItemOptions: IOptionsPsContainerItem = {
    psClass: 'complex-amount'
  };

  @Input() options: IOptionsPsComplexAmountExposed = {};

  public currencyFlag: string;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onAmountChanged: EventEmitter<any> = new EventEmitter<any>();

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onCurrencyChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('currencyImage') currencyImage: ElementRef<HTMLElement>;
  currencyChosen: boolean = false;
  constructor(
    commonService: PsCommonService,
    logger: LoggerService,
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  /**
   *
   * @param event
   */
  public onAmountChange(event) {
    this.options.amount = event.newValue;
    this.onAmountChanged.emit(this.options);
    this.validate();
  }



  changeCurrency(event) {
    if (event && event.selectedObj) {
      this.currencyChosen = true;
      this.options.amountOptions.decimalPoints = event.selectedObj ? event.selectedObj.decimalPoint : CommonBussinessConstant.END_USER_INPUT_ID;
    }
    this.onCurrencyChange.emit(event);
    // this.validate();
  }


  validate() {
    if (this.options.amount && this.currencyChosen) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
    // if (this.options.currenciesOptions.group.controls[this.options.currenciesOptions.fcName].value !== undefined &&
    //   this.options.amountOptions.group.controls[this.options.amountOptions.fcName].value !== undefined) {
    //   if (this.options.currenciesOptions.group.controls[this.options.currenciesOptions.fcName].valid &&
    //     this.options.amountOptions.group.controls[this.options.amountOptions.fcName].valid) {
    //     this.isValid = true;
    //   } else {
    //     this.isValid = false;
    //   }
    // } else {
    //   this.reset();
    // }
  }

  reset() {
    this.currencyChosen = false;
    this.touched = false;
    this.isValid = false;
    this.hasFocus = false;
  }

  onFocus() {
    this.touched = true;
    this.isValid = false;
    this.hasFocus = true;
  }
  onBlur() {
    this.hasFocus = false;
    this.validate();
  }
  itemWasClicked(item, event) {
    event.currentTarget.querySelectorAll('ion-label').forEach((node) => {
      node.style.color = CommonUtils.getCssVariableValue('--ps-focused-field-color');
    });
  }
}
