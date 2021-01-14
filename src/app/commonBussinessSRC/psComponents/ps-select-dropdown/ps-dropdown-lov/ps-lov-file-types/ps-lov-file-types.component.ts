import { Component, OnInit, Input } from '@angular/core';
import { PsDropdownLovComponent } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-dropdown-lov.component';
import { IOptionsPsLovFileTypesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-file-types/ps-lov-file-types.component.interface';
import { IOptionsPsDropdownLov } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-dropdown-lov.component.interfaces';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';

@Component({
  selector: 'ps-lov-file-types',
  templateUrl: './ps-lov-file-types.component.html',
  styleUrls: ['./ps-lov-file-types.component.scss'],
})
export class PsLovFileTypesComponent extends PsDropdownLovComponent implements OnInit {

  @Input() options: IOptionsPsLovFileTypesExposed;

  public defaultOptions: IOptionsPsDropdownLov = {
    labelKey: 'file_type_key',
    placeHolder: 'select_file_type_key',
    lovTypeId: CommonBussinessConstant.LOV_TYPE_FILE_TYPES
  };
  constructor(commonProvService: PsCommonService,
              logger: LoggerService) {
      super(commonProvService, logger);
     }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultOptions, this.options, false);
  }

  onChangeLov(values: IchangeValues) {
    this.onPsChange.emit(values);
  }

}
