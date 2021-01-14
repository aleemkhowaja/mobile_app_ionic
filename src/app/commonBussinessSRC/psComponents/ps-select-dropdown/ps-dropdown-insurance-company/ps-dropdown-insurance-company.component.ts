import { Component, Input, OnInit } from '@angular/core';
import { IInsuranceCompaniesRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues, IOptionsPsSelectDropdown, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsDropdownInsuranceCompanyExposed } from './ps-dropdown-insurance-company.component.interfaces';

@Component({
  selector: 'ps-dropdown-insurance-company',
  templateUrl: './ps-dropdown-insurance-company.component.html',
  styleUrls: ['./ps-dropdown-insurance-company.component.scss'],
})
export class PsDropdownInsuranceCompanyComponent extends PsSelectDropdownComponent implements OnInit {
  @Input() options: IOptionsPsDropdownInsuranceCompanyExposed;
  
  defaultSelectOptions: IOptionsPsSelectDropdown = {
    labelKey: 'insurance_company_key',
    placeHolder: 'select_insurance_company_key',
    listOfOptions: []
  };
  public parameters;
  constructor(public commonProv: PsCommonService, public loggerP: LoggerService,
    private omniPull: OmniPullService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options);
    this.getInsuranceCompanies();
  }


  getInsuranceCompanies() {
    let paramData: IInsuranceCompaniesRequest = {

    };
    
    this.omniPull.returnInsuranceCompanies(paramData).then((result) => {
      if (result != null && result.gridModel != null && result.gridModel.length > 0) {
        for (const iterator of result.gridModel) {
          const company: IPsSelect = {
            itemValue: iterator.code,
            description: iterator.briefName,
            selectedObj: iterator
          };
          this.defaultSelectOptions.listOfOptions.push(company);
        };
        
      }

    }, (err) => {

      this.logger.error('Error: While fetching data : ', err);
    });
  }

  onInsuranceCompanyChange(value: IchangeValues) {
    this.onPsChange.emit(value);
  }

}
