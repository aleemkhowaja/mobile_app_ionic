import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IOptionsTemplateStepper } from '../../commonSRC/psServices/models/ps-common-interface';
import { OmniBasePage } from '../omni-base/omni-base.page';

@Component({
  selector: 'report-lost-found',
  templateUrl: './report-lost-found.page.html',
  styleUrls: ['./report-lost-found.page.scss'],
})
export class ReportLostFoundPage extends OmniBasePage implements OnInit {

  constructor() { super(); }
  formGroup: FormGroup = new FormGroup({});
  stepperOptions: IOptionsTemplateStepper = {
    isHorizontalStepper: true,
    numberOfSteps: 3,
    namesofSteps: [],
    group: this.formGroup,
    requestObject: {}
    // submitServiceUrl: PsCommonSettings.serviceUrl.international,
  };
  ngOnInit() {
    super.init();
  }


}
