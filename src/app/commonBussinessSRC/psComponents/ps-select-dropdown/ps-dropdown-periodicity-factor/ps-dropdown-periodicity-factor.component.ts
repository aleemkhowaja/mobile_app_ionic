import { Component, Input, OnInit } from '@angular/core';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues, IOptionsPsSelectDropdown, IPeriodicityFactor } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsDropdownPeriodicityFactorOptionsExposed } from './ps-dropdown-periodicity-factor.component.interfaces';


/**
 * @author Zunair.Zakir
 * @since 26/12/2019
 *
 * <p> PsDropdownPeriodicityFactorOptionsComponent is responsile for fetching Delivery Options based on lovTypeId(ID for DeliveryOptions).</p>
 */
@Component({
  selector: 'ps-dropdown-periodicity-factor',
  templateUrl: './ps-dropdown-periodicity-factor.component.html',
  styleUrls: ['./ps-dropdown-periodicity-factor.component.scss'],
})
export class PsDropdownPeriodicityFactorOptionsComponent extends PsSelectDropdownComponent implements OnInit {

  @Input() options: IOptionsPsDropdownPeriodicityFactorOptionsExposed;
  public priodicityOptions: IOptionsPsSelectDropdown;

  public defaultOptions: IOptionsPsSelectDropdown = {
    labelKey: 'periodicity_factor_key',
    fcName: 'periodicityFactor',
    listOfOptions: [{itemValue: IPeriodicityFactor.DATE, description: IPeriodicityFactor.DATE,
    selectedObj:{itemValue: IPeriodicityFactor.DATE, description: IPeriodicityFactor.DATE}}, 
    {itemValue: IPeriodicityFactor.DAY, description: IPeriodicityFactor.DAY,
    selectedObj:{itemValue: IPeriodicityFactor.DAY, description: IPeriodicityFactor.DAY}}]
  };

  constructor(
    private commonProvService: PsCommonService,
    logger: LoggerService
  ) {
    super(commonProvService, logger);
    }
  ngOnInit() {
    this.commonProvService.copyObject(this.defaultOptions, this.options, false);
  }

  onChangePriodicityFactor(values: IchangeValues) {
    this.onPsChange.emit(values);
  }
}
