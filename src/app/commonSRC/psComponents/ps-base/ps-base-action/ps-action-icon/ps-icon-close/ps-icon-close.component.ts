import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsActionIconComponent } from '../ps-action-icon.component';

@Component({
  selector: 'ps-icon-close',
  templateUrl: './ps-icon-close.component.html',
  styleUrls: ['./ps-icon-close.component.scss'],
})
export class PsIconCloseComponent extends PsActionIconComponent implements OnInit {

  constructor(private commonP: PsCommonService, public logger: LoggerService, private modalCtrl: ModalController
  ) {
    super(commonP, logger);
  }

  ngOnInit() { }

  close(event: Event) {
    this.onClick.emit(event);
    // this.commonP.navCtrl.pop();
    this.modalCtrl.dismiss();
  }
}
