import { Component, Input, OnInit } from '@angular/core';
import { IOptionsPsComplexCountryRegionsCitiesComponentExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-country-regions-cities/ps-complex-country-regions-cities.component.interface';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

@Component({
  selector: 'ps-complex-country-regions-cities',
  templateUrl: './ps-complex-country-regions-cities.component.html',
  styleUrls: ['./ps-complex-country-regions-cities.component.scss'],
})
export class PsComplexCountryRegionsCitiesComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsComplexCountryRegionsCitiesComponentExposed;
  public defaultOptions: IOptionsPsComplexCountryRegionsCitiesComponentExposed = {};
  constructor(commonService: PsCommonService, logger: LoggerService) {
    super(commonService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultOptions, this.options);
    this.defaultOptions.forceTriggerChange= true;
    super.init();
  }

  /**
   * event for country change    defaultOptions.regionOptions
   * @param event 
   */

  public countryChanged(event) {
    this.defaultOptions.regionOptions.group.controls[this.defaultOptions.regionOptions.fcName].reset();
    this.defaultOptions.regionOptions.group.controls[this.defaultOptions.cityOptions.fcName].reset();
    if (event !== null && event !== undefined && event.selectedObj !== undefined) {
      this.defaultOptions.regionOptions.selectedCountryCode = event.itemValue;
      this.defaultOptions.regionOptions = Object.assign({}, this.defaultOptions.regionOptions);
      this.defaultOptions.cityOptions.selectedRegionCode = '';
      this.defaultOptions.cityOptions = Object.assign({}, this.defaultOptions.cityOptions);
    } else if (event !== null && event !== undefined && event.newValue !== undefined) {
      this.defaultOptions.regionOptions.selectedCountryCode = event.newValue;
      this.defaultOptions.regionOptions = Object.assign({}, this.defaultOptions.regionOptions);
      this.defaultOptions.cityOptions.selectedRegionCode = '';
      this.defaultOptions.cityOptions = Object.assign({}, this.defaultOptions.cityOptions);
    }
    this.onPsChange.emit(event);
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
      this.onPsChange.emit(event.itemValue);
    } else if (event !== null && event !== undefined && event.newValue !== undefined) {
      this.defaultOptions.cityOptions.selectedRegionCode = event.newValue;
      this.defaultOptions.cityOptions.selectedCountryCode = this.defaultOptions.regionOptions.selectedCountryCode;
      this.defaultOptions.cityOptions = Object.assign({}, this.defaultOptions.cityOptions);
      this.onPsChange.emit(event.newValue);
    }
  }
  /**
   * event for city change
   * @param event
   */
  public cityChanged(event) {
    if (event !== null && event !== undefined && event.selectedObj !== undefined) {
      this.onPsChange.emit(event);
    }
  }

}
