import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IMapKeyValue, IOptionsPsContainerLookupOptionComponentExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsOptionCardExposed } from './ps-option-card.component.interface';



@Component({
  selector: 'ps-option-card',
  templateUrl: './ps-option-card.component.html',
  styleUrls: ['./ps-option-card.component.scss'],
})
export class PsOptionCardComponent extends PsBaseFieldComponent implements OnInit {
  @Input() options: IOptionsPsOptionCardExposed;
  public labelValuesMap = new Map<string, IMapKeyValue>();
  public headerMap = new Map<string, IMapKeyValue>();
  private showSingleAccount = false;
  public requestMap = new Map<string, string>();
  public editRequestMap = new Map<string, string>();

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onClickCard = new EventEmitter<any>();

  constructor(commonProv: PsCommonService, private cdRef?: ChangeDetectorRef, private omniPull?: OmniPullService) {
    super(commonProv, commonProv.logger);
  }

  ngOnInit() {
    super.init();
    this.populateHeaderValueMap();
    if (this.options.showOnlyList === null || this.options.showOnlyList === undefined) {
      this.options.showOnlyList = false;
    }
    if (this.options.cardAction === null || this.options.cardAction === undefined) {
      this.options.cardAction = false;
    }
    if (this.options && this.options.listOfOptions) {
      this.options.itemList = this.options.listOfOptions;
    }
  }

  getContainerLookUpOptions(val) {
    return this.prepareLookUp(val);
  }

  private prepareLookUp(card: any): any {
    const lookupDetails: IOptionsPsContainerLookupOptionComponentExposed = {};
    lookupDetails.currencyFlag = 'currencyBriefNameEnglish';
    lookupDetails.labelsValueMap = this.labelValuesMap;
    lookupDetails.headerMap = this.headerMap;
    lookupDetails.formGroup = this.options.group;
    lookupDetails.balanceMapping = this.balanceMapping();
    lookupDetails.isEditable = this.options.isEditable;
    lookupDetails.translateSubTitle = this.options.translate;
    if (!this.options.cardAction) {
      lookupDetails.editActionUrl = PsCommonBusinessSettings.serviceUrl.personalizationNicknameEndPoint;
      lookupDetails.requestMap = this.requestMap;
      lookupDetails.editRequestMap = this.editRequestMap;
      lookupDetails.pageData = {
        operID: CommonBussinessConstant.CARD_STATEMENT,
        title: 'card_report_key'
      };
      lookupDetails.actionDetailsOptions = [
        {
          label: 'block_key',
          actionHyperlink: {
            iconOptions: {
              iconName: 'lock-closed'
            },
            route: 'card-management',
            pageOptions: {
              operId: CommonBussinessConstant.BLOCK_DEBIT_CARD,
              iconName: 'lock-closed',
              title: 'block_card_key',
            },
            navigationOptions: {
              queryParams: { action: CommonBussinessConstant.CARD_ACTION_TYPE_BLOCK },
            },
          }
        }, {
          label: 'pin_change_key',
          actionHyperlink: {
            iconOptions: {
              iconName: 'keypad'
            },
            route: 'card-pin-request',
            pageOptions: {
              operId: this.options.cardType === CommonBussinessConstant.CREDIT_CARD_TYPE_NAME ? CommonBussinessConstant.CHANGE_CREDIT_CARD_PIN : CommonBussinessConstant.CHANGE_DEBIT_CARD_PIN,
              iconName: 'keypad',
              title: 'card_pin_change_key',
            },
            navigationOptions: {
              queryParams: { action: CommonBussinessConstant.CARD_ACTION_TYPE_PIN_CHANGE },
            },
          }
        }, {
          label: 'pin_reset_key',
          actionHyperlink: {
            iconOptions: {
              iconName: 'keypad'
            },
            route: 'card-pin-request',
            pageOptions: {
              operId: this.options.cardType === CommonBussinessConstant.CREDIT_CARD_TYPE_NAME ? CommonBussinessConstant.RESET_CREDIT_CARD_PIN : CommonBussinessConstant.RESET_DEBIT_CARD_PIN,
              iconName: 'keypad',
              title: 'card_pin_reset_key',
            },
            navigationOptions: {
              queryParams: { action: CommonBussinessConstant.CARD_ACTION_TYPE_PIN_RESET },
            },
          }
        }
      ];
      if (card.limitFlags && (((card.limitFlags.wdLimitOverride === '1')) || ((card.limitFlags.posLimitOverride === '1')))) {
        lookupDetails.actionDetailsOptions.push({
          label: 'limit_update_key',
          actionHyperlink: {
            iconOptions: {
              iconName: 'sync'
            },
            route: 'card-management',
            pageOptions: {
              operId: this.options.cardType === CommonBussinessConstant.CREDIT_CARD_TYPE_NAME ? CommonBussinessConstant.UPDATE_CREDIT_CARD_LIMIT : CommonBussinessConstant.UPDATE_DEBIT_CARD_LIMIT,
              iconName: 'sync',
              title: 'card_limit_update_key',
            },
            navigationOptions: {
              queryParams: { action: CommonBussinessConstant.CARD_ACTION_TYPE_LIMIT_UPDATE },
            },
          }
        }
        );
      }
      const renewOption = {
        label: 'renew_card_key',
        actionHyperlink: {
          iconOptions: {
            iconName: 'refresh'
          },
          route: 'card-management',
          pageOptions: {
            operId: CommonBussinessConstant.RENEW_DEBIT_CARD,
            iconName: 'refresh',
            title: 'renew_card_key',
          },
          navigationOptions: {
            queryParams: { action: CommonBussinessConstant.CARD_ACTION_TYPE_RENEW },
          },
        }
      };
      const dateToBeCheckOut = new Date(card.expiryDate);
      const expiryDate = new Date(card.expiryDate);
      const today = new Date();
      if (card.maxRenewPeriod) {
        dateToBeCheckOut.setMonth(dateToBeCheckOut.getMonth() + card.maxRenewPeriod);
      }

      if (today > expiryDate && card.allowRenew === '1') {
        if (Number(card.maxRenewPeriod) > 0 && today <= dateToBeCheckOut) {
          lookupDetails.actionDetailsOptions.push(renewOption);
        } else {
          // lookupDetails.actionDetailsOptions.push(renewOption);
        }
      }
      lookupDetails.statementOptions = {
        buttonIcon: 'list-box',
        redirectUrl: 'card-statement-report'
      };
    } else {
      lookupDetails.pageData = {};
      lookupDetails.actionDetailsOptions = [];
      lookupDetails.statementOptions = {};
    }
    return lookupDetails;
  }

  private populateHeaderValueMap() {
    let cardNumberMap: IMapKeyValue = {};
    let expiryDateMap: IMapKeyValue = {};
    let holderNameMap: IMapKeyValue = {};
    let headerTitleMap: IMapKeyValue = {};
    let headerSubtitleMap: IMapKeyValue = {};
    let currencyMap: IMapKeyValue = {};
    let cardStatusMap: IMapKeyValue = {};

    cardNumberMap = {
      key: 'cardNumber',
      value: '',
      formGroupMap: {
        placeHolder: 'enter_card_type',
        fcName: 'cardNumber',
      }
    };

    expiryDateMap = {
      key: 'expiryDate',
      value: ''
    };

    holderNameMap = {
      key: 'ownerName',
      value: ''
    };

    currencyMap = {
      key: 'currencyDesc',
      value: ''
    };

    cardStatusMap = {
      key: 'status',
      value: ''
    };

    headerTitleMap = {
      key: 'title',
      value: 'cardName',
      isEdit: false,
      formGroupMap: {
        placeHolder: 'enter_card_type',
        fcName: 'cardType',
      }
    };

    headerSubtitleMap = {
      key: 'subTitle',
      value: 'ownerName',
      isEdit: true,
      formGroupMap: {
        placeHolder: 'enter_cardName',
        fcName: 'cardName',
      }
    };

    // key here will be used as label in look up details component
    this.labelValuesMap.set('card_number_key', cardNumberMap);
    this.labelValuesMap.set('currency_key', currencyMap);
    this.labelValuesMap.set('card_status_key', cardStatusMap);
    this.labelValuesMap.set('name_on_card', holderNameMap);
    this.labelValuesMap.set('expiry_date_key', expiryDateMap);
    // this.labelValuesMap.set('primary_account_key', accountNumberMap);
    this.requestMap.set('nickNameNumber', 'key');
    this.requestMap.set('oldNickName', 'ownerName');
    this.editRequestMap.set('newNickName', 'ownerName');
    this.editRequestMap.set('type', 'C');

    // if (this.options.cardType === CommonBussinessConstant.CREDIT_CARD_TYPE_NAME) {
    //   this.labelValuesMap.set('settlement_amount_key', accountNumberMap);
    //   this.labelValuesMap.set('withdrawal_limit_key', accountNumberMap);
    //   this.labelValuesMap.set('remaining_withdrawal_limit_key', accountNumberMap);
    //   this.labelValuesMap.set('pos_limit_key', accountNumberMap);
    //   this.labelValuesMap.set('remaining_pos_limit_key', accountNumberMap);
    //   this.labelValuesMap.set('payment_percentage_key', accountNumberMap);
    //   this.labelValuesMap.set('billing_cycle_key', accountNumberMap);
    //   this.labelValuesMap.set('loyalty_points_key', loyaltyPointsMap);
    // }
    // will be used as header to template card in look up details component
    this.headerMap.set('title', headerTitleMap);
    this.headerMap.set('subTitle', headerSubtitleMap);

  }

  updateCard(card: any) {
    if (card && this.options.listOfOptions) {
      this.options.itemList = this.options.listOfOptions.filter(acct => acct === card);
      this.options.item = this.options.itemList[0];
      this.showSingleAccount = !this.showSingleAccount;
      this.options.showItemPopUp = !this.options.showItemPopUp;
      // this.options.showSelectedCard = false;
    }
    this.onClickCard.emit(this.options);
  }

  private balanceMapping(): any[] {
    const balanceMappingList = [
      {
        key: 'outstanding_balance_key',
        value: 'outstandingBalance'
      },
      {
        key: 'available_balance_key',
        value: 'remainingBalance'
      }
    ];

    return balanceMappingList;
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewChecked() {
    this.cdRef.markForCheck();
  }

}
