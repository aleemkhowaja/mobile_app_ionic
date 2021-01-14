import { Component, Input, OnInit } from '@angular/core';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsSelectDropdown, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsDropdownSubProfileExposed } from './ps-dropdown-sub-profile.component.interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';

@Component({
  selector: 'ps-dropdown-sub-profile',
  templateUrl: './ps-dropdown-sub-profile.component.html',
  styleUrls: ['./ps-dropdown-sub-profile.component.scss'],
})
export class PsDropdownSubProfileComponent extends PsSelectDropdownComponent implements OnInit {

  @Input() options: IOptionsPsDropdownSubProfileExposed;

  defaultSelectOptions: IOptionsPsSelectDropdown = {};
  constructor(commonProv: PsCommonService, loggerP: LoggerService, public omniPull?: OmniPullService) {
    super(commonProv, loggerP);
  }
  ngOnInit() {
    this.defaultSelectOptions = {
      labelKey: this.options.labelKey ? this.options.labelKey : 'sub_profile_key',
      placeHolder: this.options.placeHolder ? this.options.placeHolder : 'sub_profile_key',
      group: this.options.group,
      fcName: this.options.fcName,
      listOfOptions: []
    };
    this.fetchProfileDataFromService();
  }

  onProfileChange(event) {
  }

  // Fetching profile data from service

  public async fetchProfileDataFromService() {
    const result =
      await this.omniPull.returnSubProfiles().catch(error => {
        this.logger.error('Error: While fetching sub profiles in PsDropdownSubProfileComponent :', error);
      });

    if (result && result.length > 0) {
      result.forEach(element => {
        for (const iterator of element.subProfile) {
          const listOfItems: IPsSelect = {
            ...iterator,
            itemValue: iterator.profileId,
            description: iterator.name,
            selectedObj: iterator
          };
          this.defaultSelectOptions.listOfOptions.push(listOfItems);
        }
      });
      this.logger.log('Success: fetchProfileDataFromService :-> this.defaultSelectOptions.listOfOptions', this.defaultSelectOptions.listOfOptions);
    }
  }

}
