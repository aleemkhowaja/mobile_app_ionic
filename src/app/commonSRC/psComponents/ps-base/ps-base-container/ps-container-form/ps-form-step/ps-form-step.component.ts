import { Component, OnInit } from '@angular/core';

import { IOptionsPsFormStep } from '../../../../../psServices/models/ps-common-interface';
import { IOptionsPsContainerForm, IOptionsPsLabel } from './../../../../../psServices/models/ps-common-interface';
import { PsCommonService } from './../../../../../psServices/ps-common/ps-common.service';
import { PsContainerFormComponent } from './../ps-container-form.component';

@Component({
  selector: 'ps-form-step',
  templateUrl: './ps-form-step.component.html',
  styleUrls: ['./ps-form-step.component.scss'],
})
export class PsFormStepComponent extends PsContainerFormComponent implements OnInit {

  options: IOptionsPsFormStep;
  formOptions: IOptionsPsContainerForm = {};

  constructor(private commonService: PsCommonService) {
    super(commonService, commonService.logger);
  }

  ngOnInit() {
    super.ngOnInit();
    this.commonService.copyObject(this.options, this.formOptions);
  }
}
