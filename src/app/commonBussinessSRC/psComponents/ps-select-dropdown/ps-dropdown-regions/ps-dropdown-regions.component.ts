import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IOcCountriesRegionsRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsSelectDropdown, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsDropdownRegionsExposed } from './ps-dropdown-regions.component.interface';

// Author: GRadwan 16/01/2020
@Component({
  selector: 'ps-dropdown-regions',
  templateUrl: './ps-dropdown-regions.component.html',
  styleUrls: ['./ps-dropdown-regions.component.scss'],
})
export class PsDropdownRegionsComponent extends PsSelectDropdownComponent implements OnInit, OnChanges {

  @Input() options: IOptionsPsDropdownRegionsExposed = {};
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onRegionChange: EventEmitter<any> = new EventEmitter<any>();

  public defaultOptions: IOptionsPsSelectDropdown = {
    listOfOptions: []
  };

  regionsList: any = [];
  translations: any;

  constructor(commonProv: PsCommonService, logger: LoggerService, private omniPullService?: OmniPullService) {
    super(commonProv, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultOptions, this.options, false);
  }

  ngOnChanges() {
    if (this.options.selectedCountryCode) {
      this.loadRegions();
    }
  }

  regionChange(event) {
    this.onPsChange.emit(event);
  }

  private async loadRegions() {
    this.regionsList = [];
    const paramData: IOcCountriesRegionsRequest = {
      countriesCodes: this.options.selectedCountryCode,
      nbRec: ConstantCommon.MINUS_ONE,
      operId: CommonBussinessConstant.REGION_OPER_ID
    };

    const result = await this.omniPullService.returnRegions(paramData).catch(error => {
      this.logger.error('Error: While fetching regions list in PsDropdownRegionsComponent :', error);
    });
    this.defaultOptions.listOfOptions = [];
    if (result && result.gridModel && result.gridModel.length > 0) {
      for (const iterator of result.gridModel) {
        const region: IPsSelect = {
          itemValue: iterator.countriesRegionCode,
          description: iterator.regionsBriefDesc,
          selectedObj: iterator
        };
        this.defaultOptions.listOfOptions.push(region);
      }
    } else {
      this.defaultOptions.listOfOptions = [];
    }
  }

}

