import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PsAccountsListComponent } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component';
import { IOptionsPsComplexAmountExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-amount/ps-complex-amount.component.interfaces';
import { PsComplexExchangeComponent } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-exchange/ps-complex-exchange.component';
import { IOptionsPsComplexExchnageExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-exchange/ps-complex-exchange.component.interfaces';
import { IOptionsPsInputFreeTextExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-free-text/ps-input-free-text.component.interfaces';
import { IOptionsPsLookupOwnAccountsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.interfaces';
import { IOptionsPsDropdownBillerExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-biller/ps-dropdown-biller.component.interface';
import { IOptionsPsDropdownBillersCategoryExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-billers-category/ps-dropdown-billers-category.component.interface';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { PsSelect } from 'src/app/commonSRC/psServices/models/common-type';
import { IOptionsPsContainerPanel, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { OmniBasePage } from 'src/app/pages/omni-base/omni-base.page';

@Component({
  selector: 'app-online-bill-payment',
  templateUrl: './online-bill-payment.page.html',
  styleUrls: ['./online-bill-payment.page.scss'],
})
export class OnlineBillPaymentPage extends OmniBasePage implements OnInit, AfterViewInit {
  billPaymentForm: FormGroup = new FormGroup({});
  defaultVO: any = {};
  stepperOptions: IOptionsTemplateStepper = {
    isHorizontalStepper: true,
    numberOfSteps: 1,
    namesofSteps: ['bill_payment_step1'],
    group: this.billPaymentForm,
    submitOptions: {
      extraParams: {},
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.billPaymentEndPoint,
      group: this.billPaymentForm,
      postCallFunction: {
        func(response) {
          return new Promise<any>((resolve, reject) => {
            resolve(this.executionClass.serviceRes(response));
          });
        },
        params: [this],
        executionClass: this
      },
    },
    requestObject: this.defaultVO
  };
  public accountListOptions: IOptionsPsLookupOwnAccountsExposed = {
    labelKey: 'from_account_key',
    placeHolder: 'select_from_account_key',
    component: PsAccountsListComponent,
    currency: 'USD',
    group: this.billPaymentForm,
    accountAllowedCurrencies: [],
    accountAllowedTypes: [],
    glTypes: 'G',
    fcName: 'fromAccount',
    accountType: 'G',
    fromTo: 'from',
    requestObject: this.defaultVO,
  };
  panelOptionsStep1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'bill_payment_key',
    iconName: 'document',
    expanded: true
  };
  psComplexAmountOptions: IOptionsPsComplexAmountExposed = {
    currenciesOptions: {
      labelKey: 'currency_key',
      placeHolder: 'currency_key',
      group: this.billPaymentForm,
      fcName: 'currency'
    },
    amountOptions: {
      labelKey: 'amount_key',
      placeHolder: 'enter_amount_key',
      fcName: 'amount',
      group: this.billPaymentForm,
      type: 'amount',
      decimalPoints: 3
    }
  };
  public complexExchangeOptions: IOptionsPsComplexExchnageExposed = {
    editableMode: true,
    showToCurrencyOptions: true,
    fromAmountOptions: {
      currency: '',
      group: this.billPaymentForm,
      // fcName: 'fromAmount',
      currenciesOptions: {
        placeHolder: 'currency_key',
        labelKey: 'currency_key',
        fcName: 'fromAccountCurrency',
        group: this.billPaymentForm
      },
      amountOptions: {
        labelKey: 'amount_key',
        placeHolder: 'enter_amount_key',
        fcName: 'transactionAmount',
        group: this.billPaymentForm
      }
    },
    toAmountOptions: {
      group: this.billPaymentForm,
      // fcName: 'toAmount',
      currency: '',
      currenciesOptions: {
        placeHolder: 'currency_key',
        labelKey: 'currency_key',
        fcName: 'currency',
        group: this.billPaymentForm
      },
      amountOptions: {
        labelKey: 'exchanged_amount_key',
        placeHolder: 'enter_exchanged_amount_key',
        fcName: 'toAmount',
        group: this.billPaymentForm
      }
    }
  };
  briefExplanationOptions: IOptionsPsInputFreeTextExposed = {
    labelKey: 'bill_reference_key',
    placeHolder: 'enter_bill_reference_key',
    fcName: 'reference',
    group: this.billPaymentForm,
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  hintOptions: IOptionsPsInputFreeTextExposed = {
    placeHolder: 'enter_hint_key',
    labelKey: 'billers_hint_key',
    group: this.billPaymentForm,
    fcName: 'hint'
  };
  categoryOptions: IOptionsPsDropdownBillersCategoryExposed = {
    fcName: 'category',
    group: this.billPaymentForm
  };
  typeOptions: IOptionsPsDropdownBillerExposed = {
    fcName: 'biller',
    group: this.billPaymentForm
  };
  @ViewChild(PsComplexExchangeComponent) exchangeChild: PsComplexExchangeComponent;
  showBiller = false;
  public billerTypes: PsSelect = [];
  constructor(public commonProv: PsCommonService, public loggerP: LoggerService, private omniPull: OmniPullService, private navService: PsNavigatorService) {
    super();
  }

  ngOnInit() {
    super.init();
    this.baseFormGroup = this.billPaymentForm;
    PsCommonSettings.oper_ID = CommonBussinessConstant.BILL_PAYMENTS_OPER_ID;
  }
  public onAccountChange(fromAccount) {
    if (fromAccount) {
      this.defaultVO[this.complexExchangeOptions.fromAmountOptions.amountOptions.fcName] = '';
      this.defaultVO[this.complexExchangeOptions.fromAmountOptions.currenciesOptions.fcName] = fromAccount.currency.toString();
      this.complexExchangeOptions.fromAmountOptions.currencyCode = Number(fromAccount.currency);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.complexExchangeOptions.toAmountOptions.currenciesOptions.fcName], 0);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.complexExchangeOptions.toAmountOptions.amountOptions.fcName], 1);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.complexExchangeOptions.fromAmountOptions.currenciesOptions.fcName], 1);
      // this.defaultVO[this.complexExchangeOptions.toAmountOptions.currenciesOptions.fcName] = '1';
      // this.complexExchangeOptions.toAmountOptions.currencyCode = 1;
      this.showExchangeRate();
    }
  }

  /** to show exchange rate if from and to currencies are different */
  private showExchangeRate() {
    this.exchangeChild.showToCurrency();
  }
  ngAfterViewInit(): void {

    this.showExchangeRate();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.complexExchangeOptions.fromAmountOptions.currenciesOptions.fcName], 1);
  }

  onCategoryChange(event: any) {
    if (event.selectedObj.longDesc) {
      this.defaultVO[this.hintOptions.fcName] = event.selectedObj.longDesc;
      this.getBillerTypes(event);
    }

  }

      onBillerChange(event: any) {
        if (event.selectedObj) {
             this.defaultVO[this.complexExchangeOptions.toAmountOptions.currenciesOptions.fcName] = event.selectedObj.accCY.toString();
             this.complexExchangeOptions.toAmountOptions.currencyCode = Number(event.selectedObj.accCY);
             this.commonProv.copyObject(this.stepperOptions.submitOptions.extraParams, { toAccount: {accountNumber: event.selectedObj.accountNumber }, cifBank: event.selectedObj.accCIF, additionalNumber: event.selectedObj.billTypeCode , billerCode: event.selectedObj.organizationCode }, false, true);
        }
      }


      getBillerTypes(val) {
        const paramData = {
          commonParametersList: {
            category:  val
          }
        };
        this.omniPull.returnBillersList(paramData).then((result) => {
          this.showBiller = false;
          if (result && result.gridModel != null && result.gridModel.length > 0) {
            for (let i = 0; i < result.gridModel.length; i++) {
              const acctype = { itemValue: result.gridModel[i].billTypeCode, 
                description: result.gridModel[i].billTypeDescription, selectedObj: result.gridModel[i] };
              this.billerTypes.push(acctype);
            }
            this.typeOptions.listofItems = this.billerTypes;
            this.showBiller = true;
          } else { this.loggerP.warn(result, 'empty response'); }
        }).catch((error) => { });
      }

  onRefChange(val: any) {
    if (val) {
      this.commonProv.copyObject(this.stepperOptions.submitOptions.extraParams, { soReference: val.newValue }, false, true);
    }

  }
}
