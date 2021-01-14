import { Component, Input, OnInit } from '@angular/core';
import { ICifTypeRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues, IOptionsPsSelectDropdown } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsDropdownCifTypesExposed } from './ps-dropdown-cif-types.component.interfaces';

@Component({
  selector: 'ps-dropdown-cif-types',
  templateUrl: './ps-dropdown-cif-types.component.html',
  styleUrls: ['./ps-dropdown-cif-types.component.scss'],
})
export class PsDropdownCifTypesComponent extends PsSelectDropdownComponent implements OnInit {

  @Input() options: IOptionsPsDropdownCifTypesExposed;
  defaultSelectOptions: IOptionsPsSelectDropdown = {
    labelKey: 'cif_types_key',
    placeHolder: 'cif_type_key'
  };

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService, private omniPull: OmniPullService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options);
    this.returnCifTypes();
  }

  onChange(value: IchangeValues) {
    this.onPsChange.emit(value);
  }

  private async returnCifTypes() {
    const paramData: ICifTypeRequest = {
      language: PsCommonSettings.activeLanguge,
    };
    this.omniPull.returnCifTypes(paramData).then((result) => {
      // console.log("result", result);
      if (result && result.gridModel && result.gridModel.length > 0) {
        this.defaultSelectOptions.listOfOptions = [];
        for (const iterator of result.gridModel) {
          const documents: any = {
            itemValue: iterator.typeCode.toString(),
            description: iterator.briefDesc,
            selectedObj: iterator
          };
          this.defaultSelectOptions.listOfOptions.push(documents);
        }
      }
    }, (err) => {
      this.logger.error('Error: While fetching data : ', err);
    });
  }
}
