import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComponentRef, ModalOptions } from '@ionic/core';
import { FieldCustomizationPage } from 'src/app/commonSRC/customization/psPages/field-customization/field-customization';
import { PsActionIconComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-action/ps-action-icon/ps-action-icon.component';
import { IOptionsPsActionIcon, IOptionsPsIconCustomization } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { CommonCustUtils } from 'src/app/commonSRC/customization/psServices/util/common-cust-utils';

@Component({
  selector: 'ps-icon-customization',
  templateUrl: './ps-icon-customization.component.html',
})
export class PsIconCustomizationComponent extends PsActionIconComponent implements OnInit {

  @Input() options: IOptionsPsIconCustomization;

  public iconOptions: IOptionsPsActionIcon = {
    iconName: 'psCustIcon',
    allowCust: false
  };

  get availCust() {
    if (this.options && this.options.fieldNameId) {
      const screenOperCust = this.commonP.initialScreenDisplayParams.get(PsCommonSettings.oper_ID);
      if (screenOperCust && screenOperCust.get(this.options.fieldNameId)) {
        return 'available-cust';
      }
    }
    return '';
  }

  constructor(private commonP: PsCommonService, private modalCtrl: ModalController
  ) {
    super(commonP, commonP.logger);
  }

  ngOnInit() { }

  async openCustomization(myEvent) {
    // PsCommonSettings.custMode = false;
    let availableCustomization = this.options.availableCustomization;
    if (availableCustomization == null) {
      // default available customization options for the ps_base
      availableCustomization = {
        IS_VISIBLE: true,
        IS_READONLY: true,
        KEY_LABEL_ID: true
      };
    }
    const params = {
      availableOptions: availableCustomization,
      operId: PsCommonSettings.oper_ID,
      fieldName: this.options.fieldNameId,
      fieldNameDesc: this.options.fieldNameDesc,
      component: this.options.component,
      componentOptions: this.options.componentOptions,
      fcNamesAndsessionVarsList: CommonCustUtils.getAllVariablesNamesFromSession().concat(...Object.keys(this.options.formGroup !== null && this.options.formGroup !== undefined ? this.options.formGroup.controls : []))
    };
    const alertId = 'ps-customization-page-alert';
    const modalOpts: ModalOptions<ComponentRef> = {
      component: FieldCustomizationPage,
      componentProps: params,
      backdropDismiss: false,
      cssClass: 'customization-page',
      id: alertId
    };
    if (PsCommonSettings.isLoggedIn === false) {
      modalOpts.cssClass += ' pre-customization-page';
    }
    this.commonP.modalCtrl.dismiss(null, null, alertId);
    const modalEl = await this.commonP.modalCtrl.create(modalOpts);
    await modalEl.present();
  }
}
