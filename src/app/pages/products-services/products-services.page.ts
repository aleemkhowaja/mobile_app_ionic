import { Component, OnInit } from '@angular/core';
import { IOptionsPsContainerHtmlViewerExposed } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsNavigatorService } from 'src/app/commonSRC/psServices/navigator/ps-navigator.service';

import { OmniBasePage } from '../omni-base/omni-base.page';

@Component({
  selector: 'app-products-services',
  templateUrl: './products-services.page.html',
  styleUrls: ['./products-services.page.scss'],
})
export class ProductsServicesPage extends OmniBasePage implements OnInit {
  htmlViewerOptions: IOptionsPsContainerHtmlViewerExposed;

constructor(public loggerP: LoggerService, private navService ?: PsNavigatorService) {
  super();
}

ngOnInit() {
  super.init();
  this.htmlViewerOptions = {
    fileName: PsCommonBusinessSettings.productsBankFileName,
  };
}

}
