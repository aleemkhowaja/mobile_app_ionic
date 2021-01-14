import { Component, Input, OnInit } from '@angular/core';
import { IOptionsPsContainerHtmlViewerExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsPsActionImage, IOptionsPsContainerReportViewer } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsBaseContainerComponent } from '../ps-base-container.component';
import { FileService } from './../../../../psServices/Files/file.Service';
import { ConstantCommon } from './../../../../psServices/models/common-constant';
import { IFileFormat, IOmniCommonFileRequest } from './../../../../psServices/models/ps-common-interface';


@Component({
  selector: 'ps-container-report-viewer',
  templateUrl: './ps-container-report-viewer.component.html',
  styleUrls: ['./ps-container-report-viewer.component.scss'],
})
export class PsContainerReportViewerComponent extends PsBaseContainerComponent implements OnInit {

  @Input() options: IOptionsPsContainerReportViewer;

  constructor(commonProv: PsCommonService, private fileService: FileService) {
    super(commonProv, commonProv.logger);
  }
  public dataWasLoaded = false;
  actionImageOptions: IOptionsPsActionImage = {
    imageName: CommonUtils.getCssVariableValue('--ps-loader-image-name')
  };

  public htmlViewerOptions: IOptionsPsContainerHtmlViewerExposed;

  ngOnInit() {
    if (this.options.showReport) {
      const reportRequest: IOmniCommonFileRequest = {
        operId: this.options ? this.options.operId : 1,
        reportType: ConstantCommon.REPORT_TYPE,
        reportFormat: IFileFormat.HTML,
        reportParametersList: this.options.reportParametersList,
        ...this.options.commonRootParams
      };
      this.commonProv.returnReportDetails(reportRequest).then(result => {
        if (result) {
          const blobData = this.fileService.base64toBlob(result['data']['base64Data'], 'text/html');
          const fr = new FileReader();
          fr.onload = (e) => {
            const dataURL = fr.result;
            const parser = new DOMParser();
            const parsedHtml = parser.parseFromString(dataURL.toString(), 'text/html');
            const body = parsedHtml.getElementsByTagName('body')[0];
            if (body) {
              this.htmlViewerOptions = {
                htmlSrc: body.innerHTML
              };
            }

          };
          fr.readAsText(blobData);
        }
        this.dataWasLoaded = true;
      }).catch((error) => {
        this.commonProv.logger.log(error);
        this.dataWasLoaded = true;
      });
    } else {
      this.dataWasLoaded = true;
    }
  }
}
