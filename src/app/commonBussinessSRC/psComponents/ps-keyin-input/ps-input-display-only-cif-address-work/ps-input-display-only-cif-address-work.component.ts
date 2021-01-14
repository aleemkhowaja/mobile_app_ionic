import { PsInputDisplayOnlyCIFAddressWorkExposed } from './ps-input-display-only-cif-address-work.component.interface';
import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsInputDisplayOnlyComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-keyin/ps-keyin-input/ps-input-display-only/ps-input-display-only.component';
import { IOptionsPsKeyinInput } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';

@Component({
  selector: 'ps-input-display-only-cif-address-work',
  templateUrl: './ps-input-display-only-cif-address-work.component.html',
  styleUrls: ['./ps-input-display-only-cif-address-work.component.scss'],
})
export class PsInputDisplayOnlyCIFAddressWorkComponent extends PsInputDisplayOnlyComponent implements OnInit {
  @Input() options: PsInputDisplayOnlyCIFAddressWorkExposed;
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

    this.address = this.cifInfo.customerInfoCO ?[
      this.cifInfo.customerInfoCO.institutionName ,
      this.cifInfo.customerInfoCO.country,
      this.cifInfo.customerInfoCO.regionName,
      this.cifInfo.customerInfoCO.cityName,
      this.cifInfo.customerInfoCO.streetDetails,
      this.cifInfo.customerInfoCO.employerpoBox]: [];

    this.commonProv.setValInsideNestedObj(this.options.fcName, this.address.filter(x => x !== undefined).join('-'), this.options.requestVO);

  }
}
