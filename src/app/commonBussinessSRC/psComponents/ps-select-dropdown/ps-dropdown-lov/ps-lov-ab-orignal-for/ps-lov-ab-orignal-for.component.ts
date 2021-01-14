import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsDropdownLovComponent } from '../ps-dropdown-lov.component';
import { IOptionsPsDropdownLov } from '../ps-dropdown-lov.component.interfaces';
import { IOptionsPsLovABOrignalForExposed } from './ps-lov-ab-orignal-for.component.interfaces';

@Component({
  selector: 'ps-lov-ab-orignal-for',
  templateUrl: './ps-lov-ab-orignal-for.component.html',
  styleUrls: ['./ps-lov-ab-orignal-for.component.scss'],
})
export class PsLovABOrignalForComponent  extends PsDropdownLovComponent implements OnInit {
  @Input() options: IOptionsPsLovABOrignalForExposed;

  defaultSelectOptions: IOptionsPsDropdownLov = {
    lovTypeId: CommonBussinessConstant.AIR_BILL_LOV_TYPE_ID
  };
  constructor(    commonProvService: PsCommonService,logger: LoggerService) {
    super(commonProvService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options, false);
    this.defaultSelectOptions.labelKey = this.commonProv.translate('a_b_original_for_key');
    this.defaultSelectOptions.placeHolder = '';
  }
  onChangeLov(values: IchangeValues) {
    this.onPsChange.emit(values);
 }
}
