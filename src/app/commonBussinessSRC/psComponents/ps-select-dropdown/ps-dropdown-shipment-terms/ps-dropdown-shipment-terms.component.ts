import { Component, Input, OnInit } from '@angular/core';
import { IShipmentTermsRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues, IOptionsPsSelectDropdown, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsDropdownShipmentTermsExposed } from './ps-dropdown-shipment-terms.component.interfaces';

@Component({
  selector: 'ps-dropdown-shipment-terms',
  templateUrl: './ps-dropdown-shipment-terms.component.html',
  styleUrls: ['./ps-dropdown-shipment-terms.component.scss'],
})
export class PsDropdownShipmentTermsComponent extends PsSelectDropdownComponent implements OnInit {
  @Input() options: IOptionsPsDropdownShipmentTermsExposed;
  
  defaultSelectOptions: IOptionsPsSelectDropdown = {
    labelKey: 'shipment_terms_key',
    placeHolder: 'select_shipment_terms_key',
    listOfOptions: []
  };
  public parameters;
  constructor(public commonProv: PsCommonService, public loggerP: LoggerService,
    private omniPull: OmniPullService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options);
    this.getShipmentTerms();
  }


  getShipmentTerms() {
    let paramData: IShipmentTermsRequest = {

    };
    
    this.omniPull.returnShipmentTerms(paramData).then((result) => {
      if (result != null && result.gridModel != null && result.gridModel.length > 0) {
        for (const iterator of result.gridModel) {
          const term: IPsSelect = {
            itemValue: iterator.CODE,
            description: iterator.BRIEF_NAME_ENG,
            selectedObj: iterator
          };
          this.defaultSelectOptions.listOfOptions.push(term);
        };
        
      }

    }, (err) => {
      let shipmentTerm: IPsSelect =
        {
        itemValue: '1',
        description: 'shipment term 1',
        selectedObj: {
          itemValue: '1',
          description: 'shipment term 1',
        }
      }
      
      this.defaultSelectOptions.listOfOptions.push(shipmentTerm);
      this.logger.error('Error: While fetching data : ', err);
    });
  }

  onShipmentTermChange(value: IchangeValues) {
    this.onPsChange.emit(value);
  }

}
