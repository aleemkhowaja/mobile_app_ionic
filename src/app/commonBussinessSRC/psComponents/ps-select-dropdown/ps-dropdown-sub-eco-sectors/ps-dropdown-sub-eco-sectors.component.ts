import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues, IOptionsPsSelectDropdown } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsDropdownSubEcoSectorsExposed } from './ps-dropdown-sub-eco-sectors.component.interface';

@Component({
  selector: 'ps-dropdown-sub-eco-sectors',
  templateUrl: './ps-dropdown-sub-eco-sectors.component.html',
  styleUrls: ['./ps-dropdown-sub-eco-sectors.component.scss'],
})
export class PsDropdownSubEcoSectorsComponent extends PsSelectDropdownComponent implements OnInit, OnChanges {

  @Input() options: IOptionsPsDropdownSubEcoSectorsExposed;

  subEcoSectorsOptions: IOptionsPsSelectDropdown;

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
   }

  ngOnInit() {
    this.subEcoSectorsOptions = {
      labelKey: this.options.labelKey ? this.options.labelKey : 'sub_eco_sectors',
      placeHolder: this.options.placeHolder ? this.options.placeHolder : 'select_sub_eco_sectors_key',
      fcName: this.options.fcName,
      group: this.options.group,
      listOfOptions: this.options.listOfOptions
    };
  }

  ngOnChanges(change: SimpleChanges) {
  }

  onChangeSubEcoSector(value: IchangeValues) {
    this.commonProv.logger.log('onChange Sub Eco Sectors', value);
    this.onPsChange.emit(value);
  }
}
