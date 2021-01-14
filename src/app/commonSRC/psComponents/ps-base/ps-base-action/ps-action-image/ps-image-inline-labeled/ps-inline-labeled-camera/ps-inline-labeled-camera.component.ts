import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { ILoginResponse, IUpdateUserProfileRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniCommonService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-common.service';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { Events } from 'src/app/commonSRC/psServices/Event/event.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { IOptionsActionSheet, IOptionsPsInlineLabeledCamera, IOptionsPsLabel } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from 'src/app/commonSRC/psServices/models/ps-common.settings';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsAlertButton, IOptionsPsComplexAlertController } from 'src/app/commonSRC/psTemplates/ps-template-alert-controller/ps-template-alert-controller.template.interfaces';
import { PsImageInlineLabeledComponent } from '../ps-image-inline-labeled.component';




@Component({
  selector: 'ps-inline-labeled-camera',
  templateUrl: './ps-inline-labeled-camera.component.html',
  styleUrls: ['./ps-inline-labeled-camera.component.scss'],
})
export class PsInlineLabeledCameraComponent extends PsImageInlineLabeledComponent implements OnInit {

  @Input() options: IOptionsPsInlineLabeledCamera;
  defaultOptions: IOptionsPsInlineLabeledCamera = {
    actionImageOptions: {
      psClass: 'profile-info',
    },
    labelOptions: {
      labelKey: 'upload_key'
    }
  };
  editlabelOptions: IOptionsPsLabel;
  userInformation: ILoginResponse;
  userProfileImage: string;
  base64Value: string;
  base64UrlWeb: string;
  imagedataValue: any;
  fileNamevalue: any;
  extentionValue: any;
  public acceptFormatExt: string[] = [];
  private maxSizeInBytes: number;
  supportedFiles = '';
  showedit: boolean = true;
  constructor(public commonService: PsCommonService, private ommniCommon: OmniCommonService, public camera: Camera, private omniPull: OmniPullService, public events: Events) {
    super(commonService);
  }

  ngOnInit() {
    this.userInformation = this.commonService.session.getValueOf(ConstantCommon.USERINFO);
    if (!this.options.actionImageOptions.imageBase64Url) {
      this.defaultOptions.actionImageOptions.imageName = CommonBussinessConstant.DEFAULT_IMAGE;
      this.defaultOptions.labelOptions.labelKey = 'upload_key';
    } else {
      this.defaultOptions.labelOptions.labelKey = 'edit_key';
    }
    this.commonService.copyObject(this.defaultOptions, this.options, false);
    this.checkAllowedTypeAndSize();
  }

  selectImages() {
    if (this.defaultOptions.labelOptions.labelKey === 'upload_key' || this.defaultOptions.labelOptions.labelKey === 'edit_key') {
      this.editImage();
      this.editlabelOptions = {
        labelKey: 'edit_key'
      }
    } else if (this.defaultOptions.labelOptions.labelKey === 'save_key') {

      this.showedit = true;
      this.updateImage('update');
    }
  }
  editImage() {
    if (this.commonService.isWeb()) {
      this.showEditPopup();
    } else {
      if (!this.options.actionImageOptions.imageBase64Url) {
        let actionSheetOptions: IOptionsActionSheet = {
          header: this.commonService.translate('select_image_key'),
          buttons: [{
            text: this.commonService.translate('gallery_key'),
            handler: () => {
              this.openCam(this.camera.PictureSourceType.PHOTOLIBRARY);
            }
          },
          {
            text: this.commonService.translate('camera_key'),
            handler: () => {
              this.openCam(this.camera.PictureSourceType.CAMERA);
            }
          }

          ]
        };
        this.commonService.presentActionSheet(actionSheetOptions);
      } else {
        let actionSheetOptions: IOptionsActionSheet = {
          header: this.commonService.translate('select_image_key'),
          buttons: [{
            text: this.commonService.translate('gallery_key'),
            handler: () => {
              this.openCam(this.camera.PictureSourceType.PHOTOLIBRARY);
            }
          },
          {
            text: this.commonService.translate('camera_key'),
            handler: () => {
              this.openCam(this.camera.PictureSourceType.CAMERA);
            }
          }
            ,
          {
            text: this.commonService.translate('remove_photo_key'),
            handler: () => {
              this.updateImage('remove');
            }
          }
          ]
        };
        this.commonService.presentActionSheet(actionSheetOptions);
      }

    }
  }
  openCam(sourceType) {
    const options: CameraOptions = {
      sourceType,
      quality: PsCommonSettings.QUALITY,
      targetHeight: PsCommonSettings.PROFILE_IMAGE_TARGET_HEIGTH,
      targetWidth: PsCommonSettings.PROFILE_IMAGE_TARGET_WIDTH,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(options).then((imageData) => {
      this.common.resetStatusBar();
      this.defaultOptions.actionImageOptions.imageName = '';
      this.defaultOptions.actionImageOptions.imageBase64Url = imageData;
      this.defaultOptions.labelOptions.labelKey = 'save_key';
      this.base64Value = imageData;
      this.showedit = true;
    }, (err) => {
      this.common.resetStatusBar();
      // Handle error
      this.logger.log(err);
    });
  }


  uploadFile() {
    const imageUploadElement = document.createElement('input');
    imageUploadElement.name = 'image';
    imageUploadElement.type = 'file';
    imageUploadElement.id = 'profileImage';
    imageUploadElement.accept = 'image/*';
    imageUploadElement.onchange = (val) => {
      this.imagedataValue = val.target;
      this.fileNamevalue = this.imagedataValue.files[0].name;
      const ext = this.fileNamevalue.split('.')[1];
      this.acceptFormatExt = ConstantCommon.DEFAULT_ALLOWED_IMG_TYPE;
      if (this.acceptFormatExt && this.acceptFormatExt.length > 0) {
        if (this.acceptFormatExt.indexOf(ext.toLowerCase()) == -1) {
          CommonUtils.presentInfoAlert('image_files_only_allowed_key', { autoHide: true });
          return false;
        } else {
          this.getBase64(val.target['files'][0]).then((base64Data) => {
            this.defaultOptions.actionImageOptions.imageName = '';
            this.defaultOptions.actionImageOptions.imageBase64Url = this.base64UrlWeb;
            this.defaultOptions.labelOptions.labelKey = 'save_key';
            this.showedit = true;
            this.base64Value = base64Data.toString();
          });
        }
      }
    };
    imageUploadElement.click();
  }
  private showEditPopup() {
    return new Promise<any>((resolve, reject) => {
      {
        let alertButtons: Array<IOptionsPsAlertButton> =
          [
            {
              options: {
                labelKey: 'upload_photo_key',
                group: this.options.group,
                psClass: 'ps-button-submit'
              },
              handler: () => {
                CommonUtils.dismissAllModals();
                this.uploadFile();
                reject(false);
              }
            }, {
              options: {
                labelKey: 'cancel_key',
                group: this.options.group,
                psClass: 'ps-button-cancel'
              },
              handler: () => {
                CommonUtils.dismissAllModals();
              }
            },
          ];

        if (this.defaultOptions.actionImageOptions.imageBase64Url) {
          alertButtons.splice(1, 0,
            {
              options: {
                labelKey: 'remove_photo_key',
                group: this.options.group,
                psClass: 'ps-button-reject'
              },
              handler: () => {
                this.updateImage('remove');
                CommonUtils.dismissAllModals();
              }
            });
          alertButtons.forEach(b => b.buttonSize = 'col-4');
        }

        const alertController: IOptionsPsComplexAlertController = {
          cssClass: 'alert-upload-profile',
          header: 'upload_photo_key',
          buttons: alertButtons,
          headerImageOptions: {
            imageName: this.defaultOptions.actionImageOptions.imageName,
            imageBase64Url: this.defaultOptions.actionImageOptions.imageBase64Url
          }
        };
        this.commonService.presentPsAlert(alertController, 'alert-modal');
      }
    });
  }


  private async updateImage(type) {

    if (type !== 'remove') {
      if (this.calculateImageSize(this.base64Value) > this.maxSizeInBytes) {
        CommonUtils.presentInfoAlert(this.common.translate('image_size_is_too_big_key'), { autoHide: true });
        return false;
      }
    }
    const paramData: IUpdateUserProfileRequest = {
      profilePicture: type === 'remove' ? null : this.base64Value,
      operId: 1258
    };

    const profileImageResult = await this.omniPull.updateUserProfileImage(paramData).catch(error => {
      this.logger.error('Error! while updating user profile image in PsInlineLabeledCameraComponent : ', error);
    });

    if (profileImageResult) {
      if (type === 'remove') {
        this.defaultOptions.actionImageOptions.imageBase64Url = null;
        this.defaultOptions.actionImageOptions.imageName = CommonBussinessConstant.DEFAULT_IMAGE;
        this.defaultOptions.actionImageOptions.imagePath = null;
      }
      this.defaultOptions.labelOptions.labelKey = 'edit_key';
      this.userInformation.profileImage = this.defaultOptions.actionImageOptions.imageBase64Url;
      this.commonService.session.append(ConstantCommon.USERINFO, this.userInformation);
      this.events.publish('profileImageUpdateEvent', this.defaultOptions.actionImageOptions.imageBase64Url);
      this.showedit = false;

    } else {
      this.logger.info('info_key', 'image_not_uploaded_key');
    }

  }

  /**
   * calculating the size of base64 string for image
   * @param base64String
   */
  private calculateImageSize(base64String): number {
    let padding, inBytes, base64StringLength;
    if (base64String.endsWith('==')) {
      padding = 2;
    } else if (base64String.endsWith('=')) {
      padding = 1;
    } else {
      padding = 0;
    }

    base64StringLength = base64String.length;
    inBytes = (base64StringLength / 4) * 3 - padding;
    const kbytes = inBytes / 1000;
    return kbytes;
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64UrlWeb = reader.result.toString();
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = error => reject(error);
    });
  }

  private async checkAllowedTypeAndSize() {
    const result = await this.omniPull.getParamValOf('AttachmentAllowedSize').catch(err => this.logger.log(err));
    if (result) {
      if (result.AttachmentAllowedSize) {
        this.maxSizeInBytes = result.AttachmentAllowedSize;
      } else {
        this.maxSizeInBytes = ConstantCommon.DEFAULT_FILE_SIZE * 1024;
      }
      this.acceptFormatExt.forEach(b => this.supportedFiles += b);
    }
  }

}
