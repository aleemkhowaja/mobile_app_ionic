import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMapKeyValue, IOmniCardsRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsComplexLookUpComponentExposed } from '../../ps-complex-components/ps-complex-lookup/ps-complex-lookup.component.interfaces';
import { PsOptionCardComponent } from '../../ps-container-lookup-option/ps-option-card/ps-option-card.component';
import { IOmniCardsResponse } from '../../ps-container-lookup-option/ps-option-card/ps-option-card.component.interface';
import { IOptionsPsLookupDebitCardsExposed } from './ps-lookup-debit-cards.component.interfaces';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';

/**
 * @author Aftab.Ali
 * @since 11/02/2020
 *
 * <p> PsLookupDebitCardsComponent is a lookup component to show debit cards list fetched from server</p>
 */
@Component({
  selector: 'ps-lookup-debit-cards',
  templateUrl: './ps-lookup-debit-cards.component.html',
  styleUrls: ['./ps-lookup-debit-cards.component.scss'],
})
export class PsLookupDebitCardsComponent extends PsBaseFieldComponent implements OnInit {

  public formGroup: FormGroup = new FormGroup({});
  @Input() options: IOptionsPsLookupDebitCardsExposed = {
    requestObject: null
  };
  public complexLookupOptions: IOptionsPsComplexLookUpComponentExposed = {
    requestObject: null,
    notFoundMessage: 'no_debit_card_found_key'
  };
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onBenificiarytChange: EventEmitter<any> = new EventEmitter<any>();
  public listOfDebitCards?: any[];
  public labelValuesMap = new Map<string, IMapKeyValue>();
  public debitCardRequestParam: IOmniCardsRequest = {};

  constructor(
    public commonService: PsCommonService,
    logger: LoggerService,
    private omniPull?: OmniPullService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    super.init();
    this.loadDebitCards();
    this.complexLookupOptions.title = 'title_key';
    this.complexLookupOptions.subTitle = 'sub_title_key';
    this.complexLookupOptions.labelsValueMap = this.labelValuesMap;
    if (this.options && this.options.component) {
      this.complexLookupOptions.component = this.options.component;
    } else {
      this.complexLookupOptions.component = PsOptionCardComponent;
    }
    this.commonProv.copyObject(this.complexLookupOptions, this.options, false);
  }

  /**
   * populating debit card
   */
  private loadDebitCards() {
    this.debitCardRequestParam = {};
    const cifInfo = this.commonProv.session.getValueOf(ConstantCommon.USERINFO);
    this.debitCardRequestParam.vsBranchCode = cifInfo.cifBranch;
    this.debitCardRequestParam.cardType = 'Debit';
    this.returnDebitCards(this.debitCardRequestParam);
  }

  /**
   * fetching debit cards from server
   * @param requestData IOmniBeneficiaryRequest
   */
  private async returnDebitCards(requestData: IOmniCardsRequest) {
    const result = await this.omniPull.returnCardList(requestData).catch(error => {
      this.complexLookupOptions.listOfOptions = [];
      this.logger.error('Error: While fetching debit cards in PsLookupDebitCardsComponent :', error);
    });

    if (result && result.gridModel.length > 0) {
      this.complexLookupOptions.listOfOptions = this.populateDebitCards(result.gridModel);
    } else {
      this.complexLookupOptions.listOfOptions = [];
    }
  }

  onChangeItem(event) {
    this.onBenificiarytChange.emit(event.item);
  }

  /**
   * customizing debit card object
   * @param gridModel
   */
  private populateDebitCards(debitCards: Array<any>): IOmniCardsResponse[] {
    this.listOfDebitCards = [];
    for (const iterator of debitCards) {
      if (iterator.cardNo && iterator.cardType === CommonBussinessConstant.DEBIT_CARD_TYPE ) {
      const debitCard: IOmniCardsResponse = {
        cardNumber: iterator.cardNo,
        cardName: iterator.cardName,
        oldCardName: iterator.oldCardName,
        cardType: iterator.cardType ,
        cardTypeName: iterator.cardType === CommonBussinessConstant.DEBIT_CARD_TYPE ? CommonBussinessConstant.DEBIT_CARD_TYPE_NAME :  CommonBussinessConstant.CREDIT_CARD_TYPE_NAME ,
        posLimitAmount: iterator.posLimitAmount,
        withdrawalLimit: iterator.cardWdLimitAmount,
        status: iterator.status,
        limitCheckingBy: iterator.limitCheckingBy,
        currencyDesc: iterator.currencyDesc,
        expiryDate: iterator.expiryDate,
        currencyCountryFlag: iterator.currencyCountryFlag,
        cardNumberMask: iterator.cardNumberMask,
        primaryAccount: iterator.additionalRef,
        cardLimit: iterator.cardLimit,
        remainingBalance: iterator.remainingBalance,
        settlementRate: iterator.settlementRate,
        debitOrCredit: iterator.debitOrCredit,
        outstandingBalance: iterator.outstandingBalance,
        ownerName: iterator.cardHolderName,
        loyaltyPoint: iterator.loyaltyPoint,
        lookupKey: iterator.cardNo,
        applicationId: iterator.applicationId,
        additionalRef: iterator.additionalRef,
        accGl: iterator.accGl,
        branch: iterator.branch,
        cif: iterator.cif,
        currency: iterator.currency,
        serialNo: iterator.serialNo
      };
      this.listOfDebitCards.push(debitCard);
    }
    }
    return this.listOfDebitCards;
  }


}

