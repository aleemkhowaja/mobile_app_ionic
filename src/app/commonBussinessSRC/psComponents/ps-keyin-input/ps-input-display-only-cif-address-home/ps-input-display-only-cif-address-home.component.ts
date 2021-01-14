import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsInputDisplayOnlyCIFAddressHomeExposed } from './ps-input-display-only-cif-address-home.component.interface';
import { PsInputDisplayOnlyComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-keyin/ps-keyin-input/ps-input-display-only/ps-input-display-only.component';
import { IOptionsPsKeyinInput } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';

@Component({
  selector: 'ps-input-display-only-cif-address-home',
  templateUrl: './ps-input-display-only-cif-address-home.component.html',
  styleUrls: ['./ps-input-display-only-cif-address-home.component.scss'],
})
export class PsInputDisplayOnlyCIFAddressHomeComponent extends PsInputDisplayOnlyComponent implements OnInit {
  @Input() options: PsInputDisplayOnlyCIFAddressHomeExposed;
  public defaultOptions: IOptionsPsKeyinInput = {

  };
  cifInfo: any;
  address: string[];

  constructor(commonP: PsCommonService, loggerP: LoggerService) {
    super(commonP, loggerP);
  }

  ngOnInit() {
    super.ngOnInit();
    this.cifInfo = this.commonProv.session.getValueOf(ConstantCommon.USERINFO);
    this.commonProv.copyObject(this.defaultOptions, this.options, false);



    this.address = this.cifInfo.customerInfoCO ?[this.cifInfo.customerInfoCO.country,
      this.cifInfo.customerInfoCO.regionName,
      this.cifInfo.customerInfoCO.cityName,
      this.cifInfo.customerInfoCO.streetDetails,
      this.cifInfo.customerInfoCO.buildingOrHouse,
      this.cifInfo.customerInfoCO.poBox]:[];

    this.commonProv.setValInsideNestedObj(this.options.fcName, this.address.filter(x => x !== undefined).join('-'), this.options.requestVO);

  }
}
