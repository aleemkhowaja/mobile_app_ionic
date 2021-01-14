import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IOptionsTemplateStepper } from '../../commonSRC/psServices/models/ps-common-interface';
import { OmniBasePage } from '../omni-base/omni-base.page';

@Component({
  selector: 'app-international',
  templateUrl: './international.page.html',
  styleUrls: ['./international.page.scss'],
})
export class InternationalPage extends OmniBasePage implements OnInit {

  constructor() { super(); }
  formGroup: FormGroup = new FormGroup({});
  stepperOptions: IOptionsTemplateStepper = {
    isHorizontalStepper: true,
    numberOfSteps: 3,
    namesofSteps: [],
    group: this.formGroup,
    // submitServiceUrl: PsCommonSettings.serviceUrl.international,
  };
  ngOnInit() {
    super.init();
  }
}
