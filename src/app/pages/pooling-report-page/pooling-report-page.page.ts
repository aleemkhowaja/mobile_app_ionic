import { Component, OnInit } from '@angular/core';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsTemplateReport, IOptionsPsContainerHtmlViewer, IOptionsPsButtonCancel } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { OmniBasePage } from '../omni-base/omni-base.page';
import { PsCommonSettings } from './../../commonSRC/psServices/models/ps-common.settings';

@Component({
  selector: 'app-pooling-report-page',
  templateUrl: './pooling-report-page.page.html',
  styleUrls: ['./pooling-report-page.page.scss'],
})
export class PoolingReportPagePage extends OmniBasePage implements OnInit {

  options: IOptionsPsContainerHtmlViewer;

  cancelOptions: IOptionsPsButtonCancel = {group: null};
  reportTemplateOptions: IOptionsPsTemplateReport = {
    reportParametersList: {
      iconPath: PsCommonBusinessSettings.ICON_LOCATION_LANGUAGE
    }
  };

  constructor(private logger: LoggerService, private common: PsCommonService, private navService: PsNavigatorService) {
    super();

  }

  ngOnInit() {
    super.init();
    this.options = {
      fileName: 'report.html',
    };

    this.reportTemplateOptions.operId = PsCommonSettings.oper_ID;
    const result = this.navService.getAllParams() ? this.navService.getAllParams() : null;
    if (result) {
      this.reportTemplateOptions.reportParametersList = result as Map<string, string>;
    }
  }

}
