import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from '../../../../../commonSRC/psServices/logger/logger.service';
import { IchangeValues } from '../../../../../commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../../commonSRC/psServices/ps-common/ps-common.service';
import { CommonBussinessConstant } from '../../../../psServices/models/ps-common-bussiness-constant';
import { PsDropdownLovComponent } from '../ps-dropdown-lov.component';
import { IOptionsPsDropdownLov } from '../ps-dropdown-lov.component.interfaces';
import { IOptionsPsLovPeriodicityOptionsExposed } from './ps-lov-periodicity.component.interfaces';



/**
 * @author Zunair.Zakir
 * @since 19/12/2019
 *
 * <p> PsLovPeriodicityOptionsComponent is responsile for fetching Delivery Options based on lovTypeId(ID for DeliveryOptions).</p>
 */
@Component({
  selector: 'ps-lov-periodicity',
  templateUrl: './ps-lov-periodicity.component.html',
  styleUrls: ['./ps-lov-periodicity.component.scss'],
})
export class PsLovPeriodicityOptionsComponent extends PsDropdownLovComponent implements OnInit {

  @Input() options: IOptionsPsLovPeriodicityOptionsExposed;

  public defaultOptions: IOptionsPsDropdownLov = {
    lovTypeId: CommonBussinessConstant.LOV_TYPE_ID_PRIODICITY
  };

  constructor(
    commonProv: PsCommonService,
    logger: LoggerService
  ) {
    super(commonProv, logger);
  }
  ngOnInit() {
    this.commonProv.copyObject(this.defaultOptions, this.options, false);
    this.defaultOptions.labelKey = this.commonProv.translate('periodicity_key');
    this.defaultOptions.placeHolder = this.commonProv.translate('select_periodicity_key');
  }

  onChangePriodicityLov(values: IchangeValues) {
    this.onPsChange.emit(values);
  }
}
