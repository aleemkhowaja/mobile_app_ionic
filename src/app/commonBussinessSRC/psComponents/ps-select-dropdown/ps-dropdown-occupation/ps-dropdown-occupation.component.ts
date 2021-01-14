import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues, IOptionsPsSelectDropdown, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsDropdownOccupationExposed } from './ps-dropdown-occupation.component.interface';

@Component({
  selector: 'ps-dropdown-occupation',
  templateUrl: './ps-dropdown-occupation.component.html',
  styleUrls: ['./ps-dropdown-occupation.component.scss'],
})
export class PsDropdownOccupationComponent extends PsSelectDropdownComponent implements OnInit {

  @Input() options: IOptionsPsDropdownOccupationExposed;
  public occupationOptions: IOptionsPsSelectDropdown = {};

  constructor(
    public commonProv: PsCommonService,
    public loggerP: LoggerService,
    private omniPull: OmniPullService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.loadOccupation();
    this.commonProv.copyObject(this.occupationOptions, this.options);
  }

  public onChangeOccupation(value: IchangeValues) {
    this.onPsChange.emit(value);
  }

  private async loadOccupation() {
    const params: any = {
      operId: CommonBussinessConstant.OCCUPATION_OPER_ID
    };

    const result = await this.omniPull.reutrnOccupation(params).catch(error => {
      this.logger.error('Error ! while fetching occupation in PsDropdownOccupationComponent', error);
    });

    if (result && result.gridModel && result.gridModel.length > 0) {
      this.occupationOptions.listOfOptions = [];
      for (const iterator of result.gridModel) {
        const country: IPsSelect = {
          itemValue: iterator.positionCode,
          description: iterator.briefDescription,
          selectedObj: iterator
        };
        this.occupationOptions.listOfOptions.push(country);
      }
    }
  }

}
