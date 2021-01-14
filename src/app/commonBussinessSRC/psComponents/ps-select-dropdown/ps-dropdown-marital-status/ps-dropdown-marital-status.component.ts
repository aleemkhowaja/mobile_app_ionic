import { Component, Input, OnInit } from '@angular/core';
import { IMaritalStatusRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsSelectDropdown, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsDropdownMaritalStatusExposed } from './ps-dropdown-marital-status.component.interfaces';

@Component({
  selector: 'ps-dropdown-marital-status',
  templateUrl: './ps-dropdown-marital-status.component.html',
  styleUrls: ['./ps-dropdown-marital-status.component.scss'],
})
export class PsDropdownMaritalStatusComponent extends PsSelectDropdownComponent  implements OnInit {
  @Input() options: PsDropdownMaritalStatusExposed = {};
  maritalstatus: any = []; 
  defalultOptions: IOptionsPsSelectDropdown = {
    listOfOptions: []
  };
  constructor(
    commonProv: PsCommonService,
    loggerP: LoggerService, private omniPull: OmniPullService
  ) {
    super(commonProv, loggerP);
    
  }
  ngOnInit() {
    this.loadMaritalStatus();
    this.commonProv.copyObject(this.defalultOptions, this.options, false);
  }
  async loadMaritalStatus() {
    const paramData: IMaritalStatusRequest = {
      language: PsCommonSettings.activeLanguge,
      lovTypeId: ConstantCommon.MARITAL_STATUS_LOV_TYPE_ID,
    };
    const result = await this.omniPull.returnLovTypesValues(paramData).catch(error => {
        this.logger.error('Error: While fetching LOV types in PsDropdownLovComponent :', error);
    });
    if (result && result.length > 0) {
      for (const iterator of result) {
        const lovDropDown: IPsSelect = {
          itemValue: iterator.itemValue,
          description: iterator.description, 
          selectedObj: iterator      
        };
        this.defalultOptions.listOfOptions.push(lovDropDown);
      }    
    }

}
}