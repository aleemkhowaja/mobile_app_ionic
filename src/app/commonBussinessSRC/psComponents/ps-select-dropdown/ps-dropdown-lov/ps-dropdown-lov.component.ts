import { Component, Input, OnInit } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsSelectDropdown, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IchangeValues } from '../../../../commonSRC/psServices/models/ps-common-interface';
import { IOmniLovTypeRequest } from '../../../psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsDropdownLov } from './ps-dropdown-lov.component.interfaces';

/**
 * @author Aftab.Ali
 * @since 22/10/2019
 *
 * <p> PsDropdownLovComponent is responsile for fetching LOV types based on provide lovTypeId.</p>
 */
@Component({
  selector: 'ps-dropdown-lov',
  templateUrl: './ps-dropdown-lov.component.html',
  styleUrls: ['./ps-dropdown-lov.component.scss'],
})
export class PsDropdownLovComponent extends PsSelectDropdownComponent implements OnInit {

  @Input() options: IOptionsPsDropdownLov;
  public showLovDropdown = false; 
  public defaultDropDownLovOptions: IOptionsPsSelectDropdown = {
    listOfOptions: []
  };

  constructor(
    commonService: PsCommonService,
    logger: LoggerService,
    public omniPull?: OmniPullService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultDropDownLovOptions, this.options, false);
    this.loadLovDropDown();
  }

  /**
   * Is responsible for populating listOfOption: IPsSelect after getting LOV types from service
   */
  public async loadLovDropDown() {
    if (this.options.lovTypeId == null || this.options.lovTypeId === undefined) {
      this.logger.error('Error: lovTypeId is not provided, Please set lovTypeId for ps-dropdown-lov');
      return;
    }
    const paramData: IOmniLovTypeRequest = {
      lovTypeId: this.options.lovTypeId
    };

    const result = await this.omniPull.returnLovTypesValues(paramData).catch(error => {
      this.showLovDropdown = false;
      this.logger.error('Error: While fetching LOV types in PsDropdownLovComponent :', error);
    });

    if (result && result.length > 0) {
      for (const iterator of result) {
        const lovDropDown: IPsSelect = {
          itemValue: iterator.itemValue,
          description: iterator.description,
          iconUrl: this.options.iconLocation !== undefined ? this.options.iconLocation.concat(iterator.iconName + (this.options.iconExtension !== undefined ? this.options.iconExtension : '')) : '',
          selectedObj: iterator
        };
        lovDropDown.selectedObj[this.options.fcName] = iterator.itemValue;
        this.defaultDropDownLovOptions.listOfOptions.push(lovDropDown);
      }
      this.showLovDropdown = true;
    }
    
  }

  selectDropDownChange(values: IchangeValues) {
    this.onPsChange.emit(values);
  }
}
