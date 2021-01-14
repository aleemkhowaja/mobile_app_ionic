import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from './../../../../../psServices/logger/logger.service';
import { IOptionsPsContainerItem, IOptionsPsLabelInput, IOptionsSelectRadio } from './../../../../../psServices/models/ps-common-interface';
import { PsCommonService } from './../../../../../psServices/ps-common/ps-common.service';
import { PsFieldSelectComponent } from './../ps-field-select.component';


@Component({
  selector: 'ps-select-radio',
  templateUrl: './ps-select-radio.component.html',
  styleUrls: ['./ps-select-radio.component.scss'],
})
export class PsSelectRadioComponent extends PsFieldSelectComponent implements OnInit {

  @Input() options: IOptionsSelectRadio;
  itemOptions: IOptionsPsContainerItem = {};
  headerLabelOptions: IOptionsPsLabelInput = {};
  radioDescription: IOptionsPsLabelInput[] = [];


  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.custIconOptions.component = PsSelectRadioComponent;
    this.custIconOptions.componentOptions = this.options;
    this.componentName = 'PsSelectRadioComponent'; // Added by Richie for #TP 1082495 in order to know what is the current component inctance
    super.ngOnInit();
    this.headerLabelOptions.labelKey = this.options.labelKey;
    this.headerLabelOptions.required = this.required;
    if (this.options.listOfOptions && this.options.listOfOptions.length > 0) {
      for (const eachOption of this.options.listOfOptions) {
        const option: IOptionsPsLabelInput = {
          labelKey: eachOption.description
        };
        this.radioDescription.push(option);
      }
    }
  }


  get selectedItem(): any {
    const obj = super.returnValue(true);
    if (obj instanceof Object) {
      return obj.itemValue;
    } else if (obj !== undefined) {
      const selectItem = this.options.listOfOptions.filter((item) => item.itemValue === obj || String(item.itemValue) === String(obj));
      if (selectItem.length > 0) {
        super.writeValue(selectItem[0]);
      }
      return obj;
    }
    return obj;
  }

  set selectedItem(value: any) {
    const selectItem = this.options.listOfOptions.filter((item) => item.itemValue === value || String(item.itemValue) === String(value));
    if (selectItem.length > 0) {
      super.writeValue(selectItem[0], true);
    }
  }

}
