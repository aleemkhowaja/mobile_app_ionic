import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOcCountriesRegionsRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';

import { PsSelectDropdownComponent } from '../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from '../../../../commonSRC/psServices/logger/logger.service';
import { IchangeValues, IOptionsPsSelectDropdown, IPsSelect } from '../../../../commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsDropDownCountryExposed } from './ps-dropdown-country.component.interfaces';

@Component({
  selector: 'ps-dropdown-country',
  templateUrl: './ps-dropdown-country.component.html',
  styleUrls: ['./ps-dropdown-country.component.scss']
})
export class PsDropdownCountryComponent extends PsSelectDropdownComponent implements OnInit {

  @Input() options: IOptionsPsDropDownCountryExposed = {};
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onCountryChange: EventEmitter<any> = new EventEmitter<any>();

  defalultOptions: IOptionsPsSelectDropdown = {
    listOfOptions: []
  };
  public countriesList: any = [];
  public countryFlagLocation = '';

  constructor(
    public commonProv: PsCommonService,
    public loggerP: LoggerService,
    private omniPull: OmniPullService
  ) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defalultOptions, this.options, false);
    this.countryFlagLocation = PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL + 'countries/';
    this.loadCountries();
  }

  private async loadCountries() {
    const paramData: IOcCountriesRegionsRequest = {
      nbRec: ConstantCommon.MINUS_ONE,
      recToskip: ConstantCommon.recToskip,
    };

    const result = await this.omniPull.returnCountries(paramData).catch(error => {
      this.logger.error('Error: While fetching counties list in PsDropdownCountryComponent :', error);
    });

    if (result && result.gridModel && result.gridModel.length > 0) {
      for (const iterator of result.gridModel) {
        const country: IPsSelect = {
          itemValue: iterator.countriesCode,
          description: iterator.countriesLongDesc,
          iconUrl: this.countryFlagLocation.concat((iterator.isoCountry).toLowerCase() + PsCommonBusinessSettings.IMG_CURRENCY_EXTENSION),
          selectedObj: iterator
        };
        this.defalultOptions.listOfOptions.push(country);
      }
    }
  }

  public countryChange(values: IchangeValues) {
    this.onPsChange.emit(values);
  }
  superWriteValue(val){
    super.writeValue(val);
  }
}
