import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';

import { ConstantCommon } from '../../commonSRC/psServices/models/common-constant';
import { IOptionsPsTemplateReport } from '../../commonSRC/psServices/models/ps-common-interface';
import { OmniBasePage } from '../omni-base/omni-base.page';

@Component({
  selector: 'account-statement-report',
  templateUrl: './account-statement-report.page.html',
  styleUrls: ['./account-statement-report.page.scss'],
})
export class AccountStatementReportPage extends OmniBasePage implements OnInit {

  reportTemplateOptions: IOptionsPsTemplateReport = {
    operId: ConstantCommon.VIEW_STATEMENT_OF_TRANSACTIONS
  };

  constructor(private navService: PsNavigatorService, public logger: LoggerService) {
    super();
  }

  ngOnInit() {
    super.init();
    const result = this.navService.getAllParams() ? this.navService.getAllParams() : null;
    if (result) {
      const accountInfo: any = {};
      const accountParam = result;
      accountInfo.RA_FROM_GL = '130334'; // accountParam.glCode;
      accountInfo.RA_FROM_CIF = '60000600'; // accountParam.cifNo;
      accountInfo.RA_FROM_SL = '0'; // accountParam.serialNo;
      this.reportTemplateOptions.reportParametersList = accountInfo as Map<string, string>;
    }
  }

}
