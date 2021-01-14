import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IMapKeyValue, IOmniCardsRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsComplexLookUpComponentExposed } from '../../ps-complex-components/ps-complex-lookup/ps-complex-lookup.component.interfaces';
import { PsOptionCardComponent } from '../../ps-container-lookup-option/ps-option-card/ps-option-card.component';
import { IOmniCardsResponse } from '../../ps-container-lookup-option/ps-option-card/ps-option-card.component.interface';
import { IOptionsPsLookupCreditCardsExposed } from './ps-lookup-credit-cards.component.interfaces';

/**
 * @author Aftab.Ali
 * @since 11/02/2020
 *
 * <p> PsLookupCreditCardsComponent is a lookup component to show credit cards list fetched from server</p>
 */
@Component({
  selector: 'ps-lookup-credit-cards',
  templateUrl: './ps-lookup-credit-cards.component.html',
  styleUrls: ['./ps-lookup-credit-cards.component.scss'],
})
export class PsLookupCreditCardsComponent extends PsBaseFieldComponent implements OnInit {

  public formGroup: FormGroup = new FormGroup({});
  @Input() options: IOptionsPsLookupCreditCardsExposed = {
    requestObject: null
  };
  public complexLookupOptions: IOptionsPsComplexLookUpComponentExposed = {
    requestObject: null,
    notFoundMessage: 'no_credit_card_found_key'
  };
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onCreditCardChange: EventEmitter<any> = new EventEmitter<any>();
  public listOfCreditCards?: any[];
  public labelValuesMap = new Map<string, IMapKeyValue>();
  public creditCardRequestParam: IOmniCardsRequest = {};

  constructor(
    public commonService: PsCommonService,
    logger: LoggerService,
    private omniPull?: OmniPullService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    super.init();
    this.loadCreditCards();
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
   * populating credit card
   */
  private loadCreditCards() {
    this.creditCardRequestParam = {};
    const cifInfo = this.commonProv.session.getValueOf(ConstantCommon.USERINFO);
    this.creditCardRequestParam.vsBranchCode = cifInfo.cifBranch;
    this.creditCardRequestParam.cardType = 'Credit';
    this.returnCreditCards(this.creditCardRequestParam);
  }

  /**
   * fetching credit cards from server
   * @param requestData IOmniBeneficiaryRequest
   */
  private async returnCreditCards(requestData: IOmniCardsRequest) {
    const result = await this.omniPull.returnCardList(requestData).catch(error => {
      this.complexLookupOptions.listOfOptions = [];
      this.logger.error('Error: While fetching credits cards in PsLookupCreditCardsComponent :', error);
    });

    if (result && result.gridModel.length > 0) {
      this.complexLookupOptions.listOfOptions = this.populateCreditCards(result.gridModel);
    } else {
      this.complexLookupOptions.listOfOptions = [];
    }
  }

  onChangeItem(event) {
    this.onCreditCardChange.emit(event);
  }

  /**
   * customizing debit card object
   * @param gridModel
   */
  private populateCreditCards(creditCards: Array<any>): IOmniCardsResponse[] {
    this.listOfCreditCards = [];
    for (const iterator of creditCards) {
      if (iterator.cardNo &&  iterator.cardType !== CommonBussinessConstant.DEBIT_CARD_TYPE) {
      const creditCard: IOmniCardsResponse = {
        cardNumber: iterator.cardNo,
        cardName: iterator.cardName,
        oldCardName: iterator.oldCardName,
        cardType: iterator.cardType ,
        cardTypeName: iterator.cardType === CommonBussinessConstant.DEBIT_CARD_TYPE ? CommonBussinessConstant.DEBIT_CARD_TYPE_NAME :  CommonBussinessConstant.CREDIT_CARD_TYPE_NAME ,
        posLimitAmount: iterator.posLimitAmount,
        withdrawalLimit: iterator.withdrawalLimit,
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
        ownerName: iterator.ownerName,
        loyaltyPoint: iterator.loyaltyPoint,
        lookupKey: iterator.cardNo,
        applicationId: iterator.applicationId,
        additionalRef: iterator.additionalRef,
        accGl: iterator.accGl,
        branch: iterator.branch,
        cif: iterator.cif,
        currency: iterator.currency,
        serialNo: iterator.serialNo,
        cardNo: iterator.cardNo,

      };
      this.listOfCreditCards.push(creditCard);
    }
  }
    return this.listOfCreditCards;
  }


}

