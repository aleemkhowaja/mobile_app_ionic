import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CommonBussinessConstant } from './../../../commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IOptionsPsActionImageExposed } from './../../../commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { AlertType, IOptionsAlert, IOptionsPsActionIcon, IOptionsPsLabel } from './../../psServices/models/ps-common-interface';


@Component({
  selector: 'ps-template-popup-message',
  templateUrl: './ps-template-popup-message.page.html',
  styleUrls: ['./ps-template-popup-message.page.scss'],
})
export class PsTemplatePopupMessagePage implements OnInit {
  @Input() alertOptions: IOptionsAlert;

  defaultImageName: string;
  className: string;
  defaultTitle: string;

  actionImageOptions: IOptionsPsActionImageExposed = {
    imageName: this.getCssVariableValue('--ps-info-message-image-name'),
    allowCust: false
  };
  actionIconOptions: IOptionsPsActionIcon = {};
  titleLabel: IOptionsPsLabel = {};
  messageLabel: IOptionsPsLabel = {
    isInnerHTML: true
  };
  constructor(private modalCtrl: ModalController, private translateService?: TranslateService) {
  }

  ngOnInit() {
    switch (this.alertOptions.type) {
      case AlertType.SUCCESS: {
        this.defaultImageName = this.getCssVariableValue('--ps-success-message-image-name');
        this.defaultTitle = this.translate('SUCCESS_KEY');
        this.className = 'success-alert';
        break;
      }
      case AlertType.FAILURE: {
        this.defaultImageName = this.getCssVariableValue('--ps-error-message-image-name');
        this.defaultTitle = this.translate('FAILURE_KEY');
        this.className = 'failure-alert';
        break;
      }
      case AlertType.FATAL: {
        this.defaultImageName = this.getCssVariableValue('--ps-fatal-message-image-name');
        this.defaultTitle = this.translate('FAILURE_KEY');
        this.className = 'failure-alert';
        break;
      }
      case AlertType.INFO: {
        this.defaultImageName = this.getCssVariableValue('--ps-info-message-image-name');
        this.defaultTitle = this.translate('WARNING_KEY');
        this.className = 'info-alert';
        break;
      }
      default: {
        this.defaultImageName = this.getCssVariableValue('--ps-info-message-image-name');
        this.defaultTitle = this.translate('NOTE_KEY');
        this.className = 'success-alert';
      }
    }
    this.actionImageOptions.imageName = this.alertOptions.imageName ? this.alertOptions.imageName : (this.alertOptions.displayImageOrIcon === true ? this.defaultImageName : null);
    this.titleLabel.labelKey = this.alertOptions.title ? this.alertOptions.title : (this.alertOptions.autoHide ? null : this.defaultTitle);
    this.messageLabel.labelKey = this.alertOptions.message;
    this.messageLabel.translate = false;
    if (this.alertOptions.autoHide) {
      setTimeout(() => {
        this.modalCtrl.dismiss();
      }, CommonBussinessConstant.SucessAlertTimeout);
    }

    if (!this.alertOptions.buttonsArray) {
      this.alertOptions.buttonsArray = [{
        group: null,
        allowCust: false,
        labelKey: 'ok_key',
        handler: () => {
          this.modalCtrl.dismiss();
        }
      }];
    }
  }

  onButtonPressed() {
    this.modalCtrl.dismiss();
  }

  private translate(key: string | Array<string>): any {
    let keyTrans;
    this.translateService.get(key).subscribe(translated => {
      keyTrans = translated;
    });
    return keyTrans;
  }

  getCssVariableValue(variableName): string {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).replace(/"/g, '').replace(/ /, '').replace(/'/g, '');
  }
}
