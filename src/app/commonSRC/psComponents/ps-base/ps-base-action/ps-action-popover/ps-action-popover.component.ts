import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { EventEmitterService } from 'src/app/commonSRC/psServices/event-emitter/event-emitter.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsBaseActionPopOver } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsBaseActionComponent } from '../ps-base-action.component';

@Component({
  selector: 'ps-action-popover',
  templateUrl: './ps-action-popover.component.html',
  styleUrls: ['./ps-action-popover.component.scss'],
})
export class PsActionPopoverComponent extends PsBaseActionComponent implements OnInit {
  @Input() options: IOptionsPsBaseActionPopOver = {};
  @Output() public onPopoverDismiss: EventEmitter<any> = new EventEmitter<any>();

  constructor(private commonService: PsCommonService, loggerP: LoggerService, public popoverCtrl: PopoverController, public eventEmitterService: EventEmitterService) {
    super(commonService, loggerP);
  }

  async ngOnInit() {
    this.presentPopover();
    this.eventEmitterService.getDirectionChangeEmitter().subscribe(() => {
      this.popoverCtrl.dismiss({
        dismissed: true
      });
    });
  }
  async presentPopover() {
    const popover = await this.popoverCtrl.create({
      component: this.options.component,
      event: this.options.event,
      animated: true,
      showBackdrop: true,
      cssClass: this.options.psClass,
     
    });
    popover.onDidDismiss().then(() => {
      this.onPopoverDismiss.emit({ modelDismiss: true });
    });
    return await popover.present();
  }

}
