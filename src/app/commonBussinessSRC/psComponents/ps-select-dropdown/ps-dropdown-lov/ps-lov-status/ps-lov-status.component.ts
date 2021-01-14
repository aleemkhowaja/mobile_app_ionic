import { Component, OnInit, Input } from '@angular/core';
import { PsDropdownLovComponent } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-dropdown-lov.component';
import { IOptionsPsLovStatusExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-status/ps-lov-status.component.interface';
import { IOptionsPsDropdownLov } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-dropdown-lov.component.interfaces';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonSettings } from '../../../../../commonSRC/psServices/models/ps-common.settings';

@Component({
  selector: 'ps-lov-status',
  templateUrl: './ps-lov-status.component.html',
  styleUrls: ['./ps-lov-status.component.scss'],
})
export class PsLovStatusComponent extends PsDropdownLovComponent implements OnInit {
  @Input() options: IOptionsPsLovStatusExposed;
  defaultSelectOptions: IOptionsPsDropdownLov = {
    // iconLocation: PsCommonBusinessSettings.ICON_LOCATION_GENERAL,
    // iconExtension: PsCommonBusinessSettings.IMG_GENDER_EXTENSION,
    lovTypeId: PsCommonSettings.oper_ID === CommonBussinessConstant.PORTFOLIO_POSITION_OPER_ID ? CommonBussinessConstant.PORTFOLIO_STATUS_LOV_TYPE_ID :  PsCommonSettings.oper_ID === CommonBussinessConstant.RENEWAL_REQUEST_OPER_ID ? CommonBussinessConstant.RENEWAL_REQUEST_STATUS_LOV_TYPE_ID :  PsCommonSettings.oper_ID === CommonBussinessConstant.IPO_REQUEST_OPER_ID ? CommonBussinessConstant.IPO_REQUEST_STATUS_LOV_TYPE_ID : PsCommonSettings.oper_ID === CommonBussinessConstant.CIF_OPENING_REQ_REPORT ? CommonBussinessConstant.IPO_REQUEST_STATUS_LOV_TYPE_ID : CommonBussinessConstant.IPO_REQUEST_STATUS_LOV_TYPE_ID
  };

  constructor(commonProvService: PsCommonService, logger: LoggerService) {
    super(commonProvService, logger);
   }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options);
    this.defaultSelectOptions.labelKey = this.commonProv.translate('status_key');
    this.defaultSelectOptions.placeHolder = this.commonProv.translate('status_key');
    }

  onChangeLov(values: IchangeValues) {
    this.loggerP.log('onStatusChange' + values);
    this.onPsChange.emit(values);
    }

}
