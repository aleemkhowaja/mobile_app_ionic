import { Component, OnInit } from '@angular/core';
import { IOptionsPsActionGallery } from 'src/app/commonSRC/psComponents/ps-base/ps-base-action/ps-action-gallery/ps-action-gallery.interfaces';
import { PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';

import { OmniBasePage } from '../omni-base/omni-base.page';

@Component({
  selector: 'home-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends OmniBasePage implements OnInit {

  bannersOptions: IOptionsPsActionGallery = {
    layout: 'slider'
  };

  videoUrl;
  constructor() {
    super();
  }

  ngOnInit() {
    super.init();
    this.videoUrl = PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL + 'welcome.mp4';
  }
}
