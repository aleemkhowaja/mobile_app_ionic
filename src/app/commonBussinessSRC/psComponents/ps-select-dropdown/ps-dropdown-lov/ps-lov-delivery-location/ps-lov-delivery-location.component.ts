import { Component, OnInit, Input } from '@angular/core';
import { PsDropdownLovComponent } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-dropdown-lov.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IOptionsPsLovDeliveryLocationExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-delivery-location/ps-lov-delivery-location.component.interface';
import { IOptionsPsDropdownLov } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-dropdown-lov.component.interfaces';
import { PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';

@Component({
  selector: 'ps-lov-delivery-location',
  templateUrl: './ps-lov-delivery-location.component.html',
  styleUrls: ['./ps-lov-delivery-location.component.scss'],
})
export class PsLovDeliveryLocationComponent extends PsDropdownLovComponent implements OnInit {
  @Input() options: IOptionsPsLovDeliveryLocationExposed;
  defaultSelectOptions: IOptionsPsDropdownLov = {
    iconLocation: PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL,
    lovTypeId: CommonBussinessConstant.DELIVERY_LOC_LOV_ID,
    iconExtension: '.svg'
  };
  constructor(
    commonProvService: PsCommonService,
    logger: LoggerService
  ) {
    super(commonProvService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options, false);
    this.defaultSelectOptions.labelKey = this.commonProv.translate('delivery_location_key');
    this.defaultSelectOptions.placeHolder = this.commonProv.translate('select_delivery_location_key');
  }

  onChangeLov(values: IchangeValues) {
    this.onPsChange.emit(values);
  }

}
