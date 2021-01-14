import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsActionImage } from '../../../../psServices/models/ps-common-interface';
import { PsBaseActionComponent } from '../ps-base-action.component';

/**
 * @author Zunair.Zakir
 * @since 28/10/2019
 *
 * <p> PsActionImageComponent is a simple component base on ion-image and can display image by it's name and base64 url also supported</p>
 */
@Component({
  selector: 'ps-action-image',
  templateUrl: './ps-action-image.component.html',
  styleUrls: ['./ps-action-image.component.scss'],
})
export class PsActionImageComponent extends PsBaseActionComponent implements OnInit {
  @Input() options: IOptionsPsActionImage;

  public get imageURL(): string {
    if (this.options.imageBase64Url !== undefined && this.options.imageBase64Url !== '' && this.options.imageBase64Url !== null) {
      // return 'data:image/png;base64, ' + this.options.imageBase64Url;
      return this.options.imageBase64Url && this.options.imageBase64Url.includes('base64') ? this.options.imageBase64Url : 'data:image/png;base64, ' + this.options.imageBase64Url;
    } else if (this.options.imageName !== undefined && this.options.imageName !== '' && this.options.imageName !== null) {
      if (this.options.imagePath !== null && this.options.imagePath !== undefined && this.options.imagePath !== '') {
        return this.options.imagePath + this.options.imageName;
      } else {
        return PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL + this.options.imageName;
      }
    } else {
      return null;
    }
  }

  constructor(common: PsCommonService, loggerP: LoggerService) {
    super(common, loggerP);
  }

  ngOnInit() {
    if (this.options.allowCust === undefined) {
      this.options.allowCust = false;
    }
    super.ngOnInit();
  }

  onActionImageClick(event: Event) {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }

}
