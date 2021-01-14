import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IFileUpload, IFileUploadObject, IOptionsPsActionButton, IOptionsPsActionIcon, IOptionsPsContainerList, IOptionsPsFileUploadComponent, IOptionsPsLabel, PsFile } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsBaseFieldComponent } from '../ps-base-field.component';



/**
 * @author Aftab.Ali
 * @since 28/10/2019
 *
 * <p> PsComplexFileUploadComponent is a complex component for file/images uploading</p>
 */
@Component({
  selector: 'ps-file-upload',
  templateUrl: './ps-file-upload.component.html',
})
export class PsFileUploadComponent extends PsBaseFieldComponent implements OnInit {
  @ViewChild('fileUpload', { static: false }) fileUpload;

  @Input() options: IOptionsPsFileUploadComponent = {};
  public uploadInProgress = false;
  public validationMsgs: Array<{ msgKey: string, param?: any }> = [];
  private excludedFormats: string[] = ['EXE', 'BATCH', 'BAT', 'VBS'];
  public acceptFormatExt: string[] = [];
  public dataFiles: IFileUploadObject[] = [];
  public downloadMessage = this.commonProv.translate('download_key');
  private maxSizeInBytes: number;
  public uploadedFiles: any[] = [];
  dataFilesOptions: IOptionsPsContainerList = {};
  chooseFileOptions: IOptionsPsActionButton = {
    group: this.options.group
  };

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onPsUpload: EventEmitter<any> = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onPsFileSelect: EventEmitter<any> = new EventEmitter<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onPsFileDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() filesChange = new EventEmitter<any>();
  uploadIconOptions: IOptionsPsActionIcon;
  removeIconOptions: IOptionsPsActionIcon;
  public noFileLableOptions: IOptionsPsLabel = {
    labelKey: 'no_file_choosen_key',
    previewMode: false
  };
  public fileAttachmentLabelOptions: IOptionsPsLabel = {
    labelKey: 'file_attachment_key',
    previewMode: false
  };
  supportedFiles = '';
  constructor(
    commonService: PsCommonService,
    logger: LoggerService,
    public omniPull?: OmniPullService
  ) {
    super(commonService, logger);
  }

  async ngOnInit() {
    this.chooseFileOptions = {
      labelKey: this.options.lableKey == undefined ? 'upload_files_key' : this.options.lableKey,
      type: 'button',
      psClass: 'ps-button-cancel',
      iconName: this.options.uploadIconName ? this.options.uploadIconName : 'upload1',
      group: this.options.group
    };
    this.removeIconOptions = {
      iconName: this.options.removeIconName ? this.options.removeIconName : 'trash',
      psClass: 'trash-attachment'
    };
    super.init();
    this.checkAllowedTypeAndSize();
  }

  selectFile(event, disableEmit?) {
    this.uploadInProgress = false;
    if (this.options.group.controls[this.options.fcName]) {
      this.options.group.controls[this.options.fcName].markAsTouched();
    }
    this.validationMsgs = [];
    if (event.target.files) {
      if (this.options.maxNbFiles) {
        let retrievedFilesCount = 0;
        if (this.uploadedFiles && this.uploadedFiles.length > 0) {
          const nonDeletedFiles = this.uploadedFiles.slice(0).filter(file => file.status !== 'D');
          retrievedFilesCount = nonDeletedFiles.length;
        }

        const totalFiles = retrievedFilesCount + event.target.files.length;
        if (totalFiles > this.options.maxNbFiles) {
          this.validationMsgs.push({
            msgKey: 'total_number_of_files_exceeded_key'
          });
          // event.target.value = '';
          return false;
        }
      }
      let lastIndexBeforeSelect = 0;
      if (this.uploadedFiles && this.uploadedFiles.length > 0) {
        lastIndexBeforeSelect = this.uploadedFiles.length;
      }
      const uploadedFilesCount = event.target.files.length;
      let filesReadCount = 0;
      for (let i = 0; i < uploadedFilesCount; i++) {
        const reader = new FileReader();
        const currentFile: IFileUpload = {};
        reader.onload = (loadEvent: any) => {
          this.validateImg(loadEvent.target.result, currentFile).then((res) => {
            if (res) {
              currentFile.fileUrlB64 = loadEvent.target.result.split(',')[1];
              const fileType = event.target.files[0].type.substring(0, event.target.files[0].type.indexOf('/'));
              const fileValue: IFileUploadObject = {
                status: currentFile.status,
                file: currentFile.fileUrlB64,
                fileName: currentFile.selectedFile.name,
                fileSize: currentFile.selectedFile.size,
                fileExt: currentFile.fileExt,
                isImage: fileType === 'image' ? true : false
              };
              if (!this.options.multiple) {
                this.uploadedFiles = [];
                this.dataFiles = [];
              }
              this.uploadedFiles.push(currentFile);
              reader.readAsDataURL(event.target.files[0]);
              reader.onload = () => {
                fileValue.imageUrl = reader.result;
              };
              this.dataFiles.push(fileValue);
              filesReadCount++;
              if (filesReadCount === uploadedFilesCount && !disableEmit) {
                super.writeValue(this.dataFiles);
                this.onPsFileSelect.emit(this.uploadedFiles);
              }
            } else {
              this.resetComp(lastIndexBeforeSelect);
              // this.onPsFileSelect.emit(currentFile);
            }
          }).catch(err => { this.logger.error(err); });
        };
        currentFile.selectedFile = event.target.files[i];
        currentFile.status = ConstantCommon.FILE_STATUS_NEW;
        currentFile.fileExt = currentFile.selectedFile.name.substring(currentFile.selectedFile.name.lastIndexOf('.') + 1).toLowerCase();
        // check file is valid
        if (this.validateFile(currentFile.selectedFile)) {
          reader.readAsDataURL(event.target.files[i]);
        } else {
          this.resetComp(lastIndexBeforeSelect);
          event.target.value = null;
          this.options.group.controls[this.options.fcName].setValue(null);
          return false;
        }
      }

    }
  }

  private validateImg(imgSrc, fileData): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      // let imgFileExt:string[]=['png','jpg','jpeg','bmp','gif'];
      const fileType = fileData.selectedFile.type.substring(0, fileData.selectedFile.type.indexOf('/'));

      if (fileType === 'image' && this.options && (this.options.maxImgHeight || this.options.maxImgWidth)) {
        let image = new Image();
        image.onload = (evt) => {
          // The image has been loaded and the data is ready
          if (this.options.maxImgWidth && this.options.maxImgWidth < image.width) {
            CommonUtils.presentInfoAlert(this.commonProv.translate('max_image_width_allowed_key') + this.options.maxImgWidth);
            resolve(false);
          }
          if (this.options.maxImgHeight && this.options.maxImgHeight < image.height) {
            CommonUtils.presentInfoAlert(this.commonProv.translate('max_image_height_allowed_key') + this.options.maxImgHeight);
            resolve(false);
          }
          // We don't need the image element anymore. Get rid of it.
          image = null;
          resolve(true);
        };
        // Load the read data into the image source. It's base64 data
        image.src = imgSrc;
      } else {
        resolve(true);
      }

    });
  }

  private resetComp(start: number) {
    this.uploadedFiles.splice(start);
    this.dataFiles.splice(start);
    // this.group.controls[this.fcName].setValue('');
  }

  private validateFile(file: PsFile): boolean {
    let isValid = true;
    // check if file name already uploaded
    const fileIndex = this.uploadedFiles.findIndex((uploadedFile) => uploadedFile.status !== 'D' && uploadedFile.selectedFile.name === file.name);
    if (fileIndex > -1) {
      CommonUtils.presentInfoAlert(this.commonProv.translate('selected_file_already_uploaded_key'));
      isValid = false;
    } else {
      if (this.options) {
        this.validationMsgs = [];
        const fileExt = file.name.substring(file.name.lastIndexOf('.')).toUpperCase();
        if (this.acceptFormatExt && this.acceptFormatExt.length > 0) {
          if (this.acceptFormatExt.indexOf(fileExt) === -1 || this.excludedFormats.indexOf(fileExt) > -1) {
            CommonUtils.presentInfoAlert(this.commonProv.translate('the_file_format_not_supported_key') + ' ' +
              this.commonProv.translate('supported_files_key') + ' : ' + this.supportedFiles);
            isValid = false;
          }
        }
        if (this.maxSizeInBytes && this.maxSizeInBytes < file.size) {
          CommonUtils.presentInfoAlert(this.commonProv.translate('attached_file_size_key') +' ('+ this.commonProv.convertBytes(file.size) + ') '+this.commonProv.translate('exceeds_the_allowed_size_key') +' ('+ this.commonProv.convertBytes(this.maxSizeInBytes) +')');
          isValid = false;
        }
      }
    }

    if (this.validationMsgs.length > 0) {
      isValid = false;
    }

    return isValid;
  }

  deleteFile(event, index: number) {
    const deletedFile: IFileUpload = this.uploadedFiles[index];
    if (ConstantCommon.FILE_STATUS_NEW === this.uploadedFiles[index].status || this.uploadedFiles[index].status === undefined) {
      this.uploadedFiles.splice(index, 1);
      this.dataFiles.splice(index, 1);
      super.writeValue(null);
    } else if (ConstantCommon.FILE_STATUS_RETRIEVE === this.uploadedFiles[index].status) {
      deletedFile.status = ConstantCommon.FILE_STATUS_DELTETED;
      this.dataFiles[index].status = ConstantCommon.FILE_STATUS_DELTETED;
    }
    this.onPsFileDelete.emit(deletedFile);
  }

  private checkAllowedTypeAndSize() {
    this.omniPull.getParamValOf('AllowedFileTypes', 'AttachmentAllowedSize').then(res => {
      if (res.AllowedFileTypes) {
        this.acceptFormatExt = res.AllowedFileTypes.toUpperCase().split(',');
      } else {
        this.acceptFormatExt = ConstantCommon.DEFAULT_ALLOWED_FILE_TYPE.toUpperCase().split(',');
      }
      if (res.AttachmentAllowedSize) {
        this.maxSizeInBytes = Number(res.AttachmentAllowedSize * 1024);
      } else {
        this.maxSizeInBytes = ConstantCommon.DEFAULT_FILE_SIZE * 1024;
      }
      this.acceptFormatExt.forEach(b => this.supportedFiles += b);
    }).catch(err => this.logger.log(err));
  }

  callUploadFile() {
    const input = this.fileUpload.el.getElementsByTagName('input')[0];
    if (input) {
      input.click();
      input.blur();
    }
  }

  get fieldValue(): any {
    const tempValue: any = super.returnValue();
    if (tempValue && tempValue.fakePath) {
      return tempValue.fakePath;
    } else {
      if (tempValue && tempValue.length > 0 && this.dataFiles.length === 0) {
        this.dataFiles = tempValue.slice(0);
        this.uploadedFiles = tempValue.slice(0);
      }
      if (this.dataFiles.length > 0) {
        return this.dataFiles[0].fileName;
      }
    }
    return null;
  }

  set fieldValue(value) {
    // keep this as empty.
  }
}
