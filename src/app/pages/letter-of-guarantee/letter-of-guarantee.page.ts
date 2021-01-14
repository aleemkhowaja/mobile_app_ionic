import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PsAccountsListComponent } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component';
import { IOptionsPsComplexAmountExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-amount/ps-complex-amount.component.interfaces';
import { IOptionsPsDateMonthYearFutureExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-date-month-year/ps-date-month-year-future/ps-date-month-year-future.component.interfaces';
import { IOptionsPsInputFreeTextExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-free-text/ps-input-free-text.component.interfaces';
import { IOptionsPsInputVarcharExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsLookupOwnAccountsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.interfaces';
import { IOptionsPsDropDownCountryExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-country/ps-dropdown-country.component.interfaces';
import { IOptionsPsLovRequestPurposeExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-request-purpose/ps-lov-request-purpose.component.interfaces';
import { IOptionsPsDropdownTFSDocumentTypeExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-tfs-document-type/ps-dropdown-tfs-document-type.component.interfaces';
import { IOmniBeneficiaryRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsContainerPanel, IOptionsPsFileUploadComponent, IOptionsPsLabel, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { OmniBasePage } from '../omni-base/omni-base.page';
import { IOptionsPsInputNumericExposed } from './../../commonBussinessSRC/psComponents/ps-keyin-input/ps-input-numeric/ps-input-numeric.component.interfaces';
import { CommonBussinessConstant } from './../../commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { LoggerService } from './../../commonSRC/psServices/logger/logger.service';


/** @name letter_of-Guarantee
 *  @author Heba.Hassan 
 *  @description Display the letter of Guarantee 
 */

@Component({
  selector: 'app-letter-of-guarantee',
  templateUrl: './letter-of-guarantee.page.html',
  styleUrls: ['./letter-of-guarantee.page.scss'],
})
export class LetterOfGuaranteePage extends OmniBasePage implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  defaultVO: any = {};
  public beneficiariesRequestParam: IOmniBeneficiaryRequest = {};
  isApplicantChargesAccount = false;
  isBeneficiaryChargesAccount = false;
  chargesBorneByOptions: IOptionsPsLovRequestPurposeExposed = {
    group: this.formGroup,
    fcName: 'chargesBorneBy',
  };
  accountNameOptions: IOptionsPsInputVarcharExposed = {
    labelKey: 'charges_account_key',
    placeHolder: 'charges_account_key',
    group: this.formGroup,
    fcName: 'otherPartyChargesAccount'
  };
  stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'letterOfGuarantee_stepper',
    isHorizontalStepper: true,
    numberOfSteps: 2,
    namesofSteps: ['letter_Of_Guarantee_key', 'benefciary_details_key'],
    group: this.formGroup,
    requestObject: this.defaultVO,
    submitOptions: {
      group: this.formGroup,
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.letterOfGuaranteeEndPoint,
    },
  };
  panel1OptionsStep2: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'benefciary_details_key',
    iconName: 'contact',
    expanded: true
  };
  panel2OptionsStep2: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'more_details_key',
    iconName: 'contact',
    expanded: true
  };
  panelOptions1Step1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'lg_details_key',
    iconName: 'letter',
    expanded: true
  };


  fileUploadOptions: IOptionsPsFileUploadComponent = {
    group: this.formGroup,
    multiple: true,
    fcName: 'selectedFileData',
  };

  tfsOptions: IOptionsPsDropdownTFSDocumentTypeExposed = {
    group: this.formGroup,
    labelKey: 'lG_types_key',
    placeHolder: 'select_lg_type',
    fcName: 'docType',
  };
  periodDays: IOptionsPsInputNumericExposed = {
    group: this.formGroup,
    fcName: 'periodDays',
    placeHolder: 'claim_period_days_key',
    labelKey: 'claim_period_days_key'
  };
  purpose1Options: IOptionsPsInputVarcharExposed = {
    labelKey: 'purpose_key',
    placeHolder: 'purpose1_key',
    group: this.formGroup,
    fcName: 'purposeTxtDesc'
  };
  purpose2Options: IOptionsPsInputVarcharExposed = {
    labelKey: 'second_purpose_key',
    placeHolder: 'purpose2_key',
    group: this.formGroup,
    fcName: 'purposeTxtDesc2'
  };
  purpose3Options: IOptionsPsInputVarcharExposed = {
    labelKey: 'third_purpose_key',
    placeHolder: 'purpose3_key',
    group: this.formGroup,
    fcName: 'purposeTxtDesc3'
  };
  beneficiaryNameOptions: IOptionsPsInputVarcharExposed = {
    labelKey: 'ultimate_beneficiary_name_key',
    placeHolder: 'ultimate_beneficiary_name_key',
    group: this.formGroup,
    fcName: 'beneficiaryName'
  };
  beneficiaryAddressOptions: IOptionsPsInputVarcharExposed = {
    labelKey: 'ultimate_beneficiary_address_key',
    placeHolder: 'ultimate_beneficiary_address_key',
    group: this.formGroup,
    fcName: 'beneficiaryAddress'
  };
  beneficiaryCountriesOptions: IOptionsPsDropDownCountryExposed = {
    labelKey: 'beneficiary_country_key',
    placeHolder: 'select_beneficiary_country_key',
    fcName: 'beneficiaryCountry',
    group: this.formGroup
  };

  commentOptions: IOptionsPsInputFreeTextExposed = {
    labelKey: 'file_comment_key',
    placeHolder: 'enter_file_comment_key',
    fcName: 'comment',
    group: this.formGroup
  };

  effictiveDateOptions: IOptionsPsDateMonthYearFutureExposed = {
    labelKey: 'lG_effictive_date_key',
    placeHolder: 'enter_lG_effictive_date_key',
    fcName: 'effectiveDate',
    group: this.formGroup
  };
  expiryDateOptions: IOptionsPsDateMonthYearFutureExposed = {
    labelKey: 'lG_expiry_date_key',
    placeHolder: 'enter_Expiry_date_key',
    fcName: 'expiryDate',
    group: this.formGroup
  };
  claimEndDateOptions: IOptionsPsDateMonthYearFutureExposed = {
    labelKey: 'claim_end_date_key',
    placeHolder: 'enter_claim_end_date_key',
    fcName: 'claimEndDate',
    group: this.formGroup
  };
  complexAmountOptions: IOptionsPsComplexAmountExposed = {
    currency: '',
    currenciesOptions: {
      labelKey: 'currency_key',
      placeHolder: 'select_currency_key',
      fcName: 'currency',
      group: this.formGroup
    },
    amountOptions: {
      labelKey: 'total_amount_key',
      placeHolder: 'enter_amount_key',
      fcName: 'transactionAmount',
      type: 'amount',
      group: this.formGroup
    }
  };

  chargesAccountListOptions: IOptionsPsLookupOwnAccountsExposed = {
    labelKey: 'charges_account_key',
    placeHolder: 'select_charges_account_key',
    component: PsAccountsListComponent,
    group: this.formGroup,
    accountAllowedCurrencies: [],
    accountAllowedTypes: [],
    glTypes: 'G',
    fcName: 'fromAccount',
    accountType: 'G',
    fromTo: 'from',
    requestObject: this.defaultVO,
    currency: '',
  };
  noLocalOptions: IOptionsPsLabel = {
    labelKey: 'no_local_ben_available_key'
  };

  panelOptions3Step2: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'attachment_key',
    iconName: 'document',
    expanded: true
  };

  constructor(private common: PsCommonService,
    public logger: LoggerService,
    private omniPull?: OmniPullService) {
    super();
  }

  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
    this.beneficiariesRequestParam = {
      trxTypeParameterName: CommonBussinessConstant.LOCAL,
      filterByOper: true
    };
  }

  ionViewDidEnter() {
    super.ionViewDidEnter();
    // always non-mandatory
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.effictiveDateOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.expiryDateOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.claimEndDateOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.periodDays.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.chargesBorneByOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.beneficiaryCountriesOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.beneficiaryAddressOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.purpose2Options.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.purpose3Options.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.commentOptions.fcName], 0);

    // mandatory based on conditions of charges brone changed
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.accountNameOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.chargesAccountListOptions.fcName], 0);

  }
  onclaimEndDateChange(event) {
    const effDate = new Date(this.formGroup.controls[this.effictiveDateOptions.fcName].value);
    const claimDate = new Date(this.formGroup.controls[this.claimEndDateOptions.fcName].value);
    const diff = this.dateDiff(claimDate, effDate);
    if (diff != this.formGroup.controls[this.periodDays.fcName].value) {
      this.formGroup.controls[this.periodDays.fcName].setValue(diff);
    }
  }
  onPeriodDaysChange(event) {
    const days = (event.oldValue || 0) - event.newValue;
    const claimDate = new Date(this.formGroup.controls[this.claimEndDateOptions.fcName].value);
    const newDate = new Date(claimDate.setDate(claimDate.getDate() - days));
    if (event.oldValue && days !== 0) {
      this.formGroup.controls[this.claimEndDateOptions.fcName].setValue(newDate);
    }
  }

  onchargesBorneByChange(event) {
    if (event != null && event !== undefined && event.description) {
      switch (event.itemValue) {
        case 'A':
          this.isApplicantChargesAccount = true;
          this.isBeneficiaryChargesAccount = false;
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.accountNameOptions.fcName], 0);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.chargesAccountListOptions.fcName], 1);

          break;
        case 'H'://both
          this.accountNameOptions.labelKey = 'beneficiary_charges_account_key';
          this.isApplicantChargesAccount = true;
          this.isBeneficiaryChargesAccount = true;
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.accountNameOptions.fcName], 1);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.chargesAccountListOptions.fcName], 1);

          break;
        case 'B': //other party
          this.accountNameOptions.labelKey = 'other_party_charges_account_key';
          this.isApplicantChargesAccount = false;
          this.isBeneficiaryChargesAccount = true;
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.accountNameOptions.fcName], 1);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.chargesAccountListOptions.fcName], 0);

          break;
        default:
          this.accountNameOptions.labelKey = 'other_party_charges_account_key';
          this.isApplicantChargesAccount = false;
          this.isBeneficiaryChargesAccount = false;
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.accountNameOptions.fcName, this.chargesAccountListOptions.fcName], 0);
          break;
      }
    }
  }



  dateDiff(date1: Date, date2: Date) {
    let year = date1.getFullYear() - date2.getFullYear();
    if (year < 0) {
      year = -1 * year;
    }
    if (year > 0) {
      year--;
    }
    let month = date1.getMonth() - date2.getMonth();
    if (month < 0) {
      month = (month + 12);
    }
    if (month > 0) {
      month--;
    }
    let day = date1.getDate() - date2.getDate();
    if (day < 0) {
      day = day + this.daysInMonth(date2.getMonth(), date2.getFullYear());
    }
    const value = (day + (month * 30) + (year * 365));
    return value;

  }
  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }


}



