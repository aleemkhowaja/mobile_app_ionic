import { IOmniCommonRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { Component, OnInit, Input } from '@angular/core';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { IOptionsPsSelectDropdown } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsSelect } from 'src/app/commonSRC/psServices/models/common-type';
import { IOptionsPsDropdownBillerExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-biller/ps-dropdown-biller.component.interface';

@Component({
  selector: 'ps-dropdown-biller',
  templateUrl: './ps-dropdown-biller.component.html',
  styleUrls: ['./ps-dropdown-biller.component.scss'],
})
export class PsDropdownBillerComponent extends PsSelectDropdownComponent implements OnInit {
  @Input() options: IOptionsPsDropdownBillerExposed;
  defaultSelectOptions: IOptionsPsSelectDropdown = {
    labelKey: 'biller_key',
    placeHolder: 'select_biller_key'
  };
  public billerTypes: PsSelect = [];
  constructor(commonProv: PsCommonService, loggerP: LoggerService, private omniPull: OmniPullService) {
    super(commonProv, loggerP);
   }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options);
    if (this.options.listofItems) {
      this.defaultSelectOptions.listOfOptions = this.options.listofItems;
    }
  //  this.getBillerTypes();
  }
  onTypeChange(values: any) {
    this.loggerP.log('onType' + values);
    this.onPsChange.emit(values);
    }

}
