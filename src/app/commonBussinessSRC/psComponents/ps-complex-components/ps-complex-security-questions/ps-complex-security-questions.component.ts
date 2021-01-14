import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';

import { LoggerService } from '../../../../commonSRC/psServices/logger/logger.service';
import { IchangeValues } from '../../../../commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsComplexSecurityQuestionExposed } from './ps-complex-security-questions.component.interfaces';

/**
 * @author Zunair.Zakir
 * @since 27/10/2019
 *
 * <p> PsComplexSecurityQuestionComponent is a complex component base on ps-dropdown-security-question component</p>
 */
@Component({
  selector: 'ps-complex-security-questions',
  templateUrl: './ps-complex-security-questions.component.html',
  styleUrls: ['./ps-complex-security-questions.component.scss'],
})
export class PsComplexSecurityQuestionComponent extends PsBaseFieldComponent implements OnInit {
  @Input() public options: IOptionsPsComplexSecurityQuestionExposed;
  @Output() public onSecurityQuestionChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onAnswerChange: EventEmitter<any> = new EventEmitter<any>();
  EnableSecurityQuestion: boolean;

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService, private omniPull: OmniPullService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    super.init();
    if (this.options && this.options.securityAnswerOptions) {
      this.options.securityAnswerOptions.iconOptions = {
        iconName: 'key1',
      };
    }
    this.omniPull.getParamValOf('EnableSecurityQuestion').then(res => {
      this.EnableSecurityQuestion = res.EnableSecurityQuestion;
    }).catch(err => this.logger.log(err));
  }

  onChangeSecurityQuestion(value: IchangeValues) {
    this.onSecurityQuestionChange.emit(value);
  }
  onChangeAnwer(value: IchangeValues) {
    this.onAnswerChange.emit(value);
  }

}
