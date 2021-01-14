import { Component, OnInit, Input } from '@angular/core';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { IOptionsPsSelectDropdown } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsDropdownBillersCategoryExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-billers-category/ps-dropdown-billers-category.component.interface';
import { IOmniCommonRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsSelect } from 'src/app/commonSRC/psServices/models/common-type';

@Component({
  selector: 'ps-dropdown-billers-category',
  templateUrl: './ps-dropdown-billers-category.component.html',
  styleUrls: ['./ps-dropdown-billers-category.component.scss'],
})
export class PsDropdownBillersCategoryComponent extends PsSelectDropdownComponent implements OnInit {

  @Input() options: IOptionsPsDropdownBillersCategoryExposed;
  defaultSelectOptions: IOptionsPsSelectDropdown = {
    labelKey: 'category_key',
    placeHolder: 'select_category_key'
  };
  public billTypes: PsSelect = [];
  constructor(commonProv: PsCommonService, loggerP: LoggerService, private omniPull: OmniPullService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options);
    this.getBillTypes();
  }

  onCategoryChange(values: any) {
    this.loggerP.log('onCategory' + values);
    this.onPsChange.emit(values);
    }


    getBillTypes() {
      const paramData: IOmniCommonRequest = {
      };
      this.omniPull.returnBillTypeList(paramData).then((result) => {

        if (result && result.gridModel != null && result.gridModel.length > 0) {
          for (let i = 0; i < result.gridModel.length; i++) {
            const acctype = { itemValue: result.gridModel[i].code, 
              description: result.gridModel[i].longDesc, selectedObj: result.gridModel[i] };
            this.billTypes.push(acctype);
          }
          this.defaultSelectOptions.listOfOptions = this.billTypes;
        } else { this.logger.warn(result, 'empty response'); }
      }).catch((error) => { });
    }

}
