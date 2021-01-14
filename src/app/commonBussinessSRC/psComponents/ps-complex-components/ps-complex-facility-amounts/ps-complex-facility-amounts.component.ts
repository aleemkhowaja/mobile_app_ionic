import { Component, Input, OnInit } from '@angular/core';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { LoggerService } from './../../../../commonSRC/psServices/logger/logger.service';
import { IOptionsPsComplexFacilityAmountExposed } from './ps-complex-facility-amounts.component.interfaces';

/**
 * @author Aftab.Ali
 * @since 07/11/2019
 *
 * <p> PsComplexFacilityAmountsComponent is a complex component composed of three other components (ps-input-amount)</p>
 */
@Component({
  selector: 'ps-complex-facility-amounts',
  templateUrl: './ps-complex-facility-amounts.component.html',
  styleUrls: ['./ps-complex-facility-amounts.component.scss'],
})
export class PsComplexFacilityAmountsComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsComplexFacilityAmountExposed = {
    downPaymentOptions: {},
    financeAmountOptions: {}
  };

  constructor(
    commonService: PsCommonService,
    logger: LoggerService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  onChangeFacilityAmount() {
  }

}

