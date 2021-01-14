import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsDropdownLovComponent } from '../ps-dropdown-lov.component';
import { IOptionsPsDropdownLov } from '../ps-dropdown-lov.component.interfaces';
import { IOptionsPsLovMaterialFromOtherCountryExposed } from './ps-lov-material-from-other-country.component.interfaces';

@Component({
  selector: 'ps-lov-material-from-other-country',
  templateUrl: './ps-lov-material-from-other-country.component.html',
  styleUrls: ['./ps-lov-material-from-other-country.component.scss'],
})
export class PsLovMaterialFromOtherCountryComponent  extends PsDropdownLovComponent implements OnInit {
  @Input() options: IOptionsPsLovMaterialFromOtherCountryExposed;

  defaultSelectOptions: IOptionsPsDropdownLov = {
    lovTypeId: CommonBussinessConstant.MATIRIAL_FROM_OTHER_CONTRY_LOV_TYPE_ID
  };
  constructor(    commonProvService: PsCommonService,logger: LoggerService) {
    super(commonProvService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options, false);
    this.defaultSelectOptions.labelKey = this.commonProv.translate('material-from-other-country_key');
    this.defaultSelectOptions.placeHolder = '';
  }
  onChangeLov(values: IchangeValues) {
    this.onPsChange.emit(values);
 }
}
