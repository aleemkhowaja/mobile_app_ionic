import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsDropdownLovComponent } from '../ps-dropdown-lov.component';
import { IOptionsPsDropdownLov } from '../ps-dropdown-lov.component.interfaces';
import { IOptionsPsLovConfirmationInstructionExposed } from './ps-lov-confirmation-instruction.component.interfaces';

@Component({
  selector: 'ps-lov-confirmation-instruction',
  templateUrl: './ps-lov-confirmation-instruction.component.html',
  styleUrls: ['./ps-lov-confirmation-instruction.component.scss'],
})
export class PsLovConfirmationInstructionComponent extends PsDropdownLovComponent implements OnInit {
  @Input() options: IOptionsPsLovConfirmationInstructionExposed;

  defaultSelectOptions: IOptionsPsDropdownLov = {
    lovTypeId: CommonBussinessConstant.CONFIRMATION_INSUTRUCTION_LOV_TYPE_ID
  };
  constructor(commonProvService: PsCommonService, logger: LoggerService) {
    super(commonProvService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options, false);
    this.defaultSelectOptions.labelKey = this.commonProv.translate('confirmation_instruction_key');
    this.defaultSelectOptions.placeHolder = this.commonProv.translate('select_confirmation_instruction_key');
  }
  onChangeLov(values: IchangeValues) {
    this.onPsChange.emit(values);
  }
}
