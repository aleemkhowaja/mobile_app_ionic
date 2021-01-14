import { Component, OnInit, Input } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from './../../../../commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsDropdownFacilityTypesExposed } from './ps-dropdown-facility-types.component.interfaces';
import { IOptionsPsSelectDropdown, IchangeValues, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';

/**
 * @author Aftab.Ali
 * @since 07/11/2019
 *
 * <p> PsDropdownFacilityTypesComponent will fetch the list of Facility types from server</p>
 */
@Component({
  selector: 'ps-dropdown-facility-types',
  templateUrl: './ps-dropdown-facility-types.component.html',
  styleUrls: ['./ps-dropdown-facility-types.component.scss'],
})
export class PsDropdownFacilityTypesComponent extends PsSelectDropdownComponent implements OnInit {

  @Input() options: IOptionsPsDropdownFacilityTypesExposed = {};
  public defaultOptions: IOptionsPsSelectDropdown = {
    listOfOptions: [],
  };

  constructor(
    commonService: PsCommonService,
    logger: LoggerService,
    private omniPullService?: OmniPullService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultOptions, this.options, false);
    this.loadFacilityTypes();
  }

  /**
   * populating Facility types fetched from server
   */
  private async loadFacilityTypes() {

    const FacilityTypes = await this.omniPullService.returnFacilityTypes({}).catch(error => {
      this.logger.error('Error: While fetching Facility types in PsDropdownFacilityTypesComponent : ', error);
    });

    if (FacilityTypes && FacilityTypes.gridModel && FacilityTypes.gridModel.length > 0) {
      for (const iterator of FacilityTypes.gridModel) {
        const FacilityType: IPsSelect = {
          itemValue: iterator.code,
          description: iterator.briefDesc,
          selectedObj: iterator
        };
        this.defaultOptions.listOfOptions.push(FacilityType);
      }
    }
  }

  selectDropDownChange(values: IchangeValues) {
    this.onPsChange.emit(values);
  }
}
