import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { IOptionsPsDropdownBranchesExposed } from './ps-dropdown-branches.component.interface';
import { IOptionsPsSelectDropdown, IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { IOcBranchesRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { PsSelect } from 'src/app/commonSRC/psServices/models/common-type';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';

@Component({
  selector: 'ps-dropdown-branches',
  templateUrl: './ps-dropdown-branches.component.html',
  styleUrls: ['./ps-dropdown-branches.component.scss'],
})
export class PsDropdownBranchesComponent  extends PsSelectDropdownComponent implements OnInit, OnChanges {
  @Input() options: IOptionsPsDropdownBranchesExposed;
  defaultSelectOptions: IOptionsPsSelectDropdown = {
    labelKey: 'branch_key',
    placeHolder: 'branch_key'
  };
  public branches: PsSelect = [];
  constructor(commonProv: PsCommonService, loggerP: LoggerService, private omniPull: OmniPullService) { 
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options);
  }

  ngOnChanges() {
    if (this.options.selectedCityCode) {
      this.getBranches();
    }
    this.defaultSelectOptions.listOfOptions = [];
  }

  getBranches() {
    const paramData: IOcBranchesRequest = {
      // eslint-disable-next-line radix
      cityId: parseInt(this.options.selectedCityCode),
      mapTypesInclude: "'B'"
    };
    this.branches = [];
    this.omniPull.returnMapAtmBranches(paramData).then((result) => {
      if (result && result.gridModel != null && result.gridModel.length > 0) {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < result.gridModel.length; i++) {
          const acctype = { itemValue: result.gridModel[i].vsBranchCode,
            description: result.gridModel[i].briefDesc, selectedObj: result.gridModel[i] };
          this.branches.push(acctype) ;
        }
        this.defaultSelectOptions.listOfOptions = this.branches;
      } else { this.logger.warn(result, 'empty response'); }
    }).catch((error) => { });
  }
  onBranchChange(values: IchangeValues) {
    this.loggerP.log('onBranchChange' + values);
    this.onPsChange.emit(values);
    }

}
