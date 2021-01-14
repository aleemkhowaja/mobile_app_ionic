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
import { IOptionsPsInternalBeneficiaryExposed } from './ps-internal-beneficiary.component.interfaces';


/**
 * @author Aftab.Ali
 * @since 04/02/2020
 *
 * <p> PsInternalBeneficiaryComponent is business component contains mapping for for container-lookup component to load internal beneficiaries</p>
 */
@Component({
  selector: 'ps-internal-beneficiary',
  templateUrl: './ps-internal-beneficiary.component.html',
  styleUrls: ['./ps-internal-beneficiary.component.scss'],
})
export class PsInternalBeneficiaryComponent extends PsBaseFieldComponent implements OnInit {
  @Output() reloadFct = new EventEmitter<string>();
  @Input() options: IOptionsPsInternalBeneficiaryExposed = {};
  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onClickCard = new EventEmitter<any>();
  public labelValuesMap = new Map<string, IMapKeyValue>();
  public headerMap = new Map<string, IMapKeyValue>();
  private showSingleAccount = false;
  public addBeneficiaryOptions: IOptionsPsActionHyperlink = {
    route: 'internal-beneficiary',
    labelKey: 'internal_beneficiary_key',
    iconOptions: {
      iconName: 'add-circle',
    },
    pageOptions: {
      operId: PsCommonSettings.oper_ID,
      title: 'internal_beneficiary_key',
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
    this.populateInternalBeneficiariesMap();
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
    lookupDetails.labelKey = this.options.labelKey;
    lookupDetails.fcName = this.options.fcName;
    lookupDetails.currencyFlag = 'currencyDesc';
    lookupDetails.labelsValueMap = this.labelValuesMap;
    lookupDetails.headerMap = this.headerMap;
    lookupDetails.formGroup = this.options.group;
    lookupDetails.isEditable = this.options.isEditable;
    lookupDetails.itemList = this.options.itemList;

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
          route: 'internal-beneficiary',
          navigationOptions: {
            queryParams: { readOnlypage: true },
          },
          pageOptions: {
            operId: CommonBussinessConstant.INTERNAL_BENEFICIARY_OPER_ID,
            iconName: 'document',
            title: 'details_key'
          }
        }
      },
      {
        label: 'edit_key',
        actionHyperlink: {
          iconOptions: {
            iconName: 'edit1'
          },
          route: 'internal-beneficiary',
          navigationOptions: {
            queryParams: { readOnlypage: false },
          },
          pageOptions: {
            operId: CommonBussinessConstant.INTERNAL_BENEFICIARY_OPER_ID,
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
            operId: CommonBussinessConstant.INTERNAL_BENEFICIARY_TRANSFER,
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
  private populateInternalBeneficiariesMap() {
    let beneficiaryAccountNumberMap: IMapKeyValue = {};
    let beneficiaryNameMap: IMapKeyValue = {};
    let beneficiaryReasonMap: IMapKeyValue = {};
    let beneficiaryPhoneNumberMap: IMapKeyValue = {};
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

    beneficiaryReasonMap = {
      key: 'purpose',
      value: '------',
      isEdit: false
    };

    beneficiaryPhoneNumberMap = {
      key: 'benefPhone',
      value: '------',
      isEdit: false
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
    this.labelValuesMap.set('phone_number_key', beneficiaryPhoneNumberMap);
    this.labelValuesMap.set('purpose_key', beneficiaryReasonMap);

    // will be used as header to template card in look up details component
    this.headerMap.set('title', headerTitleMap);
    this.headerMap.set('subTitle', headerSubtitleMap);

  }

  prepareTransaction(actionCard: IOptionsPsActionHyperlink) {
    actionCard.navigationOptions.queryParams.ScreenVO = {
      toAccountType: 'companyAccountTransfer',
      toAccount: actionCard.navigationOptions.queryParams.accountNumber,
      toAccount_lookupKey: actionCard.navigationOptions.queryParams.accountNumber,
    };
  }
}
