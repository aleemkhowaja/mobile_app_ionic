import { Component, Input, OnInit } from '@angular/core';
import Inputmask from 'inputmask';
import { LoggerService } from '../../../../psServices/logger/logger.service';
import { ConstantCommon } from '../../../../psServices/models/common-constant';
import { IFloatingObject, IOptionsPsFieldKeyin, IPsMaskOptions } from '../../../../psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../psServices/ps-common/ps-common.service';
import { PsBaseFieldComponent } from '../ps-base-field.component';


@Component({
  selector: 'ps-field-keyin',
  templateUrl: './ps-field-keyin.component.html',
  styleUrls: ['./ps-field-keyin.component.scss'],
})
export class PsFieldKeyinComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsFieldKeyin = {};

  get fcFieldValue(): string {
    let previewVal = super.returnFcValue();
    if (this.options.type === 'amount') {
      previewVal = this.commonProv.amountFormat(this.value, this.decPoints);
    }
    return previewVal;
  }

  get fieldValue(): any {
    let v: any = super.returnValue();
    if (v && this.options.type && (this.options.type === 'number' || this.options.type === 'amount')) {
      v = v.toString();
    }
    if (v !== this.oldValue) {
      this.options.group.controls[this.options.fcName].setValue(v, { emitEvent: false });
      this.options.group.controls[this.options.fcName][ConstantCommon.OLD_VALUE] = v;
    }
    let val = v;
    // check if the field has manually (variable set to true inside the ps-input-mask directive) so that the value is formated correctly when bluring from the field (after the change event is triggered) due to error generated upon load if the field has a value initially
    const maskOptions: IPsMaskOptions = this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_MASK_OPTIONS];
    if (v && maskOptions && this.options.group.controls[this.options.fcName][ConstantCommon.CONTROLLER_VALUE_CHANGED]) {
      val = Inputmask.format(v, maskOptions);
    }
    return val;
  }

  set fieldValue(val: any) {
    if (val && this.options.type && (this.options.type === 'number' || this.options.type === 'amount')) {
      // remove the thousands separator by Richie for #BUG 755638
      val = parseFloat(val.toString().replace(new RegExp(ConstantCommon.THOUSANDS_SEPARATOR, 'g'), ''));
    }
    super.writeValue(val, true);
  }

  constructor(commonProv: PsCommonService, loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    if (this.options && (this.options.type === 'text' || this.options.type === 'password')) {
      this.commonProv.addComponentValidator(this.options.group, this.options.fcName, this.common.prepareValidation(false, null, false, null, null, ConstantCommon.DEFAULT_MIN_LENGTH, ConstantCommon.DEFAULT_MAX_LENGTH));
    }
    if (this.options && this.options.type === 'email') {
      this.commonProv.addComponentValidator(this.options.group, this.options.fcName, this.common.prepareValidation(false, null, false, null, null, ConstantCommon.DEFAULT_MIN_LENGTH, ConstantCommon.DEFAULT_MAX_LENGTH, null, [this.commonProv.custEmailValidator()]));
    }
    super.init();
    this.custIconOptions.availableCustomization.IS_MANDATORY = true;
    this.custIconOptions.availableCustomization.PLACEHOLDER_LABEL_ID = true;
    this.fObject = this.returnNbPartsLen(ConstantCommon.DEFAULT_MAX_VALUE.toString());
    this.decPoints = ConstantCommon.DEFAULT_MAX_DECIMAL_LENGTH;
  }

  // added for bug 800979
  onKeyDown(event) {
    if (event.target.value) {
      const e = event as KeyboardEvent;
      if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+V
        (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
      }
      const keyDownObject: IFloatingObject = this.returnNbPartsLen(event.target.value);
      if ((
        ((this.options.type == 'text' || this.options.type == 'password' || this.options.type == 'tel') && this.maxLength && event.target.value.length >= this.maxLength) ||
        (
          (this.options.type == 'number' || this.options.type == 'amount') &&
          (([110, 190].indexOf(e.keyCode) == -1 &&
            ((keyDownObject.naturalMaxLength >= this.fObject.naturalMaxLength && event.target.selectionStart <= this.fObject.naturalMaxLength) ||
              (keyDownObject.decimalMaxLength >= this.fObject.decimalMaxLength && event.target.selectionStart > this.fObject.naturalMaxLength)
            )
          ) || ([110, 190].indexOf(e.keyCode) != -1 && (this.fObject.decimalMaxLength == 0 || ((<string>event.target.value).indexOf('.') != -1)))))) && (event.target.selectionEnd - event.target.selectionStart) === 0) {
        event.preventDefault();
        return;
      }
    }
  }

}
