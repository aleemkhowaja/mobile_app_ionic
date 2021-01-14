import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IMapKeyValue, IOmniBeneficiaryRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsLocalBeneficiaryComponent } from '../../ps-beneficiary/ps-local-beneficiary/ps-local-beneficiary.component';
import { IOptionsPsComplexLookUpComponentExposed } from '../../ps-complex-components/ps-complex-lookup/ps-complex-lookup.component.interfaces';
import { IOptionsPsLookupBenificiariesLocalExposed } from './ps-lookup-beneficiaries-local.component.interfaces';

/**
 * @author Aftab.Ali
 * @since 04/02/2020
 *
 * <p> PsLookupBeneficiariesLocalComponent is a lookup component to show local benificiaries list fetched from server</p>
 */
@Component({
  selector: 'ps-lookup-beneficiaries-local',
  templateUrl: './ps-lookup-beneficiaries-local.component.html',
  styleUrls: ['./ps-lookup-beneficiaries-local.component.scss'],
})
export class PsLookupBeneficiariesLocalComponent extends PsBaseFieldComponent implements OnInit {

  public formGroup: FormGroup = new FormGroup({});
  @Input() options: IOptionsPsLookupBenificiariesLocalExposed = {
    requestObject: null
  };
  public complexLookupOptions: IOptionsPsComplexLookUpComponentExposed = {
    requestObject: null,
    notFoundMessage: 'no_local_benef_found_key'
  };
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onBenificiaryChange: EventEmitter<any> = new EventEmitter<any>();
  public listOfBenificiaries?: any[];
  public labelValuesMap = new Map<string, IMapKeyValue>();
  public beneficiariesRequestParam: IOmniBeneficiaryRequest = {};
  private localBeneficiariesList: any[];

  constructor(
    public commonService: PsCommonService,
    logger: LoggerService,
    private omniPull?: OmniPullService
  ) {
    super(commonService, logger);
    this.populateLocalBenificiaryMap();
  }

  ngOnInit() {
    super.init();
    this.loadLocalBenificiaries();
    this.complexLookupOptions.title = 'title_key';
    this.complexLookupOptions.subTitle = 'sub_title_key';
    this.complexLookupOptions.labelsValueMap = this.labelValuesMap;
    if (this.options && this.options.component) {
      this.complexLookupOptions.component = this.options.component;
    } else {
      this.complexLookupOptions.component = PsLocalBeneficiaryComponent;
    }
    this.commonProv.copyObject(this.complexLookupOptions, this.options, false);
  }

  /**
   * populating Local Benificiaries - fetching from server
   */
  private loadLocalBenificiaries() {
    this.options.listOfBenificiaries = [];
    this.beneficiariesRequestParam = {
      trxTypeParameterName: CommonBussinessConstant.LOCAL,
      filterByOper: true
    };
    this.returnLocalBenificiaries(this.beneficiariesRequestParam);
  }

  /**
   * fetching Local Benificiaries from server
   * @param requestData IOmniBeneficiaryRequest
   */
  private async returnLocalBenificiaries(requestData: IOmniBeneficiaryRequest) {
    const result = await this.omniPull.returnBeneficiaries(requestData).catch(error => {
      this.complexLookupOptions.listOfOptions = [];
      this.logger.error('Error: While fetching local beneficiaries in PsLookupBeneficiariesLocalComponent :', error);
    });

    if (result && result.gridModel.length > 0) {
      this.complexLookupOptions.listOfOptions = this.populateCustomLocalBeneficiaries(result.gridModel);
      console.log('GTeatListOfoptions', this.complexLookupOptions.listOfOptions);

    } else {
      this.listOfBenificiaries = [];
      this.complexLookupOptions.listOfOptions = [];
    }
  }


  private populateLocalBenificiaryMap() {
    let beneficiaryAccountNumberMap: IMapKeyValue = {};
    let beneficiaryBankNameMap: IMapKeyValue = {};

    beneficiaryAccountNumberMap = {
      key: 'beneficiaryAccountNumber',
      value: '--- --- ---',
      isEdit: false
    };

    beneficiaryBankNameMap = {
      key: 'beneficiaryBankName',
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
   * customizing local beneficiary object
   * @param gridModel
   */
  private populateCustomLocalBeneficiaries(localBeneficiaries: Array<any>): IOmniBeneficiaryRequest[] {
    this.localBeneficiariesList = [];
    for (const iterator of localBeneficiaries) {
      if (iterator && iterator.submitFieldValueMap) {
        const localBeneficiary: IOmniBeneficiaryRequest = {
          benefName: iterator.submitFieldValueMap.benefName,
          accountNumber: iterator.submitFieldValueMap.accountNumber,
          benefBankId: iterator.submitFieldValueMap.bank,
          benefId: iterator.submitFieldValueMap.benefId,
          benefNickName: iterator.submitFieldValueMap.benefNickName,
          purpose: iterator.submitFieldValueMap.purpose,
          benefBranchId: iterator.submitFieldValueMap.branch,
          currency: iterator.submitFieldValueMap.currency,
          lookupKey: iterator.submitFieldValueMap.accountNumber,
          benefPhone: iterator.submitFieldValueMap.benefPhone
        };
        this.localBeneficiariesList.push(localBeneficiary);
      }
    }
    return this.localBeneficiariesList;
  }


}

