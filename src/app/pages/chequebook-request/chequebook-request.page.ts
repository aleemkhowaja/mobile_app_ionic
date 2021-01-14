import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PsAccountsListComponent } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component';
import { IOptionsPsComplexIdDetailsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-id-details/ps-complex-id-details.interface';
import { IOptionsPsComplexSelectBranchComponentExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-select-branch/ps-complex-select-branch.component.interface';
import { IOptionsPsInputNumericExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-numeric/ps-input-numeric.component.interfaces';
import { IOptionsPsInputVarcharExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsLookupOwnAccountsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.interfaces';
import { IOptionsPsMapAtmBranchesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-map-atm-branches/ps-map-atm-branches.component.interfaces';
import { IOptionsPsDropdownAllowedLanguagesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-allowed-languages/ps-dropdown-allowed-languages.component.interfaces';
import { IOptionsPsDropdownCurrenciesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-currencies/ps-dropdown-currencies.component.interfaces';
import { IOptionsPsDropDownIdTypesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-dropdown-id-types/ps-dropdown-id-types.component.interfaces';
import { IOptionsPsLovDestinationBranchExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-destination-branch/ps-lov-destination-branch.component.interface';
import { IOptionsPsLovPreferredLanguageExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-preferred-language/ps-lov-preferred-language.component.interfaces';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { EventEmitterService } from 'src/app/commonSRC/psServices/event-emitter/event-emitter.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsDropdownChequebookTypesExposed } from '../../commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-chequebook-types/ps-dropdown-chequebook-types.component.interface';
import { IChequeBookRequestVO } from '../../commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from '../../commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { IdefaultValidators, IOptionsPsContainerPanel, IOptionsPsInputAmount, IOptionsPsKeyinInputExposed, IOptionsTemplateStepper } from '../../commonSRC/psServices/models/ps-common-interface';
import { IOcBranchesRequest } from './../../commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniBasePage } from './../omni-base/omni-base.page';


@Component({
  selector: 'app-chequebook-request',
  templateUrl: './chequebook-request.page.html',
  styleUrls: ['./chequebook-request.page.scss'],
})
export class ChequebookRequestPage extends OmniBasePage implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  chequebookVO: IChequeBookRequestVO = {};
  stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'cheq_req_stepper',
    isHorizontalStepper: true,
    numberOfSteps: 2,
    namesofSteps: ['cheque_req_step1', 'cheque_req_step2'],
    group: this.formGroup,
    submitOptions: {
      extraParams: {},
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.chequeBookRequest,
      group: this.formGroup,
    },
    requestObject: this.chequebookVO
  };

  inputAmountOptions: IOptionsPsInputAmount = {
    labelKey: 'Amount_key',
    placeHolder: 'enter_your_amount_key',
    fcName: 'inputAmount',
    group: this.formGroup,
    type: 'amount',
    decimalPoints: 3
  };
  currencyOptions: IOptionsPsDropdownCurrenciesExposed = {
    labelKey: 'currency_key',
    placeHolder: 'currency_key',
    group: this.formGroup,
    fcName: 'currency'
  };
  noOfLeaves: IOptionsPsKeyinInputExposed = {
    labelKey: 'number_of_leaves_key',
    placeHolder: 'number_of_leaves_key',
    group: this.formGroup,
    fcName: 'noOfLeaves'
  };
  noOfchequeBooks: IOptionsPsInputNumericExposed = {
    labelKey: 'number_of_chequebooks_key',
    placeHolder: 'number_of_chequebooks_key',
    group: this.formGroup,
    fcName: 'noOfChequeBooks'
  };
  collecterNameOptions: IOptionsPsInputVarcharExposed = {
    labelKey: 'collector_name_key',
    placeHolder: 'collector_name_key',
    group: this.formGroup,
    fcName: 'collectorName'
  };
  accountListOptions: IOptionsPsLookupOwnAccountsExposed = {
    labelKey: 'account_no_key',
    placeHolder: 'select_account_no_key',
    component: PsAccountsListComponent,
    currency: 'USD',
    group: this.formGroup,
    accountAllowedCurrencies: [],
    accountAllowedTypes: [],
    glTypes: 'G',
    fcName: 'savingAccNo',
    accountType: 'G',
    fromTo: 'from',
    requestObject: this.chequebookVO
  };
  preferredLanguageOptions: IOptionsPsLovPreferredLanguageExposed = {
    fcName: 'lang',
    group: this.formGroup,
    labelKey: 'chequebook_language_key',
    placeHolder: 'select_chequebook_lang_key'
  };
  idTypeOptions: IOptionsPsDropDownIdTypesExposed = {
    fcName: 'id_types',
    group: this.formGroup
  };
  mapAtmBranchesOptions: IOptionsPsMapAtmBranchesExposed = {};
  panelOptions1Step1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'chequebook_details_key',
    iconName: 'document',
    expanded: true
  };
  panelOptions1Step2: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'collector_details_key',
    iconName: 'document',
    expanded: false
  };
  panelOptions2Step1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'select_branch_key',
    iconName: 'document',
    expanded: true
  };
  nameOptions: IOptionsPsKeyinInputExposed = {
    placeHolder: 'name_to_be_printed_key',
    labelKey: 'name_to_be_printed_key',
    group: this.formGroup,
    fcName: 'nameToBePrinted'
  };
  complexIdDetailsOptions: IOptionsPsComplexIdDetailsExposed = {

    dropdownIdTypesOptions: {
      fcName: 'idType',
      group: this.formGroup,
    },
    idNumberOptions: {
      labelKey: 'id_number_key',
      placeHolder: 'enter_id_number_key',
      fcName: 'idNumber',
      group: this.formGroup
    },
    dateExpiryOptions: {
      labelKey: 'expiry_date_key',
      placeHolder: 'enter_expiry_date_key',
      fcName: 'expiryDate',
      group: this.formGroup,
    },
    countriesOptions: {
      placeHolder: 'country_of_issuance_key',
      labelKey: 'country_of_issuance_key',
      fcName: 'country',
      group: this.formGroup,
    },
    issueDateOptions: {
      labelKey: 'issue_date_key',
      placeHolder: 'issue_date_key',
      fcName: 'issueDate',
      group: this.formGroup
    }
  };
  chequebookTypeOptions: IOptionsPsDropdownChequebookTypesExposed = {
    group: this.formGroup,
    fcName: 'chequeBookTypes'
  };
  branchOptions: IOptionsPsKeyinInputExposed = {
    placeHolder: 'get_cif_branch_frm_session_key',
    labelKey: 'branch_key',
    group: this.formGroup,
    fcName: 'branchName'
  };
  destinationBranchOptions: IOptionsPsLovDestinationBranchExposed = {
    group: this.formGroup,
    fcName: 'destinationBranch'
  };
  optionsPreferredLanguage: IOptionsPsDropdownAllowedLanguagesExposed = {
    fcName: 'lang',
    group: this.formGroup,
    labelKey: 'chequebook_language_key',
    placeHolder: 'select_chequebook_lang_key'
  };
  selectBranchOptions: IOptionsPsComplexSelectBranchComponentExposed = {
    fcName: 'mapAtmBranchesDropdown',
    group: this.formGroup
  };
  enableCifBranch = true;
  showDestinationBranch = true;
  cifInfo: any;
  branchType: any;
  constructor(public commonProv: PsCommonService, public loggerP: LoggerService, private omniPull: OmniPullService, public eventEmitterService: EventEmitterService, public navService?: PsNavigatorService) {
    super();
  }

  ngOnInit() {
    super.init();
    this.cifInfo = this.commonProv.session.getValueOf(ConstantCommon.USERINFO);
    this.mapAtmBranchesOptions = {
      group: this.formGroup,
      fcName: 'mapAtmBranches',
      labelKey: 'map_atm-branch_key',
      mapOptions: {
        labelKey: 'map'
      },
      showSegments: false,
      mapTypesInclude: '\'B\'',
      branchIds: '1,3,5',
      parameterToCheck: CommonBussinessConstant.COLLECTIONBRANCH
    };
  }

  ionViewDidEnter() {
    super.ionViewDidEnter();
    this.omniPull.getParamValOf(CommonBussinessConstant.COLLECTIONBRANCH).then((result) => {
      if (result !== -1 && result.CollectionBranch === CommonBussinessConstant.END_USER_INPUT_ID) {
        this.enableCifBranch = false;
        this.branchType = result.CollectionBranch;
      } else {
        this.branchType = result.CollectionBranch;
        this.enableCifBranch = true;
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.stepperOptions.namesofSteps[1]], 0, true);
        this.commonProv.setValInsideNestedObj(this.branchOptions.fcName, this.cifInfo.cifBranch ? this.cifInfo.customerInfoCO.branchBriefDesc : '', this.chequebookVO);
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.branchOptions.fcName], 1);

      }
    }).catch((error) => { });

    this.eventEmitterService.getSelectBranchEmitter().subscribe((val) => {
      this.formGroup.controls[this.mapAtmBranchesOptions.fcName].setValue(val);
      this.commonProv.setValInsideNestedObj(this.mapAtmBranchesOptions.fcName, val, this.chequebookVO);
    });
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.mapAtmBranchesOptions.fcName], 0);
    const defaultValidations: Map<string, IdefaultValidators> = new Map<string, IdefaultValidators>();
    defaultValidations.set(this.noOfchequeBooks.fcName, this.commonProv.prepareValidation(false, null, false, 1, null, null, 2));
    this.commonProv.setDefaultValidators(defaultValidations, this.formGroup);

    // send the cif branch in all cases to the service
    this.commonProv.copyObject(this.stepperOptions.submitOptions.extraParams,
      { branch: this.cifInfo.customerInfoCO ? this.cifInfo.customerInfoCO.branchCode : '' }, false, true);

    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.branchOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.noOfLeaves.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.nameOptions.fcName], 1);
    // this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MAXLENGTH, [this.noOfchequeBooks.fcName], 2);
    if (this.cifInfo.customerInfoCO.longName) {
      this.commonProv.setValInsideNestedObj(this.nameOptions.fcName, this.cifInfo.customerInfoCO.longName, this.chequebookVO);
    }
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MINLENGTH, [this.optionsPreferredLanguage.fcName], 2);
    // this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.nameOptions.fcName], 1);
    this.baseFormGroup = this.formGroup;
  }




  onSelectBranch($event) {
    if ($event.itemValue !== undefined) {
      this.formGroup.controls[this.selectBranchOptions.fcName].setValue($event);
      this.commonProv.setValInsideNestedObj(this.selectBranchOptions.fcName, $event.selectedObj, this.chequebookVO);
    }
  }

  onChange(values: any) {
    // console.log('the changed values are:');
    // console.log(values);

  }
  onItemChange(values: any) {
    // console.log('Complex Id details:');
    // console.log(values);

  }
  onBranchChange(values: any) {
    // console.log(values);
    if (values && values.description && values.description.indexOf(CommonBussinessConstant.DESTINATIONBRANCH_OPTION) > -1) {
      this.showDestinationBranch = true;
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.stepperOptions.namesofSteps[1]], 1, true);
      // if (!this.enableCifBranch) {
      //   this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.mapAtmBranchesOptions.fcName], 1);
      // }
    } else {
      this.showDestinationBranch = false;
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.stepperOptions.namesofSteps[1]], 0, true);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.mapAtmBranchesOptions.fcName], 0);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, ['mapBranchInput'], 0);
    }

  }

  onAccountChange(fromAccount) {
    if (this.branchType === CommonBussinessConstant.ACCOUNT_BRANCH_ID) {
      if (fromAccount && fromAccount.branchDescription) {
        this.commonProv.setValInsideNestedObj(this.branchOptions.fcName, fromAccount.branchDescription ? fromAccount.branchDescription : '', this.chequebookVO);
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.branchOptions.fcName], 1);
      }
    }
  }

  getBranchDesc(branchId) {
    try {
      const paramData: IOcBranchesRequest = {
        branchesIdList: branchId
      };
      this.omniPull.returnBranchesList(paramData).then((result) => {

        if (result && result.gridModel != null && result.gridModel.length > 0) {

        } else { this.loggerP.warn(result, 'empty response'); }
      }).catch((error) => { });
    } catch (error) { }
  }
  ontypesChange(values) {
    if (values && values.selectedObj && values.selectedObj.numberOfCheques) {
      this.commonProv.setValInsideNestedObj(this.noOfLeaves.fcName, values.selectedObj.numberOfCheques, this.chequebookVO);
    }
  }
}
