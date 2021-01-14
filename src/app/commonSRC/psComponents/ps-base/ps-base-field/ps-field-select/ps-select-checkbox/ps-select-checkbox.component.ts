import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from './../../../../../psServices/logger/logger.service';
import { IOptionsPsFieldLabel, IOptionsPsFieldSelect, IOptionsPsSelectCheckbox } from './../../../../../psServices/models/ps-common-interface';
import { PsCommonService } from './../../../../../psServices/ps-common/ps-common.service';
import { PsFieldSelectComponent } from './../ps-field-select.component';


@Component({
  selector: 'ps-select-checkbox',
  templateUrl: './ps-select-checkbox.component.html',
  styleUrls: ['./ps-select-checkbox.component.scss'],
})
export class PsSelectCheckboxComponent extends PsFieldSelectComponent implements OnInit {

  @Input() options: IOptionsPsSelectCheckbox;
  checkBoxOptions: IOptionsPsFieldSelect;//passed to ion checkbox
  labelOptions: IOptionsPsFieldLabel;
  previewLblOptions: IOptionsPsFieldLabel;

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  get previewValOptions(): IOptionsPsFieldLabel {
    return {
      labelKey: this.options.group.value[this.options.fcName] ? this.commonProv.translate('yes_key') : this.commonProv.translate('NO_KEY'),
      psClass: 'ps-value-preview'
    };
  }

  ngOnInit() {
    this.custIconOptions.component = PsSelectCheckboxComponent;
    this.custIconOptions.componentOptions = this.options;
    super.init();
    this.labelOptions = {
      labelKey: this.options.labelKey,
    };
    this.previewLblOptions = {
      labelKey: this.options.labelKey,
      psClass: 'ps-lbl-preview'
    };
    this.custIconOptions.availableCustomization.PLACEHOLDER_LABEL_ID = false;
  }


}
