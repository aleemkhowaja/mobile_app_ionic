import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { IOptionsPsComplexDealDetailsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-deal-details/ps-complex-deal-details-interfaces.component';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsCurrencyPipe } from 'src/app/commonSRC/psPipes/ps-currency/ps-currency.pipe';
import { PsDateFormatPipe } from 'src/app/commonSRC/psPipes/ps-date-format/ps-date-format.pipe';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IDealResponse, IOmniDealsListRequest } from '../../commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsActionButton, IOptionsPsTemplateView } from '../../commonSRC/psServices/models/ps-common-interface';
import { OmniBasePage } from '../omni-base/omni-base.page';


@Component({
  selector: 'app-financing-list',
  templateUrl: './financing-list.page.html',
  styleUrls: ['./financing-list.page.scss'],
})


export class FinancingListPage extends OmniBasePage implements OnInit {

  dealListOptions: IOptionsPsComplexDealDetailsExposed = {
    containerLookupOption: {
    },
    listOfOptions: [],
    isEditable: true
  };
  showMyDeals = true;
  formGroup = new FormGroup({});

  frButtonOptions: IOptionsPsActionButton = {
    labelKey: 'letter_of_credit_request_key',
    group: this.formGroup
  };

  constructor(
    public commonService: PsCommonService,
    public logger: LoggerService,
    private omniPull?: OmniPullService,
    public navService?: PsNavigatorService
  ) {
    super();
    // this.populateHeaderValueMap();
  }

  public templateViewOptions: IOptionsPsTemplateView = {
    group: this.formGroup
  };

  async ngOnInit() {
    this.loadDeals();

  }

  loadDeals() {
    const DealListRequest: IOmniDealsListRequest = {
      status: 'A'
    };
    this.returnDealList(DealListRequest);
  }

  /**
   * fetching general deal list from server
   * @param requestData IOmniAccountRequest
   */

  private async returnDealList(requestData?: IOmniDealsListRequest) {
    const result = await this.omniPull.returnDealList(requestData).catch(error => {
      this.logger.error('Error: While fetching deals in FinancingListPage :', error);
    });

    if (result && result.gridModel.length > 0) {
      const dealsList: IDealResponse[] = result.gridModel;
      this.dealListOptions.listOfOptions = this.handelDealResponseLabels(dealsList);
      this.dealListOptions.itemList = this.handelDealResponseLabels(dealsList);
    } else {
      this.dealListOptions.listOfOptions = [];
    }
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



  toLCRequest() {
    const navigationExtras: NavigationExtras = {
      queryParams: {}
    };
    this.navService.navigateForward('letter-of-credit-request', navigationExtras);
  }
}
