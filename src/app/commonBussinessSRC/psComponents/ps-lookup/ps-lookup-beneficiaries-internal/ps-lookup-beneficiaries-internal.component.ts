import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IMapKeyValue, IOmniBeneficiaryRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsComplexLookUpComponentExposed } from '../../ps-complex-components/ps-complex-lookup/ps-complex-lookup.component.interfaces';
import { PsInternalBeneficiaryComponent } from './../../ps-beneficiary/ps-internal-beneficiary/ps-internal-beneficiary.component';
import { IOptionsPsLookupBenificiariesInternalExposed } from './ps-lookup-beneficiaries-internal.component.interfaces';

/**
 * @author Aftab.Ali
 * @since 04/02/2020
 *
 * <p> PsLookupBeneficiariesInternalComponent is a lookup component to show internal Benificiaries list fetched from the server</p>
 */
@Component({
  selector: 'ps-lookup-beneficiaries-internal',
  templateUrl: './ps-lookup-beneficiaries-internal.component.html',
  styleUrls: ['./ps-lookup-beneficiaries-internal.component.scss'],
})
export class PsLookupBeneficiariesInternalComponent extends PsBaseFieldComponent implements OnInit {

  public formGroup: FormGroup = new FormGroup({});
  @Input() options: IOptionsPsLookupBenificiariesInternalExposed = {
    requestObject: null
  };
  public complexLookupOptions: IOptionsPsComplexLookUpComponentExposed = {
    requestObject: null,
    notFoundMessage: 'no_internal_benef_found_key'
  };
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onBenificiaryChange: EventEmitter<any> = new EventEmitter<any>();
  public listOfBenificiaries?: any[];
  public labelValuesMap = new Map<string, IMapKeyValue>();
  public beneficiariesRequestParam: IOmniBeneficiaryRequest = {};
  private internalBeneficiariesList: any[];

  constructor(
    public commonService: PsCommonService,
    logger: LoggerService,
    private omniPull?: OmniPullService
  ) {
    super(commonService, logger);
    this.populateInternalBenificiaryMap();
  }

  ngOnInit() {
    super.init();
    this.loadInternalBenificiaries();
    this.complexLookupOptions.title = 'title_key';
    this.complexLookupOptions.subTitle = 'sub_title_key';
    this.complexLookupOptions.labelsValueMap = this.labelValuesMap;
    if (this.options && this.options.component) {
      this.complexLookupOptions.component = this.options.component;
    } else {
      this.complexLookupOptions.component = PsInternalBeneficiaryComponent;
    }
    this.commonProv.copyObject(this.complexLookupOptions, this.options, false);
  }

  /**
   * populating Benificiaries - fetching from server
   */
  private loadInternalBenificiaries() {
    this.options.listOfBenificiaries = [];
    this.beneficiariesRequestParam = {
      trxTypeParameterName: CommonBussinessConstant.INTERNAL,
      filterByOper: true
    };
    this.returnInternalBenificiaries(this.beneficiariesRequestParam);
  }

  /**
   * fetching Benificiaries from server
   * @param requestData IOmniBeneficiaryRequest
   */
  private async returnInternalBenificiaries(requestData: IOmniBeneficiaryRequest) {
    const result = await this.omniPull.returnBeneficiaries(requestData).catch(error => {
      this.complexLookupOptions.listOfOptions = [];
      this.logger.error('Error: While fetching internal beneficiaries in PsLookupBeneficiariesInternalComponent: ', error);
    });

    if (result && result.gridModel.length > 0) {
      this.complexLookupOptions.listOfOptions = this.populateCustomInternalBeneficiaries(result.gridModel);
    } else {
      this.listOfBenificiaries = [];
      this.complexLookupOptions.listOfOptions = [];
    }
  }

  private populateInternalBenificiaryMap() {
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
   * customizing internal beneficiary object
   * @param gridModel
   */
  private populateCustomInternalBeneficiaries(internalBeneficiaries: Array<any>): IOmniBeneficiaryRequest[] {
    this.internalBeneficiariesList = [];
    for (const iterator of internalBeneficiaries) {
      if (iterator && iterator.submitFieldValueMap) {
        const internalBeneficiary: IOmniBeneficiaryRequest = {
          benefName: iterator.submitFieldValueMap.benefName,
          accountNumber: iterator.submitFieldValueMap.accountNumber,
          benefBankName: iterator.submitFieldValueMap.benefBankName,
          benefId: iterator.submitFieldValueMap.benefId,
          benefNickName: iterator.submitFieldValueMap.benefNickName,
          purpose: iterator.submitFieldValueMap.purpose,
          lookupKey: iterator.submitFieldValueMap.accountNumber,
          accountObject: iterator.submitFieldValueMap.accountObject,
          benefPhone: iterator.submitFieldValueMap.benefPhone
        };
        this.internalBeneficiariesList.push(internalBeneficiary);
      }
    }
    return this.internalBeneficiariesList;
  }
}

