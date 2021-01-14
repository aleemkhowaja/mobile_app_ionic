import { Component, Input, OnInit } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues, IOptionsPsSelectDropdown } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsSelectDropdownComponent } from '../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { IOptionsPsDropdownCardBlockReasonExposed } from './ps-dropdown-block-reasons.component.interface';


@Component({
  selector: 'ps-dropdown-block-reasons',
  templateUrl: './ps-dropdown-block-reasons.component.html'
})
export class PsDropdownCardBlockReasonsComponent extends PsSelectDropdownComponent implements OnInit {
  @Input() options: IOptionsPsDropdownCardBlockReasonExposed;
  reasonOptions: IOptionsPsSelectDropdown = {
  };

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService,
    private omniPull: OmniPullService) {
    super(commonProv, loggerP);
  }

  onChangeReason(value: IchangeValues) {
    this.onPsChange.emit(value);
  }
  ngOnInit() {
    this.commonProv.copyObject(this.reasonOptions, this.options);
    this.loadReasons();
  }


  async loadReasons() {
    await this.omniPull.reutrnDeactivationReasons().then((result) => {
      if (result && result.gridModel && result.gridModel.length > 0) {
        this.reasonOptions.listOfOptions = [];
        for (let i = 0; i < result.gridModel.length; i++) {
          this.reasonOptions.listOfOptions.push({
            itemValue: result.gridModel[i].reasonId,
            description: result.gridModel[i].reasonDescription,
            selectedObj: result.gridModel[i]
          });
        }
      } else {
        this.logger.info('info_key', 'card_block_reasons_not_available_key');
      }
    }, (err) => {
      this.logger.error('error_key', 'network_problem_key');
    });
  }

}
