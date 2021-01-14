import { Component, Input, OnInit } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsSelectDropdownComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues, IOptionsPsSelectDropdown, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsDropdownActivityExposed } from './ps-dropdown-activity.component.interfaces';


@Component({
  selector: 'ps-dropdown-activity',
  templateUrl: './ps-dropdown-activity.component.html',
  styleUrls: ['./ps-dropdown-activity.component.scss'],
})
export class PsDropdownActivityComponent extends PsSelectDropdownComponent implements OnInit {
  @Input() options: IOptionsPsDropdownActivityExposed;

  defaultSelectOptions: IOptionsPsSelectDropdown = {
    labelKey: 'activity_key',
    placeHolder: 'select_activity_key',
    listOfOptions: []
  };
  public parameters;
  constructor(public commonProv: PsCommonService, public loggerP: LoggerService,
    private omniPull: OmniPullService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options);
    this.getActivities();
  }


  getActivities() {
    this.omniPull.returnActivitiesList().then((result) => {
      if (result != null && result.gridModel != null && result.gridModel.length > 0) {
        for (const iterator of result.gridModel) {
          const company: IPsSelect = {
            itemValue: iterator.code,
            description: iterator.briefName,
            selectedObj: iterator
          };
          this.defaultSelectOptions.listOfOptions.push(company);
        };

      }

    }, (err) => {

      this.logger.error('Error: While fetching data : ', err);
    });
  }

  onActivityChange(value: IchangeValues) {
    this.onPsChange.emit(value);
  }

}
