import { Component, Input, OnInit } from '@angular/core';
import { IOptionsPsLabelExposed, ISmartFieldCO, ISmartFieldRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsActionIconExposed, IOptionsPsRecordAttachmentComponentExposed } from '../../../psServices/models/ps-common-interface';
import { PsBaseFieldComponent } from '../ps-base-field/ps-base-field.component';
import { OmniPullService } from './../../../../commonBussinessSRC/psServices/omni-common/omni-pull.service';

/**
 * @author Aftab.Ali
 * @since 07/02/2020
 *
 * <p> RecordAttachementDownloadComponent is a techincal component to show the attachments for ipo securities</p>
 */
@Component({
  selector: 'ps-record-attachement-download',
  templateUrl: './ps-record-attachement-download.component.html',
  styleUrls: ['./ps-record-attachement-download.component.scss'],
})
export class PsRecordAttachementDownloadComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsRecordAttachmentComponentExposed;
  public attchementLableOptions: IOptionsPsLabelExposed = {};
  public attachmentIconOptions: IOptionsPsActionIconExposed = {};

  constructor(
    commonService: PsCommonService,
    logger: LoggerService,
    private omniPull: OmniPullService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    this.attchementLableOptions = {
      labelKey: 'isdara_bulletin_key'
    };
    this.attachmentIconOptions = {
      iconName: 'attach'
    };
  }


  /**
   * @param progReference
   * @param transactionNumber
   * @param applicationName
   * @param download
   */
  public getAttachmentsAndOrDownload(progReference, transactionNumber, applicationName, smartId, download: boolean = true): Promise<Array<ISmartFieldCO>> {
    const response: Array<ISmartFieldCO> = [];
    return new Promise<Array<ISmartFieldCO>>((resolve) => {
      const paramData: ISmartFieldRequest = {};
      paramData.progReference = progReference;
      paramData.smartFieldCode = smartId;
      paramData.applicationName = applicationName;
      paramData.transactionNumber = transactionNumber;
      this.omniPull.returnSmartDetails(paramData).then((result) => {
        const list: Array<ISmartFieldCO> = result.gridModel;
        let noFileWasFound = true;
        if (list != null && list !== undefined) {
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for (let i = 0; i < list.length; i++) {
            const smart = list[i];
            if (smart.smartFieldFileContents != null && smart.smartFieldText != null && JSON.parse(smart.isFile)) {
              noFileWasFound = false;
              if (download) {
                this.commonProv.downloadFile(smart.smartFieldFileContents, smart.smartFieldText);
              }
              response.push(smart);
            }
          }
        }
        if (noFileWasFound) {
        }
        resolve(response);
      }).catch((error) => {
        resolve(response);
      });
    });
  }

  /**
   *
   */
  public downloadAttachment() {
    this.getAttachmentsAndOrDownload(this.options.progRef, this.options.transactionNumber, this.options.smartId, this.options.applicationName, true);
  }

}
