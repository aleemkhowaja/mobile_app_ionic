import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsDropdownLovComponent } from '../ps-dropdown-lov.component';
import { IOptionsPsDropdownLov } from '../ps-dropdown-lov.component.interfaces';
import { IOptionsPsLovCreditAvailabilityExposed } from './ps-lov-credit-availability.component.interfaces';

@Component({
  selector: 'ps-lov-credit-availability',
  templateUrl: './ps-lov-credit-availability.component.html',
  styleUrls: ['./ps-lov-credit-availability.component.scss'],
})
export class PsLovCreditAvailabilityComponent  extends PsDropdownLovComponent implements OnInit {
  @Input() options: IOptionsPsLovCreditAvailabilityExposed;

  defaultSelectOptions: IOptionsPsDropdownLov = {
    lovTypeId: CommonBussinessConstant.CREDIT_AVAILABILITY_LOV_TYPE_ID
  };
  constructor(    commonProvService: PsCommonService,logger: LoggerService) {
    super(commonProvService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options, false);
    this.defaultSelectOptions.labelKey = this.commonProv.translate('credit_availability_key');
    this.defaultSelectOptions.placeHolder = this.commonProv.translate('select_credit_availability_key');
  }
  onChangeLov(values: IchangeValues) {
    this.onPsChange.emit(values);
 }
}
