import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsHyperlinkAnchor } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsLovPreferredLanguageExposed } from '../../ps-select-dropdown/ps-dropdown-lov/ps-lov-preferred-language/ps-lov-preferred-language.component.interfaces';
import { IOptionsPsComplexUserProfileMenuExposed } from './ps-complex-user-profile-menu.component.interfaces';


@Component({
  selector: 'ps-complex-user-profile-menu',
  templateUrl: './ps-complex-user-profile-menu.component.html',
  styleUrls: ['./ps-complex-user-profile-menu.component.scss']
})
export class PsComplexUserProfileMenuComponent extends PsBaseFieldComponent
  implements OnInit {
  @Input() options: IOptionsPsComplexUserProfileMenuExposed = {
  };

  preferredLanguageOptions: IOptionsPsLovPreferredLanguageExposed;
  mygroup: FormGroup = new FormGroup({});
  anchorOptions: IOptionsPsHyperlinkAnchor = {
    labelKey: 'profile_key',
    iconOptions: {
      labelOptions: {
        labelKey: 'Edit_profile_key'
      }
    }
  };
  constructor(loggerP: LoggerService, public commonProv: PsCommonService, private navService?: PsNavigatorService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.preferredLanguageOptions = {
      group: this.mygroup,
      fcName: 'country'
    };
  }
  doEdit() {
    this.navService.navigateForward(['./profile']);
  }
}
