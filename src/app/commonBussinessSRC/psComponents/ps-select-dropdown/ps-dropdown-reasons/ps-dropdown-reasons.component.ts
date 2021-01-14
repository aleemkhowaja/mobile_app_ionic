import { Component, Input, OnInit } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues, IOptionsPsSelectDropdown, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsSelectDropdownComponent } from '../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { IOptionsPsDropdownAccountDeactivationnExposed } from './ps-dropdown-reasons.component.interface';

@Component({
  selector: 'ps-dropdown-reasons',
  templateUrl: './ps-dropdown-reasons.component.html',
  styleUrls: ['./ps-dropdown-reasons.component.scss'],
})
export class PsDropdownReasonsComponent extends PsSelectDropdownComponent implements OnInit {

  @Input() options: IOptionsPsDropdownAccountDeactivationnExposed;
  reasonOptions: IOptionsPsSelectDropdown = {
    listOfOptions:[]
  };
  public parameters;
  otherparameter = false;

  constructor(
    public commonProv: PsCommonService,
    public loggerP: LoggerService, private omniPull: OmniPullService) {
    super(commonProv, loggerP);
  }

  onChangeReason(value: IchangeValues) {
    this.onPsChange.emit(value);
  }

  ngOnInit() {
    this.loadReasons();
    this.commonProv.copyObject(this.reasonOptions, this.options);
  }

  async loadReasons() {

    const result = await this.omniPull.reutrnDeactivationReasons().catch((error) => {
      this.logger.error('Error: While fetching reasons in PsDropdownReasonsComponent : ', error);
    });

    if (result && result.gridModel) {
      for (const iterator of result.gridModel) {
        const reason: IPsSelect = {
          itemValue: iterator.reasonId,
          description: iterator.reasonDescription,
          selectedObj: iterator
        };
        this.reasonOptions.listOfOptions.push(reason);
        this.logger.error('Reasonarray : ',  this.reasonOptions);

      }
    }
  }

}
