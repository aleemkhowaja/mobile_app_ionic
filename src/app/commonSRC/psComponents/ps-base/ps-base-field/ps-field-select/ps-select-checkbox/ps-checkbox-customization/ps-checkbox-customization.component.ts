import { Component, Input } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsActionIcon, IOptionsPsCheckboxCustomization } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsSelectCheckboxComponent } from '../ps-select-checkbox.component';

@Component({
  selector: 'ps-checkbox-customization',
  templateUrl: './ps-checkbox-customization.component.html',
  styleUrls: ['./ps-checkbox-customization.component.scss'],
})
export class PsCheckboxCustomizationComponent extends PsSelectCheckboxComponent {

  @Input() options: IOptionsPsCheckboxCustomization;

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  iconOptions: IOptionsPsActionIcon = {
    iconName: 'cog'
  };

  enableFX = false;

}
