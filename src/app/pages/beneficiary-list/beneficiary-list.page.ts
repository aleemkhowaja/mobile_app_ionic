import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ViewWillEnter } from '@ionic/angular';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IMapKeyValue, IOmniBeneficiaryRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsPsActionButton, IOptionsPsActionImage, IOptionsPsSelectSegment, IOptionsPsTemplateView, IPsSelect } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsInternalBeneficiaryExposed } from '../../commonBussinessSRC/psComponents/ps-beneficiary/ps-internal-beneficiary/ps-internal-beneficiary.component.interfaces';
import { IOptionsPsInternationalBeneficiaryExposed } from '../../commonBussinessSRC/psComponents/ps-beneficiary/ps-international-beneficiary/ps-international-beneficiary.component.interfaces';
import { IOptionsPsLocalBeneficiaryExposed } from '../../commonBussinessSRC/psComponents/ps-beneficiary/ps-local-beneficiary/ps-local-beneficiary.component.interfaces';
import { OmniBasePage } from '../omni-base/omni-base.page';
import { IOptionsPsLabel } from './../../commonSRC/psServices/models/ps-common-interface';


/**
 * @author Aftab.Ali
 * @since 30/1/2020
 *
 * <p> BeneficiaryListPage </p>
 */
@Component({
  selector: 'app-beneficiary-list',
  templateUrl: './beneficiary-list.page.html',
  styleUrls: ['./beneficiary-list.page.scss'],
})
export class BeneficiaryListPage extends OmniBasePage implements ViewWillEnter {

  public segmentOptions: IOptionsPsSelectSegment = {
    segmentList: []
  };
  public internalBeneficiaryOptions: IOptionsPsInternalBeneficiaryExposed = {};
  public localBeneficiaryOptions: IOptionsPsLocalBeneficiaryExposed = {};
  public internationalBeneficiaryOptions: IOptionsPsInternationalBeneficiaryExposed = {};
  public generalLabelValuesMap = new Map<string, IMapKeyValue>();
  public generalHeaderMap = new Map<string, IMapKeyValue>();
  public termsLabelValuesMap = new Map<string, IMapKeyValue>();
  public termsHeaderMap = new Map<string, IMapKeyValue>();
  public showInternalBeneficiaries = true;
  public showLocalBeneficiaries = false;
  public showInternationalBeneficiaries = false;
  public noInternalBeneficiariesFound = false;
  public noLocalBeneficiariesFound = false;
  public noInternationalBeneficiariesFound = false;
  public beneficiariesRequestParam: IOmniBeneficiaryRequest = {};
  private formGroup = new FormGroup({});
  private internalBeneficiariesList: any[];
  private localBeneficiariesList: any[];
  private internationalBeneficiariesList: any[];
  public addBeneficiaryButtonOptions: IOptionsPsActionButton = {
    group: this.formGroup
  };
  public showInternalBeneficiary = false;
  public showLocalBeneficiary = false;
  public showInternationalBeneficiary = false;
  private segmentList: any[] = [];
  private defaultSegment: IPsSelect = {};
  private segmentsLoaded = true;

  public templateViewOptions: IOptionsPsTemplateView = {
    group: this.formGroup,
    disableLoading: true
  };

  actionImageOptions: IOptionsPsActionImage = {
    imageName: CommonUtils.getCssVariableValue('--ps-loader-image-name')
  };

  noInternalOptions: IOptionsPsLabel = {
    labelKey: 'no_internal_ben_available_key'
  };

  noLocalOptions: IOptionsPsLabel = {
    labelKey: 'no_local_ben_available_key'
  };

  noInternationalOptions: IOptionsPsLabel = {
    labelKey: 'no_internat_ben_available_key'
  };

  requestWasSent = false;

  constructor(
    public commonService: PsCommonService,
    public logger: LoggerService,
    private omniPull?: OmniPullService,
  ) {
    super();
  }

  ionViewWillEnter() {
    // super.init();
    super.viewWillEnter();
    /* this.commonProv.hasAccessOnOperation(null, [109,234234, 1505], 'OR'); */
    this.showInternalBeneficiary = this.commonProv.hasAccessOnOperation(CommonBussinessConstant.INTERNAL_BENEFICIARY_TRANSFER) || this.commonProv.hasAccessOnOperation(CommonBussinessConstant.INTERNAL_TRANSFER_STANDING_ORDER_OPER_ID);
    this.showLocalBeneficiary = this.commonProv.hasAccessOnOperation(CommonBussinessConstant.LOCAL_BENEFICIARY_TRANSFER) || this.commonProv.hasAccessOnOperation(CommonBussinessConstant.LOCAL_TRANSFER_STANDING_ORDER_OPER_ID);
    this.showInternationalBeneficiary = this.commonProv.hasAccessOnOperation(CommonBussinessConstant.INTERNATIONAL_BENEFICIARY_TRANSFER) || this.commonProv.hasAccessOnOperation(CommonBussinessConstant.INTERNATIONAL_TRANSFER_STANDING_ORDER_OPER_ID);

    PsCommonSettings.oper_ID = CommonBussinessConstant.INTERNAL_BENEFICIARY_OPER_ID;
    this.internalBeneficiaryOptions = {
      type: CommonBussinessConstant.INTERNAL,
      isEditable: true
    };
    this.localBeneficiaryOptions = {
      type: CommonBussinessConstant.LOCAL,
      isEditable: true
    };
    this.internationalBeneficiaryOptions = {
      type: CommonBussinessConstant.INTERNATIONAL,
      isEditable: true
    };

    if (this.showInternalBeneficiary) {
      if (this.defaultSegment.itemValue === undefined || this.defaultSegment.itemValue === '') {
        this.defaultSegment = { itemValue: this.commonProv.translate('internal_beneficiary_key'), description: CommonBussinessConstant.INTERNAL_BENEFICIARY };
      }
      if (this.segmentsLoaded) {
        this.segmentList.push({
          selected: true,
          itemValue: this.commonProv.translate('internal_beneficiary_key'),
          description: CommonBussinessConstant.INTERNAL_BENEFICIARY
        });
      }
    }
    if (this.showLocalBeneficiary) {
      if (this.defaultSegment === undefined || this.defaultSegment === '') {
        this.defaultSegment = { itemValue: this.commonProv.translate('local_beneficiary_key'), description: CommonBussinessConstant.LOCAL_BENEFICIARY };
      }
      if (this.segmentsLoaded) {
        this.segmentList.push({
          selected: true,
          itemValue: this.commonProv.translate('local_beneficiary_key'),
          description: CommonBussinessConstant.LOCAL_BENEFICIARY
        });
      }
    }
    if (this.showInternationalBeneficiary) {
      if (this.defaultSegment === undefined || this.defaultSegment === '') {
        this.defaultSegment = { itemValue: this.commonProv.translate('international_beneficiary_key'), description: CommonBussinessConstant.INTERNATIONAL_BENEFICIARY };
      }
      this.showInternalBeneficiaries = false;
      this.showLocalBeneficiaries = false;
      this.showInternationalBeneficiaries = true;
      if (this.segmentsLoaded) {
        this.segmentList.push({
          selected: true,
          itemValue: this.commonProv.translate('international_beneficiary_key'),
          description: CommonBussinessConstant.INTERNATIONAL_BENEFICIARY
        });
      }
    }

    this.segmentOptions = {
      segmentList: this.segmentList,
      defaultSegment: this.defaultSegment
    };
    /* this.segmentOptions = {
      segmentList: [{
        selected: true,
        itemValue: 'internal_beneficiary_key',
        description: CommonBussinessConstant.INTERNAL_BENEFICIARY
      }, {
        selected: true,
        itemValue: 'local_beneficiary_key',
        description: CommonBussinessConstant.LOCAL_BENEFICIARY
      },
      {
        selected: true,
        itemValue: 'international_beneficiary_key',
        description: CommonBussinessConstant.INTERNATIONAL_BENEFICIARY
      }],

      defaultSegment: CommonBussinessConstant.INTERNAL_BENEFICIARY
    }; */

    this.addBeneficiaryButtonOptions = {
      labelKey: 'add_beneficiary_key',
      group: this.formGroup
    };

    this.loadBeneficiaries(this.defaultSegment.itemValue);
    this.segmentsLoaded = false;
  }

  public async onClickSegment(selectedSegment) {
    if (selectedSegment === this.commonProv.translate('internal_beneficiary_key')) {
      this.internalBeneficiaryOptions = {
        type: CommonBussinessConstant.INTERNAL,
        isEditable: true
      };
      this.defaultSegment = { itemValue: this.commonProv.translate('internal_beneficiary_key'), description: CommonBussinessConstant.INTERNAL_BENEFICIARY };
    } else if (selectedSegment === this.commonProv.translate('local_beneficiary_key')) {
      this.localBeneficiaryOptions = {
        type: CommonBussinessConstant.LOCAL,
        isEditable: true
      };
      this.defaultSegment = { itemValue: this.commonProv.translate('local_beneficiary_key'), description: CommonBussinessConstant.LOCAL_BENEFICIARY };
    } else if (selectedSegment === this.commonProv.translate('international_beneficiary_key')) {
      this.internationalBeneficiaryOptions = {
        type: CommonBussinessConstant.INTERNATIONAL,
        isEditable: true
      };
      this.defaultSegment = { itemValue: this.commonProv.translate('international_beneficiary_key'), description: CommonBussinessConstant.INTERNATIONAL_BENEFICIARY };
    }
    await this.loadBeneficiaries(selectedSegment);
  }

  /**
   * fetching beneficiaries
   * @param segment 
   */
  async loadBeneficiaries(segment) {
    this.requestWasSent = true;
    if (segment === this.commonProv.translate('internal_beneficiary_key')) {
      PsCommonSettings.oper_ID = CommonBussinessConstant.INTERNAL_BENEFICIARY_OPER_ID;
      this.showInternalBeneficiaries = true;
      this.showLocalBeneficiaries = false;
      this.showInternationalBeneficiaries = false;
      this.beneficiariesRequestParam = {
        trxTypeParameterName: CommonBussinessConstant.INTERNAL,
        filterByOper: true
      };
      await this.returnInternalBeneficiaries(this.beneficiariesRequestParam);
    } else if (segment === this.commonProv.translate('local_beneficiary_key')) {
      PsCommonSettings.oper_ID = CommonBussinessConstant.LOCAL_BENEFICIARY_OPER_ID;
      this.showInternalBeneficiaries = false;
      this.showLocalBeneficiaries = true;
      this.showInternationalBeneficiaries = false;
      this.beneficiariesRequestParam = {
        trxTypeParameterName: CommonBussinessConstant.LOCAL,
        filterByOper: true
      };
      await this.returnLocalBeneficiaries(this.beneficiariesRequestParam);
    } else if (segment === this.commonProv.translate('international_beneficiary_key')) {
      PsCommonSettings.oper_ID = CommonBussinessConstant.EXTERNAL_BENEFICIARY_OPER_ID;
      this.showInternalBeneficiaries = false;
      this.showLocalBeneficiaries = false;
      this.showInternationalBeneficiaries = true;
      this.beneficiariesRequestParam = {
        trxTypeParameterName: CommonBussinessConstant.INTERNATIONAL,
        filterByOper: true
      };
      await this.returnInternationalBeneficiaries(this.beneficiariesRequestParam);
    }
    this.requestWasSent = false;
  }

  /**
   * fetching internal beneficiaries
   * @param requestData
   */
  private async returnInternalBeneficiaries(requestData: IOmniBeneficiaryRequest) {
    const result = await this.omniPull.returnBeneficiaries(requestData).catch(error => {
      this.logger.error('Error: While fetching internal beneficiaries in BeneficiaryListPage :', error);
    });
    if (result && result.gridModel.length > 0) {
      this.noInternalBeneficiariesFound = false;
      this.internalBeneficiaryOptions.listOfOptions = [];
      this.internalBeneficiaryOptions.listOfOptions = this.populateCustomInternalBeneficiaries(result.gridModel);
    } else {
      this.internalBeneficiaryOptions.listOfOptions = []; // this.populateCustomInternalBeneficiaries([]);
      this.noInternalBeneficiariesFound = true;
    }
  }

  /**
   * fetching local beneficiaries
   * @param requestData
   */
  private async returnLocalBeneficiaries(requestData: IOmniBeneficiaryRequest) {
    const result = await this.omniPull.returnBeneficiaries(requestData).catch(error => {
      this.logger.error('Error: While fetching local beneficiaries in BeneficiaryListPage :', error);
    });
    if (result && result.gridModel.length > 0) {
      this.noLocalBeneficiariesFound = false;
      this.localBeneficiaryOptions.listOfOptions = [];
      this.localBeneficiaryOptions.listOfOptions = this.populateCustomLocalBeneficiaries(result.gridModel);
    } else {
      this.localBeneficiaryOptions.listOfOptions = []; // this.populateCustomLocalBeneficiaries([]);
      this.noLocalBeneficiariesFound = true;
    }
  }

  /**
   * fetching international beneficiaries
   * @param requestData
   */
  private async returnInternationalBeneficiaries(requestData: IOmniBeneficiaryRequest) {
    const result = await this.omniPull.returnBeneficiaries(requestData).catch(error => {
      this.logger.error('Error: While fetching international beneficiaries in BeneficiaryListPage :', error);
    });
    if (result && result.gridModel.length > 0) {
      this.noInternationalBeneficiariesFound = false;
      this.internationalBeneficiaryOptions.listOfOptions = [];
      this.internationalBeneficiaryOptions.listOfOptions = this.populateCustomInternationalBeneficiaries(result.gridModel);
    } else {
      this.internationalBeneficiaryOptions.listOfOptions = []; // this.populateCustomInternationalBeneficiaries([]);
      this.noInternationalBeneficiariesFound = true;
    }
  }

  updateCard(value) {
    // console.log(value);
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
          status: iterator.status,
          dataSaveId: iterator.dataSaveId,
          benefPhone: iterator.submitFieldValueMap.benefPhone
        };
        this.internalBeneficiariesList.push(internalBeneficiary);
      }
    }
    return this.internalBeneficiariesList;
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
          benefBankName: iterator.submitFieldValueMap.benefBankName,
          benefId: iterator.submitFieldValueMap.benefId,
          benefNickName: iterator.submitFieldValueMap.benefNickName,
          purpose: iterator.submitFieldValueMap.purpose,
          status: iterator.status,
          dataSaveId: iterator.dataSaveId,
          benefBankId: iterator.submitFieldValueMap.bank,
          benefBranchId: iterator.submitFieldValueMap.branch,
          currency: iterator.submitFieldValueMap.currency,
          bank: iterator.submitFieldValueMap.bank,
          branch: iterator.submitFieldValueMap.branch,
          benefPhone: iterator.submitFieldValueMap.benefPhone,
          benefBranchTxt: iterator.submitFieldValueMap.benefBranchTxt
        };
        this.localBeneficiariesList.push(localBeneficiary);
      }
    }
    return this.localBeneficiariesList;
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
          benefBankName: iterator.submitFieldValueMap.bankName,
          benefId: iterator.submitFieldValueMap.benefId,
          benefNickName: iterator.submitFieldValueMap.benefNickName,
          purpose: iterator.submitFieldValueMap.purpose,
          status: iterator.status,
          dataSaveId: iterator.dataSaveId,
          currency: iterator.submitFieldValueMap.currency,
          bank: iterator.submitFieldValueMap.bank,
          branch: iterator.submitFieldValueMap.branch,
          country: iterator.submitFieldValueMap.country,
          swiftCode: iterator.submitFieldValueMap.swiftCode,
          bankName: iterator.submitFieldValueMap.bankName,
          region: iterator.submitFieldValueMap.region,
          city: iterator.submitFieldValueMap.city,
          benefPhone: iterator.submitFieldValueMap.benefPhone
        };
        this.internationalBeneficiariesList.push(internationalBeneficiary);
      }
    }
    return this.internationalBeneficiariesList;
  }


}
