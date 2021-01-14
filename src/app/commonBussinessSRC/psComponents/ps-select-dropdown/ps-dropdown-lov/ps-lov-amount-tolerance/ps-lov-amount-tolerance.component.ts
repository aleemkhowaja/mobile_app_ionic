import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsDropdownLovComponent } from '../ps-dropdown-lov.component';
import { IOptionsPsDropdownLov } from '../ps-dropdown-lov.component.interfaces';
import { IOptionsPsLovAmountToleranceExposed } from './ps-lov-amount-tolerance.component.interfaces';

@Component({
  selector: 'ps-lov-amount-tolerance',
  templateUrl: './ps-lov-amount-tolerance.component.html',
  styleUrls: ['./ps-lov-amount-tolerance.component.scss'],
})
export class PsLovAmountToleranceComponent  extends PsDropdownLovComponent implements OnInit {
  @Input() options: IOptionsPsLovAmountToleranceExposed;

  defaultSelectOptions: IOptionsPsDropdownLov = {
    lovTypeId: CommonBussinessConstant.AMOUNT_TOLERANCE_LOV_TYPE_ID
  };
  constructor(    commonProvService: PsCommonService,logger: LoggerService) {
    super(commonProvService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options, false);
    this.defaultSelectOptions.labelKey = this.commonProv.translate('amount_tolerance_key');
    this.defaultSelectOptions.placeHolder = this.commonProv.translate('select_amount_tolerance_key');
  }
  onChangeLov(values: IchangeValues) {
    this.onPsChange.emit(values);
 }
}