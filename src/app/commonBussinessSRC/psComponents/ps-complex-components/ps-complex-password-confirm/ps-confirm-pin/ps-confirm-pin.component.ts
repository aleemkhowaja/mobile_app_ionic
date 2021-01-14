import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsComplexPasswordConfirmComponent } from '../ps-complex-password-confirm.component';
import { IOptionsPasswordConfirmExposed } from '../ps-complex-password-confirm.component.interfaces';
import { IOptionsPinConfirmExposed } from './ps-confirm-pin.component.interfaces';

/**
 * @author Zunair.Zakir
 * @since 06/11/2019
 *
 * <p> PsComplexPinConfirmComponent is a complex component base on ps-input-password component</p>
 */
@Component({
  selector: 'ps-confirm-pin',
  templateUrl: './ps-confirm-pin.component.html',
  styleUrls: ['./ps-confirm-pin.component.scss'],
})
export class PsComplexPinConfirmComponent extends PsComplexPasswordConfirmComponent implements OnInit {
  @Input() public options: IOptionsPinConfirmExposed;
  @Output() public onPinChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onConfirmPinChange: EventEmitter<any> = new EventEmitter<any>();

  newPin: string = null;
  confirmedNewPin: string = null;
  isRequireTransactionPassword: boolean;
  public defaultOptions: IOptionsPasswordConfirmExposed = {
    password: {
      labelKey: 'pin_key',
      placeHolder: 'enter_pin_key',
    },
    confirmPassword: {
      labelKey: 'confirm_pin_key',
      placeHolder: 'enter_confirm_pin_key',
    }
  };
  constructor(public commonProv: PsCommonService, public loggerP: LoggerService, private omniPull: OmniPullService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
    super.init();
    this.isRequireTransactionPassword = false;
    this.commonProv.copyObject(this.defaultOptions, this.options,  false);
    this.omniPull.getParamValOf('RequireTransactionPassword').then(res => {
      this.isRequireTransactionPassword = res.RequireTransactionPassword;
    }).catch(err => this.logger.log(err));
  }


  onChangePin(values: IchangeValues) {
    this.onPinChange.emit(values);
  }
  onChangeConfirmPin(values: IchangeValues) {
    this.onConfirmPinChange.emit(values);
  }
}
