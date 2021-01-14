import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPinConfirmExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-password-confirm/ps-confirm-pin/ps-confirm-pin.component.interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { IOptionsPsContainerPanel, IOptionsPsTemplateForm } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { OmniBasePage } from '../omni-base/omni-base.page';
import { IChangePinVO } from './../../commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { ConstantCommon } from './../../commonSRC/psServices/models/common-constant';
import { IOptionsPsInputPassword } from './../../commonSRC/psServices/models/ps-common-interface';

@Component({
  selector: 'change-pin',
  templateUrl: './change-pin.page.html',
  styleUrls: ['./change-pin.page.scss'],
})
export class ChangePinPage extends OmniBasePage implements OnInit {

  constructor(public commonProv: PsCommonService) {
    super();
  }
  private formGroup = new FormGroup({});
  changePinVO: IChangePinVO = {};
  public options: IOptionsPsTemplateForm = {
    group: this.formGroup,
    submitOptions: {
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.changePin,
      group: this.formGroup,
    },
    requestObject: this.changePinVO
  };

  pinConfirmOptions: IOptionsPinConfirmExposed = {
    group: this.formGroup,
    password: {
      labelKey: 'pin_key',
      placeHolder: 'pin_key',
      fcName: 'newPin',
      group: this.formGroup,
    },
    confirmPassword: {
      labelKey: 'confirm_pin_key',
      placeHolder: 'confirm_pin_key',
      fcName: 'confNewPin',
      group: this.formGroup,
    },
    requestObject: this.changePinVO
  };

  optionsPassword: IOptionsPsInputPassword = {
    fcName: 'oldPin',
    group: this.formGroup,
    labelKey: 'old_pin_key',
    placeHolder: 'old_pin_key'
  };
  public panelChangePinOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'change_pin_key',
    expanded: true
  };

  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;

  }
  ionViewDidEnter() {
    super.ionViewDidEnter();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [
      this.optionsPassword.fcName, this.pinConfirmOptions.password.fcName, this.pinConfirmOptions.confirmPassword.fcName
    ], 1);
  }
}
