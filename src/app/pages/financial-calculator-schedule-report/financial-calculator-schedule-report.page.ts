import { Component, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';

import { OmniBasePage } from '../omni-base/omni-base.page';
import { IOptionsPsTemplateReport } from './../../commonSRC/psServices/models/ps-common-interface';

@Component({
  selector: 'financial-calculator-schedule-report',
  templateUrl: './financial-calculator-schedule-report.page.html',
  styleUrls: ['./financial-calculator-schedule-report.page.scss'],
})
export class FinancialCalculatorScheduleReportPage extends OmniBasePage implements OnInit {

  reportTemplateOptions: IOptionsPsTemplateReport = {
    operId: CommonBussinessConstant.FINANCING_CALC_REPORT
  };

  constructor() {
    super();
  }

  ngOnInit() {
    super.init();
  }

}
