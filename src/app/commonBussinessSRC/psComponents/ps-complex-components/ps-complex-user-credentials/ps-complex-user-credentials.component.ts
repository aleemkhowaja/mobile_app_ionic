import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';

import { PsBaseFieldComponent } from '../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from '../../../../commonSRC/psServices/logger/logger.service';
import { PsCommonService } from '../../../../commonSRC/psServices/ps-common/ps-common.service';
import { ConstantCommon } from './../../../../commonSRC/psServices/models/common-constant';
import { OmniPullService } from './../../../psServices/omni-common/omni-pull.service';
import { IOptionsPsComplexUserCredentialExposed } from './ps-complex-user-credentials.component.interfaces';

/**
 * @author Zunair.Zakir
 * @since 29/10/2019
 *
 * <p> PsComplexUserCredentialsComponent is a complex component base on several complex and simple components</p>
 */
@Component({
  selector: 'ps-complex-user-credentials',
  templateUrl: './ps-complex-user-credentials.component.html',
  styleUrls: ['./ps-complex-user-credentials.component.scss'],
})
export class PsComplexUserCredentialsComponent extends PsBaseFieldComponent implements OnInit {

  @Input() public options: IOptionsPsComplexUserCredentialExposed;
  @Output() public onSecurityQuestionChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onSecurityAnswerChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onComplexPasswordChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onComplexConfirmPasswordChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onComplexPinChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onComplexConfirmPinChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onUsernameChange: EventEmitter<any> = new EventEmitter<any>();
  componentVO = {};

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService,private omniPull: OmniPullService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    this.componentVO = this.omniPull.omniCommon.common.returnFormVO(this.options.group);
  }

  onChangeUsername(value: IchangeValues) {
    this.options.group.controls[this.options.passwordConfirmOptions.password.fcName].reset();
    this.options.group.controls[this.options.passwordConfirmOptions.confirmPassword.fcName].reset();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.options.passwordConfirmOptions.password.fcName], 1);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.options.passwordConfirmOptions.confirmPassword.fcName], 1);
    this.omniPull.getParamValOf('PassNotSimilarToUserName').then(result => {
      if(result && result['PassNotSimilarToUserName']){
        this.options.passwordConfirmOptions.allowUserSimilarToPassword = result['PassNotSimilarToUserName'];
        this.options.passwordConfirmOptions.username = value.newValue;
      }
    }).catch(error => this.logger.log(error));
    this.onUsernameChange.emit(value);
  }

  onEmptyUsername() {
    this.options.group.controls[this.options.passwordConfirmOptions.password.fcName].reset();
    this.options.group.controls[this.options.passwordConfirmOptions.confirmPassword.fcName].reset();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.options.passwordConfirmOptions.password.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.options.passwordConfirmOptions.confirmPassword.fcName], 0);
  }

  onChangeComplexNewPassword(value: IchangeValues) {
      this.onComplexPasswordChange.emit(value);
  }
  onChangeComplexConfirmPassword(value: IchangeValues) {
    this.onComplexConfirmPasswordChange.emit(value);
  }
  onChangeComplexNewPin(value: IchangeValues) {
    this.onComplexPinChange.emit(value);
  }
  onChangeComplexConfirmPin(value: IchangeValues) {
    this.onComplexConfirmPinChange.emit(value);
  }

  onChangeSecurityQuestion(value: IchangeValues) {
    this.onSecurityQuestionChange.emit(value);
  }
  onChangeSecurityAnswer(value: IchangeValues) {
    this.onSecurityAnswerChange.emit(value);
  }


}
