import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsApplicationSettings } from 'src/app/commonSRC/psServices/models/ps-app-settings';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsDropdownLovComponent } from '../ps-dropdown-lov.component';
import { IOptionsPsDropdownLov } from '../ps-dropdown-lov.component.interfaces';
import { IOptionsPsLovDestinationBranchExposed } from './ps-lov-destination-branch.component.interface';



@Component({
  selector: 'ps-lov-destination-branch',
  templateUrl: './ps-lov-destination-branch.component.html',
  styleUrls: ['./ps-lov-destination-branch.component.scss'],
})
export class PsLovDestinationBranchComponent extends PsDropdownLovComponent implements OnInit {
  @Input() options: IOptionsPsLovDestinationBranchExposed;
  defaultSelectOptions: IOptionsPsDropdownLov = {
    iconLocation: PsApplicationSettings.CLIENT_ASSETS_CONFIG.IMGS_FOLDER_URL,
    lovTypeId: CommonBussinessConstant.DESTINATIONBRANCH_LOV_ID
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
