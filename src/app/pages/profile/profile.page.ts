import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { ILoginResponse } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsContainerPanel, IOptionsPsHyperlinkAnchor, IOptionsPsInlineLabeledCamera, IOptionsPsLabel, IOptionsPsTemplateView } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { OmniBasePage } from '../omni-base/omni-base.page';
import { PsCommonSettings } from './../../commonSRC/psServices/models/ps-common.settings';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage extends OmniBasePage implements OnInit {

  panelProfileOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'profile_settings_key',
    expanded: true,
    iconName: 'contact'

  };
  panelSecurityOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'security_settings_key',
    expanded: false,
    iconName: 'finger-print',
  };
  panelActivityLogOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'activity_log_key',
    expanded: false,
    iconName: 'document',
  };

  formGroup: FormGroup = new FormGroup({});
  profileVO = {};
  public options: IOptionsPsTemplateView = {
    group: this.formGroup
  };

  userInformation: ILoginResponse;
  EnableSecurityQuestion: boolean;
  EnablePin: boolean;
  accountDeactivationPanelOptions: IOptionsPsHyperlinkAnchor = {
    route: 'account-deactivation',
    labelKey: 'account_deactivation_key',
    titleOptions: {
      labelKey: 'account_deactivation_key',
      psClass: 'ps-anchor-title',
    },
    descriptionOptions: {
      labelKey: 'account_deactivation_key',
      psClass: 'ps-anchor-description',
    },
    iconOptions: {
      iconName: 'warning',
    },
    pageOptions: {
      iconName: 'warning',
      title: 'account_deactivation_key'
    }

  };
  changePasswordPanelOptions: IOptionsPsHyperlinkAnchor = {
    route: 'change-pass',
    labelKey: 'change_password_key',
    titleOptions: {
      labelKey: 'change_password_key',
      psClass: 'ps-anchor-title',
    },
    descriptionOptions: {
      labelKey: 'change_your_password_key',
      psClass: 'ps-anchor-description',
    },
    iconOptions: {
      iconName: 'lock',
    },
    pageOptions: {
      iconName: 'lock',
      title: 'change_password_key',
      operId: CommonBussinessConstant.CHANGE_PASSWORD_OPER
    }
  };
  changePinPanelOptions: IOptionsPsHyperlinkAnchor = {
    route: 'change-pin',
    labelKey: 'change_pin_key',
    titleOptions: {
      labelKey: 'change_pin_key',
      psClass: 'ps-anchor-title',
    },
    descriptionOptions: {
      labelKey: 'displays_the_pin_details_key',
      psClass: 'ps-anchor-description',
    },
    iconOptions: {
      iconName: 'key',
    },
    pageOptions: {
      iconName: 'key',
      title: 'change_pin_key',
      operId: CommonBussinessConstant.CHANGE_PIN_OPER
    }
  };
  changeSecurityQuestionsPanelOptions: IOptionsPsHyperlinkAnchor = {
    route: 'change-security-questions',
    labelKey: 'reset_security_question_key',
    titleOptions: {
      labelKey: 'reset_security_question_key',
      psClass: 'ps-anchor-title',
    },
    descriptionOptions: {
      labelKey: 'change_your_security_quest_key',
      psClass: 'ps-anchor-description',
    },
    iconOptions: {
      iconName: 'pencil',
    },
    pageOptions: {
      iconName: 'pencil',
      title: 'reset_security_question_key',
      operId: CommonBussinessConstant.RESET_SEC_QUESTION_OPER,
    }
  };
  contactUsOptions: IOptionsPsHyperlinkAnchor = {
    route: 'contact',
    labelKey: 'notification_contact_key',
    titleOptions: {
      labelKey: 'notification_contact_key',
      psClass: 'ps-anchor-title',
    },
    descriptionOptions: {
      labelKey: 'notif_email_and_phone_key',
      psClass: 'ps-anchor-description',
    },
    iconOptions: {
      iconName: 'mail',
    },
    pageOptions: {
      iconName: 'mail',
      title: 'notification_contact_key',
      operId: CommonBussinessConstant.CONTACT_DETAILS_OPER_ID
    }
  };

  personalDetailsOptions: IOptionsPsHyperlinkAnchor = {
    route: 'personal-details',
    labelKey: 'personal_information_key',
    titleOptions: {
      labelKey: 'personal_information_key',
      psClass: 'ps-anchor-title',
    },
    descriptionOptions: {
      labelKey: 'cif_addr_and_empl_details_key',
      psClass: 'ps-anchor-description',
    },
    iconOptions: {
      iconName: 'contact',
    },
    pageOptions: {
      iconName: 'contact',
      title: 'personal_information_key',
      operId: CommonBussinessConstant.PERSONAL_DETAILS_OPER_ID
    }
  };

  activityLogOptions: IOptionsPsHyperlinkAnchor = {
    route: 'activity-log-report',
    labelKey: 'my_activity_log_key',
    titleOptions: {
      labelKey: 'my_activity_log_key',
      psClass: 'ps-anchor-title',
    },
    descriptionOptions: {
      labelKey: 'cif_activity_log_key',
      psClass: 'ps-anchor-description',
    },
    iconOptions: {
      iconName: 'activity-log',
    },
    pageOptions: {
      iconName: 'activity-log',
      title: 'activity_log_key',
      operId: CommonBussinessConstant.ACTIVITY_LOG_OPER_ID
    },
    navigationOptions: {
      queryParams: {
        filterSessionId: this.commonService.session.getValueOf(ConstantCommon.SESSION_ID),
        userId: this.commonService.session.getValueOf(ConstantCommon.USERINFO).ocUserId
      }
    }

  };

  cifNameOptions: IOptionsPsLabel = {
  };
  userNameOptions: IOptionsPsLabel = {
    previewMode: true
  };
  imageUploadOptions: IOptionsPsInlineLabeledCamera = {
    fcName: 'profilePicture',
    group: this.formGroup,
    actionImageOptions: {
      imageName: CommonBussinessConstant.DEFAULT_IMAGE
    }
  };



  userProfileImage: string;
  constructor(
    public commonService: PsCommonService,
    public logger: LoggerService,
    private router: Router,
    private omniPull: OmniPullService) {
    super();
  }
  ngOnInit() {
    super.init();
    PsCommonSettings.oper_ID = CommonBussinessConstant.PROFILE_IMAGE_OPER_ID;
    this.userInformation = this.commonService.session.getValueOf(ConstantCommon.USERINFO);
    if (this.userInformation.profileImage) {
      this.imageUploadOptions.actionImageOptions.imageBase64Url = this.userInformation.profileImage;
      this.imageUploadOptions.actionImageOptions.imageName = '';
    }
    this.cifNameOptions.labelKey = this.userInformation.customerInfoCO.longName;
    this.userNameOptions.labelKey = this.userInformation.omniUserVO.NAME;
    this.commonService.logger.log('userinfo:', this.userInformation);
    this.omniPull.getParamValOf('EnableSecurityQuestion', 'RequireTransactionPassword').then(res => {
      this.EnableSecurityQuestion = res.EnableSecurityQuestion;
      this.EnablePin = res.RequireTransactionPassword;
    }).catch(err => this.logger.log(err));
  }
}
