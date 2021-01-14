import { Component, Input, OnInit } from '@angular/core';
import { IAccountTypesRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsSelect } from 'src/app/commonSRC/psServices/models/common-type';
import { IOptionsPsSelectDropdown } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsDropdownAccountTypesExposed } from './ps-dropdown-account-types.component.interface';

@Component({
  selector: 'ps-dropdown-account-types',
  templateUrl: './ps-dropdown-account-types.component.html',
  styleUrls: ['./ps-dropdown-account-types.component.scss'],
})
export class PsDropdownAccountTypesComponent extends PsSelectDropdownComponent implements OnInit {
  @Input() options: IOptionsPsDropdownAccountTypesExposed;
  defaultSelectOptions: IOptionsPsSelectDropdown = {
    labelKey: 'account_type_key',
    placeHolder: 'select_req_account_type_key'
  };
  allowedAccountTypeCode: any;
  public accountType: PsSelect = [];
  constructor(commonProv: PsCommonService, loggerP: LoggerService, private omniPull: OmniPullService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options);
    // this.omniPull.getParamValOf(this.options.allowedAccountType).then((result) => {
    //   if (result.AllowedAccountType) {
    //     this.allowedAccountTypeCode = result.AllowedAccountType.split(',');
    //   }
      // if (result.AllowedFixedMaturityAccountsTypes) {
      //   this.allowedAccountTypeCode = result.AllowedFixedMaturityAccountsTypes.split(',');
      // }
    this.getAccountTypes();
    // }).catch((error) => { });

    }
    getAccountTypes() {
      const paramData: IAccountTypesRequest = {
        accountCategory: this.options.accountCategory,
       // permittedGLs: this.allowedAccountTypeCode
      };
      this.omniPull.returnAccountTypes(paramData).then((result) => {

        if (result && result.gridModel != null && result.gridModel.length > 0) {
          for (let i = 0; i < result.gridModel.length; i++) {
            const acctype = { itemValue: result.gridModel[i].typeCode, 
              description: result.gridModel[i].briefDesc, selectedObj: result.gridModel[i] };
            this.accountType.push(acctype);
          }
          this.defaultSelectOptions.listOfOptions = this.accountType;
        } else { this.logger.warn(result, 'empty response'); }
      }).catch((error) => { });
    }

    onAccountTypeChange(values: any) {
      this.loggerP.log("onAccountTypeChange" + values);
      this.onPsChange.emit(values.selectedObj);
      }

}
