import { Component, Input, OnInit } from '@angular/core';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsComplexPoBoxExposed } from './ps-complex-po-box.component.interfaces';

@Component({
  selector: 'ps-complex-po-box',
  templateUrl: './ps-complex-po-box.component.html',
  styleUrls: ['./ps-complex-po-box.component.scss'],
})
export class PsComplexPoBoxComponent  extends PsBaseFieldComponent  implements OnInit {
  @Input() public options: IOptionsPsComplexPoBoxExposed;
  defaultOptions: IOptionsPsComplexPoBoxExposed = {
    regionOptions: { //Author: GRadwan 16/01/2020
      labelKey: 'region_key',
      placeHolder: 'region_key',
      fcName: 'region',
      selectedCountryCode: '',
      iconOptions: {
        iconName: 'clipboard'
      }
    },
    poBoxInputOptions:{
      labelKey: 'pobox_key',
      placeHolder: 'enter_pobox_key',
      fcName: 'poboxinput',
      }
  };
  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    super.init();
    this.commonProv.copyObject(this.defaultOptions, this.options, false);
  }

}
