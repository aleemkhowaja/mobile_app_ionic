import { Component, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { IOptionsPsTemplateReport } from 'src/app/commonSRC/psServices/models/ps-common-interface';

@Component({
  selector: 'app-transfers-list-report',
  templateUrl: './transfers-list-report.page.html',
  styleUrls: ['./transfers-list-report.page.scss'],
})
export class TransfersListReportPage implements OnInit {

 public reportTemplateOptions: IOptionsPsTemplateReport = {
    operId: CommonBussinessConstant.TRANSFER_LIST_OPER_ID,
    reportParametersList: {
      iconPath: PsCommonBusinessSettings.ICON_LOCATION_LANGUAGE
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
