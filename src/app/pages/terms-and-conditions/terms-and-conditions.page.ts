import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOptionsPsComplexTermsAndConditionsExposed } from 'src/app/commonBussinessSRC/psComponents/ps-complex-components/ps-complex-terms-and-conditions/ps-complex-terms-and-conditions.component.interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';

import { OmniBasePage } from '../omni-base/omni-base.page';
import { IOptionsPsTemplateForm } from './../../commonSRC/psServices/models/ps-common-interface';

@Component({
  selector: 'terms-and-conditions',
  templateUrl: './terms-and-conditions.page.html',
  styleUrls: ['./terms-and-conditions.page.scss'],
})
export class TermsAndConditionsPage extends OmniBasePage implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  options: IOptionsPsTemplateForm = {
    group: this.formGroup,
    submitOptions: {
      group: this.formGroup,
      submitServiceUrl: PsCommonBusinessSettings.serviceUrl.termsAndConditionsTermsAndConditions,
    }
  };
  termsAndConditionsOptions: IOptionsPsComplexTermsAndConditionsExposed = {
    checkBoxOptions: {
      group: this.formGroup,
      fcName: 'checkboxConfirm',
      labelKey: 'i_agree_key'
    },
    htmlViewerOptions: {
      fileName: PsCommonBusinessSettings.firstLoginTermsAndConditionsFileName
    }
  };
  constructor() {
    super();
  }

  ngOnInit() {
    super.init();
    this.baseFormGroup = this.formGroup;
  }

}
