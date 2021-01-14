import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPinConfirmExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-password-confirm/ps-confirm-pin/ps-confirm-pin.component.interfaces';
import { IOptionsPsOptionCardExposed } from 'src/app/commonBussinessSRC/psComponents/ps-container-lookup-option/ps-option-card/ps-option-card.component.interface';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { IOptionsPsTemplateForm, IOptionsPsContainerPanel } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { OmniBasePage } from '../omni-base/omni-base.page';
import { CardManagementVO, IChangePinVO } from './../../commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { ConstantCommon } from './../../commonSRC/psServices/models/common-constant';
import { IOptionsPsInputPassword } from './../../commonSRC/psServices/models/ps-common-interface';


@Component({
  selector: 'card-pin-request',
  templateUrl: './card-pin-request.page.html',
  styleUrls: ['./card-pin-request.page.scss'],
})
export class ChangePinPage extends OmniBasePage implements OnInit {

  CardManagementVO: CardManagementVO = {};
  debitCardOptions: IOptionsPsOptionCardExposed = {};
  change = true;

  constructor(public commonProv: PsCommonService, private navService: PsNavigatorService) {
    super();
  }
  private formGroup = new FormGroup({});
  changePinVO: IChangePinVO = {};
  public options: IOptionsPsTemplateForm = {
    group: this.formGroup,
    submitOptions: {
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.cardActionRequestEndPoint,
      group: this.formGroup,
    },
    requestObject: this.CardManagementVO
  };

  panelOptions1: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'card_information_key',
    iconName: 'document',
    expanded: true
  };

  panelOptions2: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'card_request_key',
    iconName: 'document',
    expanded: true
  };

  pinConfirmOptions: IOptionsPinConfirmExposed = {
    group: this.formGroup,
    password: {
      labelKey: 'new_pin_key',
      placeHolder: 'new_pin_key',
      fcName: 'newPin',
      group: this.formGroup,
      mask: {
        mask: '999999'
      }
    },
    confirmPassword: {
      labelKey: 'confirm_new_pin_key',
      placeHolder: 'confirm_new_pin_key',
      fcName: 'confNewPin',
      group: this.formGroup,
      mask: {
        mask: '999999'
      }
    },
    requestObject: this.CardManagementVO
  };

  optionsPassword: IOptionsPsInputPassword = {
    fcName: 'oldPin',
    group: this.formGroup,
    labelKey: 'old_pin_key',
    placeHolder: 'old_pin_key',
    mask: {
      mask: '999999'
    }
  };

  ngOnInit() {
    super.init();
    this.debitCardOptions.isEditable = true;
    this.baseFormGroup = this.formGroup;
    this.CardManagementVO = this.navService.getAllParams() ? this.navService.getAllParams().ScreenVO ? this.navService.getAllParams().ScreenVO : this.navService.getAllParams() : {};
    this.commonProv.copyObject(this.options.requestObject, this.CardManagementVO, true, false);
    this.debitCardOptions.listOfOptions = [];
    this.debitCardOptions.itemList = [];
    this.debitCardOptions.listOfOptions[0] = this.CardManagementVO;
    this.debitCardOptions.itemList[0] = this.CardManagementVO;
    this.debitCardOptions.cardAction = true;
    delete this.options.requestObject.key;
    if (this.CardManagementVO.action === CommonBussinessConstant.CARD_ACTION_TYPE_PIN_CHANGE) {
      this.change = true;
    } else if (this.CardManagementVO.action === CommonBussinessConstant.CARD_ACTION_TYPE_PIN_RESET) {
      this.change = false;
    }
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [
      this.optionsPassword.fcName, this.pinConfirmOptions.password.fcName, this.pinConfirmOptions.confirmPassword.fcName
    ], 1);
  }

}
