import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsActionGalleryComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-action/ps-action-gallery/ps-action-gallery.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';
import { IOptionsPsActionGallery } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

/*
Author: H.Hassan
Date: 07Nov2019
WI: #922428
ps-gallery-banners
*/

@Component({
  selector: 'ps-gallery-banners',
  templateUrl: './ps-gallery-banners.component.html',
  styleUrls: ['./ps-gallery-banners.component.scss']
})
export class PsGalleryBannersComponent extends PsActionGalleryComponent implements OnInit {
  options: IOptionsPsActionGallery;
  listOfFiles: any[];

  constructor(
    private commonP: PsCommonService,
    logger: LoggerService,
    private omniPull: OmniPullService,
    modalController: ModalController
  ) {
    super(commonP, logger, modalController, omniPull);
  }

  async loadBanners() {
    const mediaList: any[] = [];
    let counter = 0;
    const json = this.listOfFiles && this.listOfFiles.length > 0 ? this.listOfFiles : await this.omniPull.omniCommon.common.http.http.get(PsApplicationSettings.CLIENT_ASSETS_CONFIG.BANNERS_FILE_URL).toPromise();
    const files = json['banner-files'];
    this.listOfFiles = files;
    for (const file of files) {
      // // console.log('iam here!', file);
      mediaList.push({
        id: counter++,
        type: 'html',
        fileName: file
      });
    }

    this.options.mediaList = mediaList;
    this.options.layout = 'slider';
  }

  ngOnInit() {
    this.loadBanners();
  }
}
