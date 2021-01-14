import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsComplexSelectBranchComponentExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-select-branch/ps-complex-select-branch.component.interface';
import { IOptionsPsOptionCardExposed } from 'src/app/commonBussinessSRC/psComponents/ps-container-lookup-option/ps-option-card/ps-option-card.component.interface';
import { PsInputDisplayOnlyCIFAddressHomeExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-display-only-cif-address-home/ps-input-display-only-cif-address-home.component.interface';
import { PsInputDisplayOnlyCIFAddressWorkExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-display-only-cif-address-work/ps-input-display-only-cif-address-work.component.interface';
import { IOptionsPsInputNumericExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-numeric/ps-input-numeric.component.interfaces';
import { IOptionsPsDropdownCardBlockReasonExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-block-reasons/ps-dropdown-block-reasons.component.interface';
import { IOptionsPsLovDeliveryLocationExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-delivery-location/ps-lov-delivery-location.component.interface';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { CardManagementVO } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsPsContainerPanel, IOptionsPsKeyinTextarea, IOptionsPsSelectToggle, IOptionsTemplateStepper, IOptionsPsKeyinInputExposed, IOptionsPsInputAmount } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { OmniBasePage } from '../omni-base/omni-base.page';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { IOptionsPsDropdownCoreReasonsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-core-reasons/ps-dropdown-core-reasons.component.interface';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsDisplayOnlyCurrencyAmountExposed } from 'src/app/commonBussinessSRC/psComponents/ps-input-display-only/ps-display-only-currency-amount/ps-display-only-currency-amount.component.interfaces';


@Component({
  selector: 'card-management',
  templateUrl: './card-management.page.html',
  styleUrls: ['./card-management.page.scss'],
})
export class CardManagementPage extends OmniBasePage implements OnInit {
  CardManagementVO: CardManagementVO = {};
  debitCardOptions: IOptionsPsOptionCardExposed = {};
  blockCard = false;
  renewCard = false;
  limitUpdate = false;
  showAddress = false;
  showManualAddress = false;
  showDestinationBranchMap = false;
  enableCifBranch: any = false;
  enableDeliveryLoc = false;
  showHomeWorkAddress = false;
  showHomeAddress = false;
  allowReissue: boolean;
  constructor(public logger: LoggerService, private omniPull: OmniPullService, private navService: PsNavigatorService) {
    super();
  }

  private formGroup = new FormGroup({});
  showPos = false;
  showWd = false;
  public options: IOptionsTemplateStepper = {
    stepperName: 'card_management_stepper',
    numberOfSteps: 1,
    group: this.formGroup,
    submitOptions: {
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.cardActionRequestEndPoint,
      group: this.formGroup,
      postCallFunction: {
        func(response) {
          return new Promise<any>((resolve, reject) => {
            resolve(this.executionClass.updateCardManageFunction(response));
          });
        },
        params: [this],
        executionClass: this
      },
    },
    requestObject: this.CardManagementVO,
    isHorizontalStepper: true,
    namesofSteps: ['cardManagement']
  };

  panelOptions1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'card_information_key',
    iconName: 'document',
    expanded: true
  };

  panelOptions2: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'card_block_options_key',
    iconName: 'document',
    expanded: true
  };

  panelOptions3: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'card_renew_key',
    iconName: 'document',
    expanded: true
  };

  panelOptions6: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'pos_limit_update_key',
    iconName: 'document',
    expanded: true
  };

  panelOptions7: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'widthrawal_limit_update_key',
    iconName: 'document',
    expanded: true
  };

  deliveryLocOptions: IOptionsPsLovDeliveryLocationExposed = {
    group: this.formGroup,
    fcName: 'deliveryLoc'
  };

  homeAddressDetailsOptions: PsInputDisplayOnlyCIFAddressHomeExposed = {
    placeHolder: 'address_details_key',
    labelKey: 'address_details_key',
    group: this.formGroup,
    fcName: 'addressDetails',
    requestVO: this.CardManagementVO
  };

  workAddressDetailsOptions: PsInputDisplayOnlyCIFAddressWorkExposed = {
    placeHolder: 'address_details_key',
    labelKey: 'address_details_key',
    group: this.formGroup,
    fcName: 'addressDetails',
    requestVO: this.CardManagementVO
  };

  inputOptions: IOptionsPsKeyinTextarea = {
    labelKey: 'address_details_key',
    rows: '3',
    cols: '10',
    fcName: 'otherAddressDetails',
    group: this.formGroup,
  };

  cardBlockToggleOptions: IOptionsPsSelectToggle = {
    labelKey: 're_issue_card_key',
    placeHolder: 're_issue_card_key',
    group: this.formGroup,
    fcName: 'reIssueCard',
    psClass: 'toggleColor'
  };

  cardBlockReason: IOptionsPsDropdownCoreReasonsExposed = {
    fcName: 'cardBlockReason',
    group: this.formGroup,
    labelKey: 'card_block_reason_key',
    placeHolder: 'please_select_card_block_reason_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };

  // currentPosLimitOptions: IOptionsPsKeyinInputExposed = {
  //   labelKey: 'current_pos_limit_key',
  //   fcName: 'currentPosLimit',
  //   group: this.formGroup
  // };

  limitRequestPosOptions: IOptionsPsInputAmount = {
    fcName: 'requestPosLimit',
    group: this.formGroup,
    labelKey: 'requested_pos_limit_key',
    placeHolder: 'requested_pos_limit_key'
  };

  selectBranchOptions: IOptionsPsComplexSelectBranchComponentExposed = {
    fcName: 'mapAtmBranchesDropdown',
    group: this.formGroup,
  };

  currentPosLimitOptions: IOptionsPsDisplayOnlyCurrencyAmountExposed = {
    currency: '',
    currenciesOptions: {
      labelKey: 'currency_key',
      placeHolder: 'currency_key',
      fcName: 'currencyCode',
      group: this.formGroup
    },
    amountOptions: {
      labelKey: 'current_pos_limit_key',
      placeHolder: 'current_pos_limit_key',
      fcName: 'currentPosLimit',
      type: 'amount',
      group: this.formGroup
    }
  };

  currentWdLimitOptions: IOptionsPsDisplayOnlyCurrencyAmountExposed = {
    currency: '',
    currenciesOptions: {
      labelKey: 'currency_key',
      placeHolder: 'currency_key',
      fcName: 'currencyCode',
      group: this.formGroup
    },
    amountOptions: {
      labelKey: 'current_widthrawal_limit_key',
      placeHolder: 'current_widthrawal_limit_key',
      fcName: 'currentWdLimit',
      type: 'amount',
      group: this.formGroup
    }
  };
  limitRequestWdOptions: IOptionsPsInputAmount = {
    fcName: 'requestWdLimit',
    group: this.formGroup,
    labelKey: 'requested_widthrawal_limit_key',
    placeHolder: 'requested_widthrawal_limit_key'
  };

  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
    this.CardManagementVO = this.navService.getAllParams() ? this.navService.getAllParams().ScreenVO ?  this.navService.getAllParams().ScreenVO :  this.navService.getAllParams() : {};
    this.commonProv.copyObject(this.options.requestObject, this.CardManagementVO, true, false);
    this.debitCardOptions.isEditable = true;
    this.debitCardOptions.cardAction = true;
    this.debitCardOptions.listOfOptions = [];
    this.debitCardOptions.itemList = [];
    this.debitCardOptions.listOfOptions[0] = this.CardManagementVO;
    this.debitCardOptions.itemList[0] = this.CardManagementVO;
    delete this.options.requestObject.key;
    this.logger.log('this.CardManagementVO', this.CardManagementVO);
    if (this.CardManagementVO.action === CommonBussinessConstant.CARD_ACTION_TYPE_BLOCK) {
      this.blockCard = true;
      if (this.CardManagementVO.limitFlags && this.CardManagementVO.limitFlags.cardTypeObject.allowRenew !== '0') {
        this.allowReissue = true;
        this.CardManagementVO.limitFlags.cardTypeObject.allowRenew = true;
      }
    } else if (this.CardManagementVO.action === CommonBussinessConstant.CARD_ACTION_TYPE_RENEW) {
      this.renewCard = true;
    } else if (this.CardManagementVO.action === CommonBussinessConstant.CARD_ACTION_TYPE_LIMIT_UPDATE) {
      this.limitUpdate = true;
      this.showPos = (this.CardManagementVO.limitFlags.posLimitOverride === '1' && this.CardManagementVO.limitFlags.cardTypeObject.posLimitBasedOn != undefined) ? true : false;
      this.showWd = this.CardManagementVO.limitFlags.wdLimitOverride === '1' ? true : false;
      this.commonProv.setValInsideNestedObj(this.currentPosLimitOptions.amountOptions.fcName, this.CardManagementVO.posLimitAmount ? this.CardManagementVO.posLimitAmount : this.CardManagementVO.limitFlags.posLimitAmount, this.options.requestObject);
      this.commonProv.setValInsideNestedObj(this.currentPosLimitOptions.currenciesOptions.fcName, this.CardManagementVO.currencyCode, this.options.requestObject);
      this.commonProv.setValInsideNestedObj(this.currentWdLimitOptions.amountOptions.fcName, this.CardManagementVO.cardWdLimitAmount ? this.CardManagementVO.cardWdLimitAmount : this.CardManagementVO.limitFlags.wdLimitAmount, this.options.requestObject);
      this.commonProv.setValInsideNestedObj(this.currentWdLimitOptions.currenciesOptions.fcName, this.CardManagementVO.currencyCode, this.options.requestObject);
    }
  }

  ionViewDidEnter() {
    super.ionViewDidEnter();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.cardBlockToggleOptions.fcName], 0);
    this.fetchParameter();
    this.commonProv.setValInsideNestedObj(this.cardBlockToggleOptions.fcName, this.CardManagementVO.limitFlags.cardTypeObject.allowRenew, this.options.requestObject);
    this.commonProv.dismissLoading();
  }

  private updateCardManageFunction(response) {
    if (response.outputCode === 0 || response.outputType === 'S') {
      this.navService.pop();
    } else {
      CommonUtils.presentFailureAlert(response.outputNotification, { autoHide: true });
    }
  }

  onLocChange(values: any) {
    if (values && values.selectedObj) {
      if (values.selectedObj.itemValue === CommonBussinessConstant.SPECIFIC_BRANCH_VALUE) {
        this.showAddress = false;
        this.showManualAddress = false;
        this.enableCifBranch = true;
      } else {
        this.enableCifBranch = false;
        if (values.selectedObj.itemValue === CommonBussinessConstant.HOME_ADDRESS_VALUE || values.selectedObj.itemValue === CommonBussinessConstant.WORK_ADDRESS_VALUE) {
          this.showAddress = true; this.showManualAddress = false;
          this.showHomeWorkAddress = values.selectedObj.itemValue === CommonBussinessConstant.HOME_ADDRESS_VALUE;
        } else if (values.selectedObj.itemValue === CommonBussinessConstant.OTHER_ADDRESS_VALUE) {
          this.showManualAddress = true; this.showAddress = false;
        }

      }
    }

  }

  async fetchParameter() {
    const result = await this.omniPull.getParamValOf(CommonBussinessConstant.CARDS_DESTINATION_BRANCH).catch((error) => {
      this.logger.error('Error ! while fetching admin param in card management page ', error);
    });
    if (result !== -1 && result.CollectionDestinationBranch === CommonBussinessConstant.END_USER_INPUT_ID) {
      this.enableDeliveryLoc = true;
    } else {
      this.enableDeliveryLoc = false;
    }
  }

}
