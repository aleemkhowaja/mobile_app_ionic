import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPasswordConfirmExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-password-confirm/ps-complex-password-confirm.component.interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IOptionsPsContainerPanel, IOptionsPsTemplateForm } from 'src/app/commonSRC/psServices/models/ps-common-interface';

import { OmniBasePage } from '../omni-base/omni-base.page';
import { OmniPullService } from './../../commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { IOptionsPsInputPassword } from './../../commonSRC/psServices/models/ps-common-interface';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.page.html',
  styleUrls: ['./change-pass.page.scss'],
})
export class ChangePassPage extends OmniBasePage implements OnInit {

  constructor(private omniPull: OmniPullService) { super(); }

  public formGroup: FormGroup = new FormGroup({});
  public passwordChangeVO = {};

  public options: IOptionsPsTemplateForm = {
    group: this.formGroup,
    submitOptions: {
      extraParams: {
        actionType: 'C'
      },
      group: this.formGroup,
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.changePass
    }
  };

  public panelChangePasswordOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'change_password_key',
    expanded: true
  };


  confirmPasswordOptions: IOptionsPasswordConfirmExposed = {
    group: this.formGroup,
    password: {
      labelKey: 'new_password_key',
      placeHolder: 'enter_new_password_key',
      fcName: 'newPassword',
      group: this.formGroup,
    },
    confirmPassword: {
      labelKey: 'confirm_password_key',
      placeHolder: 'confirm_new_password_key',
      fcName: 'confNewPassword',
      group: this.formGroup,
    },
    requestObject: this.passwordChangeVO
  };

  optionsPassword: IOptionsPsInputPassword = {
    labelKey: 'old_password_key',
    placeHolder: 'old_password_key',
    fcName: 'oldPassword',
    group: this.formGroup,
  };

  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
    this.omniPull.getParamValOf('PassNotSimilarToUserName').then(result => {
      if (result && result.PassNotSimilarToUserName) {
        this.confirmPasswordOptions.allowUserSimilarToPassword = result.PassNotSimilarToUserName;
      }
    }).catch(error => this.omniPull.omniCommon.common.logger.log(error));

  
    this.commonProv.setFormData(this.formGroup, this.passwordChangeVO);
  }

  ionViewDidEnter() {
    super.ionViewDidEnter();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [
      this.optionsPassword.fcName, this.confirmPasswordOptions.password.fcName, this.confirmPasswordOptions.confirmPassword.fcName
    ], 1);
  }
}
