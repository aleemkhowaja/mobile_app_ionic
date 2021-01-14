import { Component, Input, OnInit } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsComplexBeneficiaryDetailsExposed } from './ps-complex-beneficiary-details.component.interface';

/* Islam 21012020 */
@Component({
  selector: 'ps-complex-beneficiary-details',
  templateUrl: './ps-complex-beneficiary-details.component.html',
  styleUrls: ['./ps-complex-beneficiary-details.component.scss'],
})
export class PsComplexBeneficiaryDetailsComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: PsComplexBeneficiaryDetailsExposed;
  public allowedBeneficiaryCurrencies: any;
  public countryFlagLocation: string;
  defaultOptions: PsComplexBeneficiaryDetailsExposed = {};

  constructor(public commonProv: PsCommonService, public omniPull: OmniPullService, logger: LoggerService
  ) {
    super(commonProv, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultOptions, this.options, false);
  }

}
