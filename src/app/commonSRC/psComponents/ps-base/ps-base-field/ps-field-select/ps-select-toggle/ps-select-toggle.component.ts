import { Component, Input, OnInit } from '@angular/core';

import { IOptionsPsSelectToggle } from '../../../../../psServices/models/ps-common-interface';
import { LoggerService } from './../../../../../psServices/logger/logger.service';
import { IOptionsPsFieldLabel, IOptionsPsLabelInput } from './../../../../../psServices/models/ps-common-interface';
import { PsCommonService } from './../../../../../psServices/ps-common/ps-common.service';
import { PsFieldSelectComponent } from './../ps-field-select.component';

@Component({
  selector: 'ps-select-toggle',
  templateUrl: './ps-select-toggle.component.html',
  styleUrls: ['./ps-select-toggle.component.scss'],
})
export class PsSelectToggleComponent extends PsFieldSelectComponent implements OnInit {

  @Input() options: IOptionsPsSelectToggle;
  labelOptions: IOptionsPsLabelInput = {
  };

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  get previewValOptions(): IOptionsPsFieldLabel {
    return {
        labelKey: this.options.group.value[this.options.fcName]? this.commonProv.translate('yes_key'): this.commonProv.translate('no_key'),
        psClass: 'ps-value-preview'
    };
}
  ngOnInit() {
    super.ngOnInit();
    this.custIconOptions.component = PsSelectToggleComponent;
    this.custIconOptions.componentOptions = this.options;
    this.labelOptions.labelKey = this.options.labelKey;
    this.labelOptions.required = false;
  }

}
