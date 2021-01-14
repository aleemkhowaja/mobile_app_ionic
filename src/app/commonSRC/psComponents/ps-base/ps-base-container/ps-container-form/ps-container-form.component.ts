import { Component, Input, OnInit } from '@angular/core';

import { LoggerService } from '../../../../psServices/logger/logger.service';
import { IOptionsPsContainerForm } from '../../../../psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../psServices/ps-common/ps-common.service';
import { PsBaseContainerComponent } from '../ps-base-container.component';

@Component({
  selector: 'ps-container-form',
  templateUrl: './ps-container-form.component.html',
  styleUrls: ['./ps-container-form.component.scss'],
})
export class PsContainerFormComponent extends PsBaseContainerComponent implements OnInit {

  @Input() options: IOptionsPsContainerForm = {};

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  

}
