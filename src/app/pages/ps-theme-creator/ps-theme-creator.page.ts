import { Component, OnInit } from '@angular/core';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';

import { OmniBasePage } from '../omni-base/omni-base.page';

@Component({
  selector: 'ps-theme-creator',
  templateUrl: './ps-theme-creator.page.html',
  styleUrls: ['./ps-theme-creator.page.scss'],
})
export class PsThemeCreatorPage extends OmniBasePage implements OnInit {

  constructor() {
    super();
  }

  value;

  ngOnInit() {
    super.init();
  }


  changeCssVariable(variableName, value) {
    CommonUtils.changeCssVariable(variableName, value);
  }
}
