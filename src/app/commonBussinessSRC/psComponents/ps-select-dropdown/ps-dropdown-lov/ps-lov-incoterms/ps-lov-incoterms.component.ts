import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsDropdownLovComponent } from '../ps-dropdown-lov.component';
import { IOptionsPsDropdownLov } from '../ps-dropdown-lov.component.interfaces';
import { IOptionsPsLovIncotermsExposed } from './ps-lov-incoterms.component.interfaces';

@Component({
  selector: 'ps-lov-incoterms',
  templateUrl: './ps-lov-incoterms.component.html',
  styleUrls: ['./ps-lov-incoterms.component.scss'],
})
export class PsLovIncotermsComponent  extends PsDropdownLovComponent implements OnInit {
  @Input() options: IOptionsPsLovIncotermsExposed;

  defaultSelectOptions: IOptionsPsDropdownLov = {
    lovTypeId: CommonBussinessConstant.INCOTERMS_LOV_TYPE_ID
  };
  constructor(    commonProvService: PsCommonService, logger: LoggerService) {
    super(commonProvService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options, false);
    this.defaultSelectOptions.labelKey = this.commonProv.translate('incoterms_key');
    this.defaultSelectOptions.placeHolder = this.commonProv.translate('select_incoterm_key');
  }
  onChangeLov(values: IchangeValues) {
    this.onPsChange.emit(values);
 }
}
