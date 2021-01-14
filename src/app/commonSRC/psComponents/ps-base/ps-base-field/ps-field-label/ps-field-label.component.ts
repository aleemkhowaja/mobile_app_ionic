import { Component, OnInit, Input } from '@angular/core';
import { IOptionsPsFieldLabel } from '../../../../psServices/models/ps-common-interface';
import { PsCommonService } from '../../../../psServices/ps-common/ps-common.service';
import { LoggerService } from '../../../../psServices/logger/logger.service';
import { PsBaseFieldComponent } from '../ps-base-field.component';

@Component({
  selector: 'ps-field-label',
  templateUrl: './ps-field-label.component.html',
  styleUrls: ['./ps-field-label.component.scss'],
})
export class PsFieldLabelComponent extends PsBaseFieldComponent implements OnInit {

  @Input() options: IOptionsPsFieldLabel = {};

  constructor(public commonProv: PsCommonService, public loggerP: LoggerService) {
    super(commonProv, loggerP);
  }

  ngOnInit() {}

}
