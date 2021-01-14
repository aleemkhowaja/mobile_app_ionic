import { Component, Input, OnInit } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsComplexBenefBankDetailsComponentExposed } from './ps-complex-beneficiary-bank-details.component.interface';

@Component({
  selector: 'ps-complex-beneficiary-bank-details',
  templateUrl: './ps-complex-beneficiary-bank-details.component.html',
  styleUrls: ['./ps-complex-beneficiary-bank-details.component.scss'],
})
export class PsComplexBeneficiaryBankDetailsComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsComplexBenefBankDetailsComponentExposed;
  public defaultOptions: IOptionsPsComplexBenefBankDetailsComponentExposed = {};

  constructor(commonService: PsCommonService, private omniPullService: OmniPullService, logger: LoggerService) {
    super(commonService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultOptions, this.options);
    super.init();
  }

  /**
   * event for country change
   * @param event 
   */
  public countryChanged(event) {
    if (event !== null && event !== undefined && event.selectedObj !== undefined) {
      this.defaultOptions.regionOptions.selectedCountryCode = event.itemValue;
      this.defaultOptions.regionOptions = Object.assign({}, this.defaultOptions.regionOptions);
    } else if (event !== null && event !== undefined && event.newValue !== undefined) {
      this.defaultOptions.regionOptions.selectedCountryCode = event.newValue;
      this.defaultOptions.regionOptions = Object.assign({}, this.defaultOptions.regionOptions);
    }
  }

  /**
   * event for region change
   * @param event
   */
  public regionChanged(event) {
    if (event !== null && event !== undefined && event.selectedObj !== undefined) {
      this.defaultOptions.cityOptions.selectedRegionCode = event.itemValue;
      this.defaultOptions.cityOptions.selectedCountryCode = this.defaultOptions.regionOptions.selectedCountryCode;
      this.defaultOptions.cityOptions = Object.assign({}, this.defaultOptions.cityOptions);
    } else if (event !== null && event !== undefined && event.newValue !== undefined) {
      this.defaultOptions.cityOptions.selectedRegionCode = event.newValue;
      this.defaultOptions.cityOptions.selectedCountryCode = this.defaultOptions.regionOptions.selectedCountryCode;
      this.defaultOptions.cityOptions = Object.assign({}, this.defaultOptions.cityOptions);
    }
  }

}
