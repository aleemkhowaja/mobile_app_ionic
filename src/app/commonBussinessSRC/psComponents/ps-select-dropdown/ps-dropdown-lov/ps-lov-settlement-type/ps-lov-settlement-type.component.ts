import { IOptionsPsLovSettlementTypeExposed } from './ps-lov-settlement-type.component.interfaces';
import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsDropdownLovComponent } from '../ps-dropdown-lov.component';
import { IOptionsPsDropdownLov } from '../ps-dropdown-lov.component.interfaces';

@Component({
  selector: 'ps-lov-settlement-type',
  templateUrl: './ps-lov-settlement-type.component.html',
  styleUrls: ['./ps-lov-settlement-type.component.scss'],
})
export class PsLovSettlementTypeComponent  extends PsDropdownLovComponent implements OnInit {
  @Input() options: IOptionsPsLovSettlementTypeExposed;

  defaultSelectOptions: IOptionsPsDropdownLov = {
    lovTypeId: CommonBussinessConstant.LOV_TYPE_ID_SELLLEMENT_TYPE
  };
  constructor(    commonProvService: PsCommonService,logger: LoggerService) {
    super(commonProvService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options, false);
    this.defaultSelectOptions.labelKey = this.commonProv.translate('settlement_type_key');
    this.defaultSelectOptions.placeHolder = this.commonProv.translate('select_settlement_type_key');
  }
  onChangeLov(values: IchangeValues) {
    this.onPsChange.emit(values);
 }
}
