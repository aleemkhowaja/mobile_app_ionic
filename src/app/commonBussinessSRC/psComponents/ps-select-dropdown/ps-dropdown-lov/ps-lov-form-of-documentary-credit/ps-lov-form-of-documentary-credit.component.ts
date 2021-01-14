import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsDropdownLovComponent } from '../ps-dropdown-lov.component';
import { IOptionsPsDropdownLov } from '../ps-dropdown-lov.component.interfaces';
import { IOptionsPsLovFormOfDocumentaryCreditExposed } from './ps-lov-form-of-documentary-credit.component.interfaces';

@Component({
  selector: 'ps-lov-form-of-documentary-credit',
  templateUrl: './ps-lov-form-of-documentary-credit.component.html',
  styleUrls: ['./ps-lov-form-of-documentary-credit.component.scss'],
})
export class PsLovFormOfDocumentaryCreditComponent  extends PsDropdownLovComponent implements OnInit {
  @Input() options: IOptionsPsLovFormOfDocumentaryCreditExposed;

  defaultSelectOptions: IOptionsPsDropdownLov = {
    lovTypeId: CommonBussinessConstant.FORM_OF_DOCUMENTARY_CREDIT_LOV_TYPE_ID
  };
  constructor(commonProvService: PsCommonService, logger: LoggerService) {
    super(commonProvService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options, false);
    this.defaultSelectOptions.labelKey = this.commonProv.translate('form_of_documentary_credit_key');
    this.defaultSelectOptions.placeHolder = 'select_form_of_documentary_key';
  }
  onChangeLov(values: IchangeValues) {
    this.onPsChange.emit(values);
 }
}
