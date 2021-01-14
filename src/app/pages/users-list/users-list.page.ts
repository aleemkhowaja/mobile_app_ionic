import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IPageBussiness } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-menu/ps-complex-menu.component.interfaces';
import { IOptionsPsUsersListExposed } from 'src/app/commonBussinessSRC/psComponents/ps-users-list/ps-users-list.component.interfaces';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsActionButton, IOptionsPsLabel, IUsersList } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsTemplateView } from '../../commonSRC/psServices/models/ps-common-interface';
import { OmniBasePage } from '../omni-base/omni-base.page';


@Component({
  selector: 'users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage extends OmniBasePage implements OnInit {
  private formGroup = new FormGroup({});
  usersListOptions: IOptionsPsUsersListExposed;
  noUsersFound = false;
  public noRecordFoundOptions: IOptionsPsLabel = {
    labelKey: 'no_users_found_key',
    previewMode: false,
  };
  public actionIconOptions: IOptionsPsActionButton = {
    iconName: 'add-circle',
    psClass: 'register-user-button',
    labelKey: 'add_new_key',
    group: this.formGroup
  };
  requestWasSent = true;
  showCreateUserButton = false;

  constructor(
    public commonService: PsCommonService,
    public logger: LoggerService,
    private navService: PsNavigatorService,
    private omniPull?: OmniPullService,
  ) {
    super();
  }

  public templateViewOptions: IOptionsPsTemplateView = {
    group: this.formGroup
  };


  ionViewWillEnter() {
    super.init();
    super.viewWillEnter();
    this.usersListOptions = {
      isEditable: true,
      allowedActions: {
        activate: this.commonProv.hasAccessOnOperation(CommonBussinessConstant.ACTIVATE_END_USERS_REGISTRATION),
        edit: this.commonProv.hasAccessOnOperation(CommonBussinessConstant.EDIT_END_USERS_REGISTRATION),
        suspend: this.commonProv.hasAccessOnOperation(CommonBussinessConstant.SUSPEND_END_USERS_REGISTRATION),
        delete: this.commonProv.hasAccessOnOperation(CommonBussinessConstant.DELETE_END_USERS_REGISTRATION)
      }
    };
    this.populateUsersList();
    this.showCreateUserButton = this.commonProv.hasAccessOnOperation(CommonBussinessConstant.END_USERS_REGISTRATION);
  }

  GotoRegisterPage() {
    const page: IPageBussiness = {
      component: 'register-user',
      title: 'USER_REGISTRATION',
      icon: 'open-account',
      operID: CommonBussinessConstant.END_USERS_REGISTRATION,
    };
    this.navService.openPage(page);
  }

  async populateUsersList() {
    this.requestWasSent = true;
    const result = await this.omniPull.fetchUserAccountsList().catch(error => {
      this.logger.error('Error: While fetching accounts in UsersListPage :', error);
    });
    this.requestWasSent = false;
    this.logger.log('Success: UsersListPage :', result);
    const populatedUsersList: IUsersList[] = [];
    for (const iterator of result) {
      const userList: IUsersList = {
        businessProfileCode: iterator.businessProfileCode,
        businessProfileDescription: iterator.businessProfileDescription,
        email: iterator.email,
        mobileNumber: iterator.mobileNumber,
        newName: iterator.name,
        statusDescription: iterator.statusDescription,
        subProfile: iterator.subProfileId,
        newUserName: iterator.userName,
        userStatus: this.getStatus(iterator.userStatus),
        status: iterator.statusDescription,
        dataSaveId: iterator.dataSaveId,
        alertLanguage: iterator.alertLang,
        allowedAccounts: iterator.allowedAccounts,
        onlineRegYN: iterator.onlineRegYN === 'Y' ? this.commonProv.translate('online_key') : this.commonProv.translate('branch_key'),
        reason: iterator.reason ? iterator.reason : '',
        userId: iterator.userId
      };

      populatedUsersList.push(userList);
    }
    this.logger.log('LIST OF OPTIONS', populatedUsersList);
    this.usersListOptions.listOfOptions = populatedUsersList;
  }

  private getStatus(status): string {
    let newStatus = '';
    if (status) {
      switch (status) {
        case 'A': {
          newStatus = CommonBussinessConstant.USER_STATE_ACTIVE;
          break;
        }
        case 'D': {
          newStatus = CommonBussinessConstant.USER_STATE_DEACTIVE;
          break;
        }
        case 'B': {
          newStatus = CommonBussinessConstant.USER_STATE_BLOCKED;
          break;
        }
        case 'I': {
          newStatus = CommonBussinessConstant.USER_STATE_INACTIVE;
          break;
        }
        case 'S': {
          newStatus = CommonBussinessConstant.USER_STATE_SUSPEND;
          break;
        }
        case 'N': {
          newStatus = CommonBussinessConstant.USER_STATE_NEW;
          break;
        }
        case 'ACT': {
          newStatus = CommonBussinessConstant.USER_STATE_ACTIVE;
          break;
        }
        case 'Deactive': {
          newStatus = CommonBussinessConstant.USER_STATE_DEACTIVE;
          break;
        }
        case 'Blocked': {
          newStatus = CommonBussinessConstant.USER_STATE_BLOCKED;
          break;
        }
        case 'Inactive': {
          newStatus = CommonBussinessConstant.USER_STATE_INACTIVE;
          break;
        }
        case 'Suspended': {
          newStatus = CommonBussinessConstant.USER_STATE_SUSPEND;
          break;
        }
        default: {
          newStatus = '';
          break;
        }
      }
    }
    return newStatus;
  }


}
