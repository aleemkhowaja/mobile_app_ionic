import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { PsInputPasswordComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-keyin/ps-keyin-input/ps-input-password/ps-input-password.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPasswordConfirmExposed } from './ps-complex-password-confirm.component.interfaces';


/**
 * @author Zunair.Zakir
 * @since 27/10/2019
 *
 * <p> PsComplexPasswordConfirmComponent is a complex component base on ps-input-password component</p>
 */
@Component({
  selector: 'ps-complex-password-confirm',
  templateUrl: './ps-complex-password-confirm.component.html',
  styleUrls: ['./ps-complex-password-confirm.component.scss'],
})
export class PsComplexPasswordConfirmComponent extends PsBaseFieldComponent implements OnInit {
  @Input() public options: IOptionsPasswordConfirmExposed;
  @Output() public onPasswordChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onConfirmPasswordChange: EventEmitter<any> = new EventEmitter<any>();


  @ViewChild('passwordRef', { static: false }) passwordRef: PsInputPasswordComponent;
  @ViewChild('confirmPasswordRef', { static: false }) confirmPasswordRef: PsInputPasswordComponent;

  newPassword: string = null;
  confirmedNewPassword: string = null;
  errorMsg: string;
  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() { }
  onChangePassword(values: IchangeValues) {
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.options.confirmPassword.fcName], 1);
    this.newPassword = values.newValue;
    if (this.options.allowUserSimilarToPassword) {
      if (this.options.username && this.newPassword === this.options.username) {
        //  this.commonProv.presentAlert(this.commonProv.translate('WARNING_KEY'),this.commonProv.translate('YOU_CANNOT_SET_A_PASSWORD_SIMILAR_TO_THE_USERNAME_KEY'));
        this.options.group.controls[this.options.password.fcName].setErrors({ warning: this.commonProv.translate('YOU_CANNOT_SET_A_PASSWORD_SIMILAR_TO_THE_USERNAME_KEY') });
        super.checkValidationErrors();
        this.passwordRef.superWriteValue('');
      } else {
        this.commonProv.session.getStoredValueOf(ConstantCommon.USER_NAME).then(result => {
          if (result && result === values.newValue) {
            // this.commonProv.presentAlert(this.commonProv.translate('WARNING_KEY'),this.commonProv.translate('YOU_CANNOT_SET_A_PASSWORD_SIMILAR_TO_THE_USERNAME_KEY'));
            this.options.group.controls[this.options.password.fcName].setErrors({ warning: this.commonProv.translate('YOU_CANNOT_SET_A_PASSWORD_SIMILAR_TO_THE_USERNAME_KEY') });
            super.checkValidationErrors();
            this.passwordRef.superWriteValue('');
          }
        });
      }
    }
    this.confirmPasswordRef.superWriteValue('');
    this.confirmedNewPassword = null;
    this.onPasswordChange.emit(values);
  }
  onChangeConfirmPassword(values: IchangeValues) {
    this.errorMsg = '';
    this.confirmedNewPassword = values.newValue;
    if (this.newPassword !== null && this.confirmedNewPassword !== null && this.newPassword !== this.confirmedNewPassword) {
      //this.presentAlert('error_key', 'icon icon-danger', this.commonProv.translate(this.options.password.labelKey) + '_do_not_match_key');
      this.options.confirmPassword.group.controls[this.options.confirmPassword.fcName].setErrors({ customErrorKey: this.commonProv.translate(this.options.password.labelKey) + ' ' + this.commonProv.translate('do_not_match_key') });

      this.errorMsg = this.commonProv.translate(this.options.password.labelKey) + ' ' + this.commonProv.translate('do_not_match_key');
      super.checkValidationErrors();
      this.commonProv.setValInsideNestedObj(this.options.confirmPassword.fcName, null, this.options.requestObject);
      // this.confirmedNewPassword = null;
    }
    this.onConfirmPasswordChange.emit(values);
  }

  onfieldEmpty(fieldType: 'pass' | 'conf') {
    fieldType === 'pass' ? this.newPassword = null : this.confirmedNewPassword = null;
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.options.confirmPassword.fcName], 0);
  }

  // Commented by Richie for TP# 1105083 : function is not used anymore and it is generating error (arg type mismatch)
  // public presentAlert(title, css, message) {
  //   const okBtn = this.commonProv.translate('ok_key');
  //   const alertOption: PSAlertOptions = {
  //     title: this.commonProv.translate(title),
  //     cssClass: css,
  //     message: this.commonProv.translate(message),
  //     buttons: [
  //       {
  //         text: this.commonProv.translate('okay_key'), role: 'cancel', cssClass: 'button-primary'
  //       }
  //     ]
  //   };
  //   this.commonProv.presentAlert(alertOption.title, alertOption.message, [okBtn]);
  // }
  // End Richie

}
