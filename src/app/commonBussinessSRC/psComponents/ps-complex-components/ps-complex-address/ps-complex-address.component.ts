import { Component, Input, OnInit } from '@angular/core';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsComplexUserAddressExposed } from './ps-complex-address.component.interface';

@Component({
  selector: 'ps-complex-address',
  templateUrl: './ps-complex-address.component.html',
  styleUrls: ['./ps-complex-address.component.scss'],
})
export class PsComplexAddressComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsComplexUserAddressExposed;
  public defaultOptions: IOptionsPsComplexUserAddressExposed = {};

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    super.init();
    this.commonProv.copyObject(this.defaultOptions, this.options, false);
  }

  countryChanged(event) {
    if (event !== undefined) {
      this.defaultOptions.regionOptions.selectedCountryCode = event.itemValue;
      this.defaultOptions.regionOptions = Object.assign({}, this.defaultOptions.regionOptions);
      // this.defaultOptions.poBoxOptions.regionOptions.selectedCountryCode = event.itemValue;
      // this.defaultOptions.poBoxOptions = Object.assign({}, this.defaultOptions.poBoxOptions);
    }

  }

  onRegionDDChanged(event) {
    if (event !== undefined) {
      this.defaultOptions.postalCodesOptions.selectedRegionCode = event.selectedObj ? event.selectedObj.regionCode ? event.selectedObj.regionCode : event : event;
      this.defaultOptions.postalCodesOptions.selectedCountryCode = this.defaultOptions.regionOptions.selectedCountryCode;
      this.defaultOptions.postalCodesOptions = Object.assign({}, this.defaultOptions.postalCodesOptions);
    }
  }
}
