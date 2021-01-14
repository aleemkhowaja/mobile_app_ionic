import { Directive, ElementRef, Host, HostListener, Input, OnInit, Optional, SkipSelf } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective } from '@angular/forms';
import Inputmask from 'inputmask';
import { ConstantCommon } from '../../psServices/models/common-constant';
import { IPsMaskOptions } from '../../psServices/models/ps-common-interface';


@Directive({
  selector: '[psInputMask]'
})
export class PsInputMaskDirective implements OnInit {
  @Input() psInputMask: IPsMaskOptions;
  @Input() formControlName: string;
  private inputController: AbstractControl;

  /**
   * Event key up in directive
   * @author Richard Zourob
   * @constant {string} value
   */
  @HostListener('keyup', ['$event'])
  inputKeyup(event: any): void {
    // modified by Richie for #BUG 960357
    const val = event.target.value;
    // Condition Added by Richie in order not to use the masker in case not provided
    if (val && this.psInputMask) {
      // Added by Richie for TP# 1032036
      let start = event.target.selectionStart;
      let end = event.target.selectionEnd;
      // in case of currency mask then check the count of thousands separator that exists before the current cursor position
      let countBefore = 0;
      if (this.psInputMask.alias === 'currency') {
        const leftPart = String(val).substring(0, start);
        countBefore = leftPart ? leftPart.split(ConstantCommon.THOUSANDS_SEPARATOR).length - 1 : 0;
      }
      // end Richie
      const value = this.returnValue(val);
      // set the value in the controller
      // this.setValueInFormControl(value); // Commented by Richie for TP# 1032036
      // Added by Richie for TP# 1032036
      event.target.value = value;
      // reset the cursor to initial position
      let countAfter = 0;
      if (this.psInputMask.alias === 'currency') {
        const leftPart = String(value).substring(0, start);
        countAfter = leftPart ? leftPart.split(ConstantCommon.THOUSANDS_SEPARATOR).length - 1 : 0;
        start = end = start + (countAfter - countBefore);
        event.target.setSelectionRange(start, end);
      }
      // End Richie
    }
  }

  constructor(
    @Optional() @Host() @SkipSelf()
    private controlContainer: FormGroupDirective,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    // Condition Added by Richie in order not to use the masker in case not provided
    if (this.psInputMask) {
      if (this.controlContainer) {
        if (this.formControlName) {
          this.inputController = this.controlContainer.control.get(this.formControlName);
        } else {
          // console.warn('Missing FormControlName directive from host element of the component');
        }
      } else {
        // console.warn('Can\'t find parent FormGroup directive');
      }
      this.initialValue();
    }
  }

  initialValue(): void {
    const initVal = this.elementRef.nativeElement.value;
    const value: string = this.returnValue(initVal);
    this.setValueInFormControl(value);
  }

  returnValue(value: string): string {
    if (value && this.psInputMask) {
      const formattedVal: string = Inputmask.format(value, this.psInputMask);
      // commented by Richie for #BUG 960357
      // if (this.psInputMask.alias === 'amount') {
      //   const decimalSeparator = this.psInputMask.radixPoint === '.' ? '\.' : this.psInputMask.radixPoint;
      //   const thousandsSeparator = this.psInputMask.groupSeparator === '.' ? '\.' : this.psInputMask.groupSeparator;
      //   const regex = '^(0' + thousandsSeparator + '?)+[^(' + decimalSeparator + '1-9)]'; // '^(0,?)+[^(\.1-9)]'
      //   formattedVal = formattedVal.replace(RegExp(regex), '');
      // }
      // end Richie
      if (this.inputController) {
        this.inputController[ConstantCommon.CONTROLLER_VALUE_CHANGED] = true;
      }
      return formattedVal;
    } else {
      return value;
    }
  }
  /**
   * The verification of form
   * @author Richard Zourob
   * @example <caption>this.verifyFormControl()</caption>
   * @returns {boolean} return a boolean value
   */
  verifyFormControl(): boolean {
    if (this.inputController instanceof FormControl) {
      return false;
    } else {
      return false;
    }
  }

  /**
   * Set Value em FormControl
   * @author Richard Zourob
   * @example <caption>this.setValueInFormControl(string)</caption>
   */
  setValueInFormControl(value: string): void {
    if (!this.verifyFormControl()) {
      this.elementRef.nativeElement.value = value;
      return;
    }

    // emitEvent: false added by Richie in order to prevent calling the change event upon pressing each key
    this.inputController.setValue(value, {
      emitEvent: false,
      // emitModelToViewChange: false,
      emitViewToModelChange: false
    });
    this.inputController.updateValueAndValidity({ emitEvent: false });
  }

}
