import { Component, Input, OnInit } from '@angular/core';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { IchangeValues } from '../../../../../commonSRC/psServices/models/ps-common-interface';
import { PsDropdownLovComponent } from '../ps-dropdown-lov.component';
import { IOptionsPsDropdownLov } from '../ps-dropdown-lov.component.interfaces';
import { IOptionsPsLovPaymentMethodAgentExposed } from './ps-lov-payment-method-agent.component.interfaces';


/**
 * @author Zunair.Zakir
 * @since 10/02/2020
 *
 * <p> PsLovPaymentMethodAgentComponent is responsile for fetching payment method for Agent Only based on lovTypeId(ID for PaymentMethodAgents).</p>
 */
@Component({
  selector: 'ps-lov-payment-method-agent',
  templateUrl: './ps-lov-payment-method-agent.component.html',
  styleUrls: ['./ps-lov-payment-method-agent.component.scss'],
})
export class PsLovPaymentMethodAgentComponent extends PsDropdownLovComponent implements OnInit {

  @Input() options: IOptionsPsLovPaymentMethodAgentExposed;

  public defaultOptions: IOptionsPsDropdownLov = {
    lovTypeId: CommonBussinessConstant.LOV_TYPE_ID_IPO_PAYMENT_METHOD_AGENT
  };

  constructor(
    commonProvService: PsCommonService,
    logger: LoggerService
  ) {
    super(commonProvService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultOptions, this.options, false);
    this.defaultOptions.labelKey = this.commonProv.translate('payment_method_key');
    this.defaultOptions.placeHolder = this.commonProv.translate('select_payment_key');
  }

  onChangeLov(values: IchangeValues) {
    this.onPsChange.emit(values);
    this.commonProv.presentProfile.next(false);
  }

}
