import { Component, Input, OnInit } from '@angular/core';
import { IRankingRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues, IOptionsPsSelectDropdown, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsDropdownRankingExposed } from './ps-dropdown-reanking.component.interface';

@Component({
  selector: 'ps-dropdown-ranking',
  templateUrl: './ps-dropdown-ranking.component.html',
  styleUrls: ['./ps-dropdown-ranking.component.scss'],
})
export class PsDropdownRankingComponent extends PsSelectDropdownComponent implements OnInit {
  @Input() options: IOptionsPsDropdownRankingExposed;

  defaultSelectOptions: IOptionsPsSelectDropdown = {
    listOfOptions: []
  };
  constructor(commonProv: PsCommonService, loggerP: LoggerService, private omniPull: OmniPullService) {
    super(commonProv, loggerP);
  }
  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options, false);
    this.loadRanking();
  }

  // Get the list of rankings from the ETL
  private async loadRanking() {

    const rankingsRequest: IRankingRequest = {}; // No need other than company code as all the rankings will be retrieved

    const result = await this.omniPull.returnRankings(rankingsRequest).catch(error => {
      this.logger.error('Error: While fetching rankings in PsDropdownRankingComponent :', error);
    });

    if (result && result.gridModel) {
      for (const iterator of result.gridModel) {
        const eachRanking: IPsSelect = {
          itemValue: iterator.PRIORITY_CODE.toString(),
          description: iterator.longDesc,
          selectedObj: iterator
        };
        this.defaultSelectOptions.listOfOptions.push(eachRanking);
      }
    }
  }

  onRankingChange(values: IchangeValues) {
    this.onPsChange.emit(values);
  }
}
