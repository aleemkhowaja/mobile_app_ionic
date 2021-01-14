import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsDropdownLovComponent } from '../ps-dropdown-lov.component';
import { IOptionsPsDropdownLov } from '../ps-dropdown-lov.component.interfaces';
import { IOptionsPsLovMeansOfTransportationExposed } from './ps-lov-means-of-transportation.component.interfaces';

@Component({
  selector: 'ps-lov-means-of-transportation',
  templateUrl: './ps-lov-means-of-transportation.component.html',
  styleUrls: ['./ps-lov-means-of-transportation.component.scss'],
})
export class PsLovMeansOfTransportationComponent  extends PsDropdownLovComponent implements OnInit {
  @Input() options: IOptionsPsLovMeansOfTransportationExposed;

  defaultSelectOptions: IOptionsPsDropdownLov = {
    lovTypeId: CommonBussinessConstant.AND_OR_LOV_TYPE_ID

  };
  constructor(    commonProvService: PsCommonService,logger: LoggerService) {
    super(commonProvService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options, false);
    this.defaultSelectOptions.labelKey = this.commonProv.translate('and_or_key');
    this.defaultSelectOptions.placeHolder = '';
  }
  onChangeLov(values: IchangeValues) {
    this.onPsChange.emit(values);
 }
}
