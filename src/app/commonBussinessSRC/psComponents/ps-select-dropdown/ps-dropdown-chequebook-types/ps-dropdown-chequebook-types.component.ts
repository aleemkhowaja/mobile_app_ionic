import { Component, Input, OnInit } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsSelect } from 'src/app/commonSRC/psServices/models/common-type';
import { IchangeValues, IOptionsPsSelectDropdown } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { CommonBussinessConstant } from './../../../psServices/models/ps-common-bussiness-constant';
import { IOptionsPsDropdownChequebookTypesExposed } from './ps-dropdown-chequebook-types.component.interface';

@Component({
  selector: 'ps-dropdown-chequebook-types',
  templateUrl: './ps-dropdown-chequebook-types.component.html',
  styleUrls: ['./ps-dropdown-chequebook-types.component.scss'],
})
export class PsDropdownChequebookTypesComponent extends PsSelectDropdownComponent implements OnInit {
  @Input() options: IOptionsPsDropdownChequebookTypesExposed;
  defaultSelectOptions: IOptionsPsSelectDropdown = {
    labelKey: 'chequebook_type_key',
    placeHolder: 'select_chequebook_type_key'
  };
  allowedChequebookTypeCode: any;
  public chequeBookType: PsSelect = [];

  constructor(commonProv: PsCommonService, loggerP: LoggerService, private omniPull: OmniPullService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options);
    this.omniPull.getParamValOf(CommonBussinessConstant.ALLOWEDCHEQUEBOOKTYPES).then((result) => {
      if (result.AllowedChequebookTypes) {
        this.allowedChequebookTypeCode = result.AllowedChequebookTypes.toString().split(',');
      }
      this.getChequebookTypes();
    }).catch((error) => { });

  }

  onChequebookTypeChange(values: IchangeValues) {
    this.onPsChange.emit(values);
  }

    getChequebookTypes() {
      const paramData = {
        chequeTypesCode: this.allowedChequebookTypeCode,
        language: PsCommonSettings.activeLanguge,
      };
      this.omniPull.returnChequebookTypes(paramData).then((result) => {

        if (result && result.gridModel != null && result.gridModel.length > 0) {
          for (let i = 0; i < result.gridModel.length; i++) {
            const acctype = { itemValue: result.gridModel[i].chequeTypesCode, 
            description: result.gridModel[i].briefName ,
            selectedObj: result.gridModel[i] };
            this.chequeBookType.push(acctype);
          }
          this.defaultSelectOptions.listOfOptions = this.chequeBookType;
        } else { this.logger.warn(result, 'empty response'); }
      }).catch((error) => { });
    }

}
