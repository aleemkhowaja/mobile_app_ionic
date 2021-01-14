import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PsSelect } from 'src/app/commonSRC/psServices/models/common-type';

import { LoggerService } from '../../../../psServices/logger/logger.service';
import { IOptionsPsFieldSelect } from '../../../../psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../psServices/ps-common/ps-common.service';
import { PsBaseFieldComponent } from '../ps-base-field.component';

@Component({
  selector: 'ps-field-select',
  templateUrl: './ps-field-select.component.html',
  styleUrls: ['./ps-field-select.component.scss'],
})
export class PsFieldSelectComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsFieldSelect;
  public loadMoreAsyncData = false;
  public filteredArray: PsSelect = [];
  public numberOfRowsToShow = 5;

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.init();
  }

  init() {
    super.init(true);
    this.setCustIconOptions(false);
  }

  protected setCustIconOptions(fromChild: boolean = true) {
    this.custIconOptions.availableCustomization.IS_MANDATORY = true;
    this.custIconOptions.availableCustomization.PLACEHOLDER_LABEL_ID = true;
    if (fromChild) {
      super.setCustIconOptions();
    }
  }

}
