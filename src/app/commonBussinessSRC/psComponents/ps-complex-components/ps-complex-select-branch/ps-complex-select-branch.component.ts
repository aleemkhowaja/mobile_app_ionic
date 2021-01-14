import { Component, Input, OnInit } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { PsBaseFieldComponent } from '../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from '../../../../commonSRC/psServices/logger/logger.service';
import { PsCommonService } from '../../../../commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsComplexSelectBranchComponentExposed } from './ps-complex-select-branch.component.interface';

@Component({
  selector: 'ps-complex-select-branch',
  templateUrl: './ps-complex-select-branch.component.html',
  styleUrls: ['./ps-complex-select-branch.component.scss'],
})

export class PsComplexSelectBranchComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsComplexSelectBranchComponentExposed;
  public defaultOptions: IOptionsPsComplexSelectBranchComponentExposed = {};

  constructor(commonService: PsCommonService, logger: LoggerService, private omniPull: OmniPullService) {
    super(commonService, logger);
  }

  async ngOnInit() {
    this.defaultOptions = {
      countryRegionCityOptions: {
        countriesOptions: {
          labelKey: 'country__key',
          placeHolder: 'select_country_key',
          fcName: 'branch_country',
          group: this.options.group,
          iconOptions: {
            iconName: 'clipboard'
          }
        },
        regionOptions: {
          labelKey: 'region_key',
          placeHolder: 'region_key',
          fcName: 'branch_region',
          group: this.options.group
        },
        cityOptions: {
          labelKey: 'city_key',
          placeHolder: 'select_city_key',
          fcName: 'branch_city',
          group: this.options.group,
        }
      },
    };
    this.defaultOptions.branchesOptions = {
      group: this.options.group,
      fcName: 'default_branch'
    };
    this.commonProv.copyObject(this.defaultOptions, this.options);
    super.init();
    let optionsFcNameValidations = this.commonProv.getElementValidations(this.defaultOptions.branchesOptions.fcName);
    if (this.options.parameterToCheck) {
      const result = await this.omniPull.checkBranch(this.options.parameterToCheck);
      optionsFcNameValidations = this.commonProv.getElementValidations(this.defaultOptions.branchesOptions.fcName);
      if (result.enableCifBranch || (this.defaultOptions.branchesOptions.fcName && !optionsFcNameValidations.IS_VISIBLE)) {
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.defaultOptions.branchesOptions.fcName], 0);
      } else {
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.defaultOptions.branchesOptions.fcName], optionsFcNameValidations.IS_MANDATORY);
      }
    } else {
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.defaultOptions.branchesOptions.fcName], optionsFcNameValidations.IS_MANDATORY);
    }
  }

  onSelectBranch($event) {
    this.onPsChange.emit($event);
  }
  /**
   * event for city change
   * @param event
   */
  public onCityChange(event) {
    this.defaultOptions.branchesOptions.selectedCityCode = event.newValue;
    this.defaultOptions.branchesOptions = Object.assign({}, this.defaultOptions.branchesOptions);
    this.options.group.controls[this.defaultOptions.branchesOptions.fcName].setValue(null);
    if (event !== null && event !== undefined && event.selectedObj !== undefined) {
      this.defaultOptions.branchesOptions.selectedCityCode = event.itemValue;
      this.defaultOptions.branchesOptions = Object.assign({}, this.defaultOptions.branchesOptions);
    } else if (event !== null && event !== undefined && event.newValue !== undefined) {
      this.defaultOptions.branchesOptions.selectedCityCode = event.newValue;
      this.defaultOptions.branchesOptions = Object.assign({}, this.defaultOptions.branchesOptions);
    }
  }
}
