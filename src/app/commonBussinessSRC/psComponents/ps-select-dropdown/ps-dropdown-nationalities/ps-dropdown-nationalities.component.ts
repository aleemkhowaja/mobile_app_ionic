import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IOmniCommonRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues, IOptionsPsSelectDropdown } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsDropdownNationalitiesExposed } from './ps-dropdown-nationalities.component.interfaces';

@Component({
  selector: 'ps-dropdown-nationalities',
  templateUrl: './ps-dropdown-nationalities.component.html',
  styleUrls: ['./ps-dropdown-nationalities.component.scss'],
})
export class PsDropdownNationalitiesComponent extends PsSelectDropdownComponent implements OnInit {
  @Input() options: IOptionsPsDropdownNationalitiesExposed;
  public defaultSelectOptions: IOptionsPsSelectDropdown = {};

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService, private omniPull: OmniPullService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options, false);
    this.returnNationalities();
  }

  private async returnNationalities() {
    const nationaltiesRequest: IOmniCommonRequest = {
      operId: CommonBussinessConstant.NATIONALITY_OPER_ID
    }; // No need other than company code as all the nationalities will be retrieved

    const nationalitiesResponse = await this.omniPull.returnNationalities(nationaltiesRequest).catch(error => {
       this.logger.error('Error! while fetching nationalities in PsDropdownNationalitiesComponent', error);
    });

    if (nationalitiesResponse && nationalitiesResponse.gridModel && nationalitiesResponse.gridModel.length > 0) {
      this.defaultSelectOptions.listOfOptions = [];
      for (const iterator of nationalitiesResponse.gridModel) {
        const documents: any = {
          itemValue: iterator.NATIONALITY_CODE,
          description: iterator.longDesc,
          selectedObj: iterator
        };
        this.defaultSelectOptions.listOfOptions.push(documents);
      }
      this.commonProv.copyObject(this.options, this.defaultSelectOptions, false);
    }
  }

  public onChange(value: IchangeValues) {
    this.onPsChange.emit(value);
  }

}
