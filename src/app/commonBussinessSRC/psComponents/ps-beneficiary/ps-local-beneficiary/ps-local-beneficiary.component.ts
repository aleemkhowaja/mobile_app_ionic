import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IMapKeyValue, IOptionsPsContainerLookupOptionComponentExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsActionHyperlink } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsLocalBeneficiaryExposed } from './ps-local-beneficiary.component.interfaces';


/**
 * @author Aftab.Ali
 * @since 04/02/2020
 *
 * <p> PsLocalBeneficiaryComponent is business component contains mapping for for container-lookup component to load local beneficiaries</p>
 */
@Component({
  selector: 'ps-local-beneficiary',
  templateUrl: './ps-local-beneficiary.component.html',
  styleUrls: ['./ps-local-beneficiary.component.scss'],
})
export class PsLocalBeneficiaryComponent extends PsBaseFieldComponent implements OnInit {
  @Output() reloadFct = new EventEmitter<string>();
  @Input() options: IOptionsPsLocalBeneficiaryExposed = {};
  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onClickCard = new EventEmitter<any>();
  public labelValuesMap = new Map<string, IMapKeyValue>();
  public headerMap = new Map<string, IMapKeyValue>();
  private showSingleAccount = false;
  public addBeneficiaryOptions: IOptionsPsActionHyperlink = {
    route: 'local-beneficiary',
    labelKey: 'local_beneficiary_key',
    iconOptions: {
      iconName: 'add-circle',
    },
    pageOptions: {
      operId: PsCommonSettings.oper_ID,
      title: 'local_beneficiary_key',
      iconName: 'beneficiaries',
    }
  };
  public updateList: any[];
  public bRefresh = false;

  constructor(
    commonServices: PsCommonService,
    logger: LoggerService,
    public navService?: PsNavigatorService,
  ) {
    super(commonServices, logger);
  }

  ngOnInit() {
    super.ngOnInit();
    this.populateLocalBeneficiariesMap();
    if (this.options.showOnlyList === null || this.options.showOnlyList === undefined) {
      this.options.showOnlyList = false;
    }
    // this.containerLookUpOptions.balanceMapping = this.balanceMapping();
    if (this.options.listOfOptions) {
      this.options.itemList = this.options.listOfOptions;
    }

  }

  getContainerLookUpOptions() {
    return this.prepareLookUp();
  }

  private prepareLookUp(): any {
    let lookupDetails: IOptionsPsContainerLookupOptionComponentExposed = {};
    lookupDetails.labelKey = this.options.labelKey;
    lookupDetails.fcName = this.options.fcName;
    lookupDetails.currencyFlag = 'currencyDesc';
    lookupDetails.labelsValueMap = this.labelValuesMap;
    lookupDetails.headerMap = this.headerMap;
    lookupDetails.formGroup = this.options.group;
    lookupDetails.itemList = this.options.itemList;
    lookupDetails.showInitialCardValues = 2;

	// The detailServiceUrl will load the detail of any service in which
	// paramsKeyLabels is the request parameter
	// responseKeyLabel is the property to be displayed on itemCard key from the response.
    lookupDetails.detailServiceUrl = [
      {url: PsCommonBusinessSettings.serviceUrl.returnCategorySubcategory, paramsKeyLabels: [{key: 'includeIds', value: 'bank'}, {key: 'type', staticValue: 'Bank'}], responseKeyLabel: [{key: 'categoriesDescription', value: 'bank'}]}    ];
    lookupDetails.actionDetailsOptions = [
      {
        buttonIcon: 'delete',
        actionUrl: PsCommonBusinessSettings.serviceUrl.deleteBeneficiaryEndPoint,
        cssClass: 'fab-edit-button',
        label: 'delete_key',
        iconName: 'trash',
        actionType: 'delete',
        postCallFunction: {
          func() {
            return new Promise<any>((resolve, reject) => {
              resolve(this.executionClass.reloadList());
            });
          },
          executionClass: this,
          params: []
        }
      },
      {
        label: 'details_key',
        actionHyperlink: {
          iconOptions: {
            iconName: 'document'
          },
          route: 'local-beneficiary',
          navigationOptions: {
            queryParams: { readOnlypage: true },
          },
          pageOptions: {
            operId: CommonBussinessConstant.LOCAL_BENEFICIARY_OPER_ID,
            iconName: 'document',
            title: 'additional_details_key'
          }
        }
      },
      {
        label: 'edit_key',
        actionHyperlink: {
          iconOptions: {
            iconName: 'edit1'
          },
          route: 'local-beneficiary',
          navigationOptions: {
            queryParams: { readOnlypage: false },
          },
          pageOptions: {
            operId: CommonBussinessConstant.LOCAL_BENEFICIARY_OPER_ID,
            iconName: 'edit1',
            title: 'edit_key'
          }
        }
      },
      {
        label: 'pay_key',
        actionHyperlink: {
          iconOptions: {
            iconName: 'create'
          },
          route: 'payment',
          navigationOptions: {
            queryParams: { readOnlypage: false },
          },
          pageOptions: {
            operId: CommonBussinessConstant.LOCAL_BENEFICIARY_TRANSFER,
            iconName: 'create',
          },
          preCallFunction: {
            func() {
              return new Promise<any>((resolve, reject) => {
                resolve(this.executionClass.prepareTransaction(lookupDetails.actionDetailsOptions[3].actionHyperlink));
              });
            },
            executionClass: this,
            params: []
          },
        }
      }
    ];
    lookupDetails.statementOptions = {};
    lookupDetails.isEditable = this.options.isEditable;
    return lookupDetails;
  }

  reloadList() {
    this.reloadFct.emit();
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



  /**
   * populating the map for internal beneficiaries
   */
  private populateLocalBeneficiariesMap() {
    let beneficiaryAccountNumberMap: IMapKeyValue = {};
    let beneficiaryNameMap: IMapKeyValue = {};

    let beneficiaryBankMap: IMapKeyValue = {};

    let headerTitleMap: IMapKeyValue = {};
    let headerSubtitleMap: IMapKeyValue = {};

    beneficiaryAccountNumberMap = {
      key: 'accountNumber',
      value: '--- --- ---',
      isEdit: false
    };

    beneficiaryNameMap = {
      key: 'benefName',
      value: '------',
      isEdit: false
    };

    // load value on card expend
    beneficiaryBankMap = {
      key: 'bank',
      value: '--- --- ---',
      isEdit: false,
      isDetailOption: true,
    };

    headerTitleMap = {
      key: 'title',
      value: 'accountNumber',
      isEdit: false
    };

    headerSubtitleMap = {
      key: 'subTitle',
      value: 'benefName',
      isEdit: true
    };


    // key here will be used as label in look up details component
    this.labelValuesMap.set('account_key', beneficiaryAccountNumberMap);
    this.labelValuesMap.set('name_key', beneficiaryNameMap);

    // load on card expend
    this.labelValuesMap.set('bank_key', beneficiaryBankMap);

    // will be used as header to template card in look up details component
    this.headerMap.set('title', headerTitleMap);
    this.headerMap.set('subTitle', headerSubtitleMap);
  }

  prepareTransaction(actionCard: IOptionsPsActionHyperlink) {
    actionCard.navigationOptions.queryParams.ScreenVO = {
      toAccountType: 'bankLocalTransfer',
      toBeneficiary: actionCard.navigationOptions.queryParams.accountNumber,
      toBeneficiary_lookupKey: actionCard.navigationOptions.queryParams.accountNumber,
      bank: actionCard.navigationOptions.queryParams.benefBankId,
      currency: actionCard.navigationOptions.queryParams.currency,
    };
  }

}

