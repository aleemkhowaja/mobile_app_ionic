import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IOptionsTemplateStepper } from '../../commonSRC/psServices/models/ps-common-interface';

@Component({
  selector: 'app-country-local',
  templateUrl: './country-local.page.html',
  styleUrls: ['./country-local.page.scss'],
})
export class CountryLocalPage implements OnInit {

  constructor() { }
  formGroup: FormGroup = new FormGroup({});
  stepperOptions: IOptionsTemplateStepper = {
    isHorizontalStepper: true,
    numberOfSteps: 3,
    namesofSteps: [],
    group: this.formGroup,
    // submitServiceUrl: PsCommonSettings.serviceUrl.country-local,
  };
  ngOnInit() {
  }


}
