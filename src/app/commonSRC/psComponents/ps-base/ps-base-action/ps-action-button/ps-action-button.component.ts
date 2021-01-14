import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { LoggerService } from './../../../../psServices/logger/logger.service';
import { IOptionsPsActionButton, IOptionsPsActionIconExposed } from './../../../../psServices/models/ps-common-interface';
import { PsCommonService } from './../../../../psServices/ps-common/ps-common.service';
import { PsBaseActionComponent } from './../ps-base-action.component';


@Component({
  selector: 'ps-action-button',
  templateUrl: './ps-action-button.component.html',
  styleUrls: ['./ps-action-button.component.scss'],
})
export class PsActionButtonComponent extends PsBaseActionComponent implements OnInit {

  @Input() options: IOptionsPsActionButton = {
    type: 'button',
    group: null
  };

  get iconOptions(): IOptionsPsActionIconExposed {
    const iconOpt = {
      labelOptions: {
        labelKey: this.options.labelKey
      },
      ... this.options
    };
    iconOpt.allowCust = false;
    return iconOpt;
  }

  constructor(common: PsCommonService, loggerP: LoggerService, elRefButton?: ElementRef) {
    super(common, loggerP, elRefButton);
  }

  onActionButtonClicked(event: Event) {
    if (this.id) {
      if (this.screenDispElt && this.screenDispElt.SERVICE_MAPPING_ID) {
        this.common.presentLoading();
        const commonParams = this.options.group !== undefined && this.options.group !== null ? this.options.group.controls.formData.value : {};
        const customizationRequest: any = {
          mappingId: this.screenDispElt.SERVICE_MAPPING_ID,
          commonParametersList: { ...commonParams }
        };
        this.common.commonServiceCallForCustomization(customizationRequest).then(result => {
          this.common.dismissLoading();
          if (result.outputType === 'S') {
            this.onClick.emit(event);
          }
        }).catch(error => {
          this.common.dismissLoading();
          if (error.data.outputType !== 'S') {
            const resError = { msgKey: error.data.outputNotification };
          }
          this.logger.error('Error ! while calling common service for customization ', error);
        });

      } else {
        this.onClick.emit(event);
      }
    } else {
      this.onClick.emit(event);
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.common.copyObject(this.iconOptions, this.options, false, true);
    this.custIconOptions.availableCustomization.SERVICE_MAPPING = true;
    this.custIconOptions.formGroup = this.options.group;
    if (this.options && this.options.labelKey) {
      this.iconOptions.labelOptions = {
        labelKey: this.options.labelKey
      };
    }
  }
}
