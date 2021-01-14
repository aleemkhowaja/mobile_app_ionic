import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthenticationMatrixService } from 'src/app/commonBussinessSRC/psServices/authentication-matrix/authentication-matrix.service';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsPsButtonSave, IOptionsPsButtonSubmit } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsNetworkService } from 'src/app/commonSRC/psServices/network/ps-network.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsAlertButton, IOptionsPsComplexAlertController } from 'src/app/commonSRC/psTemplates/ps-template-alert-controller/ps-template-alert-controller.template.interfaces';
import { PsButtonSubmitComponent } from '../ps-button-submit/ps-button-submit.component';


@Component({
  selector: 'ps-button-save',
  templateUrl: './ps-button-save.component.html',
  styleUrls: ['./ps-button-save.component.scss'],
})
export class PsButtonSaveComponent extends PsButtonSubmitComponent implements OnInit {

  @Input() options: IOptionsPsButtonSave;

  formGroup: FormGroup = new FormGroup({});
  alertVO = {};
  defaultOptions: IOptionsPsButtonSubmit;

  constructor(public commonService: PsCommonService, private navService: PsNavigatorService,
    private authService: AuthenticationMatrixService, private psNetworkServiceChild: PsNetworkService, elRef?: ElementRef) {
    super(commonService, navService, authService, psNetworkServiceChild, elRef);
  }

  ngOnInit() {
    super.init();
    this.defaultOptions = {
      labelKey: 'save_key',
      iconName: this.options.iconName ? this.options.iconName : 'document',
      psClass: 'ps-button-save',
      group: this.options.group,
      actionType: 'save'
    };
    // this.commonService.copyObject(this.defaultOptions, this.options, false, true);
    // this.commonService.setFormData(this.formGroup, this.alertVO);
  }

  askForTitle() {
    return new Promise<any>((resolve, reject) => {
      if (this.options.dataSaveId) {
        this.options.submitServiceUrl = PsCommonSettings.serviceUrl.updateSubmitData;
        this.options.isSave = true;
        this.options.extraParams = {
          ...this.options.extraParams,
          actionType: 'save'
        }
        this.callServer();
      } else {
        const alertController: IOptionsPsComplexAlertController = {
          cssClass: 'ps-button-save',
          header: 'enter_draft_title_key',
          inputs: [
            {
              type: 'keyin',
              options: {
                placeHolder: 'draft_title_key',
                fcName: 'name',
                group: this.options.group,
                forceShowOnPreview: true
              }
            }
          ],
          buttons: [
            {
              role: 'cancel',
              options: {
                labelKey: 'cancel_key',
                psClass: 'ps-drafts-report-cancel-button',
                group: this.options.group
              },
              handler: () => {
                this.options.group.removeControl('name');
                reject(false);
              }
            }
          ]
        };
        const psButtonSave: IOptionsPsAlertButton = {
          role: 'submit',
          handler: () => {
            CommonUtils.dismissAllModals();
          }
        };

        (psButtonSave.options as IOptionsPsButtonSubmit) = {
          ...this.options,
          labelKey: 'submit_key',
          psClass: 'ps-drafts-report-submit-button',
          isSave: true,
          actionType: 'save',
          postCallFunction: undefined,
          preCallFunction: undefined,
          failureCallFunction: undefined,
          extraParams: {
            ...this.options.extraParams, actionType: 'save'
          }
        };
        alertController.buttons.push(psButtonSave);
        this.commonService.presentPsAlert(alertController, 'ps-save-button');
      }
    });
  }
}
