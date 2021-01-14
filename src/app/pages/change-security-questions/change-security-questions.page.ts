import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsComplexSecurityQuestionExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-security-questions/ps-complex-security-questions.component.interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues, IOptionsPsContainerPanel, IOptionsPsTemplateForm } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';

import { CommonBussinessConstant } from '../../commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { ConstantCommon } from '../../commonSRC/psServices/models/common-constant';
import { PsCommonService } from '../../commonSRC/psServices/ps-common/ps-common.service';
import { OmniBasePage } from '../omni-base/omni-base.page';
import { ILoginResponse } from '../omni-login/omni-login.interfaces';


@Component({
  selector: 'app-change-security-questions',
  templateUrl: './change-security-questions.page.html',
  styleUrls: ['./change-security-questions.page.scss'],
})
export class ChangeSecurityQuestionsPage extends OmniBasePage implements OnInit {

  public formGroup: FormGroup = new FormGroup({});
  public securityVO: any = {};
  userInformation: ILoginResponse;


  securityQueOptions: IOptionsPsComplexSecurityQuestionExposed = {
    group: this.formGroup,
    securityQuestionOptions: {
      fcName: 'SECURITY_ID',
      group: this.formGroup,
    },
    securityAnswerOptions: {
      labelKey: 'security_answer_key',
      placeHolder: 'enter_your_security_answer_key',
      fcName: 'SEC_ANSWER',
      group: this.formGroup,
      iconOptions: {
        iconName: 'create',
      }
    }
  };
  public panelChangeSecurityQuestionsOptions: IOptionsPsContainerPanel = {
    isExpandable: true,
    labelKey: 'reset_security_question_key',
    expanded: true
  };
  

  public options: IOptionsPsTemplateForm = {
    group: this.formGroup,
    submitOptions: {
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.changeSecurityQuestion,
      group: this.formGroup,
    }
  };

  constructor(public commonService: PsCommonService, public logger: LoggerService) {
    super();
  }

  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
    const userInformation: ILoginResponse = this.commonService.session.getValueOf(ConstantCommon.USERINFO);
    this.logger.log('securityuser infomation', userInformation);
    PsCommonSettings.oper_ID = CommonBussinessConstant.RESET_SEC_QUESTION_OPER;
    PsCommonSettings.pageName = CommonBussinessConstant.RESET_SEC_QUESTION_TITLE;
    if (userInformation.omniUserVO.SECURITY_ID) {
      this.securityVO = userInformation.omniUserVO;
    }
    this.commonProv.setFormData(this.formGroup, this.securityVO); 
  }
  onSecurityQuestionChange(value: IchangeValues) {
    this.securityQueOptions.securityAnswerOptions.group.controls[this.securityQueOptions.securityAnswerOptions.fcName].reset();
  }
  onAnswerChange(value: IchangeValues) {
    // console.log('onAnswerChange:' + value.newValue);
  }


}
