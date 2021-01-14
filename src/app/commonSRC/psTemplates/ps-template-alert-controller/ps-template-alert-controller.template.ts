import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IOptionsPsLabelHeader } from 'src/app/commonSRC/psServices/models/ps-common-interface';

import { IOptionsPsAlertButton, IOptionsPsComplexAlertController } from './ps-template-alert-controller.template.interfaces';

@Component({
  selector: 'ps-template-alert-controller',
  templateUrl: './ps-template-alert-controller.template.html',
  styleUrls: ['./ps-template-alert-controller.template.scss'],
})
export class PsTemplateAlertController implements OnInit {

  @Input() options: IOptionsPsComplexAlertController = { cssClass: 'ps-default-template-alert-controller' };

  headerOptions: IOptionsPsLabelHeader = {
  };
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.headerOptions.labelKey = this.options.header;
    if (!this.options.buttons) {
      this.options.buttons = [{
        options: { labelKey: 'cancel_key', group: null }, role: 'cancel',
        handler: () => {
          this.dismiss();
        }
      }];
    }

    this.options.buttons.forEach(btn => {
      btn.options['allowCust'] = false;
      if (btn.role === 'cancel') {
        btn.options['psClass'] = 'ps-button-cancel';
      }
    });
  }

  dismiss(button?: IOptionsPsAlertButton) {
    this.modalCtrl.dismiss();
    if (button) {
      button.handler();
    }
  }

}
