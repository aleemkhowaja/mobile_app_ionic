import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { IFileFormat, IOptionsPsButtonExport } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { FileService } from './../../../../../psServices/Files/file.Service';
import { IOmniCommonFileRequest, IOptionsActionSheet, IOptionsPsActionButton } from './../../../../../psServices/models/ps-common-interface';
import { PsCommonService } from './../../../../../psServices/ps-common/ps-common.service';
import { PsActionButtonComponent } from './../ps-action-button.component';


@Component({
  selector: 'ps-button-export',
  templateUrl: './ps-button-export.component.html',
  styleUrls: ['./ps-button-export.component.scss'],
})
export class PsButtonExportComponent extends PsActionButtonComponent implements OnInit {

  @Input() options: IOptionsPsButtonExport;
  exportOptions: IOptionsPsActionButton;
  cifInfo: any;
  constructor(private commonService: PsCommonService, private fileService: FileService, elRef?: ElementRef) {
    super(commonService, commonService.logger, elRef);
  }

  ngOnInit() {
    this.exportOptions = {
      labelKey: this.options.labelKey ? this.options.labelKey : 'export_key',
      type: 'button',
      iconName: 'download',
      psClass: 'ps-button-export',
      group: this.options.group
    };
    this.cifInfo = this.commonService.session.getValueOf(ConstantCommon.USERINFO);
  }

  onExportClicked(event) {
    const actionSheetOptions: IOptionsActionSheet = {
      header: this.common.translate('select_an_option_key'),
      buttons: [{
        text: this.common.translate('pdf_key'),
        handler: () => {
          this.exportData(IFileFormat.PDF);
        }
      },
      {
        text: this.common.translate('excel_key'),
        handler: () => {
          this.exportData(IFileFormat.EXCEL);
        }
      },
      {
        text: this.common.translate('cancel_key'),
        role: 'cancel'
      }]
    };
    this.commonService.presentActionSheet(actionSheetOptions);
  }

  exportData(fileFormat: IFileFormat) {
    const reportRequest: IOmniCommonFileRequest = {
      operId: this.options ? this.options.reportId : 1,
      reportFormat: fileFormat === IFileFormat.PDF ? IFileFormat.PDF : IFileFormat.EXCEL,
      reportType: ConstantCommon.EXPORT_REPORT_TYPE,
      reportParametersList: this.options.reportParametersList
    };
    this.commonService.presentLoading(); // Temporary loader added.
    this.commonService.returnReportDetails(reportRequest).then(result => {
      if (result) {
        this.commonService.dismissLoading();
        const mimeType = fileFormat === IFileFormat.PDF ? 'application/pdf' : 'application/vnd.ms-excel';
        const blobData = this.fileService.base64toBlob(result['data']['base64Data'], mimeType);
        this.commonService.downloadFile(result['data']['base64Data'], this.cifInfo.customerInfoCO.longName + '-' + new Date().getTime() + '.' + (result['data']['reportFormat']).toLocaleLowerCase(), result['data']['reportFormat']);
      }
    }).catch((error) => {
      this.commonService.dismissLoading();
      this.commonService.logger.log(error);
    });
  }

}
