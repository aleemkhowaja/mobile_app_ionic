import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { IOptionsPsKeyinInput } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';

import { PsKeyinInputComponent } from '../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-field-keyin/ps-keyin-input/ps-keyin-input.component';
import { IOptionsPsInputNumericExposed } from './ps-input-numeric.component.interfaces';

/**
 * @author Zunair.Zakir
 * @since 31/10/2019
 *
 * <p> PsInputNumericComponent is a simple component base on ps-keyin-input and have numeric field</p>
 */
@Component({
  selector: 'ps-input-numeric',
  templateUrl: './ps-input-numeric.component.html',
  styleUrls: ['./ps-input-numeric.component.scss'],
})
export class PsInputNumericComponent extends PsKeyinInputComponent implements OnInit {

  @Input() options: IOptionsPsInputNumericExposed = {};
  public defaultOptions: IOptionsPsKeyinInput = {
    type: 'number'
  };

  constructor(
    commonService: PsCommonService,
    logger: LoggerService
  ) {
    super(commonService, logger);
  }

  ngOnInit() {
    this.commonProv.copyObject(this.defaultOptions, this.options, false);
   }
  inputChanged(value){
    this.defaultOptions.labelKey=this.options.labelKey;
    this.onPsChange.emit(value);
  }
  onEmpty(event) {
   this.onPsEmpty.emit(event);
  }

}
