import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IOptionsTemplateStepper } from '../../commonSRC/psServices/models/ps-common-interface';
import { OmniBasePage } from '../omni-base/omni-base.page';

@Component({
  selector: 'app-bank-local',
  templateUrl: './bank-local.page.html',
  styleUrls: ['./bank-local.page.scss'],
})
export class BankLocalPage extends OmniBasePage implements OnInit {

  constructor() {
    super();
  }
  formGroup: FormGroup = new FormGroup({});
  stepperOptions: IOptionsTemplateStepper = {
    isHorizontalStepper: true,
    numberOfSteps: 3,
    namesofSteps: [],
    group: this.formGroup,
    // submitServiceUrl: PsCommonSettings.serviceUrl.bank-local,
  };
  ngOnInit() {
    super.init();
  }


}
