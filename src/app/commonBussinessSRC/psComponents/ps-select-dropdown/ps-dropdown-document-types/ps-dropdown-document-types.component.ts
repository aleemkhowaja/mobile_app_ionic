import { Component, Input, OnInit } from '@angular/core';
import { ILostDocumentListRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IchangeValues, IOptionsPsSelectDropdown } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsDropdownDocumentTypesExposed } from './ps-dropdown-document-types.component.interfaces';

@Component({
  selector: 'ps-dropdown-document-types',
  templateUrl: './ps-dropdown-document-types.component.html',
  styleUrls: ['./ps-dropdown-document-types.component.scss'],
})
export class PsDropdownDocumentTypesComponent extends PsSelectDropdownComponent implements OnInit  {
  @Input() options: IOptionsPsDropdownDocumentTypesExposed;
  defaultSelectOptions: IOptionsPsSelectDropdown={
    labelKey: 'lost_account_types_key',
    placeHolder: 'lost_account_type_key'
  };
  public parameters;
  constructor(public commonProv: PsCommonService, public loggerP: LoggerService,
    private omniPull: OmniPullService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options);
    this.returnLostdocument();
  }
  
  private async returnLostdocument() {
    let paramData: ILostDocumentListRequest = {
      serviceMethod: ConstantCommon.ONE,
    };
    this.omniPull.returnLostDocument(paramData).then((result) => {
      // console.log("result", result);
      if (result && result.gridModel && result.gridModel.length > 0) {    
        this.defaultSelectOptions.listOfOptions = [];   
          for (const iterator of result.gridModel) {
            const documents: any = {
              itemValue: iterator.ctsLostDocId,
              description: iterator.briefDescription, 
              selectedObj: iterator
             };
            this.defaultSelectOptions.listOfOptions.push(documents);
          }         
      }
    }, (err) => {

      this.logger.error('Error: While fetching data : ', err);
    });

   
  }
 
  onDocTypeChange(value: IchangeValues) {
    this.onPsChange.emit(value);
  }

}
