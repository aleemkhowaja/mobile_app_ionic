import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PsAccountsListComponent } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component';
import { IOptionsPsAccountsListExposed } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component.interfaces';
import { IOptionsPsComplexAccountTypesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-account-types/ps-complex-account-types.component.interface';
import { IOptionsPsComplexAmountExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-amount/ps-complex-amount.component.interfaces';
import { IOptionsPsLookupOwnAccountsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.interfaces';
import { IOptionsPsMapAtmBranchesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.interfaces';
import { IMapKeyValue, IOptionsAccountOpening } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { EventEmitterService } from 'src/app/commonSRC/psServices/event-emitter/event-emitter.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsTemplateStepper } from '../../commonSRC/psServices/models/ps-common-interface';
import { OmniBasePage } from '../omni-base/omni-base.page';
import { PsCurrencyPipe } from './../../commonSRC/psPipes/ps-currency/ps-currency.pipe';
import { IchangeValues, IOptionsPsContainerPanel } from './../../commonSRC/psServices/models/ps-common-interface';


@Component({
  selector: 'app-change-maturity-instructions',
  templateUrl: './change-maturity-instructions.page.html',
  styleUrls: ['./change-maturity-instructions.page.scss'],
})
export class ChangeMaturityInstructionsPage extends OmniBasePage implements OnInit, AfterViewInit {
  formGroup: FormGroup = new FormGroup({});
  changeMaturityInstructionsVO = {};
  stepperOptions: IOptionsTemplateStepper = {
    isHorizontalStepper: true,
    numberOfSteps: 1,
    namesofSteps: ['change_maturity_step1'],
    group: this.formGroup,
    requestObject: this.changeMaturityInstructionsVO,
    submitOptions: {
      extraParams: {},
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.updateMaturityInstructions,
      group: this.formGroup,
      postCallFunction: {
        func(response) {
          return new Promise<any>((resolve, reject) => {
            resolve(this.executionClass.serviceRes(response));
          });
        },
        params: [this],
        executionClass: this
      },
    }
  };
  panelOptionsStep1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'maturity_instructions_key',
    iconName: 'document',
    expanded: true
  };
  panelOptionsStep2: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'account_details_key',
    iconName: 'document',
    expanded: true
  };
  termsAccountListOptions: IOptionsPsAccountsListExposed = {
    fcName: 'account',
    isEditable: false
  };
  private psCurrency = new PsCurrencyPipe();
  private accountAsIBAN: any;
  public generalLabelValuesMap = new Map<string, IMapKeyValue>();
  public generalHeaderMap = new Map<string, IMapKeyValue>();
  public termsLabelValuesMap = new Map<string, IMapKeyValue>();
  public termsHeaderMap = new Map<string, IMapKeyValue>();
  // accountListOptions: any[] = [];
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
    requestObject: this.changeMaturityInstructionsVO
  };

  enableCifBranch = false;
  enablePeriodicity = false;



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
    requestObject: this.changeMaturityInstructionsVO
  };

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

  public mainOptions: IOptionsAccountOpening = {
    toggleOptions: {
      labelKey: 'renew_key',
      placeHolder: 'renew_key',
      group: this.formGroup,
      fcName: 'renew',
      psClass: 'toggleColor'
    },
    toggleProfitOptions: {
      labelKey: 'Post_Profit_to_Same_Account_key',
      placeHolder: 'Post_Profit_to_Same_Account_key',
      group: this.formGroup,
      fcName: 'renewWithSame'
    }
  };

  enableMaturityTransfer = false;
  enableProfit = false;
  public renewAccount = true;
  public postProfitAccount = true;

  profitRate: string;

  public maturityTransferOptions: IOptionsPsLookupOwnAccountsExposed = {
    labelKey: 'on_maturity_transfer_balance_to_key',
    placeHolder: 'select_on_maturity_transfer_balance_to_key',
    component: PsAccountsListComponent,
    group: this.formGroup,
    accountAllowedCurrencies: [],
    accountAllowedTypes: [],
    glTypes: 'G',
    fcName: 'maturityAccount',
    accountType: 'G',
    fromTo: 'to',
    requestObject: this.changeMaturityInstructionsVO
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
    requestObject: this.changeMaturityInstructionsVO
  };
  showLabel = false;
  cifInfo: any;
  mapAtmBranchesOptions: IOptionsPsMapAtmBranchesExposed = {};
  termAccount: any;

  constructor(public commonProv: PsCommonService, private navService: PsNavigatorService, public loggerP: LoggerService, public eventEmitterService: EventEmitterService, private datePipe: DatePipe, private omniPull?: OmniPullService) {
    super();
  }

  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
    this.cifInfo = this.commonProv.session.getValueOf(ConstantCommon.USERINFO);
    this.termAccount = this.navService.getAllParams() ? this.navService.getAllParams() : {};
    if (this.termAccount) {
      this.termsAccountListOptions.listOfOptions = [];
      this.termsAccountListOptions.itemList = [];
      this.termsAccountListOptions.listOfOptions[0] = this.termAccount;
      this.termsAccountListOptions.itemList[0] = this.termAccount;
      this.termsAccountListOptions.isEditable = true;
      this.termsAccountListOptions.isFMA = false;
      this.changeMaturityInstructionsVO[this.termsAccountListOptions.fcName] = this.termAccount;
      this.commonProv.setFormData(this.formGroup, this.changeMaturityInstructionsVO);
      this.commonProv.copyObject(this.stepperOptions.submitOptions.extraParams, { branch: this.cifInfo.customerInfoCO ? this.cifInfo.customerInfoCO.branchCode : '' }, false, true);
      this.changeMaturityInstructionsVO[this.accountListOptions.fcName] = this.termAccount.accountNumber;
      this.changeMaturityInstructionsVO[this.accountListOptions.fcName + '_lookupKey'] = this.termAccount.accountNumber;

      if (this.termAccount.accountNumber) {
        this.loadAccountInformation();
      }
    }
  }


  ngAfterViewInit() {
    setTimeout(() => {
      this.changeMaturityInstructionsVO[this.accountTypesOptions.accountTypesOptions.fcName] = this.termAccount.accGl;
      this.changeMaturityInstructionsVO[this.psComplexAmountOptions.currenciesOptions.fcName] = this.termAccount.currency;
    }, 300);

  }

  serviceRes(res) {
    this.commonProv.logger.log(res);
  }

  onChange(values: IchangeValues) {
    if (values.newValue === true) {
      this.enableMaturityTransfer = false;
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.maturityTransferOptions.fcName], 0);
      this.mainOptions.toggleProfitOptions = {
        labelKey: 'Post_Profit_to_Same_Account_key',
        placeHolder: 'Post_Profit_to_Same_Account_key',
        group: this.formGroup,
        fcName: 'renewWithSame'
      };
      this.changeMaturityInstructionsVO[this.maturityTransferOptions.fcName] = '';
    } else {
      this.enableMaturityTransfer = true;
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.maturityTransferOptions.fcName], 1);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.profitAccOptions.fcName], 0);
    }
  }

  onProfitChange(values: IchangeValues) {
    if (values.newValue === false) {
      this.enableProfit = true;
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.profitAccOptions.fcName], 1);
    } else {
      this.enableProfit = false;
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.profitAccOptions.fcName], 0);
      this.changeMaturityInstructionsVO[this.profitAccOptions.fcName] = '';
    }
  }


  onMaturityAccountChange(maturityAccount: any) {
    if (maturityAccount) {
      this.changeMaturityInstructionsVO[this.maturityTransferOptions.fcName] = maturityAccount;
    }
  }

  onProfitAccountChange(profitAccount: any) {
    if (profitAccount) {
      this.changeMaturityInstructionsVO[this.profitAccOptions.fcName] = profitAccount;
    }
  }

  /**
   * 
   * @param requestParams
   */
  private async loadAccountInformation() {
    const requestParams = {
      accountNumber: this.termAccount.accountNumber,
      accountType: 'F'
    }
    const result = await this.omniPull.returnMaturityAccountInformation(requestParams).catch(error => {
      this.commonProv.logger.error('Error: While fetching returnMaturityAccountInformation in change maturity page:', error);
    });

    if (result) {
      if (result.renew !== undefined && result.renew !== null) {
        result.renew === 'yes' ? this.renewAccount = true : this.renewAccount = false;
      }
      if (result.renewWithSame !== undefined && result.renewWithSame !== null) {
        result.renewWithSame === 'yes' ? this.postProfitAccount = true : this.postProfitAccount = false;
      }


      this.changeMaturityInstructionsVO[this.mainOptions.toggleOptions.fcName] = this.renewAccount;
      this.changeMaturityInstructionsVO[this.mainOptions.toggleProfitOptions.fcName] = this.postProfitAccount;
      if (this.renewAccount === false) {
        this.changeMaturityInstructionsVO[this.maturityTransferOptions.fcName] = result.transferAccount.accountNumber;
        this.changeMaturityInstructionsVO[this.maturityTransferOptions.fcName + '_lookupKey'] = result.transferAccount.accountNumber;
      }
      if (this.postProfitAccount === false) {
        this.changeMaturityInstructionsVO[this.profitAccOptions.fcName] = result.profitAccount.accountNumber;
        this.changeMaturityInstructionsVO[this.profitAccOptions.fcName + '_lookupKey'] = result.profitAccount.accountNumber;
      }
    }
  }

}
