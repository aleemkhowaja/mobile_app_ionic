import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OmniPullService } from 'src/app/commonBussinessSRC/psServices/omni-common/omni-pull.service';
import { PsBaseFieldComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-base-field.component';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { CommonUtils } from 'src/app/commonSRC/psServices/models/common-utils';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { IOptionsPsComplexFacilityRequestExposed } from './ps-complex-facility-request.component.interfaces';
import { isString } from 'util';
import { ConstantCommon } from 'src/app/commonSRC/psServices/models/common-constant';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IOptionsPsContainerPanel } from 'src/app/commonSRC/psServices/models/ps-common-interface';

/**
 * @author Heba.Hassan
 * @since 20/04/2020
 * 
 * <p> PsComplexFacilityRequestComponent is a complex component composed for facility request</p>
 */
@Component({
  selector: 'ps-complex-facility-request',
  templateUrl: './ps-complex-facility-request.component.html',
  styleUrls: ['./ps-complex-facility-request.component.scss'],
})
export class PsComplexFacilityRequestComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsComplexFacilityRequestExposed;
  @Output() public facilityTypeChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public fileSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() public amountChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public downPaymentChange: EventEmitter<any> = new EventEmitter<any>();


  selectedFileData: any;
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
  onFacilityTypeChanged(value: any) {
    if (value && value.selectedObj) {
      this.facilityTypeChange.emit(value);
    }
  }
  onAmountChanged(value: any) {
    if (value) {
      this.amountChange.emit(value);
    }
  }

  onDownPaymentChange(value: any) {
    if (value) {
      this.downPaymentChange.emit(value);
    }
  }
  selectFile(event) {
    if (event) {
      this.fileSelected.emit(this.selectedFileData);
    }
  }

}
