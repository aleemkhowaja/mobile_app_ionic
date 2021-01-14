import { IOptionsPsComplexSettlementExposed } from './ps-complex-settlement.component.interfaces';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';


/**
 * @author Ahmed.Ragab
 * @since 14/06/2020
 * 
 * <p> PsComplexSettlementComponent is a complex component composed for facility request</p>
 */
@Component({
  selector: 'ps-complex-settlement',
  templateUrl: './ps-complex-settlement.component.html',
  styleUrls: ['./ps-complex-settlement.component.scss'],
})
export class PsComplexSettlementComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsComplexSettlementExposed;
  @Output() public settlementTypesChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    commonService: PsCommonService,
    public omniPull: OmniPullService,
    logger: LoggerService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    super.ngOnInit();
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.options.daysInput.fcName], 0);
    this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.options.payableInput.fcName], 0);
    this.options.settlementTypesOptions.group
  }
  
  onSettlementTypesChanged(event: any) {
    if (event != null && event !== undefined && event.selectedObj) {
      if (event.itemValue === 'M' || event.itemValue === 'T') {
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.options.daysInput.fcName], 0);
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.options.payableInput.fcName], 0);
      } else {
       this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.options.daysInput.fcName], 1);
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_VISIBLE, [this.options.payableInput.fcName], 1);
      }
    }
    this.settlementTypesChange.emit(event);

  }


}
