import { Component, OnInit, Input } from '@angular/core';
import { PsBaseContainerComponent } from '../ps-base-container.component';
import { PsCommonService } from '../../../../psServices/ps-common/ps-common.service';
import { LoggerService } from '../../../../psServices/logger/logger.service';
import { IOptionsPsContainerCard } from '../../../../psServices/models/ps-common-interface';

@Component({
  selector: 'ps-container-card',
  templateUrl: './ps-container-card.component.html',
  styleUrls: ['./ps-container-card.component.scss'],
})
export class PsContainerCardComponent extends PsBaseContainerComponent implements OnInit {

  @Input() options: IOptionsPsContainerCard = {};

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() { }

}
