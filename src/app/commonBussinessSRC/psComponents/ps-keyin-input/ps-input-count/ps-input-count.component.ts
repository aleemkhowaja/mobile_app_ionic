import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PsKeyinInputComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-keyin/ps-keyin-input/ps-keyin-input.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsPsActionIcon, IOptionsPsContainerItem } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsInputCountExposed } from './ps-input-count.component.interfaces';


@Component({
  selector: 'ps-input-count',
  templateUrl: './ps-input-count.component.html',
})
export class PsInputCountComponent extends PsKeyinInputComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() options: IOptionsPsInputCountExposed;

  decrementIconOptions: IOptionsPsActionIcon = {
    iconName: 'arrow-dropdown-circle',
    iconPosition: 'end'
  };
  incrementIconOptions: IOptionsPsActionIcon = {
    iconName: 'arrow-dropup-circle',
    iconPosition: 'end'
  };
  currentInputValue: number;
  maxValue: number;
  minDisabled: boolean;
  minValue: number;
  displayDefaultOptions: boolean;
  showDefaultOptions: boolean;
  updateToMin: any = true;
  containerItemOptions: IOptionsPsContainerItem = {
    // hideImageAndIconIfNotPresent: true
  };
  constructor(commonP: PsCommonService, loggerP: LoggerService) {
    super(commonP, loggerP);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.checkMinMax();
    this.setAllowedOptionsOnInit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options.previousValue !== undefined) {
      this.options = changes.options.currentValue;
      this.checkMinMax();
      this.setAllowedOptionsOnInit();
    }
  }

  doCrements(type) {
    let countValue = type === 'decrement' ? this.currentInputValue - 1 : this.currentInputValue + 1;
    if (this.showDefaultOptions) {
      if (this.options.defaultValue !== undefined && CommonUtils.parseInt(this.options.defaultValue) !== 0) {
        this.currentInputValue = CommonUtils.parseInt(this.options.defaultValue);
        countValue = type === 'decrement' ? this.currentInputValue - 1 : this.currentInputValue + 1;
      }
      this.unSetDefaultValues();
    }
    if (typeof (countValue) === 'number' && countValue >= this.minValue && countValue <= this.maxValue) {
      this.currentInputValue = countValue;
      if (this.currentInputValue === this.minValue) {
        this.decrementIconOptions.isDisabled = true;
      }
      if (this.currentInputValue === this.maxValue) {
        this.incrementIconOptions.isDisabled = true;
      }
      this.options.group.controls[this.options.inputCountOptions.fcName].setValue(this.currentInputValue);
      this.onPsChange.emit(this.currentInputValue);
    } else if (typeof (countValue) === 'number') {
      if (countValue >= this.maxValue) {
        this.currentInputValue = this.maxValue;
        this.decrementIconOptions.isDisabled = false;
        this.incrementIconOptions.isDisabled = true;
      } else {
        this.currentInputValue = this.minValue;
        this.decrementIconOptions.isDisabled = true;
        this.incrementIconOptions.isDisabled = false;
      }
      this.options.group.controls[this.options.inputCountOptions.fcName].setValue(this.currentInputValue);
      this.onPsChange.emit(this.currentInputValue);
    }
  }

  onChangeCount(counter) {
    let countValue;
    if (counter.newValue !== undefined && counter.oldValue !== undefined) {
      countValue = parseInt(counter.newValue);
      this.checkAndSetCounterValue(countValue);
      this.unSetDefaultValues();
    } else if (counter.newValue === undefined) {
      countValue = counter;
      this.checkAndSetCounterValue(countValue);
    }
  }

  onEmptyCounter(value) {
    if (value === '' && this.hasDefaultValue()) {
      this.setDefaultValues();
    }
  }

  checkMinMax() {
    if (this.options.min !== undefined && this.options.max !== undefined) {
      this.minValue = this.options.min;
      this.maxValue = this.options.max;
      this.minDisabled = true;
      this.currentInputValue = this.minValue;
      this.options.group.controls[this.options.inputCountOptions.fcName].setValue(this.minValue);
    } else if (this.options.min === undefined && this.options.max === undefined) {
      this.minValue = 0;
      this.maxValue = Infinity;
      this.minDisabled = true;
      this.currentInputValue = this.minValue;
      this.options.group.controls[this.options.inputCountOptions.fcName].setValue(this.minValue);
    } else if (this.options.min !== undefined && this.options.max === undefined) {
      this.minValue = this.options.min;
      this.maxValue = Infinity;
      this.minDisabled = true;
      this.currentInputValue = this.minValue;
      this.options.group.controls[this.options.inputCountOptions.fcName].setValue(this.minValue);
    } else if (this.options.max !== undefined && this.options.min === undefined) {
      this.minValue = 0;
      this.maxValue = this.options.max;
      this.minDisabled = true;
      this.currentInputValue = this.minValue;
      this.options.group.controls[this.options.inputCountOptions.fcName].setValue(this.minValue);
    }
  }

  hasDefaultValue() {
    if (this.options.inputDefaultOptions !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  setAllowedOptionsOnInit() {
    const inputNumber = this.options.inputCountObject[this.options.inputCountOptions.fcName];
    const inputString = this.options.inputCountObject[this.options.inputDefaultOptions.fcName];
    if (this.options.inputCountObject !== undefined && (inputNumber !== undefined && inputNumber !== null) || (inputString !== undefined && inputString !== null)) {
      if ((inputNumber !== undefined && inputNumber !== null)) {
      this.currentInputValue = parseInt(inputNumber);
      this.unSetDefaultValues();
      this.checkAndSetCounterValue(this.currentInputValue);
      } else if ((inputString !== undefined && inputString !== null)) {
        this.setDefaultValues();
      }
    } else {
      if (this.hasDefaultValue()) {
        this.setDefaultValues();
      } else {
        // In this case the default options html will not generate.
        this.unSetDefaultValues();
        this.decrementIconOptions.isDisabled = true;
      }
    }
  }

  checkAndSetCounterValue(countValue) {
    if (typeof (countValue) === 'number' && countValue >= this.minValue && countValue <= this.maxValue) {
      this.currentInputValue = countValue;
      this.options.group.controls[this.options.inputCountOptions.fcName].setValue(this.currentInputValue);
      this.onPsChange.emit(this.currentInputValue);
    } else if (typeof (countValue) === 'number') {
      if (countValue > this.maxValue) {
        this.currentInputValue = this.maxValue;
      } else if (countValue < this.minValue) {
        this.currentInputValue = this.minValue;
      } else {
        this.currentInputValue = 0;
      }
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.options.inputCountOptions.fcName], 0);
      this.options.group.controls[this.options.inputCountOptions.fcName].setValue(null);
      if (this.updateToMin) {
        this.updateToMin = false;
        setTimeout(() => {
          this.options.group.controls[this.options.inputCountOptions.fcName].setValue(this.currentInputValue);
          this.onPsChange.emit(this.currentInputValue);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.options.inputCountOptions.fcName], 1);
        }, 800);
        setTimeout(() => {
          this.updateToMin = true;
        }, 1500);
      }
    }
  }

  setDefaultValues() {
    this.showDefaultOptions = true;
    this.currentInputValue = this.minValue;
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.options.inputDefaultOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.options.inputDefaultOptions.fcName], 1);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.options.inputCountOptions.fcName], 0);
    this.options.group.controls[this.options.inputCountOptions.fcName].setValue(null);
    this.options.group.controls[this.options.inputDefaultOptions.fcName].setValue(this.options.defaultValue);
    this.onPsChange.emit('Unlimited');
  }

  unSetDefaultValues() {
    if (this.hasDefaultValue()) {
      this.showDefaultOptions = false;
      if (this.options.defaultValue !== undefined && CommonUtils.parseInt(this.options.defaultValue) !== 0) {
        this.currentInputValue = CommonUtils.parseInt(this.options.defaultValue);
      }
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.options.inputDefaultOptions.fcName], 0);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.options.inputDefaultOptions.fcName], 0);
      this.options.group.controls[this.options.inputDefaultOptions.fcName].setValue(null);
    }
    this.options.group.controls[this.options.inputCountOptions.fcName].setValue(this.currentInputValue);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.options.inputCountOptions.fcName], 1);
    this.onPsChange.emit(this.currentInputValue);
  }
}
