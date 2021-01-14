import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsIconSocialSharingComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-action/ps-action-icon/ps-icon-social-sharing/ps-icon-social-sharing.component';
import { Events } from 'src/app/commonSRC/psServices/Event/event.service';
import { IOperVO } from 'src/app/pages/omni-login/omni-login.interfaces';
import { PsCommonBusinessSettings } from '../../psServices/models/ps-commonBusiness.settings';
import { PsBaseFieldComponent } from './../../../commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from './../../../commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from './../../../commonSRC/psServices/models/common-constant';
import { PsCommonSettings } from './../../../commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from './../../../commonSRC/psServices/ps-common/ps-common.service';
import { IListContainerLookupOption, IMapKeyValue, IOptionsPsContainerLookupOptionComponentExposed } from './../../psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsAccountsListExposed } from './ps-accounts-list.component.interfaces';



/**
 * @author Aftab.Ali
 * @since 31/12/2019
 *
 * <p> PsAccountsListComponent </p>
 */
@Component({
  selector: 'ps-accounts-list',
  templateUrl: './ps-accounts-list.component.html',
  styleUrls: ['./ps-accounts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PsAccountsListComponent extends PsBaseFieldComponent implements OnInit, AfterViewChecked, OnDestroy {

  @Input() options: IOptionsPsAccountsListExposed = {};

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onClickCard = new EventEmitter<any>();
  public labelValuesMap = new Map<string, IMapKeyValue>();
  public headerMap = new Map<string, IMapKeyValue>();
  private showSingleAccount = false;
  public requestMap = new Map<string, string>();
  public editRequestMap = new Map<string, string>();
  private businessProfileMap: IOperVO[] = [];
  lookUpOptions: IListContainerLookupOption[] = [];
  eventSub: Subscription; // Added by Richie #TP 1105083 due to migration to ionic 5 since Event service was removed and replaced with observable
  constructor(
    commonServices: PsCommonService,
    logger: LoggerService,
    private cdRef?: ChangeDetectorRef,
    private event?: Events
  ) {
    super(commonServices, logger);
    this.eventSub = this.event.subscribe('refreshList', (list) => {
    });
  }

  // Added by Richie #TP 1105083
  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
  }
  // end Richie

  ngOnInit() {
    super.ngOnInit();
    this.businessProfileMap = this.commonProv.session.getValueOf(ConstantCommon.BUSINESS_PROFILE_MAP);
    const operation = this.businessProfileMap.filter(operVO => operVO.OPER_ID === PsCommonSettings.oper_ID).shift();
    let emailSubject = '';
    if (operation && operation.DESCRIPTION) {
      emailSubject = operation.DESCRIPTION + '-' + 'accountnumber';
    }
    if (this.options.listOfOptions) {
      this.options.itemList = this.options.listOfOptions;
    }
    this.populateAccountsMap();
  }

  getContainerLookUpOptions(val) {
    return this.prepareLookUp(val);
  }

  getItem(val) {
    if (this.commonProv.isMobile()) {
      val.sharedMessage = this.generateSharedMessage(val);
    }
    return val;
  }

  private prepareLookUp(card: any): any {
    let lookupDetails: IOptionsPsContainerLookupOptionComponentExposed = {};
    lookupDetails.labelKey = this.options.labelKey;
    lookupDetails.fcName = this.options.fcName;
    lookupDetails.currencyFlag = 'currencyBriefNameEnglish';
    lookupDetails.labelsValueMap = this.labelValuesMap;
    lookupDetails.headerMap = this.headerMap;
    lookupDetails.formGroup = this.options.group;
    lookupDetails.balanceMapping = this.balanceMapping();
    lookupDetails.isEditable = this.options.isEditable;
    lookupDetails.editActionUrl = PsCommonBusinessSettings.serviceUrl.personalizationNicknameEndPoint;
    lookupDetails.requestMap = this.requestMap;
    lookupDetails.editRequestMap = this.editRequestMap;
    lookupDetails.showInitialCardValues = CommonBussinessConstant.VISIBLE_FIELD;
    if (this.options.isFMA && (this.commonProv.getPageByOperId(ConstantCommon.MATURITY_UPDATE_OPER_ID) !== undefined)) {
      lookupDetails.detailServiceUrl = [
        { url: PsCommonBusinessSettings.serviceUrl.maturityAccountDetailsRestEndPoint, paramsKeyLabels: [{ key: 'accountNumber', value: 'accountNumber' }, , { key: 'accountType', staticValue: 'F' }], responseKeyLabel: [{ key: 'investmentCapital', value: 'investmentCapital' }, { key: 'tenor', value: 'tenor' }, { key: 'maturityDate', value: 'maturityDate' }, { key: 'profitRate', value: 'profitRate' }, { key: 'accruedDividends', value: 'accruedDividends' }, { key: 'dividendsPaid', value: 'dividendsPaid' }, { key: 'renew', value: 'renew' }, { key: 'renewWithSame', value: 'renewWithSame' }] },
      ];
    }
    lookupDetails.pageData = {
      operID: ConstantCommon.VIEW_STATEMENT_OF_TRANSACTIONS,
      title: 'accounts_report_key'
    };
    if (PsCommonSettings.oper_ID !== ConstantCommon.MATURITY_UPDATE_OPER_ID) {
      lookupDetails.actionDetailsOptions = [
        {
          label: 'pending_transfers_key',
          actionHyperlink: {
            iconOptions: {
              iconName: 'pending-transfers'
            },
            route: 'pending-transfers-report',
            pageOptions: {
              operId: CommonBussinessConstant.PENDING_TRANSFERS_REPORT_OPER_ID,
              iconName: 'pending-transfers',
              title: 'pending_transfers_key'
            }
          }
        },
        /*{
            label: 'request_hard_copy_key',
            component: PsActionButtonEmailUsDefaultedComponent,
            componentOptions: {
              iconName: 'mail',
              psClass: 'ps-menu-reach-background',
              subject: emailSubject
            }
          }*/
        (
          this.commonProv.isMobile() ?
            {
              label: 'share_key',
              component: PsIconSocialSharingComponent,
              param: {
                itemKey: 'sharedMessage',
                optionKey: 'message',
              },
            } : {}
        ),
      ];

      if (this.options.isFMA && (this.commonProv.getPageByOperId(ConstantCommon.MATURITY_UPDATE_OPER_ID) != undefined)) {
        lookupDetails.actionDetailsOptions.push({
          label: 'change_maturity_instructions_key',
          actionHyperlink: {
            iconOptions: {
              iconName: 'document'
            },
            route: 'change-maturity-instructions',
            pageOptions: {
              operId: CommonBussinessConstant.CHANGE_MATURITY_ACCOUNT_OPER_ID,
              iconName: 'document',
              title: 'change_maturity_instructions_key'
            }
            // operId: ConstantCommon.AccountOpeningFixedMaturityAccountPage_OPER_ID
          }
        });
      }
    }
    lookupDetails.statementOptions = {
      buttonIcon: 'list-box',
      redirectUrl: 'account-statement-report'
    };
    return lookupDetails;
  }

  generateSharedMessage(itemCard) {
    let message = '';
    if (itemCard.accountNumber != null && itemCard.accountNumber != undefined) {
      message = 'Account Number: ' + itemCard.accountNumber;
    }
    if (itemCard.additionalRef != null && itemCard.additionalRef != undefined) {
      message = (message != '' ? message + ' - ' : '') + 'Account Ref: ' + itemCard.additionalRef;
    }
    if (itemCard.ibanAccN != null && itemCard.ibanAccN != undefined) {
      message = (message != '' ? message + ' - ' : '') + 'IBAN: ' + itemCard.ibanAccN;
    }
    return message;
  }


  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  public updateCard(account: any) {
    if (account && this.options.listOfOptions) {
      this.options.itemList = this.options.listOfOptions.filter(acct => acct === account);
      this.options.item = this.options.itemList[0];
      this.showSingleAccount = !this.showSingleAccount;
      this.options.showItemPopUp = !this.options.showItemPopUp;
      //this.options.showSelectedCard = false;
    }

    this.onClickCard.emit(this.options);
  }

  private populateAccountsMap() {
    let accountNumberMap: IMapKeyValue = {};
    let accountBalanceMap: IMapKeyValue = {};
    let accountAvailableBalanceMap: IMapKeyValue = {};
    let investMentCapitalMap: IMapKeyValue = {};
    let profitRateMap: IMapKeyValue = {};
    let tenorMap: IMapKeyValue = {};
    let maturityDateMap: IMapKeyValue = {};
    let dividendsPaidMap: IMapKeyValue = {};
    let accruedDividendsMap: IMapKeyValue = {};
    let renewMap: IMapKeyValue = {};
    let renewWithSameMap: IMapKeyValue = {};
    let maturityInstructionsMap: IMapKeyValue = {};
    let headerTitleMap: IMapKeyValue = {};
    let headerSubtitleMap: IMapKeyValue = {};

    accountNumberMap = {
      key: 'formattedAccount', // will be used in lookup compoent to get the value of account nummer from list of accounts
      value: '--- --- --- ---',
      isEdit: false,
    };

    accountBalanceMap = {
      key: 'balance', // will be used in lookup compoent to get the value of account balance from list of accounts
      value: '0.0',
      isEdit: false,
    };

    accountAvailableBalanceMap = {
      key: 'availableBalance', // will be used in lookup compoent to get the value of account available balance from list of accounts
      value: '0.0',
      isEdit: false
    };

    investMentCapitalMap = {
      key: 'investmentCapital',
      value: '0',
      isEdit: false
    };

    profitRateMap = {
      key: 'profitRate',
      value: '0',
      isEdit: false
    };

    tenorMap = {
      key: 'tenor',
      value: '0',
      isEdit: false
    };

    maturityDateMap = {
      key: 'maturityDate',
      value: '0',
      isEdit: false
    };

    dividendsPaidMap = {
      key: 'dividendsPaid',
      value: '0',
      isEdit: false
    };

    accruedDividendsMap = {
      key: 'accruedDividends',
      value: '0',
      isEdit: false
    };

    renewMap = {
      key: 'renew',
      value: '0',
      isEdit: false
    };

    renewWithSameMap = {
      key: 'renewWithSame',
      value: '0',
      isEdit: false
    };

    maturityInstructionsMap = {
      key: 'maturityInstructions',
      value: '0',
      isEdit: false
    };


    headerTitleMap = {
      key: 'title',
      value: 'generalLedgerBriefNameEng',
      isEdit: false,
    };

    headerSubtitleMap = {
      key: 'subTitle',
      value: 'briefName',
      isEdit: true,
      formGroupMap: {
        placeHolder: 'enter_account_nick',
        fcName: 'briefName',
      }
    };


    // key here will be used as label in look up details component
    this.labelValuesMap.set('account_key', accountNumberMap);
    /* this.labelValuesMap.set('balance_key', accountBalanceMap);
    this.labelValuesMap.set('available_balance_key', accountAvailableBalanceMap); */
    if (this.options.isFMA && (this.commonProv.getPageByOperId(ConstantCommon.MATURITY_UPDATE_OPER_ID) !== undefined)) {
      this.labelValuesMap.set('investment_capital_key', investMentCapitalMap);
      this.labelValuesMap.set('profit_rate_key', profitRateMap);
      this.labelValuesMap.set('tenor_key', tenorMap);
      this.labelValuesMap.set('maturity_date_key', maturityDateMap);
      this.labelValuesMap.set('dividends_paid_key', dividendsPaidMap);
      this.labelValuesMap.set('accrued_dividends_key', accruedDividendsMap);
      // this.labelValuesMap.set('maturity_instructions_key', maturityInstructionsMap);
      this.labelValuesMap.set('renew_key', renewMap);
      this.labelValuesMap.set('renew_new_balance_within_same_account_key', renewWithSameMap);
    }

    // will be used as header to template card in look up details component
    this.headerMap.set('title', headerTitleMap);
    this.headerMap.set('subTitle', headerSubtitleMap);
    this.requestMap.set('nickNameNumber', 'key');
    this.requestMap.set('oldNickName', 'briefName');
    this.editRequestMap.set('newNickName', 'briefName');
    this.editRequestMap.set('type', 'A');
    /* this.requestMap.set('newNickName', 'accountNumber'); */
  }

  /**
   * 
   */
  private balanceMapping(): any[] {
    const balanceMappingList = [
      {
        key: 'current_balance_key',
        value: 'balance'
      },
      {
        key: 'available_balance_key',
        value: 'availableBalance'
      },
      {
        key: 'currency_iso_key',
        value: 'currencyBriefNameEnglish'
      }
    ];

    return balanceMappingList;
  }

}
