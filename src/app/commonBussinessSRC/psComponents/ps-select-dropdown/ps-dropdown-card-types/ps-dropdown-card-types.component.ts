import { IPsSelect } from '../../../../commonSRC/psServices/models/ps-common-interface';
import { Component, Input, OnInit } from '@angular/core';
import { ICardTypeRequest, ICardTypeResponse } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues, IOptionsPsSelectDropdown } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsDropdownCardTypesExposed } from './ps-dropdown-card-types.component.interface';

@Component({
  selector: 'ps-dropdown-card-types',
  templateUrl: './ps-dropdown-card-types.component.html',
  styleUrls: ['./ps-dropdown-card-types.component.scss'],
})
export class PsDropdownCardTypesComponent extends PsSelectDropdownComponent implements OnInit  {
  @Input() options: IOptionsPsDropdownCardTypesExposed;
  
  defaultSelectOptions: IOptionsPsSelectDropdown = {
    listOfOptions: []
  };
  //public cardType: PsSelect = [];
  constructor(commonProv: PsCommonService, loggerP: LoggerService, private omniPull: OmniPullService) {
    super(commonProv, loggerP);
  }
  ngOnInit() {
    this.loggerP.log("loadcreditTypes---ngOnInit : " + this.options.cardType);
    this.commonProv.copyObject(this.defaultSelectOptions, this.options, false);
    this.loadcreditTypes();
  }
  private async loadcreditTypes(){
    const paramData:ICardTypeRequest={
      cardType:this.options.cardType  
    }
    this.loggerP.log("loadcreditTypes" + paramData);
    const cardTypes = await this.omniPull.returnCardTypes(paramData).catch(error => {
      this.logger.error('Error: While fetching Card types in PsDropdownCardTypesComponent : ', error);
    });

    if (cardTypes && cardTypes.gridModel && cardTypes.gridModel.length > 0) {
      for (const iterator of cardTypes.gridModel) {
        const cardType: IPsSelect = {
          itemValue: iterator.briefName,
          description: iterator.briefName,
          //wdLimitAmount:iterator.wdLimitAmount,
          selectedObj: iterator
         
        };
        this.defaultSelectOptions.listOfOptions.push(cardType);
      }
    }
  }

  onCardTypeChange(values: IchangeValues) {
    this.loggerP.log("onCardTypeChange@@@@" + values.newValue);
    this.onPsChange.emit(values);
    }
}
