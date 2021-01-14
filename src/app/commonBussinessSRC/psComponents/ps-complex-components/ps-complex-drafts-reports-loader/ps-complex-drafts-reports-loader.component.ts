import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsPsActionIcon } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsDraftsReportComponent } from '../../ps-drafts-report/ps-drafts-report.component';
import { IOptionsPsDraftsReportComponent } from '../../ps-drafts-report/ps-drafts-report.component.interfaces';
import { IOptionsPsComplexDraftsReportsLoader } from './ps-complex-drafts-reports-loader.component.interfaces';

@Component({
  selector: 'ps-complex-drafts-reports-loader',
  templateUrl: './ps-complex-drafts-reports-loader.component.html',
  styleUrls: ['./ps-complex-drafts-reports-loader.component.scss'],
})
export class PsComplexDraftsReportsLoader extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsComplexDraftsReportsLoader;

  @ViewChild('report', { static: false }) report: PsDraftsReportComponent;

  public showReport = false;
  public showReportFlag = false;
  headerIconOptions: IOptionsPsActionIcon = {
    iconName: 'bookmark'
  };


  draftsOptions: IOptionsPsDraftsReportComponent = {

  };


  constructor(private commonP: PsCommonService, private loggerC: LoggerService) {
    super(commonP, loggerC);
  }




  ngOnInit() {
    super.init();
    this.commonProv.copyObject(this.draftsOptions, this.options, false, true);
  }

  async loadDrafts() {
    let animationDuration;
    if (this.report) {
      animationDuration = parseFloat(CommonUtils.getElementStyle(this.report.hostElement.nativeElement, 'animationDuration')) * 1000;
    }
    this.showReportFlag = !this.showReportFlag;
    if (this.showReport) {
      setTimeout(() => {
        this.showReport = !this.showReport;
      }, animationDuration);
    } else {
      this.showReport = !this.showReport;
    }
    // this.ref.detectChanges();
  }
}
