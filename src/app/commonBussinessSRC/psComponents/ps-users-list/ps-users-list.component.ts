import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IFunctionDefinition } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonBusinessSettings } from '../../psServices/models/ps-commonBusiness.settings';
import { PsBaseFieldComponent } from './../../../commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from './../../../commonSRC/psServices/logger/logger.service';
import { PsCommonService } from './../../../commonSRC/psServices/ps-common/ps-common.service';
import { IMapKeyValue, IOptionsPsContainerLookupOptionComponentExposed } from './../../psServices/models/ps-common-bussiness-interfaces';
import { IOptionsPsUsersListExposed } from './ps-users-list.component.interfaces';



@Component({
  selector: 'ps-users-list',
  templateUrl: './ps-users-list.component.html',
  styleUrls: ['./ps-users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PsUsersListComponent extends PsBaseFieldComponent implements OnInit {
  @Output() reloadFct = new EventEmitter<string>();
  @Input() options: IOptionsPsUsersListExposed = {};
  // tslint:disable-next-line: no-output-on-prefix
  @Output() public onClickCard = new EventEmitter<any>();
  public labelValuesMap = new Map<string, IMapKeyValue>();
  public headerMap = new Map<string, IMapKeyValue>();
  public requestMap = new Map<string, string>();
  public editRequestMap = new Map<string, string>();
  updateList: any[];
  bRefresh: any = false;
  postFct: IFunctionDefinition = {
    func() {
      return new Promise<any>((resolve, reject) => {
        resolve(this.executionClass.reloadList());
      });
    },
    executionClass: this,
    params: []
  };
  constructor(
    commonServices: PsCommonService,
    logger: LoggerService,
  ) {
    super(commonServices, logger);
  }


  ngOnInit() {
    super.ngOnInit();

    this.populateUsersListMap();
    if (this.options.showOnlyList === null || this.options.showOnlyList === undefined) {
      this.options.showOnlyList = false;
    }

    if (this.options && this.options.listOfOptions) {
      this.options.itemList = this.options.listOfOptions;
    }
  }

  getContainerLookUpOptions(val) {
    return this.prepareLookUp(val);
  }

  private prepareLookUp(user: any): any {

    const lookupDetails: IOptionsPsContainerLookupOptionComponentExposed = {};
    lookupDetails.labelKey = this.options.labelKey;
    lookupDetails.fcName = this.options.fcName;
    lookupDetails.currencyFlag = '';
    lookupDetails.labelsValueMap = this.labelValuesMap;
    lookupDetails.headerMap = this.headerMap;
    lookupDetails.formGroup = this.options.group;
    lookupDetails.isEditable = this.options.isEditable;
    lookupDetails.translateSubTitle = false;
    lookupDetails.itemList = this.options.itemList;

    lookupDetails.actionDetailsOptions = [];


    // if (this.commonProv.getPageByOperId(CommonBussinessConstant.ACTIVATE_END_USERS_REGISTRATION) !== undefined) { // ACTIVATE_END_USERS_REGISTRATION
    if (this.options.allowedActions.activate) {
      if (user.userStatus === CommonBussinessConstant.USER_STATE_SUSPEND) {
        lookupDetails.actionDetailsOptions.push({
          buttonIcon: 'paper-plane',
          actionUrl: PsCommonBusinessSettings.serviceUrl.activateCorporateUserEndpoint,
          cssClass: 'fab-edit-button',
          label: 'activate_key',
          iconName: 'paper-plane',
          actionType: 'activate',
          alertType: 'input',
          fcName: 'reasonDetails',
          operId: CommonBussinessConstant.ACTIVATE_END_USERS_REGISTRATION,
          postCallFunction: this.postFct
        });
      }
    }


    // if (this.commonProv.getPageByOperId(CommonBussinessConstant.SUSPEND_END_USERS_REGISTRATION) !== undefined) { // SUSPEND_END_USERS_REGISTRATION
    if (this.options.allowedActions.suspend) {
      if (user.userStatus === CommonBussinessConstant.USER_STATE_ACTIVE) {
        lookupDetails.actionDetailsOptions.push({
          label: 'suspend_key',
          buttonIcon: 'information-circle-outline',
          actionUrl: PsCommonBusinessSettings.serviceUrl.suspendCorporateUserEndpoint,
          cssClass: 'fab-edit-button',
          iconName: 'information-circle-outline',
          actionType: 'suspend',
          alertType: 'input',
          fcName: 'reasonDetails',
          operId: CommonBussinessConstant.SUSPEND_END_USERS_REGISTRATION,
          postCallFunction: this.postFct
        });
      }

    }

    // if (this.commonProv.getPageByOperId(CommonBussinessConstant.DELETE_END_USERS_REGISTRATION) !== undefined) { // DELETE_END_USERS_REGISTRATION
    if (this.options.allowedActions.delete) {
      lookupDetails.actionDetailsOptions.push({
        buttonIcon: 'delete',
        actionUrl: PsCommonBusinessSettings.serviceUrl.deleteCorporateUserEndpoint,
        cssClass: 'fab-edit-button',
        label: 'delete_key',
        iconName: 'trash',
        actionType: 'delete',
        alertType: 'input',
        fcName: 'reasonDetails',
        operId: CommonBussinessConstant.DELETE_END_USERS_REGISTRATION,
        postCallFunction: this.postFct
      });
    }

    // if (this.commonProv.getPageByOperId(CommonBussinessConstant.EDIT_END_USERS_REGISTRATION) !== undefined) { // EDIT_END_USERS_REGISTRATION
    if (this.options.allowedActions.edit) {
      if (user.userStatus === CommonBussinessConstant.USER_STATE_ACTIVE) {
        lookupDetails.actionDetailsOptions.push({
          label: 'edit_key',
          actionHyperlink: {
            iconOptions: {
              iconName: 'paper'
            },
            route: 'register-user',
            pageOptions: {
              operId: CommonBussinessConstant.EDIT_END_USERS_REGISTRATION, // END_USERS_EDIT
              iconName: 'paper',
              title: 'edit_key',
            }
          }
        });
      }
    }

    lookupDetails.statementOptions = {};
    return lookupDetails;
  }

  reloadList() {
    this.reloadFct.emit();
  }


  private populateUsersListMap() {
    let userPhoneMap: IMapKeyValue = {};
    let userNameMap: IMapKeyValue = {};
    let userEmailMap: IMapKeyValue = {};
    let headerTitleMap: IMapKeyValue = {};
    let headerSubtitleMap: IMapKeyValue = {};
    let alertLangMap: IMapKeyValue = {};
    // let statusDescriptionMap: IMapKeyValue = {};
    let userStatusMap: IMapKeyValue = {};
    let regSourceMap: IMapKeyValue = {};
    let reasonMap: IMapKeyValue = {};

    userEmailMap = {
      key: 'email',
      value: '',
      isEdit: false,
    };

    userPhoneMap = {
      key: 'mobileNumber',
      value: '',
      isEdit: false,
    };

    userNameMap = {
      key: 'newUserName',
      value: '',
      isEdit: false
    };

    // statusDescriptionMap = {
    //   key: 'statusDescription',
    //   value: '',
    //   isEdit: false
    // };

    userStatusMap = {
      key: 'userStatus',
      value: '',
      isEdit: false
    };

    alertLangMap = {
      key: 'alertLanguage',
      value: '',
      isEdit: false
    };

    reasonMap = {
      key: 'reason',
      value: '',
      isEdit: false
    };

    regSourceMap = {
      key: 'onlineRegYN',
      value: '',
      isEdit: false
    };

    headerTitleMap = {
      key: 'title',
      value: 'newName',
      isEdit: false,
    };

    headerSubtitleMap = {
      key: 'subTitle',
      value: 'businessProfileDescription',
      isEdit: false
    };


    // key here will be used as label in look up details component
    this.labelValuesMap.set('user_name_key', userNameMap);
    this.labelValuesMap.set('email_key', userEmailMap);
    this.labelValuesMap.set('phone_number_key', userPhoneMap);
    // this.labelValuesMap.set('status_description_key', statusDescriptionMap);
    this.labelValuesMap.set('reason_key', reasonMap);
    this.labelValuesMap.set('alert_language_key', alertLangMap);
    this.labelValuesMap.set('source_key', regSourceMap);
    // will be used as header to template card in look up details component
    this.headerMap.set('title', headerTitleMap);
    this.headerMap.set('subTitle', headerSubtitleMap);
  }

  public updateCard(item: any) {
    this.onClickCard.emit(this.options);
  }

}
