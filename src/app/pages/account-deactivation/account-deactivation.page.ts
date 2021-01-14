import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsDropdownAccountDeactivationnExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-reasons/ps-dropdown-reasons.component.interface';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsPsActionImage, IOptionsPsContainerPanel, IOptionsPsKeyinTextarea, IOptionsPsLabel, IOptionsPsTemplateForm } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';

import { PsCommonService } from '../../commonSRC/psServices/ps-common/ps-common.service';
import { OmniBasePage } from '../omni-base/omni-base.page';

@Component({
  selector: 'app-account-deactivation',
  templateUrl: './account-deactivation.page.html',
  styleUrls: ['./account-deactivation.page.scss'],
})
export class AccountDeactivationPage extends OmniBasePage implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  accountDeactivationForm: FormGroup = new FormGroup({});
  public parameters;
  othersChoosed = false;
  selectReasonDropDwnOptions: IOptionsPsDropdownAccountDeactivationnExposed = {
    labelKey: 'deactivation_reason_key',
    placeHolder: 'select_a_deactivation_reason_key',
    fcName: 'accountDeactivationReason',
    group: this.accountDeactivationForm,
  };
  inputOptions: IOptionsPsKeyinTextarea = {
    labelKey: 'comments_key',
    rows: '3',
    cols: '10',
    fcName: 'accountDeactivationReasonDetail',
    group: this.formGroup
  };
  actionImageOptions: IOptionsPsActionImage = {
    imageName: 'account_Deactivation_Remark_icon.png',
  };
  warningMsgLabelOptions: IOptionsPsLabel = {
    labelKey: 'deact_account_subsc_msg_key'
  };

  public options: IOptionsPsTemplateForm = {
    group: this.accountDeactivationForm,
    submitOptions: {
      extraParams: {},
      group: this.accountDeactivationForm,
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.accountDeactivation,
      postCallFunction: {
        func(response) {
          return new Promise<any>((resolve, reject) => {
            resolve(this.executionClass.deactivationConfirmation());
          });
        },
        params: [this],
        executionClass: this
      },
    }
  };

  public panelAccountDeactivationOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'account_deactivation_key',
    expanded: true
  };

  deactivationReasonValue: string = null;
  otherReasonValue: string = null;
  constructor(public commonProv: PsCommonService, public loggerP: LoggerService, private omniPull: OmniPullService, private navService: PsNavigatorService) {
    super();
  }



  ngOnInit() {
    super.init();
    PsCommonSettings.oper_ID = CommonBussinessConstant.ACCOUNT_DEACTIVATION_OPER;
    this.baseFormGroup = this.formGroup;
  }

  ionViewDidEnter() {
    super.ionViewDidEnter();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [
      this.selectReasonDropDwnOptions.fcName], 1);
  }
  onChangeReason(values: any) {

  }
  deactivationConfirmation(){
    CommonUtils.presentInfoAlert('are_you_sure_?_key', {
      buttonsArray: [{
        group: this.formGroup,
        labelKey: 'ok_key',
        handler: () => {
          this.commonProv.presentLoading();
          CommonUtils.dismissAllModals().then(() => {
            this.omniPull.omniCommon.logout(3).then(() => {
              this.commonProv.dismissLoading();
            });
          });
        }
      },  {
        group: this.options.group,
        type: 'reset',
        labelKey: 'cancel_key',
        handler: () => {
          CommonUtils.dismissAllModals();
         
        }
      },]
    });
  }
  logOut(deactivationResponse) {
    CommonUtils.presentInfoAlert(deactivationResponse.outputNotification, {
      buttonsArray: [{
        group: this.formGroup,
        labelKey: 'ok_key',
        handler: () => {
          this.commonProv.presentLoading();
          CommonUtils.dismissAllModals().then(() => {
            this.omniPull.omniCommon.logout(3).then(() => {
              this.commonProv.dismissLoading();
            });
          });
        }
      }]
    });
    //  CommonUtils.presentSuccessAlert(loginResponse.result.outputNotification, { autoHide: true });

  }

}
