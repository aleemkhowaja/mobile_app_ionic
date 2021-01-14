import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { ICoreReasonsRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues, IOptionsPsSelectDropdown, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsDropdownCoreReasonsExposed } from './ps-dropdown-core-reasons.component.interface';

@Component({
  selector: 'ps-dropdown-core-reasons',
  templateUrl: './ps-dropdown-core-reasons.component.html',
  styleUrls: ['./ps-dropdown-core-reasons.component.scss'],
})
export class PsDropdownCoreReasonsComponent  extends PsSelectDropdownComponent implements OnInit  {
  @Input() options: IOptionsPsDropdownCoreReasonsExposed;
    defaultSelectOptions: IOptionsPsSelectDropdown = {
    listOfOptions: []
  };
   constructor(commonProv: PsCommonService,
               loggerP: LoggerService,
               private omniPull: OmniPullService) {
    super(commonProv, loggerP);
  }
  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options, false);
    this.loadCoreReasons();
  }
  private async loadCoreReasons() {
    const paramData: ICoreReasonsRequest = {
      reasonType : CommonBussinessConstant.STOP_REASON_TYPE
    };
    const coreReasons = await this.omniPull.returnCoreReasons(paramData).catch(error => {
    });

    if (coreReasons && coreReasons.gridModel && coreReasons.gridModel.length > 0) {
      for (const iterator of coreReasons.gridModel) {
        const coreReason: IPsSelect = {
          itemValue: iterator.reasonId,
          description: iterator.briefDesc,
          selectedObj: iterator
        };
        this.defaultSelectOptions.listOfOptions.push(coreReason);
      }
    }
  }
  onChange(values: IchangeValues) {
        this.onPsChange.emit(values);
    }
}
