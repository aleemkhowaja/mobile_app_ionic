import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IMapKeyValue, IOmniBeneficiaryRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsComplexLookUpComponentExposed } from '../../ps-complex-components/ps-complex-lookup/ps-complex-lookup.component.interfaces';
import { PsInternationalBeneficiaryComponent } from './../../ps-beneficiary/ps-international-beneficiary/ps-international-beneficiary.component';
import { IOptionsPsLookupBenificiariesInternationalExposed } from './ps-lookup-beneficiaries-international.component.interfaces';

/**
 * @author Aftab.Ali
 * @since 04/02/2020
 *
 * <p> PsLookupBeneficiariesInternationalComponent is a lookup component to show international benificiaries list fetched from server</p>
 */
@Component({
  selector: 'ps-lookup-beneficiaries-international',
  templateUrl: './ps-lookup-beneficiaries-international.component.html',
  styleUrls: ['./ps-lookup-beneficiaries-international.component.scss'],
})
export class PsLookupBeneficiariesInternationalComponent extends PsBaseFieldComponent implements OnInit {

  public formGroup: FormGroup = new FormGroup({});
  @Input() options: IOptionsPsLookupBenificiariesInternationalExposed = {
    requestObject: null
  };
  public complexLookupOptions: IOptionsPsComplexLookUpComponentExposed = {
    requestObject: null,
    notFoundMessage: 'no_international_benf_found_key'
  };
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onBenificiaryChange: EventEmitter<any> = new EventEmitter<any>();
  public listOfBenificiaries?: any[];
  public labelValuesMap = new Map<string, IMapKeyValue>();
  public beneficiariesRequestParam: IOmniBeneficiaryRequest = {};
  private internationalBeneficiariesList: any[];

  constructor(
    public commonService: PsCommonService,
    logger: LoggerService,
    private omniPull?: OmniPullService
  ) {
    super(commonService, logger);
    this.populateInternationalBenificiaryMap();
  }

  ngOnInit() {
    super.init();
    this.loadInternationalBenificiaries();
    this.complexLookupOptions.title = 'title_key';
    this.complexLookupOptions.subTitle = 'sub_title_key';
    this.complexLookupOptions.labelsValueMap = this.labelValuesMap;
    if (this.options && this.options.component) {
      this.complexLookupOptions.component = this.options.component;
    } else {
      this.complexLookupOptions.component = PsInternationalBeneficiaryComponent;
    }
    this.commonProv.copyObject(this.complexLookupOptions, this.options, false);
  }

  /**
   * populating loadInternational Benificiaries - fetching from server
   */
  private loadInternationalBenificiaries() {
    this.options.listOfBenificiaries = [];
    this.beneficiariesRequestParam = {
      trxTypeParameterName: CommonBussinessConstant.INTERNATIONAL,
      filterByOper: true
    };
    this.returnInternationalBenificiaries(this.beneficiariesRequestParam);
  }

  /**
   * fetching Benificiaries from server
   * @param requestData IOmniBeneficiaryRequest
   */
  private async returnInternationalBenificiaries(requestData: IOmniBeneficiaryRequest) {
    const result = await this.omniPull.returnBeneficiaries(requestData).catch(error => {
      this.complexLookupOptions.listOfOptions = [];
      this.logger.error('Error: While fetching international beneficiaries in PsLookupBeneficiariesInternationalComponent :', error);
    });

    if (result && result.gridModel.length > 0) {
      this.complexLookupOptions.listOfOptions = this.populateCustomInternationalBeneficiaries(result.gridModel);
    } else {
      this.listOfBenificiaries = [];
      this.complexLookupOptions.listOfOptions = [];
    }
  }

  private populateInternationalBenificiaryMap() {
    let beneficiaryAccountNumberMap: IMapKeyValue = {};
    let beneficiaryBankNameMap: IMapKeyValue = {};

    beneficiaryAccountNumberMap = {
      key: 'beneficiaryAccountNumber', // will be used in lookup compoent to get the value of account nummer from list of accounts
      value: '--- --- ---',
      isEdit: false
    };

    beneficiaryBankNameMap = {
      key: 'bankName', // will be used in lookup compoent to get the value of account balance from list of accounts
      value: '------',
      isEdit: false
    };


    // key here will be used as label in look up details component
    this.labelValuesMap.set('beneficiary_key', beneficiaryAccountNumberMap);
    this.labelValuesMap.set('bank_name_key', beneficiaryBankNameMap);
  }

  onChangeItem(event) {
    this.onBenificiaryChange.emit(event);
  }

  /**
   * customizing international beneficiary object
   * @param gridModel
   */
  private populateCustomInternationalBeneficiaries(internationBeneficiaries: Array<any>): IOmniBeneficiaryRequest[] {
    this.internationalBeneficiariesList = [];
    for (const iterator of internationBeneficiaries) {
      if (iterator && iterator.submitFieldValueMap) {
        const internationalBeneficiary: IOmniBeneficiaryRequest = {
          benefName: iterator.submitFieldValueMap.benefName,
          accountNumber: iterator.submitFieldValueMap.accountNumber,
          benefBankId: iterator.submitFieldValueMap.bank,
          benefId: iterator.submitFieldValueMap.benefId,
          benefNickName: iterator.submitFieldValueMap.benefNickName,
          purpose: iterator.submitFieldValueMap.purpose,
          benefBranchId: iterator.submitFieldValueMap.branch,
          currency: iterator.submitFieldValueMap.currency,
          country: iterator.submitFieldValueMap.country,
          region: iterator.submitFieldValueMap.region,
          city: iterator.submitFieldValueMap.city,
          swiftCode: iterator.submitFieldValueMap.swiftCode,
          bankName: iterator.submitFieldValueMap.bankName,
          branch: iterator.submitFieldValueMap.branch,
          lookupKey: iterator.submitFieldValueMap.accountNumber
        };
        this.internationalBeneficiariesList.push(internationalBeneficiary);
      }
    }
    return this.internationalBeneficiariesList;
  }

}
