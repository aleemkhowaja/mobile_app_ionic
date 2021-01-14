import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IOmniGalleryVerificationImagesRequest } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsActionGalleryComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-action/ps-action-gallery/ps-action-gallery.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsGalleryVerificationImagesExposed } from './ps-gallery-verification-images.component.interfaces';

/*
  Author  : Islam Sayed, Ghada Radwan
  Description: Will inherit from ps-action-gallery and will be used to show the list of verification images. Component should call the service to get the list of verification images and display them as per the properties defined in the component.
*/
@Component({
  selector: 'ps-gallery-verification-images',
  templateUrl: './ps-gallery-verification-images.component.html',
  styleUrls: ['./ps-gallery-verification-images.component.scss'],
})
export class PsGalleryVerificationImagesComponent extends PsActionGalleryComponent implements OnInit {
  @Input() options: IOptionsPsGalleryVerificationImagesExposed;
  defaultConf: IOptionsPsGalleryVerificationImagesExposed = {
    layout: 'grid',
    itemHieght: 150,
    itemWidth: 150,
    numberOfItemsPerPage: 9,
  };

  adminParameters: any[];

  constructor(private commonP: PsCommonService, logger: LoggerService, modalController: ModalController, omniPullProvider: OmniPullService) {
    super(commonP, logger, modalController, omniPullProvider);
  }

  ngOnInit() {
    this.commonP.copyObject(this.options, this.defaultConf, false, true);
    this.getListOfImages();
  }

  getListOfImages() {
    const paramData: IOmniGalleryVerificationImagesRequest = {
      previewAllYN: 'Y'
    };
    const mediaList: any[] = [];
    try {
      this.omniPullProvider.returnListOfImages(paramData).then(result => {
        if (result && result.gridModel && result.gridModel.length > 0) {
          // console.log('hey there!', result);
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for (let i = 0; i < result.gridModel.length; i++) {
            mediaList.push({
              id: result.gridModel[i].verificationImageId,
              data: result.gridModel[i].encodeImage
            });
          }

          this.options.mediaList = mediaList;
          this.selectedImage = result.verificationImageId;
          this.options.layout = 'grid';
        }
      }).catch((err) => { this.logger.error(err); });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
