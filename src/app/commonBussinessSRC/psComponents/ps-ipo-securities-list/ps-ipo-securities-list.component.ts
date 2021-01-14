import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IListContainerLookupOption, IMapKeyValue, IOptionsPsContainerLookupOptionComponentExposed } from '../../psServices/models/ps-common-bussiness-interfaces';
import { CommonBussinessConstant } from './../../psServices/models/ps-common-bussiness-constant';
import { IOptionsPsIpoSecuritiesListExposed } from './ps-ipo-securities-list.component.interfaces';

/**
 * @author Aftab.Ali
 * @since 04/02/2020
 *
 * <p> PsIpoSecuritiesListComponent is a business component to show ipo securities list fetched from server</p>
 */
@Component({
  selector: 'ps-ipo-securities-list',
  templateUrl: './ps-ipo-securities-list.component.html',
  styleUrls: ['./ps-ipo-securities-list.component.scss'],
})
export class PsIpoSecuritiesListComponent extends PsBaseFieldComponent implements OnInit, AfterViewChecked {

  @Input() options: IOptionsPsIpoSecuritiesListExposed = {};
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onClickCard = new EventEmitter<any>();
  public containerLookUpOptions: IOptionsPsContainerLookupOptionComponentExposed = {};
  public labelValuesMap = new Map<string, IMapKeyValue>();
  public headerMap = new Map<string, IMapKeyValue>();
  private showSingleAccount = false;
  lookUpOptions: IListContainerLookupOption[] = [];
  constructor(
    commonServices: PsCommonService,
    logger: LoggerService,
    private cdRef?: ChangeDetectorRef
  ) {
    super(commonServices, logger);
    this.populateIpoSecurityMap();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.options.showOnlyList === null || this.options.showOnlyList === undefined) {
      this.options.showOnlyList = false;
    }
    if (this.options && this.options.listOfOptions) {
      this.options.itemList = this.options.listOfOptions;
    }
  }

  getContainerLookUpOptions() {
    return this.prepareLookUp();
  }

  private prepareLookUp(): any {
    let lookupDetails: IOptionsPsContainerLookupOptionComponentExposed = {};
    lookupDetails.currencyFlag = 'currencyDesc';
    lookupDetails.labelsValueMap = this.labelValuesMap;
    lookupDetails.headerMap = this.headerMap;
    lookupDetails.formGroup = this.options.group;
    lookupDetails.balanceMapping = [];
    lookupDetails.isEditable = this.options.isEditable;
    lookupDetails.translateSubTitle = false;
    lookupDetails.actionDetailsOptions = [
      {
        label: 'ipo_request_key',
        actionHyperlink: {
          iconOptions: {
            iconName: 'list-box'
          },
          route: 'ipo-request',
          pageOptions: {
            operId: CommonBussinessConstant.IPO_RENEWAL,
            iconName: 'keypad',
            title: 'ipo_request_key'
          }
        }
      },
      {
        label: 'isdara_bulletin_key',
        iconName: 'attach',
        commonMethod: 'getAttachmentsAndOrDownload'
      }
    ];
    return lookupDetails;
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

  public updateCard(account: any) {
    if (account && this.options.listOfOptions) {
      this.options.itemList = this.options.listOfOptions.filter(acct => acct === account);
      this.options.item = this.options.itemList[0];
      this.showSingleAccount = !this.showSingleAccount;
      this.options.showItemPopUp = !this.options.showItemPopUp;
      // this.options.showSelectedCard = false;
    }
    this.onClickCard.emit(this.options);
  }

  private populateIpoSecurityMap() {
    let ipoStartDateMap: IMapKeyValue = {};
    let ipoEndDateMap: IMapKeyValue = {};
    let remainingLimitMap: IMapKeyValue = {};
    let sukukPriceMap: IMapKeyValue = {};
    let profitRateMap: IMapKeyValue = {};
    let yearsMap: IMapKeyValue = {};
    let sukukTypeMap: IMapKeyValue = {};

    let headerTitleMap: IMapKeyValue = {};
    let headerSubtitleMap: IMapKeyValue = {};

    sukukPriceMap = {
      key: 'calculatedSukukPrice',
      value: '0.0',
      isEdit: false
    };

    remainingLimitMap = {
      key: 'remainingLimit',
      value: '0.0',
      isEdit: false
    };

    profitRateMap = {
      key: 'profitRate',
      value: '0.0',
      isEdit: false
    };

    yearsMap = {
      key: 'years',
      value: '0.0',
      isEdit: false
    };
    ipoStartDateMap = {
      key: 'ipoStartDate',
      value: '0.0',
      isEdit: false
    };

    ipoEndDateMap = {
      key: 'ipoEndDate',
      value: '0.0',
      isEdit: false
    };

    sukukTypeMap = {
      key: 'sukukType',
      value: '',
      isEdit: false
    };

    headerTitleMap = {
      key: 'title',
      value: 'title',
      isEdit: false,
    };

    headerSubtitleMap = {
      key: 'subTitle',
      value: 'subTitle',
      isEdit: false
    };


    // key here will be used as label in look up details component
    this.labelValuesMap.set('sukuk_price_key', sukukPriceMap);
    this.labelValuesMap.set('remaining_limit_key', remainingLimitMap);
    this.labelValuesMap.set('profit_rate_key', profitRateMap);
    this.labelValuesMap.set('years_key', yearsMap);
    this.labelValuesMap.set('ipo_start_date_key', ipoStartDateMap);
    this.labelValuesMap.set('ipo_end_date_key', ipoEndDateMap);
    this.labelValuesMap.set('sukuk_type_key', sukukTypeMap);

    // will be used as header to template card in look up details component
    this.headerMap.set('title', headerTitleMap);
    this.headerMap.set('subTitle', headerSubtitleMap);
  }

}
