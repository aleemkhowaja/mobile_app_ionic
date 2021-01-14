import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';
import { IOptionsActionSheet, IOptionsPsSelectAvatar } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsActionButtonComponent } from '../../../ps-base-action/ps-action-button/ps-action-button.component';

@Component({
  selector: 'ps-select-avatar',
  templateUrl: './ps-select-avatar.component.html',
  styleUrls: ['./ps-select-avatar.component.scss'],
})
export class PsSelectAvatarComponent extends PsActionButtonComponent implements OnInit {
  @Input() options: IOptionsPsSelectAvatar;
  imageResponse: any;
  optionsImg: any;
  imgPreview = PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL + 'avatar.svg';
  image: any = '';
  constructor(private commonService: PsCommonService, private imagePicker: ImagePicker, private camera: Camera) {
    super(commonService, commonService.logger);
  }

  ngOnInit() {
    if (this.options.imageName) {
      this.imgPreview = PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL + this.options.imageName;

    } else {
      this.imgPreview = PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL + 'avatar.svg';
    }

    this.custIconOptions.component = PsSelectAvatarComponent;
    this.custIconOptions.componentOptions = this.options;
  }

  selectImages() {
    if (this.options.uploadEnable) {
      const actionSheetOptions: IOptionsActionSheet = {
        header: 'Select Image source',
        buttons: [{
          text: 'Gallery',
          handler: () => {
            this.getImages();
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.openCam();
          }
        }
        ]
      };
      this.commonService.presentActionSheet(actionSheetOptions);
    }

  }
  getImages() {
    // this.options.actionImageOptions.imageName='profile_pic.png';
    this.imgPreview = PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL + 'profile_pic.png';
    this.optionsImg = {
      width: 200,
      quality: 25,
      outputType: 1,

    };
    this.imageResponse = [];
    this.imagePicker.getPictures(this.optionsImg).then((results) => {
      //  this.imgPreview = 'data:image/jpeg;base64,' + results[i];
      for (let i = 0; i < results.length; i++) {
        this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
      }
    }, (err) => {
      alert(err);
    });
  }
  openCam() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // alert(imageData)
      this.image = (window as any).Ionic.WebView.convertFileSrc(imageData);
    }, (err) => {
      // Handle error
      alert('error ' + JSON.stringify(err));
    });

  }

}
