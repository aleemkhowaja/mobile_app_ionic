import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IAccounts, IMapKeyValue } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { PsCurrencyPipe } from 'src/app/commonSRC/psPipes/ps-currency/ps-currency.pipe';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IAccountResponse, IOmniAccountRequest, IOptionsPsLabelInput } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsComplexLookUpComponentExposed } from '../../ps-complex-components/ps-complex-lookup/ps-complex-lookup.component.interfaces';
import { IOptionsPsLookupOwnAccountsExposed } from './ps-lookup-own-accounts.component.interfaces';



/**
 * @author Aftab.Ali
 * @since 03/02/2020
 *
 * <p> PsComplexOwnAccountComponent is complex component to show accounts list fetched from server, balance and available balance</p>
 */
@Component({
  selector: 'ps-lookup-own-accounts',
  templateUrl: './ps-lookup-own-accounts.component.html',
  styleUrls: ['./ps-lookup-own-accounts.component.scss'],
})
export class PsLookupOwnAccountsComponent extends PsBaseFieldComponent implements OnInit, OnChanges {
  @Input() options: IOptionsPsLookupOwnAccountsExposed = {
    fromTo: '',
    requestObject: null,
  };
  public complexLookupOptions: IOptionsPsComplexLookUpComponentExposed = {
    requestObject: null,
    notFoundMessage: 'no_valid_account_found_key'
  };
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onAccountChange: EventEmitter<any> = new EventEmitter<any>();
  public listOfAccounts?: IAccounts[];
  public labelValuesMap = new Map<string, IMapKeyValue>();
  private psCurrency = new PsCurrencyPipe();
  public labelOptions: IOptionsPsLabelInput = {};
  private accountAsIBAN: any;

  constructor(
    public commonService: PsCommonService,
    logger: LoggerService,
    private omniPull?: OmniPullService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    super.init();
    this.loadAccounts(null);
    this.complexLookupOptions.labelKey = this.options.labelKey;
    this.complexLookupOptions.title = 'title_key';
    this.complexLookupOptions.subTitle = 'sub_title_key';
    this.complexLookupOptions.labelsValueMap = this.labelValuesMap;
    this.commonProv.copyObject(this.complexLookupOptions, this.options, false);
  }

  ngOnChanges(change: SimpleChanges) {
    this.complexLookupOptions.labelKey = this.options.labelKey;
    this.complexLookupOptions.placeHolder = this.options.placeHolder;
    if (this.options.accountNumber !== undefined) {
      this.loadAccounts(null);
    }
  }

  /**
   * populating account - fetching from server
   */
  public async loadAccounts(reloadOptions: IOptionsPsLookupOwnAccountsExposed) {

    const paramVal = await this.omniPull.getParamValOf('AccountsAsIBAN').catch(error => {
      this.logger.error('Error! while fetching AccountsAsIBAN param in Own account lookup component ', error);
    });
    if (paramVal !== null && paramVal !== undefined) {
      this.accountAsIBAN = paramVal.AccountsAsIBAN;
    }
    if (reloadOptions !== null && reloadOptions !== undefined) {
      this.options = reloadOptions;
    }
    this.options.listOfAccounts = [];
    // TODO: when the service is ready : we will get the account list based on cif number from server. service will take the cif number -- options.cifNumber will provide the cif number
    if (this.options.fromTo === null || this.options.fromTo === undefined || this.options.fromTo === '') {
      this.logger.error('lookup_from_to_missing_key');
      return;
    }
    const cifInfo = this.commonService.session.getValueOf(ConstantCommon.USERINFO);

    const requestData: IOmniAccountRequest = this.prepareRequestData(cifInfo);
    this.returnAccountList(requestData);
  }

  /**
   * fetching account list from server
   * @param requestData IOmniAccountRequest
   */
  private async returnAccountList(requestData: IOmniAccountRequest) {
    this.complexLookupOptions.listOfOptions = undefined;
    const result = await this.omniPull.returnAccounts(requestData).catch(error => {
      this.complexLookupOptions.listOfOptions = [];
      this.logger.error('Error: While fetching accounts in PsComplexOwnAccountComponent :', error);
    });

    if (result && result.gridModel.length > 0) {
      this.options.listOfAccounts = result.gridModel;
      if (this.options.accountNumber && this.options.accountNumber !== '') {
        this.complexLookupOptions.listOfOptions = this.options.listOfAccounts.filter(account => account.accountNumber !== this.options.accountNumber);

      }
      if (this.options.currency && this.options.currency !== '') {
        this.complexLookupOptions.listOfOptions = this.fetchAccountBasedOnCurrency(this.options.currency);
        if (this.options.accountNumber && this.options.accountNumber !== '') {
          this.complexLookupOptions.listOfOptions = this.options.listOfAccounts.filter(account => account.accountNumber !== this.options.accountNumber);
        }
      }

      if ((this.options.accountNumber === null || this.options.accountNumber === undefined || this.options.accountNumber === '')) {
        this.complexLookupOptions.listOfOptions = this.options.listOfAccounts;
      }

      this.complexLookupOptions.listOfOptions = this.populateCustomAccounts(this.complexLookupOptions.listOfOptions);

    } else {
      this.listOfAccounts = [];
      this.complexLookupOptions.listOfOptions = [];
    }
  }

  /**
   *
   * @param listOfOptions
   */
  private populateCustomAccounts(listOfOptions: IAccountResponse[]): IAccountResponse[] {

    const accountsList: IAccountResponse[] = [];
    for (const iterator of listOfOptions) {
      const account: IAccountResponse = {
        briefNameEnglish: iterator.briefNameEnglish,
        cifShortNameEnglish: iterator.cifShortNameEnglish,
        accountNumber: iterator.accountNumber,
        balance: this.psCurrency.transform(iterator.balance === null || iterator.balance === undefined ? '0.0' : iterator.balance, iterator.currencyDecimalPoints) + ' ' + iterator.currencyBriefNameEnglish,
        availableBalance: this.psCurrency.transform(iterator.availableBalance === null || iterator.availableBalance === undefined ? '0.0' : iterator.availableBalance, iterator.currencyDecimalPoints) + ' ' + iterator.currencyBriefNameEnglish,
        currencyBriefNameEnglish: iterator.currencyBriefNameEnglish,
        currency: iterator.currency,
        additionalRef: iterator.additionalRef,
        ibanAccNo: iterator.ibanAccNo,
        accGl: iterator.accGl,
        serialNo: iterator.serialNo,
        branch: iterator.branch,
        cif: iterator.cif,
        formattedAccount: this.getFormatedAccount(iterator),
        key: iterator.key,
        nickName: iterator.nickName,
        briefName: iterator.briefName,
        lookupKey: iterator.accountNumber,
        branchDescription: iterator.branchDescription ? iterator.branchDescription : '',
        generalLedgerBriefNameEng: iterator.generalLedgerBriefNameEng ? iterator.generalLedgerBriefNameEng : '',
      };
      accountsList.push(account);
    }
    return accountsList;
  }

  /**
   * preparing request data
   * @param cifInfo: any
   */
  private prepareRequestData(cifInfo: any): IOmniAccountRequest {
    let requestData: IOmniAccountRequest = {};

    if (cifInfo && cifInfo.omniUserVO) {
      requestData = {
        // vsBranchCode: cifInfo.branchCode,
        userCifNo: cifInfo.omniUserVO.CIF_NO,
        type: 'A'
      };
    }
    if (this.options.accountType != null && this.options.accountType !== undefined && this.options.accountType !== '') {
      requestData.accountType = this.options.accountType;
    }
    if (this.options.glTypes != null && this.options.glTypes !== undefined && this.options.glTypes !== '') {
      requestData.permittedGls = this.options.glTypes;
    }
    if (this.options.fromTo !== null && this.options.fromTo !== undefined && this.options.fromTo !== '') {
      requestData.fromTo = this.options.fromTo;
    }
    if (this.options.fromCurrency !== null && this.options.fromCurrency !== undefined) {
      requestData.fromCurrency = this.options.fromCurrency;
    } else if (this.options.toCurrency !== null && this.options.toCurrency !== undefined) {
      requestData.toCurrency = this.options.toCurrency;
    }

    if (this.options.accountAllowedCurrencies != null && this.options.accountAllowedCurrencies !== undefined) {
      if (typeof this.options.accountAllowedCurrencies === 'string') {
        requestData.accountAllowedCurrencies = this.options.accountAllowedCurrencies;
      } else {
        let temp = '';
        // eslint-disable-next-line guard-for-in
        for (const val in this.options.accountAllowedCurrencies) {
          const value = this.options.accountAllowedCurrencies[val];
          temp += value + ',';
        }
        temp = temp.slice(0, temp.lastIndexOf(','));
        requestData.accountAllowedCurrencies = temp;
      }
    }

    if (this.options.accountAllowedTypes != null && this.options.accountAllowedTypes !== undefined) {
      if (typeof this.options.accountAllowedTypes === 'string') {
        requestData.accountAllowedTypes = this.options.accountAllowedTypes;
      } else {
        let temp = '';
        // eslint-disable-next-line guard-for-in
        for (const val in this.options.accountAllowedTypes) {
          const value = this.options.accountAllowedTypes[val];
          temp += value + ',';
        }
        temp = temp.slice(0, temp.lastIndexOf(','));
        requestData.accountAllowedTypes = temp;
      }
    }
    return requestData;
  }



  /**
   * will fetch the list of accounts from server based currecy filter
   */
  private fetchAccountBasedOnCurrency(currency: any): IAccounts[] {
    // TODO: when service is available: account list will be fetched from server based on currency if passed any
    return this.options.listOfAccounts;
  }

  onChange(event: any[]) {
    this.logger.log(event);
    // TODO: get the updated data from server
  }

  private populateOwnAccountMap() {
    let accountNumberMap: IMapKeyValue = {};
    let accountBalanceMap: IMapKeyValue = {};
    let accountAvailableBalanceMap: IMapKeyValue = {};

    accountNumberMap = {
      key: 'accountNumber', // will be used in lookup compoent to get the value of account nummer from list of accounts
      value: '--- --- --- ---',
      isEdit: false,
    };

    accountBalanceMap = {
      key: 'currentBalance', // will be used in lookup compoent to get the value of account balance from list of accounts
      value: '0.0',
      isEdit: false,
    };

    accountAvailableBalanceMap = {
      key: 'availableBalance', // will be used in lookup compoent to get the value of account available balance from list of accounts
      value: '0.0',
      isEdit: false
    };

    // key here will be used as label in look up details component
    this.labelValuesMap.set('account_key', accountNumberMap);
    this.labelValuesMap.set('balance_key', accountBalanceMap);
    this.labelValuesMap.set('available_balance_key', accountAvailableBalanceMap);
  }

  onChangeItem(event) {
    this.onAccountChange.emit(event);
  }

  private getFormatedAccount(account: IAccountResponse): string {
    let accountFormat: any;
    if (this.accountAsIBAN !== null && this.accountAsIBAN !== undefined && this.accountAsIBAN === 1) {
      accountFormat = account.ibanAccNo === null || account.ibanAccNo === undefined ? '' : account.ibanAccNo;
    } else if (this.accountAsIBAN !== null && this.accountAsIBAN !== undefined && this.accountAsIBAN === 2) {
      accountFormat = account.additionalRef === null || account.additionalRef === undefined ? '' : account.additionalRef;
    } else if (this.accountAsIBAN !== null && this.accountAsIBAN !== undefined && this.accountAsIBAN === 3) {
      accountFormat = account.branch + '-' + account.currency + '-' + account.accGl + '-' + account.cif + '-' + account.serialNo;
    } else {
      accountFormat = account.additionalRef === null || account.additionalRef === undefined ? '' : account.accountNumber;
    }
    return accountFormat;
  }

}
