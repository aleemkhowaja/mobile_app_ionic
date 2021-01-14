import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PsAccountsListComponent } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component';
import { IOptionsPsComplexExchnageExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-exchange/ps-complex-exchange.component.interfaces';
import { IOptionsPsComplexSelectBranchComponentExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-select-branch/ps-complex-select-branch.component.interface';
import { IOptionsPsInputVarcharExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsLookupOwnAccountsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.interfaces';
import { IOptionsPsMapAtmBranchesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.interfaces';
import { IOptionsPsDropdownAccountTypesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-account-types/ps-dropdown-account-types.component.interface';
import { IOptionsPsDropdownCurrenciesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-currencies/ps-dropdown-currencies.component.interfaces';
import { IOcBranchesRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { EventEmitterService } from 'src/app/commonSRC/psServices/event-emitter/event-emitter.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsPsContainerPanel, IOptionsPsKeyinInputExposed, IOptionsPsSelectToggle, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { CommonBussinessConstant } from '../../commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { OmniBasePage } from '../omni-base/omni-base.page';

@Component({
  selector: 'account-opening',
  templateUrl: './account-opening.page.html',
  styleUrls: ['./account-opening.page.scss'],
})
export class AccountOpeningPage extends OmniBasePage implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  defaultVO: any = {};

  cifInfo: any;
  branchVal: any;

  mapAtmBranchesOptions: IOptionsPsMapAtmBranchesExposed = {
    group: this.formGroup,
    fcName: 'mapAtmBranches',
    labelKey: 'map_atm-branch_key',
    mapOptions: {
      labelKey: 'map'
    },
    showSegments: false,
    mapTypesInclude: '\'B\'',
    branchIds: '1,3,5',
    parameterToCheck: CommonBussinessConstant.AcntOpenBranchesGenAcc
  };

  stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'acc_open_stepper',
    isHorizontalStepper: true,
    numberOfSteps: 2,
    namesofSteps: ['acc_open_step1', 'acc_open_step2'],
    group: this.formGroup,
    submitOptions: {
      extraParams: {},
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.accountOpeningEndPoint,
      group: this.formGroup
    },
    requestObject: this.defaultVO
  };


  accountTypeOptions: IOptionsPsDropdownAccountTypesExposed = {
    allowedAccountType: ConstantCommon.AllowedGeneralAccountTypes,
    accountCategory: ConstantCommon.ACC_TYPE_D,
    group: this.formGroup,
    fcName: 'accountTypes'
  };

  openingBalanceToggleOptions: IOptionsPsSelectToggle = {
    labelKey: 'add_opening_balance_key',
    placeHolder: 'add_opening_balance_key',
    group: this.formGroup,
    fcName: 'addOpeningBalance',
    psClass: 'toggleColor'
  };

  minOpeningBalOptions: IOptionsPsKeyinInputExposed = {
    placeHolder: 'minimum_opening_balance_key',
    labelKey: 'minimum_opening_balance_key',
    group: this.formGroup,
    fcName: 'minOpenBalance'
  };

  public fromAccOptions: IOptionsPsLookupOwnAccountsExposed = {
    labelKey: 'from_account_key',
    placeHolder: 'select_from_account_key',
    component: PsAccountsListComponent,
    group: this.formGroup,
    accountAllowedCurrencies: [],
    accountAllowedTypes: [],
    glTypes: 'G',
    fcName: 'fromAccount',
    accountType: 'G',
    fromTo: 'from',
    requestObject: this.defaultVO
  };

  public complexExchangeOptions: IOptionsPsComplexExchnageExposed = {
    editableMode: false,
    showToCurrencyOptions: true,
    fromAmountOptions: {
      currency: '',
      currenciesOptions: {
        placeHolder: 'currency_key',
        labelKey: 'exchange_currency_key',
        fcName: 'fromCurrency',
        group: this.formGroup
      },
      amountOptions: {
        labelKey: 'amount_key',
        placeHolder: 'enter_amount_key',
        fcName: 'transactionAmount',
        group: this.formGroup,
        decimalPoints: 2
      }
    },
    toAmountOptions: {
      currency: '',
      currenciesOptions: {
        placeHolder: 'currency_key',
        labelKey: 'currency_key',
        fcName: 'toCurrency',
        group: this.formGroup
      },
      amountOptions: {
        labelKey: 'exchange_amount_key',
        placeHolder: 'enter_amount_key',
        fcName: 'toAmount',
        group: this.formGroup,
        decimalPoints: 2
      }
    },
    requestObject: this.defaultVO,
    group: this.formGroup
  };

  accountNameOptions: IOptionsPsInputVarcharExposed = {
    labelKey: 'name_key',
    placeHolder: 'name_key',
    group: this.formGroup,
    fcName: 'accountName'
  };
  currencyOptions: IOptionsPsDropdownCurrenciesExposed = {
    labelKey: 'currency_key',
    placeHolder: 'select_currency_key',
    group: this.formGroup,
    fcName: 'currency'
  };
  panelOptions1Step1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'account_details_key',
    iconName: 'document',
    expanded: true
  };
  panelOptions2Step1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'select_branch_key',
    iconName: 'document',
    expanded: true
  };

  branchOptions: IOptionsPsKeyinInputExposed = {
    placeHolder: 'get cif branch from session',
    labelKey: 'branch_key',
    group: this.formGroup,
    fcName: 'branch_type'
  };
  branchOptions1: IOptionsPsKeyinInputExposed = {
    placeHolder: 'get cif branch from session',
    labelKey: 'branch_key',
    group: this.formGroup,
    fcName: 'branch'
  };
  selectBranchOptions: IOptionsPsComplexSelectBranchComponentExposed = {
    fcName: 'mapAtmBranchesDropdown',
    group: this.formGroup
  };
  selectedBranchObj = {};
  enableCifBranch = false;
  addOpeningBal = false;
  constructor(public commonProv: PsCommonService, public loggerP: LoggerService, public eventEmitterService: EventEmitterService, private omniPull: OmniPullService, public navService?: PsNavigatorService) {
    super();
    this.fetchParameter();
  }


  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
    this.cifInfo = this.commonProv.session.getValueOf(ConstantCommon.USERINFO);
    this.eventEmitterService.getSelectBranchEmitter().subscribe((val) => {
      this.formGroup.controls[this.mapAtmBranchesOptions.fcName].setValue(val);
      this.commonProv.setValInsideNestedObj(this.mapAtmBranchesOptions.fcName, val, this.defaultVO);
    });
  }

  ionViewDidEnter() {
    super.ionViewDidEnter();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.complexExchangeOptions.fromAmountOptions.currenciesOptions.fcName], 1);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.complexExchangeOptions.toAmountOptions.currenciesOptions.fcName], 1);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.complexExchangeOptions.toAmountOptions.amountOptions.fcName], 1);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.openingBalanceToggleOptions.fcName], 0);
  }

  onSelectBranch($event) {
    if ($event.itemValue !== undefined) {
      this.formGroup.controls[this.selectBranchOptions.fcName].setValue($event);
      this.commonProv.setValInsideNestedObj(this.selectBranchOptions.fcName, $event.selectedObj, this.defaultVO);
    }
  }

  loadBranch() {
    try {
      const paramData: IOcBranchesRequest = {
        branchesIdList: this.cifInfo.cifBranch ? this.cifInfo.cifBranch : ''
      };
      this.omniPull.returnBranchesList(paramData).then((result) => {
        if (result && result.gridModel != null && result.gridModel.length > 0) {
          this.formGroup.controls[this.branchOptions.fcName].setValue(this.cifInfo.cifBranch ? result.gridModel[0].longDesc : '');
        } else { this.loggerP.warn(result, 'empty response'); }
      }).catch((error) => { });
    } catch (error) { }
  }
  get getBranch(): number {
    return this.cifInfo.customerInfoCO ? this.cifInfo.customerInfoCO.branchCode : 1;
  }
  async fetchParameter() {
    await this.omniPull.getParamValOf(CommonBussinessConstant.AcntOpenBranchesGenAcc, CommonBussinessConstant.AllowedBranches).then((result) => {
      if (result !== -1 && result.RequestBranch === ConstantCommon.cifBranch) {
        this.commonProv.copyObject(this.stepperOptions.submitOptions.extraParams, { branch: this.cifInfo.customerInfoCO ? this.cifInfo.customerInfoCO.branchCode : "" }, false, true);
        this.enableCifBranch = true;
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.stepperOptions.namesofSteps[1]], 0, true);
        const aBranch = result.allowedBranches ? result.allowedBranches.toString().split(',') : result.AllAllowedBranches.split(',');
        if (result.RequestBranch === ConstantCommon.cifBranch && aBranch.toString().indexOf(this.cifInfo.cifBranch.toString()) === -1) {
          CommonUtils.presentFatalAlert('Cannot_open_General_Account_in_your_CIF_Branch._Please_contact_our_call_center_key');
          this.navService.pop();
        } else {
          setTimeout(() => {
            this.commonProv.setValInsideNestedObj(this.branchOptions.fcName, this.cifInfo.cifBranch ? this.cifInfo.customerInfoCO.branchBriefDesc : '', this.defaultVO);
          }, 300);
        }
      } else {
        this.enableCifBranch = false;
      }
    }).catch((error) => {
    });
  }

  onAddOpeningBalanceChange(event) {
    if (event && event !== undefined) {
      if (event.newValue === true) {
        this.addOpeningBal = true;
      } else {
        this.addOpeningBal = false;
      }
    }
  }

  public onFromAccountChange(fromAccount) {
    this.complexExchangeOptions.fromAmountOptions.currency = fromAccount.currencyBriefNameEnglish;
    this.complexExchangeOptions.fromAmountOptions.currencyCode = fromAccount.currency;
    setTimeout(() => {
      this.stepperOptions.requestObject[this.complexExchangeOptions.fromAmountOptions.currenciesOptions.fcName] = fromAccount.currency;
    }, 1);
  }

  onCurrencyChanged(currency) {
    this.complexExchangeOptions.toAmountOptions.currency = currency.selectedObj.briefDescription;
    this.complexExchangeOptions.toAmountOptions.currencyCode = currency.itemValue;
    this.stepperOptions.requestObject[this.complexExchangeOptions.toAmountOptions.currenciesOptions.fcName] = currency.itemValue;
  }

  onAccountTypeChanged(event) {
    if (event && event.minOpenBal) {
      this.commonProv.setValInsideNestedObj(this.minOpeningBalOptions.fcName, event.minOpenBal, this.defaultVO);
    }
  }

}
