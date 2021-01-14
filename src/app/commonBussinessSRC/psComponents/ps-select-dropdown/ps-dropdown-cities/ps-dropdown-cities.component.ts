import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IOcCitiesRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsSelectDropdown, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsDropdownCitiesExposed } from './ps-dropdown-cities.component.interface';

// Author: GRadwan 16/01/2020
@Component({
  selector: 'ps-dropdown-cities',
  templateUrl: './ps-dropdown-cities.component.html',
  styleUrls: ['./ps-dropdown-cities.component.scss'],
})
export class PsDropdownCitiesComponent extends PsSelectDropdownComponent implements OnInit, OnChanges {

  @Input() options: IOptionsPsDropdownCitiesExposed = {};
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onCityChange: EventEmitter<any> = new EventEmitter<any>();

  public defaultOptions: IOptionsPsSelectDropdown = {
    listOfOptions: []
  };

  citiesList: any = [];
  translations: any;

  constructor(commonProv: PsCommonService, logger: LoggerService, private omniPullService?: OmniPullService) {
    super(commonProv, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultOptions, this.options, false);
  }

  ngOnChanges() {
    if (this.options.selectedCountryCode && this.options.selectedRegionCode) {
      this.loadCities();
    } else {
      this.defaultOptions.listOfOptions = [];
    }
  }

  cityChange(event) {
    this.onPsChange.emit(event);
  }

  private async loadCities() {
    this.citiesList = [];
    const paramData: IOcCitiesRequest = {
      // eslint-disable-next-line radix
      countryCode: parseInt(this.options.selectedCountryCode),
      // eslint-disable-next-line radix
      regionCode: parseInt(this.options.selectedRegionCode),
      operId: CommonBussinessConstant.CITY_OPER_ID
    };

    const result = await this.omniPullService.returnCities(paramData).catch(error => {
      this.logger.error('Error: While fetching citites list in PsDropdownCitiesComponent :', error);
    });
    this.defaultOptions.listOfOptions = [];
    if (result && result.gridModel && result.gridModel.length > 0) {
      for (const iterator of result.gridModel) {
        const city: IPsSelect = {
          itemValue: iterator.citiesCode,
          description: iterator.longDesc,
          selectedObj: iterator
        };
        this.defaultOptions.listOfOptions.push(city);
      }
    } else {
      this.defaultOptions.listOfOptions = [];
    }
  }
}


