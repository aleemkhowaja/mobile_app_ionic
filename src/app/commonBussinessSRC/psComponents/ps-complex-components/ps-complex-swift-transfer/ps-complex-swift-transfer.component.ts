import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IAccounts, IMapKeyValue, IOmniBeneficiaryRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsComplexLookUpComponentExposed } from '../ps-complex-lookup/ps-complex-lookup.component.interfaces';
import { IOptionsPsComplexSwiftTransferExposed } from './ps-complex-swift-transfer.component.interfaces';

/**
 * @author Zunair.Zakir
 * @since 29/01/2020
 *
 * <p> PsComplexSwiftTransferComponent is complex component to show Swift list fetched from server</p>
 */
@Component({
  selector: 'ps-complex-swift-transfer',
  templateUrl: './ps-complex-swift-transfer.component.html',
  styleUrls: ['./ps-complex-swift-transfer.component.scss'],
})
export class PsComplexSwiftTransferComponent extends PsBaseFieldComponent implements OnInit {

  public formGroup: FormGroup = new FormGroup({});
  @Input() options: IOptionsPsComplexSwiftTransferExposed = {};
  public complexLookupOptions: IOptionsPsComplexLookUpComponentExposed = {
    requestObject: null,
    notFoundMessage: 'no_swift_account_found_kay'
  };
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onSwifttChange: EventEmitter<any> = new EventEmitter<any>();
  public listOfSwiftAccounts?: any[];
  public labelValuesMap = new Map<string, IMapKeyValue>();

  constructor(
    public commonService: PsCommonService,
    logger: LoggerService,
    private omniPull?: OmniPullService
  ) {
    super(commonService, logger);
    this.populateSwiftMap();
  }

  ngOnInit() {
    super.init();
    this.loadSwiftAccounts();
    this.complexLookupOptions.title = 'title_key';
    this.complexLookupOptions.subTitle = 'sub_title_key';
    this.complexLookupOptions.labelsValueMap = this.labelValuesMap;
    this.commonProv.copyObject(this.complexLookupOptions, this.options, false);
  }

  /**
   * populating SwiftAccounts - fetching from server
   */
  private loadSwiftAccounts() {
    this.options.listOfSwiftAccounts = [];
    const requestData: IOmniBeneficiaryRequest = {};
    this.returnSwiftAccounts(requestData);
  }

  /**
   * fetching SwiftAccounts from server
   * @param requestData IOmniBeneficiaryRequest
   */
  private async returnSwiftAccounts(requestData: IOmniBeneficiaryRequest) {
    const result = await this.omniPull.returnBeneficiaries(requestData).catch(error => {
      this.logger.error('Error: While fetching accounts in PsComplexSwiftTransferComponent :', error);
    });

    if (result && result.gridModel.length > 0) {

    } else {
      this.listOfSwiftAccounts = [];
      const data = [{
        swiftAccountNumber: '5422345234',
        swiftBankName: 'iMAL Islamic core banking',
        swiftName: 'Zunair',
        swiftNameSub: 'Zakir Hussain'
      },
      {
        swiftAccountNumber: '23434234324',
        swiftBankName: 'iMAL Platform',
        swiftName: 'Test User',
        swiftNameSub: 'Sub name'
      }];
      this.complexLookupOptions.listOfOptions = data;
      this.options.listOfSwiftAccounts = data;
      this.listOfSwiftAccounts = data;
    }
  }

  /**
   * preparing request data
   * @param cifInfo: any
   */
  // private prepareRequestData(cifInfo: any): IOmniAccountRequest {
  //   let requestData: IOmniAccountRequest = {};

  //   if (cifInfo && cifInfo.omniUserVO) {
  //     requestData = {
  //       // vsBranchCode: cifInfo.branchCode,
  //       userCifNo: cifInfo.omniUserVO.CIF_NO
  //     };
  //   }

  //   if (this.options.glTypes != null && this.options.glTypes !== undefined && this.options.glTypes !== '') {
  //     requestData.permittedGls = this.options.glTypes;
  //   }

  //   if (this.options.accountAllowedCurrencies != null && this.options.accountAllowedCurrencies !== undefined) {
  //     if (typeof this.options.accountAllowedCurrencies === 'string') {
  //       requestData.accountAllowedCurrencies = this.options.accountAllowedCurrencies;
  //     } else {
  //       let temp = '';
  // eslint-disable-next-line , guard-for-in
  //       for (const val in this.options.accountAllowedCurrencies) {
  //         const value = this.options.accountAllowedCurrencies[val].itemValue;
  //         temp += value + ',';
  //       }
  //       temp = temp.slice(0, temp.lastIndexOf(','));
  //       requestData.accountAllowedCurrencies = temp;
  //     }
  //   }

  //   if (this.options.accountAllowedTypes != null && this.options.accountAllowedTypes !== undefined) {
  //     if (typeof this.options.accountAllowedTypes === 'string') {
  //       requestData.accountAllowedTypes = this.options.accountAllowedTypes;
  //     } else {
  //       let temp = '';
  // eslint-disable-next-line guard-for-in
  //       for (const val in this.options.accountAllowedTypes) {
  //         const value = this.options.accountAllowedTypes[val].itemValue;
  //         temp += value + ',';
  //       }
  //       temp = temp.slice(0, temp.lastIndexOf(','));
  //       requestData.accountAllowedTypes = temp;
  //     }
  //   }
  //   return requestData;
  // }



  /**
   * will fetch the list of accounts from server based currecy filter
   */
  private fetchAccountBasedOnCurrency(currency: any): IAccounts[] {
    // TODO: when service is available: account list will be fetched from server based on currency if passed any
    return this.options.listOfSwiftAccounts;
  }

  onChange(event: any[]) {
    this.logger.log(event);
    // TODO: get the updated data from server
  }

  private populateSwiftMap() {
    let swiftAccountNumberMap: IMapKeyValue = {};
    let swiftBankNameMap: IMapKeyValue = {};

    swiftAccountNumberMap = {
      key: 'swiftAccountNumber', // will be used in lookup compoent to get the value of account nummer from list of accounts
      value: '--- --- ---',
      isEdit: false
    };

    swiftBankNameMap = {
      key: 'swiftBankName', // will be used in lookup compoent to get the value of account balance from list of accounts
      value: '------',
      isEdit: false
    };


    // key here will be used as label in look up details component
    this.labelValuesMap.set('swift_account_key', swiftAccountNumberMap);
    this.labelValuesMap.set('bank_name_key', swiftBankNameMap);
  }
  onChangeItem(event) {
    this.logger.log('Swift Account Item', event.item);
    this.onSwifttChange.emit(event.item);
  }

}
