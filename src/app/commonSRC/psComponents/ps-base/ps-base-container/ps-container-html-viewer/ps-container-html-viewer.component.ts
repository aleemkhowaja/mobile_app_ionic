import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';
import { IOptionsPsContainerHtmlViewer } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsBaseContainerComponent } from '../ps-base-container.component';


@Component({
  selector: 'ps-container-html-viewer',
  templateUrl: './ps-container-html-viewer.component.html',
  styleUrls: ['./ps-container-html-viewer.component.scss'],
})

export class PsContainerHtmlViewerComponent extends PsBaseContainerComponent implements OnInit {


  @Input() options: IOptionsPsContainerHtmlViewer = {};
  @ViewChild('psInlineHtmlWrapper', { static: false }) psInlineHtmlWrapper;

  public fullPath;
  public checkFullPath;
  public wasChecked = false;
  constructor(commonProv: PsCommonService, loggerP: LoggerService, private cd: ChangeDetectorRef) {
    super(commonProv, loggerP);
  }
  ngOnInit() {
    if (this.options && this.options.fileName) {
      this.checkFullPath = PsApplicationSettings.CLIENT_ASSETS_CONFIG.HTML_URL + PsCommonSettings.activeLanguge + '/' + this.options.fileName;
      CommonUtils.sendGETRequest(this.checkFullPath).then((result) => {
        this.successHandler(result);
      }).catch((err) => {
        this.checkFullPath = PsApplicationSettings.CLIENT_ASSETS_CONFIG.HTML_URL + this.options.fileName;
        CommonUtils.sendGETRequest(this.checkFullPath).then((result) => {
          this.successHandler(result);
        }).catch((error2) => {
        });
      });
    }
  }

  successHandler(result) {
    this.fullPath = this.checkFullPath;
    if (this.options.parseHtmlFromFile) {
      this.parseHTML(result);
    }
  }

  parseHTML(result) {
    CommonUtils.parseHTML(result).then((parsedHtml) => {
      const body = parsedHtml.getElementsByTagName('body')[0];
      if (body) {
        this.options.htmlSrc = body.innerHTML;
      }
    });
  }

  checkReportSize() {
    if (this.psInlineHtmlWrapper) {
      const mainContent: any = this.psInlineHtmlWrapper.nativeElement;
      const reportContent = document.querySelectorAll('.ps-inline-html .jrPage');
      if (mainContent && reportContent && (mainContent.clientWidth > 0)) {
        reportContent.forEach((element: any) => {
          element.style.width = (mainContent.clientWidth/*  - (2 * parseInt(CommonUtils.getCssVariableValue('--ps-form-container-padding'))) */) + 'px';
        });
        this.wasChecked = true;
        this.cd.detectChanges();
      }
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.wasChecked = false;
  }
}
