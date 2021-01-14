import { Component, OnInit, Input } from '@angular/core';
import { PsBaseContainerComponent } from '../ps-base-container.component';
import { PsCommonService } from '../../../../psServices/ps-common/ps-common.service';
import { LoggerService } from '../../../../psServices/logger/logger.service';
import { IOptionsPsContainerDraggable } from '../../../../psServices/models/ps-common-interface';

@Component({
  selector: 'ps-container-draggable',
  templateUrl: './ps-container-draggable.component.html',
  styleUrls: ['./ps-container-draggable.component.scss'],
})
export class PsContainerDraggableComponent extends PsBaseContainerComponent implements OnInit {

  @Input() options: IOptionsPsContainerDraggable = {};

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() { }

}
