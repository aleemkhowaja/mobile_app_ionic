import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsComplexFacilityRequestExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-facility-request/ps-complex-facility-request.component.interfaces';
import { IOptionsPsComplexSelectBranchComponentExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-select-branch/ps-complex-select-branch.component.interface';
import { IOptionsPsMapAtmBranchesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { EventEmitterService } from 'src/app/commonSRC/psServices/event-emitter/event-emitter.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsPsContainerPanel, IOptionsPsFileUploadComponent, IOptionsPsKeyinInputExposed, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { CommonBussinessConstant } from '../../commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsCommonSettings } from '../../commonSRC/psServices/models/ps-common.settings';
import { OmniBasePage } from '../omni-base/omni-base.page';


/** @name financial-calculator
 *  @author Heba.Hassan 
 *  @description Display the financial calculator in pre login an post login
 */

@Component({
  selector: 'app-facility-request',
  templateUrl: './facility-request.page.html',
  styleUrls: ['./facility-request.page.scss'],
})
export class FacilityRequestPage extends OmniBasePage implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  facilityRequestOptions: IOptionsPsComplexFacilityRequestExposed;

  stepperOptions: IOptionsTemplateStepper;
  panelOptionsStep1: IOptionsPsContainerPanel;
  panelOptions1Step2: IOptionsPsContainerPanel;
  attachmentPanelOptions: IOptionsPsContainerPanel;
  fileUploadOptions: IOptionsPsFileUploadComponent;



  branchOptions: IOptionsPsKeyinInputExposed = {
    labelKey: 'branch_key',
    group: this.formGroup,
    fcName: 'branch'
  };
  panelOptions2Step1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'select_branch_key',
    iconName: 'document',
    expanded: true
  };
  public operationID: number;
  cifInfo: any;
  downPaymentLabel;
  enableCifBranch = false;
  mapAtmBranchesOptions: IOptionsPsMapAtmBranchesExposed = {
    group: this.formGroup,
    fcName: 'mapAtmBranches',
    labelKey: 'map_atm-branch_key',
    mapOptions: {
      labelKey: 'map'
    },
    showSegments: false,
    mapTypesInclude: '\'B\'',
    branchIds: '1,3,5',
    parameterToCheck: CommonBussinessConstant.FACILITY_CIF_BRANCH
  };
  defaultVO: any = {};
  facility: any;

  selectBranchOptions: IOptionsPsComplexSelectBranchComponentExposed = {
    fcName: 'mapAtmBranchesDropdown',
    group: this.formGroup
  };

  constructor(public datepipe: DatePipe, private common: PsCommonService,
    public omniPull: OmniPullService, public logger: LoggerService,
    public eventEmitterService: EventEmitterService
  ) {
    super();
  }

  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
    this.cifInfo = this.commonProv.session.getValueOf(ConstantCommon.USERINFO);
    PsCommonSettings.oper_ID = CommonBussinessConstant.FACILITY_REQUEST_OPER;
    PsCommonSettings.pageName = CommonBussinessConstant.FACILITY_REQUEST_TITLE;
    this.loadOptions();
    this.fetchParameter();
  }

  ionViewDidEnter() {
    super.ionViewDidEnter();
    this.downPaymentLabel = CommonUtils.translate('down_payment_key');
    this.eventEmitterService.getSelectBranchEmitter().subscribe((val) => {
      this.formGroup.controls[this.mapAtmBranchesOptions.fcName].setValue(val);
    });

    this.commonProv.setValInsideNestedObj(this.branchOptions.fcName, this.cifInfo.cifBranch ? this.cifInfo.customerInfoCO.branchBriefDesc : '', this.defaultVO);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.branchOptions.fcName], 1);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.facilityRequestOptions.revolvingAmountOptions.fcName], 1);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.facilityRequestOptions.revolvingAmountOptions.fcName], 0);
  }

  private loadOptions() {
    this.panelOptionsStep1 = {
      isExpandable: true,
      labelKey: 'facility_request_key',
      iconName: 'calculator',
      expanded: true
    };
    this.panelOptions1Step2 = {
      isExpandable: true,
      labelKey: 'atm_branches_key',
      iconName: 'atm',
      expanded: true
    };

    this.attachmentPanelOptions = {
      isExpandable: true,
      labelKey: 'attachment_key',
      iconName: '',
      expanded: true,
    };

    this.facilityRequestOptions = {
      facilitytypesOptions: {
        group: this.formGroup,
        placeHolder: 'select_facility_types_key',
        labelKey: 'facility_types_key',
        fcName: 'facilityType',
      },
      group: this.formGroup,
      revolvingAmountOptions: {
        fcName: 'revolving',
        placeHolder: '',
        group: this.formGroup,
        labelKey: this.common.translate('revolving_key') + ' ' + this.common.translate('one_off_key'),
      },
      amountLabelOptions: {
        placeHolder: 'enter_total_amount_key',
        labelKey: 'financing_amount_key',
        group: this.formGroup,
        fcName: 'financing_amount'
      },
      complexAmountOptions: {
        currency: '',
        currenciesOptions: {
          labelKey: 'currency_key',
          placeHolder: 'select_currency_key',
          fcName: 'currency',
          group: this.formGroup
        },
        amountOptions: {
          labelKey: 'total_amount_key',
          placeHolder: 'enter_total_amount_key',
          fcName: 'transactionAmount',
          type: 'amount',
          group: this.formGroup
        }
      },
      downPaymentOptions: {
        fcName: 'downPayment',
        group: this.formGroup,
        labelKey: 'down_payment_key',
        placeHolder: 'enter_down_payment_key'
      },
    };

    this.fileUploadOptions = {
      group: this.formGroup,
      multiple: true,
      fcName: 'selectedFileData',
    };

    this.stepperOptions = {
      stepperName: 'fac_req_stepper',
      isHorizontalStepper: true,
      numberOfSteps: 2,
      namesofSteps: ['facility_request_key', 'atm_branches_key'],
      group: this.formGroup,
      submitOptions: {
        group: this.formGroup,
        submitServiceUrl: PsCommonBusinessSettings.serviceUrl.FacilityRequest,
        postCallFunction: {
          func() {
            return new Promise<any>((resolve, reject) => {
              resolve(this.executionClass.redirectToSchedule());
            });
          },
          executionClass: this,
          params: [this]
        }
      },
      requestObject: this.defaultVO
    };
  }

  async fetchParameter() {
    const result = await this.omniPull.getParamValOf(CommonBussinessConstant.FACILITY_CIF_BRANCH, CommonBussinessConstant.AcntOpenBranchesMatAcc, CommonBussinessConstant.AllowedBranches, ConstantCommon.AllowedFixedMaturityAccountsTypes, CommonBussinessConstant.AllowedCurrencies, CommonBussinessConstant.AllAllowedBranches).catch((error) => this.logger.log(error));
    if (result && result.RequestBranch === CommonBussinessConstant.FACILITY_USER_INPUT_VALUE) {
      this.enableCifBranch = false;
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.branchOptions.fcName], 0);
    } else {
      this.enableCifBranch = true;
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.stepperOptions.namesofSteps[1]], 0, true);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.branchOptions.fcName], 1);
    }

    if (result !== -1 && result.AcntOpenBranchesMatAcc === ConstantCommon.cifBranch) {
      const aBranch = result.allowedBranches ? result.allowedBranches.toString().split(',') : result.AllAllowedBranches.split(',');
      this.mapAtmBranchesOptions.branchIds = this.mapAtmBranchesOptions.branchIds + ',' + aBranch;
    }
  }

  onSelectBranch($event) {
    if ($event.itemValue !== undefined) {
      this.formGroup.controls[this.selectBranchOptions.fcName].setValue($event);
      this.commonProv.setValInsideNestedObj(this.selectBranchOptions.fcName, $event.selectedObj, this.defaultVO);
    }
  }



  onAmountChange(event) {
    if (event && event.amount) {
      let downPayment = this.formGroup.controls[this.facilityRequestOptions.downPaymentOptions.fcName].value;
      downPayment = typeof downPayment === 'string' ? Number(downPayment.replace(/[^0-9.-]+/g, '')) : downPayment;

      this.CalculateFinanceAmount(event.amount, downPayment);
    }
  }
  onDownpaymentChange(event) {
    if (event && event.newValue) {
      let amount = this.formGroup.controls[this.facilityRequestOptions.complexAmountOptions.amountOptions.fcName].value;
      amount = typeof amount === 'string' ? Number(amount.replace(/[^0-9.-]+/g, '')) : amount;

      this.CalculateFinanceAmount(amount, event.newValue);
    }
  }
  CalculateFinanceAmount(amount: number, downPayment: number) {
    if (this.formGroup.controls[this.facilityRequestOptions.amountLabelOptions.fcName]) {
      this.formGroup.controls[this.facilityRequestOptions.amountLabelOptions.fcName].setValue((amount - downPayment).toString());
    }
  }
  redirectToSchedule(params: any[]) {
  }

  onFacilityTypeChanged(value: any) {
    if (value && value.selectedObj) {
      this.facility = value.selectedObj;
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.facilityRequestOptions.revolvingAmountOptions.fcName], 1);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.facilityRequestOptions.revolvingAmountOptions.fcName], 1);
      this.formGroup.controls[this.facilityRequestOptions.revolvingAmountOptions.fcName].setValue((value.selectedObj.revolvingOneOff === 'O' ? this.common.translate('one_off_key') : this.common.translate('Revolving_key')));
      if (value.selectedObj.code !== this.facility.code) {

        if (this.formGroup.controls[this.facilityRequestOptions.complexAmountOptions.amountOptions.fcName]) {
          this.formGroup.controls[this.facilityRequestOptions.complexAmountOptions.amountOptions.fcName].setValue('');
        }
        if (this.formGroup.controls[this.facilityRequestOptions.downPaymentOptions.fcName]) {
          this.formGroup.controls[this.facilityRequestOptions.downPaymentOptions.fcName].setValue(0);
        }
      }
    }
  }








  selectFile(event) {
    if (event) {
      const fileType = event[0].selectedFile.type.substring(0, event[0].selectedFile.type.indexOf('/'));
    }
  }

}
