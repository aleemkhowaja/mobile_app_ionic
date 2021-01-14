import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PsAccountsListComponent } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component';
import { IOptionsPsComplexSelectBranchComponentExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-select-branch/ps-complex-select-branch.component.interface';
import { PsInputDisplayOnlyCIFAddressHomeExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-display-only-cif-address-home/ps-input-display-only-cif-address-home.component.interface';
import { PsInputDisplayOnlyCIFAddressWorkExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-display-only-cif-address-work/ps-input-display-only-cif-address-work.component.interface';
import { IOptionsPsInputVarcharExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsLookupOwnAccountsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.interfaces';
import { IOptionsPsMapAtmBranchesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.interfaces';
import { IOptionsPsDropdownCardTypesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-card-types/ps-dropdown-card-types.component.interface';
import { IOptionsPsLovDeliveryLocationExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-delivery-location/ps-lov-delivery-location.component.interface';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { CreditCardRequestVO } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniCommonService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-common.service';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { EventEmitterService } from 'src/app/commonSRC/psServices/event-emitter/event-emitter.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsContainerPanel, IOptionsPsKeyinInputExposed, IOptionsPsKeyinTextarea, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { OmniBasePage } from '../omni-base/omni-base.page';


@Component({
  selector: 'credit-card-request',
  templateUrl: './credit-card-request.page.html',
  styleUrls: ['./credit-card-request.page.scss'],
})
export class CreditCardRequestPage extends OmniBasePage implements OnInit {

  formGroup: FormGroup = new FormGroup({});
  creditCardRequestVO: CreditCardRequestVO = {};
  enableCifBranch = false;
  cifInfo: any;

  stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'credit_card_stepper',
    isHorizontalStepper: true,
    numberOfSteps: 2,
    namesofSteps: [
      'credit_card_req_step1',
      'credit_card_req_step2'
    ],
    group: this.formGroup,
    submitOptions: {
      extraParams: {},
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.creditCardRequest,
      group: this.formGroup,
    },
    requestObject: this.creditCardRequestVO,
  };
  panelOptions1Step1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'card_details_key',
    iconName: 'new-card-request',
    expanded: true,
  };
  panelOptions2Step1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'select_map_branch_key',
    iconName: 'location-pin',
    expanded: true,
  };
  panelOptions3Step1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'select_destination_branch_key',
    iconName: 'location-pin',
    expanded: true,
  };
  panelOptionsStep2: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'choose_destination_Branch_key',
    iconName: 'location-pin',
    expanded: true,
  };
  atmBranchesPanelOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'choose_request_branch_key',
    iconName: 'location-pin',
    expanded: true,
  };
  branchOptions: IOptionsPsKeyinInputExposed = {
    labelKey: 'request_branch_key',
    group: this.formGroup,
    fcName: 'branchName',
  };
  cardHolderNameOptions: IOptionsPsInputVarcharExposed = {
    placeHolder: 'card_holder_name_key',
    labelKey: 'card_holder_name_key',
    group: this.formGroup,
    fcName: 'cardHolderName',
  };
  cardTypeOptions: IOptionsPsDropdownCardTypesExposed = {
    labelKey: 'card_type_key',
    placeHolder: 'select_card_type_key',
    group: this.formGroup,
    fcName: 'cardType',
    cardType: ConstantCommon.CARDTYPE_C,
  };

  mapAtmBranchesOptions: IOptionsPsMapAtmBranchesExposed = {
    group: this.formGroup,
    fcName: 'mapAtmBranches',
    labelKey: 'map_atm-branch_key',
    mapOptions: {
      labelKey: 'map',
    },
    showSegments: false,
    mapTypesInclude: '\'B\'',
    branchIds: '1,3,5',
    parameterToCheck: CommonBussinessConstant.CARDS_REQUEST_BRANCH
  };

  destinationBranchesOptions: IOptionsPsMapAtmBranchesExposed = {
    group: this.formGroup,
    fcName: 'destinationBranches',
    labelKey: 'destination_branch_key',
    mapOptions: {
      labelKey: 'map',
    },
    showSegments: false,
    mapTypesInclude: '\'B\'',
    branchIds: '1,3,5',
  };
  posLimitOptions: IOptionsPsKeyinInputExposed = {
    placeHolder: '',
    labelKey: 'pos_Limit_key',
    fcName: 'posLimit',
    group: this.formGroup,
  };


  withdrawalLimitOptions: IOptionsPsKeyinInputExposed = {
    placeHolder: '',
    labelKey: 'withdrawal_limit_key',
    fcName: 'withdrawalLimit',
    group: this.formGroup,
  };
  billingCycleOptions: IOptionsPsKeyinInputExposed = {
    labelKey: 'bilind_cycle_key',
    fcName: 'billingCycle',
    group: this.formGroup,
  };

  deliveryLocOptions: IOptionsPsLovDeliveryLocationExposed = {
    group: this.formGroup,
    fcName: 'deliveryLoc',
  };
  manualAddressOptions: IOptionsPsKeyinTextarea = {
    labelKey: 'Address_details_key',
    rows: '3',
    cols: '10',
    fcName: 'otherAddressDetails',
    group: this.formGroup,
  };
  homeAddressDetailsOptions: PsInputDisplayOnlyCIFAddressHomeExposed = {
    placeHolder: 'home_address_key',
    labelKey: 'home_address_key',
    group: this.formGroup,
    fcName: 'homeAddress',
    requestVO: this.creditCardRequestVO,
  };
  workAddressDetailsOptions: PsInputDisplayOnlyCIFAddressWorkExposed = {
    placeHolder: 'work_address_key',
    labelKey: 'work_address_key',
    group: this.formGroup,
    fcName: 'workAddress',
    requestVO: this.creditCardRequestVO,
  };

  selectBranchOptions: IOptionsPsComplexSelectBranchComponentExposed = {
    fcName: 'mapAtmBranchesDropdown',
    group: this.formGroup,
  };
  selectDestinationBranchOptions: IOptionsPsComplexSelectBranchComponentExposed = {
    fcName: 'destinationBranchesDropdown',
    group: this.formGroup,
  };
  settlementAccountOptions: IOptionsPsLookupOwnAccountsExposed = {
    labelKey: 'settlement_account_key',
    placeHolder: 'settlement_account_key',
    accountNumber: '',
    currency: '',
    group: this.formGroup,
    accountAllowedCurrencies: [],
    accountAllowedTypes: [],
    glTypes: ConstantCommon.GeneralType,
    fcName: 'settlementAccount',
    component: PsAccountsListComponent,
    fromTo: 'from',
    accountType: ConstantCommon.GeneralType,
    requestObject: this.creditCardRequestVO,
  };


  constructor(private omniPull: OmniPullService, public loggerP: LoggerService, public commonService: PsCommonService, public omniCommon: OmniCommonService, public eventEmitterService: EventEmitterService) {
    super();
  }

  async ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.manualAddressOptions.fcName,
    this.workAddressDetailsOptions.fcName, this.homeAddressDetailsOptions.fcName, this.destinationBranchesOptions.fcName,
    this.deliveryLocOptions.fcName, this.mapAtmBranchesOptions.fcName,], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.manualAddressOptions.fcName,
    this.workAddressDetailsOptions.fcName, this.homeAddressDetailsOptions.fcName,
    this.destinationBranchesOptions.fcName, this.mapAtmBranchesOptions.fcName, this.selectDestinationBranchOptions.fcName,
    ], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['credit_card_req_pane2-1'], 0, true);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['destBranch'], 0, true);
  }


  ionViewDidEnter(): void {
    super.ionViewDidEnter();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.manualAddressOptions.fcName,
    this.workAddressDetailsOptions.fcName, this.homeAddressDetailsOptions.fcName, this.destinationBranchesOptions.fcName,
    this.deliveryLocOptions.fcName, this.mapAtmBranchesOptions.fcName,], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.manualAddressOptions.fcName,
    this.workAddressDetailsOptions.fcName, this.homeAddressDetailsOptions.fcName,
    this.destinationBranchesOptions.fcName, this.mapAtmBranchesOptions.fcName, this.selectDestinationBranchOptions.fcName,
    ], 0);


    this.fetchParameter();

    this.eventEmitterService.getSelectBranchEmitter().subscribe((val) => {
      this.formGroup.controls[this.mapAtmBranchesOptions.fcName].setValue(val);
      this.commonProv.setValInsideNestedObj(this.mapAtmBranchesOptions.fcName, val, this.creditCardRequestVO);
    });
    this.creditCardRequestVO[this.cardHolderNameOptions.fcName] = this.omniCommon.common.getLoginResponse().customerInfoCO.longName;

  }
  async fetchParameter() {
    this.cifInfo = this.commonService.session.getValueOf(ConstantCommon.USERINFO);

    const result = await this.omniPull.getParamValOf(CommonBussinessConstant.CARDS_REQUEST_BRANCH, CommonBussinessConstant.CARDS_DESTINATION_BRANCH)
      .catch((error) => {
        console.log(error);
      });
    if (result !== -1 && result.RequestBranch === CommonBussinessConstant.END_USER_INPUT_ID) {
      this.enableCifBranch = false;
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.destinationBranchesOptions.fcName], 0);
    } else {
      if (result.RequestBranch === CommonBussinessConstant.ACCOUNT_BRANCH_ID) {

        this.commonProv.setValInsideNestedObj(this.branchOptions.fcName, this.cifInfo.cifBranch ? this.cifInfo.customerInfoCO.branchCode : '', this.creditCardRequestVO);
      } else {
        this.commonProv.setValInsideNestedObj(this.branchOptions.fcName, this.cifInfo.cifBranch ? this.cifInfo.customerInfoCO.branchBriefDesc : '', this.creditCardRequestVO);
      }

      this.enableCifBranch = true;
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.stepperOptions.namesofSteps[1]], 0, true);
      this.commonProv.copyObject(this.stepperOptions.submitOptions.extraParams, { branch: this.cifInfo.customerInfoCO ? this.cifInfo.customerInfoCO.branchCode : '', }, false, true);
    }
    if (result !== -1 && result.CollectionDestinationBranch === CommonBussinessConstant.END_USER_INPUT_ID) {
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.deliveryLocOptions.fcName], 1);
    }
  }
  onCardTypeChange(values: any) {
    if (values.selectedObj) {
      switch (values.selectedObj.wdLimitBasedOn) {
        case CommonBussinessConstant.LIMIT:
          // Todo: base currency is missing
          this.commonProv.setValInsideNestedObj(this.withdrawalLimitOptions.fcName, values.selectedObj.wdLimitAmount + this.getPeriodiCity(values.selectedObj.wdLimitCheckPeriod), this.creditCardRequestVO);
          break;
        case CommonBussinessConstant.OPEN:
          this.commonProv.setValInsideNestedObj(this.withdrawalLimitOptions.fcName, 'Unlimited', this.creditCardRequestVO);
          break;
        case CommonBussinessConstant.BALANCE:
          this.commonProv.setValInsideNestedObj(this.withdrawalLimitOptions.fcName, (values.selectedObj.accountBalance) ? values.selectedObj.accountBalance : '0', this.creditCardRequestVO);
          break;
      }
      switch (values.selectedObj.posLimitBasedOn) {
        case CommonBussinessConstant.LIMIT:
          // Todo: base currency and periodicty is missing
          this.commonProv.setValInsideNestedObj(this.posLimitOptions.fcName, (values.selectedObj.posLimitAmount) ? values.selectedObj.posLimitAmount : '0', this.creditCardRequestVO);
          break;
        case CommonBussinessConstant.OPEN:
          this.commonProv.setValInsideNestedObj(this.posLimitOptions.fcName, 'Unlimited', this.creditCardRequestVO);
          break;
      }
      if (values.selectedObj.billingCycle) {
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.billingCycleOptions.fcName], 1);
        this.commonProv.setValInsideNestedObj(this.withdrawalLimitOptions.fcName, values.selectedObj.billingCycle, this.creditCardRequestVO);
      }
    }
  }



  onDeliveryLocationChange(values: any) {
    // console.log(values);
    if (values && values.selectedObj) {
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.stepperOptions.namesofSteps[1]], 0, true);
      switch (values.selectedObj.itemValue) {
        case CommonBussinessConstant.SPECIFIC_BRANCH_VALUE: // should enable the next step to allow user select the branch
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.homeAddressDetailsOptions.fcName, this.workAddressDetailsOptions.fcName, this.manualAddressOptions.fcName], 0);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.mapAtmBranchesOptions.fcName], 0);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['credit_card_req_pane2-1'], 1, true);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['destBranch'], 1, true);

          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.stepperOptions.namesofSteps[1]], 1, true);
          if (!this.enableCifBranch) {
            this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.mapAtmBranchesOptions.fcName], this.commonProv.getElementValidations(this.mapAtmBranchesOptions.fcName).IS_MANDATORY);
          }
          break;
        case CommonBussinessConstant.HOME_ADDRESS_VALUE:
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.homeAddressDetailsOptions.fcName], 1);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.manualAddressOptions.fcName, this.workAddressDetailsOptions.fcName], 0);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['credit_card_req_pane2-1'], 0, true);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['destBranch'], 0, true);
          break;
        case CommonBussinessConstant.WORK_ADDRESS_VALUE:
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.workAddressDetailsOptions.fcName], 1);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.manualAddressOptions.fcName, this.homeAddressDetailsOptions.fcName], 0);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['credit_card_req_pane2-1'], 0, true);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['destBranch'], 0, true);
          break;
        case CommonBussinessConstant.OTHER_ADDRESS_VALUE:
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.workAddressDetailsOptions.fcName, this.homeAddressDetailsOptions.fcName], 0);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.manualAddressOptions.fcName], 1);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['credit_card_req_pane2-1'], 0, true);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['destBranch'], 0, true);
          break;
        default:
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.homeAddressDetailsOptions.fcName, this.workAddressDetailsOptions.fcName, this.manualAddressOptions.fcName], 0);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['credit_card_req_pane2-1'], 0, true);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['destBranch'], 0, true);
          break;
      }

    }
  }

  onSelectBranch(event) {
    if (event.itemValue !== undefined) {
      this.formGroup.controls[this.selectBranchOptions.fcName].setValue(event);
      this.commonProv.setValInsideNestedObj(this.selectBranchOptions.fcName, event.selectedObj, this.creditCardRequestVO);
    }
  }
  onSelectDestinationBranch(event) {
    if (event.itemValue !== undefined) {
      if (event.itemValue !== undefined) {
        this.formGroup.controls[
          this.selectDestinationBranchOptions.fcName
        ].setValue(event);
        this.commonProv.setValInsideNestedObj(
          this.selectDestinationBranchOptions.fcName,
          event.selectedObj,
          this.creditCardRequestVO
        );
      }
    }
  }

  getPeriodiCity(val) {
    switch (val) {
      case CommonBussinessConstant.DAYS:
        return CommonBussinessConstant.DY;
      case CommonBussinessConstant.MONTHS:
        return CommonBussinessConstant.MNTH;
      case CommonBussinessConstant.WEEK_CODE:
        return CommonBussinessConstant.WEEK;
      case CommonBussinessConstant.QUATER_CODE:
        return CommonBussinessConstant.QUATER;
      case CommonBussinessConstant.YEAR:
        return CommonBussinessConstant.YR;
      default:
        return CommonBussinessConstant.DY;
    }
  }
}
