import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';

import { PsBaseFieldComponent } from '../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from '../../../../commonSRC/psServices/logger/logger.service';
import { PsCommonService } from '../../../../commonSRC/psServices/ps-common/ps-common.service';
import { PsDateMonthYearPastComponent } from '../../ps-keyin-input/ps-date-month-year/ps-date-month-year-past/ps-date-month-year-past.component';
import { PsDateDayMonthYearFutureComponent } from '../../ps-keyin-input/ps-day-month-year/ps-date-day-month-year-future/ps-date-day-month-year-future.component';
import { PsDropdownCountryComponent } from '../../ps-select-dropdown/ps-dropdown-country/ps-dropdown-country.component';
import { ConstantCommon } from './../../../../commonSRC/psServices/models/common-constant';
import { IOptionsPsComplexIdDetailsExposed } from './ps-complex-id-details.interface';

/**
 * @author Aftab.Ali
 * @since 24/10/2019
 *
 * <p> PsComplexIdDetailsComponent is a complex component composed of ps-dropdown-id-types, ps-input-free-text and ps-date-future components</p>
 */
@Component({
  selector: 'ps-complex-id-details',
  templateUrl: './ps-complex-id-details.component.html',
  styleUrls: ['./ps-complex-id-details.component.scss'],
})
export class PsComplexIdDetailsComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsComplexIdDetailsExposed;
  @ViewChild('expiryDate', { static: false }) expiryDate: PsDateDayMonthYearFutureComponent;

  @ViewChild('issuanceCountry', { static: false }) issuanceCountry: PsDropdownCountryComponent;
  
  @ViewChild('issueDate', { static: false }) issueDate: PsDateMonthYearPastComponent;
  constructor(commonService: PsCommonService, logger: LoggerService) {
    super(commonService, logger);
  }

  ngOnInit() {
    super.init();
    if (this.options) {
      if (this.options.dropdownIdTypesOptions) {
        this.options.dropdownIdTypesOptions.iconOptions = { iconName: 'clipboard' };
      }
      if (this.options.idNumberOptions) {
        this.options.idNumberOptions.iconOptions = { iconName: 'clipboard' };
      }
    }
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.options.dateExpiryOptions.fcName, this.options.countriesOptions.fcName, this.options.issueDateOptions.fcName], 0);
  }

  /**
   * will validate the Id Types
   */
  public validateIdType(values: IchangeValues): void {
    // console.log(values);
    /*if (this.pageVO.idType && this.customerInfoCO.idType) {
        if (this.pageVO.idType != this.customerInfoCO.idType) {
          this.common.presentAlert("", this.common.translate("Invalid_Id_Type_key"))
          this.resetField("idType");
          this.checkAttempts();
        }
      } */
  }

  /**
   * will validate the Id Number
   */
  public validateIdNumber(values: IchangeValues): void {
    // console.log(values);
    /* if (this.pageVO.idnumber && this.customerInfoCO.idNumber) {
      if (this.pageVO.idnumber != this.customerInfoCO.idNumber) {
        this.common.presentAlert("", this.common.translate("Invalid_Id_Number_key"))
        this.resetField("idnumber");
        this.checkAttempts();
      }
    } */
  }


  onChangeCvvNumber(value: IchangeValues) {
    this.commonProv.logger.log('CardCvv:' + value.newValue);
  }

  onItemChange(values: any) {
    if (values && values.selectedObj) {
      if (values.selectedObj.TYPES === CommonBussinessConstant.PASSPORT_NO_ID) {
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.options.countriesOptions.fcName], 1);
      } else {
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.options.countriesOptions.fcName], 0);
      }
      this.onPsChange.emit(values);
    }
  }

  toggleExpiry(event) {
    this.logger.log('expirytoggle',event);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.options.dateExpiryOptions.fcName, this.options.issueDateOptions.fcName], event);
    if (event === false) {
      this.expiryDate.superWriteValue('');
      this.issuanceCountry.superWriteValue('');
      this.issueDate.superWriteValue('');
    }

  }
}
