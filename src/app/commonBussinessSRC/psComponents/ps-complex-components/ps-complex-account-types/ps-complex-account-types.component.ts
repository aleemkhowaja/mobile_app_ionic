import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsComplexAccountTypesExposed } from './ps-complex-account-types.component.interface';

@Component({
  selector: 'ps-complex-account-types',
  templateUrl: './ps-complex-account-types.component.html',
  styleUrls: ['./ps-complex-account-types.component.scss'],
})
export class PsComplexAccountTypesComponent extends PsBaseFieldComponent implements OnInit {
  @Input() options: IOptionsPsComplexAccountTypesExposed;
  oldAccountTypes = '';
  get defaultOptions(): IOptionsPsComplexAccountTypesExposed {
    if (this.options.requestObject && 
      this.options.requestObject[this.options.accountTypesOptions.fcName]
      && this.options) {
      if (this.oldAccountTypes !== this.options.requestObject[this.options.accountTypesOptions.fcName].itemValue) {
        this.onChangeEvent(this.options.requestObject[this.options.accountTypesOptions.fcName].selectedObj);
        this.oldAccountTypes = this.options.requestObject[this.options.accountTypesOptions.fcName].itemValue;
      }
    }
    return {
      accountTypesOptions: {
        allowedAccountType: this.options.accountTypesOptions.allowedAccountType,
        accountCategory: this.options.accountTypesOptions.accountCategory,
        group: this.options.accountTypesOptions.group,
        fcName: this.options.accountTypesOptions.fcName
      },
      periodicity: {
        group: this.options.periodicity.group,
        fcName: this.options.periodicity.fcName,
        placeHolder: 'periodicity_key',
        labelKey: 'periodicity_key'
      },
      minimumBalance: {
        group: this.options.minimumBalance.group,
        fcName: this.options.minimumBalance.fcName,
        placeHolder: 'minimum_opening_balance_key',
        labelKey: 'minimum_opening_balance_key'
      },
      group: this.options.group,
      requestObject: this.options.requestObject
    };
  }
  enablePeriodicity = false;
  enableMinBal = false;
  constructor(commonService: PsCommonService, logger: LoggerService) {
    super(commonService, logger);
  }

  ngOnInit() {
    super.init();
  }

  onChangeEvent(values: any) {
    if (values) {
      if (values.allowBelowMinOpenBal === "0" && values.minOpenBal) {
        this.logger.log('values :' + values);
        this.enableMinBal = true;
        setTimeout(() => {
          this.options.group.controls[this.options.minimumBalance.fcName].setValue(values.minOpenBal.toString());
          this.commonProv.setValInsideNestedObj(this.options.minimumBalance.fcName, values.minOpenBal.toString(), this.options.requestObject);
        }, 300);
      } else {
        if (this.options.group.get(this.options.minimumBalance.fcName)) {
          this.options.group.controls[this.options.minimumBalance.fcName].setValue(null);
          this.commonProv.setValInsideNestedObj(this.options.minimumBalance.fcName, null, this.options.requestObject);
          this.enableMinBal = false;
        }
      }
      if (values.termInd && values.termDays) {
        this.enablePeriodicity = true;
        let calValue = values.termInd !== CommonBussinessConstant.YEAR ? (values.termInd === CommonBussinessConstant.DAYS ? (values.termDays === 1 ? CommonBussinessConstant.DY : CommonBussinessConstant.DAY_S) : (values.termDays === 1 ? CommonBussinessConstant.MNTH : CommonBussinessConstant.MONTH_S)) : values.termDays === 1 ? CommonBussinessConstant.YR : CommonBussinessConstant.YEAR_S;
        setTimeout(() => {
          this.options.group.controls[this.options.periodicity.fcName].setValue(values.termDays + ' ' + calValue);
          this.options.group.controls[this.options.periodicity.fcName].disable();
          this.commonProv.setValInsideNestedObj(this.options.periodicity.fcName, values.termDays + ' ' + calValue, this.options.requestObject);
        }, 300);
      } else {
        if (this.options.group.get(this.options.periodicity.fcName)) {
          this.options.group.controls[this.options.periodicity.fcName].setValue(null);
          this.commonProv.setValInsideNestedObj(this.options.periodicity.fcName, null, this.options.requestObject);
          this.enablePeriodicity = false;
        }
      }
      this.onPsChange.emit(values);
    } else {
      this.enableMinBal = false;
      this.enablePeriodicity = false;
    }
  }

}
