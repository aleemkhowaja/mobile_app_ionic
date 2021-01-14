import { Component, Input, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';

import { LoggerService } from '../../../../../psServices/logger/logger.service';
import { IOptionsPsActionButton, IOptionsPsButtonCall } from '../../../../../psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../../psServices/ps-common/ps-common.service';
import { PsActionButtonComponent } from '../ps-action-button.component';

@Component({
  selector: 'ps-button-call',
  templateUrl: './ps-button-call.component.html',
  styleUrls: ['./ps-button-call.component.scss'],
})
export class PsButtonCallComponent extends PsActionButtonComponent implements OnInit {

  @Input() options: IOptionsPsButtonCall;

  callOptions: IOptionsPsActionButton;

  constructor(private commonService: PsCommonService, loggerP: LoggerService, private callNumber: CallNumber, private omniPull: OmniPullService) {
    super(commonService, loggerP);
  }

  ngOnInit() {
    this.callOptions = {
      labelKey: 'call_key',
      type: 'button',
      psClass: 'ps-complex-card-details-branch-button-call',
      group: this.options.group
    };
    this.commonService.copyObject(this.callOptions, this.options);
    if (!this.options.cellNumber) {
      this.omniPull.getParamValOf('BankPhoneNumber').then((res) => {
        this.options.cellNumber = res.BankPhoneNumber;
      }).catch(err => this.omniPull.omniCommon.common.logger.log(err));
    }
  }

  async onCallClicked(event: Event) {
    if (!this.options.cellNumber) {
      const res = await this.omniPull.getParamValOf('BankPhoneNumber');
      this.options.cellNumber = res.BankPhoneNumber;
    }
    if (this.commonService.isWeb()) {
      const call = document.createElement('a');
      call.href = 'tel:' + this.options.cellNumber.toString();
      call.id = this.options.cellNumber;
      document.getElementsByTagName('ps-button-call')[0].appendChild(call);
      call.click();
      document.getElementById(this.options.cellNumber).remove();
    } else {
      this.callNumber.callNumber(this.options.cellNumber.toString(), false)
        .then(res => {
          this.onClick.emit(event);
          // console.log('Launched dialer!', res);
        })
        .catch(err => { }); // console.log('Error launching dialer', err));
    }
  }
}
