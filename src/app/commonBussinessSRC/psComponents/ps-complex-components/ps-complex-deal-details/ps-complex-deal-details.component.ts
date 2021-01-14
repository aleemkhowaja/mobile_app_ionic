import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMapKeyValue, IOptionsPsContainerLookupOptionComponentExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';

import { PsBaseFieldComponent } from './../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from './../../../../commonSRC/psServices/logger/logger.service';
import { PsCommonService } from './../../../../commonSRC/psServices/ps-common/ps-common.service';
import { IDealResponse } from './../../../psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsComplexDealDetailsExposed } from './ps-complex-deal-details-interfaces.component';

@Component({
  selector: 'ps-complex-deal-details',
  templateUrl: './ps-complex-deal-details.component.html',
  styleUrls: ['./ps-complex-deal-details.component.scss'],
})
export class PsComplexDealDetailsComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsComplexDealDetailsExposed;
  @Input() itemCard: IDealResponse[];
  @Output() onClickCard = new EventEmitter<any>();

  item: any;
  public containerLookUpOptions: IOptionsPsContainerLookupOptionComponentExposed = {};
  defaultConf: IOptionsPsComplexDealDetailsExposed;
  public dealsLabelValuesMap = new Map<string, IMapKeyValue>();
  public dealsHeaderMap = new Map<string, IMapKeyValue>();
  public requestMap = new Map<string, string>();
  public editRequestMap = new Map<string, string>();
  private showSingleAccount = false;

  constructor(private commonP: PsCommonService, private loggerC: LoggerService) {
    super(commonP, loggerC);
    this.populateHeaderValueMap();
  }

  ngOnInit() {
    //this.itemCards = this.options.containerLookupOption.itemList;
    //this.handelResponseLabels();
    this.containerLookUpOptions.labelKey = this.options.labelKey;
    this.containerLookUpOptions.fcName = this.options.fcName;
    this.containerLookUpOptions.currencyFlag = 'currencyBriefNameEnglish';
    this.containerLookUpOptions.labelsValueMap = this.dealsLabelValuesMap;
    this.containerLookUpOptions.headerMap = this.dealsHeaderMap;
    this.containerLookUpOptions.formGroup = this.options.group;
    this.containerLookUpOptions.balanceMapping = this.balanceMapping();
    this.containerLookUpOptions.isEditable = this.options.isEditable;
    this.containerLookUpOptions.editActionUrl = PsCommonBusinessSettings.serviceUrl.personalizationNicknameEndPoint;
    this.containerLookUpOptions.requestMap = this.requestMap;
    this.containerLookUpOptions.editRequestMap = this.editRequestMap;
    this.containerLookUpOptions.pageData = {
      operID: ConstantCommon.DEAL_REPORT,
      title: 'deal_report_key'
    };

    if (this.options && this.options.listOfOptions) {
      this.options.itemList = this.options.listOfOptions;
    }

    this.containerLookUpOptions.actionDetailsOptions = [];
    this.containerLookUpOptions.statementOptions = {
      buttonIcon: 'list-box',
      redirectUrl: 'deal-statement-report'
    };

  }

  private balanceMapping(): any[] {
    const balanceMappingList = [
      {
        key: 'settled_amount_key',
        value: 'paidAmount'
      },
      {
        key: 'outstanding_balance_key',
        value: 'outstandingBalance'
      },
    ];

    return balanceMappingList;
  }

  private populateHeaderValueMap() {
    let headerTitleMap: IMapKeyValue = {};
    let subTitleMap: IMapKeyValue = {};
    let nextPaymentDateMap: IMapKeyValue = {};
    let nextPaymentValMap: IMapKeyValue = {};
    let amountMap: IMapKeyValue = {};
    let settledAmountMap: IMapKeyValue = {};
    let maturityDateMap: IMapKeyValue = {};
    let pastDuesMap: IMapKeyValue = {};
    let lastPaymentDateMap: IMapKeyValue = {};
    let lastPaymentAmountMap: IMapKeyValue = {};
    let outstandingBalanceMap: IMapKeyValue = {};
    let noOfRemainingInsMap: IMapKeyValue = {};
    let periodicityPaymentMap: IMapKeyValue = {};

    nextPaymentDateMap = {
      key: 'nextPaymentDate',
      value: '---/--/----'
    };

    nextPaymentValMap = {
      key: 'nextPaymentVal',
      value: '0.0'
    };

    settledAmountMap = {
      key: 'paidAmount',
      value: '0.0'
    };

    amountMap = {
      key: 'amount', 
      value: '0.0'
    };

    maturityDateMap = {
      key: 'maturityDate',
      value: '---/--/----',
    }

    pastDuesMap = {
      key: 'pastDues',
      value: '0.0'
    }

    lastPaymentDateMap = {
      key: 'lastPaymentDate',
      value: '---/--/----',
    };

    lastPaymentAmountMap = {
      key: 'lastPaymentAmount',
      value: '0.0'
    };

    outstandingBalanceMap = {
      key: 'outstandingBalance', 
      value: '0.0'
    };

    noOfRemainingInsMap = {
      key: 'noOfRemainingIns', 
      value: '0'
    };

    periodicityPaymentMap = {
      key: 'periodicityPayment',
      value: '0'
    };

    headerTitleMap = {
      key: 'title',
      value: 'title',
      isEdit: false,
      formGroupMap: {
        placeHolder: 'title_key',
        fcName: 'title',
      }
    };
    subTitleMap = {
      key: 'subTitle',
      value: 'subTitle',
      isEdit: true,
      formGroupMap: {
        placeHolder: 'enter_deal_nick',
        fcName: 'subTitle',
      }
    };

    this.dealsLabelValuesMap.set('financing_amount_key', amountMap);
    this.dealsLabelValuesMap.set('maturity_date_key', maturityDateMap);
    this.dealsLabelValuesMap.set('payment_key', periodicityPaymentMap);
    this.dealsLabelValuesMap.set('no_remaining_installments_key', noOfRemainingInsMap);

    // this.dealsLabelValuesMap.set('settled_amount_key', settledAmountMap);
    // this.dealsLabelValuesMap.set('outstanding_balance_key', outstandingBalanceMap); 
    this.dealsLabelValuesMap.set('past_dues_key', pastDuesMap);
    this.dealsLabelValuesMap.set('last_payment_date_key', lastPaymentDateMap);
    this.dealsLabelValuesMap.set('last_payment_amount_key', lastPaymentAmountMap);
    this.dealsLabelValuesMap.set('next_payment_date_key', nextPaymentDateMap);
    this.dealsLabelValuesMap.set('next_payment_key', nextPaymentValMap);

    // will be used as header to template card in look up details component
    this.dealsHeaderMap.set('title', headerTitleMap);
    this.dealsHeaderMap.set('subTitle', subTitleMap);
    this.requestMap.set('nickNameNumber', 'key');
    this.requestMap.set('oldNickName', 'subTitle');
    this.editRequestMap.set('newNickName', 'subTitle');
    this.editRequestMap.set('type', 'A');

  }

  updateCard(event:any){
    if (event && this.options.listOfOptions) {
      this.options.itemList = this.options.listOfOptions.filter(acct => acct === event);
      this.options.item = this.options.itemList[0];
      this.showSingleAccount = !this.showSingleAccount;
      this.options.showItemPopUp = !this.options.showItemPopUp;
      // this.options.showSelectedCard = false;
    }
    this.onClickCard.emit(this.options);
  }
}
