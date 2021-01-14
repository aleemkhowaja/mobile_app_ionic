import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsComplexAmountExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-amount/ps-complex-amount.component.interfaces';
import { IOptionsPsOptionSecurityExposed, ISecurityListResponse } from 'src/app/commonBussinessSRC/psComponents/ps-container-lookup-option/ps-option-expired-security/ps-option-expired-security.component.interface';
import { IOptionsPsDisplayOnlyTodayDateExposed } from 'src/app/commonBussinessSRC/psComponents/ps-input-display-only/ps-display-only-today-date/ps-display-only-today-date.component.interface';
import { IOptionsPsInputNumericExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-numeric/ps-input-numeric.component.interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniCommonService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-common.service';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IdefaultValidators, IOptionsPsContainerPanel, IOptionsPsKeyinInput, IOptionsPsKeyinInputExposed, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsCommonSettings } from '../../commonSRC/psServices/models/ps-common.settings';
import { OmniBasePage } from '../omni-base/omni-base.page';

@Component({
  selector: 'app-security-renewal',
  templateUrl: './security-renewal.page.html',
  styleUrls: ['./security-renewal.page.scss'],
})
export class SecurityRenewalPage extends OmniBasePage implements OnInit, AfterViewInit {
  formGroup: FormGroup = new FormGroup({});
  securityRenewalVO = {};
  securityOptions: IOptionsPsOptionSecurityExposed[] = [];
  security: ISecurityListResponse;
  selecetdSukukPrice: number;
  stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'sec_ren_stepper',
    isHorizontalStepper: true,
    numberOfSteps: 1,
    namesofSteps: ['sec_renewal_step1'],
    group: this.formGroup,
    submitOptions: {
      extraParams: {},
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.securityRenewal,
      group: this.formGroup
    },
    requestObject: this.securityRenewalVO
  };

  panelOptions1Step1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'request_key',
    iconName: 'document',
    expanded: true
  };
  sukukOptions: IOptionsPsKeyinInputExposed = {
    placeHolder: 'renewal_liquidation_of_sukuk_key',
    labelKey: 'renewal_liquidation_of_sukuk_key',
    group: this.formGroup,
    fcName: 'sukukType'
  };
  todayDateOptions: IOptionsPsDisplayOnlyTodayDateExposed = {
    placeHolder: 'trx_date_key',
    labelKey: 'trx_date_key',
    type: 'text',
    psClass: 'ps-disabled',
    group: this.formGroup,
    fcName: 'todayDate'
  };
  portfolioCifOptions: IOptionsPsKeyinInputExposed = {
    placeHolder: 'portfolio_key',
    labelKey: 'portfolio_key',
    group: this.formGroup,
    fcName: 'portfolioCif'
  };
  sukukBalanceOptions: IOptionsPsKeyinInputExposed = {
    placeHolder: 'sukuk_balance_key',
    labelKey: 'sukuk_balance_key',
    group: this.formGroup,
    fcName: 'balance'
  };

  sukukRenewalOptions: IOptionsPsInputNumericExposed = {
    fcName: 'quantity',
    group: this.formGroup,
    labelKey: 'sukuk_renewal_key',
    placeHolder: 'enter_your_amount_key',
  };

  sukukLiquidationOptions: IOptionsPsInputNumericExposed = {
    fcName: 'sukukLiquidation',
    group: this.formGroup,
    labelKey: 'sukuk_liquidation_key',
    placeHolder: 'enter_your_amount_key',
  };


  remainingOptions: IOptionsPsInputNumericExposed = {
    fcName: 'remaining',
    group: this.formGroup,
    labelKey: 'remaining_key',
    placeHolder: 'amount_key',
  };


  availableBalOptions: IOptionsPsInputNumericExposed = {
    fcName: 'availableBal',
    group: this.formGroup,
    labelKey: PsCommonBusinessSettings.isAgent ? 'available_balance_key' : 'sukuk_balance_key',
    placeHolder: 'amount_key',
  };
  newIsdaraNumberOptions: IOptionsPsKeyinInput = {
      labelKey: 'new_isdara_number_key',
      placeHolder: 'new_isdara_number_key',
      fcName: 'newIsdaraNumber',
      group: this.formGroup,
      showEmpty: true,
  };


  valueOfLiquidationOptions: IOptionsPsComplexAmountExposed = {
    currenciesOptions: {
      labelKey: 'currency_key',
      placeHolder: 'currency_key',
      group: this.formGroup,
      fcName: 'valueOfLiquidCurrency'
    },
    amountOptions: {
      labelKey: 'value_of_liquidated_shares_key',
      placeHolder: 'amount_key',
      fcName: 'valueOfLiquidation',
      group: this.formGroup,
      type: 'amount',
      decimalPoints: 3
    }
  };
  showAvailableBal = true;
  workingCif: string;
  navResult: any;
  calculatedSukukPrice: number;
  constructor(public commonProv: PsCommonService, private navService: PsNavigatorService,
              public loggerP: LoggerService, private omniCommonService: OmniCommonService, public omniPull: OmniPullService) {
    super();
  }

  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
   // if (PsCommonBusinessSettings.isAgent) {
     // this.showAvailableBal = true;
  //  } else {
     // this.showAvailableBal = false;
      // this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.availableBalOptions.currenciesOptions.fcName], 0);
     // this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.availableBalOptions.fcName], 0);
    //}
    PsCommonSettings.showInitialCardValues = 6;
    const cifInfo = this.commonProv.session.getValueOf(ConstantCommon.USERINFO);
    // this.workingCif = (!this.omniCommonService.common.session.getValueOf('WORKINGCIF') ? cifInfo.omniUserVO.CIF_NO : '');
    this.navResult = this.navService.getAllParams() ? this.navService.getAllParams() : null;
    if (this.navResult) {
      this.securityOptions = [];
      this.securityOptions.push({
        isEditable: false,
        securityInformation: this.navResult
      });
      this.securityRenewalVO = this.navResult;
      this.security = this.navResult;
      this.commonProv.copyObject(this.stepperOptions.submitOptions.extraParams, { securityCode1: this.navResult.securityCode1, securityCode2: this.navResult.securityCode2, portfolioSeq: this.navResult.portfolioSeq }, false, true);
    }
    const defaultValidations: Map<string, IdefaultValidators> = new Map<string, IdefaultValidators>();
    if (!PsCommonBusinessSettings.isAgent) {
      defaultValidations.set(this.securityRenewalVO[this.sukukLiquidationOptions.fcName], {
        disabled: true
      });
    }

    // defaultValidations.set(this.securityRenewalVO[this.sukukLiquidationOptions.currenciesOptions.fcName], {
    //   disabled: true
    // });
   // this.securityRenewalVO[this.sukukRenewalOptions.fcName] = this.navResult.totalNumberOfSukuk;
   // this.formGroup.controls[this.sukukRenewalOptions.fcName].setValue(this.navResult.totalNumberOfSukuk);
    this.commonProv.setDefaultValidators(defaultValidations, this.sukukLiquidationOptions.group);


  }

  ngAfterViewInit() {
    // this.formGroup.controls[this.sukukRenewalOptions.currenciesOptions.fcName].disable();
    this.securityRenewalVO[this.sukukLiquidationOptions.fcName] = '';
    this.formGroup.controls[this.sukukRenewalOptions.fcName].setValue(this.navResult.totalNumberOfSukuk);
    this.formGroup.controls[this.availableBalOptions.fcName].setValue(this.navResult.totalNumberOfSukuk);
    this.sukuCurrency();
  }
  sukuCurrency() {
    try {
      const paramData: any = {
        sukukSearch: {
          securityCode1: this.navResult.securityCode1,
          securityCode2: this.navResult.securityCode2
        },
        linkToSecurityDetails: 'Y',
      };

      // const paramData: any = {
      //   "workingCif": this.workingCif,
      //   "sukukSearch": {
      //     "securityCode1": this.navResult.securityCode1,
      //     "securityCode2": this.navResult.securityCode2
      //   }
      // };
      this.omniPull.returnSukukCurrency(paramData).then((result) => {
        if (result && result.gridModel != null && result.gridModel.length > 0) {
          const currencyCode = result.gridModel[0].tradingCurrencyCode; // result.gridModel.find(x => x.branchesId == this.cifInfo.cifBranch);
          this.selecetdSukukPrice = result.gridModel[0].sukukPrice;
          this.calculatedSukukPrice = Number(result.gridModel[0].calculatedSukukPrice);
          if (result.gridModel[0].newIsdaraNumber) {
            this.formGroup.controls[this.newIsdaraNumberOptions.fcName].setValue(result.gridModel[0].newIsdaraNumber);
          }

          this.formGroup.controls[this.valueOfLiquidationOptions.currenciesOptions.fcName].setValue(currencyCode);
          this.valueOfLiquidationOptions.amountOptions.group.controls[this.valueOfLiquidationOptions.amountOptions.fcName].setValue(this.calculatedSukukPrice * this.securityRenewalVO[this.sukukLiquidationOptions.fcName]);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.valueOfLiquidationOptions.currenciesOptions.fcName], 1);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.valueOfLiquidationOptions.amountOptions.fcName], 1);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.remainingOptions.fcName], 1);
          if (!PsCommonBusinessSettings.isAgent) {
            this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.availableBalOptions.fcName], 1);
          }
        } else { this.commonProv.logger.warn(result, 'empty response'); }
      }).catch((error) => { });
    } catch (error) { }
  }
  public onsukukRenewalAmountChange(options) {
    this.loggerP.log('onsukukRenewalAmountChange', options.newValue);
    this.securityRenewalVO[this.sukukRenewalOptions.fcName]  = options.newValue;
    const remaining = this.security.totalNumberOfSukuk - (Number(this.securityRenewalVO[this.sukukLiquidationOptions.fcName] ) + Number(options.newValue));
    this.remainingOptions.group.controls[this.remainingOptions.fcName].setValue(Math.sign(remaining) === -1 ? '0' : remaining);
    if (this.security.totalNumberOfSukuk < (Number(this.securityRenewalVO[this.sukukRenewalOptions.fcName]) + Number(this.securityRenewalVO[this.sukukLiquidationOptions.fcName]))) {
      CommonUtils.presentInfoAlert(this.commonProv.translate('sum_of_sukuk_liquidation_and_sukuk_renewal_should_be_less_than_sukuk_balance_key'));
      this.formGroup.controls[this.sukukRenewalOptions.fcName].setValue('');
    }
  }

  public onsukukLiquidationAmountChange(options) {
    this.loggerP.log('onsukukLiquidationAmountChange', options.newValue);
    this.securityRenewalVO[this.sukukLiquidationOptions.fcName]  = options.newValue;
    this.securityRenewalVO[this.sukukRenewalOptions.fcName] = Number(this.availableBalOptions.group.controls[this.availableBalOptions.fcName].value) - options.newValue;
    this.formGroup.controls[this.sukukRenewalOptions.fcName].setValue( Number(this.availableBalOptions.group.controls[this.availableBalOptions.fcName].value) - options.newValue);
    const remaining = this.security.totalNumberOfSukuk - Number(this.availableBalOptions.group.controls[this.availableBalOptions.fcName].value);
    this.remainingOptions.group.controls[this.remainingOptions.fcName].setValue(remaining);
    this.valueOfLiquidationOptions.amountOptions.group.controls[this.valueOfLiquidationOptions.amountOptions.fcName].setValue(this.calculatedSukukPrice * this.securityRenewalVO[this.sukukLiquidationOptions.fcName]);
    if (this.security.totalNumberOfSukuk < (Number(this.securityRenewalVO[this.sukukRenewalOptions.fcName]) + Number(this.securityRenewalVO[this.sukukLiquidationOptions.fcName]))) {
      CommonUtils.presentInfoAlert(this.commonProv.translate('sum_of_sukuk_liquidation_and_sukuk_renewal_should_be_less_than_sukuk_balance_key'));
    }
  }

  public onavailableAmountChange(options) {
    this.loggerP.log('onavailableAmountChange', options.newValue);
    if ((Number(options.newValue) > Number(this.security.totalNumberOfSukuk))) {
      CommonUtils.presentInfoAlert(this.commonProv.translate('available_balance_should_be_less_than_sukuk_balance_key'));
      this.availableBalOptions.group.controls[this.availableBalOptions.fcName].setValue('');
    } else {
      if (Number(options.newValue) > (Number(this.securityRenewalVO[this.sukukRenewalOptions.fcName]) + Number(this.securityRenewalVO[this.sukukLiquidationOptions.fcName]))) {
        CommonUtils.presentInfoAlert(this.commonProv.translate('available_balance_should_not_exceed_sum_of_sukuk_liquidation_and_sukuk_renewal_key'));
        this.availableBalOptions.group.controls[this.availableBalOptions.fcName].setValue('');
      } else {
        this.availableBalOptions.group.controls[this.availableBalOptions.fcName].setValue(options.newValue);
        if (this.securityRenewalVO[this.sukukLiquidationOptions.fcName]) {
          this.formGroup.controls[this.sukukRenewalOptions.fcName].setValue(options.newValue - this.securityRenewalVO[this.sukukLiquidationOptions.fcName]);
        } else {
          this.formGroup.controls[this.sukukRenewalOptions.fcName].setValue(options.newValue);
        }
      }
    }
  }

  ionViewWillLeave() {
    PsCommonSettings.showInitialCardValues = 3;
  }

}
