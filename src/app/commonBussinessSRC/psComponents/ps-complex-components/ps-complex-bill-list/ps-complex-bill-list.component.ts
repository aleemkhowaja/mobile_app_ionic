import { IOptionsPsInputVarcharExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { IOptionsPsComplexBillListExposed } from './ps-complex-bill-list.component.interfaces';
import { IOptionsPsInputFreeTextExposed } from '../../ps-keyin-input/ps-input-free-text/ps-input-free-text.component.interfaces';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsSelectCheckboxExposed } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';


/**
 * @author Ahmed.Ragab
 * @since 14/06/2020
 * 
 * <p> PsComplexBillTypesComponent is a complex component composed for Drawee Bank</p>
 */
@Component({
  selector: 'ps-complex-bill-list',
  templateUrl: './ps-complex-bill-list.component.html',
  styleUrls: ['./ps-complex-bill-list.component.scss'],
})
export class PsComplexBillListComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsComplexBillListExposed;
  @Output() public CheckChange: EventEmitter<any> = new EventEmitter<any>();
  otherInputOptions: IOptionsPsInputFreeTextExposed;
  othersCheckBoxOptions: IOptionsPsSelectCheckboxExposed;
  otherscopyInputOptions: IOptionsPsInputVarcharExposed;
  othersoriginalInputOptions: IOptionsPsInputVarcharExposed;
  other2InputOptions: IOptionsPsInputFreeTextExposed;
  others2CheckBoxOptions: IOptionsPsSelectCheckboxExposed;
  others2copyInputOptions: IOptionsPsInputVarcharExposed;
  others2originalInputOptions: IOptionsPsInputVarcharExposed;
  other3InputOptions: IOptionsPsInputFreeTextExposed;
  others3CheckBoxOptions: IOptionsPsSelectCheckboxExposed;
  others3copyInputOptions: IOptionsPsInputVarcharExposed;
  others3originalInputOptions: IOptionsPsInputVarcharExposed;
  billTypesArray: any;
  constructor(
    commonService: PsCommonService,
    public omniPull: OmniPullService,
    logger: LoggerService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    super.ngOnInit();
    this.otherInputOptions = {
      group: this.options.group,
      fcName: this.options.fcName + 'otherName',
      labelKey: 'other_name_key'
    };
    this.othersCheckBoxOptions = {
      group: this.options.group,
      fcName: this.options.fcName + 'otherChecked',
      labelKey: 'other_key'
    };
    this.otherscopyInputOptions = {
      group: this.options.group,
      fcName: this.options.fcName + 'otherCopy',
      labelKey: 'copy_key'
    };
    this.othersoriginalInputOptions = {
      group: this.options.group,
      fcName: this.options.fcName + 'otherOriginal',
      labelKey: 'original_key'
    };
    this.other2InputOptions = {
      group: this.options.group,
      fcName: this.options.fcName + 'other2Name',
      labelKey: 'other_name_key'
    };
    this.others2CheckBoxOptions = {
      group: this.options.group,
      fcName: this.options.fcName + 'other2Checked',
      labelKey: 'other_key'
    };
    this.others2copyInputOptions = {
      group: this.options.group,
      fcName: this.options.fcName + 'other2Copy',
      labelKey: 'copy_key'
    };
    this.others2originalInputOptions = {
      group: this.options.group,
      fcName: this.options.fcName + 'other2Original',
      labelKey: 'original_key'
    };
    this.other3InputOptions = {
      group: this.options.group,
      fcName: this.options.fcName + 'other3Name',
      labelKey: 'other_name_key'
    };
    this.others3CheckBoxOptions = {
      group: this.options.group,
      fcName: this.options.fcName + 'other3Checked',
      labelKey: 'other_key'
    };
    this.others3copyInputOptions = {
      group: this.options.group,
      fcName: this.options.fcName + 'other3Copy',
      labelKey: 'copy_key'
    };
    this.others3originalInputOptions = {
      group: this.options.group,
      fcName: this.options.fcName + 'other3Original',
      labelKey: 'original_key'
    };
    this.billTypesArray = [
      {
        checkBoxOptions: {
          group: this.options.group,
          fcName: 'billOfLanding',
          labelKey: 'bill_of_landing_key'
        },
        copyInputOptions: {
          group: this.options.group,
          fcName: 'billOfLandingCopy',
          labelKey: 'copy_key'
        },
        originalInputOptions: {
          group: this.options.group,
          fcName: 'billOfLandingOriginal',
          labelKey: 'original_key'
        },
        BillTypeArray: [],
        group: this.options.group
      }, {
        checkBoxOptions: {
          group: this.options.group,
          fcName: 'truckCompany',
          labelKey: 'truck_consignment_note_key'
        },
        copyInputOptions: {
          group: this.options.group,
          fcName: 'truckCompanyCopy',
          labelKey: 'copy_key'
        },
        originalInputOptions: {
          group: this.options.group,
          fcName: 'truckCompanyOriginal',
          labelKey: 'original_key'
        },
        BillTypeArray: [],
        group: this.options.group
      }, {
        checkBoxOptions: {
          group: this.options.group,
          fcName: 'airBill',
          labelKey: 'airway_bill_key'
        },
        copyInputOptions: {
          group: this.options.group,
          fcName: 'airBillCopy',
          labelKey: 'copy_key'
        },
        originalInputOptions: {
          group: this.options.group,
          fcName: 'airBillOriginal',
          labelKey: 'original_key'
        },
        BillTypeArray: [],
        group: this.options.group
      }, {
        checkBoxOptions: {
          group: this.options.group,
          fcName: 'deliveryOrder',
          labelKey: 'delivery_order_key'
        },
        copyInputOptions: {
          group: this.options.group,
          fcName: 'deliveryOrderCopy',
          labelKey: 'copy_key'
        },
        originalInputOptions: {
          group: this.options.group,
          fcName: 'deliveryOrderOriginal',
          labelKey: 'original_key'
        },
        BillTypeArray: [],
        group: this.options.group
      }, {
        checkBoxOptions: {
          group: this.options.group,
          fcName: 'draft',
          labelKey: 'drafts_key'
        },
        copyInputOptions: {
          group: this.options.group,
          fcName: 'draftCopy',
          labelKey: 'copy_key'
        },
        originalInputOptions: {
          group: this.options.group,
          fcName: 'draftOriginal',
          labelKey: 'original_key'
        },
        BillTypeArray: [],
        group: this.options.group
      }, {
        checkBoxOptions: {
          group: this.options.group,
          fcName: 'commercialInvoice',
          labelKey: 'commercial_invoice_key'
        },
        copyInputOptions: {
          group: this.options.group,
          fcName: 'commercialInvoiceCopy',
          labelKey: 'copy_key'
        },
        originalInputOptions: {
          group: this.options.group,
          fcName: 'commercialInvoiceOriginal',
          labelKey: 'original_key'
        },
        BillTypeArray: [],
        group: this.options.group
      }, {
        checkBoxOptions: {
          group: this.options.group,
          fcName: 'certificateOfOrigin',
          labelKey: 'certificate_of_origin_key'
        },
        copyInputOptions: {
          group: this.options.group,
          fcName: 'certificateOfOriginCopy',
          labelKey: 'copy_key'
        },
        originalInputOptions: {
          group: this.options.group,
          fcName: 'certificateOfOriginOriginal',
          labelKey: 'original_key'
        },
        BillTypeArray: [],
        group: this.options.group
      }, {
        checkBoxOptions: {
          group: this.options.group,
          fcName: 'packingList',
          labelKey: 'packing_list_key'
        },
        copyInputOptions: {
          group: this.options.group,
          fcName: 'packingListCopy',
          labelKey: 'copy_key'
        },
        originalInputOptions: {
          group: this.options.group,
          fcName: 'packingListOriginal',
          labelKey: 'original_key'
        },
        BillTypeArray: [],
        group: this.options.group
      }, {
        checkBoxOptions: {
          group: this.options.group,
          fcName: 'weightList',
          labelKey: 'weight_list_key'
        },
        copyInputOptions: {
          group: this.options.group,
          fcName: 'weightListCopy',
          labelKey: 'copy_key'
        },
        originalInputOptions: {
          group: this.options.group,
          fcName: 'weightListOriginal',
          labelKey: 'original_key'
        },
        BillTypeArray: [],
        group: this.options.group
      }, {
        checkBoxOptions: {
          group: this.options.group,
          fcName: 'certificateOfAnalysis',
          labelKey: 'certificate_of_analysis_key'
        },
        copyInputOptions: {
          group: this.options.group,
          fcName: 'certificateOfAnalysisCopy',
          labelKey: 'copy_key'
        },
        originalInputOptions: {
          group: this.options.group,
          fcName: 'certificateOfAnalysisOriginal',
          labelKey: 'original_key'
        },
        BillTypeArray: [],
        group: this.options.group
      }
    ];
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.othersCheckBoxOptions.fcName], false);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.otherInputOptions.fcName], false);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.otherscopyInputOptions.fcName], false);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.othersoriginalInputOptions.fcName], false);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.others2CheckBoxOptions.fcName], false);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.other2InputOptions.fcName], false);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.others2copyInputOptions.fcName], false);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.others2originalInputOptions.fcName], false);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.others3CheckBoxOptions.fcName], false);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.other3InputOptions.fcName], false);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.others3copyInputOptions.fcName], false);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.others3originalInputOptions.fcName], false);
  }
  onCheckChanged(value: any) {
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.otherInputOptions.fcName], value.newValue);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.otherscopyInputOptions.fcName], value.newValue);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.othersoriginalInputOptions.fcName], value.newValue);
    this.CheckChange.emit(value);
  }
  onCheck2Changed(value: any) {
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.other2InputOptions.fcName], value.newValue);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.others2copyInputOptions.fcName], value.newValue);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.others2originalInputOptions.fcName], value.newValue);
    this.CheckChange.emit(value);
  }
  onCheck3Changed(value: any) {
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.other3InputOptions.fcName], value.newValue);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.others3copyInputOptions.fcName], value.newValue);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.others3originalInputOptions.fcName], value.newValue);
    this.CheckChange.emit(value);
  }

}
