import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsInputFreeTextExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-free-text/ps-input-free-text.component.interfaces';
import { IOptionsPsInputVarcharExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsLookupChequebooksExposed } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-chequebooks/ps-lookup-chequebooks.component.interfaces';
import { IOptionsPsLookupCreditCardsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-credit-cards/ps-lookup-credit-cards.component.interfaces';
import { IOptionsPsLookupDebitCardsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-debit-cards/ps-lookup-debit-cards.component.interfaces';
import { IOptionsPsDropdownDocumentTypesExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-document-types/ps-dropdown-document-types.component.interfaces';
import { IOptionsPsDropdownLov } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-dropdown-lov.component.interfaces';
import { LostDocumentRequestVO } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsKeyinInputExposed, IOptionsPsSelectDropdown, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { OmniBasePage } from '../omni-base/omni-base.page';
import { ConstantCommon } from './../../commonSRC/psServices/models/common-constant';

@Component({
  selector: 'app-lost-document-request',
  templateUrl: './lost-document-request.page.html',
  styleUrls: ['./lost-document-request.page.scss'],
})
export class LostDocumentRequestPage extends OmniBasePage implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  lostDocumentRequestVO: LostDocumentRequestVO = {};
  stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'lost_doc_stepper',
    isHorizontalStepper: true,
    numberOfSteps: 1,
    namesofSteps: ['lost_doc_req_step1', 'lost_doc_req_step2'],
    group: this.formGroup,
    requestObject: this.lostDocumentRequestVO,
    submitOptions: {
      extraParams: {},
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.debitCardRequest,
      group: this.formGroup,
    }
  };
  lostDocumentTypesOptions: IOptionsPsDropdownDocumentTypesExposed = {
    labelKey: 'lost_document_type_key',
    placeHolder: 'please_slct_lost_doc_type_key',
    fcName: 'documentType',
    group: this.formGroup,
    iconOptions: {
      iconName: 'clipboard'
    }
  }

  serialNumberOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'serialNo',
    labelKey: 'serial_no_key',
    placeHolder: 'enter_serial_no_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  documentCurrencyOptions: IOptionsPsKeyinInputExposed = {
    placeHolder: 'document_currency_key',
    labelKey: 'document_currency_key',
    group: this.formGroup,
    fcName: 'documentCurrency'
  };
  documentNumberOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'documentNumber',
    labelKey: 'document_number_key',
    placeHolder: 'enter_document_number_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  fromDocumentNumberOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'fromdocumentNumber',
    labelKey: 'from_document_number_key',
    placeHolder: 'enter_from_document_number_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  toDocumentNumberOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'todocumentNumber',
    labelKey: 'to_document_number_key',
    placeHolder: 'enter_to_document_number_key',
    iconOptions: {
      iconName: 'clipboard'
    }
  };

  stopReasonOptions: IOptionsPsSelectDropdown = {
    labelKey: 'stop_reason_key',
    placeHolder: 'please_select_stop_reason_key',
    fcName: 'stopReason',
    group: this.formGroup,
    iconOptions: {
      iconName: 'clipboard'
    }
  }
  stopReasonsOptions: IOptionsPsSelectDropdown = {
    labelKey: 'stop_reason_key',
    placeHolder: 'please_select_stop_reason_key',
    fcName: 'stopReason',
    group: this.formGroup,
    iconOptions: {
      iconName: 'clipboard'
    }
  }
  briefExplanationOptions: IOptionsPsInputFreeTextExposed = {
    labelKey: 'brief_explanation_key',
    placeHolder: 'enter_brief_explanation_key',
    fcName: 'briefExplanation',
    group: this.formGroup,
    iconOptions: {
      iconName: 'clipboard'
    }
  };
  private documentTypeCategory: string;
  public showDocCurrency = false;
  public showDocSINo = false;
  public showDebitCardlookup = false;
  public showCreditCardlookup = false;
  public showChequebooklookup = false;
  public showCardTypelookup = false;
  private documentNumberRqd: number;
  remittanceTypes: any;
  public lostDocNoRequired = '';
  public requestedBranch = '';
  chequeBookLookupOptions: IOptionsPsLookupChequebooksExposed = {
    labelKey: 'chequebook_key',
    placeHolder: 'select_chequebook_key',
    group: this.formGroup,
    fcName: 'chequebook',
    requestObject: this.lostDocumentRequestVO
  };
  debitCardsLookupOptiops: IOptionsPsLookupDebitCardsExposed = {
    labelKey: 'debit_card_key',
    placeHolder: 'select_debit_card_key',
    group: this.formGroup,
    fcName: 'card',
    requestObject: this.lostDocumentRequestVO,
    // component: PsLocalBeneficiaryComponent
  };

  creditCardsLookupOptiops: IOptionsPsLookupCreditCardsExposed = {
    labelKey: 'credit_card_key',
    placeHolder: 'select_credit_card_key',
    group: this.formGroup,
    fcName: 'card',
    requestObject: this.lostDocumentRequestVO,
 //   component: PsLookupCreditCardsComponent
  };

  cardsLookupOptiops: IOptionsPsDropdownLov = {
    fcName: 'cardType',
    group: this.formGroup,
  };

  constructor(public commonProv: PsCommonService, public logger: LoggerService, private omniPullService: OmniPullService) {
    super();
  }


  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
    this.commonProv.setFormData(this.formGroup, this.lostDocumentRequestVO);
    this.resetVisibility();

  }

  resetVisibility() {
    this.showDebitCardlookup = false;
    this.showCardTypelookup = false;
    this.showCreditCardlookup = false;
    this.showChequebooklookup = false;
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [
      this.documentNumberOptions.fcName,
      this.fromDocumentNumberOptions.fcName, this.toDocumentNumberOptions.fcName], 0);
  }

  onDocTypeChange(event) {
    this.resetVisibility();
    if (event != null && event !== undefined && event.selectedObj) {
      const docType = event.selectedObj.docCard;
      this.documentTypeCategory = docType;
      if (docType === 'C') {
        // this.showDocCurrency = true;
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.documentNumberOptions.fcName], 1);
        this.showChequebooklookup = true;
        this.lostDocumentRequestVO['submitType'] = '2';

      } else if (docType === 'Q') {
        // this.showDocCurrency = false;
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.fromDocumentNumberOptions.fcName, this.toDocumentNumberOptions.fcName], 1);
        this.showChequebooklookup = true;
        this.lostDocumentRequestVO['submitType'] = '1';
      } else if (docType === 'D') {
        this.showCardTypelookup = true;
        this.lostDocumentRequestVO['submitType'] = '3';
      }
    }

  }
  checkLostDocNumber(event) {
  }

  onChange(values: any) {
    if (values !== undefined) {
      if (values.itemValue === 'D') {
        this.showDebitCardlookup = true;
        this.showCreditCardlookup = false;
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.creditCardsLookupOptiops.fcName], 0);
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.debitCardsLookupOptiops.fcName], 1);
      } else if (values.itemValue === 'C') {
        this.showCreditCardlookup = true;
        this.showDebitCardlookup = false;
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.creditCardsLookupOptiops.fcName], 1);
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.debitCardsLookupOptiops.fcName], 0);
      }
    }
  }
}
