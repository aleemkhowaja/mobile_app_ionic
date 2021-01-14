import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsDropdownLovComponent } from '../ps-dropdown-lov.component';
import { IOptionsPsDropdownLov } from '../ps-dropdown-lov.component.interfaces';
import { IOptionsPsLovChargesBorneByExposed } from './ps-lov-charges-borne-by.component.interfaces';

@Component({
  selector: 'ps-lov-charges-borne-by',
  templateUrl: './ps-lov-charges-borne-by.component.html',
  styleUrls: ['./ps-lov-charges-borne-by.component.scss'],
})
export class PsLovChargesBorneByComponent  extends PsDropdownLovComponent implements OnInit {
  @Input() options: IOptionsPsLovChargesBorneByExposed;

  defaultSelectOptions: IOptionsPsDropdownLov = {
    lovTypeId: CommonBussinessConstant.CHARGES_BORNE_BY_LOV_TYPE_ID
  };
  constructor(    commonProvService: PsCommonService,logger: LoggerService) {
    super(commonProvService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options, false);
    this.defaultSelectOptions.labelKey = this.commonProv.translate('charges_borne_by_key');
    this.defaultSelectOptions.placeHolder = 'select_charges_borne_by';
  }
  onChangeLov(values: IchangeValues) {
    this.onPsChange.emit(values);
 }
}
