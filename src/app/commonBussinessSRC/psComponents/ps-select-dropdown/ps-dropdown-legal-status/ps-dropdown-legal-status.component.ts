import { Component, Input, OnInit } from '@angular/core';
import { ILegalStatusRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues, IOptionsPsSelectDropdown } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IPsSelect } from '../../../../commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsDropdownLegalStatusExposed } from './ps-dropdown-legal-status.component.interface';

@Component({
  selector: 'ps-dropdown-legal-status',
  templateUrl: './ps-dropdown-legal-status.component.html',
  styleUrls: ['./ps-dropdown-legal-status.component.scss'],
})
export class PsDropdownLegalStatusComponent extends PsSelectDropdownComponent implements OnInit {

  @Input() options: IOptionsPsDropdownLegalStatusExposed;

  defaultSelectOptions: IOptionsPsSelectDropdown = {
    listOfOptions: []
  };

  constructor(commonProv: PsCommonService, loggerP: LoggerService, private omniPull: OmniPullService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options, false);
    this.loadLegalStatus();
  }

  // Get the list of legal statuses from the ETL
  private async loadLegalStatus() {

    const legalStatusesRequest: ILegalStatusRequest = {}; // No need other than company code as all the legal statuses will be retrieved

    const result = await this.omniPull.returnLegalStatuses(legalStatusesRequest).catch((error) => {
      this.logger.log('Error: while loading legal status in PsDropdownLegalStatusComponent: ', error);
    });

    if (result && result.gridModel) {
      for (const eachItem of result.gridModel) {
        const eachLegalStatus: IPsSelect = {
          itemValue: eachItem.LEGAL_STATUS_CODE.toString(),
          description: eachItem.longDesc,
          selectedObj: eachItem
        };
        this.defaultSelectOptions.listOfOptions.push(eachLegalStatus);
      }
    }
  }

  onLegalStatusChange(values: IchangeValues) {
    this.onPsChange.emit(values);
  }
}
