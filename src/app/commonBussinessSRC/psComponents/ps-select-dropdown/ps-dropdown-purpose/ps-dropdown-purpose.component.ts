import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues, IOptionsPsSelectDropdown } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsDropdownPurposeExposed } from './ps-dropdown-purpose.component.interface';

@Component({
  selector: 'ps-dropdown-purpose',
  templateUrl: './ps-dropdown-purpose.component.html',
  styleUrls: ['./ps-dropdown-purpose.component.scss'],
})
export class PsDropdownPurposeComponent extends PsSelectDropdownComponent implements OnInit, OnChanges {

  @Input() options: IOptionsPsDropdownPurposeExposed;

  purposeOptions: IOptionsPsSelectDropdown;

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.init();
  }

  ngOnChanges(change: SimpleChanges) {
    this.init();
  }

  public init() {
    this.purposeOptions = {
      labelKey: this.options.labelKey ? this.options.labelKey : 'purpose_key',
      placeHolder: this.options.placeHolder ? this.options.placeHolder : 'select_purpose_key',
      fcName: this.options.fcName,
      group: this.options.group,
      listOfOptions: this.options.listOfOptions
    };
  }

  onChangePurpose(value: IchangeValues) {
    this.commonProv.logger.log('onChangePurposebaseCom',value);
    this.onPsChange.emit(value);
  }

}
