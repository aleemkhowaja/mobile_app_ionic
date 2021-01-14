import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsDropdownLovComponent } from '../ps-dropdown-lov.component';
import { IOptionsPsDropdownLov } from '../ps-dropdown-lov.component.interfaces';

@Component({
  selector: 'ps-lov-card-types',
  templateUrl: './ps-lov-card-types.component.html',
  styleUrls: ['./ps-lov-card-types.component.scss'],
})
export class PsLovCardTypesComponent extends PsDropdownLovComponent implements OnInit {

  @Input() options: IOptionsPsDropdownLov;

  public defaultOptions: IOptionsPsDropdownLov = {
    labelKey: 'card_type_key',
    placeHolder: 'select_card_type_key',
    lovTypeId: CommonBussinessConstant.LOV_TYPE_ID_DEBIT_CREDIT_OPTIONS
  };

  constructor(
    commonProvService: PsCommonService,
    logger: LoggerService
  ) {
    super(commonProvService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultOptions, this.options, false);
  }

  onChangeLov(values: IchangeValues) {
    this.onPsChange.emit(values);
  }

}
