import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/commonSRC/psServices/logger/logger.service';
import { PsCommonService } from 'src/app/commonSRC/psServices/ps-common/ps-common.service';
import { PsKeyinInputComponent } from './../../../../commonSRC/psComponents/ps-base/ps-base-field/ps-field-keyin/ps-keyin-input/ps-keyin-input.component';
import { IOptionsPsKeyinInput } from 'src/app/commonSRC/psServices/models/ps-common-interface';
import { IOptionsPsInputFreeTextExposed } from './ps-input-free-text.component.interfaces';

/**
 * @author Aftab.Ali
 * @since 24/10/2019
 *
 * <p> PsInputFreeTextComponent is a simple component base on ps-keyin-input and have free text field</p>
 */
@Component({
  selector: 'ps-input-free-text',
  templateUrl: './ps-input-free-text.component.html',
  styleUrls: ['./ps-input-free-text.component.scss'],
})
export class PsInputFreeTextComponent extends PsKeyinInputComponent implements OnInit {

  @Input() options: IOptionsPsInputFreeTextExposed = {};
  public defaultOptions: IOptionsPsKeyinInput = {
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

}
