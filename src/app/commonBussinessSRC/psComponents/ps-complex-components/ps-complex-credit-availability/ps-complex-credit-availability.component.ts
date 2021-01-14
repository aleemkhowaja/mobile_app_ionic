import { Component, OnInit, Input } from '@angular/core';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsComplexCreditAvailabilityExposed } from './ps-complex-credit-availability.component.interface';

@Component({
  selector: 'ps-complex-credit-availability',
  templateUrl: './ps-complex-credit-availability.component.html',
  styleUrls: ['./ps-complex-credit-availability.component.scss'],
})
export class PsComplexCreditAvailabilityComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsComplexCreditAvailabilityExposed;
  showCreditAvailDet = false;

  constructor(
    public commonProv: PsCommonService,
    public loggerP: LoggerService
  ) {
    super(commonProv, loggerP);
  }

  ngOnInit() {
  }


  onCreditAvailableChange(event) {
    if (event != null && event !== undefined && event.selectedObj) {
      if (event.itemValue === 'M' || event.itemValue === 'T') {
        this.showCreditAvailDet = true;
      }

    }
  }
}
