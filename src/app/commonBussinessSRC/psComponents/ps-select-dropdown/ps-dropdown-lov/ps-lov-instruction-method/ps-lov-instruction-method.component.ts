import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsDropdownLovComponent } from '../ps-dropdown-lov.component';
import { IOptionsPsDropdownLov } from '../ps-dropdown-lov.component.interfaces';
import { IOptionsPsLovInstructionMethodExposed } from './ps-lov-instruction-method.component.interfaces';

@Component({
  selector: 'ps-lov-instruction-method',
  templateUrl: './ps-lov-instruction-method.component.html',
  styleUrls: ['./ps-lov-instruction-method.component.scss'],
})
export class PsLovInstructionMethodComponent extends PsDropdownLovComponent implements OnInit {

  @Input() options: IOptionsPsLovInstructionMethodExposed;
  public defaultSelectOptions: IOptionsPsDropdownLov = {
    lovTypeId: CommonBussinessConstant.INSUTRUCTION_METHOD_LOV_TYPE_ID
  };

  constructor(commonProvService: PsCommonService, logger: LoggerService) {
    super(commonProvService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options, false);
    this.defaultSelectOptions.labelKey = this.commonProv.translate('instruction_method_key');
    this.defaultSelectOptions.placeHolder = this.commonProv.translate('select_instruction_method_key');
  }

  onChangeLov(values: IchangeValues) {
    this.onPsChange.emit(values);
  }
}
