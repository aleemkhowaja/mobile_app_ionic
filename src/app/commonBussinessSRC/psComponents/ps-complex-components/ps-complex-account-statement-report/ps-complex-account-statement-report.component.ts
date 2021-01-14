import { Component, OnInit } from '@angular/core';
import { IOptionsPsContainerReportViewerExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

@Component({
  selector: 'ps-complex-account-statement-report',
  templateUrl: './ps-complex-account-statement-report.component.html',
  styleUrls: ['./ps-complex-account-statement-report.component.scss'],
})
export class PsComplexAccountStatementReportComponent extends PsBaseFieldComponent implements OnInit {
  public reportViewerOptions: IOptionsPsContainerReportViewerExposed = {
    serviceUrl: 'TODO'
  };
  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {}

}
