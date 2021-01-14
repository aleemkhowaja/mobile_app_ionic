import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDealResponse, IMapKeyValue, IOmniDealsListRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { PsCurrencyPipe } from 'src/app/commonSRC/psPipes/ps-currency/ps-currency.pipe';
import { PsDateFormatPipe } from 'src/app/commonSRC/psPipes/ps-date-format/ps-date-format.pipe';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsComplexLookUpComponentExposed } from '../../ps-complex-components/ps-complex-lookup/ps-complex-lookup.component.interfaces';
import { IOptionsPsLookupOwnDealsExposed } from './ps-lookup-own-deals.component.interfaces';

@Component({
  selector: 'ps-lookup-own-deals',
  templateUrl: './ps-lookup-own-deals.component.html',
  styleUrls: ['./ps-lookup-own-deals.component.scss'],
})
export class PsLookupOwnDealsComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsLookupOwnDealsExposed={
    requestObject:null
  }
  @Output() public onDealChange: EventEmitter<any> = new EventEmitter<any>();

  public complexLookupOptions: IOptionsPsComplexLookUpComponentExposed = {
    requestObject: null,
    notFoundMessage: 'no_deals_found_key'
  };

  public labelValuesMap = new Map<string, IMapKeyValue>();
  
  constructor(public commonService: PsCommonService,
    logger: LoggerService,
    private omniPull?: OmniPullService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    super.init();
    this.loadDeals();

    this.complexLookupOptions.title = 'title_key';
    this.complexLookupOptions.subTitle = 'sub_title_key';
    this.complexLookupOptions.labelsValueMap = this.labelValuesMap;
    this.commonProv.copyObject(this.complexLookupOptions, this.options, false);
  }

  loadDeals() {
    let DealListRequest: IOmniDealsListRequest={
      status:'A'
    };
    this.returnDealList(DealListRequest);
  }

  private async returnDealList(DealListRequest?: IOmniDealsListRequest) {
    const result = await this.omniPull.returnDealList(DealListRequest).catch(error => {
      this.complexLookupOptions.listOfOptions = [];
      this.logger.error('Error: While fetching deals in PsLookupOwnDealsComponent :', error);
    });
    if (result && result.gridModel.length > 0) {
      
      this.complexLookupOptions.listOfOptions = this.handelDealResponseLabels(result.gridModel);
    }
    else {
      this.complexLookupOptions.listOfOptions = [];
    }
  }


  onChangeItem(event) {
    this.onDealChange.emit(event);
  }

  handelDealResponseLabels(result: IDealResponse[]): any[] {
    let deals: any[] = [];
    const psCurrency = new PsCurrencyPipe();
    const prevFormat = 'DD/MM/YYYY';
    const psDatePipe = new PsDateFormatPipe();
    for (const iterator of result) {
      const deal: any = {
        title: (iterator.productClassName || '') + '  ' + (iterator.dealCurrencyDescription || ''),
        subTitle: iterator.nickName || iterator.dealNumber,
        nextPaymentDate: iterator.nextPaymentDate ? psDatePipe.transform((iterator.nextPaymentDate), prevFormat) : '--/--/----',
        nextPaymentVal: psCurrency.transform((iterator.nextPaymentAmount || 0).toString(), 2) + ' ' + (iterator.dealCurrencyDescription || ''),
        paidAmount: psCurrency.transform((iterator.paidAmount || 0).toString(), 2) + ' ' + (iterator.dealCurrencyDescription || ''),
        amount: psCurrency.transform((iterator.financeAmount || 0).toString(), 2) + ' ' + (iterator.dealCurrencyDescription || ''),
        lastPaymentDate: iterator.lastSettledDate ? psDatePipe.transform((iterator.lastSettledDate), prevFormat) : '--/--/----',
        lastPaymentAmount: psCurrency.transform((iterator.lastSettledAmount || 0).toString(), 2) + ' ' + (iterator.dealCurrencyDescription || ''),
        maturityDate: iterator.maturityDate ? psDatePipe.transform((iterator.maturityDate), prevFormat) : '--/--/----',
        outstandingBalance: psCurrency.transform((iterator.outstandingBalance || 0).toString(), 2) + ' ' + (iterator.dealCurrencyDescription || ''),
        noOfRemainingIns: (iterator.noOfRemainingInstallment || 0),
        currency: (iterator.dealCurrencyDescription || ''),
        financingType: (iterator.financingType || ''),
        periodicityPayment: this.getFormattedPeriodicity((iterator.installmentAmount || 0), (iterator.dealCurrencyDescription || ''), iterator.paymentPeriodicityType, iterator.paymentPeriodicityNumber),//(iterator.paymentPeriodicityNumber || 0),
        pastDues: psCurrency.transform((iterator.pastDueAmount || 0).toString(), 2) + ' ' + (iterator.dealCurrencyDescription || ''),
        key: iterator.key,
        dealNbr: iterator.dealNumber,
        lookupKey: iterator.key,
        currencyCode: iterator.dealCurrency
      };
      deals.push(deal);
    }
    return deals;
  }


  private getFormattedPeriodicity(installmentAmount: number, currency: string, paymentPeriodicityType: string, paymentPeriodicityNumber) {
    // it should return result like "`Monthly Payment: 100 USD`"
    let periodicityDesc = "";
    let period = '';
    switch (paymentPeriodicityType) {
      case 'M':
        if (paymentPeriodicityNumber === '1') {
          period = 'Monthly'
        } else if (paymentPeriodicityNumber === '2') {
          period = 'Bimonthly'
        } else if (paymentPeriodicityNumber === '3') {
          period = 'Quarterly'
        } else if (paymentPeriodicityNumber === '6') {
          period = 'Half Yearly'
        } else if (paymentPeriodicityNumber === '12') {
          period = 'Yearly'
        }
        break;
      case 'D':
        period = 'Every ' + paymentPeriodicityNumber + ' Days';
        break;
      default:
        break;
    }
    periodicityDesc = period ? period : '--';
    return periodicityDesc;
  }

}
