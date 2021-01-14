import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IdTypesRequestObject } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IchangeValues, IOptionsPsSelectDropdown, IPsSelect } from '../../../../../commonSRC/psServices/models/ps-common-interface';
import { PsSelectDropdownComponent } from './../../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { IOptionsPsDropDownIdTypesExposed } from './ps-dropdown-id-types.component.interfaces';



/**
 * @author Aftab.Ali
 * @since 22/10/2019
 *
 * <p> PsLovIdTypesComponent is responsile for fetching ID types based on lovTypeId(ID for ID types).</p>
 */
@Component({
  selector: 'ps-dropdown-id-types',
  templateUrl: './ps-dropdown-id-types.component.html',
  styleUrls: ['./ps-dropdown-id-types.component.scss'],
})
export class PsDropDownIdTypesComponent extends PsSelectDropdownComponent implements OnInit {

  @Input() options: IOptionsPsDropDownIdTypesExposed;
  listOfIdTypes: any[] = [];
  @Output() expiryNeeded = new EventEmitter<boolean>();

  public defaultOptions: IOptionsPsSelectDropdown = {
    labelKey: 'id_type_key',
    placeHolder: 'select_id_type_key',
    listOfOptions: []
  };

  constructor(
    commonService: PsCommonService,
    logger: LoggerService,
    private omniPull?: OmniPullService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.options, this.defaultOptions, false);
    // if listofoptions has input value
    if (this.options.listOfOptions && this.options.listOfOptions.length > 0) {
      this.defaultOptions.listOfOptions = this.options.listOfOptions;
      this.listOfIdTypes = [];
      for (const idType of this.defaultOptions.listOfOptions) {
        this.listOfIdTypes.push(idType.selectedObj);
      }
    } else {
      this.loadIdTypes();
    }
  }

  /**
   * Is responsible for populating listOfOption: IPsSelect after getting id types from service
   */
  public async loadIdTypes() {
    const paramData: IdTypesRequestObject = {
      idTypeList: ''
    };

    const result = await this.omniPull.returnIdTypesList(paramData).catch(error => {
      this.logger.error('Error: While fetching id types in PsLovIdTypesComponent :', error);
    });

    if (result && result.gridModel && result.gridModel.length > 0) {
      this.listOfIdTypes = result.gridModel
      for (const iterator of result.gridModel) {
        const lovDropDown: IPsSelect = {
          itemValue: iterator.CODE.toString(),
          description: iterator.briefDesc,
          selectedObj: iterator
        };
        this.defaultOptions.listOfOptions.push(lovDropDown);
      }
    }
  }

  onChangeIdTypes(values: IchangeValues) {
    for (let each of this.listOfIdTypes) {
      if (each['CODE'] === values['itemValue']) {
        if (each['ID_EXP_DTE_MAN'] === '1') {
          this.expiryNeeded.emit(true);
        } else {
          this.expiryNeeded.emit(false);
        }
      }
    }
    this.onPsChange.emit(values);
  }

}
