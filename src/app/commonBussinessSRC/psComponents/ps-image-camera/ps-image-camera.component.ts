import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PsActionImageComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-action/ps-action-image/ps-action-image.component';
import { IOptionsActionSheet, IOptionsPsActionImage, IOptionsPsLabel } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsImageCameraExposed } from './ps-image-camera.component.interfaces';


@Component({
  selector: 'ps-image-camera',
  templateUrl: './ps-image-camera.component.html',
  styleUrls: ['./ps-image-camera.component.scss'],
})
export class PsImageCameraComponent extends PsActionImageComponent implements OnInit {

  @Input() options: IOptionsPsImageCameraExposed;
  actionImageOptions: IOptionsPsActionImage = {
    psClass: 'profile-info',
    labelKey: 'upload_key'
  };
  labelOptions: IOptionsPsLabel = {
    labelKey: 'upload_key'
  };
  constructor(private commonService: PsCommonService, private camera: Camera) {
    super(commonService, commonService.logger);
  }

  ngOnInit() {
    this.actionImageOptions.imageName = 'avatar.svg';
    this.actionImageOptions.psClass = this.options.psClass;
  }
  selectImages() {
    if (this.options.uploadEnable) {
      const actionSheetOptions: IOptionsActionSheet = {
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
    }

  }
  openCam(sourceType) {
    const options: CameraOptions = {
      sourceType,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      this.actionImageOptions.imageBase64Url = imageData;
      //   this.actionImageOptions.imageCameraValue= (<any>window).Ionic.WebView.convertFileSrc(imageData);

    }, (err) => {
      // Handle error
      alert('error ' + JSON.stringify(err));
    });

  }



}
