import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventEmitterService } from 'src/app/commonSRC/psServices/event-emitter/event-emitter.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsBaseActionModal } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsBaseActionComponent } from '../ps-base-action.component';


@Component({
  selector: 'ps-action-modal',
  templateUrl: './ps-action-modal.component.html',
  styleUrls: ['./ps-action-modal.component.scss'],
})
export class PsBaseActionModalComponent extends PsBaseActionComponent implements OnInit, OnChanges {
  @Input() options: IOptionsPsBaseActionModal = {};
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onModalDismiss: EventEmitter<any> = new EventEmitter<any>();

  dataReturned: any;

  constructor(private commonService: PsCommonService, loggerP: LoggerService, public modalController: ModalController,
              public eventEmitterService: EventEmitterService) {
    super(commonService, loggerP);
  }

  ngOnInit() {
    this.eventEmitterService.getDirectionChangeEmitter().subscribe(() => {
      this.modalController.dismiss({
        dismissed: true
      });
    });
    this.eventEmitterService.getSwipeChangeEmitter().subscribe(() => {
      this.modalController.dismiss({
        dismissed: true
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.presentModal();
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: this.options.component,
      componentProps: {
        'options': this.options.componentOption
      },
      cssClass: this.options.modalClassName !== undefined ? this.options.modalClassName : 'modalCss'
    });
    modal.onDidDismiss().then(() => {
      this.onModalDismiss.emit({modelDismiss : true});
    });
    return await modal.present();
  }
}
