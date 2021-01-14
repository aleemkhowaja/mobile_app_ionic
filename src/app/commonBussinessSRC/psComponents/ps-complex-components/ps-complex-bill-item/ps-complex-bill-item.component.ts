import { IOptionsPsComplexBillItemExposed } from './ps-complex-bill-item.component.interfaces';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';


/**
 * @author Ahmed.Ragab
 * @since 14/06/2020
 * 
 * <p> PsComplexBillTypeComponent is a complex component composed for Drawee Bank</p>
 */
@Component({
  selector: 'ps-complex-bill-item',
  templateUrl: './ps-complex-bill-item.component.html',
  styleUrls: ['./ps-complex-bill-item.component.scss'],
})
export class PsComplexBillItemComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsComplexBillItemExposed;
  @Output() public CheckChange: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    commonService: PsCommonService,
    public omniPull: OmniPullService,
    logger: LoggerService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    super.ngOnInit();
  }
  onCheckChanged(value) {
      this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.options.copyInputOptions.fcName ,this.options.originalInputOptions.fcName], value.newValue ? 1 : 0 );
      if (this.options.otherInputOptions) {
        this.commonProv.applyDynScreenDisplay(ConstantCommon.ACTION_TYPE_MANDATORY, [this.options.otherInputOptions.fcName], value.newValue ? 1 : 0 );
      }
      this.CheckChange.emit(value);
  }
 

}
