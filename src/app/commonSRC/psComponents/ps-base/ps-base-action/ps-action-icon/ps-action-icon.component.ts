import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';
import { IOptionsPsActionIcon } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsBaseActionComponent } from '../ps-base-action.component';

@Component({
  selector: 'ps-action-icon',
  templateUrl: './ps-action-icon.component.html',
  styleUrls: ['./ps-action-icon.component.scss'],
})
export class PsActionIconComponent extends PsBaseActionComponent implements OnInit {
  @Input() options: IOptionsPsActionIcon = {};
  flipRtl;
  get url() {
    let tempUrl = null;
    this.flipRtl = false;
    if (this.options.iconName) {
      tempUrl = PsApplicationSettings.CLIENT_ASSETS_CONFIG.SVG_URL + this.options.iconName + '.svg';
      if (!this.options.disableFlipRTL) {
        if (this.common.language.currentLanguage && this.common.language.currentLanguage.direction === 'rtl') {
          this.flipRtl = true;
          /* if (tempUrl.includes('left')) {
            tempUrl = tempUrl.replace('left', 'right');
          }
          if (tempUrl.includes('right')) {
            tempUrl = tempUrl.replace('right', 'left');
          } */
        }
      }
    }
    return tempUrl;
  }

  constructor(common: PsCommonService, public logger: LoggerService) {
    super(common, logger);
  }

  onIconClicked(event) {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }

  ngOnInit() {
    if (this.options.allowCust === undefined) {
      this.options.allowCust = false;
    }
    super.ngOnInit();
  }
}
