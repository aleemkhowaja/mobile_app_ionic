import { Component, Input, OnInit } from '@angular/core';
import { ITFSDocumentTypeRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues, IOptionsPsSelectDropdown, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsDropdownTFSDocumentTypeExposed } from './ps-dropdown-tfs-document-type.component.interfaces';

@Component({
  selector: 'ps-dropdown-tfs-document-type',
  templateUrl: './ps-dropdown-tfs-document-type.component.html',
  styleUrls: ['./ps-dropdown-tfs-document-type.component.scss'],
})
export class PsDropdownTFSDocumentTypeComponent extends PsSelectDropdownComponent implements OnInit {
  @Input() options: IOptionsPsDropdownTFSDocumentTypeExposed;
  defaultSelectOptions: IOptionsPsSelectDropdown = {
    labelKey: 'document_type_key',
    placeHolder: 'select_document_type_key',
    listOfOptions: []
  };
  public parameters;
  constructor(public commonProv: PsCommonService, public loggerP: LoggerService,
    private omniPull: OmniPullService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options);
    this.returnTFSDocumentType();
  }


  returnTFSDocumentType() {
    const paramData: ITFSDocumentTypeRequest = {
      docType: this.options.docType,
      code: this.options.code
    };
    this.omniPull.returnTFSDocumentType(paramData).then((result) => {
      if (result != null && result.gridModel != null && result.gridModel.length > 0) {
        for (const iterator of result.gridModel) {
          const TFSDocumentType: IPsSelect = {
            itemValue: iterator.code,
            description: iterator.briefName,
            selectedObj: iterator
          };
          this.defaultSelectOptions.listOfOptions.push(TFSDocumentType);
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
