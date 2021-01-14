import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues, IOptionsPsSelectDropdown } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsSelectDropdownComponent } from '../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-field-select/ps-select-dropdown/ps-select-dropdown.component';
import { IOptionsPsDropdownSecurityQuestionExposed } from './ps-dropdown-security-question.component.interfaces';

/**
 * @author Zunair.Zakir
 * @since 26/10/2019
 *
 * <p> PsDropdownSecurityQuestionComponent is a simple component base on ps-select-dropdown </p>
 */
@Component({
  selector: 'ps-dropdown-security-question',
  templateUrl: './ps-dropdown-security-question.component.html',
  styleUrls: ['./ps-dropdown-security-question.component.scss'],
})
export class PsDropdownSecurityQuestionComponent extends PsSelectDropdownComponent implements OnInit {
  @Input() options: IOptionsPsDropdownSecurityQuestionExposed;

  securityQuestionOptions: IOptionsPsSelectDropdown;

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService,
    private omniPull?: OmniPullService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.securityQuestionOptions = {
      labelKey: 'security_question_key',
      placeHolder: 'select_security_question_key',
      fcName: this.options.fcName,
      group: this.options.group,
      iconOptions: {
        iconName: 'lock-closed'
      },
      listOfOptions:[]
    };
    this.loadSecurityQuestions();
  }

  onChangeSecurityQuestion(value: IchangeValues) {
    this.onPsChange.emit(value);
  }

  private async loadSecurityQuestions() {

    const result = await this.omniPull.returnSecurityQuestion({ nbRec: -1, status: CommonBussinessConstant.STATUS_APPROVED }).catch(error => {
      this.logger.error('Error! while fetching security quetions in PsDropdownSecurityQuestionComponent :', error);
    });

    if (result && result.gridModel) {
      for (const iterator of result.gridModel) {
        const securityQuestion = {
          itemValue: iterator.securityQuestionVO.SECURITY_ID,
          description: iterator.securityQuestionVO.DESCRIPTION,
          selectedObj: iterator
        };
        this.securityQuestionOptions.listOfOptions.push(securityQuestion);
      }
    }
  }// end of loadSecurityQuestions()

}
