import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues, IOptionsPsSelectDropdown } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsDropdownEcoSectorsExposed } from './ps-dropdown-eco-sectors.component.interface';

@Component({
  selector: 'ps-dropdown-eco-sectors',
  templateUrl: './ps-dropdown-eco-sectors.component.html',
  styleUrls: ['./ps-dropdown-eco-sectors.component.scss'],
})
export class PsDropdownEcoSectorsComponent extends PsSelectDropdownComponent implements OnInit, OnChanges {

  @Input() options: IOptionsPsDropdownEcoSectorsExposed;

  ecoSectorsOptions: IOptionsPsSelectDropdown;

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
   }

  ngOnInit() {
    this.init();
  }

  ngOnChanges(change: SimpleChanges) {
    this.init();
  }

  onChangeEcoSector(value: IchangeValues) {
    this.commonProv.logger.log('onChange Eco Sectors', value);
    this.onPsChange.emit(value);
  }
  public init() {
    this.ecoSectorsOptions = {
      labelKey: this.options.labelKey ? this.options.labelKey : 'eco_sectors',
      placeHolder: this.options.placeHolder ? this.options.placeHolder : 'select_eco_sectors_key',
      fcName: this.options.fcName,
      group: this.options.group,
      listOfOptions: this.options.listOfOptions
    };
  }


}
