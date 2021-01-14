import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsDropdownLovComponent } from '../ps-dropdown-lov.component';
import { IOptionsPsDropdownLov } from '../ps-dropdown-lov.component.interfaces';
import { IOptionsPsLovTransactionTypeExposed } from './ps-lov-transaction-type.component.interfaces';

@Component({
  selector: 'ps-lov-transaction-type',
  templateUrl: './ps-lov-transaction-type.component.html',
  styleUrls: ['./ps-lov-transaction-type.component.scss'],
})
export class PsLovTransactionTypeComponent  extends PsDropdownLovComponent implements OnInit {
  @Input() options: IOptionsPsLovTransactionTypeExposed;

  defaultSelectOptions: IOptionsPsDropdownLov = {
    lovTypeId: CommonBussinessConstant.LOV_TYPE_TRANSACTION_TYPE
  };
  constructor(    commonProvService: PsCommonService,logger: LoggerService) {
    super(commonProvService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options, false);
    this.defaultSelectOptions.labelKey = this.commonProv.translate('transaction_type_key');
    this.defaultSelectOptions.placeHolder = this.commonProv.translate('select_transaction_type_key');
  }
  onChangeLov(values: IchangeValues) {
    this.onPsChange.emit(values);
 }
}
