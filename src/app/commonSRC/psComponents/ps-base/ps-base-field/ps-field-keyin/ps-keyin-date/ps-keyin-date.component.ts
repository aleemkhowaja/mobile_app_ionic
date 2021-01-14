import { Component, Input, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { PsDateFormatPipe } from 'src/app/commonSRC/psPipes/ps-date-format/ps-date-format.pipe';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsFieldLabel, IOptionsPsKeyinDate } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsActionIcon, IOptionsPsLabelInput } from '../../../../../psServices/models/ps-common-interface';
import { PsFieldKeyinComponent } from '../ps-field-keyin.component';


@Component({
  selector: 'ps-keyin-date',
  templateUrl: './ps-keyin-date.component.html',
  styleUrls: ['./ps-keyin-date.component.scss'],
})
export class PsKeyinDateComponent extends PsFieldKeyinComponent implements OnInit {


  @Input() public options: IOptionsPsKeyinDate;
  get labelOptions(): IOptionsPsLabelInput {
    return {
      required: this.required,
      labelKey: this.options.labelKey,
      previewMode: this.previewMode,
      psClass: 'ps-keyin-date-label'
    };
  }
  previewLblOptions: IOptionsPsFieldLabel;
  iconOptions: IOptionsPsActionIcon = {
    iconName: 'calendar'
  };
  isMobile = true;
  year_values: any = [];

  /** Updated by Hisham.Omar TP#1136182 start
   *  Add additional condition that checks if the date should
   *  be set as formatted or as full date.
   *  Bind 'dateValue' variable to ngModel of the date. 
   */
  get dateValue() {
    const tempVal = super.returnValue();
    if (this.options && this.options.displayFormat && tempVal && this.options.setValAsFormat) {
      return new PsDateFormatPipe().transform(tempVal, this.options.displayFormat);
    } else {
      return tempVal;
    }
  }

  set dateValue(val) {
    if (this.options && this.options.displayFormat && this.options.setValAsFormat) {
      super.writeValue(new PsDateFormatPipe().transform(val, this.options.displayFormat));
    } else {
      super.writeValue(val);
    }
  }
  /** Updated by Hisham.Omar TP#1136182 end */

  /** Added by Hisham.Omar TP#1136182 start
   *  Create a getter 'formattedValue' that always format the date
   *  choosen whenever a display format exist.
   *  Use this getter to display the resulted value in the field.
   */
  get formattedValue() {
    const tempVal = super.returnValue();
    if (this.options && this.options.displayFormat && tempVal) {
      return new PsDateFormatPipe().transform(tempVal, this.options.displayFormat);
    } else {
      return tempVal;
    }
  }

  set formattedValue(val) {
    if (this.options && this.options.displayFormat) {
      super.writeValue(new PsDateFormatPipe().transform(val, this.options.displayFormat));
    } else {
      super.writeValue(val);
    }
  }
  /** Added by Hisham.Omar TP#1136182 end */

  get min() {
    const val = this.options.min;
    if (this.isMobile) {
      return new PsDateFormatPipe().transform(val, ConstantCommon.PREV_DATE_FORMAT);
    } else {
      try {
        return new Date(val);
      } catch (e) {
        this.logger.error(e);
        return null;
      }
    }
  }

  get max() {
    const val = this.options.max;
    if (this.isMobile) {
      return new PsDateFormatPipe().transform(val, ConstantCommon.PREV_DATE_FORMAT);
    } else {
      try {
        return new Date(val);
      } catch (e) {
        this.logger.error(e);
        return null;
      }
    }
  }

  get previewValOptions(): IOptionsPsFieldLabel {
    let prevFormat = ConstantCommon.PREV_DATE_FORMAT;
    if (this.options && this.options.displayFormat) {
      prevFormat = this.options.displayFormat;//.toLowerCase();
      //  if (prevFormat.indexOf('mmmmm') > -1) {
      //    prevFormat = prevFormat.replace('mmmmm', 'MMMMM');
      // } else if (prevFormat.indexOf('mmmm') > -1) {
      //   prevFormat = prevFormat.replace('mmmm', 'MMMM');
      // } else if (prevFormat.indexOf('mmm') > -1) {
      //   prevFormat = prevFormat.replace('mmm', 'MMM');
      // } else if (prevFormat.indexOf('mm') > -1) {
      //   prevFormat = prevFormat.replace('mm', 'MM');
      //  }
    }
    return {
      labelKey: new PsDateFormatPipe().transform(this.fcValue, prevFormat),
      psClass: 'ps-value-preview',
      previewMode: true
    };
  }

  constructor(public commonProv: PsCommonService, loggerP: LoggerService, private dateAdapter?: DateAdapter<any>) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.dateAdapter.setLocale(String(PsCommonSettings.activeLanguge).toLocaleLowerCase());
    // remove the default_value cust from date fields as per Joseph's request since there's no business value in defining static value to be set on screens
    this.custIconOptions.availableCustomization.DEFAULT_VALUE = false;
    this.custIconOptions.component = PsKeyinDateComponent;
    super.ngOnInit();
    this.custIconOptions.componentOptions = this.options;
    this.isMobile = this.commonProv.isMobile();
    // if the max is not defined then add the max of 100 years in the future since ion-datetime has the max by default as the end of the current year
    // if the min is not defined then subtract the min of 100 years in the past same as the default min of ion-datetime
    // let min_year = new Date().setFullYear( new Date().getFullYear() - 100);
    // let max_year = new Date().setFullYear( new Date().getFullYear() + 100);

    // for (let diff = min_year; diff < max_year; diff++) {
    //   this.yearValues.push(diff.toString());
    // }


    if (!this.options.min) {
      this.options.min = new Date();
      this.options.min.setFullYear(this.options.min.getFullYear() - 100);
    }

    if (!this.options.max) {
      this.options.max = new Date();
      this.options.max.setFullYear(this.options.max.getFullYear() + 100);
    }

    for (let min = this.options.min.getFullYear(); min <= this.options.max.getFullYear(); min++) {
      this.year_values.push(min);

    }
    if (this.options.labelKey !== undefined) {
      this.labelOptions.labelKey = this.options.labelKey;
    }
    this.previewLblOptions = {
      labelKey: this.options.labelKey,
      psClass: 'ps-lbl-preview',
      previewMode: true
    };
    this.labelOptions.required = this.required;
    this.itemOptions.iconOptions = this.iconOptions;
  }

  dateChanged(value) {
    this.options.placeHolder = null;
  }

}
