import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOmniCardsResponse, IOptionsPsOptionCardExposed } from 'src/app/commonBussinessSRC/psComponents/ps-container-lookup-option/ps-option-card/ps-option-card.component.interface';
import { IOmniCardsRequest, ICardTypeRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsDateFormatPipe } from 'src/app/commonSRC/psPipes/ps-date-format/ps-date-format.pipe';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsLabel } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsSelectSegment, IOptionsPsTemplateView } from '../../commonSRC/psServices/models/ps-common-interface';
import { OmniBasePage } from '../omni-base/omni-base.page';
import { CommonBussinessConstant } from './../../commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';


@Component({
  selector: 'cards-list',
  templateUrl: './cards-list.page.html',
  styleUrls: ['./cards-list.page.scss'],
})
export class CardsListPage extends OmniBasePage implements OnInit {

  private formGroup = new FormGroup({});
  debitCardOptions: IOptionsPsOptionCardExposed = {};
  creditCardOptions: IOptionsPsOptionCardExposed = {};
  public templateViewOptions: IOptionsPsTemplateView = {
    group: this.formGroup
  };
  segmentOptions: IOptionsPsSelectSegment = {
    segmentList: []
  };
  showCreditCards = false;
  showDebitCards = false;
  nocreditcards = false;
  nodebitcards = false;
  cardTypeFlagResponse = [];

  creditCardLabelOptions: IOptionsPsLabel = {
    labelKey: 'credit_card_list_not_available'
  };

  debitCardLabelOptions: IOptionsPsLabel = {
    labelKey: 'debit_card_list_not_available'
  };

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService, private omniPull: OmniPullService, public datepipe: DatePipe) {
    super();
  }

  ngOnInit() {
    super.init();
    PsCommonSettings.oper_ID = 1527;
    this.getCardTypeFlags(ConstantCommon.CARDTYPE_D).then(() => {
      this.getCardTypeFlags(ConstantCommon.CARDTYPE_C).then(() => {
        this.returnCreditCardsList(CommonBussinessConstant.CARD_SEGMENT_NAME_DEBIT);
      });
    });
    this.debitCardOptions.isEditable = true;
    this.debitCardOptions.translate = false;
    this.creditCardOptions.isEditable = true;
    this.creditCardOptions.translate = false;
    this.segmentOptions = {
      segmentList: [{
        selected: true,
        itemValue: CommonBussinessConstant.CARD_SEGMENT_NAME_CREDIT,
        description: this.commonProv.translate('credit_cards_key')
      }, {
        selected: true,
        itemValue: CommonBussinessConstant.CARD_SEGMENT_NAME_DEBIT,
        description: this.commonProv.translate('debit_cards_key')
      }],
      defaultSegment: { itemValue: CommonBussinessConstant.CARD_SEGMENT_NAME_DEBIT, description: this.commonProv.translate('debit_cards_key') }
    };
  }

  onClickSegment(selectedSegment) {
    if (selectedSegment === CommonBussinessConstant.CARD_SEGMENT_NAME_CREDIT) {
      this.creditCardOptions.cardType = CommonBussinessConstant.CREDIT_CARD_TYPE_NAME;
      this.loadCardList(CommonBussinessConstant.CARD_SEGMENT_NAME_CREDIT);
    } else {
      this.debitCardOptions.cardType = CommonBussinessConstant.DEBIT_CARD_TYPE_NAME;
      this.loadCardList(CommonBussinessConstant.CARD_SEGMENT_NAME_DEBIT);
    }
  }


  private loadCardList(segment) {
    this.returnCreditCardsList(segment);
  }

  private returnCreditCardsList(segment) {

    const paramData: IOmniCardsRequest = {
      language: 'EN',
      cardType: segment
    };
    this.omniPull.returnCardList(paramData).then((result) => {
      if (result && result.gridModel.length > 0) {
        if (segment === CommonBussinessConstant.CARD_SEGMENT_NAME_CREDIT) {
          this.creditCardOptions.listOfOptions = [];
          this.creditCardOptions.listOfOptions = this.populateCards(result.gridModel, segment);
        } else {
          this.debitCardOptions.listOfOptions = [];
          this.debitCardOptions.listOfOptions = this.populateCards(result.gridModel, segment);
        }
      } else {
        if (segment === CommonBussinessConstant.CARD_SEGMENT_NAME_CREDIT) {
          this.showCreditCards = true;
          this.showDebitCards = false;
          this.nocreditcards = false;
          this.nodebitcards = true;
        } else {
          this.showCreditCards = false;
          this.showDebitCards = true;
          this.nocreditcards = true;
          this.nodebitcards = false;
        }
      }
    }).catch(error => {
      if (segment === CommonBussinessConstant.CARD_SEGMENT_NAME_CREDIT) {
        this.showCreditCards = true;
        this.showDebitCards = false;
        this.nocreditcards = true;
        this.nodebitcards = false;
      } else {
        this.showCreditCards = false;
        this.showDebitCards = true;
        this.nocreditcards = false;
        this.nodebitcards = true;
      }
      this.loggerP.error('Error: While fetching credit cards list :', error);
    });
  }

  private populateCards(card: Array<any>, cardType): IOmniCardsResponse[] {
    const cardList = [];
    const psDatePipe = new PsDateFormatPipe();
    for (const iterator of card) {
      // const limitFlagObject = ;
      // eslint-disable-next-line no-shadow
      const card: IOmniCardsResponse = {
        cardType: iterator.cardType,
        cardNumber: iterator.cardNo,
        primaryAccount: iterator.additionalRef,
        expiryDate: iterator.expiryDate ? psDatePipe.transform((iterator.expiryDate), ConstantCommon.PREV_DATE_FORMAT) : '--/--/----',
        cardName: iterator.cardName,
        status: iterator.status,
        key: iterator.key,
        nickName: iterator.nickName,
        ownerName: iterator.cardHolderName,
        cardWdLimitAmount: iterator.cardWdLimitAmount,
        applicationId: iterator.applicationId,
        posLimitAmount: iterator.cardPosLimitAmount,
        currencyCode: iterator.currency,
        limitFlags: this.checkLimit(iterator.cardType),
        maxRenewPeriod: iterator.maxRenewPeriod,
        allowRenew: iterator.allowRenew
      };

      if (cardType === CommonBussinessConstant.CARD_SEGMENT_NAME_CREDIT) {
        card.loyaltyPoint = '';
      } else if (cardType === CommonBussinessConstant.CARD_SEGMENT_NAME_DEBIT) {
        card.currencyDesc = iterator.currencyBriefNameEnglish;
      }
      cardList.push(card);
    }
    if (cardType === CommonBussinessConstant.CARD_SEGMENT_NAME_CREDIT) {
      this.showCreditCards = true;
      this.showDebitCards = false;
      this.nocreditcards = false;
      this.nodebitcards = true;
    } else {
      this.showCreditCards = false;
      this.showDebitCards = true;
      this.nocreditcards = true;
      this.nodebitcards = false;
    }
    return cardList;
  }

  private async getCardTypeFlags(cardTypeCode: string) {
    const cardTypeParams: ICardTypeRequest = {
      cardType: cardTypeCode
    };
    const cardTypes = await this.omniPull.returnCardTypes(cardTypeParams).catch(error => {
      this.loggerP.error('Error: While fetching Card types in PsDropdownCardTypesComponent : ', error);
    });
    if (cardTypes && cardTypes.gridModel && cardTypes.gridModel.length > 0) {
      for (const iterator of cardTypes.gridModel) {
        this.cardTypeFlagResponse.push({
          cardTypeId: iterator.ctsCode,
          posLimitOverride: iterator.posLimitOverride,
          wdLimitOverride: iterator.wdLimitOverride,
          posLimitAmount: iterator.posLimitAmount,
          wdLimitAmount: iterator.wdLimitAmount,
          cardTypeObject: iterator
        });
      }
    }
  }

  private checkLimit(cardId) {
    const result = this.cardTypeFlagResponse.find((e) => e.cardTypeId === cardId);
    return result;
  }

}
