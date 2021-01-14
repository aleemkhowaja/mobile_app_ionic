import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOmniScheduledTransfer, IOptionsPsOptionScheduledTransferExposed } from 'src/app/commonBussinessSRC/psComponents/ps-scheduled-transfers-list/ps-scheduled-transfers-list.component.interface';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { ITransactionResponse } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsDateFormatPipe } from 'src/app/commonSRC/psPipes/ps-date-format/ps-date-format.pipe';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsLabel, IOptionsPsTemplateView } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { OmniBasePage } from '../omni-base/omni-base.page';



@Component({
  selector: 'app-scheduled-transfers-list',
  templateUrl: './scheduled-transfers-list.page.html',
  styleUrls: ['./scheduled-transfers-list.page.scss'],
})
export class ScheduledTransfersListPage extends OmniBasePage implements OnInit {
  requestWasSent = true;
  public showTransaction = true;
  private psDatePipe = new PsDateFormatPipe();
  noTransfersFound = false;
  sheduledTransferListOptions: IOptionsPsOptionScheduledTransferExposed;
  private formGroup = new FormGroup({});

  public templateViewOptions: IOptionsPsTemplateView = {
    group: this.formGroup
  };

  noTransfersOptions: IOptionsPsLabel = {
    labelKey: 'no_transfers_available_key'
  };

  constructor(public logger: LoggerService, private omniPull?: OmniPullService) {
    super();
  }

  ngOnInit() {
    super.init();
  }
  ionViewWillEnter() {
    super.viewWillEnter();
    this.sheduledTransferListOptions = {
      isEditable: true,
    };
    this.loadScheduledTransfers();
  }

  loadScheduledTransfers() {
    const generalRequestData: any = {
      commonParametersList: {
        //  status: "T"
        //  fromAmount: "1",
        //  toAmount: "100",
      }
    };
    this.returnScheduledTransfers(generalRequestData);
  }

  private async returnScheduledTransfers(requestData: any) {
    this.requestWasSent = true;
    const result = await this.omniPull.returnTransactionsList(requestData).catch(error => {
      this.logger.error('Error: While fetching scheduled transfers  :', error);
    });

    if (result && result.gridModel.length > 0) {
      this.sheduledTransferListOptions.listOfOptions = this.populateScheduledTransfers(result.gridModel);
    } else {
      this.noTransfersFound = true;
      this.sheduledTransferListOptions.listOfOptions = [];
    }
    this.requestWasSent = false;
  }



  private populateScheduledTransfers(transactionslist: ITransactionResponse[]): IOmniScheduledTransfer[] {
    const transactions: IOmniScheduledTransfer[] = [];
    const psDatePipe = new PsDateFormatPipe();
    for (const iterator of transactionslist) {
      // if (iterator.transferTypeOperId != undefined) {
      const trans: IOmniScheduledTransfer = {
        transferType: (iterator.transferTypeOperId) ? this.commonProv.translate(this.commonProv.getPageByOperId(iterator.transferTypeOperId).OPER_NAME) : iterator.transferType ? this.getTransferTypeInfo(iterator.transferType, 2) : '-----',
        transactionAmount: iterator.amount + ' (' + iterator.currencyBriefNameEnglish + ')',
        transactionStatus: iterator.status,
        fromCurrency: iterator.fromAccountCurrency,
        transactionNumber: iterator.transactionNo,
        fromAccount: iterator.fromAccountAdditionalRef,
        toAccount: iterator.toAccountNumber ? iterator.toAccountNumber : iterator.toAccountAdditionalRef,
        reference: iterator.soReference || '-----',
        title: iterator.fromAccountAdditionalRef,
        subTtile: iterator.amount,
        accGl: iterator.fromAccountAccGl, // for account statement
        currency: iterator.fromAccountCurrency, // for account statement
        workingCif: iterator.fromAccountCif, // for account statement
        serialNo: iterator.fromAccountSerialNo, // for account statement
        toBeneficiary: iterator.toAccountAdditionalRef,
        toAccountType: iterator.transferType === '1' ? (iterator.toAccountCif === iterator.fromAccountCif) ? 'ownAccountStandingOrder' : 'companyAccountStandingOrder' : iterator.transferType === '2' ? 'bankLocalStandingOrder' : iterator.transferType === '3' ? 'internationalAccountStandingOrder' : 'ownAccountStandingOrder',
        // toAccountType: iterator.transferType == '2' ? ConstantCommon.INTERNAL_TRANSACTION_TYPE : iterator.transferType == '1' ? (iterator.fromAccountCif == iterator.toAccountCif ? ConstantCommon.OWN_TRANSACTION_TYPE : ConstantCommon.LOCAL_TRANSACTION_TYPE) : iterator.transferType == '3' ? ConstantCommon.INTERNATIONAL_TRANSACTION_TYPE : ConstantCommon.OWN_TRANSACTION_TYPE,
        scheduler: PsCommonSettings.oper_ID === CommonBussinessConstant.PENDING_TRANSFERS_OPER_ID ? false : true, // related to next step in payment
        // scheduler: true, //related to next step in payment
        operId: iterator.transferTypeOperId ? parseInt(iterator.transferTypeOperId) : iterator.transferType ? this.getTransferTypeInfo(iterator.transferType, 1) : '',
        date: this.psDatePipe.transform(iterator.valueDate, 'DD/MM/YYYY').toString(),
        bankCifShortNameEng: iterator.bankCifShortNameEng || '--------',
        transactionDate: this.psDatePipe.transform(iterator.transactionDate, 'DD/MM/YYYY').toString(),
        branch: iterator.fromAccountBranch
      };
      if (iterator.transferType == '1') {
        delete trans.bankCifShortNameEng;
      }
      transactions.push(trans);
    }
    return transactions;
  }

  // on submission transferTypes values as just 1,2,3
  getTransferTypeInfo(transferType, type) {
    let transferTypeOperId;
    if (transferType === '2') {
      transferTypeOperId = PsCommonSettings.oper_ID === CommonBussinessConstant.PENDING_TRANSFERS_OPER_ID ? CommonBussinessConstant.LOCAL_BENEFICIARY_TRANSFER : CommonBussinessConstant.LOCAL_BENEFICIARY_TRANSFER_STANDING_ORDER_OPER_ID;
    } else if (transferType === '3') {
      transferTypeOperId = PsCommonSettings.oper_ID === CommonBussinessConstant.PENDING_TRANSFERS_OPER_ID ? CommonBussinessConstant.INTERNATIONAL_BENEFICIARY_TRANSFER : CommonBussinessConstant.INTERNATIONAL_TRANSFER_STANDING_ORDER_OPER_ID;
    } else if (transferType === '1') {
      transferTypeOperId = PsCommonSettings.oper_ID === CommonBussinessConstant.PENDING_TRANSFERS_OPER_ID ? CommonBussinessConstant.INTERNAL_BENEFICIARY_TRANSFER : CommonBussinessConstant.INTERNAL_BENEFICIARY_TRANSFER_STANDING_ORDER_OPER_ID;
    }

    if (type === 1) {
      return transferTypeOperId;
    } else {
      return this.commonProv.translate(this.commonProv.getPageByOperId(transferTypeOperId).OPER_NAME);
    }
  }
}