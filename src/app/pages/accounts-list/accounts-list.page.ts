import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsAccountsListExposed } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component.interfaces';
import { IMapKeyValue } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsCurrencyPipe } from 'src/app/commonSRC/psPipes/ps-currency/ps-currency.pipe';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsLabel } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IAccountResponse, IOmniAccountRequest, IOptionsPsSelectSegment, IOptionsPsTemplateView } from '../../commonSRC/psServices/models/ps-common-interface';
import { OmniBasePage } from '../omni-base/omni-base.page';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.page.html',
  styleUrls: ['./accounts-list.page.scss'],
})
export class AccountsListPage extends OmniBasePage implements OnInit {
  segmentOptions: IOptionsPsSelectSegment = {
    segmentList: []
  };
  generalAccountListOptions: IOptionsPsAccountsListExposed;
  termsAccountListOptions: IOptionsPsAccountsListExposed;
  public generalLabelValuesMap = new Map<string, IMapKeyValue>();
  public generalHeaderMap = new Map<string, IMapKeyValue>();
  public termsLabelValuesMap = new Map<string, IMapKeyValue>();
  public termsHeaderMap = new Map<string, IMapKeyValue>();
  public showGeneralAccounts = true;
  public showTermsAccounts = false;
  public noGeneralAccountFound = false;
  public noTermsAccountFound = false;
  private psCurrency = new PsCurrencyPipe();
  private accountAsIBAN: any;
  public noRecordFoundOptions: IOptionsPsLabel = {
    labelKey: 'no_records_found_key',
    previewMode: false
  };
  requestWasSent = false;
  constructor(
    public commonService: PsCommonService,
    public logger: LoggerService,
    private omniPull?: OmniPullService
  ) {
    super();
    //this.populateHeaderValueMap();
  }
  private formGroup = new FormGroup({});
  public templateViewOptions: IOptionsPsTemplateView = {
    group: this.formGroup
  };

  ngOnInit() {
    super.init();
    this.segmentOptions = {
      segmentList: [{
        selected: true,
        itemValue: this.commonProv.translate('general_accounts_key'),
        description: this.commonProv.translate('general_accounts_key')
      }, {
        selected: true,
        itemValue: this.commonProv.translate('terms_accounts_key'),
        description: this.commonProv.translate('terms_accounts_key')
      }],
      defaultSegment: { itemValue: this.commonProv.translate('general_accounts_key'), description: this.commonProv.translate('general_accounts_key')}
    };
    this.generalAccountListOptions = {
      isEditable: true
    };
    this.termsAccountListOptions = {
      isEditable: true
    };
    this.loadAccounts(this.commonProv.translate('general_accounts_key'));
  }

  onClickSegment(selectedSegment) {
    if (selectedSegment === this.commonProv.translate('general_accounts_key')) {
      this.termsAccountListOptions.isFMA = false;
      this.showTermsAccounts = false;
      this.showGeneralAccounts = true;
      this.loadAccounts(selectedSegment);
    } else {
      this.termsAccountListOptions.isFMA = true;
      this.showTermsAccounts = true;
      this.showGeneralAccounts = false;
      this.loadAccounts(selectedSegment);
    }
  }

  /**
   * populating account - fetching from server
   */
  private loadAccounts(segment) {
    // TODO: when the service is ready : we will get the account list based on cif number from server. service will take the cif number -- options.cifNumber will provide the cif number

    const cifInfo = this.commonService.session.getValueOf(ConstantCommon.USERINFO);

    if (segment === this.commonProv.translate('general_accounts_key')) {
      const generalRequestData: IOmniAccountRequest = {
        userCifNo: cifInfo.omniUserVO.CIF_NO,
        permittedGls: 'G',
        accountType: 'G'
      };
      this.returnGeneralAccountList(generalRequestData);
    } else {
      const termsRequestData: IOmniAccountRequest = {
        userCifNo: cifInfo.omniUserVO.CIF_NO,
        permittedGls: 'F',
        accountType: 'F'
      };
      this.returnTermsAccountList(termsRequestData);
    }
  }

  private getAccountAsIBAN() {
    if (this.accountAsIBAN === undefined) {
      this.omniPull.getParamValOf('AccountsAsIBAN').then(res => {
        this.accountAsIBAN = res.AccountsAsIBAN;
      }).catch(err => this.logger.log(err));
    }
  }

  /**
   * fetching general account list from server
   * @param requestData IOmniAccountRequest
   */
  private async returnGeneralAccountList(requestData: IOmniAccountRequest) {
    this.requestWasSent = true;
    const result = await this.omniPull.returnAccounts(requestData).catch(error => {
      this.logger.error('Error: While fetching accounts in PsComplexOwnAccountComponent :', error);
    });

    if (result && result.gridModel.length > 0) {
      this.getAccountAsIBAN();
      this.noGeneralAccountFound = false;
      this.generalAccountListOptions.listOfOptions = this.populateCustomAccounts(result.gridModel);
    } else {
      this.generalAccountListOptions.listOfOptions = [];
      this.noGeneralAccountFound = true;
    }
    this.requestWasSent = false;
  }
  /**
   * fetching terms account list from server
   * @param requestData IOmniAccountRequest
   */
  private async returnTermsAccountList(requestData: IOmniAccountRequest) {
    this.requestWasSent = true;
    const result = await this.omniPull.returnAccounts(requestData).catch(error => {
      this.logger.error('Error: While fetching accounts in PsComplexOwnAccountComponent :', error);
    });

    if (result && result.gridModel.length > 0) {
      this.getAccountAsIBAN();
      this.noTermsAccountFound = false;
      this.termsAccountListOptions.listOfOptions = this.populateCustomAccounts(result.gridModel);
    } else {
      this.termsAccountListOptions.listOfOptions = [];
      this.noTermsAccountFound = true;
    }
    this.requestWasSent = false;
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
        generalLedgerBriefNameEng: iterator.generalLedgerBriefNameEng,
      };
      accountsList.push(account);
    }
    return accountsList;
  }

  updateCard(value) {
    // console.log(value);
  }

  /**
   * 
   * @param account 
   */
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
