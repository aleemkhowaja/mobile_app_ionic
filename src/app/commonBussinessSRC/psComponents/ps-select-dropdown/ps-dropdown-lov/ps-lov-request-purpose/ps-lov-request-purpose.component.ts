import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsDropdownLovComponent } from '../ps-dropdown-lov.component';
import { IOptionsPsDropdownLov } from '../ps-dropdown-lov.component.interfaces';
import { IOptionsPsLovRequestPurposeExposed } from './ps-lov-request-purpose.component.interfaces';

@Component({
  selector: 'ps-lov-request-purpose',
  templateUrl: './ps-lov-request-purpose.component.html',
  styleUrls: ['./ps-lov-request-purpose.component.scss'],
})
export class PsLovRequestPurposeComponent  extends PsDropdownLovComponent implements OnInit {
  @Input() options: IOptionsPsLovRequestPurposeExposed;

  defaultSelectOptions: IOptionsPsDropdownLov = {
    lovTypeId: CommonBussinessConstant.LC_REQUEST_PURPOSE_LOV_TYPE_ID
  };
  constructor(    commonProvService: PsCommonService,logger: LoggerService) {
    super(commonProvService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options, false);
    this.defaultSelectOptions.labelKey = this.commonProv.translate('request_purpose_key');
    this.defaultSelectOptions.placeHolder = this.commonProv.translate('select_request_purpose_key');
  }
  onChangeLov(values: IchangeValues) {
    this.onPsChange.emit(values);
 }
}
