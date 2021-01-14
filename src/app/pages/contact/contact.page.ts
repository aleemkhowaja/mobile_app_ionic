import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsEntityPhoneNumberExposed } from 'src/app/commonBussinessSRC/psComponents/ps-field-entity/ps-entity-phone-number/ps-entity-phone-number.component.interfaces';
import { IOptionsPsInputVarcharExposed } from 'src/app/commonBussinessSRC/psComponents/ps-keyin-input/ps-input-varchar/ps-input-varchar.component.interfaces';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { ILoginResponse } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsPsContainerPanel, IOptionsTemplateStepper } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { OmniBasePage } from '../omni-base/omni-base.page';


@Component({
  selector: 'contact-us',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage extends OmniBasePage implements OnInit {
  public formGroup: FormGroup = new FormGroup({});
  public contactDetailsVO = {};

  public panelNotificationContactOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'notification_contact_key',
    expanded: true
  };

  public emailNotificationOptions: IOptionsPsInputVarcharExposed = {
    labelKey: 'email_key',
    placeHolder: 'email_key',
    fcName: 'email',
    group: this.formGroup
  };

  public phoneNumberNotificationOptions: IOptionsPsEntityPhoneNumberExposed = {
    fcName: 'mobileNumber',
    group: this.formGroup
  };

  cifInfo: any;

  stepperOptions: IOptionsTemplateStepper = {
    stepperName: 'notification_contact_key',
    isHorizontalStepper: true,
    numberOfSteps: 1,
    namesofSteps: [
      'contact_details_step1',
    ],
    group: this.formGroup,
    submitOptions: {
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.updateProfileSettingsEndPoint,
      group: this.formGroup,
    },
    requestObject: this.contactDetailsVO,
  };

  constructor(public commonService: PsCommonService, public logger: LoggerService, private navService: PsNavigatorService) {
    super();
  }

  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
    PsCommonSettings.oper_ID = CommonBussinessConstant.CONTACT_DETAILS_OPER_ID;
    if (CommonUtils.isEmptyObject(this.navService.getAllParams())) {
      this.cifInfo = this.commonProv.session.getValueOf(ConstantCommon.USERINFO);
      const userInformation: ILoginResponse = this.commonService.session.getValueOf(ConstantCommon.USERINFO);
      if (userInformation.subscriberInfo) {
        this.contactDetailsVO[this.emailNotificationOptions.fcName] = userInformation.subscriberInfo.emailsList ? userInformation.subscriberInfo.emailsList[0] : '';
        this.contactDetailsVO[this.phoneNumberNotificationOptions.fcName] = userInformation.subscriberInfo.phonesList ? userInformation.subscriberInfo.phonesList[0] : '';
      }
      this.commonProv.setFormData(this.formGroup, this.contactDetailsVO);
    } else {
      this.contactDetailsVO = this.navService.getAllParams() ? this.navService.getAllParams() : {};
    }

  }

  private updateContactInfo(response) {
    if (response.outputCode == 0 || response.outputType === 'S') {
      CommonUtils.presentSuccessAlert(this.commonService.translate('notification_updated_successf_key'), { autoHide: true });
    } else {
      CommonUtils.presentFailureAlert(response.outputNotification, { autoHide: false });
    }
  }

}
