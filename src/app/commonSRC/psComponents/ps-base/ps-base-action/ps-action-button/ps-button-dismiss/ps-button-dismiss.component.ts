import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventEmitterService } from 'src/app/commonSRC/psServices/event-emitter/event-emitter.service';

import { LoggerService } from '../../../../../psServices/logger/logger.service';
import { IOptionsPsActionButton } from '../../../../../psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../../psServices/ps-common/ps-common.service';
import { PsActionButtonComponent } from '../ps-action-button.component';
import { IOptionsPsButtonDismiss } from './../../../../../psServices/models/ps-common-interface';

@Component({
    selector: 'ps-button-dismiss',
    templateUrl: './ps-button-dismiss.component.html',
    styleUrls: ['./ps-button-dismiss.component.scss'],
})
export class PsButtonDismissComponent extends PsActionButtonComponent implements OnInit {

    @Input() options: IOptionsPsButtonDismiss;

    dismissOptions: IOptionsPsActionButton;

    constructor(public commonService: PsCommonService, loggerP: LoggerService,
        public eventEmitterService: EventEmitterService, private modalCtrl: ModalController) {
        super(commonService, loggerP);
    }

    ngOnInit() {
        this.dismissOptions = {
            labelKey: 'cancel_key',
            type: 'button',
            psClass: 'ps-button-cancel',
            group: this.options.group
        };
        this.commonService.copyObject(this.dismissOptions, this.options);
    }

    onDismissClicked(event) {
        if (this.options.modalId) {
            this.modalCtrl.dismiss({}, null, this.options.modalId);
        } else {
            this.modalCtrl.dismiss({ success: false });
        }
        this.onClick.emit(event);
    }
}
