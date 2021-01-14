import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PsAccountsListComponent } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component';
import { IOptionsPsComplexAccountTypesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-account-types/ps-complex-account-types.component.interface';
import { IOptionsPsComplexAmountExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-amount/ps-complex-amount.component.interfaces';
import { IOptionsPsComplexSelectBranchComponentExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-select-branch/ps-complex-select-branch.component.interface';
import { IOptionsPsComplexTermsAndConditionsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-terms-and-conditions/ps-complex-terms-and-conditions.component.interfaces';
import { IOptionsPsInputNumericExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-numeric/ps-input-numeric.component.interfaces';
import { IOptionsPsInputVarcharExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsLabelCifBranchExposed } from 'src/app/commonBussinessSRC/psComponents/ps-label/ps-label-cif-branch/ps-label-cif-branch.component.interface';
import { IOptionsPsMapAtmBranchesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.interfaces';
import { IOptionsPsDropdownAccountTypesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-account-types/ps-dropdown-account-types.component.interface';
import { IOptionsPsDropdownCurrenciesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-currencies/ps-dropdown-currencies.component.interfaces';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IMapKeyValue, IOcBranchesRequest, IOptionsAccountOpening } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { EventEmitterService } from 'src/app/commonSRC/psServices/event-emitter/event-emitter.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IchangeValues, IOptionsPsActionImage, IOptionsPsContainerItem, IOptionsPsContainerPanel, IOptionsPsInputAmount, IOptionsPsKeyinInputExposed, IOptionsPsLabel, IOptionsPsLabelInput, IOptionsTemplateStepper, IProfitRateRequest } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { OmniBasePage } from '../omni-base/omni-base.page';
import { IOptionsPsLookupOwnAccountsExposed } from './../../commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.interfaces';



@Component({
  selector: 'account-opening-fixed-maturity-account',
  templateUrl: './account-opening-fixed-maturity-account.page.html',
  styleUrls: ['./account-opening-fixed-maturity-account.page.scss'],
})
export class AccountOpeningFixedMaturityAccountPage extends OmniBasePage implements OnInit, AfterViewInit {
  formGroup: FormGroup = new FormGroup({});
  defaultVO: any = {};
  public showstepper = false;
  stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'fixed_mat_stepper',
    isHorizontalStepper: true,
    numberOfSteps: 2,
    namesofSteps: ['acc_open_fixed_step1', 'acc_open_fixed_step2'],
    group: this.formGroup,
    submitOptions: {
      extraParams: {},
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.accountOpeningEndPoint,
      group: this.formGroup
    },
    requestObject: this.defaultVO
  };
  public mainOptions: IOptionsAccountOpening = {
    toggleOptions: {
      labelKey: 'renew_key',
      placeHolder: 'renew_key',
      group: this.formGroup,
      fcName: 'renew',
      psClass: 'toggleColor'
    },
    toggleProfitOptions: {
      labelKey: 'post_profit_to_same_account_key',
      placeHolder: 'post_profit_to_same_account_key',
      group: this.formGroup,
      fcName: 'renewWithSame',
      psClass: 'toggleColor',
    }
  };
  lblOptions: IOptionsPsLabelInput = {
    labelKey: 'branch_key'
  };
  lblPeriodicityOptions: IOptionsPsLabelInput = {
    labelKey: 'Term: 5 Years'
  };
  cifBranchOtpions: IOptionsPsLabelCifBranchExposed = {};
  accountTypeOptions: IOptionsPsDropdownAccountTypesExposed = {
    allowedAccountType: ConstantCommon.AllowedFixedMaturityAccountsTypes,
    accountCategory: ConstantCommon.ACC_TYPE_T,
    group: this.formGroup,
    fcName: 'accountTypes'
  };
  amountOptions: IOptionsPsInputNumericExposed = {
    labelKey: 'amount_key',
    placeHolder: '0',
    group: this.formGroup,
    fcName: 'amount'
  };
  accountNameOptions: IOptionsPsInputVarcharExposed = {
    labelKey: 'name_key',
    placeHolder: 'name_key',
    group: this.formGroup,
    fcName: 'accountName'
  };
  currencyOptions: IOptionsPsDropdownCurrenciesExposed = {
    labelKey: 'currency_key',
    placeHolder: 'currency',
    group: this.formGroup,
    fcName: 'currency'
  };
  lbMaturityDateOptions: IOptionsPsLabelInput = {
    labelKey: 'maturity_date_key',
    placeHolder: 'maturity_date_key'
  };
  lbMaturityTransferOptions: IOptionsPsLabelInput = {
    labelKey: 'maturity_transfer_key',
  };
  lblProfitOptions: IOptionsPsLabelInput = {
    labelKey: 'profit_account_key',
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
  panelOptions1Step2: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'maturity_instructions_key',
    iconName: 'document'
  };
  branchOptions: IOptionsPsKeyinInputExposed = {
    placeHolder: 'get cif branch from session',
    labelKey: 'branch_key',
    group: this.formGroup,
    fcName: 'branch'
  };
  profitRateOptions: IOptionsPsKeyinInputExposed = {
    placeHolder: 'profit_rate_key',
    labelKey: 'profit_rate_key',
    group: this.formGroup,
    fcName: 'profitRate'
  };
  containerItemOptions1: IOptionsPsContainerItem = {
    hideImageAndIconIfNotPresent: true
  };
  containerItemOptions: IOptionsPsContainerItem = {
    hideImageAndIconIfNotPresent: true
  };
  public labelValuesMap = new Map<string, IMapKeyValue>();
  public headerMap = new Map<string, string>();
  public accountListOptions: IOptionsPsLookupOwnAccountsExposed = {
    labelKey: 'from_account_key',
    placeHolder: 'select_from_account_key',
    component: PsAccountsListComponent,
    currency: 'USD',
    group: this.formGroup,
    accountAllowedCurrencies: [],
    accountAllowedTypes: [],
    glTypes: 'G',
    fcName: 'fromAccount',
    accountType: 'G',
    fromTo: 'from',
    requestObject: this.defaultVO
  };
  public maturityTransferOptions: IOptionsPsLookupOwnAccountsExposed = {
    labelKey: 'on_maturity_transfer_balance_to_key',
    placeHolder: 'select_maturity_account_key',
    component: PsAccountsListComponent,
    group: this.formGroup,
    accountAllowedCurrencies: [],
    accountAllowedTypes: [],
    glTypes: 'G',
    fcName: 'maturityAccount',
    accountType: 'G',
    fromTo: 'to',
    requestObject: this.defaultVO
  };
  profitAccOptions: IOptionsPsLookupOwnAccountsExposed = {
    labelKey: 'post_profit_to_key',
    placeHolder: 'select_post_profit_to_key',
    component: PsAccountsListComponent,
    currency: 'USD',
    group: this.formGroup,
    accountAllowedCurrencies: [],
    accountAllowedTypes: [],
    glTypes: 'G',
    fcName: 'profitAccount',
    accountType: 'G',
    fromTo: 'to',
    requestObject: this.defaultVO
  };
  mapAtmBranchesOptions: IOptionsPsMapAtmBranchesExposed = {};

  lblAmountOptions: IOptionsPsLabelInput = {
    labelKey: 'Renewal Instructions: New Balance Renewed in same Account'
  };
  termsAndConditionsOptions: IOptionsPsComplexTermsAndConditionsExposed = {
    checkBoxOptions: {
      group: this.formGroup,
      fcName: 'checkboxConfirm',
      labelKey: 'i_agree_key'
    },
    htmlViewerOptions: {
      fileName: PsCommonBusinessSettings.accountOpeningTermsAndConditionsFileName
    }
  };
  inputAmountOptions: IOptionsPsInputAmount = {
    labelKey: 'Amount',
    placeHolder: 'enter_your_amount_key',
    fcName: 'inputAmount',
    group: this.formGroup,
    type: 'amount',
    decimalPoints: 3
  };
  // start
  lbMaturityTransferToggleOptions: IOptionsPsLabel = {
    labelKey: 'renew_account_on_maturity_key',
  };
  maturityDateOptions: IOptionsPsLabelInput = {
    labelKey: this.datePipe.transform(new Date(), 'dd-MM-yyyy')
  };

  lblAccountListOptions: IOptionsPsLabelInput = {
    labelKey: 'account_list_key',
  };
  // end

  psComplexAmountOptions: IOptionsPsComplexAmountExposed = {
    currenciesOptions: {
      labelKey: 'currency_key',
      placeHolder: 'currency_key',
      group: this.formGroup,
      fcName: 'currency'
    },
    amountOptions: {
      labelKey: 'opening_balance_key',
      placeHolder: 'enter_opening_balance_key',
      fcName: 'inputAmount',
      group: this.formGroup,
      type: 'amount',
      decimalPoints: 3
    }
  };
  accountTypesOptions: IOptionsPsComplexAccountTypesExposed = {
    accountTypesOptions: {
      allowedAccountType: ConstantCommon.AllowedFixedMaturityAccountsTypes,
      accountCategory: ConstantCommon.ACC_TYPE_T,
      group: this.formGroup,
      fcName: 'accountTypes'
    },
    periodicity: {
      group: this.formGroup,
      fcName: 'periodiCity'
    },
    minimumBalance: {
      group: this.formGroup,
      fcName: 'minBalance'
    },
    group: this.formGroup,
    requestObject: this.defaultVO
  };
  instructMsgLabelOptions: IOptionsPsLabel = {
    labelKey: 'Renewal Instructions: New Balance Renewed in Same Account',
    group: this.formGroup,
    fcName: 'instrcutions'
  };
  actionImageOptions: IOptionsPsActionImage = {
    imageName: 'account_Deactivation_Remark_icon.png'
  };


  selectBranchOptions: IOptionsPsComplexSelectBranchComponentExposed = {
    fcName: 'mapAtmBranchesDropdown',
    group: this.formGroup
  };
  enableCifBranch = false;
  enableMaturityTransfer = false;
  enableProfit = false;
  enablePeriodicity = false;
  enableCss = false;
  showLabel = false;
  cifInfo: any;
  showFromAccount = false;
  balanceAmount = '';
  profitRate: string;

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService, private omniPull: OmniPullService, private datePipe: DatePipe, public eventEmitterService: EventEmitterService, public navService?: PsNavigatorService) {
    super();
    this.fetchParameter();
  }

  ngOnInit() {
    super.ngOnInit();
    this.baseFormGroup = this.formGroup;
    // this.cd.detectChanges();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.maturityTransferOptions.fcName, this.profitAccOptions.fcName], 0);
    this.cifInfo = this.commonProv.session.getValueOf(ConstantCommon.USERINFO);
    // this.stepperOptions.submitOptions.extraParams = {branch : this.cifInfo.customerInfoCO ? this.cifInfo.customerInfoCO.branchCode : 1};
    this.mapAtmBranchesOptions = {
      group: this.formGroup,
      fcName: 'mapAtmBranches',
      labelKey: 'map_atm-branch_key',
      mapOptions: {
        labelKey: 'map'
      },
      showSegments: false,
      mapTypesInclude: '\'B\'',
      branchIds: '1,3,5',
      parameterToCheck: CommonBussinessConstant.AcntOpenBranchesMatAcc
    };
    this.eventEmitterService.getSelectBranchEmitter().subscribe((val) => {
      this.formGroup.controls[this.mapAtmBranchesOptions.fcName].setValue(val);
      this.commonProv.setValInsideNestedObj(this.mapAtmBranchesOptions.fcName, val, this.defaultVO);
    });
  }

  onSelectBranch($event) {
    if ($event.itemValue !== undefined) {
      this.formGroup.controls[this.selectBranchOptions.fcName].setValue($event);
      this.commonProv.setValInsideNestedObj(this.selectBranchOptions.fcName, $event.selectedObj, this.defaultVO);
    }
  }

  onChange(values: IchangeValues) {
    if (values.newValue === false) {
      this.enableMaturityTransfer = true;
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.maturityTransferOptions.fcName], 1);
      // this.enableProfit = false;
    } else {
      this.enableMaturityTransfer = false;
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.maturityTransferOptions.fcName], 0);
      //  this.enableProfit = true;

      const profitObject = {
        labelKey: 'post_profit_to_same_account_key',
        placeHolder: 'post_profit_to_same_account_key',
        group: this.formGroup,
        fcName: 'renewWithSame',
        psClass: 'toggleColor'
      };
      // this.commonProv.copyObject(this.mainOptions.toggleProfitOptions, profitObject);
      this.defaultVO[this.maturityTransferOptions.fcName] = '';

      // this.defaultVO[this.psComplexAmountOptions.amountOptions.fcName] = '';

    }
  }
  onProfitChange(values1: IchangeValues) {
    if (values1.newValue === false) {
      this.enableProfit = true;
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.profitAccOptions.fcName], 1);
    } else {
      this.enableProfit = false;
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.profitAccOptions.fcName], 0);
      this.defaultVO[this.profitAccOptions.fcName] = '';

    }
  }
  onChangeEvent(values: IchangeValues) {
    if (values.newValue === false) {
      this.enablePeriodicity = true;
    } else {
      this.enablePeriodicity = false;
    }
  }

  onChangeFromAccount(values: IchangeValues) {
    if (values.newValue === false) {
      this.enableCss = true;
    } else {
      this.enableCss = false;
    }
  }

  ngAfterViewInit() {
    this.defaultVO[this.mainOptions.toggleOptions.fcName] = true;
    this.defaultVO[this.mainOptions.toggleProfitOptions.fcName] = true;
    // this.loadBranch();
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

  onChangeItem(values) {
    if (values.briefDesc) {
      console.log('selected item :' + values + this.formGroup.controls);

      this.defaultVO[this.profitRateOptions.fcName] = '';
      if (values && values.renewProtect) {
        this.showLabel = true;
      } else {
        this.showLabel = false;
      }
      this.loadProfitRate();
    } else {

      this.defaultVO[this.profitRateOptions.fcName] = '';
      this.profitRate = '';
    }
  }

  public onAccountChange(fromAccount) {
  }

  public onMaturityAccountChange(maturityAccount) {
  }

  public onProfitAccountChange(profitAccount) {
  }

  async fetchParameter() {
    const result = await this.omniPull.getParamValOf(CommonBussinessConstant.AcntOpenBranchesMatAcc, CommonBussinessConstant.AllowedBranches, ConstantCommon.AllowedFixedMaturityAccountsTypes, CommonBussinessConstant.AllowedCurrencies, CommonBussinessConstant.AllAllowedBranches).catch((error) => { this.showstepper = true; this.showFromAccount = true; });
    if (result !== -1 && result.AcntOpenBranchesMatAcc === ConstantCommon.cifBranch) {
      this.enableCifBranch = true;
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.stepperOptions.namesofSteps[1]], 0, true);
      this.commonProv.copyObject(this.stepperOptions.submitOptions.extraParams, { branch: this.cifInfo.customerInfoCO ? this.cifInfo.customerInfoCO.branchCode : '' }, false, true);
      this.showstepper = true;
      const aBranch = result.allowedBranches ? result.allowedBranches.toString().split(',') : result.AllAllowedBranches.split(',');
      if (result.AcntOpenBranchesMatAcc === ConstantCommon.cifBranch && aBranch.toString().indexOf(this.cifInfo.cifBranch.toString()) === -1) {
        CommonUtils.presentFatalAlert('Cannot_open_Term_Account_in_your_CIF_Branch._Please_contact_our_call_center_key');
        this.navService.pop();
      } else {
        setTimeout(() => {
          this.defaultVO[this.branchOptions.fcName] = this.cifInfo.cifBranch ? this.cifInfo.customerInfoCO.branchBriefDesc : '';
          // this.formGroup.controls[this.branchOptions.fcName].disable();
        }, 300);
      }
    } else {
      this.enableCifBranch = false;
    }
    if (result !== -1 && result.AllowedAccountType) {
      this.commonProv.copyObject(this.accountListOptions.accountAllowedTypes, result.AllowedAccountType.split(','), false, true);
    }
    if (result !== -1 && result.AllowedCurrencies) {
      this.commonProv.copyObject(this.accountListOptions.accountAllowedCurrencies, result.AllowedCurrencies.split(','), false, true);
    }
    setTimeout(() => {
      this.showFromAccount = true;
    }, 300);
  }


  public async loadProfitRate() {
    if (this.defaultVO.currency && this.defaultVO.inputAmount && this.defaultVO.accountTypes) {
      const requestParams: IProfitRateRequest = {
        currency: this.defaultVO.currency,
        amount: this.defaultVO.inputAmount,
        accountType: this.defaultVO.accountTypes
      };
      const result = await this.omniPull.returnProfitRate(requestParams).catch(error => {
        this.commonProv.logger.error('Error: while fetcing data from returnProfitRate  :', error);
      });

      if (result && result.gridModel && result.gridModel.length > 0) {
        this.profitRate = result.gridModel[0].profitRate;
        setTimeout(() => {
          this.defaultVO[this.profitRateOptions.fcName] = this.profitRate.toString();
        }, 1);
      }
      else {
        this.defaultVO[this.profitRateOptions.fcName] = '';
        this.profitRate = '';
      }

    }

  }

  public onBalancAmountChange(balanceAmount: any) {
    if (balanceAmount.amount < 0) {
      this.commonProv.setValInsideNestedObj(this.psComplexAmountOptions.amountOptions.fcName, null, this.defaultVO);
    }
    this.defaultVO[this.profitRateOptions.fcName] = '';
    this.loadProfitRate();
  }

  public onCurrencyChange(currency: any) {


    this.loadProfitRate();
  }
}
