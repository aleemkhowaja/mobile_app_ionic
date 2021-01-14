import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationMatrixService } from 'src/app/commonBussinessSRC/psServices/authentication-matrix/authentication-matrix.service';
import { IOptionsPsButtonReject, IOptionsPsButtonSubmit } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsNetworkService } from 'src/app/commonSRC/psServices/network/ps-network.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsButtonSubmitComponent } from '../ps-button-submit/ps-button-submit.component';


@Component({
  selector: 'ps-button-reject',
  templateUrl: './ps-button-reject.component.html'
})
export class PsButtonRejectComponent extends PsButtonSubmitComponent implements OnInit {

  @Input() options: IOptionsPsButtonReject;

  defaultOptions: IOptionsPsButtonSubmit = {
    labelKey: 'reject_key',
    iconName: 'trash',
    psClass: 'ps-button-reject',
    actionType: 'reject',
    group: this.options.group
  };

  constructor(public commonService: PsCommonService, private navService: PsNavigatorService,
    private omniAuthServ: AuthenticationMatrixService, private psNetworkServ: PsNetworkService) {
    super(commonService, navService, omniAuthServ, psNetworkServ);
  }

  ngOnInit() {
    this.commonService.copyObject(this.defaultOptions, this.options, false);
    super.ngOnInit();
  }

  onReject(event) {
    this.onClick.emit(event);
  }
}
