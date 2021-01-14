import { Component, Input, OnInit } from '@angular/core';

import { LoggerService } from '../../../../psServices/logger/logger.service';
import { IOptionsPsContainerLanding, IOptionsPsContainerSlider } from '../../../../psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../psServices/ps-common/ps-common.service';
import { PsBaseContainerComponent } from '../ps-base-container.component';

@Component({
  selector: 'ps-container-landing',
  templateUrl: './ps-container-landing.component.html',
  styleUrls: ['./ps-container-landing.component.scss'],
})
export class PsContainerLandingComponent extends PsBaseContainerComponent implements OnInit {

  @Input() options: IOptionsPsContainerLanding = {};

  public sliderOptions: IOptionsPsContainerSlider = {};

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() { }

}
