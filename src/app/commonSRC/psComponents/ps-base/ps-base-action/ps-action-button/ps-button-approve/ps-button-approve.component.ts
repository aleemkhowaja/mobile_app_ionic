import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationMatrixService } from 'src/app/commonBussinessSRC/psServices/authentication-matrix/authentication-matrix.service';
import { IOptionsPsButtonApprove, IOptionsPsButtonSubmit } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsNetworkService } from 'src/app/commonSRC/psServices/network/ps-network.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsButtonSubmitComponent } from '../ps-button-submit/ps-button-submit.component';


@Component({
  selector: 'ps-button-approve',
  templateUrl: './ps-button-approve.component.html'
})
export class PsButtonApproveComponent extends PsButtonSubmitComponent implements OnInit {

  @Input() options: IOptionsPsButtonApprove;

  defaultOptions: IOptionsPsButtonSubmit = {
    labelKey: 'approve_key',
    iconName: 'paper-plane',
    psClass: 'ps-button-submit',
    actionType: 'approve',
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

  onApprove(event) {
    this.onClick.emit(event);
  }
}
