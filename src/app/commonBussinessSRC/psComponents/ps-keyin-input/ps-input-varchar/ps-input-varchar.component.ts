import { Component, OnInit, Input } from '@angular/core';
import { PsCommonService } from './../../../../commonSRC/psServices/ps-common/ps-common.service';
import { LoggerService } from './../../../../commonSRC/psServices/logger/logger.service';
import { PsKeyinInputComponent } from 'src/app/commonSRC/psComponents/ps-base/ps-base-field/ps-field-keyin/ps-keyin-input/ps-keyin-input.component';
import { CommonBussinessConstant } from 'src/app/commonBussinessSRC/psServices/models/ps-common-bussiness-constant';
import { IOptionsPsKeyinInput } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsInputVarcharExposed } from './ps-input-varchar.component.interfaces';


/**
 * @author Aftab.Ali
 * @since 24/10/2019
 *
 * <p> PsInputVarcharComponent is a simple component base on ps-keyin-input for only accepting varchar without special charaters.</p>
 */
@Component({
  selector: 'ps-input-varchar',
  templateUrl: './ps-input-varchar.component.html',
  styleUrls: ['./ps-input-varchar.component.scss'],
})
export class PsInputVarcharComponent extends PsKeyinInputComponent implements OnInit {

  @Input() options: IOptionsPsInputVarcharExposed = {};

  public defaultOptions: IOptionsPsKeyinInput = {
    disableSpecChars: true,
    type: CommonBussinessConstant.INPUT_TYPE_TEXT
  };

  constructor(
    commonService: PsCommonService,
    logger: LoggerService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    /**
     * disabling special chararters
     */
    this.commonProv.copyObject(this.defaultOptions, this.options, false, false);
  }

  onChangeEvent(val) {
    this.onPsChange.emit(val);
  }

}
