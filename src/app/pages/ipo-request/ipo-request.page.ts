import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsComplexAmountExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-amount/ps-complex-amount.component.interfaces';
import { IOptionsPsComplexTermsAndConditionsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-terms-and-conditions/ps-complex-terms-and-conditions.component.interfaces';
import { IOptionsPsIpoSecuritiesListExposed } from 'src/app/commonBussinessSRC/psComponents/ps-ipo-securities-list/ps-ipo-securities-list.component.interfaces';
import { PsInputNumericComponentModule } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-numeric/ps-input-numeric.component.module';
import { IOptionsPsLovPaymentMethodAgentExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-payment-method-agent/ps-lov-payment-method-agent.component.interfaces';
import { IOptionsPsDropdownPortfolioExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-portfolio/ps-dropdown-portfolio.component.interface';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniCommonService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-common.service';
import { PsDateFormatPipe } from 'src/app/commonSRC/psPipes/ps-date-format/ps-date-format.pipe';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IchangeValues, IOptionsPsContainerPanel, IOptionsPsFileUploadComponent, IOptionsPsKeyinTextarea, IOptionsPsLabel, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { OmniBasePage } from '../omni-base/omni-base.page';

@Component({
  selector: 'app-ipo-request',
  templateUrl: './ipo-request.page.html',
  styleUrls: ['./ipo-request.page.scss'],
})
export class IpoRequestPage extends OmniBasePage implements OnInit {

  formData: any = {};
  formGroup: FormGroup = new FormGroup({});
  ipoRequestVO: any = {};
  stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'ipo_req_stepper',
    isHorizontalStepper: true,
    numberOfSteps: 1,
    namesofSteps: ['ipo_req_step1'],
    group: this.formGroup,
    submitOptions: {
      extraParams: {},
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.securityRenewal,
      group: this.formGroup
    },
    requestObject: this.ipoRequestVO
    // submitServiceUrl: ,
  };

  termsAndConditionsOptions: IOptionsPsComplexTermsAndConditionsExposed = {
    checkBoxOptions: {
      group: this.formGroup,
      fcName: 'checkboxConfirm',
      labelKey: 'agree_terms_and_conditions_key'
    },
    htmlViewerOptions: {
      fileName: PsCommonBusinessSettings.onlineRegistrationTermsAndConditionsFileName
    }
  };

  panelOptions1Step1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'portfolio_and_sukuk_key',
    iconName: 'keypad',
    expanded: true
  };

  panelOptions2Step2: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'ipo_related_file_key',
    iconName: 'keypad',
    expanded: true
  };

  sukukOptions: PsInputNumericComponentModule = {
    fcName: 'quantity',
    group: this.formGroup,
    min: 1,
    labelKey: 'number_of_sukuk_key',
    placeHolder: 'number_of_sukuk_key',
  };

  portfolioOptions: IOptionsPsDropdownPortfolioExposed = {
    fcName: 'portfolioNumber',
    group: this.formGroup,
    labelKey: 'portfolio_key',
    placeHolder: 'select_portfolio_key'
  };

  paymentMethodOptions: IOptionsPsLovPaymentMethodAgentExposed = {
    fcName: 'paymentMethodAgent',
    group: this.formGroup,
  };
  paymentMethodIndividualOptions: IOptionsPsLovPaymentMethodAgentExposed = {
    fcName: 'paymentMethodIndividual',
    group: this.formGroup,
  };

  sukukValueOptions: IOptionsPsComplexAmountExposed = {
    currency: '',
    currenciesOptions: {
      placeHolder: 'currency_key',
      group: this.formGroup,
      fcName: 'currency'
    },
    amountOptions: {
      labelKey: 'sukuk_value_key',
      fcName: 'sukukValue',
      group: this.formGroup,
      type: 'amount',
      decimalPoints: 3,
    }
  };

  fileCommentOptions: IOptionsPsKeyinTextarea = {
    fcName: 'fileComments',
    group: this.formGroup,
    labelKey: 'enter_comments_on_uploaded_file_key',
    rows: '4',

  };

  fileLabel: IOptionsPsLabel = {
    labelKey: 'ipo_file_upload_key',
    position: 'floating'
  };

  fileUploadOptions: IOptionsPsFileUploadComponent = {
    multiple: true,
    fcName: 'selectedFileData',
    group: this.formGroup
  };
  toIPORequestComponent: any;
  ipoSecuritiesOptions: IOptionsPsIpoSecuritiesListExposed = {};
  noIpoSecuritiesListFound = false;
  isUserAgent: boolean;
  uploadedFiles: any;
  constructor(public commonProv: PsCommonService, public loggerP: LoggerService, private omniCommon: OmniCommonService, private nav: PsNavigatorService, private omniCommonService: OmniCommonService) {
    super();
  }


  countChange(val: IchangeValues) {
    const sukukControl = this.formGroup.controls[this.sukukValueOptions.amountOptions.fcName];
    if (sukukControl !== undefined) {
      sukukControl.setValue(this.toIPORequestComponent.calculatedSukukPrice * val.newValue);
    }
  }


  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
    const prevFormat = 'YYYY-MM-DD';
    const psDatePipe = new PsDateFormatPipe();
    const userInfo = this.commonProv.session.getValueOf(ConstantCommon.USERINFO);
    const workingCif = this.omniCommonService.common.session.getValueOf('WORKINGCIF');
    if (this.omniCommon.isAgent()) {
      this.isUserAgent = true;
    } else {
      this.isUserAgent = false;
    }
    try {
      this.toIPORequestComponent = this.nav.getAllParams();
    } catch (error) {
      this.loggerP.error('IPORequest Screen Error ! ', error);
    }
    setTimeout(() => {
      if (this.toIPORequestComponent !== undefined) {
        this.formGroup.controls[this.sukukValueOptions.amountOptions.fcName].setValue(this.toIPORequestComponent.calculatedSukukPrice);
        this.formGroup.controls[this.sukukValueOptions.currenciesOptions.fcName].setValue(this.toIPORequestComponent.tradingCurrencyCode);
      } else {
        this.formGroup.controls[this.sukukValueOptions.amountOptions.fcName].setValue(0);
      }
    }, 100);

    this.ipoRequestVO[this.sukukValueOptions.amountOptions.fcName] = this.toIPORequestComponent.calculatedSukukPrice;
    this.ipoRequestVO[this.sukukValueOptions.currenciesOptions.fcName] = this.toIPORequestComponent.tradingCurrencyCode;
    this.ipoSecuritiesOptions = {
      isEditable: false,
      listOfOptions: this.toIPORequestComponent !== undefined ? [this.toIPORequestComponent] : [this.ipoRequestVO]
    };
    this.commonProv.copyObject(this.stepperOptions.submitOptions.extraParams, { securityCode1: this.toIPORequestComponent.securityCode1, securityCode2: this.toIPORequestComponent.securityCode2, workingCif: workingCif ? workingCif : userInfo.omniUserVO.CIF_NO, price: this.toIPORequestComponent.calculatedSukukPrice, tradeDate: psDatePipe.transform((new Date()), prevFormat) }, false, true);
  }

  ionViewDidEnter() {
    super.ionViewDidEnter();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.sukukValueOptions.amountOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.sukukValueOptions.amountOptions.fcName], 1);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.sukukValueOptions.currenciesOptions.fcName], 1);
  }

  onFileSelect(val) {
    this.uploadedFiles = [];
    this.uploadedFiles = val;
    this.commonProv.copyObject(this.stepperOptions.submitOptions.extraParams, { uploadedFiles: this.uploadedFiles }, false, true);
  }

  onFileDeleted(val) {
    for (const uploadedFile of this.uploadedFiles) {
      if (val.selectedFile.name === uploadedFile.selectedFile.name) {
        this.uploadedFiles.splice(this.uploadedFiles.indexOf(uploadedFile), 1);
        break;
      }
    }
    this.commonProv.copyObject(this.stepperOptions.submitOptions.extraParams, { uploadedFiles: this.uploadedFiles }, false, true);
  }

}
