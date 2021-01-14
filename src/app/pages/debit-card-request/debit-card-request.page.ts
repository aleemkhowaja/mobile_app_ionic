import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PsAccountsListComponent } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component';
import { IOptionsPsComplexSelectBranchComponentExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-select-branch/ps-complex-select-branch.component.interface';
import { PsInputDisplayOnlyCIFAddressHomeExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-display-only-cif-address-home/ps-input-display-only-cif-address-home.component.interface';
import { PsInputDisplayOnlyCIFAddressWorkExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-display-only-cif-address-work/ps-input-display-only-cif-address-work.component.interface';
import { IOptionsPsInputVarcharExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsMapAtmBranchesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.interfaces';
import { IOptionsPsDropdownCardTypesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-card-types/ps-dropdown-card-types.component.interface';
import { IOptionsPsLovDeliveryLocationExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-delivery-location/ps-lov-delivery-location.component.interface';
import { IOcBranchesRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniCommonService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-common.service';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { EventEmitterService } from 'src/app/commonSRC/psServices/event-emitter/event-emitter.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsKeyinTextarea } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsContainerPanel, IOptionsPsKeyinInputExposed, IOptionsPsLabel, IOptionsTemplateStepper } from '../../commonSRC/psServices/models/ps-common-interface';
import { OmniBasePage } from '../omni-base/omni-base.page';
import { IOptionsPsLookupOwnAccountsExposed } from './../../commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.interfaces';
import { CommonBussinessConstant } from './../../commonBussinessSRC/psServices/models/ps-common-bussiness-constant';


@Component({
  selector: 'debit-card-request',
  templateUrl: './debit-card-request.page.html',
  styleUrls: ['./debit-card-request.page.scss'],
})
export class CardRequestPage extends OmniBasePage implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  debitCardRequestVO = {};
  enableCardLimit = false;
  enablePosLimit = false;
  primaryAccount: string;
  cifInfo: any;
  stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'deb_card_stepper',
    isHorizontalStepper: true,
    numberOfSteps: 2,
    namesofSteps: ['debit_card_req_step1', 'debit_card_req_step2'],
    group: this.formGroup,
    requestObject: this.debitCardRequestVO,
    submitOptions: {
      extraParams: {},
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.debitCardRequest,
      group: this.formGroup,
    },
  };
  cardType: string;

  mapAtmBranchesOptions: IOptionsPsMapAtmBranchesExposed = {
    group: this.formGroup,
    fcName: 'mapAtmBranches',
    labelKey: 'map_atm-branch_key',
    mapOptions: {
      labelKey: 'map',
    },
    showSegments: false,
    mapTypesInclude: '\'B\'',
    parameterToCheck: CommonBussinessConstant.CARDS_REQUEST_BRANCH
  };


  panelOptions1Step1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'debit_card_request_key',
    iconName: 'new-card-request',
    expanded: true,
  };
  lblOptions: IOptionsPsLabel = {
    group: this.formGroup,
    labelKey: 'branch_key',
  };
  lblOptionsCif: IOptionsPsLabel = {
    group: this.formGroup,
    labelKey: 'embossed_name_key',
  };
  cifNameOptions: IOptionsPsLabel = {
    group: this.formGroup,
  };
  cifBranchOtpions: IOptionsPsLabel = {};
  cardTypeOptions: IOptionsPsDropdownCardTypesExposed = {
    labelKey: 'card_type_key',
    placeHolder: 'card_type_key',
    group: this.formGroup,
    fcName: 'cardType',
    cardType: ConstantCommon.CARDTYPE_D,
  };
  primaryAccountOptions: IOptionsPsLookupOwnAccountsExposed = {
    labelKey: 'primary_account_key',
    placeHolder: 'primary_account_key',
    accountNumber: '',
    currency: '',
    group: this.formGroup,
    accountAllowedCurrencies: [],
    accountAllowedTypes: [],
    glTypes: ConstantCommon.GeneralType,
    fcName: 'primaryAccount',
    component: PsAccountsListComponent,
    fromTo: 'from',
    accountType: ConstantCommon.GeneralType,
    requestObject: this.debitCardRequestVO,
  };
  secondaryAccountOptions: IOptionsPsLookupOwnAccountsExposed = {
    labelKey: 'secondary_account_key',
    placeHolder: 'secondary_account_key',
    accountNumber: '',
    currency: '',
    group: this.formGroup,
    accountAllowedCurrencies: [],
    accountAllowedTypes: [],
    glTypes: ConstantCommon.GeneralType,
    fcName: 'supplementaryAccount',
    component: PsAccountsListComponent,
    fromTo: 'from',
    accountType: ConstantCommon.GeneralType,
    requestObject: this.debitCardRequestVO,
  };

  branchOptions: IOptionsPsKeyinInputExposed = {
    placeHolder: 'request_branch_key',
    labelKey: 'request_branch_key',
    group: this.formGroup,
    fcName: 'branchName',
  };

  withdrawalLimitOptions: IOptionsPsKeyinInputExposed = {
    placeHolder: '',
    labelKey: 'Withdrawal_Limit_key',
    group: this.formGroup,
    fcName: 'withdrawalLimit',
  };

  posLimitOptions: IOptionsPsKeyinInputExposed = {
    placeHolder: '',
    labelKey: 'pos_Limit_key',
    group: this.formGroup,
    fcName: 'posLimit',
  };

  cardHolderNameOptions: IOptionsPsInputVarcharExposed = {
    placeHolder: 'cardholder_name_key',
    labelKey: 'cardholder_name_key',
    group: this.formGroup,
    fcName: 'embossedName',
  };

  deliveryLocOptions: IOptionsPsLovDeliveryLocationExposed = {
    group: this.formGroup,
    fcName: 'deliveryLoc',
  };

  homeAddressDetailsOptions: PsInputDisplayOnlyCIFAddressHomeExposed = {
    placeHolder: 'home_address_key',
    labelKey: 'home_address_key',
    group: this.formGroup,
    fcName: 'homeAddress',
    requestVO: this.debitCardRequestVO,
  };
  workAddressDetailsOptions: PsInputDisplayOnlyCIFAddressWorkExposed = {
    placeHolder: 'work_address_key',
    labelKey: 'work_address_key',
    group: this.formGroup,
    fcName: 'workAddress',
    requestVO: this.debitCardRequestVO,
  };

  manualAddressOptions: IOptionsPsKeyinTextarea = {
    labelKey: 'Address_details_key',
    rows: '3',
    cols: '10',
    fcName: 'otherAddressDetails',
    group: this.formGroup,
  };
  atmBranchesPanelOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'choose_request_brnach_key',
    iconName: 'crop',
    expanded: true,
  };
  panelOptionsStep2: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'choose_destination_Branch_key',
    iconName: 'location-pin',
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
  requestBranchOptions: IOptionsPsKeyinInputExposed = {
    labelKey: 'request_branch_key',
    fcName: 'requestBranch',
    placeHolder: '',
    group: this.formGroup,
  };
  deliveryBranchOptions: IOptionsPsKeyinInputExposed = {
    placeHolder: '',
    labelKey: 'delivery_location_key',
    group: this.formGroup,
    fcName: 'deliveryLocationBranch',
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
  };

  selectBranchOptions: IOptionsPsComplexSelectBranchComponentExposed = {
    fcName: 'mapAtmBranchesDropdown',
    group: this.formGroup,
  };
  selectDestinationBranchOptions: IOptionsPsComplexSelectBranchComponentExposed = {
    fcName: 'destinationBranchesDropdown',
    group: this.formGroup,
  };
  selectedBranchObj = {};
  enableCifBranch = false;
  enableCifName = false;
  enableDeliveryLoc = false;
  constructor(
    public loggerP: LoggerService,
    public commonProv: PsCommonService,
    private omniPull: OmniPullService,
    public omniCommon: OmniCommonService,
    public eventEmitterService: EventEmitterService
  ) {
    super();
  }

  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['credit_card_req_pane2-1'], 0, true);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['destBranch'], 0, true);
  }

  ionViewDidEnter() {
    super.ionViewDidEnter();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.manualAddressOptions.fcName, this.workAddressDetailsOptions.fcName, this.homeAddressDetailsOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.manualAddressOptions.fcName, this.workAddressDetailsOptions.fcName, this.homeAddressDetailsOptions.fcName, this.deliveryLocOptions.fcName, this.destinationBranchesOptions.fcName, this.mapAtmBranchesOptions.fcName, this.secondaryAccountOptions.fcName], 0);
    this.cifNameOptions.labelKey = this.omniCommon.common.getLoginResponse().customerInfoCO.longName;
    this.fetchParameter();
  }

  async fetchParameter() {
    this.cifInfo = this.commonProv.session.getValueOf(ConstantCommon.USERINFO);

    const result = await this.omniPull.getParamValOf(CommonBussinessConstant.CARDS_REQUEST_BRANCH, CommonBussinessConstant.CARDS_DESTINATION_BRANCH).catch((error) => { console.log(error); });
    if (result !== -1 && result.RequestBranch === CommonBussinessConstant.END_USER_INPUT_ID) {
      this.enableCifBranch = false;
      this.commonProv.applyDynScreenDisplay(
        ConstantCommon.ACTION_TYPE_MANDATORY,
        [this.destinationBranchesOptions.fcName],
        0
      );
    } else {
      this.enableCifBranch = true;
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.stepperOptions.namesofSteps[1]], 0, true);
      this.commonProv.copyObject(
        this.stepperOptions.submitOptions.extraParams,
        {
          branch: this.cifInfo.customerInfoCO
            ? this.cifInfo.customerInfoCO.branchCode
            : '',
        },
        false,
        true
      );
    }
    if (
      result !== -1 &&
      result.CollectionDestinationBranch ===
      CommonBussinessConstant.END_USER_INPUT_ID
    ) {
      this.enableDeliveryLoc = true;
    } else {
      this.enableDeliveryLoc = false;
    }
    this.eventEmitterService.getSelectBranchEmitter().subscribe((val) => {
      this.formGroup.controls[this.mapAtmBranchesOptions.fcName].setValue(val);
      this.commonProv.setValInsideNestedObj(
        this.mapAtmBranchesOptions.fcName,
        val,
        this.debitCardRequestVO
      );
    });
    this.debitCardRequestVO[
      this.cardHolderNameOptions.fcName
    ] = this.omniCommon.common.getLoginResponse().customerInfoCO.longName;
    this.commonProv.setValInsideNestedObj(
      this.branchOptions.fcName,
      this.cifInfo.cifBranch ? this.cifInfo.customerInfoCO.branchBriefDesc : '',
      this.debitCardRequestVO
    );
    this.commonProv.setValInsideNestedObj(
      this.deliveryBranchOptions.fcName,
      this.cifInfo.cifBranch ? this.cifInfo.customerInfoCO.branchBriefDesc : '',
      this.debitCardRequestVO
    );
    this.commonProv.setValInsideNestedObj(
      this.requestBranchOptions.fcName,
      this.cifInfo.cifBranch ? this.cifInfo.customerInfoCO.branchBriefDesc : '',
      this.debitCardRequestVO
    );
  }

  loadBranch() {
    try {
      const paramData: IOcBranchesRequest = {
        branchesIdList: this.cifInfo.cifBranch ? this.cifInfo.cifBranch : '',
      };
      this.omniPull
        .returnBranchesList(paramData)
        .then((result) => {
          if (
            result &&
            result.gridModel != null &&
            result.gridModel.length > 0
          ) {
            this.formGroup.controls[this.branchOptions.fcName].setValue(
              this.cifInfo.cifBranch
                ? this.cifInfo.cifBranch + ' - ' + result.gridModel[0].longDesc
                : ''
            );
          } else {
            this.loggerP.warn(result, 'empty response');
          }
        })
        .catch((error) => { });
    } catch (error) { }
  }


  onCardTypeChangeItem(values: any) {
    if (values && values.selectedObj) {
      switch (values.selectedObj.wdLimitBasedOn) {
        case 'L':
          this.debitCardRequestVO[this.withdrawalLimitOptions.fcName] =
            values.selectedObj.wdLimitAmount + ' / ' +
            this.getPeriodicCity(values.selectedObj.wdLimitCheckPeriod);
          this.enableCardLimit = true;
          break;
        case 'O':
          this.debitCardRequestVO[this.withdrawalLimitOptions.fcName] =
            'Unlimited';
          this.enableCardLimit = true;
          break;
        case 'B':
          this.debitCardRequestVO[this.withdrawalLimitOptions.fcName] =
            'Account balance';
          this.enableCardLimit = true;
          break;
        default:
          this.enableCardLimit = false;
      }
      switch (values.selectedObj.posLimitBasedOn) {
        case 'L':
          // Todo: base currency and periodicty is missing
          this.debitCardRequestVO[this.posLimitOptions.fcName] =
            values.selectedObj.posLimitAmount;
          this.enablePosLimit = true;
          break;
        case 'O':
          this.debitCardRequestVO[this.posLimitOptions.fcName] = 'Unlimited';
          this.enablePosLimit = true;
          break;
        case 'B':
          this.debitCardRequestVO[this.posLimitOptions.fcName] =
            'Account balance';
          this.enablePosLimit = true;
          break;
        default:
          this.enablePosLimit = false;
      }
    }
  }

  onDeliveryLocationChange(values: any) {
    if (values && values.selectedObj) {
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.stepperOptions.namesofSteps[1]], 0, true);
      switch (values.selectedObj.itemValue) {
        case CommonBussinessConstant.SPECIFIC_BRANCH_VALUE: // should enable the next step to allow user select the branch
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.homeAddressDetailsOptions.fcName, this.workAddressDetailsOptions.fcName, this.manualAddressOptions.fcName], 0);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.mapAtmBranchesOptions.fcName], 0);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['credit_card_req_pane2-1'], 1, true);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['destBranch'], 1, true);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.stepperOptions.namesofSteps[1]], 1, true);
          // need to check
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
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, ['destBranch'], 0, true);          break;
      }
    }
  }
  onSelectBranch(event) {
    if (event.itemValue !== undefined) {
      this.formGroup.controls[this.selectBranchOptions.fcName].setValue(event);
      this.commonProv.setValInsideNestedObj(this.selectBranchOptions.fcName, event.selectedObj, this.debitCardRequestVO);
    }
  }
  onSelectDestinationBranch(event) {
    if (event.itemValue !== undefined) {
      if (event.itemValue !== undefined) {
        this.formGroup.controls[this.selectDestinationBranchOptions.fcName].setValue(event);
        this.commonProv.setValInsideNestedObj(this.selectDestinationBranchOptions.fcName, event.selectedObj, this.debitCardRequestVO);
      }
    }
  }

  getPeriodicCity(val) {
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
