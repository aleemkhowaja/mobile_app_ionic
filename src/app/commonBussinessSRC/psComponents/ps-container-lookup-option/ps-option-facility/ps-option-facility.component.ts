import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IMapKeyValue, IOptionsPsContainerLookupOptionComponentExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsOptionFacilityExposed } from './ps-option-facility.component.interface';

@Component({
  selector: 'ps-option-facility',
  templateUrl: './ps-option-facility.component.html',
  styleUrls: ['./ps-option-facility.component.scss'],
})
export class PsOptionFacilityComponent  extends PsBaseFieldComponent implements OnInit {
  @Input() options: IOptionsPsOptionFacilityExposed;
  @Output() public onClickCard = new EventEmitter<any>();


  containerLookUpOptions: IOptionsPsContainerLookupOptionComponentExposed = {};
  public labelValuesMap = new Map<string, IMapKeyValue>();
  public headerMap = new Map<string, IMapKeyValue>();
  private showSingleAccount = false;
  public requestMap = new Map<string, string>();
  public editRequestMap = new Map<string, string>();


  constructor(commonProv: PsCommonService,
              private cdRef?: ChangeDetectorRef) {
    super(commonProv, commonProv.logger);
   }

  ngOnInit() {
    super.init();
    this.populateHeaderValueMap();
    if (this.options.showOnlyList === null || this.options.showOnlyList === undefined) {
      this.options.showOnlyList = false;
    }
    this.containerLookUpOptions.currencyFlag = 'currencyBriefNameEnglish';
    this.containerLookUpOptions.labelsValueMap = this.labelValuesMap;
    this.containerLookUpOptions.headerMap = this.headerMap;
    this.containerLookUpOptions.formGroup = this.options.group;
    this.containerLookUpOptions.balanceMapping = this.balanceMapping();
    this.containerLookUpOptions.isEditable = this.options.isEditable;
    this.containerLookUpOptions.editActionUrl = PsCommonBusinessSettings.serviceUrl.personalizationNicknameEndPoint;;
    this.containerLookUpOptions.requestMap = this.requestMap;
    this.containerLookUpOptions.editRequestMap = this.editRequestMap;
    this.containerLookUpOptions.pageData = {
      operID: CommonBussinessConstant.CARD_REPORT,//FACILITY_REPORT
      title: 'facility_report_key'
    };
    if (this.options && this.options.listOfOptions) {
      this.options.itemList = this.options.listOfOptions;
    }
    this.containerLookUpOptions.actionDetailsOptions = [];

    this.containerLookUpOptions.statementOptions = {
      buttonIcon: 'list-box',
      redirectUrl: 'facility-statement-report'
    };
  }

  private populateHeaderValueMap() {
    let facilityNumberMap: IMapKeyValue = {};
    let amountMap:IMapKeyValue = {};
    let expiryDateMap: IMapKeyValue = {};
    let unutilizedAmountMap: IMapKeyValue = {};
    let branchNameMap: IMapKeyValue = {};
    let headerTitleMap: IMapKeyValue = {};
    let headerSubtitleMap: IMapKeyValue = {};
    //let currencyMap: IMapKeyValue = {};

    facilityNumberMap = {
      key: 'facilityNo',
      value: ''
    };

    amountMap = {
      key: 'facilityAmount',
      value: '0.0'
    };

    unutilizedAmountMap = {
      key: 'unutilizedAmount',
      value: '0.0'
    };

    expiryDateMap = {
      key: 'expiryDate',
      value: ''
    };

    branchNameMap = {
      key: 'branchName',
      value: ''
    };

    // currencyMap = {
    //   key: 'currencyDesc',
    //   value: ''
    // };


    headerTitleMap = {
      key: 'title',
      value: 'currency',
      isEdit: false,
      formGroupMap: {
        placeHolder: 'facilityNo',
        fcName: 'facilityNoTitle',
      }
    };

    headerSubtitleMap = {
      key: 'subTitle',
      value: 'facilityNo',
      isEdit: false,
      formGroupMap: {
        placeHolder: '',
        fcName: 'subTitle',
      }
    };



    // key here will be used as label in look up details component
    this.labelValuesMap.set('facility_number_key', facilityNumberMap);
    //this.labelValuesMap.set('currency_key', currencyMap);
    //this.labelValuesMap.set('amount_key', amountMap);
    this.labelValuesMap.set('expiry_date_key', expiryDateMap);
    //this.labelValuesMap.set('unutilized_amount_key', unutilizedAmountMap);
    this.labelValuesMap.set('branch_key', branchNameMap);

    // will be used as header to template card in look up details component
    this.headerMap.set('title', headerTitleMap);
    this.headerMap.set('subTitle', headerSubtitleMap);

  }

  updateCard(facility: any) {
    if (facility && this.options.listOfOptions) {
      this.options.itemList = this.options.listOfOptions.filter(acct => acct === facility);
      this.options.item = this.options.itemList[0];
      this.showSingleAccount = !this.showSingleAccount;
      this.options.showItemPopUp = !this.options.showItemPopUp;
      // this.options.showSelectedCard = false;
  }
    this.onClickCard.emit(this.options);
  }

  private balanceMapping(): any[] {
    const balanceMappingList = [
      {
        key: 'facility_amount_key',
        value: 'facilityAmount'
      },
      {
        key: 'unutilized_amount_key',
        value: 'unutilizedAmount'
      }
    ];

    return balanceMappingList;
  }


  ngAfterViewChecked() {
    this.cdRef.markForCheck();
    if (this.options && (this.options.itemList === null || this.options.itemList === undefined)) {
        this.options.itemList = this.options.listOfOptions;
        this.showSingleAccount = false;
    } else if (this.options && this.options.itemList && this.options.itemList.length === 1 && this.showSingleAccount === false) {
        this.options.itemList = this.options.listOfOptions;
    } else if (this.options && this.options.showItemPopUp === undefined) {
        this.options.itemList = this.options.listOfOptions;
    }
    this.containerLookUpOptions.itemList = this.options.itemList;
    this.containerLookUpOptions.formGroup = this.options.group;
}

}
