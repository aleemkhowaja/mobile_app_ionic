import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IOptionsPsDateMonthYearExposed } from '../../../commonBussinessSRC/psComponents/ps-keyin-input/ps-date-month-year/ps-date-month-year.component.interfaces';
import { IOptionsPsContainerPanel, IOptionsPsKeyinDate } from './../../../commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsDateDayMonthYearFutureExposed } from '../../../commonBussinessSRC/psComponents/ps-keyin-input/ps-day-month-year/ps-date-day-month-year-future/ps-date-day-month-year-future.component.interfaces';

@Component({
  selector: 'hisham-components',
  templateUrl: './hisham-components.page.html',
  styleUrls: ['./hisham-components.page.scss'],
})
export class HishamComponentsPage implements OnInit {

  myFormGroup: FormGroup = new FormGroup({});

  panelOptions: IOptionsPsContainerPanel = {
    labelKey: 'HISHAM_COMPONENTS_PANEL',
    iconName: 'happy',
    expanded: true
  };
  psKeyinDateOptions: IOptionsPsKeyinDate = {
    group: this.myFormGroup,
    fcName: 'psKeyinDateFcName',
    labelKey: 'psKeyinDateComponent'
  };
  psDateMonthYearOptions: IOptionsPsDateMonthYearExposed = {
    group: this.myFormGroup,
    fcName: 'psDateMonthYearFcName',
    labelKey: 'psDateMonthYearComponent'
  };
  psDateMonthYearFutureOptions: IOptionsPsDateDayMonthYearFutureExposed = {
    group: this.myFormGroup,
    fcName: 'psDateMonthYearFutureFcName',
    labelKey: 'psDateMonthYearFutureComponent'
  };

  constructor() { }

  ngOnInit() {
  }

}
