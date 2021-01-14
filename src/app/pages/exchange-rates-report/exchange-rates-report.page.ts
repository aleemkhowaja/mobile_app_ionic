import { Component, OnInit } from '@angular/core';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';

import { OmniBasePage } from '../omni-base/omni-base.page';
import { ConstantCommon } from './../../commonSRC/psServices/models/common-constant';
import { IOptionsPsTemplateReport } from './../../commonSRC/psServices/models/ps-common-interface';

@Component({
  selector: 'exchange-rates-report',
  templateUrl: './exchange-rates-report.page.html',
  styleUrls: ['./exchange-rates-report.page.scss'],
})
export class ExchangeRatesReportPage extends OmniBasePage implements OnInit {

  reportTemplateOptions: IOptionsPsTemplateReport= {
    operId: ConstantCommon.EXCHANGE_RATE_OPER,
    reportParametersList: {
      iconPath: PsCommonBusinessSettings.ICON_LOCATION_LANGUAGE
    }
  };

  constructor() { 
    super();
  }

  ngOnInit() {
    super.init();
  }

}
