import { IchangeValues } from '../../../../commonSRC/psServices/models/ps-common-interface';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsComplexBankAuthenticationExposed } from './ps-complex-bank-authentication.component.interface';
import { PsBaseFieldComponent } from '../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';

@Component({
  selector: 'ps-complex-bank-authentication',
  templateUrl: './ps-complex-bank-authentication.component.html',
  styleUrls: ['./ps-complex-bank-authentication.component.scss'],
})
export class PsComplexBankAuthenticationComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsComplexBankAuthenticationExposed;

  defaultOptions: IOptionsPsComplexBankAuthenticationExposed = {
    acNumOptions: {
      labelKey: 'account_number_key',
      placeHolder: 'enter_account_number_key',
      iconOptions:{
        iconName: 'accounts'
      }
    },
    varcharOptions: {
      labelKey: 'cif_no_key',
      placeHolder: 'enter_cif_no_key',
    }
  };

  constructor(commonService: PsCommonService, logger: LoggerService) {
    super(commonService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultOptions, this.options);
    super.init();
  }

  onCardNumberChange(value: IchangeValues) {
    this.commonProv.logger.log('CardNumber:' + value.newValue);
  }

}
