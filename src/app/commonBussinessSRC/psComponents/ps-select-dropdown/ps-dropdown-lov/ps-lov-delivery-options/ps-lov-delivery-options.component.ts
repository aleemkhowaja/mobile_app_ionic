import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsDropdownLovComponent } from '../ps-dropdown-lov.component';
import { IOptionsPsDropdownLov } from '../ps-dropdown-lov.component.interfaces';
import { IOptionsPsLovDeliveryOptionsExposed } from './ps-lov-delivery-options.component.interfaces';
import { IchangeValues } from '../../../../../commonSRC/psServices/models/ps-common-interface';

/**
 * @author Aftab.Ali
 * @since 22/10/2019
 *
 * <p> PsLovDeliveryOptionsComponent is responsile for fetching Delivery Options based on lovTypeId(ID for DeliveryOptions).</p>
 */
@Component({
  selector: 'ps-lov-delivery-options',
  templateUrl: './ps-lov-delivery-options.component.html',
  styleUrls: ['./ps-lov-delivery-options.component.scss'],
})
export class PsLovDeliveryOptionsComponent extends PsDropdownLovComponent implements OnInit {

  @Input() options: IOptionsPsLovDeliveryOptionsExposed;

  public defaultOptions: IOptionsPsDropdownLov = {
    labelKey: 'delivery_options_key',
    placeHolder: 'select_delivery_option_key',
    lovTypeId: CommonBussinessConstant.LOV_TYPE_ID_DELIVERY_OPTIONS
  };

  constructor(
    commonProvService: PsCommonService,
    logger: LoggerService
  ) {
    super(commonProvService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultOptions, this.options, false);
  }

  onChangeLov(values: IchangeValues) {
    this.onPsChange.emit(values);
  }
}
