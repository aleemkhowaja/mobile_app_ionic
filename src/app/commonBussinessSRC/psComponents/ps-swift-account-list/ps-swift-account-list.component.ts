import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PsBaseFieldComponent } from '../../../commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from '../../../commonSRC/psServices/logger/logger.service';
import { PsCommonService } from '../../../commonSRC/psServices/ps-common/ps-common.service';
import { IMapKeyValue, IOptionsPsContainerLookupOptionComponentExposed } from '../../psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsSwiftAccountListExposed } from './ps-swift-account-list.component.interfaces';

/**
 * @author Zunair.Zakir
 * @since 29/01/2020
 *
 * <p> PsSwiftAccountListComponent </p>
 */
@Component({
  selector: 'ps-swift-account',
  templateUrl: './ps-swift-account-list.component.html',
  styleUrls: ['./ps-swift-account-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PsSwiftAccountListComponent extends PsBaseFieldComponent implements OnInit, AfterViewChecked {

  @Input() options: IOptionsPsSwiftAccountListExposed = {};
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onClickCard = new EventEmitter<any>();
  public containerLookUpOptions: IOptionsPsContainerLookupOptionComponentExposed = {};
  public labelValuesMap = new Map<string, IMapKeyValue>();
  public headerMap = new Map<string, IMapKeyValue>();
  private showSingleAccount = false;

  constructor(
    commonServices: PsCommonService,
    logger: LoggerService,
    private cdRef?: ChangeDetectorRef
  ) {
    super(commonServices, logger);
  }

  ngOnInit() {
    super.ngOnInit();
    this.populateAccountsMap();
    if (this.options.showOnlyList === null || this.options.showOnlyList === undefined) {
      this.options.showOnlyList = false;
    }
    this.containerLookUpOptions.currencyFlag = 'currencyDesc';
    this.containerLookUpOptions.labelsValueMap = this.labelValuesMap;
    this.containerLookUpOptions.headerMap = this.headerMap;
    this.containerLookUpOptions.formGroup = this.options.group;
    // this.containerLookUpOptions.balanceMapping = this.balanceMapping();
    this.containerLookUpOptions.isEditable = this.options.isEditable;
    if (this.options && this.options.listOfOptions) {
      this.options.itemList = this.options.listOfOptions;
    }
    this.containerLookUpOptions.statementOptions = {};
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

  private populateAccountsMap() {
    let swiftAccountNumberMap: IMapKeyValue = {};
    let swiftBankNameMap: IMapKeyValue = {};
    let headerTitleMap: IMapKeyValue = {};
    let headerSubtitleMap: IMapKeyValue = {};

    swiftAccountNumberMap = {
      key: 'swiftAccountNumber', // will be used in lookup compoent to get the value of account nummer from list of accounts
      value: '--- --- ---',
      isEdit: false
    };

    swiftBankNameMap = {
      key: 'swiftBankName', // will be used in lookup compoent to get the value of account balance from list of accounts
      value: '------',
      isEdit: false
    };

    headerTitleMap = {
      key: 'title',
      value: 'swiftName',
      isEdit: false
    };

    headerSubtitleMap = {
      key: 'subTitle',
      value: 'swiftNameSub',
      isEdit: true
    };


    // key here will be used as label in look up details component
    this.labelValuesMap.set('swift_account_key', swiftAccountNumberMap);
    this.labelValuesMap.set('bank_name_key', swiftBankNameMap);
    // will be used as header to template card in look up details component
    this.headerMap.set('title', headerTitleMap);
    this.headerMap.set('subTitle', headerSubtitleMap);
  }

  /**
   * 
   */
  // private balanceMapping(): any[] {
  //   const balanceMappingList = [
  //     {
  //       key: 'current_balance_key',
  //       value: 'currentBalance'
  //     },
  //     {
  //       key: 'available_balance_key',
  //       value: 'availableBalance'
  //     },
  //     {
  //       Key: 'currency_decimal_point_key',
  //       value: 'currencyDecimalPoints'
  //     },
  //     {
  //       key: 'currency_iso_key',
  //       value: 'currencyDesc'
  //     }
  //   ];

  //   return balanceMappingList;
  // }

}
