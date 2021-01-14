import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsDropdownLovComponent } from '../ps-dropdown-lov.component';
import { IOptionsPsDropdownLov } from '../ps-dropdown-lov.component.interfaces';
import { IOptionsPsLovGenderExposed } from './ps-lov-gender.component.interfaces';

@Component({
  selector: 'ps-lov-gender',
  templateUrl: './ps-lov-gender.component.html',
  styleUrls: ['./ps-lov-gender.component.scss'],
})
export class PsLovGenderComponent  extends PsDropdownLovComponent implements OnInit {
  @Input() options: IOptionsPsLovGenderExposed;
  defaultSelectOptions: IOptionsPsDropdownLov = {
    iconLocation: PsCommonBusinessSettings.ICON_LOCATION_GENERAL,
    iconExtension: PsCommonBusinessSettings.IMG_GENDER_EXTENSION,
    lovTypeId: CommonBussinessConstant.GENDER_LOV_TYPE_ID
  };
  constructor(    commonProvService: PsCommonService,logger: LoggerService) {
    super(commonProvService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options, false);
    this.defaultSelectOptions.labelKey = this.commonProv.translate('gender_key');
    this.defaultSelectOptions.placeHolder = this.commonProv.translate('gender_key');
  }
  onChangeLov(values: IchangeValues) {
    this.onPsChange.emit(values);
 }
}
