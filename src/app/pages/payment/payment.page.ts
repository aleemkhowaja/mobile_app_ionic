import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { PsAccountsListComponent } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component';
import { IOptionsPsBanksExposed } from 'src/app/commonBussinessSRC/psComponents/ps-banks/ps-banks.component.interfaces';
import { PsLocalBeneficiaryComponent } from 'src/app/commonBussinessSRC/psComponents/ps-beneficiary/ps-local-beneficiary/ps-local-beneficiary.component';
import { PsComplexExchangeComponent } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-exchange/ps-complex-exchange.component';
import { IOptionsPsComplexExchnageExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-exchange/ps-complex-exchange.component.interfaces';
import { IOptionsPSComplexRecurringSchedulerExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-recurring-scheduler/ps-complex-recurring-scheduler.component.interfaces';
import { IOptionsPsComplexSwiftTransferExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-swift-transfer/ps-complex-swift-transfer.component.interfaces';
import { IOptionsPsDateDayMonthYearFutureExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-day-month-year/ps-date-day-month-year-future/ps-date-day-month-year-future.component.interfaces';
import { IOptionsPsInputAccountNumberExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-account-number/ps-input-account-number.component.interface';
import { IOptionsPsInputVarcharExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsLookupBenificiariesInternalExposed } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-beneficiaries-internal/ps-lookup-beneficiaries-internal.component.interfaces';
import { IOptionsPsLookupBenificiariesLocalExposed } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-beneficiaries-local/ps-lookup-beneficiaries-local.component.interfaces';
import { IOptionsPsDropdownCurrenciesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-currencies/ps-dropdown-currencies.component.interfaces';
import { PsSwiftAccountListComponent } from 'src/app/commonBussinessSRC/psComponents/ps-swift-account-list/ps-swift-account-list.component';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsContainerItem, IOptionsPsContainerPanel, IOptionsPsInputAmount, IOptionsPsSelectDropdown, IOptionsPsSelectSegment, IOptionsPsSelectToggle, IOptionsTemplateStepper, IPageCommon, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsInternalBeneficiaryComponent } from '../../commonBussinessSRC/psComponents/ps-beneficiary/ps-internal-beneficiary/ps-internal-beneficiary.component';
import { PsInternationalBeneficiaryComponent } from '../../commonBussinessSRC/psComponents/ps-beneficiary/ps-international-beneficiary/ps-international-beneficiary.component';
import { IOptionsPsLookupBenificiariesInternationalExposed } from '../../commonBussinessSRC/psComponents/ps-lookup/ps-lookup-beneficiaries-international/ps-lookup-beneficiaries-international.component.interfaces';
import { IOptionsPsLookupOwnAccountsExposed } from '../../commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.interfaces';
import { OmniBasePage } from '../omni-base/omni-base.page';
import { IOptionsPsPurposeExposed } from './../../commonBussinessSRC/psComponents/ps-purpose/ps-purpose.component.interfaces';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage extends OmniBasePage implements OnInit, AfterViewInit {

  /** local variables START */
  public formGroup: FormGroup = new FormGroup({});
  public exchangeRate = '0.00';
  public amountInToAccountAmount = '0.00';
  public ownAccountVO = {};
  hideDates = true;
  showPurpposeSubPurpose = false;
  @ViewChild(PsComplexExchangeComponent) exchangeChild: PsComplexExchangeComponent;
  @ViewChild('toAccountRef') toAccountRef;
  @ViewChild('fromAccountRef') fromAccountRef;

  public stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'payment_stepper',
    isHorizontalStepper: true,
    numberOfSteps: 1,
    namesofSteps: ['payment_step1', 'payment_step2'],
    group: this.formGroup,
    submitOptions: {
      group: this.formGroup,
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.fundstransferEndPoint,
      postCallFunction: {
        func(response) {
          return new Promise<any>((resolve, reject) => {
            resolve(this.executionClass.navigateToBeneficiary(response));
          });
        },
        executionClass: this,
        params: [this]
      },
      failureCallFunction: {
        func(response) {
          return new Promise<any>((resolve, reject) => {
            resolve(this.executionClass.navigateToBeneficiary(response));
          });
        },
        executionClass: this,
        params: [this]
      },
      preCallFunction: {
        func(response) {
          return new Promise<any>((resolve, reject) => {
            resolve(this.executionClass.updateAccountVO(response));
          });
        },
        executionClass: this,
        params: [this]
      },
    },
    requestObject: this.ownAccountVO
  };

  public panelOptions1Step1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'own_account_transfer_key',
    iconName: 'document',
    expanded: true
  };

  public panelOptions1Step2: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'payment_details_key',
    iconName: 'crop',
    expanded: true
  };

  public fromAccountList: IOptionsPsLookupOwnAccountsExposed = {
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
    requestObject: this.ownAccountVO
  };

  public toaccountList: IOptionsPsLookupOwnAccountsExposed = {
    labelKey: 'to_account_key',
    placeHolder: 'select_to_account_key',
    component: PsAccountsListComponent,
    group: this.formGroup,
    accountAllowedCurrencies: [],
    accountAllowedTypes: [],
    glTypes: 'G',
    fcName: 'toAccount',
    accountType: 'G',
    fromTo: 'to',
    requestObject: this.ownAccountVO
  };

  public currenciesOptions: IOptionsPsDropdownCurrenciesExposed = {
    labelKey: 'currency_key',
    placeHolder: 'select_currency_key',
    fcName: 'currency',
    group: this.formGroup
  };

  public amountOptions: IOptionsPsInputAmount = {
    labelKey: 'amount_key',
    placeHolder: 'enter_amount_key',
    fcName: 'amountInFromAccount',
    group: this.formGroup
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
        fcName: 'currency',
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
    requestObject: this.ownAccountVO,
    group: this.formGroup
  };
  
  public schedulerOptions: IOptionsPSComplexRecurringSchedulerExposed = {
    fcName: 'psScheduler',
    group: this.formGroup,
    inputCountOptions: {
      fcName: 'noOfPayments'
    },
    inputDefaultOptions: {
      fcName: 'noOfPayment'
    }
  };

  public localBeneficiariesOptions: IOptionsPsLookupBenificiariesLocalExposed = {
    labelKey: 'to_beneficiary_key',
    placeHolder: 'select_to_beneficiary_key',
    component: PsLocalBeneficiaryComponent,
    group: this.formGroup,
    fcName: 'toBeneficiary',
    requestObject: this.ownAccountVO
  };

  public internalBeneficiariesOptions: IOptionsPsLookupBenificiariesInternalExposed = {
    labelKey: 'to_beneficiary_key',
    placeHolder: 'select_to_beneficiary_key',
    component: PsInternalBeneficiaryComponent,
    group: this.formGroup,
    fcName: 'toAccount',
    requestObject: this.ownAccountVO,
  };

  public internationalBeneficiariesOptions: IOptionsPsLookupBenificiariesInternationalExposed = {
    labelKey: '',
    placeHolder: 'select_to_beneficiary_key',
    component: PsInternationalBeneficiaryComponent,
    group: this.formGroup,
    fcName: 'toBeneficiary',
    requestObject: this.ownAccountVO
  };

  public toSwiftList: IOptionsPsComplexSwiftTransferExposed = {
    labelKey: 'to_swift_key',
    placeHolder: 'select_to_swift_key',
    component: PsSwiftAccountListComponent,
    currency: 'USD',
    group: this.formGroup,
    fcName: 'toSwift',
  };

  public purposeOptionsDDLB: IOptionsPsPurposeExposed = {
    categoryLabelKey: 'purpose_key',
    categoryPlaceholderKey: 'select_purpose_key',
    categoryFcName: 'purpose',
    subCategoryLabelKey: 'sub_purpose_key',
    subCategoryPlaceholderKey: 'select_sub_purpose_key',
    subCategoryFcName: 'subPurpose',
    group: this.formGroup,
    requestObject: this.ownAccountVO
  };
  purposeOptions: IOptionsPsInputVarcharExposed = {
    labelKey: 'purpose_key',
    placeHolder: 'add_transfer_purpose_key',
    group: this.formGroup,
    fcName: 'purposeTxtDesc'
  };

  public toAccountComponent: any = {};

  startDateOptions: IOptionsPsDateDayMonthYearFutureExposed = {
    fcName: 'startDate',
    group: this.formGroup,
    labelKey: 'start_date_key',
    placeHolder: 'start_date_key'
  };

  endDateOptions: IOptionsPsDateDayMonthYearFutureExposed = {
    fcName: 'endDate',
    group: this.formGroup,
    labelKey: 'end_date_key',
    placeHolder: 'end_date_key'
  };

  saveBenefToggleOptions: IOptionsPsSelectToggle = {
    labelKey: 'save_beneficiary_key',
    placeHolder: 'save_beneficiar_key',
    group: this.formGroup,
    fcName: 'saveBenef',
    psClass: 'toggleColor'
  };

  toOtherAccountNumberOptions: IOptionsPsInputAccountNumberExposed = {
    fcName: 'accountNumber',
    labelKey: 'iban_account_no_key',
    placeHolder: 'enter_account_no_iban_key',
    group: this.formGroup
  };

  segmentOptions: IOptionsPsSelectSegment = {
    segmentList: []
  };

  banksOptions: IOptionsPsBanksExposed = {
    categoryLabelKey: 'bank_key',
    categoryPlaceholderKey: 'select_bank_key',
    categoryFcName: 'bank',
    subCategoryLabelKey: 'branch_key',
    subCategoryPlaceholderKey: 'select_branch_key',
    subCategoryFcName: 'branch',
    group: this.formGroup,
    requestObject: this.ownAccountVO
  };

  swiftCodeOptions: IOptionsPsInputVarcharExposed = {
    fcName: 'swiftCode',
    labelKey: 'bic_swift_code_key',
    placeHolder: 'enter_swift_code_key',
    group: this.formGroup
  };

  benefCurrencyOptions: IOptionsPsSelectDropdown = {
    fcName: 'benefCurrency',
    group: this.formGroup,
    labelKey: 'beneficiary_currency_key',
    placeHolder: 'select_currency_key'
  };

  enableLocalBenef: boolean;
  enableOwnAccTrans: boolean;
  enableInternalBenef: boolean;
  enableInternationBenef: boolean;

  // local Transfer params
  LocalTransfersBeneficiary = false;
  LocalTransfersNonBeneficiary = false;
  EnableLocalBeneficiaryApproval = false;

  // international Transfers params
  internationTransfersBeneficiary = false;
  internationTransfersNonBeneficiary = false;
  enableInternationBeneficiaryApproval = false;

  // transfer Between Bank Accounts params
  transferBetweenBankAccountsBeneficiary = false;
  transferBetweenBankAccountsNonBeneficiary = false;

  // scheduled Local Transfer params
  scheduledLocalTransferBeneficiary = false;
  scheduledLocalTransferNonBeneficiary = false;

  // scheduled International Transfer params
  scheduledInternationalTransferBeneficiary = false;
  scheduledInternationalTransferNonBeneficiary = false;

  showBeneficiaryDropdown = false;
  showAccountNumber = false;
  showBeneficiaryDetails = true;
  showToOtherDetails = false;

  containerItemOptions: IOptionsPsContainerItem = {
    // hideImageAndIconIfNotPresent: true
  };
  showSegment: boolean = false;
  accountNumber: any;
  beneficiaryOptions: IOptionsPsInputAccountNumberExposed = {
    placeHolder: 'recipinet_name_key',
    fcName: 'benefName',
    labelKey: 'recipient_name_key',
    group: this.formGroup
  };
  /** local variables END */

  cifInfo: any;
  companyCurrency: string;
  defaultSegment: IPsSelect = {};

  branchOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'benefBranchTxt',
    labelKey: 'branch_key',
    placeHolder: 'enter_branch_key',
  };

  constructor(
    public commonProvider: PsCommonService,
    public logger: LoggerService,
    public nav: PsNavigatorService,
    private omniPull: OmniPullService
  ) {
    super();
    // this.fetchParameter();
  }

  ngOnInit() {
    super.init();
    try {
      if (this.nav.getAllParams().ScreenVO) {
        this.fixVOWhenRetrive(this.nav.getAllParams().ScreenVO);
      } else {
        this.toAccountComponent = this.nav.getAllParams();
        this.defaultSegment = { itemValue: this.commonProv.translate('to_beneficiary_key'), description: this.commonProv.translate('to_beneficiary_key') };
        this.initAccountVO();
      }
      if (this.toAccountComponent && this.toAccountComponent.toAccountType) {
        if (this.toAccountComponent.toAccountType === 'companyAccountTransfer' || this.toAccountComponent.toAccountType === 'companyAccountStandingOrder') {
        } else if (this.toAccountComponent.toAccountType === 'bankLocalTransfer' || this.toAccountComponent.toAccountType === 'bankLocalStandingOrder') {
        } else if (this.toAccountComponent.toAccountType === 'internationalAccountTransfer' || this.toAccountComponent.toAccountType === 'internationalAccountStandingOrder') {
        }
      }
    } catch (error) {
      this.logger.error('Payment Screen Error ! ', error);
    }

    if (this.toAccountComponent && this.toAccountComponent.scheduler) {
      this.stepperOptions.numberOfSteps = 2;
      this.schedulerOptions.requestObject = this.ownAccountVO;
    }
    if (this.toAccountComponent && this.toAccountComponent.scheduler && this.nav.getAllParams().ScreenVO === undefined) {
      this.ownAccountVO['periodicity'] = {
        itemValue: 'M',
        description: 'Recurring Monthly',
        iconUrl: '',
        selectedObj: {
          language: 'EN',
          description: 'Recurring Monthly',
          totalNbRec: 0,
          itemValue: 'M',
        }
      };
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        const todayDate = new Date()['clearTime']();
        this.formGroup.controls[this.startDateOptions.fcName].setValue(todayDate);
        this.ownAccountVO[this.schedulerOptions.fcName] = {
          startingDate: todayDate,
          endingDate: 'unlimited',
          unlimitedNumberOfPayments: true
        };
        this.ownAccountVO[this.startDateOptions.fcName] = todayDate;
        this.formGroup.controls[this.endDateOptions.fcName].setValue(null);
      }, 100);
    }

    if (this.enableLocalBeneficiary()) {
      // local Beneficiary Params
      this.LocalTransfersBeneficiary = true;
      this.LocalTransfersNonBeneficiary = true;
      this.EnableLocalBeneficiaryApproval = false;
      this.scheduledLocalTransferBeneficiary = true;
      this.scheduledLocalTransferNonBeneficiary = true;
      this.enableLocalTransfer();
    }

    if (this.enableInternationalBeneficiary()) {
      // local Beneficiary Params
      this.internationTransfersBeneficiary = true;
      this.internationTransfersNonBeneficiary = true;
      this.enableInternationBeneficiaryApproval = false;
      this.scheduledInternationalTransferBeneficiary = true;
      this.scheduledInternationalTransferNonBeneficiary = true;
      this.enableInternationalTransfer();
    }

    if (this.enableInternalBeneficiary()) {
      this.transferBetweenBankAccountsBeneficiary = true;
      this.transferBetweenBankAccountsNonBeneficiary = true;
      this.enableInternalTransfer();
    }

    this.segmentOptions = {
      segmentList: [{
        selected: true,
        itemValue: this.commonProv.translate('to_beneficiary_key'),
        description: this.commonProv.translate('to_beneficiary_key')
      }, {
        selected: true,
        itemValue: this.commonProv.translate('to_other_key'),
        description: this.commonProv.translate('to_other_key')
      }],
      defaultSegment: this.defaultSegment
    };
    this.baseFormGroup = this.formGroup;
  }

  ionViewDidEnter() {
    super.ionViewDidEnter();
    if (this.toAccountComponent && this.toAccountComponent.scheduler) {
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.endDateOptions.fcName], 0);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.schedulerOptions.inputCountOptions.fcName], 0);
    }
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.saveBenefToggleOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.banksOptions.subCategoryFcName], 0);
  }

  private fixVOWhenRetrive(screenVO: any) {
    this.toAccountComponent = {
      toAccountType: screenVO.toAccountType,
      scheduler: screenVO.scheduler === 'true' || screenVO.scheduler === true
    };
    if (screenVO.showBeneficiaryDetails !== undefined && screenVO.showToOtherDetails !== undefined) {
      this.showBeneficiaryDetails = screenVO.showBeneficiaryDetails === 'true' || screenVO.showBeneficiaryDetails === true;
      this.showToOtherDetails = screenVO.showToOtherDetails === 'true' || screenVO.showToOtherDetails === true;
    }
    this.commonProv.copyObject(this.ownAccountVO, screenVO);
    this.checkSegment();

  }

  checkSegment() {
    if (this.showBeneficiaryDetails === true) {
      this.defaultSegment = { itemValue: this.commonProv.translate('to_beneficiary_key'), description: this.commonProv.translate('to_beneficiary_key') };
    } else {
      this.defaultSegment = { itemValue: this.commonProv.translate('to_other_key'), description: this.commonProv.translate('to_other_key') };
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, ['toBeneficiary'], 0);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, ['toBeneficiary_lookupKey'], 0);
      if (this.formGroup.controls['toAccount']) {
        if (this.formGroup.controls['toAccount'].value == '' && this.ownAccountVO['toAccount'] !== undefined && this.ownAccountVO['toAccount'] !== null) {
          this.formGroup.controls['toAccount'].setValue(this.ownAccountVO['toAccount']);
          this.formGroup.controls['toAccount_lookupKey'].setValue(this.ownAccountVO['toAccount']);
        }
      }
    }
    this.segmentOptions.defaultSegment = this.defaultSegment;
  }

  ngAfterViewInit() {
    const screenVO = this.nav.getAllParams().ScreenVO;
    if (screenVO) {
      this.commonProv.setValInsideNestedObj(this.currenciesOptions.fcName, screenVO.currency, this.ownAccountVO);

      if (screenVO.accountNumber) {
        this.ownAccountVO['toBeneficiary'] = null;
        this.ownAccountVO['toAccount'] = null;
        this.onAccountNumbChanged(screenVO.accountNumber);
      }

      this.ownAccountVO['saveBenef'] = screenVO.saveBenef === 'true' || screenVO.saveBenef === true;
    }
    if (this.toAccountComponent && this.toAccountComponent.scheduler) {
      this.stepperOptions.schedulerStepIndex = 1;
    }
  }

  /**
   * 
   * @param fromAccount
   */
  public onFromAccountChange(fromAccount) {
    this.complexExchangeOptions.fromAmountOptions.currency = fromAccount.currencyBriefNameEnglish;
    this.complexExchangeOptions.fromAmountOptions.currencyCode = fromAccount.currency;
    setTimeout(() => {
      this.stepperOptions.requestObject[this.complexExchangeOptions.fromAmountOptions.currenciesOptions.fcName] = fromAccount.currency;
    }, 1);

    if (this.ownAccountVO[this.toaccountList.fcName] === null || this.ownAccountVO[this.toaccountList.fcName] === undefined || this.ownAccountVO[this.toaccountList.fcName] === '') {
      this.commonProv.copyObject(this.toaccountList, {
        accountNumber: fromAccount.accountNumber,
        fromCurrency: fromAccount.currency
      }, false);
      if (this.toAccountComponent.toAccountType === 'ownAccountTransfer' || this.toAccountComponent.toAccountType === 'ownAccountStandingOrder') {
        this.toAccountRef.loadAccounts(this.toaccountList);
      }
    } else if (fromAccount !== undefined) {
      this.commonProv.setValInsideNestedObj(this.fromAccountList.fcName, fromAccount, this.ownAccountVO);
    }
    this.purposeOnCurrencyChange();
  }

  /**
   *
   * @param toAccount
   */
  public onToAccountChange(toAccount) {
    if (this.toAccountComponent.scheduler) {
      PsCommonSettings.oper_ID = CommonBussinessConstant.OWN_ACCOUNT_STANDING_ORDER_OPER_ID;
    }
    this.complexExchangeOptions.toAmountOptions.currency = toAccount.currencyBriefNameEnglish;
    this.complexExchangeOptions.toAmountOptions.currencyCode = toAccount.currency;
    setTimeout(() => {
      this.stepperOptions.requestObject[this.complexExchangeOptions.toAmountOptions.currenciesOptions.fcName] = toAccount.currency;
    }, 1);
    if (this.ownAccountVO[this.fromAccountList.fcName] === null || this.ownAccountVO[this.fromAccountList.fcName] === undefined || this.ownAccountVO[this.fromAccountList.fcName] === '') {
      this.commonProv.copyObject(this.fromAccountList, {
        accountNumber: toAccount.accountNumber,
        toCurrency: toAccount.currency
      }, false);
      if (this.toAccountComponent.toAccountType === 'ownAccountTransfer' || this.toAccountComponent.toAccountType === 'ownAccountStandingOrder') {
        this.fromAccountRef.loadAccounts(this.fromAccountList);
      }
    } else if (toAccount !== undefined) {
      this.commonProv.setValInsideNestedObj(this.toaccountList.fcName, toAccount, this.ownAccountVO);
    }
    this.purposeOnCurrencyChange();
  }

  /**
   *
   * @param internalBeneficiary
   */
  public internalBeneficiaryChange(internalBeneficiary) {
    if (this.toAccountComponent.scheduler) {
      PsCommonSettings.oper_ID = CommonBussinessConstant.INTERNAL_BENEFICIARY_TRANSFER_STANDING_ORDER_OPER_ID;
    } else {
      PsCommonSettings.oper_ID = CommonBussinessConstant.INTERNAL_BENEFICIARY_TRANSFER;
    }
    if (internalBeneficiary !== undefined && internalBeneficiary.accountObject !== undefined) {
      this.accountNumber = internalBeneficiary.accountNumber,
        this.complexExchangeOptions.toAmountOptions.currencyCode = internalBeneficiary.accountObject.currency;
      this.stepperOptions.requestObject[this.complexExchangeOptions.toAmountOptions.currenciesOptions.fcName] = internalBeneficiary.accountObject.currency;
      this.stepperOptions.requestObject[this.internalBeneficiariesOptions.fcName] = internalBeneficiary;
    }
    this.purposeOnCurrencyChange();
  }

  /**
   *
   * @param localBeneficiary
   */
  public localBeneficiaryChange(localBeneficiary) {
    if (this.toAccountComponent.scheduler) {
      PsCommonSettings.oper_ID = CommonBussinessConstant.LOCAL_BENEFICIARY_TRANSFER_STANDING_ORDER_OPER_ID;
    } else {
      PsCommonSettings.oper_ID = CommonBussinessConstant.LOCAL_BENEFICIARY_TRANSFER;
    }
    if (localBeneficiary !== undefined) {
      this.complexExchangeOptions.toAmountOptions.currencyCode = localBeneficiary.currency;
      this.stepperOptions.requestObject[this.complexExchangeOptions.toAmountOptions.currenciesOptions.fcName] = localBeneficiary.currency;
      this.stepperOptions.requestObject[this.localBeneficiariesOptions.fcName] = localBeneficiary;
    }
    this.purposeOnCurrencyChange();
  }

  /**
   *
   * @param internationalBeneficiary
   */
  public internationalBeneficiaryChange(internationalBeneficiary) {
    if (this.toAccountComponent.scheduler) {
      PsCommonSettings.oper_ID = CommonBussinessConstant.EXTERNAL_BENEFICIARY_TRANSFER_STANDING_ORDER_OPER_ID;
    } else {
      PsCommonSettings.oper_ID = CommonBussinessConstant.INTERNATIONAL_BENEFICIARY_TRANSFER;
    }
    if (internationalBeneficiary !== undefined) {
      this.complexExchangeOptions.toAmountOptions.currencyCode = internationalBeneficiary.currency;
      this.stepperOptions.requestObject[this.complexExchangeOptions.toAmountOptions.currenciesOptions.fcName] = internationalBeneficiary.currency;
      this.stepperOptions.requestObject[this.internationalBeneficiariesOptions.fcName] = internationalBeneficiary;
    }
    this.purposeOnCurrencyChange();
  }
  onInitialPurposeChange(val) {
    // console.log('onInitialPurposeChange', val);
  }

  onAmountChange(event) {
    this.logger.log(event);
  }

  onChangeSchedule(value) {
    let stateDay;
    if (this.nav.getAllParams().ScreenVO === undefined) {
      if (value !== undefined) {
        if (value.priodicityBy === 'S' || value.priodicityBy === 'M') {
          stateDay = value.startDate.getDay() + 1;
          if (value.priodicityBy === 'S') {
            this.ownAccountVO['submitType'] = '4';
          } else {
            stateDay = value.startDate.getDate();
            this.ownAccountVO['submitType'] = '5';
          }
        }
        if (value.priodicityBy === 'W') {
          stateDay = value.startDate.getDay() + 1;
          this.ownAccountVO['submitType'] = '5';
        }
      }
      if (value.unlimitedNumberOfPayments && value.priodicityBy !== 'S') {
        this.ownAccountVO[this.schedulerOptions.fcName] = {
          startingDate: value.startDate,
          endingDate: 'unlimited',
          day: stateDay
        };
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.endDateOptions.fcName], 0);
        this.formGroup.controls[this.endDateOptions.fcName].setValue(null);
      } else {
        this.ownAccountVO[this.schedulerOptions.fcName] = {
          startingDate: value.startDate,
          endingDate: value.endDate,
          day: stateDay
        };
        this.formGroup.controls[this.endDateOptions.fcName].setValue(value.endDate);
      }
      this.formGroup.controls[this.startDateOptions.fcName].setValue(value.startDate);
    }
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.endDateOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.startDateOptions.fcName], 0);
  }
  /** to show exchange rate if from and to currencies are different */
  private showExchangeRate() {
    this.exchangeChild.showToCurrency();
  }

  // GRadwan, ARagab 29/07/2020

  enableOwnAccountTransfer() {
    this.enableOwnAccTrans = this.toAccountComponent.toAccountType === 'ownAccountTransfer'
      || this.toAccountComponent.toAccountType === 'ownAccountStandingOrder';

    return this.enableOwnAccTrans;
  }

  enableLocalBeneficiary() {
    this.enableLocalBenef = this.toAccountComponent.toAccountType === 'bankLocalTransfer' ||
      this.toAccountComponent.toAccountType === 'bankLocalStandingOrder';

    return this.enableLocalBenef;
  }

  enableInternalBeneficiary() {
    this.enableInternalBenef = this.toAccountComponent.toAccountType === 'companyAccountTransfer'
      || this.toAccountComponent.toAccountType === 'companyAccountStandingOrder'
    return this.enableInternalBenef;
  }

  enableInternationalBeneficiary() {
    this.enableInternationBenef = this.toAccountComponent.toAccountType === 'internationalAccountTransfer'
      || this.toAccountComponent.toAccountType === 'internationalAccountStandingOrder'
    return this.enableInternationBenef;
  }

  onSaveBenefChange(event) {
    this.ownAccountVO['saveBenef'] = event.newValue;
  }


  enableInternationalTransfer() {
    if (this.toAccountComponent.toAccountType === 'internationalAccountStandingOrder') {
      this.internationTransfersBeneficiary = this.scheduledInternationalTransferBeneficiary;
      this.internationTransfersNonBeneficiary = this.scheduledInternationalTransferNonBeneficiary;
    }

    if (this.internationTransfersBeneficiary && this.internationTransfersNonBeneficiary && !this.enableInternationBeneficiaryApproval) {
      this.showBeneficiaryDropdown = true;
      this.internationalBeneficiariesOptions.labelKey = 'to_account_or_beneficiary_key';
      this.showSegment = true;
    } else if (this.internationTransfersBeneficiary && !this.internationTransfersNonBeneficiary && !this.enableInternationBeneficiaryApproval) {
      this.showBeneficiaryDropdown = true;
      this.internationalBeneficiariesOptions.labelKey = 'to_beneficiary_key';
    } else if (this.internationTransfersBeneficiary && this.internationTransfersNonBeneficiary && this.enableInternationBeneficiaryApproval) {
      this.showBeneficiaryDropdown = true;
      this.internationalBeneficiariesOptions.labelKey = 'to_beneficiary_key';
      this.showSegment = true;
    } else if (this.internationTransfersBeneficiary && !this.internationTransfersNonBeneficiary && this.enableInternationBeneficiaryApproval) {
      this.showBeneficiaryDropdown = true;
      this.internationalBeneficiariesOptions.labelKey = 'to_beneficiary_key';
    } else if (!this.internationTransfersBeneficiary) {
      this.showAccountNumber = true;
    }
  }

  enableLocalTransfer() {
    if (this.toAccountComponent.toAccountType === 'bankLocalStandingOrder') {
      this.LocalTransfersBeneficiary = this.scheduledLocalTransferBeneficiary;
      this.LocalTransfersNonBeneficiary = this.scheduledLocalTransferNonBeneficiary;
    }

    if (this.LocalTransfersBeneficiary && this.LocalTransfersNonBeneficiary && !this.EnableLocalBeneficiaryApproval) {
      this.showBeneficiaryDropdown = true;
      this.showSegment = true;
    } else if (this.LocalTransfersBeneficiary && !this.LocalTransfersNonBeneficiary && !this.EnableLocalBeneficiaryApproval) {
      this.showBeneficiaryDropdown = true;
    } else if (this.LocalTransfersBeneficiary && this.LocalTransfersNonBeneficiary && this.EnableLocalBeneficiaryApproval) {
      this.showBeneficiaryDropdown = true;
      this.showSegment = true;
    } else if (this.LocalTransfersBeneficiary && !this.LocalTransfersNonBeneficiary && this.EnableLocalBeneficiaryApproval) {
      this.showBeneficiaryDropdown = true;
    } else if (!this.LocalTransfersBeneficiary) {
      this.showAccountNumber = true;
    }
  }

  enableInternalTransfer() {
    if (this.transferBetweenBankAccountsBeneficiary && this.transferBetweenBankAccountsNonBeneficiary) {
      this.showBeneficiaryDropdown = true;
      this.internalBeneficiariesOptions.labelKey = 'to_account_or_beneficiary_key';
      this.showSegment = true;
    } else if (this.transferBetweenBankAccountsBeneficiary && !this.transferBetweenBankAccountsNonBeneficiary) {
      this.showBeneficiaryDropdown = true;
      this.internalBeneficiariesOptions.labelKey = 'to_beneficiary_key';
    } else if (!this.transferBetweenBankAccountsBeneficiary && this.transferBetweenBankAccountsNonBeneficiary) {
      this.showAccountNumber = true;
    }
  }

  navigateToBeneficiary(params?: any) {
    if (this.formGroup.controls[this.saveBenefToggleOptions.fcName].value === true) {
      const navigationExtras: NavigationExtras = {};
      let page: IPageCommon;

      if (this.enableInternationalBeneficiary()) {
        navigationExtras.queryParams = {
          accountNumber: this.accountNumber,
          swiftCode: this.formGroup.controls[this.swiftCodeOptions.fcName].value,
          currency: this.formGroup.controls[this.benefCurrencyOptions.fcName].value,
          purpose: this.formGroup.controls[this.purposeOptions.fcName].value || this.formGroup.controls[this.purposeOptionsDDLB.categoryFcName].value
        };
        PsCommonSettings.oper_ID = CommonBussinessConstant.EXTERNAL_BENEFICIARY_OPER_ID;
        page = {
          operID: CommonBussinessConstant.EXTERNAL_BENEFICIARY_OPER_ID,
          title: 'international_beneficiary_key'
        };
        this.commonProvider.activePage.next(page);
        this.nav.navigateForward('international-beneficiary', navigationExtras);
      }

      if (this.enableLocalBeneficiary()) {
        navigationExtras.queryParams = {
          accountNumber: this.accountNumber,
          bank: this.formGroup.controls[this.banksOptions.categoryFcName].value,
          benefBranchTxt: this.formGroup.controls[this.branchOptions.fcName].value,
          currency: this.formGroup.controls[this.benefCurrencyOptions.fcName].value,
          purpose: this.formGroup.controls[this.purposeOptions.fcName].value || this.formGroup.controls[this.purposeOptionsDDLB.categoryFcName].value
        };
        PsCommonSettings.oper_ID = CommonBussinessConstant.LOCAL_BENEFICIARY_OPER_ID;
        page = {
          operID: CommonBussinessConstant.LOCAL_BENEFICIARY_OPER_ID,
          title: 'local_beneficiary_key'
        };
        this.commonProvider.activePage.next(page);
        this.nav.navigateForward('local-beneficiary', navigationExtras);
      }

      if (this.enableInternalBeneficiary()) {
        navigationExtras.queryParams = {
          accountNumber: this.accountNumber,
          purpose: this.formGroup.controls[this.purposeOptions.fcName].value || this.formGroup.controls[this.purposeOptionsDDLB.categoryFcName].value,
          benefName: this.formGroup.controls.formData.value.benefName
        };
        PsCommonSettings.oper_ID = CommonBussinessConstant.INTERNAL_BENEFICIARY_OPER_ID;
        page = {
          operID: CommonBussinessConstant.INTERNAL_BENEFICIARY_OPER_ID,
          title: 'internal_beneficiary_key'
        };
        this.commonProvider.activePage.next(page);
        this.nav.navigateForward('internal-beneficiary', navigationExtras);
      }
    }
  }


  onClickSegment(selectedSegment) {
    if (selectedSegment === this.commonProv.translate('to_beneficiary_key')) {
      this.showBeneficiaryDetails = true;
      this.showToOtherDetails = false;

    } else {
      this.showToOtherDetails = true;
      this.showBeneficiaryDetails = false;
    }
    this.updateSegmentWithinVO();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.toOtherAccountNumberOptions.fcName], this.showToOtherDetails ? 1 : 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, ['toBeneficiary_lookupKey'], this.showBeneficiaryDetails);

    if (this.enableLocalBeneficiary()) {
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.localBeneficiariesOptions.fcName], this.showBeneficiaryDetails ? 1 : 0);
      if (this.formGroup.controls[this.localBeneficiariesOptions.fcName]) {
        this.formGroup.controls[this.localBeneficiariesOptions.fcName].reset();
      }
    } else if (this.enableInternationalBeneficiary()) {
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.internationalBeneficiariesOptions.fcName], this.showBeneficiaryDetails ? 1 : 0);
      if (this.formGroup.controls[this.internationalBeneficiariesOptions.fcName]) {
        this.formGroup.controls[this.internationalBeneficiariesOptions.fcName].reset();
      }
    } else if (this.enableInternalBeneficiary()) {
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.internalBeneficiariesOptions.fcName], this.showBeneficiaryDetails ? 1 : 0);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, ['toAccount_lookupKey'], this.showBeneficiaryDetails ? 1 : 0);
      if (this.formGroup.controls[this.internalBeneficiariesOptions.fcName]) {
        this.formGroup.controls[this.internalBeneficiariesOptions.fcName].reset();
      }
    }
  }

  onAccountNumbChanged(event) {
    this.accountNumber = event ? (event.newValue ? event.newValue : event) : undefined;
    if (this.enableInternalBeneficiary()) {
      if (this.toAccountComponent.scheduler) {
        PsCommonSettings.oper_ID = CommonBussinessConstant.INTERNAL_BENEFICIARY_TRANSFER_STANDING_ORDER_OPER_ID;
      } else {
        PsCommonSettings.oper_ID = CommonBussinessConstant.INTERNAL_BENEFICIARY_TRANSFER;
      }
    } else if (this.enableLocalBeneficiary()) {
      if (this.toAccountComponent.scheduler) {
        PsCommonSettings.oper_ID = CommonBussinessConstant.LOCAL_BENEFICIARY_TRANSFER_STANDING_ORDER_OPER_ID;
      } else {
        PsCommonSettings.oper_ID = CommonBussinessConstant.LOCAL_BENEFICIARY_TRANSFER;
      }
    } else if (this.enableInternationalBeneficiary()) {
      if (this.toAccountComponent.scheduler) {
        PsCommonSettings.oper_ID = CommonBussinessConstant.EXTERNAL_BENEFICIARY_TRANSFER_STANDING_ORDER_OPER_ID;
      } else {
        PsCommonSettings.oper_ID = CommonBussinessConstant.INTERNATIONAL_BENEFICIARY_TRANSFER;
      }
    }
  }


  onBankChanged(bank) {
    if (bank && bank !== undefined) {
    }
  }

  onSwiftCodeChanged(event) {
    if (event && event !== undefined) {
    }
  }

  onBenefCurrencyChanged(currency) {
    if (currency !== undefined) {
      this.complexExchangeOptions.toAmountOptions.currency = currency.selectedObj.briefDescription;
      this.complexExchangeOptions.toAmountOptions.currencyCode = currency.itemValue;
      this.stepperOptions.requestObject[this.complexExchangeOptions.toAmountOptions.currenciesOptions.fcName] = currency.itemValue;
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.complexExchangeOptions.toAmountOptions.fcName], 0);
      this.showExchangeRate();
    }
    this.purposeOnCurrencyChange();
  }

  purposeOnCurrencyChange() {
    if (this.complexExchangeOptions.fromAmountOptions.currencyCode !== undefined && this.complexExchangeOptions.toAmountOptions.currencyCode !== undefined) {
      // eslint-disable-next-line radix
      if (this.commonProv.getLKCompany().isLK && this.complexExchangeOptions.fromAmountOptions.currencyCode !== this.complexExchangeOptions.toAmountOptions.currencyCode && this.complexExchangeOptions.toAmountOptions.currencyCode == this.commonProv.getLKCompany().currencyCode) {
        this.showPurpposeSubPurpose = true;
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.purposeOptions.fcName], 0);
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.purposeOptionsDDLB.categoryFcName], 1);
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.purposeOptionsDDLB.subCategoryFcName], 1);
        // commented the use of form controller to the use of VO by Richie for #TP 1105083 since they will generate error in case the controller does not exist and we should not use the controller to set a value!
        // this.formGroup.controls[this.purposeOptions.fcName].setValue(null);
        this.ownAccountVO[this.purposeOptions.fcName] = null;
      } else {
        this.showPurpposeSubPurpose = false;
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.purposeOptionsDDLB.categoryFcName], 0);
        // this.formGroup.controls[this.purposeOptionsDDLB.categoryFcName].setValue(null);
        this.ownAccountVO[this.purposeOptionsDDLB.categoryFcName] = null;
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.purposeOptionsDDLB.subCategoryFcName], 0);
        // this.formGroup.controls[this.purposeOptionsDDLB.subCategoryFcName].setValue(null);
        this.ownAccountVO[this.purposeOptionsDDLB.subCategoryFcName] = null;
      }
    }
  }

  updateAccountVO(params?) {
    this.ownAccountVO['toAccountType'] = this.toAccountComponent.toAccountType;
    this.ownAccountVO['scheduler'] = this.toAccountComponent.scheduler;
    const accountNumberControl = this.formGroup.controls[this.toOtherAccountNumberOptions.fcName] ? this.formGroup.controls[this.toOtherAccountNumberOptions.fcName].value : null;
    this.accountNumber = this.accountNumber || accountNumberControl;

    if (this.accountNumber) {
      if (this.enableInternalBeneficiary()) {
        this.ownAccountVO['toAccount'] = {
          accountNumber: this.accountNumber
        };
        this.ownAccountVO['accountNumber'] = this.accountNumber;
      }
      if (this.enableInternationalBeneficiary()) {
        this.ownAccountVO['toBeneficiary'] = {
          accountNumber: this.accountNumber,
          swiftCode: this.formGroup.controls[this.swiftCodeOptions.fcName].value,
          currency: this.formGroup.controls[this.benefCurrencyOptions.fcName].value
        };
      }
      if (this.enableLocalBeneficiary()) {
        this.ownAccountVO['toBeneficiary'] = {
          accountNumber: this.accountNumber,
          benefBankId: this.formGroup.controls[this.banksOptions.categoryFcName].value,
          currency: this.formGroup.controls[this.benefCurrencyOptions.fcName].value
        };
      }
    }

  }

  updateSegmentWithinVO() {
    this.ownAccountVO['showBeneficiaryDetails'] = this.showBeneficiaryDetails;
    this.ownAccountVO['showToOtherDetails'] = this.showToOtherDetails;
  }

  initAccountVO() {
    this.ownAccountVO['toAccountType'] = this.toAccountComponent.toAccountType;
    this.ownAccountVO['scheduler'] = this.toAccountComponent.scheduler;
    this.ownAccountVO['saveBenef'] = false;
    this.updateSegmentWithinVO();
  }
}
