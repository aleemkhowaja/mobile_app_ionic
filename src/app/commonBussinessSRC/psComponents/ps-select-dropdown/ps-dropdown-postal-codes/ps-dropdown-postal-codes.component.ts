import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IOcPostalCodeRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues, IOptionsPsSelectDropdown, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsDropdownPostalCodesExposed } from './ps-dropdown-postal-codes.component.interfaces';

@Component({
  selector: 'ps-dropdown-postal-codes',
  templateUrl: './ps-dropdown-postal-codes.component.html',
  styleUrls: ['./ps-dropdown-postal-codes.component.scss'],
})
export class PsDropdownPostalCodesComponent extends PsSelectDropdownComponent implements OnInit, OnChanges {

  @Input() options: IOptionsPsDropdownPostalCodesExposed;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onPostalCodeChange: EventEmitter<any> = new EventEmitter<any>();
  defaultSelectOptions: IOptionsPsSelectDropdown = {
    labelKey: 'postal_codes_key',
    placeHolder: 'postal_codes_key'
  };

  constructor(
    public commonProv: PsCommonService,
    public loggerP: LoggerService,
    private omniPull: OmniPullService) {
    super(commonProv, loggerP);
  }

  ngOnChanges() {
    if (this.options.selectedCountryCode && this.options.selectedRegionCode) {
      this.returnPostalCodes();
    }
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options);
    // this.returnPostalCodes();
  }

  private async returnPostalCodes() {
    const paramData: IOcPostalCodeRequest = {
      // eslint-disable-next-line radix
      countriesCode: parseInt(this.options.selectedCountryCode),
      // eslint-disable-next-line radix
      regionsCode: parseInt(this.options.selectedRegionCode),
      operId: CommonBussinessConstant.POSTAL_CODE_OPER_ID
    };

    const result = await this.omniPull.returnPostalCodes(paramData).catch(error => {
      this.logger.error('Error ! while fetching postalCodes in PsDropdownPostalCodesComponent', error);
    });

    if (result && result.gridModel && result.gridModel.length > 0) {
      this.defaultSelectOptions.listOfOptions = [];
      for (const iterator of result.gridModel) {
        const country: IPsSelect = {
          itemValue: iterator.postalCodeCode,
          description: iterator.briefDesc ? iterator.postalCodeCode + ' - ' + iterator.briefDesc : iterator.postalCodeCode,
          selectedObj: iterator
        };
        this.defaultSelectOptions.listOfOptions.push(country);
      }
    }
  }

  public onChange(value: IchangeValues) {
    this.onPsChange.emit(value);
  }

}
