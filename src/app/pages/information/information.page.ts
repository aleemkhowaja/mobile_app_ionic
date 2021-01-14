import { Component, OnInit } from '@angular/core';
import { IOptionsPsContainerHtmlViewerExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';

import { OmniBasePage } from '../omni-base/omni-base.page';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage extends OmniBasePage implements OnInit {
  htmlViewerOptions: IOptionsPsContainerHtmlViewerExposed;
  ifResult = false;
  constructor(public loggerP: LoggerService, private navService?: PsNavigatorService) {
    super();
  }

  ngOnInit() {
    super.init();
    const result = this.navService.getParamKey('fileName');
    if (result) {
      this.htmlViewerOptions = {
        fileName: result
      };
      this.ifResult = true;
    }
  }






}
