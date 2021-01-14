import { Component, Input, OnInit } from '@angular/core';

import { IOptionsPsButtonSubmit, IOptionsPsTemplateForm } from '../../psServices/models/ps-common-interface';
import { PsTemplateBasePage } from '../ps-template-base/ps-template-base.page';

@Component({
  selector: 'ps-template-form',
  templateUrl: './ps-template-form.template.html',
  styleUrls: ['./ps-template-form.template.scss'],
})
export class PsTemplateForm extends PsTemplateBasePage implements OnInit {

  @Input() options: IOptionsPsTemplateForm;

  submitOptions: IOptionsPsButtonSubmit = {
    labelKey: 'submit_key',
    group: this.options.group
  };


  constructor() {
    super();
  }

  ngOnInit() {
    super.init();
    this.commonProv.copyObject(this.submitOptions, this.options.submitOptions, false, true);
    if (!this.options.requestObject) {
      this.options.requestObject = {};
    }
    this.commonProv.setFormData(this.options.group, this.options.requestObject);
  }

  onFooterClick() {
    if (document.getElementsByTagName('ion-modal')[0] !== undefined) {
      document.getElementsByTagName('ion-modal')[0].dismiss();
    }
  }
}
