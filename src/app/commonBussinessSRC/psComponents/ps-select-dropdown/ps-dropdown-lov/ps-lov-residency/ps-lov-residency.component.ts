import { Component, Input, OnInit } from '@angular/core';
import { PsDropdownLovComponent } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-dropdown-lov.component';
import { IOptionsPsDropdownLov } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-dropdown-lov.component.interfaces';
import { IOptionsPsLovResidencyExposed } from 'src/app/commonBussinessSRC/psComponents/ps-select-dropdown/ps-dropdown-lov/ps-lov-residency/ps-lov-residency.component.interface';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { PsCommonBusinessSettings } from 'src/app/commonBussinessSRC/psServices/models/ps-commonBusiness.settings';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IchangeValues } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

@Component({
  selector: 'ps-lov-residency',
  templateUrl: './ps-lov-residency.component.html',
  styleUrls: ['./ps-lov-residency.component.scss'],
})
export class PsLovResidencyComponent extends PsDropdownLovComponent implements OnInit {
  @Input() options: IOptionsPsLovResidencyExposed;
  defaultSelectOptions: IOptionsPsDropdownLov = {
    iconLocation: PsCommonBusinessSettings.ICON_LOCATION_GENERAL,
    lovTypeId: CommonBussinessConstant.RESIDENCY_LOV_TYPE_ID
  };


  constructor(    commonProvService: PsCommonService,logger: LoggerService) {
    super(commonProvService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultSelectOptions, this.options);
    this.defaultSelectOptions.labelKey = this.commonProv.translate('residency_key');
    this.defaultSelectOptions.placeHolder = this.commonProv.translate('residency_key');
    }

     onChangeLov(values: IchangeValues) {
      this.loggerP.log('onResidencyChange' + values);
      this.onPsChange.emit(values);
      }
}
