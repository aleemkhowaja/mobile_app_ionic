import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PsAccountsListComponent } from 'src/app/commonBussinessSRC/psComponents/ps-accounts-list/ps-accounts-list.component';
import { IOptionsPsBanksExposed } from 'src/app/commonBussinessSRC/psComponents/ps-banks/ps-banks.component.interfaces';
import { IOptionsPsComplexUserAddressExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-address/ps-complex-address.component.interface';
import { IOptionsPsComplexAmountExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-amount/ps-complex-amount.component.interfaces';
import { IOptionsPsComplexBillItemExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-bill-item/ps-complex-bill-item.component.interfaces';
import { IOptionsPsComplexCreditAvailabilityExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-credit-availability/ps-complex-credit-availability.component.interface';
import { PsOptionFacilityComponent } from 'src/app/commonBussinessSRC/psComponents/ps-container-lookup-option/ps-option-facility/ps-option-facility.component';
import { IOptionsPsDateMonthYearFutureExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-date-month-year/ps-date-month-year-future/ps-date-month-year-future.component.interfaces';
import { IOptionsPsInputAccountNumberExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-account-number/ps-input-account-number.component.interface';
import { IOptionsPsInputFreeTextExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-free-text/ps-input-free-text.component.interfaces';
import { IOptionsPsInputNumericExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-numeric/ps-input-numeric.component.interfaces';
import { IOptionsPsInputVarcharExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsLookupFacilityDetailsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-facility-details/ps-lookup-facility-details.component.interfaces';
import { IOptionsPsLookupOwnAccountsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-lookup/ps-lookup-own-accounts/ps-lookup-own-accounts.component.interfaces';
import { IOptionsPsDropDownCountryExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-country/ps-dropdown-country.component.interfaces';
import { IOptionsPsDropdownInsuranceCompanyExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-insurance-company/ps-dropdown-insurance-company.component.interfaces';
import { IOptionsPsLovAmountToleranceExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-amount-tolerance/ps-lov-amount-tolerance.component.interfaces';
import { IOptionsPsLovConfirmationInstructionExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-confirmation-instruction/ps-lov-confirmation-instruction.component.interfaces';
import { IOptionsPsLovFormOfDocumentaryCreditExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-form-of-documentary-credit/ps-lov-form-of-documentary-credit.component.interfaces';
import { IOptionsPsLovIncotermsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-incoterms/ps-lov-incoterms.component.interfaces';
import { IOptionsPsLovRequestPurposeExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-request-purpose/ps-lov-request-purpose.component.interfaces';
import { IOptionsPsLovSettlementMethodExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-settlement-method/ps-lov-settlement-method.component.interfaces';
import { IOptionsPsDropdownTFSDocumentTypeExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-tfs-document-type/ps-dropdown-tfs-document-type.component.interfaces';
import { IOptionsPsLabelExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsContainerPanel, IOptionsPsFileUploadComponent, IOptionsPsKeyinInput, IOptionsPsKeyinInputExposed, IOptionsPsSelectCheckboxExposed, IOptionsPsSelectDropdown, IOptionsPsSelectToggle, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { OmniBasePage } from '../omni-base/omni-base.page';
import { PsInputDisplayOnlyCIFAddressHomeExposed } from './../../commonBussinessSRC/psComponents/ps-keyin-input/ps-input-display-only-cif-address-home/ps-input-display-only-cif-address-home.component.interface';
import { PsCommonService } from './../../commonSRC/psServices/ps-common/ps-common.service';



@Component({
  selector: 'app-letter-of-credit-request',
  templateUrl: './letter-of-credit-request.page.html',
  styleUrls: ['./letter-of-credit-request.page.scss'],
})
export class LetterOfCreditRequestPage extends OmniBasePage implements OnInit {

  formGroup: FormGroup = new FormGroup({});
  LcRequestVO = {};

  isApplicantChargesAccount = false;
  isBeneficiaryChargesAccount = false;

  public stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'lc_request_stepper',
    isHorizontalStepper: true,
    numberOfSteps: 2,
    namesofSteps: ['letter_of_credit_step1', 'letter_of_credit_step2'],
    group: this.formGroup,
    submitOptions: {
      group: this.formGroup,
      submitServiceUrl: PsCommonSettings.serviceUrl.commonSubmitAction
    },
    requestObject: this.LcRequestVO
  };

  lcPanelOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'lc_details_key',
    iconName: '',
    expanded: true,
    disablePreview: true
  };

  validityDetailsPanelOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'validity_details_key',
    iconName: '',
    expanded: false,
  };

  amountDetailsPanelOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'amount_details_key',
    iconName: '',
    expanded: false,
  };

  creditDetailsPanelOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'credit_details_key',
    iconName: '',
    expanded: false,
  };

  settlMethodDetailsPanelOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'settlement_method_details_key',
    iconName: '',
    expanded: false,
  };

  benefPanelOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'beneficiary_details_key',
    iconName: '',
    expanded: true,
  };

  participantAdditionalPanelOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'participant_additional_details_key',
    iconName: '',
    expanded: false,
  };

  localInsuranceDetailsPanelOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'local_insurance_details_key',
    iconName: '',
    expanded: false,
  };

  shipmentPanelOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'shipment_details_key',
    iconName: '',
    expanded: false,
  };

  documentDetailsPanelOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'document_details_key',
    iconName: '',
    expanded: false,
  };

  attachmentPanelOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'attachment_key',
    iconName: '',
    expanded: false,
  };


  formOfDocumentaryOptions: IOptionsPsLovFormOfDocumentaryCreditExposed = {
    fcName: 'formOfdocumentCredit',
    group: this.formGroup
  };

  tfsDocumentTypeOptions: IOptionsPsDropdownTFSDocumentTypeExposed = {
    labelKey: 'lc_type_key',
    placeHolder: 'select_lc_type_key',
    fcName: 'docType',
    group: this.formGroup,
  };

  documentInNameOptions: IOptionsPsInputVarcharExposed = {
    fcName: 'documentInNameOf',
    placeHolder: 'enter_required_name_key',
    group: this.formGroup,
    labelKey: 'document_in_name_of_key'
  };

  documentInNameReadOnlyOptions: IOptionsPsKeyinInputExposed = {
    fcName: 'documentInNameOfRO',
    labelKey: 'document_in_name_of_key',
    placeHolder: 'document_in_name_of_key',
    group: this.formGroup
  };

  accountNumberOptions: IOptionsPsInputAccountNumberExposed = {
    fcName: 'accountNumber',
    labelKey: 'account_number_key',
    placeHolder: 'enter_account_no_iban_key',
    group: this.formGroup
  };

  applicantHomeAddressReadOnlyOptions: PsInputDisplayOnlyCIFAddressHomeExposed = {
    fcName: 'applicantAddressDetails',
    labelKey: 'applicant_address_key',
    placeHolder: 'applicant_address_key',
    group: this.formGroup,
    requestVO: this.LcRequestVO
  };

  facilityDetailsOptions: IOptionsPsLookupFacilityDetailsExposed = {
    labelKey: 'facility_key',
    placeHolder: 'select_from_facilities_key',
    fcName: 'facilityDetails',
    group: this.formGroup,
    component: PsOptionFacilityComponent,
    requestObject: this.LcRequestVO
  };

  // validityDetails
  issueDateOptions: IOptionsPsDateMonthYearFutureExposed = {
    labelKey: 'issue_date_key',
    placeHolder: 'issue_date_key',
    fcName: 'issueDate',
    group: this.formGroup,

  };

  lcExpireDateOptions: IOptionsPsDateMonthYearFutureExposed = {
    labelKey: 'lc_expiry_date_key',
    placeHolder: 'lc_expiry_date_key',
    fcName: 'expiryDate',
    group: this.formGroup,
  };

  placeOfExpiryOptions: IOptionsPsDropDownCountryExposed = {
    labelKey: 'place_of_expiry_key',
    placeHolder: 'select_place_of_expiry_key',
    fcName: 'placeOfExpiry',
    group: this.formGroup,
  };

  // amountDetails
  amountDetailsOptions: IOptionsPsComplexAmountExposed = {
    currency: '',
    currenciesOptions: {
      placeHolder: 'currency_key',
      labelKey: 'currency_key',
      fcName: 'currency',
      group: this.formGroup
    },

    amountOptions: {
      labelKey: 'amount_key',
      placeHolder: 'enter_amount_key',
      fcName: 'transactionAmount',
      group: this.formGroup,
      decimalPoints: 2
    }
  };

  chargesBorneByOptions: IOptionsPsLovRequestPurposeExposed = {
    group: this.formGroup,
    fcName: 'chargesBorneBy',
  };

  chargesAccountListOptions: IOptionsPsLookupOwnAccountsExposed = {
    labelKey: 'charges_account_key',
    placeHolder: 'select_from_accounts_key',
    component: PsAccountsListComponent,
    group: this.formGroup,
    accountAllowedCurrencies: [],
    accountAllowedTypes: [],
    glTypes: 'G',
    fcName: 'chargesAccount',
    accountType: 'G',
    fromTo: 'from',
    requestObject: this.LcRequestVO,
    currency: '',
  };

  amountToleranceOptions: IOptionsPsLovAmountToleranceExposed = {
    group: this.formGroup,
    fcName: 'amountTolerance',
  };


  // creditDetails
  creditAvailabilityOptions: IOptionsPsComplexCreditAvailabilityExposed = {
    creditAvailabilityOptions: {
      group: this.formGroup,
      fcName: 'creditAvailability',
    },
    payableAtOptions: {
      labelKey: 'payable_at_key',
      placeHolder: 'payable_at_key',
      fcName: 'payableAt',
      group: this.formGroup,
      mask: {
        regex: '[a-zA-Z0-9]*'
      }
    },
    daysFromOptions: {
      fcName: 'daysFrom',
      group: this.formGroup,
      labelKey: 'days_from_key',
      placeHolder: 'enter_days_from_key',
      mask: {
        regex: '[a-zA-Z0-9]*'
      }
    }
  };

  creditAvailableWithOptions: IOptionsPsInputFreeTextExposed = {
    labelKey: 'credit_available_with_key',
    placeHolder: 'credit_available_with_key',
    fcName: 'creditAvailableWith',
    group: this.formGroup
  };

  // settlMethodDetails
  settlementMethodOptions: IOptionsPsLovSettlementMethodExposed = {
    group: this.formGroup,
    fcName: 'settlementMethod',
  };

  settlementAccountListOptions: IOptionsPsLookupOwnAccountsExposed = {
    labelKey: 'settlement_account_key',
    placeHolder: 'select_from_accounts_key',
    component: PsAccountsListComponent,
    group: this.formGroup,
    accountAllowedCurrencies: [],
    accountAllowedTypes: [],
    glTypes: 'G',
    fcName: 'settlementAccount',
    accountType: 'G',
    fromTo: 'from',
    requestObject: this.LcRequestVO,
    currency: '',
  };

  // ------------------step2-------------------

  // beneficiaryDetails

  sameBankToggleOptions: IOptionsPsSelectToggle = {
    labelKey: 'same_bank_beneficiary_key',
    group: this.formGroup,
    fcName: 'sameBank',
    psClass: 'toggleColor'
  };

  beneficiaryBankCifOptions: IOptionsPsBanksExposed = {
    categoryLabelKey: 'beneficiary_bank_cif_key',
    categoryPlaceholderKey: 'select_bank_cif_key',
    categoryFcName: 'beneficiaryBankCif',
    subCategoryLabelKey: 'branch_key',
    subCategoryPlaceholderKey: 'select_branch_key',
    subCategoryFcName: 'branch',
    group: this.formGroup,
    requestObject: this.LcRequestVO
  };

  benefAccountOptions: IOptionsPsInputVarcharExposed = {
    fcName: 'beneficiaryAccountNo',
    placeHolder: 'enter_beneficiary_account_no_key',
    group: this.formGroup,
    labelKey: 'beneficiary_account_no_key'
  };

  benefNameOptions: IOptionsPsInputVarcharExposed = {
    fcName: 'beneficiaryName',
    placeHolder: 'enter_beneficiary_name_key',
    group: this.formGroup,
    labelKey: 'beneficiary_name_key'
  };

  benefAddressOptions: IOptionsPsComplexUserAddressExposed = {
    areaOptions: {
      labelKey: 'beneficiary_area_key',
      placeHolder: 'enter_beneficiary_area_key',
      fcName: 'benefarea',
      group: this.formGroup
    },
    wayOptions: {
      labelKey: 'beneficiary_way_key',
      placeHolder: 'enter_beneficiary_way_key',
      fcName: 'benefway',
      group: this.formGroup,
    },
    buildingOptions: {
      labelKey: 'beneficiary_building_no_key',
      placeHolder: 'enter_beneficiary_building_no_key',
      fcName: 'benefOccupationBuilding',
      group: this.formGroup
    },

    streetOptions: {
      labelKey: 'beneficiary_street_key',
      placeHolder: 'enter_beneficiary_street_key',
      fcName: 'benefStreet',
      group: this.formGroup
    },
    countriesOptions: {
      labelKey: 'beneficiary_country_key',
      placeHolder: 'select_beneficiary_country_key',
      fcName: 'benefCountryCode',
      group: this.formGroup,
    },
    regionOptions: {
      labelKey: 'beneficiary_region_key',
      placeHolder: 'select_beneficiary_region_key',
      fcName: 'benefRegionCode',
      group: this.formGroup
    },
    cityOptions: {
      labelKey: 'beneficiary_city_key',
      placeHolder: 'select_beneficiary_city_key',
      fcName: 'benefCityCode',
      group: this.formGroup,
    },
    poBoxInputOptions: {
      group: this.formGroup,
      fcName: 'benefpoBox',
      labelKey: 'beneficiary_pobox_key',
      placeHolder: 'enter_beneficiary_pobox_key'
    }
  };

  // participantAdditionalDetails
  benefBankerOptions: IOptionsPsInputVarcharExposed = {
    fcName: 'beneficiaryBankerName',
    placeHolder: 'enter_beneficiary_banker_key',
    group: this.formGroup,
    labelKey: 'beneficiary_banker_key'
  };

  benefSwiftOptions: IOptionsPsKeyinInput = {
    fcName: 'beneficiarySwiftName',
    placeHolder: 'enter_beneficiary_banker_swift_key',
    group: this.formGroup,
    labelKey: 'beneficiary_banker_swift_code_key',
    mask: {
      regex: '[a-zA-Z0-9]*'
    }

  };

  confirmationInstructionOptions: IOptionsPsLovConfirmationInstructionExposed = {
    group: this.formGroup,
    fcName: 'confirmationInstruction',
  };

  // localInsuranceDetails
  insuranceCompanyOptions: IOptionsPsDropdownInsuranceCompanyExposed = {
    labelKey: 'insurance_company_key',
    placeHolder: 'select_insurance_company_key',
    fcName: 'insuranceCompany',
    group: this.formGroup
  };

  localInsuranceDateOptions: IOptionsPsDateMonthYearFutureExposed = {
    labelKey: 'local_insurance_policy_date_key',
    placeHolder: 'local_insurance_policy_date_key',
    fcName: 'insurancePolicyDate',
    group: this.formGroup,

  };

  localInsuranceNumberOptions: IOptionsPsInputNumericExposed = {
    fcName: 'localInsuranceNumber',
    group: this.formGroup,
    labelKey: 'local_insurance_policy_number_key',
    placeHolder: 'local_insurance_policy_number_key'
  };

  // shipmenDetails
  partialShipmentOptions: IOptionsPsSelectCheckboxExposed = {
    labelKey: 'partial_shipment_allowed_key',
    group: this.formGroup,
    fcName: 'partialShipment'
  };

  transShipmentOptions: IOptionsPsSelectCheckboxExposed = {
    labelKey: 'transhipment_allowed_key',
    group: this.formGroup,
    fcName: 'transShipment'
  };

  portLoadingOptions: IOptionsPsInputVarcharExposed = {
    fcName: 'portOfLoading',
    placeHolder: 'enter_port_of_loading_key',
    group: this.formGroup,
    labelKey: 'port_of_loading_key'
  };

  lastDateOfShipmentOptions: IOptionsPsDateMonthYearFutureExposed = {
    labelKey: 'last_date_of_shipment_key',
    placeHolder: 'last_date_of_shipment_key',
    fcName: 'lastDateOfShipment',
    group: this.formGroup,
  };

  portDischargeOptions: IOptionsPsInputVarcharExposed = {
    fcName: 'portOfDischarge',
    placeHolder: 'enter_port_of_discharge_key',
    group: this.formGroup,
    labelKey: 'port_of_discharge_key'
  };

  shipmentTermsOptions: IOptionsPsInputVarcharExposed = {
    fcName: 'shipmentTerms',
    placeHolder: 'enter_shipment_terms_key',
    group: this.formGroup,
    labelKey: 'shipment_terms_key'
  };

  incotermsOptions: IOptionsPsLovIncotermsExposed = {
    group: this.formGroup,
    fcName: 'incoterms',
  };

  portShipmentOptions: IOptionsPsInputVarcharExposed = {
    fcName: 'portOfShipment',
    placeHolder: 'enter_port_of_shipment_key',
    group: this.formGroup,
    labelKey: 'port_of_shipment_key'
  };

  descriptionGoodsOptions: IOptionsPsInputVarcharExposed = {
    fcName: 'descriptionOfGoods',
    placeHolder: 'enter_description_of_goods_key',
    group: this.formGroup,
    labelKey: 'description_of_goods_key'
  };

  descriptionGoods2Options: IOptionsPsInputVarcharExposed = {
    fcName: 'descriptionOfGoods2',
    placeHolder: 'enter_description_of_goods_2_key',
    group: this.formGroup,
    labelKey: 'description_of_goods2_key'
  };

  placeFinalDestOptions: IOptionsPsInputVarcharExposed = {
    labelKey: 'place_of_final_destination_delivery_key',
    placeHolder: 'enter_place_of_final_destination_delivery_key',
    fcName: 'placeOfDestination',
    group: this.formGroup,
  };

  meansOfTransLabelOptions: IOptionsPsLabelExposed = {
    labelKey: 'means_of_transportation_key',
    placeHolder: 'means_of_transportation_key',
    fcName: 'meansOfTransLabel'
  };


  meansOfTransArray: IOptionsPsSelectCheckboxExposed[] = [
    {
      labelKey: 'vessel_key',
      group: this.formGroup,
      fcName: 'meansOfTransVess'
    },
    {
      labelKey: 'aero_plane_key',
      group: this.formGroup,
      fcName: 'meansOfTransAP'
    },
    {
      labelKey: 'truck_key',
      group: this.formGroup,
      fcName: 'meansOfTransTruc'
    },
    {
      labelKey: 'special_courier_key',
      group: this.formGroup,
      fcName: 'meansOfTransSpecCour'
    },
    {
      labelKey: 'railway_transport_key',
      group: this.formGroup,
      fcName: 'meansOfTransRailway'
    },
    {
      labelKey: 'CMR_key',
      group: this.formGroup,
      fcName: 'meansOfTransCMR'
    }
  ];



  // documentDetails
  documentDetailsListOptions: IOptionsPsComplexBillItemExposed[] = [
    {
      checkBoxOptions: {
        labelKey: 'commercial_invoice_key',
        group: this.formGroup,
        fcName: 'commercialInvoice'
      },
      copyInputOptions: {
        group: this.formGroup,
        fcName: 'commercialInvoiceCopy',
        labelKey: 'copy_key',
        placeHolder: '0'
      },
      originalInputOptions: {
        group: this.formGroup,
        fcName: 'commercialInvoiceOriginal',
        labelKey: 'original_key',
        placeHolder: '0'
      },
      BillTypeArray: [],
      group: this.formGroup
    },

    {
      checkBoxOptions: {
        labelKey: 'airway_bill_key',
        group: this.formGroup,
        fcName: 'airWayBill'
      },
      copyInputOptions: {
        labelKey: 'copy_key',
        placeHolder: '0',
        fcName: 'airWayBillCopy',
        group: this.formGroup
      },
      originalInputOptions: {
        group: this.formGroup,
        fcName: 'airWayBillOriginal',
        labelKey: 'original_key',
        placeHolder: '0'
      },
      BillTypeArray: [],
      group: this.formGroup
    },

    {
      checkBoxOptions: {
        labelKey: 'full_set_marine_ocean_bill_of_lading_key',
        group: this.formGroup,
        fcName: 'fullSet'
      },
      copyInputOptions: {
        labelKey: 'copy_key',
        placeHolder: '0',
        fcName: 'fullSetCoby',
        group: this.formGroup
      },
      originalInputOptions: {
        group: this.formGroup,
        fcName: 'fullSetOriginal',
        labelKey: 'original_key',
        placeHolder: '0'
      },
      BillTypeArray: [],
      group: this.formGroup
    },

    {
      checkBoxOptions: {
        labelKey: 'delivery_order_key',
        group: this.formGroup,
        fcName: 'deliveryOrder'
      },
      copyInputOptions: {
        labelKey: 'copy_key',
        placeHolder: '0',
        fcName: 'deliveryOrderCopy',
        group: this.formGroup
      },
      originalInputOptions: {
        group: this.formGroup,
        fcName: 'deliveryOrderOriginal',
        labelKey: 'original_key',
        placeHolder: '0'
      },
      BillTypeArray: [],
      group: this.formGroup
    },

    {
      checkBoxOptions: {
        labelKey: 'special_courier_key',
        group: this.formGroup,
        fcName: 'specialCourier'
      },
      copyInputOptions: {
        labelKey: 'copy_key',
        placeHolder: '0',
        fcName: 'specialCourierCopy',
        group: this.formGroup
      },
      originalInputOptions: {
        group: this.formGroup,
        fcName: 'specialCourierOriginal',
        labelKey: 'original_key',
        placeHolder: '0'
      },
      BillTypeArray: [],
      group: this.formGroup
    },

    {
      checkBoxOptions: {
        labelKey: 'certificate_of_origin_key',
        group: this.formGroup,
        fcName: 'certOfOrigin'
      },
      copyInputOptions: {
        labelKey: 'copy_key',
        placeHolder: '0',
        fcName: 'certOfOriginCopy',
        group: this.formGroup
      },
      originalInputOptions: {
        group: this.formGroup,
        fcName: 'certOfOriginOriginal',
        labelKey: 'original_key',
        placeHolder: '0'
      },
      BillTypeArray: [],
      group: this.formGroup
    },

    {
      checkBoxOptions: {
        labelKey: 'parcel_post_receipt_key',
        group: this.formGroup,
        fcName: 'parcelPostReceipt'
      },
      copyInputOptions: {
        labelKey: 'copy_key',
        placeHolder: '0',
        fcName: 'parcelPostReceiptCopy',
        group: this.formGroup
      },
      originalInputOptions: {
        group: this.formGroup,
        fcName: 'parcelPostReceiptOriginal',
        labelKey: 'original_key',
        placeHolder: '0'
      },
      BillTypeArray: [],
      group: this.formGroup
    },

    {
      checkBoxOptions: {
        labelKey: 'insurance_(%)_key',
        group: this.formGroup,
        fcName: 'insurance'
      },
      copyInputOptions: {
        labelKey: 'copy_key',
        placeHolder: '0',
        fcName: 'insuranceCopy',
        group: this.formGroup
      },
      originalInputOptions: {
        group: this.formGroup,
        fcName: 'insuranceOriginal',
        labelKey: 'original_key',
        placeHolder: '0'
      },
      BillTypeArray: [],
      group: this.formGroup
    },

    {
      checkBoxOptions: {
        labelKey: 'separate_certificate_of_weight_key',
        group: this.formGroup,
        fcName: 'sepCertOfWeight'
      },
      copyInputOptions: {
        labelKey: 'copy_key',
        fcName: 'sepCertOfWeightCopy',
        group: this.formGroup,
        placeHolder: '0'
      },
      originalInputOptions: {
        group: this.formGroup,
        fcName: 'sepCertOfWeightOriginal',
        labelKey: 'original_key',
        placeHolder: '0'
      },
      BillTypeArray: [],
      group: this.formGroup
    },

    {
      checkBoxOptions: {
        labelKey: 'health_or_veterinary_certificat_key',
        group: this.formGroup,
        fcName: 'healthOrVeterinaryCertificat'
      },
      copyInputOptions: {
        labelKey: 'copy_key',
        placeHolder: '0',
        fcName: 'healthOrVeterinaryCertificatCopy',
        group: this.formGroup
      },
      originalInputOptions: {
        group: this.formGroup,
        fcName: 'healthOrVeterinaryCertificatOriginal',
        labelKey: 'original_key',
        placeHolder: '0'
      },
      BillTypeArray: [],
      group: this.formGroup
    },

    {
      checkBoxOptions: {
        labelKey: 'inspection_certificate_key',
        group: this.formGroup,
        fcName: 'inspectionCertificate'
      },
      copyInputOptions: {
        labelKey: 'copy_key',
        placeHolder: '0',
        fcName: 'inspectionCertificateCopy',
        group: this.formGroup
      },
      originalInputOptions: {
        group: this.formGroup,
        fcName: 'inspectionCertificateOriginal',
        labelKey: 'original_key',
        placeHolder: '0'
      },
      BillTypeArray: [],
      group: this.formGroup
    },

    {
      checkBoxOptions: {
        labelKey: 'certificate_of_surveillance_key',
        group: this.formGroup,
        fcName: 'certificateOfSurveillance'
      },
      copyInputOptions: {
        labelKey: 'copy_key',
        placeHolder: '0',
        fcName: 'certificateOfSurveillanceCopy',
        group: this.formGroup
      },
      originalInputOptions: {
        group: this.formGroup,
        fcName: 'certificateOfSurveillanceOriginal',
        labelKey: 'original_key',
        placeHolder: '0'
      },
      BillTypeArray: [],
      group: this.formGroup
    },

    {
      checkBoxOptions: {
        labelKey: 'weight_certificate_key',
        group: this.formGroup,
        fcName: 'weightCertificate'
      },
      copyInputOptions: {
        labelKey: 'copy_key',
        placeHolder: '0',
        fcName: 'airWayBillCTo',
        group: this.formGroup
      },
      originalInputOptions: {
        group: this.formGroup,
        fcName: 'billOfLandingOriginal',
        labelKey: 'original_key',
        placeHolder: '0'
      },
      BillTypeArray: [],
      group: this.formGroup
    },

    {
      checkBoxOptions: {
        labelKey: 'ISM_and_ISPS_key',
        group: this.formGroup,
        fcName: 'ISMAndISPS'
      },
      copyInputOptions: {
        labelKey: 'copy_key',
        placeHolder: '0',
        fcName: 'ISMAndISPSCopy',
        group: this.formGroup
      },
      originalInputOptions: {
        group: this.formGroup,
        fcName: 'ISMAndISPSOriginal',
        labelKey: 'original_key',
        placeHolder: '0'
      },
      BillTypeArray: [],
      group: this.formGroup
    },

    {
      checkBoxOptions: {
        labelKey: 'packing_list_key',
        group: this.formGroup,
        fcName: 'packingList'
      },
      copyInputOptions: {
        labelKey: 'copy_key',
        placeHolder: '0',
        fcName: 'packingListCopy',
        group: this.formGroup
      },
      originalInputOptions: {
        group: this.formGroup,
        fcName: 'packingListOriginal',
        labelKey: 'original_key',
        placeHolder: '0'
      },
      BillTypeArray: [],
      group: this.formGroup
    },

  ];

  SetOfDocumentsSelectOptions: IOptionsPsSelectDropdown = {
    labelKey: 'set_of_documents_key',
    placeHolder: 'select_document_set_key',
    listOfOptions: [{ description: ' ', itemValue: ' ' },
    { description: 'In One Set', itemValue: 'inOneSet' },
    { description: 'In Two Set', itemValue: 'inTwoSet' }],
    fcName: 'setOfDocument',
    group: this.formGroup,
  };

  fileUploadOptions: IOptionsPsFileUploadComponent = {
    multiple: true,
    fcName: 'selectedFileData',
    group: this.formGroup
  };

  commentOptions: IOptionsPsInputVarcharExposed = {
    group: this.formGroup,
    fcName: 'comment',
    labelKey: 'file_comment_key',
    placeHolder: 'enter_file_comment_key'
  };

  toleranceValueOptions: IOptionsPsInputNumericExposed = {
    fcName: 'tolerance',
    group: this.formGroup,
    labelKey: 'tolerance_value_key',
    placeHolder: 'tolerance_value_key',
  };


  showToleranceValue = false;
  cifInfo: any;
  showShipmentTerms = false;
  showFacility = false;
  showSettlementAccount = false;

  constructor(private omniPull: OmniPullService, public commonProv: PsCommonService, public logger: LoggerService) {
    super();
  }

  ngOnInit() {
    this.baseFormGroup = this.formGroup;
    this.cifInfo = this.commonProv.session.getValueOf(ConstantCommon.USERINFO);
    this.commonProv.setValInsideNestedObj(this.documentInNameReadOnlyOptions.fcName, this.cifInfo.customerInfoCO ? this.cifInfo.customerInfoCO.longName : '', this.LcRequestVO);
  }

  ionViewDidEnter() {
    super.ionViewDidEnter();
    // always non-mandatory
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.chargesBorneByOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.amountToleranceOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.creditAvailabilityOptions.creditAvailabilityOptions.fcName], 1);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.creditAvailableWithOptions.fcName], 0);

    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.formOfDocumentaryOptions.fcName], 0);

    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.benefAddressOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.benefAddressOptions.streetOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.benefAddressOptions.areaOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.benefAddressOptions.wayOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.benefAddressOptions.regionOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.benefAddressOptions.cityOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.benefAddressOptions.countriesOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.benefAddressOptions.buildingOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.benefAddressOptions.poBoxInputOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.benefBankerOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.benefSwiftOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.confirmationInstructionOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.insuranceCompanyOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.localInsuranceDateOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.localInsuranceNumberOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.partialShipmentOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.transShipmentOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.shipmentTermsOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.placeFinalDestOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.descriptionGoods2Options.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.SetOfDocumentsSelectOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.fileUploadOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.commentOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.beneficiaryBankCifOptions.subCategoryFcName], 0);

    // mandatory based on conditions of charges borne changed
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.accountNumberOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.chargesAccountListOptions.fcName], 0);

    // mandatory based on conditions of tolarence
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.toleranceValueOptions.fcName], 0);

    // mandatory based on conditions of Settlement Method
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.settlementAccountListOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.facilityDetailsOptions.fcName], 0);


    this.documentDetailsListOptions.forEach(x => {
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [x.checkBoxOptions.fcName, x.copyInputOptions.fcName, x.originalInputOptions.fcName], 0);
    });
  }

  onAmountToleranceChange(event) {
    if (event != null && event !== undefined) {
      this.showToleranceValue = true;
      this.formGroup.controls[this.toleranceValueOptions.fcName].setValue(null);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.toleranceValueOptions.fcName], 1);
    } else {
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.toleranceValueOptions.fcName], 0);
    }
  }





  onSettlementAccountChange(event) {
    if (event != null && event !== undefined && event.selectedObj) { }
  }

  onSettlementMethodChange(event) {
    if (event != null && event !== undefined && event.selectedObj) {
      if (event.itemValue === 'I') {
        this.showFacility = true;
        this.showSettlementAccount = false;
        this.formGroup.controls[this.settlementAccountListOptions.fcName].reset();
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.facilityDetailsOptions.fcName], 1);
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.settlementAccountListOptions.fcName], 0);

      } else {
        this.showFacility = false;
        this.showSettlementAccount = true;
        this.formGroup.controls[this.facilityDetailsOptions.fcName].reset();
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.facilityDetailsOptions.fcName], 0);
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.settlementAccountListOptions.fcName], 1);
      }
    }
  }




  onPartialShipmentChecked(event) {
    if (event != null && event !== undefined) {
      if (event.newValue === true) {
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.transShipmentOptions.fcName], 1);
      } else {
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.transShipmentOptions.fcName], 0);
      }
    }
  }

  onTransShipmentChecked(event) {
    if (event != null && event !== undefined) {
      if (event.newValue === true) {
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.partialShipmentOptions.fcName], 1);
      } else {
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.partialShipmentOptions.fcName], 0);
      }
    }
  }




  onLCTypeChange(event) {
    if (event != null && event !== undefined && event.selectedObj) {
      // handle documentary credit
      this.formGroup.controls[this.formOfDocumentaryOptions.fcName].setValue(event.selectedObj.formOfDocCredit);
    }
  }

  onMeansOfTransChanged(event) {
    if (event != null && event !== undefined) {
      for (const mean of this.meansOfTransArray) {
        if (event.newValue === true) {
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [mean.fcName], 0);
        } else {
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [mean.fcName], 1);
        }
      }
    }
  }


  onChargesBorneByChange(event) {
    if (event != null && event !== undefined && event.description) {
      switch (event.description) {
        case 'Applicant':
          this.isApplicantChargesAccount = true;
          this.isBeneficiaryChargesAccount = false;
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.accountNumberOptions.fcName], 0);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.chargesAccountListOptions.fcName], 1);

          break;
        case 'Beneficiary':
          this.accountNumberOptions.labelKey = 'bneficiary_charges_account_key';
          this.isApplicantChargesAccount = false;
          this.isBeneficiaryChargesAccount = true;
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.accountNumberOptions.fcName], 1);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.chargesAccountListOptions.fcName], 0);

          break;
        case 'Both':
          this.accountNumberOptions.labelKey = 'beneficiary_charges_account_key';
          this.isApplicantChargesAccount = true;
          this.isBeneficiaryChargesAccount = true;
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.accountNumberOptions.fcName], 1);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.chargesAccountListOptions.fcName], 1);

          break;
        case 'Other Party':
          this.accountNumberOptions.labelKey = 'other_party_charges_account_key';
          this.isApplicantChargesAccount = false;
          this.isBeneficiaryChargesAccount = true;
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.accountNumberOptions.fcName], 1);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.chargesAccountListOptions.fcName], 0);

          break;
        default:
          this.accountNumberOptions.labelKey = 'other_party_charges_account_key';
          this.isApplicantChargesAccount = false;
          this.isBeneficiaryChargesAccount = true;
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.accountNumberOptions.fcName], 1);
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.chargesAccountListOptions.fcName], 0);

          break;
      }
    }
  }



  onDocumentChecked(event) {
    if (event != null && event !== undefined) {
      for (const document of this.documentDetailsListOptions) {
        if (event.newValue === true) {
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [document.checkBoxOptions.fcName], 0);
        } else {
          this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [document.checkBoxOptions.fcName], 1);
        }
      }
    }
  }

  onSameBankToggleChange(event) {
    if (event.newValue === true) {
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.beneficiaryBankCifOptions.categoryFcName], 0);
    } else {
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.beneficiaryBankCifOptions.categoryFcName], 1);
    }
  }


}
