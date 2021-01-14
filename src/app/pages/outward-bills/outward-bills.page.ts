import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsComplexAmountExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-amount/ps-complex-amount.component.interfaces';
import { IOptionsPsComplexBillItemExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-bill-item/ps-complex-bill-item.component.interfaces';
import { IOptionsPsComplexGoodsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-goods/ps-complex-goods.component.interfaces';
import { IOptionsPsComplexSettlementExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-settlement/ps-complex-settlement.component.interfaces';
import { IOptionsPsInputFreeTextExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-free-text/ps-input-free-text.component.interfaces';
import { IOptionsPsInputVarcharExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsLovSettlementMethodExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-settlement-method/ps-lov-settlement-method.component.interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsContainerPanel, IOptionsPsFileUploadComponent, IOptionsPsLabel, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { OmniBasePage } from '../omni-base/omni-base.page';
import { IOptionsPsBanksExposed } from './../../commonBussinessSRC/psComponents/ps-banks/ps-banks.component.interfaces';
import { IOptionsPsComplexUserAddressExposed } from './../../commonBussinessSRC/psComponents/ps-complex-components/ps-complex-address/ps-complex-address.component.interface';
import { IOptionsPsDropdownTFSDocumentTypeExposed } from './../../commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-tfs-document-type/ps-dropdown-tfs-document-type.component.interfaces';


/** @name outward-bills
 *  @author Ahmed.Ragab 
 *  @description Display the outward-bills
 */

@Component({
  selector: 'app-outward-bills',
  templateUrl: './outward-bills.page.html',
  styleUrls: ['./outward-bills.page.scss'],
})
export class OutwardBillsPage extends OmniBasePage implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  complexAmountOptions?: IOptionsPsComplexAmountExposed;
  stepperOptions: IOptionsTemplateStepper;

  panelOptionsStep1: IOptionsPsContainerPanel;

  billDetailPanelOptions: IOptionsPsContainerPanel;
  banksDetailPanelOptions: IOptionsPsContainerPanel;
  settlementsDetailPanelOptions: IOptionsPsContainerPanel;

  panelOptions1Step2: IOptionsPsContainerPanel;

  panelOptions2Step2: IOptionsPsContainerPanel;

  panelOptions3Step2: IOptionsPsContainerPanel;
  requiredDocumentOptions: IOptionsPsLabel = {
    labelKey: 'required_documents_key'
  };
  //settlMethodDetails
  settlementMethodOptions: IOptionsPsLovSettlementMethodExposed = {
    group: this.formGroup,
    fcName: 'settlementMethod',
  };

  paymentsDetailOptions: IOptionsPsInputFreeTextExposed = {
    labelKey: 'payments_details_key',
    fcName: 'paymentsDetail',
    placeHolder: 'payments_details_key',
    group: this.formGroup
  };
  draweeNameOptions: IOptionsPsInputFreeTextExposed = {
    labelKey: 'drawee_name_key',
    fcName: 'draweeName',
    placeHolder: 'enter_drawee_name_key',
    group: this.formGroup
  };
  draweeBankOptions: IOptionsPsBanksExposed;
  draweeBranchOptions: IOptionsPsInputVarcharExposed;
  draweeAddressOptions: IOptionsPsComplexUserAddressExposed;
  settlementTypesOptions: IOptionsPsComplexSettlementExposed;
  goodsOptions: IOptionsPsComplexGoodsExposed;
  fileUploadOptions: IOptionsPsFileUploadComponent;
  fileDetailInputOptions: IOptionsPsInputFreeTextExposed;
  billtypesDropdownOptions: IOptionsPsDropdownTFSDocumentTypeExposed;
  defaultVO: any = {};
  billTypesArray: IOptionsPsComplexBillItemExposed[];

  constructor(public datepipe: DatePipe, private common: PsCommonService,
    public omniPull: OmniPullService, public logger: LoggerService,
  ) {
    super();
  }

  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
    this.loadOptions();
  }

  ionViewDidEnter() {
    super.ionViewDidEnter();
    // always non-mandatory
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.draweeBranchOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.draweeAddressOptions.countriesOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.draweeAddressOptions.cityOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.draweeAddressOptions.regionOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.draweeAddressOptions.streetOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.draweeAddressOptions.buildingOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.draweeAddressOptions.areaOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.draweeAddressOptions.wayOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.draweeAddressOptions.poBoxInputOptions.fcName], 0);

    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.goodsOptions.goodCategoriesOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.goodsOptions.goodOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.goodsOptions.countryGoodsOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.paymentsDetailOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.settlementTypesOptions.settlementTypesOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.settlementTypesOptions.settlementTypesOptions.fcName], 1);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.fileUploadOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.fileDetailInputOptions.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.draweeBankOptions.subCategoryFcName], false);
    this.billTypesArray.forEach(x => {
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [x.checkBoxOptions.fcName, x.copyInputOptions.fcName, x.originalInputOptions.fcName], 0);
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [x.copyInputOptions.fcName, x.originalInputOptions.fcName], 1);
      if (x.otherInputOptions) {
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [x.otherInputOptions.fcName], 0);
      }
    });
  }
  private loadOptions() {
    this.panelOptionsStep1 = {
      isExpandable: true,
      labelKey: 'outward_bills_request_key',
      iconName: 'create',
      expanded: true
    };
    this.banksDetailPanelOptions = {
      isExpandable: true,
      labelKey: 'banks_detail_key',
      iconName: 'calculator',
    };
    this.billDetailPanelOptions = {
      isExpandable: true,
      labelKey: 'bill_detail_key',
      iconName: 'document',
      expanded: true,
    };
    this.settlementsDetailPanelOptions = {
      isExpandable: true,
      labelKey: 'settlements_detail_key',
      iconName: 'clipboard',
    };
    this.panelOptions1Step2 = {
      isExpandable: true,
      labelKey: 'bill_type_key',
      iconName: 'clipboard',
      expanded: true
    };
    this.panelOptions2Step2 = {
      isExpandable: true,
      labelKey: 'goods_details_key',
      iconName: 'clipboard',
      expanded: false
    };
    this.panelOptions3Step2 = {
      isExpandable: true,
      labelKey: 'attachment_key',
      iconName: 'document',
      expanded: false
    };
    this.billtypesDropdownOptions = {
      group: this.formGroup,
      labelKey: 'bill_type_key',
      placeHolder: 'select_bill_type_key',
      fcName: 'docType',
    };
    this.billTypesArray = [
      {
        checkBoxOptions: {
          group: this.formGroup,
          fcName: 'billOfLanding',
          labelKey: 'bill_of_landing_key'
        },
        copyInputOptions: {
          group: this.formGroup,
          fcName: 'billOfLandingCopy',
          labelKey: 'copy_key',
          placeHolder: '0'
        },
        originalInputOptions: {
          group: this.formGroup,
          fcName: 'billOfLandingOriginal',
          labelKey: 'original_key',
          placeHolder: '0'
        },
        BillTypeArray: [],
        group: this.formGroup
      }, {
        checkBoxOptions: {
          group: this.formGroup,
          fcName: 'truckCompany',
          labelKey: 'truck_consignment_note_key'
        },
        copyInputOptions: {
          group: this.formGroup,
          fcName: 'truckCompanyCopy',
          labelKey: 'copy_key',
          placeHolder: '0'
        },
        originalInputOptions: {
          group: this.formGroup,
          fcName: 'truckCompanyOriginal',
          labelKey: 'original_key',
          placeHolder: '0'
        },
        BillTypeArray: [],
        group: this.formGroup
      }, {
        checkBoxOptions: {
          group: this.formGroup,
          fcName: 'airBill',
          labelKey: 'airway_bill_key'
        },
        copyInputOptions: {
          group: this.formGroup,
          fcName: 'airBillCopy',
          labelKey: 'copy_key',
          placeHolder: '0'
        },
        originalInputOptions: {
          group: this.formGroup,
          fcName: 'airBillOriginal',
          labelKey: 'original_key',
          placeHolder: '0'
        },
        BillTypeArray: [],
        group: this.formGroup
      }, {
        checkBoxOptions: {
          group: this.formGroup,
          fcName: 'deliveryOrder',
          labelKey: 'delivery_order_key'
        },
        copyInputOptions: {
          group: this.formGroup,
          fcName: 'deliveryOrderCopy',
          labelKey: 'copy_key',
          placeHolder: '0'
        },
        originalInputOptions: {
          group: this.formGroup,
          fcName: 'deliveryOrderOriginal',
          labelKey: 'original_key',
          placeHolder: '0'
        },
        BillTypeArray: [],
        group: this.formGroup
      }, {
        checkBoxOptions: {
          group: this.formGroup,
          fcName: 'draft',
          labelKey: 'drafts_key'
        },
        copyInputOptions: {
          group: this.formGroup,
          fcName: 'draftCopy',
          labelKey: 'copy_key',
          placeHolder: '0'
        },
        originalInputOptions: {
          group: this.formGroup,
          fcName: 'draftOriginal',
          labelKey: 'original_key',
          placeHolder: '0'
        },
        BillTypeArray: [],
        group: this.formGroup
      }, {
        checkBoxOptions: {
          group: this.formGroup,
          fcName: 'commercialInvoice',
          labelKey: 'commercial_invoice_key'
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
      }, {
        checkBoxOptions: {
          group: this.formGroup,
          fcName: 'certificateOfOrigin',
          labelKey: 'certificate_of_origin_key'
        },
        copyInputOptions: {
          group: this.formGroup,
          fcName: 'certificateOfOriginCopy',
          labelKey: 'copy_key',
          placeHolder: '0'
        },
        originalInputOptions: {
          group: this.formGroup,
          fcName: 'certificateOfOriginOriginal',
          labelKey: 'original_key',
          placeHolder: '0'
        },
        BillTypeArray: [],
        group: this.formGroup
      }, {
        checkBoxOptions: {
          group: this.formGroup,
          fcName: 'packingList',
          labelKey: 'packing_list_key'
        },
        copyInputOptions: {
          group: this.formGroup,
          fcName: 'packingListCopy',
          labelKey: 'copy_key',
          placeHolder: '0'
        },
        originalInputOptions: {
          group: this.formGroup,
          fcName: 'packingListOriginal',
          labelKey: 'original_key',
          placeHolder: '0'
        },
        BillTypeArray: [],
        group: this.formGroup
      }, {
        checkBoxOptions: {
          group: this.formGroup,
          fcName: 'weightList',
          labelKey: 'weight_list_key'
        },
        copyInputOptions: {
          group: this.formGroup,
          fcName: 'weightListCopy',
          labelKey: 'copy_key',
          placeHolder: '0'
        },
        originalInputOptions: {
          group: this.formGroup,
          fcName: 'weightListOriginal',
          labelKey: 'original_key',
          placeHolder: '0'
        },
        BillTypeArray: [],
        group: this.formGroup
      }, {
        checkBoxOptions: {
          group: this.formGroup,
          fcName: 'certificateOfAnalysis',
          labelKey: 'certificate_of_analysis_key'
        },
        copyInputOptions: {
          group: this.formGroup,
          fcName: 'certificateOfAnalysisCopy',
          labelKey: 'copy_key',
          placeHolder: '0'
        },
        originalInputOptions: {
          group: this.formGroup,
          fcName: 'certificateOfAnalysisOriginal',
          labelKey: 'original_key',
          placeHolder: '0'
        },
        BillTypeArray: [],
        group: this.formGroup
      }, {
        otherInputOptions: {
          group: this.formGroup,
          fcName: 'billTypes' + 'otherName',
          labelKey: 'other_key',
          placeHolder: 'other_key'
        },
        checkBoxOptions: {
          group: this.formGroup,
          fcName: 'billTypes' + 'otherChecked',
          labelKey: 'other_key'
        },
        copyInputOptions: {
          group: this.formGroup,
          fcName: 'billTypes' + 'otherCopy',
          labelKey: 'copy_key',
          placeHolder: '0'
        },
        originalInputOptions: {
          group: this.formGroup,
          fcName: 'billTypes' + 'otherOriginal',
          labelKey: 'original_key',
          placeHolder: '0'
        },
        BillTypeArray: [],
        group: this.formGroup
      }, {
        otherInputOptions: {
          group: this.formGroup,
          fcName: 'billTypes' + 'other2Name',
          labelKey: 'other_key',
          placeHolder: 'other_key'
        },
        checkBoxOptions: {
          group: this.formGroup,
          fcName: 'billTypes' + 'other2Checked',
          labelKey: 'other_key'
        },
        copyInputOptions: {
          group: this.formGroup,
          fcName: 'billTypes' + 'other2Copy',
          labelKey: 'copy_key',
          placeHolder: '0'
        },
        originalInputOptions: {
          group: this.formGroup,
          fcName: 'billTypes' + 'other2Original',
          labelKey: 'original_key',
          placeHolder: '0'
        },
        BillTypeArray: [],
        group: this.formGroup
      }, {
        otherInputOptions: {
          group: this.formGroup,
          fcName: 'billTypes' + 'other3Name',
          labelKey: 'other_key',
          placeHolder: 'other_key'
        },
        checkBoxOptions: {
          group: this.formGroup,
          fcName: 'billTypes' + 'other3Checked',
          labelKey: 'other_key'
        },
        copyInputOptions: {
          group: this.formGroup,
          fcName: 'billTypes' + 'other3Copy',
          labelKey: 'copy_key',
          placeHolder: '0'
        },
        originalInputOptions: {
          group: this.formGroup,
          fcName: 'billTypes' + 'other3Original',
          labelKey: 'original_key',
          placeHolder: '0'
        },
        BillTypeArray: [],
        group: this.formGroup
      }
    ];
    this.draweeBankOptions = {
      categoryLabelKey: 'drawee_bank_key',
      categoryPlaceholderKey: 'select_drawee_bank_key',
      categoryFcName: 'draweeBankCif',
      subCategoryLabelKey: 'bank_branch_key',
      subCategoryPlaceholderKey: 'select_branch_key',
      subCategoryFcName: 'branch',
      group: this.formGroup,
    };

    this.draweeBranchOptions = {
      fcName: 'draweeBranch',
      placeHolder: 'enter_drawee_branch_key',
      group: this.formGroup,
      labelKey: 'drawee_branch_key'
    };
    this.draweeAddressOptions = {
      areaOptions: {
        labelKey: 'drawee_area_key',
        placeHolder: 'enter_drawee_area_key',
        fcName: 'draweearea',
        group: this.formGroup
      },
      wayOptions: {
        labelKey: 'drawee_way_key',
        placeHolder: 'enter_drawee_way_key',
        fcName: 'draweeway',
        group: this.formGroup
      },
      buildingOptions: {
        labelKey: 'drawee_building_no_key',
        placeHolder: 'enter_drawee_building_no_key',
        fcName: 'draweeOccupationBuilding',
        group: this.formGroup
      },

      streetOptions: {
        labelKey: 'drawee_street_key',
        placeHolder: 'enter_drawee_street_key',
        fcName: 'draweeStreet',
        group: this.formGroup
      },
      countriesOptions: {
        labelKey: 'drawee_country_key',
        placeHolder: 'select_drawee_country_key',
        fcName: 'draweeCountryCode',
        group: this.formGroup
      },
      regionOptions: {
        labelKey: 'drawee_region_key',
        placeHolder: 'select_drawee_region_key',
        fcName: 'draweeRegionCode',
        group: this.formGroup
      },
      cityOptions: {
        labelKey: 'drawee_city_key',
        placeHolder: 'select_drawee_city_key',
        fcName: 'draweeCityCode',
        group: this.formGroup
      },
      poBoxInputOptions: {
        group: this.formGroup,
        fcName: 'draweepoBox',
        labelKey: 'drawee_pobox_key',
        placeHolder: 'enter_drawee_pobox_key',
        iconOptions: {
          iconName: 'clipboard'
        }
      }
    };
    this.settlementTypesOptions = {
      group: this.formGroup,
      settlementTypesOptions: {
        group: this.formGroup,
        fcName: 'settlementType',
        lovTypeId: 452
      },
      payableInput: {
        group: this.formGroup,
        labelKey: 'payable_at_key',
        placeHolder: 'payable_at_key',
        fcName: 'settlementPayable',
        mask: {
          regex: '[a-zA-Z0-9]*'
        }
      }, daysInput: {
        group: this.formGroup,
        placeHolder: 'enter_days_from_key',
        labelKey: 'days_from_key',
        fcName: 'settlementDays',
        mask: {
          regex: '[a-zA-Z0-9]*'
        }
      }

    };

    this.goodsOptions = {
      group: this.formGroup,
      goodOptions: {
        group: this.formGroup,
        labelKey: 'goods_key',
        fcName: 'goods',
        placeHolder: 'select_goods_key'
      },
      goodCategoriesOptions: {
        group: this.formGroup,
        labelKey: 'good_categories_key',
        fcName: 'goodCategories',
        placeHolder: 'select_good_category_key'
      },
      countryGoodsOptions: {
        group: this.formGroup,
        labelKey: 'country_goods_key',
        fcName: 'countryGoods',
        placeHolder: 'select_country_goods_key'
      },
    };
    this.fileUploadOptions = {
      group: this.formGroup,
      multiple: true,
      fcName: 'selectedFileData',
    };
    this.fileDetailInputOptions = {
      labelKey: 'file_comment_key',
      fcName: 'fileDetailInput',
      group: this.formGroup,
      placeHolder: 'enter_file_comment_key'
    };
    this.complexAmountOptions = {
      currency: '',
      currenciesOptions: {
        labelKey: 'currency_key',
        placeHolder: 'select_currency_key',
        fcName: 'currency',
        group: this.formGroup
      },
      amountOptions: {
        labelKey: 'amount_key',
        placeHolder: 'enter_amount_key',
        fcName: 'transactionAmount',
        type: 'amount',
        group: this.formGroup
      }
    };


    this.stepperOptions = {
      stepperName: 'out_bills_stepper',
      isHorizontalStepper: true,
      numberOfSteps: 2,
      namesofSteps: ['outward_bills_request_key', 'bill_types_key', 'goods_key'],
      group: this.formGroup,
      requestObject: this.defaultVO,
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
    };
  }
  onBillTypeChange(event) {
    if (event != null && event !== undefined && event.selectedObj) {
      // set value of settlement type
      this.formGroup.controls[this.settlementTypesOptions.settlementTypesOptions.fcName].setValue(event.selectedObj.settlementType);
    }
  }




}
