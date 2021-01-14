import { Component, Input } from '@angular/core';
import { IOptionsPsHyperlinkAnchor } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsActionHyperlinkComponent } from '../ps-action-hyperlink/ps-action-hyperlink.component';
import { ConstantCommon } from './../../../../psServices/models/common-constant';


@Component({
  selector: 'ps-hyperlink-anchor',
  templateUrl: './ps-hyperlink-anchor.component.html',
  styleUrls: ['./ps-hyperlink-anchor.component.scss'],
})

export class PsHyperlinkAnchorComponent extends PsActionHyperlinkComponent {
  @Input() options: IOptionsPsHyperlinkAnchor;

  constructor(public commonService: PsCommonService, public nav: PsNavigatorService) {
    super(commonService, nav);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.options.labelKey) {
      this.options.titleOptions.labelKey = this.options.labelKey;
    }
    this.commonService.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.id], 0);
  }

  onButtonClick(event) {
    if (!this.disabled) {
      super.onButtonClick(event);
    }
  }
}
