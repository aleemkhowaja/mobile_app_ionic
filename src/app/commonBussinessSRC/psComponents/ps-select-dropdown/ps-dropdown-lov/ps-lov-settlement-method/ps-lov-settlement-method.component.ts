import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsDropdownLovComponent } from '../ps-dropdown-lov.component';
import { IOptionsPsDropdownLov } from '../ps-dropdown-lov.component.interfaces';
import { IOptionsPsLovSettlementMethodExposed } from './ps-lov-settlement-method.component.interfaces';

@Component({
  selector: 'ps-lov-settlement-method',
  templateUrl: './ps-lov-settlement-method.component.html',
  styleUrls: ['./ps-lov-settlement-method.component.scss'],
})
export class PsLovSettlementMethodComponent  extends PsDropdownLovComponent implements OnInit {
  @Input() options: IOptionsPsLovSettlementMethodExposed;

  defaultSelectOptions: IOptionsPsDropdownLov = {
    lovTypeId: CommonBussinessConstant.SELLLEMENT_METHOD_LOV_TYPE_ID
  };
  constructor(    commonProvService: PsCommonService,logger: LoggerService) {
    super(commonProvService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options, false);
    this.defaultSelectOptions.labelKey = this.commonProv.translate('settlement_method_key');
    this.defaultSelectOptions.placeHolder = this.commonProv.translate('select_settlement_method_key');
  }
  onChangeLov(values: IchangeValues) {
    this.onPsChange.emit(values);
 }
}
