import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsEntityPhoneNumberExposed } from 'src/app/commonBussinessSRC/psComponents/ps-field-entity/ps-entity-phone-number/ps-entity-phone-number.component.interfaces';
import { IOptionsPsInputEmailExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-email/ps-input.email.component.interface';
import { IOptionsPsInputFreeTextExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-free-text/ps-input-free-text.component.interfaces';
import { IOptionsPsLovPreferredLanguageExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-preferred-language/ps-lov-preferred-language.component.interfaces';
import { IOptionsPsDropdownSubProfileExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-sub-profile/ps-dropdown-sub-profile.component.interfaces';
import { RegisterAdminUserVO } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsPsContainerPanel, IOptionsPsInputUserNameExposed, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { OmniBasePage } from '../omni-base/omni-base.page';

@Component({
  selector: 'register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage extends OmniBasePage implements OnInit {
  RegisterAdminUserVO: RegisterAdminUserVO = {};
  isEditState = false;

  constructor(
    private navService: PsNavigatorService,
    public commonProvider: PsCommonService) {
    super();
  }

  private formGroup = new FormGroup({});
  public options: IOptionsTemplateStepper = {
    stepperName: 'corporate_user_register_stepper',
    numberOfSteps: 1,
    group: this.formGroup,
    submitOptions: {
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.registerUser,
      group: this.formGroup,
      postCallFunction: {
        func(response) {
          return new Promise<any>((resolve, reject) => {
            resolve(this.executionClass.updateRegisterUserFunction(response));
          });
        },
        params: [this],
        executionClass: this
      },
    },
    requestObject: this.RegisterAdminUserVO,
    isHorizontalStepper: true,
    namesofSteps: ['registerUser']
  };


  public userId: IOptionsPsInputUserNameExposed = {
    group: this.formGroup,
    fcName: 'newUserName',
    placeHolder: 'user_name_key',
    labelKey: 'user_name_key'
  };

  public username: IOptionsPsInputFreeTextExposed = {
    group: this.formGroup,
    fcName: 'newName',
    placeHolder: 'name_key',
    labelKey: 'name_key',
    iconOptions: {
      iconName: 'user'
    }
  };

  public phoneOptions: IOptionsPsEntityPhoneNumberExposed = {
    group: this.formGroup,
    fcName: 'mobileNumber',
    labelKey: 'phone_number_key',
  };

  public alertLanguage: IOptionsPsLovPreferredLanguageExposed = {
    group: this.formGroup,
    fcName: 'alertLanguage',
    labelKey: 'alert_language_key',
    placeHolder: 'alert_language_key',
    // iconOptions: {
    //   iconName: 'document'
    // }
  };

  public userEmail: IOptionsPsInputEmailExposed = {
    group: this.formGroup,
    fcName: 'email',
    labelKey: 'email_key',
    iconName: 'mail',
    placeHolder: 'email_key'
  };

  public subProfile: IOptionsPsDropdownSubProfileExposed = {
    group: this.formGroup,
    fcName: 'subProfile',
    labelKey: 'sub_profile_key',
    placeHolder: 'user_sub_profile_key',
    iconOptions: {
      iconName: 'document'
    }
  };

  panelOptions1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'user_registration_key',
    iconName: 'document',
    expanded: true
  };

  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
    if (JSON.stringify(this.navService.getAllParams()) !== '{}') {
      this.RegisterAdminUserVO = this.navService.getAllParams() ? this.navService.getAllParams() : {};
      this.commonProv.copyObject(this.options.requestObject, this.RegisterAdminUserVO, true, false);
      this.isEditState = true;
    }
  }

  ionViewDidEnter() {
    super.ionViewDidEnter();
    if (this.isEditState) {
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_READONLY, [this.userId.fcName], 1);
    }
  }

  private updateRegisterUserFunction(response) {
    if (response.outputCode === 0 || response.outputType === 'S') {
      this.navService.pop();
    } else {
      CommonUtils.presentFailureAlert(response.outputNotification, { autoHide: true });
    }
  }

}
