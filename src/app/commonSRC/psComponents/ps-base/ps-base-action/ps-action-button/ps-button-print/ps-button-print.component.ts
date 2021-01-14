import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { IOptionsPsButtonPrint } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsActionButtonComponent } from '../ps-action-button.component';
import { FileService } from './../../../../../psServices/Files/file.Service';
import { IFileFormat, IOmniCommonFileRequest, IOptionsPsActionButton } from './../../../../../psServices/models/ps-common-interface';
import { PsCommonService } from './../../../../../psServices/ps-common/ps-common.service';


@Component({
  selector: 'ps-button-print',
  templateUrl: './ps-button-print.component.html',
  styleUrls: ['./ps-button-print.component.scss'],
})
export class PsButtonPrintComponent extends PsActionButtonComponent implements OnInit {

  @Input() options: IOptionsPsButtonPrint;
  printOptions: IOptionsPsActionButton;

  constructor(private commonService: PsCommonService, private fileService: FileService, elRef?: ElementRef) {
    super(commonService, commonService.logger, elRef);
  }

  ngOnInit() {
    this.printOptions = {
      labelKey: this.options.labelKey ? this.options.labelKey : 'print_key',
      type: 'button',
      iconName: 'print',
      psClass: 'ps-button-print',
      group: this.options.group
    }
  }

  onPrintClicked(event) {
    let reportRequest: IOmniCommonFileRequest = {
      operId: this.options ? this.options.reportId : 1,
      reportFormat: IFileFormat.PDF,
      reportType: '2'
    };
    this.commonService.returnReportDetails(reportRequest).then(result => {
      if (result) {
        let blobData = this.fileService.base64toBlob(result['data']['base64Data'], 'application/pdf');
        const url = window.URL.createObjectURL(blobData);
        window.open(url);
      }
    }).catch(error => this.commonService.logger.log(error));
  }

}
